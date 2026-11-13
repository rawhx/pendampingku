<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStudentObservationRequest;
use App\Http\Resources\StudentObservationResource;
use App\Models\Student;
use App\Models\StudentObservation;
use App\Services\StudentObservationAiService;
use App\Services\SupabaseStorageService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Throwable;

class StudentObservationController extends Controller
{
    public function index(Request $request, Student $student): AnonymousResourceCollection
    {
        $ownedStudent = $request->user()->students()->findOrFail($student->id);

        return StudentObservationResource::collection(
            $ownedStudent->observations()
                ->with('rubrics')
                ->latest('observed_on')
                ->latest()
                ->get(),
        );
    }

    public function store(
        StoreStudentObservationRequest $request,
        Student $student,
        StudentObservationAiService $aiService,
        SupabaseStorageService $storage,
    ): StudentObservationResource {
        $ownedStudent = $request->user()->students()->findOrFail($student->id);
        $validated = $request->validated();

        try {
            $rubricInsights = $aiService->generateRubricInsights(
                $validated['field_notes'],
                $ownedStudent->full_name,
                $validated['rubric'],
                $validated['qualitative'],
            );
        } catch (Throwable $exception) {
            report($exception);

            throw ValidationException::withMessages([
                'field_notes' => 'Insight AI per aspek belum dapat dibuat. Catatan belum disimpan, silakan coba lagi.',
            ]);
        }

        $rubric = $validated['rubric'];
        $uploadedFiles = $validated['files'];
        unset($validated['rubric']);
        unset($validated['files']);

        try {
            $observation = DB::transaction(function () use ($ownedStudent, $validated, $rubric, $rubricInsights, $uploadedFiles, $storage): StudentObservation {
                $observation = $ownedStudent->observations()->create($validated);
                $files = collect($uploadedFiles)->map(
                    fn ($file) => $storage->upload(
                        $file,
                        "students/{$ownedStudent->id}/observations/{$observation->id}/".str()->uuid().'-'.$file->hashName(),
                    ),
                )->values()->all();
                $observation->update(['files' => $files]);
                $observation->rubrics()->createMany(
                    collect($rubric)->map(fn (string $score, string $code) => [
                        'rubric_code' => $code,
                        'aspect_code' => $rubricInsights[$code]['aspect_code'],
                        'score' => $score,
                        'ai_insight' => $rubricInsights[$code]['insight'],
                        'ai_recommendation' => $rubricInsights[$code]['recommendation'],
                    ])->values()->all(),
                );

                return $observation->load('rubrics');
            });
        } catch (Throwable $exception) {
            report($exception);

            throw ValidationException::withMessages([
                'files' => 'Dokumentasi gagal diunggah ke Supabase. Catatan belum disimpan, silakan coba lagi.',
            ]);
        }

        return StudentObservationResource::make($observation);
    }

    public function show(
        Request $request,
        Student $student,
        StudentObservation $observation,
    ): StudentObservationResource {
        $ownedStudent = $request->user()->students()->findOrFail($student->id);

        return StudentObservationResource::make(
            $ownedStudent->observations()->with('rubrics')->findOrFail($observation->id),
        );
    }

    public function generate(
        Request $request,
        Student $student,
        StudentObservationAiService $aiService,
    ): JsonResponse {
        $ownedStudent = $request->user()->students()->findOrFail($student->id);
        $validated = $request->validate([
            'field_notes' => ['required', 'string', 'min:10', 'max:10000'],
        ]);

        try {
            return response()->json([
                'data' => $aiService->generate($validated['field_notes'], $ownedStudent->full_name),
            ]);
        } catch (Throwable $exception) {
            report($exception);

            throw ValidationException::withMessages([
                'field_notes' => 'Rekomendasi AI belum dapat dibuat. Periksa konfigurasi provider atau coba lagi.',
            ]);
        }
    }
}

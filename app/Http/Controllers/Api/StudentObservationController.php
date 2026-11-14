<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStudentObservationRequest;
use App\Http\Resources\StudentObservationResource;
use App\Models\Student;
use App\Models\StudentObservation;
use App\Services\StudentObservationAiService;
use App\Services\SupabaseStorageService;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpFoundation\Response;
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
            $aiAnalysis = $aiService->generateRubricInsights(
                $validated['field_notes'],
                $ownedStudent->full_name,
                $validated['rubric'],
                $validated['qualitative'],
                [
                    'observed_on' => $validated['observed_on'],
                    'start_time' => $validated['start_time'],
                    'end_time' => $validated['end_time'],
                    'subject' => $validated['subject'],
                    'emotion' => $validated['emotion'],
                    'strategy' => $validated['strategy'],
                    'parent_report' => $validated['parent_report'],
                    'discuss_teacher' => $validated['discuss_teacher'],
                ],
            );
        } catch (Throwable $exception) {
            report($exception);

            throw ValidationException::withMessages([
                'field_notes' => 'Insight AI per aspek belum dapat dibuat. Catatan belum disimpan, silakan coba lagi.',
            ]);
        }

        try {
            $existingObservations = $ownedStudent->observations()
                ->with('rubrics')
                ->get()
                ->map(fn (StudentObservation $observation): array => [
                    'observed_on' => $observation->observed_on?->toDateString(),
                    'field_notes' => $observation->field_notes,
                    'qualitative' => $observation->qualitative,
                    'rubrics' => $observation->rubrics->map(fn ($rubric): array => [
                        'rubric_code' => $rubric->rubric_code,
                        'score' => $rubric->score,
                    ])->all(),
                ])->all();
            $existingObservations[] = [
                'observed_on' => $validated['observed_on'],
                'field_notes' => $validated['field_notes'],
                'qualitative' => $validated['qualitative'],
                'rubrics' => collect($validated['rubric'])->map(fn (string $score, string $code): array => [
                    'rubric_code' => $code,
                    'score' => $score,
                ])->values()->all(),
            ];
            $studentAnalysis = $aiService->generateStudentAnalysis($ownedStudent->full_name, $existingObservations);
        } catch (Throwable $exception) {
            report($exception);

            throw ValidationException::withMessages([
                'field_notes' => 'Analisis AI siswa belum dapat dibuat. Catatan belum disimpan, silakan coba lagi.',
            ]);
        }

        try {
            $studentPlan = $aiService->generateStudentPlan($ownedStudent->full_name, $existingObservations);
        } catch (Throwable $exception) {
            report($exception);
            $studentPlan = [];
        }

        $rubric = $validated['rubric'];
        $rubricInsights = $aiAnalysis['rubrics'];
        $uploadedFiles = $validated['files'];
        unset($validated['rubric']);
        unset($validated['files']);

        try {
            $observation = DB::transaction(function () use ($ownedStudent, $validated, $rubric, $rubricInsights, $uploadedFiles, $storage, $aiAnalysis, $studentAnalysis, $studentPlan): StudentObservation {
                $observation = $ownedStudent->observations()->create($validated);
                $files = collect($uploadedFiles)->map(
                    fn ($file) => $storage->upload(
                        $file,
                        "students/{$ownedStudent->id}/observations/{$observation->id}/".str()->uuid().'-'.$file->hashName(),
                    ),
                )->values()->all();
                $observation->update([
                    'files' => $files,
                    'analysis_ai' => [
                        'matrix_insights' => $aiAnalysis['matrix_insights'],
                        'overall_insight' => $aiAnalysis['overall_insight'],
                    ],
                ]);
                $observation->rubrics()->createMany(
                    collect($rubric)->map(fn (string $score, string $code) => [
                        'rubric_code' => $code,
                        'aspect_code' => $rubricInsights[$code]['aspect_code'],
                        'score' => $score,
                        'ai_insight' => $rubricInsights[$code]['insight'],
                        'ai_recommendation' => $rubricInsights[$code]['recommendation'],
                    ])->values()->all(),
                );
                $ownedStudent->update([
                    'insight_student_ai' => $studentAnalysis['insight_student_ai'],
                    'analisis_capaian' => [
                        ...$studentAnalysis['analisis_capaian'],
                        'rencana_pendampingan' => $studentPlan,
                    ],
                ]);

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

    public function downloadPdf(
        Request $request,
        Student $student,
        StudentObservation $observation,
    ): Response {
        $ownedStudent = $request->user()->students()->findOrFail($student->id);
        $ownedObservation = $ownedStudent->observations()
            ->with('rubrics')
            ->findOrFail($observation->id);

        return Pdf::loadView('pdf.student-observation', [
            'student' => $ownedStudent,
            'observation' => $ownedObservation,
        ])
            ->setPaper('a4')
            ->download(sprintf(
                '%s-%s.pdf',
                Str::slug($ownedStudent->full_name),
                $ownedObservation->observed_on?->format('Y-m-d') ?? 'tanpa-tanggal',
            ));
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

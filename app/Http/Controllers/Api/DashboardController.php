<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\StudentObservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $today = now()->toDateString();
        $activeStudents = $request->user()
            ->students()
            ->where('status', 'Aktif');
        $todayObservations = StudentObservation::query()
            ->whereIn('student_id', (clone $activeStudents)->select('id'))
            ->where('observed_on', $today);
        $dashboardStudents = (clone $activeStudents)
            ->orderBy('full_name')
            ->get([
                'id',
                'full_name',
                'grade',
                'disability_condition',
                'nisn',
            ]);
        $latestObservations = StudentObservation::query()
            ->with('student:id,full_name,nickname,grade,disability_condition,nisn')
            ->whereIn('student_id', (clone $activeStudents)->select('id'))
            ->latest('observed_on')
            ->latest('start_time')
            ->latest()
            ->limit(5)
            ->get();

        return response()->json([
            'data' => [
                'date' => $today,
                'active_students' => (clone $activeStudents)->count(),
                'reports_ready' => (clone $todayObservations)->count(),
                'students_needing_observation' => (clone $activeStudents)
                    ->whereDoesntHave('observations', fn ($query) => $query
                        ->whereDate('observed_on', $today))
                    ->count(),
                'students' => $dashboardStudents->map(fn ($student): array => [
                    'id' => $student->id,
                    'name' => $student->full_name,
                    'class_name' => "Kelas {$student->grade}",
                    'condition' => $student->disability_condition,
                    'nisn' => $student->nisn,
                    'status' => [
                        'label' => 'Belum ada observasi',
                        'tone' => 'success',
                    ],
                    'note' => 'Belum ada catatan observasi hari ini.',
                ])->values(),
                'activities' => $latestObservations->map(fn (StudentObservation $observation): array => [
                    'id' => $observation->id,
                    'time' => substr((string) $observation->start_time, 0, 5),
                    'student' => $observation->student->full_name,
                    'description' => data_get(
                        $observation->analysis_ai,
                        'overall_insight',
                        'Insight AI belum tersedia.',
                    ),
                ])->values(),
            ],
        ]);
    }
}

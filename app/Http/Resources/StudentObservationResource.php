<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentObservationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'student_id' => $this->student_id,
            'observed_on' => $this->observed_on?->toDateString(),
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,
            'subject' => $this->subject,
            'emotion' => $this->emotion,
            'rubrics' => $this->whenLoaded('rubrics', fn () => $this->rubrics->map(fn ($rubric) => [
                'id' => $rubric->id,
                'rubric_code' => $rubric->rubric_code,
                'aspect_code' => $rubric->aspect_code,
                'score' => $rubric->score,
                'ai_insight' => $rubric->ai_insight,
                'ai_recommendation' => $rubric->ai_recommendation,
            ])->values()),
            'qualitative' => $this->qualitative,
            'field_notes' => $this->field_notes,
            'strategy' => $this->strategy,
            'parent_report' => $this->parent_report,
            'discuss_teacher' => $this->discuss_teacher,
            'files' => $this->files ?? [],
            'ai_recommendation' => $this->ai_recommendation ?? [],
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}

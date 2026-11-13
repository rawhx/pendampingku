<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nisn' => $this->nisn,
            'full_name' => $this->full_name,
            'nickname' => $this->nickname,
            'gender' => $this->gender,
            'birth_date' => $this->birth_date?->toDateString(),
            'grade' => $this->grade,
            'school' => $this->school,
            'mentoring_start_date' => $this->mentoring_start_date?->toDateString(),
            'status' => $this->status,
            'disability_condition' => $this->disability_condition,
            'parent_name' => $this->parent_name,
            'parent_contact' => $this->parent_contact,
            'emergency_contact' => $this->emergency_contact,
            'insight_student_ai' => $this->insight_student_ai,
            'analisis_capaian' => $this->analisis_capaian ?? [],
            'created_at' => $this->created_at?->toISOString(),
        ];
    }
}

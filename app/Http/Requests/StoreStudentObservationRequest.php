<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStudentObservationRequest extends FormRequest
{
    protected function prepareForValidation(): void
    {
        foreach (['rubric', 'qualitative', 'ai_recommendation'] as $field) {
            if (is_string($this->input($field))) {
                $this->merge([$field => json_decode($this->input($field), true)]);
            }
        }
    }

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'observed_on' => ['required', 'date'],
            'start_time' => ['required', 'date_format:H:i'],
            'end_time' => ['required', 'date_format:H:i', 'after:start_time'],
            'subject' => ['required', 'string', 'max:255'],
            'emotion' => ['required', 'string', 'max:100'],
            'rubric' => ['required', 'array'],
            'rubric.*' => ['required', 'string', 'max:100'],
            'qualitative' => ['required', 'array'],
            'qualitative.*' => ['required', 'string'],
            'field_notes' => ['required', 'string'],
            'strategy' => ['required', 'string'],
            'parent_report' => ['required', 'boolean'],
            'discuss_teacher' => ['required', 'boolean'],
            'files' => ['required', 'array', 'min:1', 'max:5'],
            'files.*' => ['required', 'image', 'mimes:jpg,jpeg,png', 'max:5120'],
            'ai_recommendation' => ['nullable', 'array'],
            'ai_recommendation.*.heading' => ['required_with:ai_recommendation', 'string', 'max:255'],
            'ai_recommendation.*.body' => ['required_with:ai_recommendation', 'string'],
        ];
    }
}

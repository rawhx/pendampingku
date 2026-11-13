<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user() !== null;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nisn' => ['required', 'string', 'regex:/^\d{10}$/', Rule::unique('students', 'nisn')],
            'full_name' => ['required', 'string', 'max:255'],
            'nickname' => ['required', 'string', 'max:255'],
            'gender' => ['required', Rule::in(['Perempuan', 'Laki-laki'])],
            'birth_date' => ['required', 'date', 'before_or_equal:today'],
            'grade' => ['required', 'integer', 'between:1,12'],
            'school' => ['required', 'string', 'max:255'],
            'mentoring_start_date' => ['required', 'date'],
            'status' => ['required', Rule::in(['Aktif', 'Cuti', 'Selesai'])],
            'disability_condition' => ['required', Rule::in([
                'ASD (Autism Spectrum)',
                'ADHD',
                'Disleksia',
                'Dispraksia & Speech Delay',
            ])],
            'parent_name' => ['required', 'string', 'max:255'],
            'parent_contact' => ['required', 'string', 'max:20'],
            'emergency_contact' => ['required', 'string', 'max:20'],
        ];
    }
}

<?php

namespace App\Http\Requests;

use App\Models\Student;
use Illuminate\Validation\Rule;

class UpdateStudentRequest extends StoreStudentRequest
{
    public function rules(): array
    {
        $rules = parent::rules();
        /** @var Student $student */
        $student = $this->route('student');
        $rules['nisn'] = [
            'required',
            'string',
            'regex:/^\d{10}$/',
            Rule::unique('students', 'nisn')->ignore($student),
        ];

        return $rules;
    }
}

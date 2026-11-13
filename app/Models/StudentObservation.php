<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StudentObservation extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'observed_on',
        'start_time',
        'end_time',
        'subject',
        'emotion',
        'qualitative',
        'field_notes',
        'strategy',
        'parent_report',
        'discuss_teacher',
        'files',
        'ai_recommendation',
    ];

    protected function casts(): array
    {
        return [
            'observed_on' => 'date',
            'qualitative' => 'array',
            'parent_report' => 'boolean',
            'discuss_teacher' => 'boolean',
            'files' => 'array',
            'ai_recommendation' => 'array',
        ];
    }

    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    public function rubrics(): HasMany
    {
        return $this->hasMany(StudentObservationRubric::class);
    }
}

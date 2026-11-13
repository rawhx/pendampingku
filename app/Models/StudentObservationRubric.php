<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentObservationRubric extends Model
{
    use HasUuids;

    public $incrementing = false;

    protected $keyType = 'string';

    protected $fillable = [
        'rubric_code',
        'aspect_code',
        'score',
        'ai_insight',
        'ai_recommendation',
    ];

    public function observation(): BelongsTo
    {
        return $this->belongsTo(StudentObservation::class, 'student_observation_id');
    }
}

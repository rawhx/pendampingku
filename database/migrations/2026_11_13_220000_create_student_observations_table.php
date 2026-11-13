<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_observations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('student_id')->constrained()->cascadeOnDelete();
            $table->date('observed_on');
            $table->time('start_time');
            $table->time('end_time');
            $table->string('subject');
            $table->string('emotion');
            $table->json('rubric');
            $table->json('qualitative');
            $table->text('field_notes');
            $table->text('strategy');
            $table->boolean('parent_report')->default(false);
            $table->boolean('discuss_teacher')->default(false);
            $table->json('files')->nullable();
            $table->json('ai_recommendation')->nullable();
            $table->timestamps();

            $table->index(['student_id', 'observed_on']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('student_observations');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('student_observation_rubrics', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('student_observation_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->string('rubric_code', 20);
            $table->string('aspect_code', 1);
            $table->string('score', 10);
            $table->text('ai_insight');
            $table->text('ai_recommendation');
            $table->timestamps();

            $table->unique(['student_observation_id', 'rubric_code']);
            $table->index(['student_observation_id', 'aspect_code']);
        });

        Schema::table('student_observations', function (Blueprint $table) {
            $table->dropColumn(['rubric', 'ai_insights']);
        });
    }

    public function down(): void
    {
        Schema::table('student_observations', function (Blueprint $table) {
            $table->json('rubric')->nullable();
            $table->json('ai_insights')->nullable();
        });

        Schema::dropIfExists('student_observation_rubrics');
    }
};

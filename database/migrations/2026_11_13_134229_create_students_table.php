<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('students', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('nisn', 10)->unique();
            $table->string('full_name');
            $table->string('nickname');
            $table->string('gender', 20);
            $table->date('birth_date');
            $table->unsignedTinyInteger('grade');
            $table->string('school');
            $table->date('mentoring_start_date');
            $table->string('status', 20);
            $table->string('disability_condition');
            $table->string('parent_name');
            $table->string('parent_contact', 20);
            $table->string('emergency_contact', 20);
            $table->timestamps();

            $table->index(['user_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};

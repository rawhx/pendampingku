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
        Schema::table('student_observation_rubrics', function (Blueprint $table) {
            $table->string('aspect_code', 20)->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('student_observation_rubrics', function (Blueprint $table) {
            $table->string('aspect_code', 1)->change();
        });
    }
};

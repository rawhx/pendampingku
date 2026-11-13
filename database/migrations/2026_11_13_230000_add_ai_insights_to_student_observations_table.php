<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('student_observations', function (Blueprint $table) {
            $table->json('ai_insights')->nullable()->after('ai_recommendation');
        });
    }

    public function down(): void
    {
        Schema::table('student_observations', function (Blueprint $table) {
            $table->dropColumn('ai_insights');
        });
    }
};

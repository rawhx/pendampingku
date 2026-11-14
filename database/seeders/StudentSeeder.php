<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $demoUser = User::query()->firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => 'password',
                'email_verified_at' => now(),
            ],
        );

        Student::query()->updateOrCreate(
            [
                'user_id' => $demoUser->id,
                'nisn' => '1234567890',
            ],
            [
                'full_name' => 'Alya Putri Ramadhani',
                'nickname' => 'Alya',
                'gender' => 'Perempuan',
                'birth_date' => '2016-05-12',
                'grade' => 4,
                'school' => 'SD Inklusi Harapan Bangsa',
                'mentoring_start_date' => '2026-01-12',
                'status' => 'Aktif',
                'disability_condition' => 'ASD (Autism Spectrum)',
                'parent_name' => 'Budi Ramadhani',
                'parent_contact' => '081234567890',
                'emergency_contact' => '081298765432',
            ],
        );
    }
}

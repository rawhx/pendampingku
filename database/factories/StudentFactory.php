<?php

namespace Database\Factories;

use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'nisn' => fake()->unique()->numerify('##########'),
            'full_name' => fake()->name(),
            'nickname' => fake()->firstName(),
            'gender' => fake()->randomElement(['Perempuan', 'Laki-laki']),
            'birth_date' => fake()->dateTimeBetween('-17 years', '-5 years')->format('Y-m-d'),
            'grade' => fake()->numberBetween(1, 12),
            'school' => fake()->company().' School',
            'mentoring_start_date' => fake()->date(),
            'status' => fake()->randomElement(['Aktif', 'Cuti', 'Selesai']),
            'disability_condition' => fake()->randomElement([
                'ASD (Autism Spectrum)',
                'ADHD',
                'Disleksia',
                'Dispraksia & Speech Delay',
            ]),
            'parent_name' => fake()->name(),
            'parent_contact' => fake()->numerify('08##########'),
            'emergency_contact' => fake()->numerify('08##########'),
        ];
    }
}

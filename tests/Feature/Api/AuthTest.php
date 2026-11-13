<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\GoogleProvider;
use Laravel\Socialite\Two\User as SocialiteUser;
use Mockery;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_login_and_access_their_profile(): void
    {
        $user = User::factory()->create([
            'email' => 'budi@example.com',
            'password' => Hash::make('password'),
        ]);

        $response = $this->postJson('/api/auth/login', [
            'email' => 'budi@example.com',
            'password' => 'password',
            'device_name' => 'flutter',
        ]);

        $response->assertOk()
            ->assertJsonStructure([
                'token',
                'token_type',
                'user' => ['id', 'name', 'email', 'avatar', 'email_verified_at'],
            ])
            ->assertJsonPath('token_type', 'Bearer')
            ->assertJsonPath('user.id', $user->id);

        $this->withHeader('Authorization', 'Bearer '.$response->json('token'))
            ->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('user.email', 'budi@example.com');
    }

    public function test_users_can_not_login_with_invalid_password(): void
    {
        User::factory()->create([
            'email' => 'budi@example.com',
            'password' => Hash::make('password'),
        ]);

        $this->postJson('/api/auth/login', [
            'email' => 'budi@example.com',
            'password' => 'wrong-password',
        ])->assertStatus(422)
            ->assertJsonValidationErrors('email');
    }

    public function test_login_requires_valid_input(): void
    {
        $this->postJson('/api/auth/login', [])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['email', 'password']);
    }

    public function test_users_can_register(): void
    {
        $response = $this->postJson('/api/auth/register', [
            'name' => 'Siti Aminah',
            'email' => 'siti@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
            'device_name' => 'android',
        ]);

        $response->assertCreated()
            ->assertJsonPath('user.email', 'siti@example.com');

        $this->assertDatabaseHas('users', ['email' => 'siti@example.com']);

        $this->withHeader('Authorization', 'Bearer '.$response->json('token'))
            ->getJson('/api/auth/me')
            ->assertOk()
            ->assertJsonPath('user.email', 'siti@example.com');
    }

    public function test_registration_rejects_duplicate_email(): void
    {
        User::factory()->create(['email' => 'siti@example.com']);

        $this->postJson('/api/auth/register', [
            'name' => 'Siti Aminah',
            'email' => 'siti@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ])->assertStatus(422)
            ->assertJsonValidationErrors('email');
    }

    public function test_logout_revokes_the_current_token(): void
    {
        $user = User::factory()->create();
        $token = $user->createToken('mobile')->plainTextToken;

        $this->withHeader('Authorization', 'Bearer '.$token)
            ->postJson('/api/auth/logout')
            ->assertNoContent();

        $this->assertDatabaseCount('personal_access_tokens', 0);

        $this->app['auth']->forgetGuards();

        $this->withHeader('Authorization', 'Bearer '.$token)
            ->getJson('/api/auth/me')
            ->assertUnauthorized();
    }

    public function test_google_login_creates_a_new_user(): void
    {
        $this->mockGoogleUser('google-123', 'budi@example.com', 'Budi Santoso');

        $response = $this->postJson('/api/auth/google', [
            'id_token' => 'valid-id-token',
        ]);

        $response->assertOk()
            ->assertJsonPath('token_type', 'Bearer')
            ->assertJsonPath('user.email', 'budi@example.com');

        $user = User::where('email', 'budi@example.com')->firstOrFail();

        $this->assertSame('google-123', $user->google_id);
        $this->assertNull($user->password);
        $this->assertNotNull($user->email_verified_at);
    }

    public function test_google_login_links_an_existing_user_by_email(): void
    {
        $existing = User::factory()->create([
            'email' => 'budi@example.com',
            'password' => Hash::make('password'),
        ]);

        $this->mockGoogleUser('google-123', 'budi@example.com', 'Budi Santoso');

        $this->postJson('/api/auth/google', [
            'id_token' => 'valid-id-token',
        ])->assertOk();

        $this->assertDatabaseCount('users', 1);
        $this->assertSame('google-123', $existing->fresh()->google_id);
        $this->assertNotNull($existing->fresh()->password);
    }

    public function test_google_login_rejects_an_unverified_email(): void
    {
        $this->mockGoogleUser('google-123', 'budi@example.com', 'Budi Santoso', verified: false);

        $this->postJson('/api/auth/google', [
            'id_token' => 'valid-id-token',
        ])->assertStatus(422)
            ->assertJsonValidationErrors('email');

        $this->assertDatabaseMissing('users', ['email' => 'budi@example.com']);
    }

    public function test_google_login_rejects_an_invalid_token(): void
    {
        $provider = Mockery::mock(GoogleProvider::class);
        $provider->shouldReceive('stateless')->andReturnSelf();
        $provider->shouldReceive('userFromToken')->andThrow(new \Exception('Invalid token'));

        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);

        $this->postJson('/api/auth/google', [
            'id_token' => 'invalid-id-token',
        ])->assertStatus(422)
            ->assertJsonValidationErrors('id_token');
    }

    private function mockGoogleUser(
        string $id,
        string $email,
        string $name,
        bool $verified = true,
    ): void {
        $socialiteUser = (new SocialiteUser)->map([
            'id' => $id,
            'name' => $name,
            'email' => $email,
            'avatar' => 'https://example.com/avatar.png',
        ])->setRaw([
            'sub' => $id,
            'name' => $name,
            'email' => $email,
            'email_verified' => $verified,
            'picture' => 'https://example.com/avatar.png',
        ]);

        $provider = Mockery::mock(GoogleProvider::class);
        $provider->shouldReceive('stateless')->andReturnSelf();
        $provider->shouldReceive('userFromToken')
            ->with('valid-id-token')
            ->andReturn($socialiteUser);

        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);
    }
}

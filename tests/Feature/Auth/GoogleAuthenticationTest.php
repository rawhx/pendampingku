<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\GoogleProvider;
use Laravel\Socialite\Two\User as SocialiteUser;
use Mockery;
use Tests\TestCase;

class GoogleAuthenticationTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_are_redirected_to_google(): void
    {
        $this->mockProvider()
            ->shouldReceive('redirect')
            ->once()
            ->andReturn(redirect('https://accounts.google.com/o/oauth2/auth'));

        $this->get('/auth/google/redirect')
            ->assertRedirect('https://accounts.google.com/o/oauth2/auth');
    }

    public function test_users_can_authenticate_with_google(): void
    {
        $this->mockProvider()
            ->shouldReceive('user')
            ->once()
            ->andReturn($this->googleUser('google-123', 'budi@example.com', 'Budi Santoso'));

        $this->get('/auth/google/callback')
            ->assertRedirect(route('dashboard', absolute: false));

        $this->assertAuthenticated();

        $user = User::where('email', 'budi@example.com')->firstOrFail();

        $this->assertSame('google-123', $user->google_id);
        $this->assertNull($user->password);
    }

    public function test_existing_users_are_linked_by_email(): void
    {
        $existing = User::factory()->create([
            'email' => 'budi@example.com',
            'password' => Hash::make('password'),
        ]);

        $this->mockProvider()
            ->shouldReceive('user')
            ->once()
            ->andReturn($this->googleUser('google-123', 'budi@example.com', 'Budi Santoso'));

        $this->get('/auth/google/callback')
            ->assertRedirect(route('dashboard', absolute: false));

        $this->assertAuthenticatedAs($existing->fresh());
        $this->assertDatabaseCount('users', 1);
        $this->assertSame('google-123', $existing->fresh()->google_id);
    }

    public function test_unverified_google_email_is_rejected(): void
    {
        $this->mockProvider()
            ->shouldReceive('user')
            ->once()
            ->andReturn($this->googleUser('google-123', 'budi@example.com', 'Budi Santoso', verified: false));

        $this->get('/auth/google/callback')
            ->assertRedirect(route('login'))
            ->assertSessionHasErrors('google');

        $this->assertGuest();
        $this->assertDatabaseMissing('users', ['email' => 'budi@example.com']);
    }

    public function test_google_errors_redirect_back_to_login(): void
    {
        $this->mockProvider()
            ->shouldReceive('user')
            ->once()
            ->andThrow(new \Exception('Invalid state'));

        $this->get('/auth/google/callback')
            ->assertRedirect(route('login'))
            ->assertSessionHasErrors('google');

        $this->assertGuest();
    }

    private function mockProvider(): GoogleProvider
    {
        $provider = Mockery::mock(GoogleProvider::class);

        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);

        return $provider;
    }

    private function googleUser(
        string $id,
        string $email,
        string $name,
        bool $verified = true,
    ): SocialiteUser {
        return (new SocialiteUser)->map([
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
    }
}

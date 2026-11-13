<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    public function test_reset_password_link_screen_can_be_rendered(): void
    {
        $response = $this->get('/forgot-password');

        $response->assertStatus(200);
    }

    public function test_reset_password_link_can_be_requested(): void
    {
        Notification::fake();

        $user = User::factory()->create();

        $this->post('/forgot-password', ['email' => $user->email]);

        Notification::assertSentTo($user, ResetPasswordNotification::class);
    }

    public function test_reset_password_notification_uses_indonesian_template(): void
    {
        Notification::fake();

        $user = User::factory()->create();

        $this->post('/forgot-password', ['email' => $user->email]);

        Notification::assertSentTo(
            $user,
            ResetPasswordNotification::class,
            function (ResetPasswordNotification $notification, array $channels, User $notifiable) {
                $mail = $notification->toMail($notifiable);

                $html = view($mail->view['html'], $mail->viewData)->render();

                return $mail->subject === 'Atur Ulang Kata Sandi '.config('app.name')
                    && $mail->view['html'] === 'emails.reset-password'
                    && $mail->view['text'] === 'emails.reset-password-text'
                    && $mail->viewData['name'] === $notifiable->name
                    && $mail->viewData['email'] === $notifiable->email
                    && str_contains($mail->viewData['url'], '/reset-password/'.$notification->token)
                    && str_contains($mail->viewData['url'], urlencode($notifiable->email))
                    && str_contains($html, '#0081F2')
                    && str_contains($html, config('app.name'))
                    && str_contains($html, 'Atur Ulang Kata Sandi');
            }
        );
    }

    public function test_reset_password_link_success_message_is_indonesian(): void
    {
        Notification::fake();

        $user = User::factory()->create();

        $this->post('/forgot-password', ['email' => $user->email])
            ->assertSessionHas('status', 'Tautan reset kata sandi telah dikirim ke email Anda.');
    }

    public function test_invalid_reset_password_token_message_is_indonesian(): void
    {
        $user = User::factory()->create();

        $this->post('/reset-password', [
            'token' => 'invalid-token',
            'email' => $user->email,
            'password' => 'password',
            'password_confirmation' => 'password',
        ])->assertSessionHasErrors([
            'email' => 'Tautan reset kata sandi tidak valid atau sudah kedaluwarsa.',
        ]);
    }

    public function test_reset_password_screen_can_be_rendered(): void
    {
        Notification::fake();

        $user = User::factory()->create();

        $this->post('/forgot-password', ['email' => $user->email]);

        Notification::assertSentTo($user, ResetPasswordNotification::class, function ($notification) {
            $response = $this->get('/reset-password/'.$notification->token);

            $response->assertStatus(200);

            return true;
        });
    }

    public function test_password_can_be_reset_with_valid_token(): void
    {
        Notification::fake();

        $user = User::factory()->create();

        $this->post('/forgot-password', ['email' => $user->email]);

        Notification::assertSentTo($user, ResetPasswordNotification::class, function ($notification) use ($user) {
            $response = $this->post('/reset-password', [
                'token' => $notification->token,
                'email' => $user->email,
                'password' => 'password',
                'password_confirmation' => 'password',
            ]);

            $response
                ->assertSessionHasNoErrors()
                ->assertRedirect(route('login'));

            return true;
        });
    }
}

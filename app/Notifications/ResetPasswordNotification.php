<?php

namespace App\Notifications;

use Illuminate\Auth\Notifications\ResetPassword as BaseResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class ResetPasswordNotification extends BaseResetPassword
{
    /**
     * Build the mail representation of the notification in Indonesian.
     */
    public function toMail($notifiable): MailMessage
    {
        $expire = config(
            'auth.passwords.'.config('auth.defaults.passwords').'.expire',
        );

        $data = [
            'appName' => config('app.name'),
            'name' => $notifiable->name ?: 'Pengguna',
            'email' => $notifiable->email,
            'url' => $this->resetUrl($notifiable),
            'expire' => $expire,
        ];

        return (new MailMessage)
            ->subject('Atur Ulang Kata Sandi '.$data['appName'])
            ->view('emails.reset-password', $data)
            ->text('emails.reset-password-text', $data);
    }
}

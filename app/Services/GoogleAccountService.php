<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Two\User as SocialiteUser;

class GoogleAccountService
{
    /**
     * Resolve the local user for a verified Google account.
     *
     * Existing users are matched by Google ID first, then by email and linked.
     * New users are created without a password.
     *
     * @throws ValidationException
     */
    public function resolve(SocialiteUser $googleUser): User
    {
        $raw = $googleUser->getRaw();

        $emailVerified = filter_var(
            $raw['email_verified'] ?? false,
            FILTER_VALIDATE_BOOLEAN,
        );

        if (! $emailVerified) {
            throw ValidationException::withMessages([
                'email' => ['Email Google belum diverifikasi.'],
            ]);
        }

        $email = $googleUser->getEmail();

        if (! $email) {
            throw ValidationException::withMessages([
                'email' => ['Akun Google tidak memiliki alamat email.'],
            ]);
        }

        $user = User::where('google_id', $googleUser->getId())->first()
            ?? User::where('email', $email)->first();

        if ($user) {
            $attributes = [];

            if (! $user->google_id) {
                $attributes['google_id'] = $googleUser->getId();
            }

            if (! $user->avatar && $googleUser->getAvatar()) {
                $attributes['avatar'] = $googleUser->getAvatar();
            }

            if (! $user->email_verified_at) {
                $attributes['email_verified_at'] = now();
            }

            if ($attributes !== []) {
                $user->forceFill($attributes)->save();
            }

            return $user;
        }

        $user = User::create([
            'name' => $googleUser->getName() ?: str($email)->before('@')->toString(),
            'email' => $email,
            'google_id' => $googleUser->getId(),
            'avatar' => $googleUser->getAvatar(),
        ]);

        $user->forceFill(['email_verified_at' => now()])->save();

        return $user;
    }
}

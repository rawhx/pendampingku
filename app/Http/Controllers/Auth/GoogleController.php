<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\GoogleAccountService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function __construct(private GoogleAccountService $googleAccounts) {}

    /**
     * Redirect the user to Google's OAuth consent screen.
     */
    public function redirect(): RedirectResponse
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Handle the callback from Google and log the user in.
     */
    public function callback(Request $request): RedirectResponse
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (\Throwable $exception) {
            report($exception);

            return redirect()
                ->route('login')
                ->withErrors(['google' => 'Gagal masuk dengan Google. Silakan coba lagi.']);
        }

        try {
            $user = $this->googleAccounts->resolve($googleUser);
        } catch (ValidationException $exception) {
            return redirect()
                ->route('login')
                ->withErrors([
                    'google' => collect($exception->errors())->flatten()->first(),
                ]);
        }

        Auth::login($user, remember: true);

        $request->session()->regenerate();

        return redirect()->intended(route('dashboard', absolute: false));
    }
}

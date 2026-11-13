<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Services\GoogleAccountService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as SocialiteUser;

class GoogleAuthController extends Controller
{
    public function __construct(private GoogleAccountService $googleAccounts) {}

    /**
     * Authenticate the user with a Google ID token and issue an API token.
     *
     * @throws ValidationException
     */
    public function __invoke(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'id_token' => ['required', 'string'],
            'device_name' => ['nullable', 'string', 'max:255'],
        ]);

        try {
            /** @var SocialiteUser $googleUser */
            $googleUser = Socialite::driver('google')
                ->stateless()
                ->userFromToken($validated['id_token']);
        } catch (\Throwable $exception) {
            report($exception);

            throw ValidationException::withMessages([
                'id_token' => ['Token Google tidak valid atau sudah kedaluwarsa.'],
            ]);
        }

        $user = $this->googleAccounts->resolve($googleUser);

        return response()->json([
            'token' => $user->createToken($validated['device_name'] ?? 'mobile')->plainTextToken,
            'token_type' => 'Bearer',
            'user' => UserResource::make($user),
        ]);
    }
}

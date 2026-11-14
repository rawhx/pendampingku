<?php

use App\Http\Controllers\Api\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Api\Auth\GoogleAuthController;
use App\Http\Controllers\Api\Auth\LogoutController;
use App\Http\Controllers\Api\Auth\MeController;
use App\Http\Controllers\Api\Auth\RegisteredUserController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\StudentObservationController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('register', [RegisteredUserController::class, 'store'])
        ->middleware('throttle:6,1');

    Route::post('login', [AuthenticatedSessionController::class, 'store'])
        ->middleware('throttle:5,1');

    Route::post('google', GoogleAuthController::class)
        ->middleware('throttle:10,1');

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('me', MeController::class);
        Route::post('logout', LogoutController::class);
    });
});

Route::middleware('auth:sanctum')->apiResource('students', StudentController::class)
    ->only(['index', 'store', 'show', 'update']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('dashboard', DashboardController::class);
    Route::get('students/{student}/observations', [StudentObservationController::class, 'index']);
    Route::post('students/{student}/observations', [StudentObservationController::class, 'store']);
    Route::get('students/{student}/observations/{observation}', [StudentObservationController::class, 'show']);
    Route::get('students/{student}/observations/{observation}/pdf', [StudentObservationController::class, 'downloadPdf']);
    Route::post('students/{student}/observations/generate-ai', [StudentObservationController::class, 'generate']);
})->scopeBindings();

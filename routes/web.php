<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('landing/Landing', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('landing');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard/Dashboard');
    })->name('dashboard');

    Route::get('/siswa-binaan', function () {
        return Inertia::render('siswaBinaan/SiswaBinaanPage');
    })->name('siswa-binaan');

    Route::get('/siswa-binaan/tambah', function () {
        return Inertia::render('siswaBinaan/TambahSiswaPage');
    })->name('siswa-binaan.create');

    Route::get('/siswa-binaan/{student}/edit', function (string $student) {
        return Inertia::render('siswaBinaan/EditSiswaPage', [
            'studentId' => $student,
        ]);
    })->name('siswa-binaan.edit');

    Route::get('/siswa-binaan/{student}/laporan', function (string $student) {
        return Inertia::render('siswaBinaan/LaporanSiswaPage', [
            'studentId' => $student,
        ]);
    })->name('siswa-binaan.laporan');

    Route::get('/siswa-binaan/{student}/catatan-harian', function (string $student) {
        return Inertia::render('siswaBinaan/CatatanHarianPage', [
            'studentId' => $student,
        ]);
    })->name('siswa-binaan.catatan-harian');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

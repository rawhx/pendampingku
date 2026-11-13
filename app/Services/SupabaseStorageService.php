<?php

namespace App\Services;

use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use RuntimeException;

class SupabaseStorageService
{
    /**
     * @return array{name: string, path: string, url: string, size: int, type: string}
     */
    public function upload(UploadedFile $file, string $path): array
    {
        $baseUrl = rtrim((string) config('services.supabase.url'), '/');
        $bucket = rawurlencode((string) config('services.supabase.bucket'));

        if ($baseUrl === '' || config('services.supabase.service_role_key') === null) {
            throw new RuntimeException('Konfigurasi Supabase Storage belum lengkap.');
        }

        $this->client()
            ->withBody($file->get(), (string) $file->getMimeType())
            ->post("{$baseUrl}/storage/v1/object/{$bucket}/".str_replace('%2F', '/', rawurlencode($path)))
            ->throw();

        return [
            'name' => $file->getClientOriginalName(),
            'path' => $path,
            'url' => "{$baseUrl}/storage/v1/object/public/{$bucket}/".str_replace('%2F', '/', rawurlencode($path)),
            'size' => $file->getSize(),
            'type' => (string) $file->getMimeType(),
        ];
    }

    private function client(): PendingRequest
    {
        return Http::timeout(30)
            ->withHeaders([
                'Authorization' => 'Bearer '.config('services.supabase.service_role_key'),
                'apikey' => config('services.supabase.service_role_key'),
                'x-upsert' => 'false',
            ]);
    }
}

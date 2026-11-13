<?php

namespace App\Services;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Facades\Http;
use RuntimeException;
use Throwable;

class StudentObservationAiService
{
    /**
     * @param  array<string, string>  $rubric
     * @param  array<string, string>  $qualitative
     * @return array<string, array{aspect_code: string, insight: string, recommendation: string}>
     */
    public function generateRubricInsights(
        string $fieldNotes,
        string $studentName,
        array $rubric,
        array $qualitative,
    ): array {
        $rubricCodes = array_keys($rubric);

        $codesJson = $this->encode($rubricCodes);
        $rubricJson = $this->encode($rubric);
        $qualitativeJson = $this->encode($qualitative);

        $prompt = <<<PROMPT
Anda adalah asisten analisis pendidikan inklusif.
Analisis setiap rubric berikut berdasarkan catatan observasi siswa.
Jangan membuat diagnosis atau mengarang fakta. Gunakan hanya data yang tersedia.
Untuk setiap kode rubric, buat insight singkat berbasis bukti dan satu rekomendasi praktis.
Kembalikan JSON valid saja dengan format:
{"rubrics":{"ER01":{"insight":"...","recommendation":"..."},"BR01":{"insight":"...","recommendation":"..."}}}
Nama siswa: {$studentName}
Kode rubric: {$codesJson}
Nilai rubric: {$rubricJson}
Catatan kualitatif: {$qualitativeJson}
Catatan lapangan: {$fieldNotes}
PROMPT;

        $content = $this->requestStructured($prompt);

        $decoded = json_decode($content, true);
        $insights = $decoded['rubrics'] ?? null;

        if (! is_array($insights)) {
            throw new RuntimeException('Respons AI insight rubric tidak valid.');
        }

        return collect($rubricCodes)->mapWithKeys(function (string $code) use ($insights): array {
            $item = $insights[$code] ?? null;

            if (! is_array($item) || ! isset($item['insight'], $item['recommendation'])) {
                throw new RuntimeException("Insight AI untuk rubric {$code} tidak lengkap.");
            }

            return [$code => [
                'aspect_code' => substr($code, 0, 2),
                'insight' => (string) $item['insight'],
                'recommendation' => (string) $item['recommendation'],
            ]];
        })->all();
    }

    /**
     * @return array<int, array{heading: string, body: string}>
     */
    public function generate(string $fieldNotes, string $studentName): array
    {
        $content = $this->requestStructured($this->prompt($fieldNotes, $studentName));

        $decoded = json_decode($content, true);

        if (! is_array($decoded) || ! isset($decoded['recommendations']) || ! is_array($decoded['recommendations'])) {
            throw new RuntimeException('Respons AI tidak memiliki format rekomendasi yang valid.');
        }

        return collect($decoded['recommendations'])
            ->filter(fn ($item) => is_array($item) && isset($item['heading'], $item['body']))
            ->map(fn ($item) => [
                'heading' => (string) $item['heading'],
                'body' => (string) $item['body'],
            ])
            ->values()
            ->all();
    }

    private function prompt(string $fieldNotes, string $studentName): string
    {
        return <<<PROMPT
Anda adalah asisten pedagogis untuk pendamping siswa berkebutuhan khusus.
Analisis catatan lapangan berikut secara objektif dan berikan rekomendasi praktis.
Jangan membuat diagnosis, jangan mengarang fakta, dan gunakan bahasa Indonesia yang profesional.
Kembalikan JSON valid saja dengan format:
{"recommendations":[{"heading":"...","body":"..."}]}
Buat 2 sampai 4 rekomendasi. Nama siswa: {$studentName}.
Catatan lapangan:
{$fieldNotes}
PROMPT;
    }

    private function encode(mixed $value): string
    {
        return json_encode($value, JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR);
    }

    private function requestStructured(string $prompt): string
    {
        return match (config('services.ai.provider')) {
            'openai' => $this->requestOpenAiPrompt($prompt),
            'gemini' => $this->requestGeminiPrompt($prompt),
            default => throw new RuntimeException('Provider AI belum dikonfigurasi.'),
        };
    }

    private function requestOpenAiPrompt(string $prompt): string
    {
        $response = $this->client()
            ->withToken((string) config('services.ai.openai.key'))
            ->post((string) config('services.ai.openai.url'), [
                'model' => config('services.ai.openai.model'),
                'temperature' => 0.3,
                'response_format' => ['type' => 'json_object'],
                'messages' => [
                    ['role' => 'system', 'content' => 'Anda menghasilkan JSON valid sesuai instruksi pengguna.'],
                    ['role' => 'user', 'content' => $prompt],
                ],
            ]);

        $response->throw();

        return (string) data_get($response->json(), 'choices.0.message.content');
    }

    private function requestGeminiPrompt(string $prompt): string
    {
        $models = array_values(array_filter((array) config('services.ai.gemini.models')));
        $baseUrl = rtrim((string) config('services.ai.gemini.base_url'), '/');

        $lastException = null;

        foreach ($models as $model) {
            try {
                $response = $this->client()->post(sprintf(
                    '%s/%s:generateContent?key=%s',
                    $baseUrl,
                    $model,
                    urlencode((string) config('services.ai.gemini.key')),
                ), [
                    'generationConfig' => [
                        'temperature' => 0.3,
                        'responseMimeType' => 'application/json',
                    ],
                    'contents' => [['parts' => [['text' => $prompt]]]],
                ]);

                $response->throw();

                return (string) data_get($response->json(), 'candidates.0.content.parts.0.text');
            } catch (RequestException|ConnectionException $e) {
                // 503 / 429 (kuota) / error lain: lanjut ke model berikutnya.
                report($e);
                $lastException = $e;
            }
        }

        throw $lastException ?? new RuntimeException('Model Gemini belum dikonfigurasi.');
    }

    private function client(): PendingRequest
    {
        return Http::timeout((int) config('services.ai.timeout', 30))
            ->acceptJson()
            ->retry(
                (int) config('services.ai.retries', 2),
                fn (int $attempt): int => $attempt * 1000, // 1s, 2s
                function (Throwable $e): bool {
                    if ($e instanceof ConnectionException) {
                        return true;
                    }

                    return $e instanceof RequestException
                        && in_array($e->response->status(), [500, 502, 503, 504], true);
                },
                throw: false,
            );
    }
}
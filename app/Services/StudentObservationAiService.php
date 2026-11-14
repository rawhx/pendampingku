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
     * @var array<string, string>
     */
    private const MATRIX_NAMES = [
        'A' => 'Regulasi Emosi',
        'B' => 'Regulasi Perilaku',
        'C' => 'Kemandirian',
        'D' => 'Komunikasi',
        'E' => 'Interaksi Sosial',
        'F' => 'Perkembangan Akademik',
    ];

    /**
     * @param  array<string, string>  $rubric
     * @param  array<string, string>  $qualitative
     * @param  array<string, mixed>  $session
     * @return array{rubrics: array<string, array{aspect_code: string, insight: string, recommendation: string}>, matrix_insights: array<string, string>, overall_insight: string}
     */
    public function generateRubricInsights(
        string $fieldNotes,
        string $studentName,
        array $rubric,
        array $qualitative,
        array $session = [],
    ): array {
        $rubricCodes = array_keys($rubric);

        $codesJson = $this->encode($rubricCodes);
        $rubricJson = $this->encode($rubric);
        $qualitativeJson = $this->encode($qualitative);
        $sessionJson = $this->encode($session);
        $matrixNames = $this->encode([
            'A' => 'Regulasi Emosi',
            'B' => 'Regulasi Perilaku',
            'C' => 'Kemandirian',
            'D' => 'Komunikasi',
            'E' => 'Interaksi Sosial',
            'F' => 'Perkembangan Akademik',
        ]);

        $prompt = <<<PROMPT
Anda adalah asisten analisis pendidikan inklusif.
Analisis nilai setiap rubric berikut berdasarkan level bantuan yang dibutuhkan siswa.
Makna skor wajib digunakan: 4 = Mandiri tanpa prompt; 3 = Bantuan Minimal berupa prompt gestur/verbal;
2 = Bantuan Sedang berupa modeling dan verbal; 1 = Bantuan Maksimal berupa bimbingan fisik penuh;
0 = Belum Tercapai, menolak atau menunjukkan resistensi.
Skor lebih tinggi berarti kemandirian lebih tinggi dan kebutuhan bantuan lebih rendah.
Jangan membuat diagnosis atau mengarang fakta. Gunakan hanya data yang tersedia.
Untuk setiap rubric, buat insight berbasis skor dan data observasi.
Tuliskan hasil menjadi insight secara keseluruhan berdasarkan catatan. Nilai N/O atau "no" berarti tidak diamati dan
tidak boleh dianggap sebagai skor 0.
Kembalikan JSON valid saja dengan format:
{"rubrics":{"ER01":{"insight":"...","recommendation":"..."},"BR01":{"insight":"...","recommendation":"..."}},
"matrix_insights":{"A":"...","B":"...","C":"...","D":"...","E":"...","F":"..."},
"overall_insight":"..."}
Nama siswa: {$studentName}
Kode rubric: {$codesJson}
Nilai rubric: {$rubricJson}
Nama matriks: {$matrixNames}
Catatan kualitatif: {$qualitativeJson}
Catatan lapangan: {$fieldNotes}
Data sesi lainnya: {$sessionJson}
PROMPT;

        $content = $this->requestStructured($prompt);

        $decoded = json_decode($content, true);
        $insights = $decoded['rubrics'] ?? null;
        $matrixInsights = $decoded['matrix_insights'] ?? null;
        $overallInsight = $decoded['overall_insight'] ?? null;

        if (! is_array($insights) || ! is_array($matrixInsights) || ! is_string($overallInsight)) {
            throw new RuntimeException('Respons AI insight rubric tidak valid.');
        }

        return [
            'rubrics' => collect($rubricCodes)->mapWithKeys(function (string $code) use ($insights): array {
                $item = $insights[$code] ?? null;

                if (! is_array($item) || ! isset($item['insight'], $item['recommendation'])) {
                    throw new RuntimeException("Insight AI untuk rubric {$code} tidak lengkap.");
                }

                return [$code => [
                    'aspect_code' => substr($code, 0, 2),
                    'insight' => (string) $item['insight'],
                    'recommendation' => (string) $item['recommendation'],
                ]];
            })->all(),
            'matrix_insights' => collect(range('A', 'F'))->mapWithKeys(function (string $aspect) use ($matrixInsights): array {
                if (! isset($matrixInsights[$aspect]) || ! is_string($matrixInsights[$aspect])) {
                    throw new RuntimeException("Insight AI untuk matriks {$aspect} tidak lengkap.");
                }

                return [$aspect => $matrixInsights[$aspect]];
            })->all(),
            'overall_insight' => $overallInsight,
        ];
    }

    /**
     * @param  array<int, array<string, mixed>>  $observations
     * @return array{insight_student_ai: string, analisis_capaian: array<string, array{matrix: string, total_score: int, max_score: int, percent: int, insight: string}>}
     */
    public function generateStudentAnalysis(string $studentName, array $observations): array
    {
        $scores = $this->summarizeScores($observations);

        $prompt = <<<PROMPT
Anda adalah analis pendidikan inklusif.
Analisis seluruh histori observasi dan seluruh nilai rubric siswa berikut.
Makna skor: 4 mandiri tanpa prompt, 3 bantuan minimal, 2 bantuan sedang,
1 bantuan maksimal, 0 belum tercapai. N/O atau "no" tidak dihitung sebagai 0.
Jangan mendiagnosis atau mengarang fakta. Gunakan hanya data yang tersedia.
Buat insight_student_ai singkat yang merangkum pola perkembangan siswa dari semua observasi.
Buat analisis_capaian untuk setiap matriks A-F berdasarkan seluruh rubric dan skor terhitung,
termasuk insight singkat tentang kekuatan dan area yang masih memerlukan pendampingan.
Kembalikan JSON valid saja:
{"insight_student_ai":"...","analisis_capaian":{"A":{"insight":"..."},"B":{"insight":"..."},"C":{"insight":"..."},"D":{"insight":"..."},"E":{"insight":"..."},"F":{"insight":"..."}}}
Nama matriks: {$this->encode(self::MATRIX_NAMES)}
Ringkasan skor terhitung: {$this->encode($scores)}
Seluruh data observasi dan rubric: {$this->encode($observations)}
Nama siswa: {$studentName}
PROMPT;

        $decoded = json_decode($this->requestStructured($prompt), true);
        $overallInsight = $decoded['insight_student_ai'] ?? null;
        $matrixAnalysis = $decoded['analisis_capaian'] ?? null;

        if (! is_string($overallInsight) || ! is_array($matrixAnalysis)) {
            throw new RuntimeException('Respons AI analisis siswa tidak valid.');
        }

        $analysis = collect(self::MATRIX_NAMES)->mapWithKeys(function (string $matrixName, string $matrix) use ($scores, $matrixAnalysis): array {
            $insight = $matrixAnalysis[$matrix]['insight'] ?? null;

            if (! is_string($insight)) {
                throw new RuntimeException("Analisis AI matriks {$matrix} tidak lengkap.");
            }

            $maxScore = $scores[$matrix]['max_score'];

            return [$matrix => [
                'matrix' => $matrixName,
                'total_score' => $scores[$matrix]['total_score'],
                'max_score' => $maxScore,
                'percent' => $maxScore > 0 ? (int) round(($scores[$matrix]['total_score'] / $maxScore) * 100) : 0,
                'insight' => $insight,
            ]];
        })->all();

        return [
            'insight_student_ai' => $overallInsight,
            'analisis_capaian' => $analysis,
        ];
    }

    /**
     * @param  array<int, array<string, mixed>>  $observations
     * @return array<int, array{heading: string, saran_tindakan: string, sasaran_berikutnya: string}>
     */
    public function generateStudentPlan(string $studentName, array $observations): array
    {
        $scores = $this->summarizeScores($observations);

        $prompt = <<<PROMPT
Anda adalah asisten pedagogis untuk pendamping siswa berkebutuhan khusus atau yang biasa disebut shadow teacher.
Analisis catatan lapangan berikut secara objektif dan berikan rekomendasi praktis.
Jangan membuat diagnosis, jangan mengarang fakta, dan gunakan bahasa Indonesia yang profesional.
Kembalikan JSON valid saja dengan format:
{"rencana_pendampingan":[{"heading":"...","saran_tindakan":"...","sasaran_berikutnya":"..."}]}
Buat 3 sampai 5 rencana pendampingan ke depan yang praktis dan spesifik.
Setiap item berisi heading singkat berupa fokus area, saran_tindakan berisi langkah praktis,
dan sasaran_berikutnya berisi target perkembangan yang ingin dicapai.
Nama matriks: {$this->encode(self::MATRIX_NAMES)}
Ringkasan skor terhitung: {$this->encode($scores)}
Seluruh data observasi dan rubric: {$this->encode($observations)}
Nama siswa: {$studentName}
PROMPT;

        $decoded = json_decode($this->requestStructured($prompt), true);

        return $this->normalizePlanning($decoded['rencana_pendampingan'] ?? null);
    }

    /**
     * @param  array<int, array<string, mixed>>  $observations
     * @return array<string, array{total_score: int, max_score: int, scores_count: int}>
     */
    private function summarizeScores(array $observations): array
    {
        $prefixToMatrix = [
            'ER' => 'A',
            'BR' => 'B',
            'IN' => 'C',
            'CO' => 'D',
            'SI' => 'E',
            'AC' => 'F',
        ];
        $scores = collect(array_keys(self::MATRIX_NAMES))->mapWithKeys(fn (string $matrix) => [
            $matrix => ['total_score' => 0, 'max_score' => 0, 'scores_count' => 0],
        ])->all();

        foreach ($observations as $observation) {
            foreach ($observation['rubrics'] ?? [] as $rubric) {
                $matrix = $prefixToMatrix[substr((string) ($rubric['rubric_code'] ?? ''), 0, 2)] ?? null;
                $score = filter_var($rubric['score'] ?? null, FILTER_VALIDATE_INT);

                if ($matrix === null || $score === false || $score < 0 || $score > 4) {
                    continue;
                }

                $scores[$matrix]['total_score'] += $score;
                $scores[$matrix]['max_score'] += 4;
                $scores[$matrix]['scores_count']++;
            }
        }

        return $scores;
    }

    /**
     * @return array<int, array{heading: string, saran_tindakan: string, sasaran_berikutnya: string}>
     */
    private function normalizePlanning(mixed $planning): array
    {
        if (! is_array($planning)) {
            return [];
        }

        return collect($planning)
            ->filter(fn (mixed $item): bool => is_array($item))
            ->map(function (array $item): array {
                $action = $item['saran_tindakan'] ?? $item['action'] ?? null;
                $target = $item['sasaran_berikutnya'] ?? $item['target'] ?? null;
                $body = is_string($item['body'] ?? null) ? trim($item['body']) : '';

                return [
                    'heading' => is_string($item['heading'] ?? null) ? trim($item['heading']) : '',
                    'saran_tindakan' => is_string($action) ? trim($action) : $body,
                    'sasaran_berikutnya' => is_string($target) ? trim($target) : '',
                ];
            })
            ->filter(fn (array $item): bool => $item['heading'] !== '' && $item['saran_tindakan'] !== '')
            ->take(5)
            ->values()
            ->all();
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
Anda adalah asisten pedagogis untuk pendamping siswa berkebutuhan khusus atau yang biasa disebut shadow teacher.
Analisis catatan lapangan berikut secara objektif dan berikan saran perbaikan penulisan yang lebih terstruktur dan humanis.
Jangan membuat diagnosis, jangan mengarang fakta, jangan keluar dari konteks yang sudah dituliskan pada catatan lapangan, dan gunakan bahasa Indonesia yang profesional.
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

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>Catatan Observasi - {{ $student->full_name }}</title>

    <style>
        @page {
            margin: 90px 32px 56px 32px;
        }

        body {
            color: #1f2937;
            font-family: DejaVu Sans, sans-serif;
            font-size: 10.5px;
            line-height: 1.55;
        }

        /* Header */
        .page-header {
            border-bottom: 2px solid #1d4ed8;
            height: 52px;
            left: 0;
            position: fixed;
            right: 0;
            top: -70px;
        }

        .page-header .title {
            color: #1d4ed8;
            font-size: 17px;
            font-weight: bold;
        }

        .page-header .subtitle {
            color: #6b7280;
            font-size: 9.5px;
            margin-top: 2px;
        }

        /* Footer */
        .page-footer {
            border-top: 1px solid #e5e7eb;
            bottom: -40px;
            color: #9ca3af;
            font-size: 9px;
            height: 24px;
            left: 0;
            padding-top: 6px;
            position: fixed;
            right: 0;
        }

        .page-footer .page-number {
            float: right;
        }

        .page-footer .page-number:after {
            content: "Halaman " counter(page);
        }

        /* Heading */
        h2 {
            background: #eff6ff;
            border-left: 4px solid #1d4ed8;
            color: #1e3a8a;
            font-size: 12.5px;
            margin: 18px 0 8px;
            padding: 5px 8px;
            page-break-after: avoid;
        }

        h3 {
            color: #374151;
            font-size: 11px;
            margin: 12px 0 4px;
            page-break-after: avoid;
        }

        p {
            margin: 3px 0;
        }

        .muted {
            color: #6b7280;
        }

        .small {
            font-size: 9px;
        }

        /* Table */
        table {
            border-collapse: collapse;
            width: 100%;
        }

        th,
        td {
            border: 1px solid #d1d5db;
            padding: 5px 7px;
            text-align: left;
            vertical-align: top;
        }

        th {
            background: #dbeafe;
            color: #1e3a8a;
            font-size: 10px;
        }

        tr {
            page-break-inside: avoid;
        }

        thead {
            display: table-header-group;
        }

        /* Student Information */
        table.info td {
            border: none;
            border-bottom: 1px solid #f3f4f6;
            padding: 4px 6px;
        }

        table.info td.k {
            color: #6b7280;
            width: 22%;
        }

        table.info td.v {
            font-weight: bold;
            width: 28%;
        }

        /* Rubric */
        .group-row td {
            background: #f1f5f9;
            color: #1e3a8a;
            font-weight: bold;
        }

        .center {
            text-align: center;
        }

        .code {
            font-weight: bold;
            white-space: nowrap;
            width: 52px;
        }

        /* Score */
        .score {
            border-radius: 3px;
            color: #ffffff;
            font-weight: bold;
            padding: 2px 0;
            text-align: center;
            width: 34px;
        }

        .s4 {
            background: #16a34a;
        }

        .s3 {
            background: #2563eb;
        }

        .s2 {
            background: #d97706;
        }

        .s1 {
            background: #ea580c;
        }

        .s0 {
            background: #dc2626;
        }

        .sn {
            background: #9ca3af;
        }

        /* Content Box */
        .box {
            background: #f8fafc;
            border: 1px solid #e5e7eb;
            border-radius: 3px;
            padding: 7px 9px;
        }

        /* Legend */
        .legend {
            margin-top: 6px;
        }

        .legend span {
            margin-right: 10px;
            white-space: nowrap;
        }

        .badge {
            color: #ffffff;
            display: inline-block;
            font-weight: bold;
            padding: 0 5px;
            border-radius: 2px;
        }

        ul {
            margin: 4px 0;
            padding-left: 16px;
        }

        .kv td {
            border: none;
            border-bottom: 1px solid #f3f4f6;
            padding: 3px 6px;
        }

        .kv td.k {
            color: #6b7280;
            width: 28%;
        }

        /* Matriks Capaian */
        table.matrix-title {
            margin-top: 18px;
            margin-bottom: 6px;
        }

        table.matrix-title td {
            border: none;
            padding: 0;
            vertical-align: middle;
        }

        table.matrix-title .t {
            color: #2f4a3a;
            font-size: 12.5px;
            font-weight: bold;
        }

        table.matrix-title .freq {
            color: #6b7280;
            font-size: 9px;
            font-style: italic;
            text-align: right;
            width: 32%;
        }

        table.matrix {
            border: 1px solid #cbd5d0;
            border-collapse: separate;
            border-radius: 6px;
            border-spacing: 0;
            overflow: hidden;
        }

        table.matrix th {
            background: #eef1ea;
            border: none;
            border-bottom: 1px solid #cbd5d0;
            color: #1f2937;
            font-size: 10px;
            padding: 8px 8px;
        }

        table.matrix td {
            border: none;
            border-bottom: 1px solid #d9dfda;
            padding: 9px 8px;
            vertical-align: middle;
        }

        table.matrix td.domain {
            font-weight: bold;
        }

        table.matrix td.avg {
            font-weight: bold;
            text-align: center;
        }

        table.matrix td.num {
            color: #6b7280;
            text-align: center;
            width: 26px;
        }

        table.matrix tr.legend-row td {
            background: #f3f5f1;
            border-bottom: none;
            color: #4b5563;
            font-size: 8.5px;
            padding: 7px 8px;
        }

        .pill {
            border-radius: 10px;
            display: inline-block;
            font-size: 9px;
            font-weight: bold;
            padding: 3px 9px;
            white-space: nowrap;
        }

        .pill-mandiri  { background: #bbf7d0; color: #14532d; }
        .pill-menuju   { background: #d1e7dd; color: #2f5d44; }
        .pill-minimal  { background: #d1e7dd; color: #3f5f4a; }
        .pill-sedang   { background: #fde0cc; color: #7a4a24; }
        .pill-maksimal { background: #fed7aa; color: #9a3412; }
        .pill-belum    { background: #fecaca; color: #991b1b; }
        .pill-no       { background: #e5e7eb; color: #4b5563; }

        .avg-warn {
            color: #7a4a24;
        }

        /* Documentation */
        .documentation-container {
            margin-top: 10px;
        }

        .documentation-item {
            display: inline-block;
            margin: 0 1% 12px 0;
            page-break-inside: avoid;
            vertical-align: top;
            width: 48%;
        }

        .documentation-item img {
            border: 1px solid #d1d5db;
            border-radius: 4px;
            display: block;
            height: 180px;
            object-fit: contain;
            width: 100%;
        }

        .documentation-item p {
            color: #6b7280;
            font-size: 9px;
            margin-top: 4px;
            text-align: center;
        }

        .documentation-link {
            border-bottom: 1px solid #f3f4f6;
            padding: 5px 0;
            page-break-inside: avoid;
        }

        .documentation-link a {
            color: #1d4ed8;
            text-decoration: underline;
        }

        .documentation-url {
            color: #9ca3af;
            font-size: 8px;
            word-break: break-all;
        }

        .documentation-empty {
            color: #9ca3af;
            font-style: italic;
        }
    </style>
</head>

<body>
    @php
        $scoreClass = fn ($s) => match (true) {
            $s === null || $s === '' || (is_string($s) && strtoupper($s) === 'N/O') => 'sn',
            default => 's' . (int) $s,
        };

        $scoreLabel = fn ($s) => ($s === null || $s === '') ? 'N/O' : $s;

        $groupedRubrics = $observation->rubrics->groupBy('aspect_code');

        $matrixInsights = data_get(
            $observation->analysis_ai,
            'matrix_insights',
            []
        );
        
        $domainNames = [
            'ER'  => 'Regulasi Emosi',
            'BR'  => 'Regulasi Perilaku',
            'IN'  => 'Kemandirian',
            'CO'  => 'Komunikasi',
            'SI'  => 'Interaksi Sosial',
            'AC'  => 'Perkembangan Akademik',
        ];

        $domainMap = collect($domainNames)
            ->mapWithKeys(fn ($name, $code) => [strtoupper(trim($code)) => $name]);

        $domainName = fn ($code) => $domainMap->get(strtoupper(trim((string) $code)), $code);

        $categoryOf = function (?float $avg): array {
            return match (true) {
                $avg === null => ['Tidak Teramati', 'pill-no'],
                $avg >= 3.75  => ['Mandiri', 'pill-mandiri'],
                $avg >= 3.4   => ['Menuju Mandiri', 'pill-menuju'],
                $avg >= 3.0   => ['Bantuan Minimal', 'pill-minimal'],
                $avg >= 2.0   => ['Bantuan Sedang', 'pill-sedang'],
                $avg >= 1.0   => ['Bantuan Maksimal', 'pill-maksimal'],
                default       => ['Belum Tercapai', 'pill-belum'],
            };
        };
    @endphp

    {{-- Header --}}
    <div class="page-header">
        <div class="title">Catatan Observasi Siswa</div>

        <div class="subtitle">
            {{ $student->full_name }}
            &middot;
            Dibuat {{ $observation->created_at?->format('d/m/Y H:i') }}
        </div>
    </div>

    {{-- Footer --}}
    <div class="page-footer">
        <span>
            Dokumen rahasia &mdash; hanya untuk keperluan pendampingan siswa
        </span>

        <span class="page-number"></span>
    </div>

    {{-- Informasi Siswa --}}
    <h2>Informasi Siswa dan Sesi</h2>

    <table class="info">
        <tr>
            <td class="k">Nama siswa</td>
            <td class="v">{{ $student->full_name }}</td>

            <td class="k">Tanggal observasi</td>
            <td class="v">
                {{ $observation->observed_on?->format('d/m/Y') ?: '-' }}
            </td>
        </tr>

        <tr>
            <td class="k">Waktu</td>
            <td class="v">
                {{ $observation->start_time }} - {{ $observation->end_time }}
            </td>

            <td class="k">Mata pelajaran</td>
            <td class="v">{{ $observation->subject ?: '-' }}</td>
        </tr>

        <tr>
            <td class="k">Emosi</td>
            <td class="v" colspan="3">
                {{ $observation->emotion ?: '-' }}
            </td>
        </tr>
    </table>

    {{-- Matriks Perkembangan & Capaian Rubrik --}}
    <table class="matrix-title">
        <tr>
            <td class="t">I. MATRIKS PERKEMBANGAN &amp; CAPAIAN RUBRIK HARIAN</td>
            {{-- <td class="freq">Frekuensi Observasi: 5 Hari Sekolah (Senin - Jumat)</td> --}}
        </tr>
    </table>

    <table class="matrix">
        <thead>
            <tr>
                <th class="center" style="width: 26px;">No</th>
                <th style="width: 24%;">Domain Perkembangan</th>
                <th class="center" style="width: 16%;">Rerata Skor</th>
                <th style="width: 22%;">Kategori Capaian</th>
                <th>Catatan Faktual &amp; Tingkat Dukungan</th>
            </tr>
        </thead>

        <tbody>
            @forelse ($groupedRubrics as $aspect => $rubrics)
                @php
                    $numeric = $rubrics
                        ->pluck('score')
                        ->filter(fn ($s) => is_numeric($s))
                        ->map(fn ($s) => (float) $s);

                    $avg = $numeric->isNotEmpty() ? round($numeric->avg(), 1) : null;

                    [$catLabel, $catClass] = $categoryOf($avg);

                    $note = data_get($matrixInsights, $aspect);

                    if (! $note) {
                        $note = $rubrics->pluck('ai_insight')->filter()->first();
                    }

                    if (! is_string($note) && $note !== null) {
                        $note = json_encode($note, JSON_UNESCAPED_UNICODE);
                    }
                @endphp

                <tr>
                    <td class="num">{{ $loop->iteration }}</td>
                    <td class="domain">{{ $domainName($aspect) }}</td>
                    <td class="avg {{ $avg !== null && $avg < 3.0 ? 'avg-warn' : '' }}">
                        {{ $avg !== null ? number_format($avg, 1) . ' / 4.0' : 'N/O' }}
                    </td>
                    <td><span class="pill {{ $catClass }}">&bull; {{ $catLabel }}</span></td>
                    <td>{{ $note ?: '-' }}</td>
                </tr>
            @empty
                <tr>
                    <td colspan="5" class="center muted">Belum ada data rubrik.</td>
                </tr>
            @endforelse

            <tr class="legend-row">
                <td colspan="5">
                    <strong>Panduan Skala Rubrik:</strong>
                    4 = Mandiri &nbsp; 3 = Bantuan Minimal &nbsp; 2 = Bantuan Sedang
                    &nbsp; 1 = Bantuan Maksimal &nbsp; 0 = Belum Tercapai
                    &nbsp; N/O = Tidak Teramati
                </td>
            </tr>
        </tbody>
    </table>

    {{-- Insight AI --}}
    <h2>Insight AI Catatan</h2>

    <div class="box">
        <p>
            {{ data_get($observation->analysis_ai, 'overall_insight', '-') }}
        </p>
    </div>

    {{-- Catatan dan Tindak Lanjut --}}
    <h2>Catatan dan Tindak Lanjut</h2>

    <h3>Catatan lapangan</h3>

    <div class="box">
        {!! nl2br(e($observation->field_notes ?: '-')) !!}
    </div>

    {{-- Data Kualitatif --}}
    <h3>Data kualitatif</h3>

    <div class="box">
        @if (! empty($observation->qualitative))
            <table class="kv">
                @foreach ($observation->qualitative as $key => $value)
                    <tr>
                        <td class="k">
                            {{ ucfirst(str_replace('_', ' ', $key)) }}
                        </td>

                        <td>
                            {{
                                is_scalar($value)
                                    ? ($value ?: '-')
                                    : json_encode($value, JSON_UNESCAPED_UNICODE)
                            }}
                        </td>
                    </tr>
                @endforeach
            </table>
        @else
            <p>-</p>
        @endif
    </div>

    {{-- Tindak Lanjut --}}
    <h3>Tindak lanjut</h3>

    <table class="kv">
        <tr>
            <td class="k">Strategi</td>
            <td>{{ $observation->strategy ?: '-' }}</td>
        </tr>

        <tr>
            <td class="k">Laporan orang tua</td>
            <td>
                {{ $observation->parent_report ? 'Ya' : 'Tidak' }}
            </td>
        </tr>

        <tr>
            <td class="k">Diskusi dengan guru</td>
            <td>
                {{ $observation->discuss_teacher ? 'Ya' : 'Tidak' }}
            </td>
        </tr>
    </table>

    {{-- Dokumentasi --}}
    @if (! empty($observation->files))
        <h2>Dokumentasi</h2>

        <div class="documentation-container">
            @foreach ($observation->files as $file)
                @php
                    $filePath = data_get($file, 'path');

                    $fileName = data_get(
                        $file,
                        'name',
                        'Dokumentasi'
                    );

                    $imageUrl = data_get($file, 'url');

                    if (! $imageUrl && $filePath) {
                        $imageUrl = rtrim(
                            config('services.supabase.url'),
                            '/'
                        )
                        . '/storage/v1/object/public/'
                        . config('services.supabase.bucket')
                        . '/'
                        . ltrim($filePath, '/');
                    }
                @endphp

                @if ($imageUrl)
                    <div class="documentation-link">
                        <strong>{{ $loop->iteration }}.</strong>
                        <a href="{{ $imageUrl }}" target="_blank">{{ $fileName }}</a>
                        <div class="documentation-url">{{ $imageUrl }}</div>
                    </div>
                @endif
            @endforeach
        </div>
    @endif

</body>
</html>

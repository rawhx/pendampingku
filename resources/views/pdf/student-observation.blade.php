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

    {{-- Skor Rubrik --}}
    <h2>Skor Rubrik</h2>

    <table>
        <thead>
            <tr>
                <th class="center">Kode</th>
                <th class="center">Skor</th>
                <th style="width: 38%;">Insight</th>
                <th style="width: 38%;">Rekomendasi</th>
            </tr>
        </thead>

        <tbody>
            @forelse ($groupedRubrics as $aspect => $rubrics)
                <tr class="group-row">
                    <td colspan="4">
                        Matriks {{ $aspect }}
                    </td>
                </tr>

                @foreach ($rubrics as $rubric)
                    <tr>
                        <td class="code center">
                            {{ $rubric->rubric_code }}
                        </td>

                        <td class="center">
                            <div class="score {{ $scoreClass($rubric->score) }}">
                                {{ $scoreLabel($rubric->score) }}
                            </div>
                        </td>

                        <td>
                            {{ $rubric->ai_insight ?: '-' }}
                        </td>

                        <td>
                            {{ $rubric->ai_recommendation ?: '-' }}
                        </td>
                    </tr>
                @endforeach

            @empty
                <tr>
                    <td colspan="4" class="center muted">
                        Belum ada data rubrik.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>

    {{-- Legend --}}
    <div class="legend small muted">
        <span><span class="badge s4">4</span> Mandiri</span>
        <span><span class="badge s3">3</span> Bantuan minimal</span>
        <span><span class="badge s2">2</span> Bantuan sedang</span>
        <span><span class="badge s1">1</span> Bantuan maksimal</span>
        <span><span class="badge s0">0</span> Belum tercapai</span>
        <span><span class="badge sn">N/O</span> Tidak diamati</span>
    </div>

    {{-- Insight AI --}}
    <h2>Insight AI Catatan</h2>

    <div class="box">
        <p>
            {{ data_get($observation->analysis_ai, 'overall_insight', '-') }}
        </p>
    </div>

    {{-- Insight Per Matriks --}}
    @if (! empty($matrixInsights))
        <h3>Insight per Matriks</h3>

        <table>
            <thead>
                <tr>
                    <th style="width: 18%;">Matriks</th>
                    <th>Insight</th>
                </tr>
            </thead>

            <tbody>
                @foreach ($matrixInsights as $matrix => $insight)
                    <tr>
                        <td>
                            <strong>{{ $matrix }}</strong>
                        </td>

                        <td>
                            {{
                                is_string($insight)
                                    ? $insight
                                    : json_encode($insight, JSON_UNESCAPED_UNICODE)
                            }}
                        </td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    @endif

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
                    <div class="documentation-item">
                        <img
                            src="{{ $imageUrl }}"
                            alt="{{ $fileName }}"
                        >

                        <p>{{ $fileName }}</p>
                    </div>
                @endif
            @endforeach
        </div>
    @endif

</body>
</html>
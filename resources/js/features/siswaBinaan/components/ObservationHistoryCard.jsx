function formatDate(dateValue) {
    if (!dateValue) return 'Tanggal belum tersedia';

    const date = new Date(`${dateValue}T00:00:00`);

    return new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    }).format(date);
}

export default function ObservationHistoryCard({ note, student }) {
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadError, setDownloadError] = useState('');
    const summary =
        note.notes?.trim() || note.qualitative?.factual?.trim() || 'Belum ada ringkasan observasi.';

    const handleDownload = async () => {
        if (isDownloading) {
            return;
        }

        setIsDownloading(true);
        setDownloadError('');

        try {
            await downloadStudentObservationPdf(student.id, note.id);
        } catch {
            setDownloadError('PDF belum dapat diunduh. Silakan coba lagi.');
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <article className="relative flex min-h-[183px] flex-col justify-center gap-3 overflow-hidden rounded-3xl border-l-[24px] border-[#92CCFF] bg-white p-5 shadow-[0_0_14px_rgba(0,129,242,0.08)]">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
                <div className="min-w-0">
                    <h3 className="text-xl font-bold leading-[1.2] text-blue-normal">{student.name}</h3>
                    <p className="mt-1 text-xs leading-[1.2] text-white-dark">
                        {student.className} • {student.condition} • {student.age}
                    </p>
                </div>
                <p className="shrink-0 text-sm leading-[1.2] text-black-normal">
                    {formatDate(note.date)}{note.startTime ? ` • ${note.startTime}` : ''}
                </p>
            </div>

            <p className="line-clamp-2 text-base leading-[21px] text-black-normal">{summary}</p>

            <div className="flex flex-col items-end gap-2 sm:flex-row sm:justify-end">
                {downloadError && (
                    <p className="text-right text-xs text-red-600" role="alert">
                        {downloadError}
                    </p>
                )}
                <button
                    type="button"
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex h-12 w-full items-center justify-center rounded-[28px] border border-blue-normal px-5 text-sm font-semibold text-blue-normal transition hover:bg-blue-light focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-normal/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-[150px]"
                >
                    {isDownloading ? 'Mengunduh...' : 'Unduh PDF'}
                </button>
                <Link
                    href={route('siswa-binaan.laporan.catatan', {
                        student: student.id,
                        observation: note.id,
                    })}
                    className="gradient-primary flex h-12 w-full items-center justify-center rounded-[28px] text-base font-semibold text-white shadow-[0_0_2px_rgba(0,0,0,0.08)] transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-normal/30 focus-visible:ring-offset-2 sm:w-[204px]"
                >
                    Selengkapnya
                </Link>
            </div>
        </article>
    );
}
import { downloadStudentObservationPdf } from '../services/studentApi';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

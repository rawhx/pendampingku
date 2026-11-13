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
    const summary =
        note.notes?.trim() || note.qualitative?.factual?.trim() || 'Belum ada ringkasan observasi.';

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

            <div className="flex justify-end">
                <Link
                    href={route('siswa-binaan.laporan.catatan', {
                        student: student.id,
                        observation: note.id,
                    })}
                    className="gradient-primary flex h-12 w-[204px] items-center justify-center rounded-[28px] text-base font-semibold text-white shadow-[0_0_2px_rgba(0,0,0,0.08)] transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-normal/30 focus-visible:ring-offset-2"
                >
                    Selengkapnya
                </Link>
            </div>
        </article>
    );
}
import { Link } from '@inertiajs/react';

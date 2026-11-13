import { Link } from '@inertiajs/react';

export default function CatatanHarianHeader({ studentName }) {
    return (
        <>
            <Link
                href={route('siswa-binaan')}
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-normal transition hover:text-blue-normal-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-normal/30 focus-visible:ring-offset-2"
            >
                <span aria-hidden="true">←</span>
                Kembali ke Siswa Binaan
            </Link>

            <div className="mb-8 mt-4">
                <h1 className="text-2xl font-bold leading-tight text-black-normal sm:text-3xl">
                    Catatan Harian
                </h1>
                <p className="mt-2 text-sm text-black-muted">
                    Buat catatan perkembangan baru untuk {studentName}.
                </p>
            </div>
        </>
    );
}

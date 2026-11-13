import TambahSiswaForm from '@/features/siswaBinaan/components/TambahSiswaForm';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

function BackIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
        >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
        </svg>
    );
}

export default function TambahSiswaPage() {
    return (
        <AuthenticatedLayout>
            <Head title="Tambah Siswa" />

            <div className="relative overflow-hidden bg-white-light-hover px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-36">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                >
                    <div className="absolute -left-[282px] top-[100px] h-[335px] w-[335px] rounded-full bg-blue-normal blur-[50px]" />
                    <div className="absolute -right-[70px] top-[60px] h-[335px] w-[335px] rounded-full bg-blue-normal/50 blur-[50px]" />
                    <div className="absolute -left-[274px] bottom-[40px] h-[335px] w-[335px] rounded-full bg-blue-normal/50 blur-[50px]" />
                    <div className="absolute -right-[62px] bottom-[-40px] h-[335px] w-[335px] rounded-full bg-blue-normal blur-[50px]" />
                </div>

                <div className="relative mx-auto w-full max-w-6xl">
                    <Link
                        href={route('siswa-binaan')}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-normal transition hover:text-blue-normal-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-normal/30 focus-visible:ring-offset-2"
                    >
                        <BackIcon />
                        Kembali ke Siswa Binaan
                    </Link>

                    <div className="mt-4 mb-8">
                        <h1 className="text-2xl font-bold leading-tight text-black-normal sm:text-3xl">
                            Tambah Siswa Binaan
                        </h1>
                        <p className="mt-2 text-sm text-black-muted">
                            Lengkapi data siswa untuk memulai pendampingan.
                        </p>
                    </div>

                    <TambahSiswaForm />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

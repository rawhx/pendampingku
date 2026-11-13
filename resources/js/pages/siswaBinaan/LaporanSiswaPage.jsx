import { students } from '@/features/siswaBinaan/data/students';
import { getStudentMetrics } from '@/features/siswaBinaan/data/studentMetrics';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

function BackIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
        </svg>
    );
}

export default function LaporanSiswaPage() {
    const { studentId } = usePage().props;
    const student = students.find((item) => item.id === studentId);

    if (!student) {
        return (
            <AuthenticatedLayout>
                <Head title="Siswa Tidak Ditemukan" />
                <div className="px-4 pb-20 pt-32 text-center">
                    <h1 className="text-2xl font-bold text-black-normal">Siswa tidak ditemukan</h1>
                    <Link href={route('siswa-binaan')} className="mt-4 inline-flex text-sm font-semibold text-blue-normal hover:underline">
                        Kembali ke Siswa Binaan
                    </Link>
                </div>
            </AuthenticatedLayout>
        );
    }

    const metrics = getStudentMetrics(student);

    return (
        <AuthenticatedLayout>
            <Head title={`Laporan ${student.name}`} />

            <div className="relative overflow-hidden bg-white-light-hover px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-36">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-[280px] top-[180px] h-[335px] w-[335px] rounded-full bg-blue-normal/40 blur-[50px]" />
                    <div className="absolute -right-[280px] top-[500px] h-[335px] w-[335px] rounded-full bg-blue-normal/40 blur-[50px]" />
                </div>

                <div className="relative mx-auto w-full max-w-6xl">
                    <Link href={route('siswa-binaan')} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-normal transition hover:text-blue-normal-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-normal/30 focus-visible:ring-offset-2">
                        <BackIcon />
                        Kembali ke Siswa Binaan
                    </Link>

                    <div className="mb-8 mt-4">
                        <h1 className="text-2xl font-bold leading-tight text-black-normal sm:text-3xl">Laporan Siswa</h1>
                        <p className="mt-2 text-sm text-black-muted">Ringkasan perkembangan dan catatan pendampingan siswa.</p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <section className="rounded-3xl bg-white p-5 shadow-[0_0_14px_rgba(0,129,242,0.08)] sm:p-7">
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-blue-normal">{student.name}</h2>
                                    <p className="mt-1 text-sm text-black-muted">{student.className} • {student.condition} • {student.age}</p>
                                </div>
                                <span className="w-fit rounded-full bg-green-normal px-3 py-1 text-xs font-semibold text-white">{student.status.label}</span>
                            </div>
                        </section>

                        <section className="rounded-3xl bg-white p-5 shadow-[0_0_14px_rgba(0,129,242,0.08)] sm:p-7">
                            <h2 className="text-lg font-semibold text-black-normal sm:text-xl">Ringkasan Perkembangan</h2>
                            <div className="mt-6 grid gap-6 sm:grid-cols-2">
                                {metrics.map((metric) => (
                                    <div key={metric.label}>
                                        <div className="flex items-start justify-between gap-3 text-sm">
                                            <span className="break-words text-black-normal">{metric.label}</span>
                                            <span className="shrink-0 font-bold text-blue-normal">{metric.value}</span>
                                        </div>
                                        <div className="mt-3 h-3 overflow-hidden rounded-full bg-white-dark/70">
                                            <div className="h-full rounded-full bg-blue-normal" style={{ width: `${metric.percent}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-3xl bg-white p-5 shadow-[0_0_14px_rgba(0,129,242,0.08)] sm:p-7">
                            <h2 className="text-lg font-semibold text-black-normal sm:text-xl">Catatan Terakhir</h2>
                            <p className="mt-4 rounded-2xl bg-white-light-active px-4 py-4 text-sm leading-relaxed text-black-normal">{student.insight}</p>
                        </section>

                        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                            <Link href={route('siswa-binaan.catatan-harian', student.id)} className="flex h-11 items-center justify-center rounded-full border border-blue-normal bg-white px-6 text-sm font-semibold text-blue-normal transition hover:bg-blue-light focus:outline-none focus:ring-2 focus:ring-blue-normal/30 focus:ring-offset-2">Buat Catatan Harian</Link>
                            <Link href={route('siswa-binaan.edit', student.id)} className="flex h-11 items-center justify-center rounded-full bg-blue-normal px-6 text-sm font-semibold text-white transition hover:bg-blue-normal-hover focus:outline-none focus:ring-2 focus:ring-blue-normal/30 focus:ring-offset-2">Edit Data Siswa</Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

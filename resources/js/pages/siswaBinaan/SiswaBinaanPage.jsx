import StudentProfileCard from '@/features/siswaBinaan/components/StudentProfileCard';
import StudentSummaryStats from '@/features/siswaBinaan/components/StudentSummaryStats';
import StudentToolbar from '@/features/siswaBinaan/components/StudentToolbar';
import useSessionNotification from '@/features/siswaBinaan/hooks/useSessionNotification';
import useStudents from '@/features/siswaBinaan/hooks/useStudents';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function SiswaBinaanPage() {
    const {
        query,
        setQuery,
        filteredStudents,
        summaryStats,
        isLoading,
        loadError,
    } = useStudents();
    const { notification, dismissNotification } = useSessionNotification(
        'pendampingku:catatan-success',
    );

    return (
        <AuthenticatedLayout>
            <Head title="Siswa Binaan" />

            {notification && (
                <div role="status" aria-live="polite" className="fixed right-4 top-24 z-[60] w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-blue-light-active bg-white shadow-[0_12px_32px_rgba(0,97,182,0.18)] sm:right-6">
                    <div className="h-1 w-full bg-gradient-to-r from-[#92CCFF] via-[#5DB3FF] to-blue-normal" />
                    <div className="flex items-start gap-3 px-4 py-4">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-light text-green-dark">
                            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                                <path d="m5 12 4 4L19 6" />
                            </svg>
                        </span>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-black-normal">Catatan berhasil disimpan</p>
                            <p className="mt-1 text-xs leading-relaxed text-black-muted">{notification}</p>
                        </div>
                        <button type="button" onClick={dismissNotification} aria-label="Tutup notifikasi" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xl leading-none text-white-dark transition hover:bg-white-light-active hover:text-black-normal">×</button>
                    </div>
                </div>
            )}

            <div className="relative overflow-hidden bg-white-light-hover px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-36">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                >
                    <div className="absolute -left-[280px] top-[180px] h-[335px] w-[335px] rounded-full bg-blue-normal/40 blur-[50px]" />
                    <div className="absolute -right-[280px] top-[1040px] h-[335px] w-[335px] rounded-full bg-blue-normal/40 blur-[50px]" />
                </div>

                <div className="relative mx-auto w-full max-w-7xl">
                    <StudentSummaryStats items={summaryStats} />

                    <section className="mt-8">
                        <StudentToolbar
                            query={query}
                            onQueryChange={setQuery}
                        />

                        <div className="mt-6 flex flex-col gap-5">
                            {isLoading ? (
                                <div className="rounded-3xl bg-white/70 px-6 py-16 text-center text-sm text-black-muted">
                                    Memuat data siswa...
                                </div>
                            ) : loadError ? (
                                <div className="rounded-3xl bg-white/70 px-6 py-16 text-center text-sm text-red-700">
                                    {loadError}
                                </div>
                            ) : filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <StudentProfileCard
                                        key={student.id}
                                        student={student}
                                    />
                                ))
                            ) : (
                                <div className="rounded-3xl bg-white/70 px-6 py-16 text-center text-sm text-black-muted">
                                    Siswa yang dicari belum ditemukan.
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

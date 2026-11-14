import { icons } from '@/assets/icons/icons';
import ObservationHistoryCard from '@/features/siswaBinaan/components/ObservationHistoryCard';
import ReportProgressCard from '@/features/siswaBinaan/components/ReportProgressCard';
import StudentPlanSection from '@/features/siswaBinaan/components/StudentPlanSection';
import StudentRadarChart from '@/features/siswaBinaan/components/StudentRadarChart';
import useStudent from '@/features/siswaBinaan/hooks/useStudent';
import useStudentReport from '@/features/siswaBinaan/hooks/useStudentReport';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

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

function SearchIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-black-light-hover">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
        </svg>
    );
}

function EmptyState() {
    return (
        <div className="rounded-2xl bg-white-light-active px-6 py-10 text-center text-sm text-black-muted">
            Belum ada catatan observasi untuk siswa ini.
        </div>
    );
}

export default function LaporanSiswaPage() {
    const { studentId } = usePage().props;
    const { student, isLoading } = useStudent(studentId);
    const {
        notes,
        metrics,
        plan,
        filteredNotes,
        query,
        sortOrder,
        dateFilter,
        visibleNotes,
        updateQuery,
        updateSortOrder,
        updateDateFilter,
        showMoreNotes,
    } = useStudentReport(student);

    if (isLoading) {
        return (
            <AuthenticatedLayout>
                <Head title="Memuat Laporan" />
                <div className="px-4 pb-20 pt-32 text-center text-sm text-black-muted">
                    Memuat laporan siswa...
                </div>
            </AuthenticatedLayout>
        );
    }

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

    return (
        <AuthenticatedLayout>
            <Head title={`Laporan ${student.name}`} />

            <div className="relative overflow-hidden bg-white-light-hover px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-36">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-[280px] top-[180px] h-[335px] w-[335px] rounded-full bg-blue-normal/40 blur-[50px]" />
                    <div className="absolute -right-[280px] top-[780px] h-[335px] w-[335px] rounded-full bg-blue-normal/40 blur-[50px]" />
                </div>



                <div className="relative mx-auto w-full max-w-7xl">
                    <Link
                        href={route('siswa-binaan')}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-blue-normal transition hover:text-blue-normal-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-normal/30 focus-visible:ring-offset-2"
                    >
                        <BackIcon />
                        Kembali ke Siswa Binaan
                    </Link>

                    <div className="mt-4 mb-8">
                        <h1 className="text-2xl font-bold leading-tight text-black-normal sm:text-3xl">
                            Laporan siswa 
                            <span className="text-blue-normal"> {student.name}</span>
                        </h1>
                        <p className="mt-2 text-sm text-black-muted">
                            Data capaian perkembangan siswa berdasarkan catatan observasi harian dan sesi pendampingan
                        </p>
                    </div>
                    {/* <section className="rounded-3xl border-t-[20px] border-[#92CCFF] bg-white px-5 py-4 shadow-[0_0_14px_rgba(0,129,242,0.08)]">
                        <h1 className="text-xl font-bold leading-[1.2] text-blue-normal">{student.name}</h1>
                        <p className="mt-1 text-xs leading-[1.2] text-black-normal">{student.className} • {student.condition} • {student.age}</p>
                        <p className="mt-2 text-xs leading-[1.2] text-black-muted">NISN: {student.nisn}</p>
                    </section> */}

                    <div className="mt-5 grid gap-5 border-b-4 border-[#EDEDED] pb-6 lg:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)] lg:items-center">
                        <section className="min-w-0">
                            <StudentRadarChart metrics={metrics} />
                        </section>

                        <section className="min-w-0 rounded-3xl border-t-4 border-blue-normal bg-white px-4 py-5 shadow-[0_0_2px_rgba(0,0,0,0.08)]">
                            <div className="flex items-center justify-between gap-3">
                                <span className="flex items-center gap-2 rounded-3xl border border-[#92CCFF] bg-white px-3 py-1">
                                    <img
                                        src={icons.sparkle}
                                        alt=""
                                        aria-hidden="true"
                                        className="h-6 w-6 shrink-0"
                                    />
                                    <span className="text-base text-black-normal">
                                        AI Powered Assistant
                                    </span>
                                </span>
                                <span className="text-base leading-[1.2] text-white-dark">{notes.length} Catatan Observasi</span>
                            </div>
                            <h2 className="mt-5 text-base leading-[1.2] text-black-normal">Analisis Capaian & Rekomendasi Scaffolding</h2>
                            <div className="mt-4 min-h-[210px] max-h-[300px] overflow-y-auto rounded-[28px] bg-white px-5 py-4 text-justify text-base  text-black-normal shadow-[0_0_4px_rgba(0,0,0,0.08)]">
                                {student.insight_student_ai ? (
                                    <p>
                                        <span className="font-bold text-blue-normal">Insight keseluruhan:</span>{' '}
                                        {student.insight_student_ai}
                                    </p>
                                ) : (
                                    <p className="text-black-muted">
                                        Insight keseluruhan siswa belum tersedia.
                                    </p>
                                )}

                            </div>
                        </section>
                    </div>

                    <section className="mt-5 border-b-4 border-[#EDEDED] pb-8">
                        <div className="mb-6 flex flex-col gap-2">
                            <h2 className="text-[28px] font-semibold leading-[1.2] text-blue-normal sm:text-[32px]">Capaian 6 Aspek Perkembangan Siswa</h2>
                            <p className="text-base leading-[1.2] text-white-dark">Total skor tiap matriks dari {notes.length} catatan observasi</p>
                        </div>
                        <div className="grid gap-5 md:grid-cols-2">
                            {metrics.map((metric) => (
                                <ReportProgressCard key={metric.id} metric={metric} observationCount={notes.length} insight={metric.insight} />
                            ))}
                        </div>
                    </section>

                    <StudentPlanSection plan={plan} observationCount={notes.length} />

                    <section className="mt-8 px-0 sm:px-5 sm:py-6">
                        <div className="mb-8 flex flex-col gap-2">
                            <h2 className="text-[28px] font-semibold leading-[1.2] text-blue-normal sm:text-[32px]">Riwayat Catatan Observasi</h2>
                            <p className="text-base leading-[1.2] text-white-dark">Daftar sesi pendampingan dan observasi harian siswa</p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-5">
                            <label className="relative col-span-2 w-full sm:w-[400px] sm:shrink-0">
                                <span className="sr-only">Cari catatan observasi</span>
                                <span aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2">
                                    <SearchIcon />
                                </span>
                                <input
                                    value={query}
                                    onChange={(event) => updateQuery(event.target.value)}
                                    placeholder="Cari nama siswa, Kelas"
                                    className="h-12 w-full rounded-[28px] border-0 bg-white py-0 pl-12 pr-4 text-base  text-black-normal shadow-[0_0_4px_rgba(0,0,0,0.08)] outline-none placeholder:text-[#D1D4D7] focus:ring-2 focus:ring-blue-normal/20"
                                />
                            </label>

                            <label className="relative w-full sm:w-fit sm:shrink-0">
                                <span className="sr-only">Urutkan catatan</span>
                                <select
                                    value={sortOrder}
                                    onChange={(event) => updateSortOrder(event.target.value)}
                                    className="h-12 w-full appearance-none rounded-[28px] border-0 bg-white py-0 pl-4 pr-8 text-base  text-black-normal shadow-[0_0_4px_rgba(0,0,0,0.08)] outline-none focus:ring-2 focus:ring-blue-normal/20 sm:w-fit sm:pl-5 sm:pr-10"
                                >
                                    <option value="newest">Terbaru</option>
                                    <option value="oldest">Terlama</option>
                                </select>
                            </label>

                            <label className="relative w-full sm:w-fit sm:shrink-0">
                                <span className="sr-only">Filter tanggal</span>
                                <input
                                    type="date"
                                    value={dateFilter}
                                    onChange={(event) => updateDateFilter(event.target.value)}
                                    className="h-12 w-full rounded-[28px] border-0 bg-white px-3 py-0 text-base  text-black-normal shadow-[0_0_4px_rgba(0,0,0,0.08)] outline-none focus:ring-2 focus:ring-blue-normal/20 sm:w-fit sm:px-5"
                                />
                            </label>
                        </div>

                        <div className="mt-5 flex flex-col gap-3">
                            {filteredNotes.length === 0 ? <EmptyState /> : filteredNotes.slice(0, visibleNotes).map((note, index) => <ObservationHistoryCard key={`${note.savedAt ?? note.date}-${index}`} note={note} student={student} />)}
                        </div>

                        {filteredNotes.length > visibleNotes && (
                            <button type="button" onClick={showMoreNotes} className="mx-auto mt-5 flex h-11 items-center justify-center rounded-full bg-blue-normal px-7 text-sm font-semibold text-white transition hover:bg-blue-normal-hover focus:outline-none focus:ring-2 focus:ring-blue-normal/30 focus:ring-offset-2">
                                Selengkapnya
                            </button>
                        )}
                    </section>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}

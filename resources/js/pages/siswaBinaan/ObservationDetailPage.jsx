import { qualitativeFields, rubricCategories } from '@/features/catatanHarian/data/catatanHarian';
import useStudent from '@/features/siswaBinaan/hooks/useStudent';
import { getStudentObservation } from '@/features/siswaBinaan/services/studentApi';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

function formatDate(dateValue) {
    if (!dateValue) return 'Tanggal belum tersedia';

    return new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date(`${dateValue}T00:00:00`));
}

function DetailSection({ title, children }) {
    return (
        <section className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-[0_0_10px_rgba(0,129,242,0.06)] sm:p-6">
            <h2 className="text-xl font-bold text-blue-normal">{title}</h2>
            {children}
        </section>
    );
}

export default function ObservationDetailPage() {
    const { studentId, observationId } = usePage().props;
    const { student, isLoading: isStudentLoading } = useStudent(studentId);
    const [observation, setObservation] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isCurrent = true;

        getStudentObservation(studentId, observationId)
            .then((data) => {
                if (isCurrent) setObservation(data);
            })
            .finally(() => {
                if (isCurrent) setIsLoading(false);
            });

        return () => {
            isCurrent = false;
        };
    }, [observationId, studentId]);

    if (isStudentLoading || isLoading) {
        return (
            <AuthenticatedLayout>
                <Head title="Memuat Detail Catatan" />
                <div className="px-4 pb-20 pt-32 text-center text-sm text-black-muted">Memuat detail catatan...</div>
            </AuthenticatedLayout>
        );
    }

    if (!student || !observation) {
        return (
            <AuthenticatedLayout>
                <Head title="Catatan Tidak Ditemukan" />
                <div className="px-4 pb-20 pt-32 text-center">
                    <h1 className="text-2xl font-bold text-black-normal">Catatan tidak ditemukan</h1>
                    <Link href={route('siswa-binaan.laporan', studentId)} className="mt-4 inline-flex text-sm font-semibold text-blue-normal hover:underline">
                        Kembali ke laporan siswa
                    </Link>
                </div>
            </AuthenticatedLayout>
        );
    }

    return (
        <AuthenticatedLayout>
            <Head title={`Detail Catatan ${student.name}`} />
            <div className="min-h-screen bg-white-light-hover px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pt-36">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
                    <Link href={route('siswa-binaan.laporan', student.id)} className="w-fit text-sm font-semibold text-blue-normal hover:underline">
                        ← Kembali ke laporan {student.name}
                    </Link>
                    <header className="rounded-3xl border-t-[20px] border-[#92CCFF] bg-white px-5 py-5 shadow-[0_0_14px_rgba(0,129,242,0.08)] sm:px-7">
                        <p className="text-sm text-white-dark">Riwayat pengisian catatan</p>
                        <h1 className="mt-1 text-2xl font-bold text-blue-normal">{formatDate(observation.observed_on)}</h1>
                        <p className="mt-1 text-sm text-black-muted">
                            {observation.subject || 'Subjek belum tersedia'} · {observation.start_time}–{observation.end_time}
                        </p>
                    </header>

                    <DetailSection title="Informasi Sesi">
                        <dl className="grid gap-4 text-sm sm:grid-cols-3">
                            <div><dt className="text-white-dark">Emosi</dt><dd className="font-medium text-black-normal">{observation.emotion || 'Belum diisi'}</dd></div>
                            <div><dt className="text-white-dark">Laporan orang tua</dt><dd className="font-medium text-black-normal">{observation.parent_report ? 'Ya' : 'Tidak'}</dd></div>
                            <div><dt className="text-white-dark">Diskusi dengan guru</dt><dd className="font-medium text-black-normal">{observation.discuss_teacher ? 'Ya' : 'Tidak'}</dd></div>
                        </dl>
                    </DetailSection>

                    <DetailSection title="Skor & Insight AI per Matriks">
                        <div className="rounded-2xl border-l-4 border-blue-normal bg-blue-light px-4 py-3 text-sm text-black-normal">
                            <strong className="text-blue-normal">Insight keseluruhan:</strong>{' '}
                            {observation.analysis_ai?.overall_insight || 'Belum tersedia'}
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            {rubricCategories.map((category) => (
                                <div key={category.id} className="flex flex-col gap-3 rounded-2xl bg-white-light-active p-4">
                                    <h3 className="text-base font-bold text-black-normal">{category.id}. {category.title}</h3>
                                    <p className="text-sm text-black-muted">
                                        <strong className="text-blue-normal">Insight matriks:</strong>{' '}
                                        {observation.analysis_ai?.matrix_insights?.[category.id] || 'Belum tersedia'}
                                    </p>
                                    {category.items.map((item) => {
                                        const rubric = observation.rubrics?.find((value) => value.rubric_code === item.id);

                                        return (
                                            <div key={item.id} className="rounded-xl bg-white p-3 shadow-[0_0_3px_rgba(0,0,0,0.08)]">
                                                <div className="flex items-start justify-between gap-3 text-sm">
                                                    <span className="font-medium text-black-normal">{item.id} · {item.title}</span>
                                                    <span className="shrink-0 rounded-full bg-blue-light px-2 py-1 font-bold text-blue-normal">{rubric?.score ?? 'N/O'}</span>
                                                </div>
                                                <p className="mt-2 text-sm text-black-muted"><strong className="text-blue-normal">Insight AI:</strong> {rubric?.ai_insight || 'Belum tersedia'}</p>
                                                <p className="mt-2 text-sm text-black-muted"><strong className="text-blue-normal">Rekomendasi AI:</strong> {rubric?.ai_recommendation || 'Belum tersedia'}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </DetailSection>

                    <DetailSection title="Catatan Kualitatif">
                        <div className="grid gap-4 md:grid-cols-2">
                            {qualitativeFields.map((field) => (
                                <div key={field.id}>
                                    <h3 className="text-sm font-semibold text-black-normal">{field.label}</h3>
                                    <p className="mt-1 whitespace-pre-wrap text-sm text-black-muted">{observation.qualitative?.[field.id] || 'Belum diisi'}</p>
                                </div>
                            ))}
                        </div>
                    </DetailSection>

                    <DetailSection title="Catatan Lapangan & Strategi">
                        <p className="whitespace-pre-wrap text-sm text-black-normal">{observation.field_notes || 'Belum diisi'}</p>
                        <div>
                            <h3 className="text-sm font-semibold text-blue-normal">Strategi</h3>
                            <p className="mt-1 whitespace-pre-wrap text-sm text-black-muted">{observation.strategy || 'Belum diisi'}</p>
                        </div>
                    </DetailSection>

                    {observation.files?.length > 0 && (
                        <DetailSection title="Dokumentasi">
                            <div className="grid gap-3 sm:grid-cols-2">
                                {observation.files.map((file) => (
                                    <a key={file.path} href={file.url} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl bg-white p-2 text-sm text-blue-normal shadow-[0_0_3px_rgba(0,0,0,0.08)] hover:bg-blue-light">
                                        <img src={file.url} alt="" className="h-16 w-16 rounded-lg object-cover" />
                                        <span className="truncate">{file.name}</span>
                                    </a>
                                ))}
                            </div>
                        </DetailSection>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

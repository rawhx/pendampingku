import StudentProfileCard from '@/features/siswaBinaan/components/StudentProfileCard';
import StudentSummaryStats from '@/features/siswaBinaan/components/StudentSummaryStats';
import StudentToolbar from '@/features/siswaBinaan/components/StudentToolbar';
import { students, summaryStats } from '@/features/siswaBinaan/data/students';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function SiswaBinaanPage() {
    const [query, setQuery] = useState('');

    const filteredStudents = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return students;
        }

        return students.filter((student) =>
            [student.name, student.nisn, student.className, student.condition]
                .join(' ')
                .toLowerCase()
                .includes(normalizedQuery),
        );
    }, [query]);

    return (
        <AuthenticatedLayout>
            <Head title="Siswa Binaan" />

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
                            {filteredStudents.length > 0 ? (
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

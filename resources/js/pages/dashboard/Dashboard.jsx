import ActivityFeed from '@/features/dashboard/components/ActivityFeed';
import DashboardEmptyState from '@/features/dashboard/components/DashboardEmptyState';
import GreetingCard from '@/features/dashboard/components/GreetingCard';
import StatCard from '@/features/dashboard/components/StatCard';
import StudentCard from '@/features/dashboard/components/StudentCard';
import { 
    aiRecommendation,
    greeting,
    schedule,
    stats,
} from '@/features/dashboard/data/dashboard';
import { getDashboard } from '@/features/siswaBinaan/services/studentApi';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';


export default function DashboardPage() {
    const { auth } = usePage().props;
    const [dashboard, setDashboard] = useState(null);
    const [loadError, setLoadError] = useState('');

    useEffect(() => {
        let isCurrent = true;

        getDashboard()
            .then((data) => {
                if (isCurrent) {
                    setDashboard(data);
                }
            })
            .catch(() => {
                if (isCurrent) {
                    setLoadError(
                        'Gagal memuat data dashboard. Silakan muat ulang halaman.',
                    );
                }
            });

        return () => {
            isCurrent = false;
        };
    }, []);

    const isLoading = dashboard === null && !loadError;

    const dashboardStats = stats.map((stat) =>
        stat.id === 'students'
            ? {
                  ...stat,
                  value: `${dashboard?.active_students ?? 0} Siswa`,
                  detail: 'Siswa aktif yang Anda dampingi',
              }
            : stat.id === 'observation-needed'
              ? {
                    ...stat,
                    value: `${dashboard?.students_needing_observation ?? 0} Siswa`,
                }
              : stat.id === 'reports'
                ? {
                      ...stat,
                      value: `${dashboard?.reports_ready ?? 0} Laporan`,
                      detail: 'Memiliki catatan siap kirim hari ini',
                  }
                : stat,
    );
    const dashboardStudents = dashboard?.students ?? [];
    const dashboardActivities = dashboard?.activities ?? [];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="relative overflow-hidden">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 overflow-hidden"
                >
                    <div className="absolute -left-[278px] top-[233px] h-[335px] w-[335px] rounded-full bg-blue-normal/50 blur-[50px]" />
                    <div className="absolute right-[-269px] top-[71px] h-[335px] w-[335px] rounded-full bg-blue-normal/50 blur-[50px]" />
                </div>

                <div className="relative mx-auto w-full max-w-7xl px-4 pt-24 sm:px-6 lg:px-0 lg:pt-32 xl:pt-40">
                    <GreetingCard greeting={greeting} user={auth?.user} />

                    <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:mt-10 xl:gap-8">
                        {dashboardStats.map((stat) => (
                            <StatCard key={stat.id} {...stat} />
                        ))}
                    </div>
                </div>

                <section className="relative mt-8 bg-blue-light py-10 lg:mt-10 lg:py-12 xl:py-[60px]">
                    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-0">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-2xl font-semibold text-black-normal lg:3xl">
                                SISWA BINAAN AKTIF
                            </h2>
                            <p className="text-sm text-black-normal/80 lg:text-base">
                                Pemantauan sensorik, tingkah laku, dan
                                intervensi hari ini
                            </p>
                        </div>

                        <div className="mt-7">
                            {isLoading ? (
                                <div className="rounded-3xl bg-white/70 px-6 py-16 text-center text-sm text-black-muted">
                                    Memuat data siswa...
                                </div>
                            ) : loadError ? (
                                <div className="rounded-3xl bg-white/70 px-6 py-16 text-center text-sm text-red-700">
                                    {loadError}
                                </div>
                            ) : dashboardStudents.length > 0 ? (
                                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                                    {dashboardStudents.map((student) => (
                                        <StudentCard key={student.id} {...student} />
                                    ))}
                                </div>
                            ) : (
                                <DashboardEmptyState
                                    title="Belum ada siswa binaan aktif"
                                    description="Tambahkan siswa terlebih dahulu agar catatan observasi harian dan laporan perkembangan bisa dibuat."
                                    action={{
                                        href: route('siswa-binaan.create'),
                                        label: 'Tambah Siswa',
                                    }}
                                />
                            )}
                        </div>

                    </div>
                </section>

                <div className="relative mx-auto mt-10 w-full max-w-7xl px-4 pb-16 sm:px-6 lg:mt-12 lg:px-0 lg:pb-20">
                    <ActivityFeed
                        items={dashboardActivities}
                        isLoading={isLoading}
                        error={loadError}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

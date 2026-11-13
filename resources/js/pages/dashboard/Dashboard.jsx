import ActivityFeed from '@/features/dashboard/components/ActivityFeed';
import AiRecommendationCard from '@/features/dashboard/components/AiRecommendationCard';
import GreetingCard from '@/features/dashboard/components/GreetingCard';
import ScheduleList from '@/features/dashboard/components/ScheduleList';
import StatCard from '@/features/dashboard/components/StatCard';
import StudentCard from '@/features/dashboard/components/StudentCard';
import { 
    activities,
    aiRecommendation,
    greeting,
    schedule,
    stats,
    students 
} from '@/features/dashboard/data/dashboard';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';


export default function DashboardPage() {
    const { auth } = usePage().props;

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

                    <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 xl:grid-cols-4 xl:gap-8">
                        {stats.map((stat) => (
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

                        <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:gap-8">
                            {students.map((student) => (
                                <StudentCard key={student.id} {...student} />
                            ))}
                        </div>

                        <AiRecommendationCard {...aiRecommendation} />
                    </div>
                </section>

                <div className="relative mx-auto mt-10 w-full max-w-7xl px-4 pb-16 sm:px-6 lg:mt-12 lg:px-0 lg:pb-20">
                    <div className="grid gap-6 lg:grid-cols-[minmax(0,451px)_minmax(0,1fr)] lg:items-start lg:gap-6">
                        <ActivityFeed items={activities} />
                        <ScheduleList items={schedule} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

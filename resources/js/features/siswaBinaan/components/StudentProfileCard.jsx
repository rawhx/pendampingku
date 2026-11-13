import { Link } from '@inertiajs/react';
import StudentIcon from './StudentIcon';
import { icons } from '@/assets/icons/icons';
import { getStudentMetrics } from '@/features/siswaBinaan/data/studentMetrics';

const statusTone = { success: 'bg-green-normal text-white', warning: 'bg-orange-normal text-white' };

export default function StudentProfileCard({ student }) {
    const metrics = getStudentMetrics(student);

    return <article className="rounded-3xl bg-white/75 py-4 px-4 shadow-[0_0_14px_rgba(0,129,242,0.08)] sm:py-5 sm:px-6 lg:py-6 lg:px-8">
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <div className="min-w-0">
                    <h2 className="break-words text-lg font-semibold leading-tight text-blue-normal sm:text-xl">{student.name}</h2>
                    <p className="mt-1 break-words text-xs text-white-dark-hover sm:text-sm">{student.className} • {student.condition} • {student.age}</p>
                </div>
                    <p className="shrink-0 text-xs text-black-muted sm:text-sm">NISN: {student.nisn}</p>
            </div>
            <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
                <span className="text-black-normal">Status Emosi &amp; Perilaku</span>
                <span className={`w-fit max-w-full rounded-full px-3 py-1 text-center text-xs font-semibold leading-tight ${statusTone[student.status.tone] ?? statusTone.success}`}>{student.status.label}</span>
            </div>
                <div className="rounded-2xl bg-white-light-active px-3 py-4 sm:px-4">
                    <div className="grid gap-5 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-6">
                    {metrics.map((metric) =>
                        <div key={metric.label} className="min-w-0">
                            <div className="flex items-start justify-between gap-3 text-sm">
                                <span className="min-w-0 break-words text-black-normal">{metric.label}</span>
                                <span className="shrink-0 font-bold text-blue-normal">{metric.value}</span>
                            </div>
                            <div role="progressbar" aria-label={metric.label} aria-valuemin="0" aria-valuemax="100" aria-valuenow={metric.percent} className="mt-2 h-2 overflow-hidden rounded-full bg-white-dark/70">
                                <div className="h-full rounded-full bg-blue-normal" style={{ width: `${metric.percent}%` }} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-3 rounded-2xl bg-white-light-active px-3 py-3 text-sm text-black-normal sm:flex-row sm:items-center sm:px-4">
                {/* <StudentIcon name="star" className="h-5 w-5 shrink-0 text-blue-normal" /> */}
                <img
                    src={icons.sparkle}
                    alt=""
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0"
                />
                <p className="min-w-0 break-words">{student.insight}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Link href={route('siswa-binaan.edit', student.id)} className="flex h-11 items-center justify-center rounded-full bg-blue-normal px-6 text-sm font-semibold text-white transition hover:bg-blue-normal-hover focus:outline-none focus:ring-2 focus:ring-blue-normal/30 focus:ring-offset-2 sm:min-w-[150px]">Lihat Profil</Link>
                <Link href={route('siswa-binaan.catatan-harian', student.id)} className="flex h-11 items-center justify-center rounded-full border border-blue-normal bg-white px-6 text-sm font-semibold text-blue-normal transition hover:bg-blue-light focus:outline-none focus:ring-2 focus:ring-blue-normal/30 focus:ring-offset-2 sm:min-w-[120px]">Catat</Link>
                <Link href={route('siswa-binaan.laporan', student.id)} className="flex h-11 items-center justify-center rounded-full border border-blue-normal bg-white px-6 text-sm font-semibold text-blue-normal transition hover:bg-blue-light focus:outline-none focus:ring-2 focus:ring-blue-normal/30 focus:ring-offset-2 sm:min-w-[120px]">Laporan</Link>
            </div>
        </div>
    </article>;
}

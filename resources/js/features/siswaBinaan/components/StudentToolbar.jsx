import { Link } from '@inertiajs/react';
import StudentIcon from './StudentIcon';

export default function StudentToolbar({
    query,
    onQueryChange,
    grade,
    onGradeChange,
    gradeOptions,
    condition,
    onConditionChange,
    conditionOptions,
}) {
    return (
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row">
                <label className="relative min-w-0 flex-1 lg:max-w-[400px]">
                    <span className="sr-only">Cari siswa</span>
                    <StudentIcon name="search" className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-white-dark" />
                    <input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Cari nama siswa, NISN, Kelas" className="h-12 w-full rounded-3xl border border-white-normal bg-white/70 pl-10 pr-4 text-sm text-black-normal outline-none transition focus:border-blue-normal focus:ring-2 focus:ring-blue-normal/20" />
                </label>
                <div className="grid grid-cols-2 gap-3 sm:flex">
                    <select value={grade} onChange={(event) => onGradeChange(event.target.value)} className="h-12 min-w-0 lg:min-w-[140px] rounded-3xl border border-white-normal bg-white/70 px-3 text-sm text-black-normal outline-none focus:border-blue-normal focus:ring-2 focus:ring-blue-normal/20"><option value="">Semua Kelas</option>{gradeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}{option.hasData ? '' : ''}</option>)}
                    </select>
                    <select value={condition} onChange={(event) => onConditionChange(event.target.value)} className="h-12 min-w-0 lg:min-w-[240px] rounded-3xl border border-white-normal bg-white/70 px-3 text-sm text-black-normal outline-none focus:border-blue-normal focus:ring-2 focus:ring-blue-normal/20"><option value="">Kategori</option>{conditionOptions.map((option) => <option key={option.value} value={option.value}>{option.label}{option.hasData ? '' : ''}</option>)}
                    </select>
                </div>
            </div>
            <Link href={route('siswa-binaan.create')} className="flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-blue-normal px-5 text-sm font-semibold text-white transition hover:bg-blue-normal-hover focus:outline-none focus:ring-2 focus:ring-blue-normal/30 focus:ring-offset-2 sm:w-auto">
                <StudentIcon name="plus" className="h-5 w-5" />
                Tambah Siswa Baru
            </Link>
        </div>
    ) 
}

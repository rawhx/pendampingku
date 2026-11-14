import SectionCard from './SectionCard';
import VisibilityToggle from './VisibilityToggle';

export default function VisibilitySection({
    student,
    parentReport,
    discussTeacher,
    onChange,
}) {
    const firstName = student?.name?.trim().split(/\s+/)[0] ?? 'ananda';
    const className = student?.className ?? 'kelas';

    return (
        <SectionCard title="Pengaturan Visibilitas & Kolaborasi">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex max-w-[607px] flex-col gap-1">
                        <p className="text-base text-black-normal">
                            Tampilkan pada Laporan Orang Tua
                        </p>
                        <p className="text-xs text-white-dark">
                            Catatan ini akan otomatis masuk ke portal harian
                            orang tua {firstName} pada jadwal sinkronisasi pukul
                            16:00 WIB.
                        </p>
                    </div>

                    <VisibilityToggle
                        label="Tampilkan pada Laporan Orang Tua"
                        checked={parentReport}
                        onChange={(checked) => onChange('parentReport', checked)}
                    />
                </div>

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex max-w-[607px] flex-col gap-1">
                        <p className="text-base text-black-normal">
                            Tandai Perlu Diskusi dengan Guru Kelas
                        </p>
                        <p className="text-xs text-white-dark">
                            Kirim notifikasi sorotan ke Bu Rina (Wali {className})
                            untuk koordinasi materi akomodasi besok pagi.
                        </p>
                    </div>

                    <VisibilityToggle
                        label="Tandai Perlu Diskusi dengan Guru Kelas"
                        checked={discussTeacher}
                        onChange={(checked) =>
                            onChange('discussTeacher', checked)
                        }
                    />
                </div>
            </div>
        </SectionCard>
    );
}

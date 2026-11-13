import { getStudentNotes } from '@/features/catatanHarian/utils/catatanHarianStorage';
import { rubricCategories } from '@/features/catatanHarian/data/catatanHarian';

const shortTitles = {
    A: 'Regulasi Emosi',
    B: 'Regulasi Perilaku',
    C: 'Kemandirian',
    D: 'Komunikasi',
    E: 'Interaksi Sosial',
    F: 'Perkembangan Akademik',
};

const insights = {
    A: 'Amati respons siswa saat menghadapi perubahan aktivitas dan berikan strategi regulasi secara konsisten.',
    B: 'Pertahankan instruksi singkat dan dukungan visual selama aktivitas berlangsung.',
    C: 'Berikan kesempatan siswa menyelesaikan rutinitas secara mandiri sebelum memberi bantuan.',
    D: 'Gunakan pertanyaan terbuka dan waktu tunggu agar siswa dapat menyampaikan kebutuhannya.',
    E: 'Latih interaksi melalui permainan terstruktur dalam kelompok kecil.',
    F: 'Sesuaikan instruksi akademik dengan kekuatan belajar dan berikan target bertahap.',
};

export function getStudentReport(student) {
    const notes = getStudentNotes(student.id).sort(
        (first, second) =>
            new Date(second.savedAt ?? second.date ?? 0) -
            new Date(first.savedAt ?? first.date ?? 0),
    );

    const metrics = rubricCategories.map((category) => {
        const values = notes.flatMap((note) =>
            category.items
                .map((item) => Number(note.rubric?.[item.id]))
                .filter((value) => Number.isFinite(value) && value >= 0 && value <= 4),
        );
        const percent = values.length
            ? Math.round((values.reduce((total, value) => total + value, 0) / values.length / 4) * 100)
            : 0;

        return {
            id: category.id,
            title: category.title,
            shortTitle: shortTitles[category.id],
            value: values.length ? `${percent}%` : 'Belum ada data',
            percent,
            observationCount: notes.length,
            insight: insights[category.id],
        };
    });

    return { notes, metrics };
}

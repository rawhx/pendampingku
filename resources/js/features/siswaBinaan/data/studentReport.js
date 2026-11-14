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

export function getStudentReport(student, observations = []) {
    const notes = observations.map((observation) => ({
        ...observation,
        date: observation.observed_on,
        notes: observation.field_notes,
        savedAt: observation.created_at,
    })).sort(
        (first, second) =>
            new Date(second.savedAt ?? second.date ?? 0) -
            new Date(first.savedAt ?? first.date ?? 0),
    );

    const metrics = rubricCategories.map((category) => {
        const rubricScores = notes.flatMap((note) => {
            if (Array.isArray(note.rubrics)) {
                return note.rubrics
                    .filter((rubric) =>
                        category.items.some((item) => item.id === rubric.rubric_code),
                    )
                    .map((rubric) => Number(rubric.score));
            }

            return category.items.map((item) => Number(note.rubric?.[item.id]));
        }).filter((value) => Number.isFinite(value) && value >= 0 && value <= 4);
        const totalScore = rubricScores.reduce((total, value) => total + value, 0);
        const maxScore = rubricScores.length * 4;
        const percent = maxScore
            ? Math.round((totalScore / maxScore) * 100)
            : 0;

        return {
            id: category.id,
            title: category.title,
            shortTitle: shortTitles[category.id],
            value: maxScore ? `${totalScore}/${maxScore}` : 'Belum ada data',
            percent,
            totalScore,
            maxScore,
            answeredCount: rubricScores.length,
            observationCount: notes.length,
            insight: student.analisis_capaian?.[category.id]?.insight ?? '',
        };
    });

    const plan = Array.isArray(student.analisis_capaian?.rencana_pendampingan)
        ? student.analisis_capaian.rencana_pendampingan
        : [];

    return { notes, metrics, plan };
}

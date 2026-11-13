import { rubricCategories } from '@/features/catatanHarian/data/catatanHarian';
import { getStudentNotes } from '@/features/catatanHarian/utils/catatanHarianStorage';

export function getStudentMetrics(student) {
    const notes = getStudentNotes(student.id);
    const rubric = notes.at(-1)?.rubric ?? {};

    return rubricCategories.map((category) => {
        const answeredValues = category.items
            .map((item) => Number(rubric[item.id]))
            .filter((value) => Number.isFinite(value) && value >= 0 && value <= 4);

        const percent = answeredValues.length
            ? Math.round(
                  (answeredValues.reduce((total, value) => total + value, 0) /
                      answeredValues.length /
                      4) *
                      100,
              )
            : 0;

        return {
            label: `${category.title}`,
            value: answeredValues.length ? `${percent}%` : 'Belum ada data',
            percent,
        };
    });
}

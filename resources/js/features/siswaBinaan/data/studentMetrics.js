import { rubricCategories } from '@/features/catatanHarian/data/catatanHarian';

function readSavedNote(studentId) {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const saved = window.localStorage.getItem(`catatan-harian:${studentId}`);

        return saved ? JSON.parse(saved) : null;
    } catch {
        return null;
    }
}

export function getStudentMetrics(student) {
    const rubric = readSavedNote(student.id)?.rubric ?? {};

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

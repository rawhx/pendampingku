import { rubricCategories } from '@/features/catatanHarian/data/catatanHarian';

export function getStudentNotes(studentId) {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const saved = window.localStorage.getItem(`catatan-harian:${studentId}`);
        const parsed = saved ? JSON.parse(saved) : null;

        if (!parsed) {
            return [];
        }

        return Array.isArray(parsed) ? parsed : [parsed];
    } catch {
        return [];
    }
}

export function saveStudentNote(studentId, note) {
    const notes = getStudentNotes(studentId);

    window.localStorage.setItem(
        `catatan-harian:${studentId}`,
        JSON.stringify([...notes, note]),
    );
}

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

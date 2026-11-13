export function getStudentNotes(studentId) {
    if (typeof window === 'undefined') {
        return [];
    }

    try {
        const saved = window.localStorage.getItem(`catatan-harian:${studentId}`);
        const parsed = saved ? JSON.parse(saved) : null;

        if (!parsed) return [];

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

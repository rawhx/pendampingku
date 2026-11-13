import { useEffect, useMemo, useState } from 'react';
import { getStudents } from '../services/studentApi';
import { getStudentSummaryStats, toStudentUi } from '../utils/studentMapper';

export default function useStudents() {
    const [students, setStudents] = useState([]);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState('');

    useEffect(() => {
        let isCurrent = true;

        const loadStudents = async () => {
            try {
                const data = await getStudents();

                if (isCurrent) {
                    setStudents(data.map(toStudentUi));
                }
            } catch {
                if (isCurrent) {
                    setLoadError('Data siswa belum dapat dimuat. Silakan coba lagi.');
                }
            } finally {
                if (isCurrent) {
                    setIsLoading(false);
                }
            }
        };

        loadStudents();

        return () => {
            isCurrent = false;
        };
    }, []);

    const filteredStudents = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return students;
        }

        return students.filter((student) =>
            [student.name, student.nisn, student.className, student.condition]
                .join(' ')
                .toLowerCase()
                .includes(normalizedQuery),
        );
    }, [query, students]);

    const summaryStats = useMemo(
        () => getStudentSummaryStats(students),
        [students],
    );

    return {
        query,
        setQuery,
        filteredStudents,
        summaryStats,
        isLoading,
        loadError,
    };
}

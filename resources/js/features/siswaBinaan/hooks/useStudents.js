import { useEffect, useMemo, useState } from 'react';
import {
    classOptions,
    conditionOptions as availableConditionOptions,
} from '../data/tambahSiswa';
import { getStudentObservations, getStudents } from '../services/studentApi';
import { getStudentSummaryStats, toStudentUi } from '../utils/studentMapper';

export default function useStudents() {
    const [students, setStudents] = useState([]);
    const [query, setQuery] = useState('');
    const [grade, setGrade] = useState('');
    const [condition, setCondition] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState('');

    useEffect(() => {
        let isCurrent = true;

        const loadStudents = async () => {
            try {
                const data = await getStudents();
                const studentsWithObservations = await Promise.all(
                    data.map(async (student) => ({
                        ...toStudentUi(student),
                        observations: await getStudentObservations(student.id),
                    })),
                );

                if (isCurrent) {
                    setStudents(studentsWithObservations);
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

        return students.filter((student) =>
            (!normalizedQuery ||
                [student.name, student.nisn, student.className, student.condition]
                    .join(' ')
                    .toLowerCase()
                    .includes(normalizedQuery)) &&
            (!grade || String(student.grade) === grade) &&
            (!condition || student.condition === condition),
        );
    }, [condition, grade, query, students]);

    const gradeOptions = useMemo(
        () =>
            classOptions.map((label, index) => ({
                value: String(index + 1),
                label,
                hasData: students.some(
                    (student) => student.grade === index + 1,
                ),
            })),
        [students],
    );

    const conditionOptions = useMemo(
        () =>
            availableConditionOptions.map((label) => ({
                value: label,
                label,
                hasData: students.some(
                    (student) => student.condition === label,
                ),
            })),
        [students],
    );

    const summaryStats = useMemo(
        () => getStudentSummaryStats(students),
        [students],
    );

    return {
        query,
        setQuery,
        grade,
        setGrade,
        condition,
        setCondition,
        gradeOptions,
        conditionOptions,
        hasActiveFilter: Boolean(grade || condition),
        filteredStudents,
        summaryStats,
        isLoading,
        loadError,
    };
}

import { useEffect, useMemo, useState } from 'react';
import { getStudentReport } from '../data/studentReport';
import { getStudentObservations } from '../services/studentApi';

export default function useStudentReport(student) {
    const [query, setQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('newest');
    const [dateFilter, setDateFilter] = useState('');
    const [visibleNotes, setVisibleNotes] = useState(3);
    const [observations, setObservations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isCurrent = true;

        if (!student) {
            return undefined;
        }

        setIsLoading(true);
        getStudentObservations(student.id)
            .then((data) => {
                if (isCurrent) setObservations(data);
            })
            .finally(() => {
                if (isCurrent) setIsLoading(false);
            });

        return () => {
            isCurrent = false;
        };
    }, [student]);

    const { notes, metrics } = useMemo(
        () => (student ? getStudentReport(student, observations) : { notes: [], metrics: [] }),
        [observations, student],
    );

    const filteredNotes = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();
        const filtered = notes.filter((note) => {
            const matchesQuery = [
                note.subject,
                note.notes,
                note.qualitative?.factual,
                note.date,
            ]
                .filter(Boolean)
                .join(' ')
                .toLowerCase()
                .includes(normalizedQuery);
            const matchesDate = !dateFilter || note.date === dateFilter;

            return matchesQuery && matchesDate;
        });

        return filtered.toSorted((first, second) => {
            const firstDate = new Date(first.savedAt ?? first.date ?? 0);
            const secondDate = new Date(second.savedAt ?? second.date ?? 0);

            return sortOrder === 'newest'
                ? secondDate - firstDate
                : firstDate - secondDate;
        });
    }, [dateFilter, notes, query, sortOrder]);

    const updateQuery = (value) => {
        setQuery(value);
        setVisibleNotes(3);
    };

    const updateSortOrder = (value) => {
        setSortOrder(value);
        setVisibleNotes(3);
    };

    const updateDateFilter = (value) => {
        setDateFilter(value);
        setVisibleNotes(3);
    };

    return {
        notes,
        metrics,
        latestNote: notes[0],
        filteredNotes,
        query,
        sortOrder,
        dateFilter,
        visibleNotes,
        updateQuery,
        updateSortOrder,
        updateDateFilter,
        showMoreNotes: () => setVisibleNotes((current) => current + 3),
        isLoading,
    };
}

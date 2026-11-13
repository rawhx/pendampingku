import { useEffect, useState } from 'react';
import { getStudent } from '../services/studentApi';
import { toStudentUi } from '../utils/studentMapper';

export default function useStudent(studentId) {
    const [student, setStudent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isCurrent = true;
        setIsLoading(true);

        const loadStudent = async () => {
            try {
                const data = await getStudent(studentId);

                if (isCurrent) {
                    setStudent(toStudentUi(data));
                }
            } finally {
                if (isCurrent) {
                    setIsLoading(false);
                }
            }
        };

        loadStudent();

        return () => {
            isCurrent = false;
        };
    }, [studentId]);

    return { student, isLoading };
}

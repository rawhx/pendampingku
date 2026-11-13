import { useState } from 'react';
import { validateTambahSiswa } from '../data/tambahSiswa';
import { createStudent, updateStudent } from '../services/studentApi';
import { mapStudentFormErrors, toStudentPayload } from '../utils/studentMapper';

export default function useStudentForm(studentId) {
    const [errors, setErrors] = useState({});
    const [saved, setSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const clearFieldError = (field) => {
        setErrors((current) => {
            if (!current[field]) {
                return current;
            }

            const next = { ...current };
            delete next[field];

            return next;
        });
    };

    const submit = async (form) => {
        const nextErrors = validateTambahSiswa(form);

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);

            return;
        }

        setErrors({});
        setIsSaving(true);

        try {
            const payload = toStudentPayload(form);

            if (studentId) {
                await updateStudent(studentId, payload);
            } else {
                await createStudent(payload);
            }

            setSaved(true);
        } catch (error) {
            const apiErrors = error.response?.data?.errors;

            setErrors(
                apiErrors
                    ? mapStudentFormErrors(apiErrors)
                    : { form: 'Data siswa gagal disimpan. Silakan coba lagi.' },
            );
        } finally {
            setIsSaving(false);
        }
    };

    return {
        errors,
        saved,
        isSaving,
        clearFieldError,
        submit,
    };
}

import {
    createInitialForm,
    getAiRecommendation,
    rubricCategories,
} from '../data/catatanHarian';
import {
    validateStepOne,
    validateStepTwo,
} from '../utils/catatanHarianValidation';
import { saveStudentNote } from '../utils/catatanHarianStorage';
import { router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function useCatatanHarianForm(student) {
    const [form, setForm] = useState(() => createInitialForm(student));
    const [errors, setErrors] = useState({});
    const [saved, setSaved] = useState(false);
    const [step, setStep] = useState(1);
    const [variantIndex, setVariantIndex] = useState(0);

    const recommendation = useMemo(
        () => getAiRecommendation(student, variantIndex),
        [student, variantIndex],
    );

    const clearError = (field) => {
        setErrors((current) => {
            if (!current[field]) return current;

            const next = { ...current };
            delete next[field];
            return next;
        });
    };

    const updateField = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
        setSaved(false);
        clearError(field);
    };

    const updateRubric = (itemId, value) => {
        const nextRubric = { ...form.rubric, [itemId]: value };

        setForm((current) => ({
            ...current,
            rubric: { ...current.rubric, [itemId]: value },
        }));
        setSaved(false);

        const complete = rubricCategories.every((category) =>
            category.items.every((item) => Boolean(nextRubric[item.id])),
        );

        if (complete) clearError('rubric');
    };

    const updateQualitative = (field, value) => {
        setForm((current) => ({
            ...current,
            qualitative: { ...current.qualitative, [field]: value },
        }));
        setSaved(false);
        clearError(`qualitative.${field}`);
    };

    const applyIntervention = () => {
        const narrative = recommendation
            .map((item) => `${item.heading}: ${item.body}`)
            .join('\n\n');

        setForm((current) => ({
            ...current,
            notes: current.notes ? `${current.notes}\n\n${narrative}` : narrative,
        }));
        setSaved(false);
        clearError('notes');
    };

    const removeFile = (file) => {
        if (!file.isDemo && file.thumbnail?.startsWith('blob:')) {
            URL.revokeObjectURL(file.thumbnail);
        }

        setForm((current) => ({
            ...current,
            files: current.files.filter((item) => item.id !== file.id),
        }));
        setSaved(false);
    };

    const goNext = () => {
        const nextErrors = validateStepOne(form);

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            setSaved(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setErrors({});
        setForm((current) => ({
            ...current,
            notes:
                current.notes?.trim() || current.qualitative?.factual
                    ? current.notes?.trim() || current.qualitative.factual
                    : current.notes,
        }));
        setSaved(false);
        setStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goBack = () => {
        setSaved(false);
        setStep(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const saveNote = () => {
        const stepOneErrors = validateStepOne(form);
        const stepTwoErrors = validateStepTwo(form);
        const nextErrors = { ...stepOneErrors, ...stepTwoErrors };

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            setStep(Object.keys(stepOneErrors).length > 0 ? 1 : 2);
            setSaved(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const { files, ...persistedForm } = form;

        saveStudentNote(student.id, {
            ...persistedForm,
            savedAt: new Date().toISOString(),
        });
        window.sessionStorage.setItem(
            'pendampingku:catatan-success',
            `Catatan harian ${student.name} berhasil disimpan.`,
        );

        setSaved(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });

        window.setTimeout(() => {
            router.push({
                url: route('siswa-binaan'),
                component: 'siswaBinaan/SiswaBinaanPage',
                props: {},
                preserveState: false,
                preserveScroll: false,
            });
        }, 1800);
    };

    return {
        form,
        errors,
        saved,
        step,
        recommendation,
        updateField,
        updateRubric,
        updateQualitative,
        changeVariant: () => {
            setVariantIndex((current) => current + 1);
            setSaved(false);
        },
        applyIntervention,
        removeFile,
        goNext,
        goBack,
        saveNote,
    };
}

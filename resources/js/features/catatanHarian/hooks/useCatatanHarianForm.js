import { notify } from '@/components/common/notification';
import {
    createInitialForm,
    getAiRecommendation,
    rubricCategories,
} from '../data/catatanHarian';
import {
    validateStepOne,
    validateStepTwo,
} from '../utils/catatanHarianValidation';
import {
    createStudentObservation,
    generateStudentRecommendation,
    invalidateStudentsCache,
} from '@/features/siswaBinaan/services/studentApi';
import { router } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function useCatatanHarianForm(student) {
    const [form, setForm] = useState(() => createInitialForm(student));
    const [errors, setErrors] = useState({});
    const [saved, setSaved] = useState(false);
    const [step, setStep] = useState(1);
    const [variantIndex, setVariantIndex] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [aiError, setAiError] = useState('');

    const fallbackRecommendation = useMemo(
        () => getAiRecommendation(student, variantIndex),
        [student, variantIndex],
    );
    const [recommendation, setRecommendation] = useState(fallbackRecommendation);

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
        if (field === 'notes') {
            setAiError('');
        }
        clearError(field);
        clearError('form');
    };

    const updateRubric = (itemId, value) => {
        const nextRubric = { ...form.rubric, [itemId]: value };

        setForm((current) => ({
            ...current,
            rubric: { ...current.rubric, [itemId]: value },
        }));
        setSaved(false);
        clearError('form');

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
        clearError('form');
    };

    const applyIntervention = () => {
        const narrative = recommendation
            .map((item) => `${item.heading}: ${item.body}`)
            .join('\n\n');

        setForm((current) => ({ ...current, notes: narrative }));
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
        setSaved(false);
        setStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const goBack = () => {
        setSaved(false);
        setStep(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const saveNote = async () => {
        if (isSaving) {
            return;
        }

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

        const files = form.files
            .map((file) => file.file)
            .filter(Boolean);
        const qualitative = {
            ...form.qualitative,
            factual: form.notes,
            intervention: form.strategy,
        };

        setIsSaving(true);

        try {
            await createStudentObservation(student.id, {
                observed_on: form.date,
                start_time: form.startTime,
                end_time: form.endTime,
                subject: form.subject,
                emotion: form.emotion,
                rubric: form.rubric,
                qualitative,
                field_notes: form.notes,
                strategy: form.strategy,
                parent_report: form.parentReport,
                discuss_teacher: form.discussTeacher,
                files,
                ai_recommendation: recommendation,
            });
            invalidateStudentsCache();
        } catch (error) {
            const apiErrors = error.response?.data?.errors;
            const message = apiErrors
                ? Object.values(apiErrors).flat()[0]
                : error.response?.data?.message;
            const errorMessage =
                message || 'Catatan gagal disimpan. Silakan coba lagi.';

            setErrors({ form: errorMessage });
            notify({
                title: 'Gagal menyimpan catatan harian',
                message: errorMessage,
                tone: 'error',
                duration: 8000,
            });

            return;
        } finally {
            setIsSaving(false);
        }

        notify({
            title: 'Catatan harian berhasil disimpan',
            message: `Catatan harian ${student.name} berhasil disimpan. Mengalihkan ke Siswa Binaan...`,
            tone: 'success',
        });

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
        changeVariant: async () => {
            if (!form.notes.trim() || isGenerating) {
                setAiError('Tulis catatan lapangan terlebih dahulu.');
                return;
            }

            setIsGenerating(true);
            setAiError('');

            try {
            setRecommendation(
                    await generateStudentRecommendation(student.id, form.notes),
                );
            } catch {
                setAiError('Rekomendasi AI belum dapat dibuat. Silakan coba lagi.');
            } finally {
                setIsGenerating(false);
            }

            setSaved(false);
        },
        applyIntervention,
        removeFile,
        goNext,
        goBack,
        saveNote,
        isGenerating,
        isSaving,
        aiError,
    };
}

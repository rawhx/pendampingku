import DocumentationSection from '@/features/catatanHarian/components/DocumentationSection';
import EmotionCheckInSection from '@/features/catatanHarian/components/EmotionCheckInSection';
import FormActions from '@/features/catatanHarian/components/FormActions';
import ObservationNotesSection from '@/features/catatanHarian/components/ObservationNotesSection';
import QualitativeSection from '@/features/catatanHarian/components/QualitativeSection';
import RubricSection from '@/features/catatanHarian/components/RubricSection';
import SessionDetailsSection from '@/features/catatanHarian/components/SessionDetailsSection';
import StrategySection from '@/features/catatanHarian/components/StrategySection';
import VisibilitySection from '@/features/catatanHarian/components/VisibilitySection';
import {
    createInitialForm,
    emotionOptions,
    getAiRecommendation,
} from '@/features/catatanHarian/data/catatanHarian';
import { students } from '@/features/siswaBinaan/data/students';
import { saveStudentNote } from '@/features/siswaBinaan/data/studentMetrics';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function CatatanHarianPage() {
    const { studentId } = usePage().props;
    const student = useMemo(
        () => students.find((item) => item.id === studentId) ?? students[0],
        [studentId],
    );

    const [form, setForm] = useState(() => createInitialForm(student));
    const [errors, setErrors] = useState({});
    const [saved, setSaved] = useState(false);
    const [step, setStep] = useState(1);
    const [variantIndex, setVariantIndex] = useState(0);

    const recommendation = useMemo(
        () => getAiRecommendation(student, variantIndex),
        [student, variantIndex],
    );

    const updateField = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
        setSaved(false);
        setErrors((current) => ({ ...current, [field]: undefined }));
    };

    const updateRubric = (itemId, value) => {
        setForm((current) => ({
            ...current,
            rubric: {
                ...current.rubric,
                [itemId]: value,
            },
        }));
        setSaved(false);
    };

    const updateQualitative = (field, value) => {
        setForm((current) => ({
            ...current,
            qualitative: {
                ...current.qualitative,
                [field]: value,
            },
        }));
        setSaved(false);
    };

    const changeVariant = () => {
        setVariantIndex((current) => current + 1);
        setSaved(false);
    };

    const applyIntervention = () => {
        const narrative = recommendation
            .map((item) => `${item.heading}: ${item.body}`)
            .join('\n\n');

        setForm((current) => ({
            ...current,
            notes: current.notes
                ? `${current.notes}\n\n${narrative}`
                : narrative,
        }));
        setSaved(false);
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

    const validateSession = () => {
        const nextErrors = {};

        if (!form.date) {
            nextErrors.date = 'Tanggal observasi wajib diisi.';
        }

        if (!form.startTime) {
            nextErrors.startTime = 'Jam mulai wajib diisi.';
        }

        if (!form.endTime) {
            nextErrors.endTime = 'Jam selesai wajib diisi.';
        } else if (form.startTime && form.endTime <= form.startTime) {
            nextErrors.endTime = 'Jam selesai harus setelah jam mulai.';
        }

        if (!form.subject?.trim()) {
            nextErrors.subject = 'Mata pelajaran wajib diisi.';
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const goNext = () => {
        if (!validateSession()) {
            setSaved(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

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
        if (!validateSession()) {
            setStep(1);
            setSaved(false);
            return;
        }

        const { files, ...persistedForm } = form;

        try {
            saveStudentNote(student.id, {
                ...persistedForm,
                savedAt: new Date().toISOString(),
            });
        } catch {
            // Abaikan kegagalan penyimpanan lokal (mis. mode privat).
        }

        setSaved(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Catatan Harian" />

            <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-0 lg:pb-20 lg:pt-36">
                <Link
                    href={route('siswa-binaan')}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-normal transition hover:text-blue-normal-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-normal/30 focus-visible:ring-offset-2"
                >
                    <span aria-hidden="true">←</span>
                    Kembali ke Siswa Binaan
                </Link>

                <div className="mb-8 mt-4">
                    <h1 className="text-2xl font-bold leading-tight text-black-normal sm:text-3xl">
                        Catatan Harian
                    </h1>
                    <p className="mt-2 text-sm text-black-muted">
                        Buat catatan perkembangan baru untuk {student.name}.
                    </p>
                </div>

                <div className="flex flex-col gap-6">
                    {saved && (
                        <div
                            role="status"
                            aria-live="polite"
                            className="rounded-3xl border border-green-normal bg-green-light px-4 py-3 text-base text-green-dark"
                        >
                            Catatan harian {student.name} berhasil disimpan.
                        </div>
                    )}

                    {step === 1 ? (
                        <>
                            <SessionDetailsSection
                                date={form.date}
                                startTime={form.startTime}
                                endTime={form.endTime}
                                subject={form.subject}
                                errors={errors}
                                onChange={updateField}
                            />

                            <EmotionCheckInSection
                                value={form.emotion}
                                options={emotionOptions}
                                onChange={(emotion) =>
                                    updateField('emotion', emotion)
                                }
                            />

                            <RubricSection
                                answers={form.rubric}
                                onSelect={updateRubric}
                            />

                            <QualitativeSection
                                values={form.qualitative}
                                onChange={updateQualitative}
                            />

                            <FormActions step={1} onNext={goNext} />
                        </>
                    ) : (
                        <>
                            <ObservationNotesSection
                                notes={form.notes}
                                onNotesChange={(notes) =>
                                    updateField('notes', notes)
                                }
                                recommendation={recommendation}
                                onApplyIntervention={applyIntervention}
                                onVariantChange={changeVariant}
                            />

                            <StrategySection
                                value={form.strategy}
                                onChange={(strategy) =>
                                    updateField('strategy', strategy)
                                }
                            />

                            <DocumentationSection
                                files={form.files}
                                onFilesChange={(files) =>
                                    updateField('files', files)
                                }
                                onRemoveFile={removeFile}
                            />

                            <VisibilitySection
                                student={student}
                                parentReport={form.parentReport}
                                discussTeacher={form.discussTeacher}
                                onChange={updateField}
                            />

                            <FormActions
                                step={2}
                                onBack={goBack}
                                onSave={saveNote}
                            />
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

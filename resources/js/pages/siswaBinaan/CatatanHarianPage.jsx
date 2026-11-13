import CatatanHarianHeader from '@/features/catatanHarian/components/CatatanHarianHeader';
import CatatanSuccessToast from '@/features/catatanHarian/components/CatatanSuccessToast';
import DocumentationSection from '@/features/catatanHarian/components/DocumentationSection';
import EmotionCheckInSection from '@/features/catatanHarian/components/EmotionCheckInSection';
import FormActions from '@/features/catatanHarian/components/FormActions';
import ObservationNotesSection from '@/features/catatanHarian/components/ObservationNotesSection';
import QualitativeSection from '@/features/catatanHarian/components/QualitativeSection';
import RubricSection from '@/features/catatanHarian/components/RubricSection';
import SessionDetailsSection from '@/features/catatanHarian/components/SessionDetailsSection';
import StrategySection from '@/features/catatanHarian/components/StrategySection';
import VisibilitySection from '@/features/catatanHarian/components/VisibilitySection';
import { emotionOptions } from '@/features/catatanHarian/data/catatanHarian';
import useCatatanHarianForm from '@/features/catatanHarian/hooks/useCatatanHarianForm';
import { students } from '@/features/siswaBinaan/data/students';
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import { useMemo } from 'react';

export default function CatatanHarianPage() {
    const { studentId } = usePage().props;
    const student = useMemo(
        () => students.find((item) => item.id === studentId) ?? students[0],
        [studentId],
    );
    const catatan = useCatatanHarianForm(student);

    return (
        <AuthenticatedLayout>
            <Head title="Catatan Harian" />

            <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-0 lg:pb-20 lg:pt-36">
                <CatatanHarianHeader studentName={student.name} />

                <div className="flex flex-col gap-6">
                    {catatan.saved && (
                        <CatatanSuccessToast studentName={student.name} />
                    )}

                    {Object.keys(catatan.errors).length > 0 && (
                        <div role="alert" className="rounded-2xl border border-red-normal/30 bg-red-light px-5 py-4 text-sm text-red-dark">
                            Lengkapi semua input wajib sebelum melanjutkan atau menyimpan catatan.
                        </div>
                    )}

                    {catatan.step === 1 ? (
                        <>
                            <SessionDetailsSection
                                date={catatan.form.date}
                                startTime={catatan.form.startTime}
                                endTime={catatan.form.endTime}
                                subject={catatan.form.subject}
                                errors={catatan.errors}
                                onChange={catatan.updateField}
                            />
                            <EmotionCheckInSection
                                value={catatan.form.emotion}
                                options={emotionOptions}
                                error={catatan.errors.emotion}
                                onChange={(emotion) => catatan.updateField('emotion', emotion)}
                            />
                            <RubricSection
                                answers={catatan.form.rubric}
                                hasError={Boolean(catatan.errors.rubric)}
                                onSelect={catatan.updateRubric}
                            />
                            <QualitativeSection
                                values={catatan.form.qualitative}
                                errors={catatan.errors}
                                onChange={catatan.updateQualitative}
                            />
                            <FormActions step={1} onNext={catatan.goNext} />
                        </>
                    ) : (
                        <>
                            <ObservationNotesSection
                                notes={catatan.form.notes}
                                error={catatan.errors.notes}
                                onNotesChange={(notes) => catatan.updateField('notes', notes)}
                                recommendation={catatan.recommendation}
                                onApplyIntervention={catatan.applyIntervention}
                                onVariantChange={catatan.changeVariant}
                            />
                            <StrategySection
                                value={catatan.form.strategy}
                                error={catatan.errors.strategy}
                                onChange={(strategy) => catatan.updateField('strategy', strategy)}
                            />
                            <DocumentationSection
                                files={catatan.form.files}
                                requiredError={catatan.errors.files}
                                onFilesChange={(files) => catatan.updateField('files', files)}
                                onRemoveFile={catatan.removeFile}
                            />
                            <VisibilitySection
                                student={student}
                                parentReport={catatan.form.parentReport}
                                discussTeacher={catatan.form.discussTeacher}
                                onChange={catatan.updateField}
                            />
                            <FormActions
                                step={2}
                                onBack={catatan.goBack}
                                onSave={catatan.saveNote}
                            />
                        </>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

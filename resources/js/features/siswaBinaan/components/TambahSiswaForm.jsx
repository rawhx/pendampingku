import { router } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import {
    calculateAge,
    classOptions,
    conditionOptions,
    genderOptions,
    getTodayInputValue,
    initialTambahSiswaForm,
    statusOptions,
} from '../data/tambahSiswa';
import useStudentForm from '../hooks/useStudentForm';
import FormControl, {
    fieldClass,
    readOnlyFieldClass,
    selectClass,
} from './FormControl';
import FormSection from './FormSection';

export default function TambahSiswaForm({
    initialValues = initialTambahSiswaForm,
    studentId = null,
}) {
    const [form, setForm] = useState(() => ({
        ...initialTambahSiswaForm,
        ...initialValues,
    }));
    const { errors, saved, isSaving, clearFieldError, submit } = useStudentForm(studentId);

    const age = useMemo(() => calculateAge(form.birthDate), [form.birthDate]);

    const updateField = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
        clearFieldError(field);
    };

    useEffect(() => {
        if (!saved) {
            return undefined;
        }

        const timer = setTimeout(() => {
            router.visit(route('siswa-binaan'));
        }, 1200);

        return () => clearTimeout(timer);
    }, [saved]);

    const handleSubmit = (event) => {
        event.preventDefault();
        submit(form);
    };

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
            {errors.form && (
                <div
                    role="alert"
                    className="rounded-2xl border border-red-300 bg-red-50 px-5 py-3 text-sm font-medium text-red-700"
                >
                    {errors.form}
                </div>
            )}
            {saved && (
                <div
                    role="status"
                    className="rounded-2xl border border-green-normal/30 bg-green-light px-5 py-3 text-sm font-medium text-green-dark"
                >
                    Data siswa berhasil {studentId ? 'diperbarui' : 'disimpan'}. Mengalihkan ke daftar
                    siswa...
                </div>
            )}

            <div className="flex flex-col gap-12 rounded-3xl bg-white px-5 py-7 sm:px-7 sm:py-9">
                <FormSection
                    index={1}
                    title="Informasi Pribadi"
                    description="Data identitas dasar siswa"
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        <FormControl id="nisn" label="NISN" error={errors.nisn}>
                            <input
                                id="nisn"
                                type="text"
                                inputMode="numeric"
                                autoComplete="off"
                                maxLength={10}
                                placeholder="Masukkan 10 digit NISN"
                                value={form.nisn}
                                onChange={(event) =>
                                    updateField(
                                        'nisn',
                                        event.target.value
                                            .replace(/\D/g, '')
                                            .slice(0, 10),
                                    )
                                }
                                aria-invalid={Boolean(errors.nisn)}
                                aria-describedby={
                                    errors.nisn ? 'nisn-error' : undefined
                                }
                                className={fieldClass}
                            />
                        </FormControl>

                        <FormControl
                            id="full-name"
                            label="Nama lengkap"
                            error={errors.fullName}
                        >
                            <input
                                id="full-name"
                                type="text"
                                autoComplete="off"
                                placeholder="Nama lengkap siswa"
                                value={form.fullName}
                                onChange={(event) =>
                                    updateField('fullName', event.target.value)
                                }
                                aria-invalid={Boolean(errors.fullName)}
                                aria-describedby={
                                    errors.fullName
                                        ? 'full-name-error'
                                        : undefined
                                }
                                className={fieldClass}
                            />
                        </FormControl>

                        <FormControl
                            id="nickname"
                            label="Nama panggilan"
                            error={errors.nickname}
                        >
                            <input
                                id="nickname"
                                type="text"
                                autoComplete="off"
                                placeholder="Nama panggilan siswa"
                                value={form.nickname}
                                onChange={(event) =>
                                    updateField('nickname', event.target.value)
                                }
                                aria-invalid={Boolean(errors.nickname)}
                                className={fieldClass}
                            />
                        </FormControl>

                        <FormControl
                            id="gender"
                            label="Gender"
                            error={errors.gender}
                        >
                            <select
                                id="gender"
                                value={form.gender}
                                onChange={(event) =>
                                    updateField('gender', event.target.value)
                                }
                                aria-invalid={Boolean(errors.gender)}
                                aria-describedby={
                                    errors.gender
                                        ? 'gender-error'
                                        : undefined
                                }
                                className={selectClass}
                            >
                                <option value="" disabled>
                                    Perempuan / Laki - Laki
                                </option>
                                {genderOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </FormControl>

                        <FormControl
                            id="birth-date"
                            label="Tanggal lahir"
                            error={errors.birthDate}
                        >
                            <input
                                id="birth-date"
                                type="date"
                                max={getTodayInputValue()}
                                value={form.birthDate}
                                onChange={(event) =>
                                    updateField(
                                        'birthDate',
                                        event.target.value,
                                    )
                                }
                                aria-invalid={Boolean(errors.birthDate)}
                                aria-describedby={
                                    errors.birthDate
                                        ? 'birth-date-error'
                                        : undefined
                                }
                                className={fieldClass}
                            />
                        </FormControl>

                        <FormControl id="age" label="Umur">
                            <input
                                id="age"
                                type="text"
                                readOnly
                                tabIndex={-1}
                                placeholder="Terisi otomatis"
                                value={
                                    age !== null && age >= 0
                                        ? `${age} Tahun`
                                        : ''
                                }
                                className={readOnlyFieldClass}
                            />
                        </FormControl>
                    </div>
                </FormSection>

                <FormSection
                    index={2}
                    title="Informasi Sekolah & Pendampingan"
                    description="Data akademik dan status layanan siswa"
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        <FormControl
                            id="class-name"
                            label="Kelas"
                            error={errors.className}
                        >
                            <select
                                id="class-name"
                                value={form.className}
                                onChange={(event) =>
                                    updateField(
                                        'className',
                                        event.target.value,
                                    )
                                }
                                aria-invalid={Boolean(errors.className)}
                                aria-describedby={
                                    errors.className
                                        ? 'class-name-error'
                                        : undefined
                                }
                                className={selectClass}
                            >
                                <option value="" disabled>
                                    Pilih kelas
                                </option>
                                {classOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </FormControl>

                        <FormControl
                            id="school"
                            label="Sekolah"
                            error={errors.school}
                        >
                            <input
                                id="school"
                                type="text"
                                autoComplete="off"
                                placeholder="Nama sekolah siswa"
                                value={form.school}
                                onChange={(event) =>
                                    updateField('school', event.target.value)
                                }
                                aria-invalid={Boolean(errors.school)}
                                aria-describedby={
                                    errors.school
                                        ? 'school-error'
                                        : undefined
                                }
                                className={fieldClass}
                            />
                        </FormControl>

                        <FormControl
                            id="mentoring-start-date"
                            label="Tanggal mulai pendampingan"
                            error={errors.mentoringStartDate}
                        >
                            <input
                                id="mentoring-start-date"
                                type="date"
                                value={form.mentoringStartDate}
                                onChange={(event) =>
                                    updateField(
                                        'mentoringStartDate',
                                        event.target.value,
                                    )
                                }
                                aria-invalid={Boolean(
                                    errors.mentoringStartDate,
                                )}
                                aria-describedby={
                                    errors.mentoringStartDate
                                        ? 'mentoring-start-date-error'
                                        : undefined
                                }
                                className={fieldClass}
                            />
                        </FormControl>

                        <FormControl
                            id="status"
                            label="Status"
                            error={errors.status}
                        >
                            <select
                                id="status"
                                value={form.status}
                                onChange={(event) =>
                                    updateField('status', event.target.value)
                                }
                                aria-invalid={Boolean(errors.status)}
                                aria-describedby={
                                    errors.status
                                        ? 'status-error'
                                        : undefined
                                }
                                className={selectClass}
                            >
                                <option value="" disabled>
                                    Pilih status layanan
                                </option>
                                {statusOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </FormControl>

                        <FormControl
                            id="disability-condition"
                            label="Kondisi disabilitas"
                            error={errors.disabilityCondition}
                            className="md:col-span-2"
                        >
                            <select
                                id="disability-condition"
                                value={form.disabilityCondition}
                                onChange={(event) =>
                                    updateField(
                                        'disabilityCondition',
                                        event.target.value,
                                    )
                                }
                                aria-invalid={Boolean(
                                    errors.disabilityCondition,
                                )}
                                aria-describedby={
                                    errors.disabilityCondition
                                        ? 'disability-condition-error'
                                        : undefined
                                }
                                className={selectClass}
                            >
                                <option value="" disabled>
                                    Pilih kondisi disabilitas
                                </option>
                                {conditionOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </FormControl>
                    </div>
                </FormSection>

                <FormSection
                    index={3}
                    title="Informasi Orang Tua"
                    description="Kontak yang dapat dihubungi terkait siswa"
                >
                    <div className="grid gap-5 md:grid-cols-2">
                        <FormControl
                            id="parent-name"
                            label="Nama orang tua / wali"
                            error={errors.parentName}
                        >
                            <input
                                id="parent-name"
                                type="text"
                                autoComplete="off"
                                placeholder="Nama lengkap orang tua / wali"
                                value={form.parentName}
                                onChange={(event) =>
                                    updateField(
                                        'parentName',
                                        event.target.value,
                                    )
                                }
                                aria-invalid={Boolean(errors.parentName)}
                                aria-describedby={
                                    errors.parentName
                                        ? 'parent-name-error'
                                        : undefined
                                }
                                className={fieldClass}
                            />
                        </FormControl>

                        <FormControl
                            id="parent-contact"
                            label="Kontak orang tua"
                            error={errors.parentContact}
                        >
                            <input
                                id="parent-contact"
                                type="tel"
                                inputMode="tel"
                                autoComplete="tel"
                                placeholder="081234567890"
                                value={form.parentContact}
                                onChange={(event) =>
                                    updateField(
                                        'parentContact',
                                        event.target.value
                                            .replace(/[^0-9+\- ]/g, '')
                                            .slice(0, 20),
                                    )
                                }
                                aria-invalid={Boolean(errors.parentContact)}
                                aria-describedby={
                                    errors.parentContact
                                        ? 'parent-contact-error'
                                        : undefined
                                }
                                className={fieldClass}
                            />
                        </FormControl>

                        <FormControl
                            id="emergency-contact"
                            label="Kontak darurat"
                            error={errors.emergencyContact}
                            className="md:col-span-2"
                        >
                            <input
                                id="emergency-contact"
                                type="tel"
                                inputMode="tel"
                                autoComplete="tel"
                                placeholder="Nomor kontak darurat selain orang tua"
                                value={form.emergencyContact}
                                onChange={(event) =>
                                    updateField(
                                        'emergencyContact',
                                        event.target.value
                                            .replace(/[^0-9+\- ]/g, '')
                                            .slice(0, 20),
                                    )
                                }
                                aria-invalid={Boolean(
                                    errors.emergencyContact,
                                )}
                                className={fieldClass}
                            />
                        </FormControl>
                    </div>
                </FormSection>
            </div>

            <button
                type="submit"
                disabled={saved || isSaving}
                className="gradient-primary h-12 w-full rounded-[28px] text-base font-semibold text-white shadow-[0_0_2px_rgba(0,0,0,0.08)] transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-normal/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
                {saved || isSaving
                    ? 'Menyimpan...'
                    : studentId
                      ? 'Simpan Perubahan'
                      : 'Simpan'}
            </button>
        </form>
    );
}

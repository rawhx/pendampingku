import { qualitativeFields, rubricCategories } from '../data/catatanHarian';

export function validateStepOne(form) {
    const errors = {};

    if (!form.date) errors.date = 'Tanggal observasi wajib diisi.';
    if (!form.startTime) errors.startTime = 'Jam mulai wajib diisi.';
    if (!form.endTime) {
        errors.endTime = 'Jam selesai wajib diisi.';
    } else if (form.startTime && form.endTime <= form.startTime) {
        errors.endTime = 'Jam selesai harus setelah jam mulai.';
    }
    if (!form.subject?.trim()) errors.subject = 'Mata pelajaran wajib diisi.';
    if (!form.emotion) errors.emotion = 'Kondisi emosi wajib dipilih.';

    if (
        rubricCategories.some((category) =>
            category.items.some((item) => !form.rubric?.[item.id]),
        )
    ) {
        errors.rubric = 'Semua penilaian rubric A–F wajib diisi.';
    }

    qualitativeFields.forEach((field) => {
        if (!form.qualitative?.[field.id]?.trim()) {
            errors[`qualitative.${field.id}`] = `${field.label} wajib diisi.`;
        }
    });

    return errors;
}

export function validateStepTwo(form) {
    const errors = {};

    if (!form.notes?.trim()) errors.notes = 'Catatan lapangan wajib diisi.';
    if (!form.strategy?.trim()) {
        errors.strategy = 'Strategi pendampingan wajib diisi.';
    }
    if (!form.files?.length) {
        errors.files = 'Minimal satu dokumentasi wajib diunggah.';
    }

    return errors;
}

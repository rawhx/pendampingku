import { calculateAge, initialTambahSiswaForm } from '../data/tambahSiswa';

export function toStudentUi(student) {
    const insightStudentAi = student.insight_student_ai?.trim() || null;

    return {
        ...student,
        name: student.full_name,
        className: `Kelas ${student.grade}`,
        condition: student.disability_condition,
        age: `${calculateAge(student.birth_date)} Tahun`,
        serviceStatus: student.status,
        status: {
            label: student.status,
            tone: student.status === 'Aktif' ? 'success' : 'warning',
        },
        insight_student_ai: insightStudentAi,
        insight: insightStudentAi,
    };
}

export function toStudentFormValues(student) {
    return {
        ...initialTambahSiswaForm,
        nisn: student.nisn,
        fullName: student.full_name,
        nickname: student.nickname,
        gender: student.gender,
        birthDate: student.birth_date,
        className: `Kelas ${student.grade}`,
        school: student.school,
        mentoringStartDate: student.mentoring_start_date,
        disabilityCondition: student.disability_condition,
        status: student.serviceStatus ?? student.status,
        parentName: student.parent_name,
        parentContact: student.parent_contact,
        emergencyContact: student.emergency_contact,
    };
}

export function toStudentPayload(form) {
    return {
        nisn: form.nisn,
        full_name: form.fullName,
        nickname: form.nickname,
        gender: form.gender,
        birth_date: form.birthDate,
        grade: Number(form.className.replace('Kelas ', '')),
        school: form.school,
        mentoring_start_date: form.mentoringStartDate,
        status: form.status,
        disability_condition: form.disabilityCondition,
        parent_name: form.parentName,
        parent_contact: form.parentContact,
        emergency_contact: form.emergencyContact,
    };
}

export function mapStudentFormErrors(apiErrors) {
    const fieldMap = {
        full_name: 'fullName',
        birth_date: 'birthDate',
        mentoring_start_date: 'mentoringStartDate',
        disability_condition: 'disabilityCondition',
        parent_name: 'parentName',
        parent_contact: 'parentContact',
        emergency_contact: 'emergencyContact',
        grade: 'className',
    };

    return Object.fromEntries(
        Object.entries(apiErrors).map(([field, messages]) => [
            fieldMap[field] ?? field,
            messages[0],
        ]),
    );
}

export function getStudentSummaryStats(students) {
    return [
        {
            id: 'active',
            icon: 'academic',
            value: students.filter((student) => student.serviceStatus === 'Aktif')
                .length,
            label: 'Total Siswa Aktif',
        },
        {
            id: 'asd',
            icon: 'heart',
            value: students.filter((student) => student.condition.includes('ASD'))
                .length,
            label: 'Spektrum ASD',
        },
        {
            id: 'adhd',
            icon: 'bolt',
            value: students.filter((student) => student.condition === 'ADHD')
                .length,
            label: 'ADHD Regulasi',
        },
        {
            id: 'speech',
            icon: 'speech',
            value: students.filter((student) =>
                /disleksia|speech/i.test(student.condition),
            ).length,
            label: 'Disleksia & Wicara',
        },
    ];
}

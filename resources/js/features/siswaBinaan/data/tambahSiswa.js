export const classOptions = ['Kelas 1', 'Kelas 2A', 'Kelas 3B', 'Kelas 4C'];

export const genderOptions = ['Perempuan', 'Laki-laki'];

export const statusOptions = ['Aktif', 'Cuti', 'Selesai'];

export const conditionOptions = [
    'ASD (Autism Spectrum)',
    'ADHD',
    'Disleksia',
    'Dispraksia & Speech Delay',
];

export const initialTambahSiswaForm = {
    nisn: '',
    fullName: '',
    nickname: '',
    gender: '',
    birthDate: '',
    className: '',
    school: '',
    mentoringStartDate: '',
    status: '',
    disabilityCondition: '',
    parentName: '',
    parentContact: '',
    emergencyContact: '',
};

export function getTodayInputValue() {
    const today = new Date();
    const month = `${today.getMonth() + 1}`.padStart(2, '0');
    const day = `${today.getDate()}`.padStart(2, '0');

    return `${today.getFullYear()}-${month}-${day}`;
}

export function calculateAge(birthDate) {
    if (!birthDate) {
        return null;
    }

    const birth = new Date(`${birthDate}T00:00:00`);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();

    if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birth.getDate())
    ) {
        age -= 1;
    }

    return age;
}

export function validateTambahSiswa(form) {
    const errors = {};

    if (!form.nisn.trim()) {
        errors.nisn = 'NISN wajib diisi.';
    } else if (!/^\d{10}$/.test(form.nisn.trim())) {
        errors.nisn = 'NISN harus terdiri dari 10 digit angka.';
    }

    if (!form.fullName.trim()) {
        errors.fullName = 'Nama lengkap wajib diisi.';
    }

    if (!form.nickname.trim()) {
        errors.nickname = 'Nama panggilan wajib diisi.';
    }

    if (!form.gender) {
        errors.gender = 'Jenis kelamin wajib dipilih.';
    }

    if (!form.birthDate) {
        errors.birthDate = 'Tanggal lahir wajib diisi.';
    } else if (form.birthDate > getTodayInputValue()) {
        errors.birthDate = 'Tanggal lahir tidak boleh di masa depan.';
    }

    if (!form.className) {
        errors.className = 'Kelas wajib dipilih.';
    }

    if (!form.school.trim()) {
        errors.school = 'Nama sekolah wajib diisi.';
    }

    if (!form.mentoringStartDate) {
        errors.mentoringStartDate = 'Tanggal mulai pendampingan wajib diisi.';
    }

    if (!form.status) {
        errors.status = 'Status wajib dipilih.';
    }

    if (!form.disabilityCondition) {
        errors.disabilityCondition = 'Kondisi disabilitas wajib dipilih.';
    }

    if (!form.parentName.trim()) {
        errors.parentName = 'Nama orang tua / wali wajib diisi.';
    }

    if (!form.parentContact.trim()) {
        errors.parentContact = 'Kontak orang tua wajib diisi.';
    }

    if (!form.emergencyContact.trim()) {
        errors.emergencyContact = 'Kontak darurat wajib diisi.';
    }

    return errors;
}

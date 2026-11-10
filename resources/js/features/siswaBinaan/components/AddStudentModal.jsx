import { useMemo, useState } from 'react';
import Modal from '@/components/ui/Modal';
import InputError from '@/components/ui/InputError';
import InputLabel from '@/components/ui/InputLabel';
import PrimaryButton from '@/components/ui/PrimaryButton';
import TextInput from '@/components/ui/TextInput';

const initialForm = {
    name: '',
    nisn: '',
    className: '',
    birthDate: '',
    gender: '',
    parentName: '',
    parentPhone: '',
    condition: '',
    status: 'Tenang & Kooperatif',
    insight: '',
};

function calculateAge(birthDate) {
    if (!birthDate) return null;

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

function getTodayInputValue() {
    const today = new Date();
    const month = `${today.getMonth() + 1}`.padStart(2, '0');
    const day = `${today.getDate()}`.padStart(2, '0');

    return `${today.getFullYear()}-${month}-${day}`;
}

export default function AddStudentModal({ show, onClose, onSubmit }) {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const age = useMemo(() => calculateAge(form.birthDate), [form.birthDate]);

    const updateField = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
        setErrors((current) => ({ ...current, [field]: '' }));
    };

    const closeModal = () => {
        setForm(initialForm);
        setErrors({});
        onClose();
    };

    const submit = (event) => {
        event.preventDefault();
        const nextErrors = {};

        if (!form.name.trim()) nextErrors.name = 'Nama siswa wajib diisi.';
        if (!form.nisn.trim()) nextErrors.nisn = 'NISN wajib diisi.';
        if (!form.className) nextErrors.className = 'Kelas wajib dipilih.';
        if (!form.gender) nextErrors.gender = 'Jenis kelamin wajib dipilih.';
        if (!form.birthDate) {
            nextErrors.birthDate = 'Tanggal lahir wajib diisi.';
        } else if (form.birthDate > getTodayInputValue()) {
            nextErrors.birthDate = 'Tanggal lahir tidak boleh di masa depan.';
        }
        if (!form.parentName.trim()) nextErrors.parentName = 'Nama orang tua wajib diisi.';
        if (!form.parentPhone.trim()) nextErrors.parentPhone = 'Nomor WhatsApp wajib diisi.';
        if (!form.condition) nextErrors.condition = 'Kategori wajib dipilih.';

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        onSubmit({
            ...form,
            name: form.name.trim(),
            nisn: form.nisn.trim(),
            age: `${age} Tahun`,
            status: {
                label: form.status,
                tone: form.status === 'Tenang & Kooperatif' ? 'success' : 'warning',
            },
            metrics: [
                { label: 'Target perkembangan 1', value: '0%', percent: 0 },
                { label: 'Target perkembangan 2', value: '0%', percent: 0 },
            ],
            insight: form.insight.trim() || 'Belum ada catatan awal.',
        });

        closeModal();
    };

    return (
        <Modal show={show} onClose={closeModal} maxWidth="xl">
            <form onSubmit={submit} className="max-h-[90vh] overflow-y-auto p-5 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-semibold text-black-normal sm:text-2xl">
                            Tambah Siswa Baru
                        </h2>
                        <p className="mt-1 text-sm text-black-muted">
                            Lengkapi data dasar siswa untuk menambahkannya ke daftar binaan.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={closeModal}
                        aria-label="Tutup modal"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-black-muted transition hover:bg-white-light-active hover:text-black-normal focus:outline-none focus:ring-2 focus:ring-blue-normal/30"
                    >
                        <span aria-hidden="true" className="text-2xl leading-none">&times;</span>
                    </button>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                        <InputLabel htmlFor="student-name">Nama lengkap</InputLabel>
                        <TextInput id="student-name" value={form.name} onChange={(event) => updateField('name', event.target.value)} className="mt-1 h-11 w-full" autoComplete="off" />
                        <InputError message={errors.name} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="student-nisn">NISN</InputLabel>
                        <TextInput id="student-nisn" value={form.nisn} onChange={(event) => updateField('nisn', event.target.value.replace(/\D/g, '').slice(0, 20))} className="mt-1 h-11 w-full" inputMode="numeric" autoComplete="off" />
                        <InputError message={errors.nisn} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="student-class">Kelas</InputLabel>
                        <select id="student-class" value={form.className} onChange={(event) => updateField('className', event.target.value)} className="mt-1 h-11 w-full rounded-3xl border border-white-normal bg-white px-5 text-sm text-black-normal focus:border-blue-normal focus:ring-2 focus:ring-blue-normal/20">
                            <option value="">Pilih kelas</option>
                            <option>Kelas 1</option>
                            <option>Kelas 2A</option>
                            <option>Kelas 3B</option>
                            <option>Kelas 4C</option>
                        </select>
                        <InputError message={errors.className} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="student-birth-date">Tanggal lahir</InputLabel>
                        <TextInput id="student-birth-date" type="date" max={getTodayInputValue()} value={form.birthDate} onChange={(event) => updateField('birthDate', event.target.value)} className="mt-1 h-11 w-full" />
                        <InputError message={errors.birthDate} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="student-age">Usia</InputLabel>
                        <TextInput id="student-age" value={age !== null && age >= 0 ? `${age} tahun` : ''} readOnly tabIndex="-1" placeholder="Terisi otomatis" className="mt-1 h-11 w-full cursor-default bg-white-light-active text-black-muted" />
                    </div>

                    <div>
                        <InputLabel htmlFor="student-gender">Jenis kelamin</InputLabel>
                        <select id="student-gender" value={form.gender} onChange={(event) => updateField('gender', event.target.value)} className="mt-1 h-11 w-full rounded-3xl border border-white-normal bg-white px-5 text-sm text-black-normal focus:border-blue-normal focus:ring-2 focus:ring-blue-normal/20">
                            <option value="">Pilih jenis kelamin</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                        <InputError message={errors.gender} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="student-condition">Kategori</InputLabel>
                        <select id="student-condition" value={form.condition} onChange={(event) => updateField('condition', event.target.value)} className="mt-1 h-11 w-full rounded-3xl border border-white-normal bg-white px-5 text-sm text-black-normal focus:border-blue-normal focus:ring-2 focus:ring-blue-normal/20">
                            <option value="">Pilih kategori</option>
                            <option>ASD (Autism Spectrum)</option>
                            <option>ADHD</option>
                            <option>Disleksia</option>
                            <option>Dispraksia &amp; Speech Delay</option>
                        </select>
                        <InputError message={errors.condition} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="student-parent-name">Nama orang tua</InputLabel>
                        <TextInput id="student-parent-name" value={form.parentName} onChange={(event) => updateField('parentName', event.target.value)} className="mt-1 h-11 w-full" autoComplete="off" />
                        <InputError message={errors.parentName} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="student-parent-phone">No. WhatsApp orang tua</InputLabel>
                        <TextInput id="student-parent-phone" type="tel" value={form.parentPhone} onChange={(event) => updateField('parentPhone', event.target.value.replace(/[^0-9+\- ]/g, '').slice(0, 20))} placeholder="08xxxxxxxxxx" className="mt-1 h-11 w-full" autoComplete="tel" inputMode="tel" />
                        <InputError message={errors.parentPhone} className="mt-1" />
                    </div>

                    <div>
                        <InputLabel htmlFor="student-status">Status emosi</InputLabel>
                        <select id="student-status" value={form.status} onChange={(event) => updateField('status', event.target.value)} className="mt-1 h-11 w-full rounded-3xl border border-white-normal bg-white px-5 text-sm text-black-normal focus:border-blue-normal focus:ring-2 focus:ring-blue-normal/20">
                            <option>Tenang &amp; Kooperatif</option>
                            <option>Perlu Regulasi Sensorik</option>
                            <option>Percaya Diri &amp; Aktif</option>
                            <option>Cemas Ringan</option>
                        </select>
                    </div>

                    <div className="sm:col-span-2">
                        <InputLabel htmlFor="student-insight">Catatan awal <span className="font-normal text-black-muted">(opsional)</span></InputLabel>
                        <textarea id="student-insight" value={form.insight} onChange={(event) => updateField('insight', event.target.value)} rows="3" className="mt-1 w-full rounded-2xl border border-white-normal bg-white px-5 py-3 text-sm text-black-normal outline-none focus:border-blue-normal focus:ring-2 focus:ring-blue-normal/20" placeholder="Tambahkan catatan singkat tentang siswa..." />
                    </div>
                </div>

                <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                    <button type="button" onClick={closeModal} className="h-11 rounded-full border border-white-normal px-5 text-sm font-semibold text-black-normal transition hover:bg-white-light-active focus:outline-none focus:ring-2 focus:ring-blue-normal/30">Batal</button>
                    <PrimaryButton type="submit" className="h-11 min-h-11 px-6">Simpan Siswa</PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}

// Data demo dashboard. Dipakai hanya oleh fitur Dashboard, jadi disimpan
// dekat halaman sesuai aturan penempatan data statis di AGENTS.md.

export const greeting = {
    fallbackGreeting: 'Selamat Pagi, Bu Anjani!',
    semester: 'Semester Ganjil',
    description:
        'Setiap langkah kecil adalah kemenangan besar bagi anak inklusi.',
};

export const stats = [
    {
        id: 'students',
        icon: 'academic',
        label: 'Total Siswa Binaan',
        value: '4 Siswa',
        detail: '2 ASD, 1 ADHD, 1 Disleksia',
    },
    {
        id: 'observation-needed',
        icon: 'pencil',
        label: 'Perlu Observasi',
        value: '0 Siswa',
        detail: 'Belum memiliki catatan hari ini',
    },
    {
        id: 'reports',
        icon: 'report',
        label: 'Laporan Siap Kirim',
        value: '2 Laporan',
        detail: 'Catatan observasi hari ini',
    },
];

export const students = [
    {
        id: 'rayhan',
        name: 'Rayhan Ardiansyah',
        className: 'Kelas 3B',
        condition: 'ASD (Autism Spectrum)',
        status: { label: 'Tenang & Kooperatif', tone: 'success' },
        metrics: [
            { label: 'Motorik Halus (Menulis)', value: '80%', percent: 80 },
            { label: 'Interaksi Sosial Peer-to-Peer', value: '65%', percent: 65 },
        ],
        note: 'Catatan sesi pagi telah disimpan',
        nisn: '123456'
    },
    {
        id: 'alika',
        name: 'Alika Putri',
        className: 'Kelas 2A',
        condition: 'ADHD',
        status: { label: 'Perlu Regulasi Sensorik', tone: 'warning' },
        metrics: [
            { label: 'Rentang Fokus Mandiri', value: '60%', percent: 60 },
            { label: 'Transisi Antar Pelajaran', value: '50%', percent: 50 },
        ],
        note: 'Jeda istirahat sensory gym diperlukan pukul 10:45',
        nisn: '654321'
    },
    {
        id: 'kenzo',
        name: 'Kenzo Mahendra',
        className: 'Kelas 4C',
        condition: 'Disleksia',
        status: { label: 'Percaya Diri & Aktif', tone: 'success' },
        metrics: [
            { label: 'Dekoding Kalimat Sederhana', value: '75%', percent: 75 },
            { label: 'Ketahanan Membaca Nyaring', value: '10mnt', percent: 54 },
        ],
        note: 'Berhasil menjawab salam guru vokal di depan kelas',
    },
    {
        id: 'nadira',
        name: 'Nadira Az-Zahra',
        className: 'Kelas 1I',
        condition: 'Dispraksia & Speech Delay',
        status: { label: 'Cemas Ringan', tone: 'warning' },
        metrics: [
            { label: 'Artikulasi Kata Kunci', value: '60%', percent: 60 },
            { label: 'Koordinasi Motorik Kasar', value: '70%', percent: 70 },
        ],
        note: 'Sesi evaluasi harian terjadwal pukul 13:00',
        nisn: '111111'
    },
];

export const aiRecommendation = {
    badge: 'Baru Saja',
    headline: 'Intervensi Sensorik Alika Putri',
    description:
        'Alika memperlihatkan peningkatan fidgeting motorik 25 menit sebelum jam istirahat. Disarankan memberikan deep-pressure lap pad atau ajak peregangan dinding 3 menit agar transisi makan siang tetap kondusif.',
    primaryAction: 'Terapkan Intervensi',
    secondaryAction: 'Tidak',
};

export const activities = [
    {
        id: 'rayhan-pagi',
        time: '09:45',
        student: 'Rayhan Ardiansyah',
        description:
            'Menyelesaikan tugas mewarnai pola geometri tanpa frustrasi saat pensil patah.',
    },
    {
        id: 'alika-transisi',
        time: '09:15',
        student: 'Alika Putri',
        description:
            'Tantrum ringan karena pergantian materi mendadak dari Matematika ke Tematik.',
    },
    {
        id: 'kenzo-salam',
        time: '08:30',
        student: 'Kenzo Mahendra',
        description:
            'Menjawab salam guru kelas secara vokal di depan kawan-kawan kelas 4C.',
    },
    {
        id: 'nadira-artikulasi',
        time: '08:15',
        student: 'Nadira Az-Zahra',
        description:
            'Mengikuti instruksi dua langkah saat sesi artikulasi kata kunci.',
    },
    {
        id: 'rayhan-persiapan',
        time: '08:00',
        student: 'Rayhan Ardiansyah',
        description:
            'Duduk tenang dan menyiapkan alat tulis sebelum pelajaran dimulai.',
    },
];

export const schedule = [
    {
        id: 'matematika-rayhan',
        title: 'Sesi Observasi Matematika (Rayhan)',
        status: 'Selesai',
        time: '08:00 - 09:30',
        location: 'Ruang Kelas 3D',
    },
    {
        id: 'iep-kenzo',
        title: 'Pertemuan Evaluasi IEP (Ortu Kenzo)',
        status: 'Selesai',
        time: '14:00',
        location: 'Ruang Kelas 3D',
    },
    {
        id: 'sensory-alika',
        title: 'Pendampingan Sensory Room (Alika)',
        status: 'Mendatang',
        time: '10:45 - 11:30',
        location: 'Ruang Sensorik',
    },
    {
        id: 'musik-nadira',
        title: 'Desensitisasi Suara Kelas Musik (Nadira)',
        status: 'Mendatang',
        time: '13:00 - 13:45',
        location: 'Lab Musik',
    },
];

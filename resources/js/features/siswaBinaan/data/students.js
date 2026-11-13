export const summaryStats = [
    { id: 'active', icon: 'academic', value: '4', label: 'Total Siswa Aktif' },
    { id: 'asd', icon: 'heart', value: '2', label: 'Spektrum ASD' },
    { id: 'adhd', icon: 'bolt', value: '1', label: 'ADHD Regulasi' },
    { id: 'speech', icon: 'speech', value: '1', label: 'Disleksia & Wicara' },
];

export const students = [
    {
        id: 'rayhan', name: 'Rayhan Ardiansyah', nisn: '2015091201', className: 'Kelas 3B', condition: 'ASD (Autism Spectrum)', age: '9 Tahun', status: { label: 'Tenang & Kooperatif', tone: 'success' },
        metrics: [{ label: 'Motorik Halus (Menulis)', value: '80%', percent: 80 }, { label: 'Interaksi Sosial Peer-to-Peer', value: '65%', percent: 65 }],
        insight: 'Transisi dari istirahat ke sesi matematika mandiri tanpa tantrum berkat kartu visual.',
    },
    {
        id: 'alika', name: 'Alika Putri', nisn: '2016082214', className: 'Kelas 2A', condition: 'ADHD', age: '8 Tahun', status: { label: 'Perlu Regulasi Sensorik', tone: 'warning' },
        metrics: [{ label: 'Rentang Fokus Mandiri', value: '60%', percent: 60 }, { label: 'Transisi Antar Pelajaran', value: '50%', percent: 50 }],
        insight: 'Membutuhkan jeda wobble cushion setiap 10 menit agar tidak berlari saat sesi membaca.',
    },
    {
        id: 'kenzo', name: 'Kenzo Mahendra', nisn: '2014110329', className: 'Kelas 4C', condition: 'Disleksia', age: '10 Tahun', status: { label: 'Percaya Diri & Aktif', tone: 'success' },
        metrics: [{ label: 'Dekoding Kalimat Sederhana', value: '75%', percent: 75 }, { label: 'Ketahanan Membaca Nyaring', value: '10mnt', percent: 54 }],
        insight: 'Menunjukkan antusiasme tinggi saat memadukan kartu morfem bergambar di papan magnetik.',
    },
    {
        id: 'nadira', name: 'Nadira Az-Zahra', nisn: '2014110329', className: 'Kelas 1', condition: 'Dispraksia & Speech Delay', age: '7 Tahun', status: { label: 'Cemas Ringan', tone: 'warning' },
        metrics: [{ label: 'Artikulasi Kata Kunci', value: '60%', percent: 60 }, { label: 'Koordinasi Motorik Kasar', value: '70%', percent: 70 }],
        insight: 'Bisa memasang headphone peredam bising sendiri saat musik senam berbunyi di lapangan.',
    },
];

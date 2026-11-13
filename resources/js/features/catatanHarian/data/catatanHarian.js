export const emotionOptions = [
    {
        id: 'calm',
        label: 'Tenang / Fokus',
        description: 'Siap menerima instruksi secara rileks',
        icon: 'meditation',
    },
    {
        id: 'happy',
        label: 'Sangat Senang',
        description: 'Antusias, ceria & siap menyapa rekan',
        icon: 'happy',
    },
    {
        id: 'restless',
        label: 'Gelisah / Sensitif',
        description: 'Perlu pendampingan & grounding dekat',
        icon: 'worried',
        gradient: true,
    },
    {
        id: 'overwhelmed',
        label: 'Overwhelmed / Cemas',
        description: 'Butuh sensorik break',
        icon: 'distraught',
        gradient: true,
    },
];

export const rubricScale = [
    { value: '4', label: 'Mandiri', description: 'Tanpa prompt' },
    { value: '3', label: 'Bantuan Min', description: 'Prompt gestur/verbal' },
    { value: '2', label: 'Bantuan Sedang', description: 'Modeling & verbal' },
    { value: '1', label: 'Bantuan Maks', description: 'Bimbingan fisik penuh' },
    { value: '0', label: 'Belum Tercapai', description: 'Menolak/resistensi' },
    { value: 'no', label: 'N/O', description: 'Tidak diamati' },
];

export const rubricCategories = [
    {
        id: 'A',
        title: 'Regulasi Emosi',
        description:
            'Kemampuan mengenali, mengekspresikan, dan menenangkan respon emosi',
        items: [
            {
                id: 'a1',
                title: 'Mengenal Emosi Diri',
                description:
                    'Mampu mengidentifikasi apa yang sedang dirasakan (senang, cemas, frustrasi).',
            },
            {
                id: 'a2',
                title: 'Mengekspresikan Emosi Secara Adaptif',
                description:
                    'Menyampaikan ketidaknyamanan tanpa perilaku agresif atau melukai diri.',
            },
            {
                id: 'a3',
                title: 'Mengelola Emosi / Regulasi Diri (Coping)',
                description:
                    'Menggunakan strategi sensorik/nafas dalam ketika mengalami sensory overload.',
            },
            {
                id: 'a4',
                title: 'Menyesuaikan Diri dengan Perubahan Jadwal / Rutinitas',
                description:
                    'Menerima pergantian mata pelajaran atau guru tanpa kecemasan ekstrem.',
            },
        ],
    },
    {
        id: 'B',
        title: 'Regulasi Perilaku',
        description:
            'Kepatuhan instruksi, atensi kerja, dan pengelolaan gerak motorik di kelas',
        items: [
            {
                id: 'b1',
                title: 'Mengikuti Instruksi Guru Kelas',
                description:
                    'Merespons instruksi klasikal yang diberikan guru wali kelas di depan.',
            },
            {
                id: 'b2',
                title: 'Mematuhi Aturan dan Kesepakatan Kelas',
                description:
                    'Duduk tenang, menunggu giliran bicara, dan menjaga batasan personal teman.',
            },
            {
                id: 'b3',
                title: 'Mempertahankan Atensi pada Aktivitas',
                description:
                    'Fokus pada lembar tugas sekurang-kurangnya 15–20 menit terarah.',
            },
            {
                id: 'b4',
                title: 'Transisi Antar Aktivitas Pembelajaran',
                description:
                    'Beralih dari sesi penjelasan klasikal ke penugasan lembar kerja mandiri.',
            },
        ],
    },
    {
        id: 'C',
        title: 'Kemandirian',
        description:
            'Menyiapkan alat belajar, aktivitas tanpa pengingat konstan, toilet & makan',
        items: [
            {
                id: 'c1',
                title: 'Menyiapkan Alat Belajar Sendiri',
                description:
                    'Menyiapkan buku, alat tulis, dan perlengkapan sesi tanpa diingatkan guru.',
            },
            {
                id: 'c2',
                title: 'Menjalankan Rutinitas Kelas Mandiri',
                description:
                    'Merapikan meja dan mengumpulkan tugas sesuai prosedur kelas.',
            },
            {
                id: 'c3',
                title: 'Kemandirian Toilet & Makan',
                description:
                    'Pergi ke toilet dan makan sendiri sesuai jadwal tanpa pendampingan penuh.',
            },
            {
                id: 'c4',
                title: 'Mengelola Waktu Belajar',
                description:
                    'Beralih ke tugas berikutnya saat waktu yang ditentukan habis.',
            },
        ],
    },
    {
        id: 'D',
        title: 'Komunikasi',
        description:
            'Menyatakan kebutuhan jelas, percakapan dua arah, merespons ajakan verbal',
        items: [
            {
                id: 'd1',
                title: 'Menyatakan Kebutuhan Secara Jelas',
                description:
                    'Mengungkapkan kebutuhan atau keinginan dengan kalimat yang dapat dipahami.',
            },
            {
                id: 'd2',
                title: 'Percakapan Dua Arah',
                description:
                    'Mendengarkan lawan bicara dan merespons sesuai topik.',
            },
            {
                id: 'd3',
                title: 'Merespons Ajakan Verbal',
                description:
                    'Menjawab ajakan atau pertanyaan guru dan teman secara verbal.',
            },
            {
                id: 'd4',
                title: 'Menggunakan Bahasa Sesuai Konteks',
                description:
                    'Memilih kata dan nada yang sopan sesuai situasi kelas.',
            },
        ],
    },
    {
        id: 'E',
        title: 'Interaksi Sosial',
        description:
            'Partisipasi kerja kelompok, giliran bicara (turn-taking), inisiasi interaksi kawan',
        items: [
            {
                id: 'e1',
                title: 'Partisipasi Kerja Kelompok',
                description:
                    'Mengambil peran aktif saat tugas kelompok berlangsung.',
            },
            {
                id: 'e2',
                title: 'Menunggu Giliran Bicara',
                description:
                    'Memberi kesempatan teman berbicara sebelum menyampaikan pendapat.',
            },
            {
                id: 'e3',
                title: 'Inisiasi Interaksi dengan Teman',
                description:
                    'Menyapa atau mengajak teman bermain/berdiskusi lebih dulu.',
            },
            {
                id: 'e4',
                title: 'Menjaga Batasan Personal',
                description:
                    'Menghormati ruang pribadi dan berbagi alat dengan teman.',
            },
        ],
    },
    {
        id: 'F',
        title: 'Perkembangan Akademik',
        description:
            'Pemahaman lembar kerja tematik, target durasi pengerjaan, penerapan materi baru',
        items: [
            {
                id: 'f1',
                title: 'Memahami Lembar Kerja Tematik',
                description:
                    'Membaca dan memahami instruksi tugas tematik dengan benar.',
            },
            {
                id: 'f2',
                title: 'Mencapai Target Durasi',
                description:
                    'Menyelesaikan tugas dalam rentang waktu yang ditetapkan.',
            },
            {
                id: 'f3',
                title: 'Menerapkan Materi Baru',
                description:
                    'Menggunakan konsep yang baru dipelajari pada tugas berikutnya.',
            },
            {
                id: 'f4',
                title: 'Peningkatan Hasil Belajar',
                description:
                    'Menunjukkan kemajuan dibanding sesi sebelumnya.',
            },
        ],
    },
];

export const qualitativeFields = [
    {
        id: 'activity',
        label: 'Aktivitas Pembelajaran yang Dijalankan',
        rows: 1,
    },
    {
        id: 'factual',
        label: 'Observasi Faktual & Perilaku Teramati',
        rows: 3,
    },
    {
        id: 'intervention',
        label: 'Bantuan & Intervensi Langsung yang Diberikan GPK',
        rows: 2,
    },
    {
        id: 'outcome',
        label: 'Hasil / Luaran Sesi Ini',
        rows: 2,
    },
    {
        id: 'followUp',
        label: 'Catatan Tambahan & Rencana Tindak Lanjut Sesi Berikutnya',
        rows: 2,
    },
];


const aiRecommendationVariants = [
    [
        {
            heading: 'Regulasi Diri & Fokus',
            body: 'Ananda {name} menunjukkan atensi terfokus yang sangat baik selama rentang 20 menit pada pengerjaan tugas spasial visual.',
        },
        {
            heading: 'Sensori & Adaptasi',
            body: 'Sensitivitas auditori muncul saat stimulus bel sekolah, teresolusi mandiri secara adaptif dengan headphone peredam bising selama 3 menit tanpa eskalasi perilaku.',
        },
    ],
    [
        {
            heading: 'Regulasi Diri & Fokus',
            body: 'Ananda {name} mempertahankan atensi selama sesi berlangsung dan mampu kembali fokus setelah jeda sensorik singkat.',
        },
        {
            heading: 'Interaksi Sosial',
            body: 'Ananda {name} merespons ajakan teman sebaya dengan kontak mata singkat dan mulai menggunakan kalimat pendek untuk meminta bantuan.',
        },
    ],
];

function getFirstName(student) {
    return student?.name?.trim().split(/\s+/)[0] ?? 'Ananda';
}

export function createInitialForm(student) {
    const firstName = getFirstName(student);

    return {
        date: '',
        startTime: '',
        endTime: '',
        subject: '',
        emotion: '',
        rubric: { },
        qualitative: { },
        notes: ``,
        strategy:
            '',
        parentReport: true,
        discussTeacher: false,
        files: [],
    };
}

export function countAnswered(category, answers = {}) {
    return category.items.filter((item) => Boolean(answers[item.id])).length;
}

export function getAiRecommendation(student, variantIndex = 0) {
    const firstName = getFirstName(student);
    const variant =
        aiRecommendationVariants[
            variantIndex % aiRecommendationVariants.length
        ];

    return variant.map((item) => ({
        heading: item.heading,
        body: item.body.replace('{name}', firstName),
    }));
}

export function formatFileSize(bytes) {
    if (bytes < 1024 * 1024) {
        return `${Math.max(1, Math.round(bytes / 1024))} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

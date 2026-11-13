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
        title: 'Emotional Regulation',
        description:
            'Kemampuan siswa mengenali, mengekspresikan, dan mengelola emosi serta menyesuaikan diri terhadap perubahan.',
        items: [
            {
                id: 'ER01',
                title: 'Pengenalan Emosi',
                description:
                    'Kemampuan siswa mengenali atau menunjukkan kondisi emosional yang sedang dialami melalui ucapan, ekspresi, gestur, atau media komunikasi alternatif.',
            },
            {
                id: 'ER02',
                title: 'Ekspresi Emosi',
                description:
                    'Kemampuan siswa menyampaikan perasaan, kebutuhan emosional, atau ketidaknyamanan dengan cara yang dapat dipahami orang lain.',
            },
            {
                id: 'ER03',
                title: 'Pengelolaan Emosi',
                description:
                    'Kemampuan siswa menggunakan strategi yang sesuai untuk mengelola respons emosional ketika menghadapi frustrasi, kecewa, takut, atau marah.',
            },
            {
                id: 'ER04',
                title: 'Adaptasi terhadap Perubahan',
                description:
                    'Kemampuan siswa menyesuaikan diri terhadap perubahan aktivitas, rutinitas, lingkungan, atau situasi yang tidak terduga.',
            },
        ],
    },
    {
        id: 'B',
        title: 'Behavioral Regulation',
        description:
            'Kemampuan siswa mengikuti instruksi, mematuhi aturan, mempertahankan keterlibatan, dan bertransisi antaraktivitas.',
        items: [
            {
                id: 'BR01',
                title: 'Mengikuti Instruksi',
                description:
                    'Kemampuan siswa memahami dan melaksanakan instruksi yang diberikan sesuai tingkat pemahaman dan kemampuannya.',
            },
            {
                id: 'BR02',
                title: 'Mengikuti Aturan dan Kesepakatan',
                description:
                    'Kemampuan siswa memahami serta mengikuti aturan atau kesepakatan dalam kegiatan pembelajaran dan lingkungan sekolah.',
            },
            {
                id: 'BR03',
                title: 'Mempertahankan Keterlibatan Aktivitas',
                description:
                    'Kemampuan siswa mempertahankan perhatian dan keterlibatan dalam suatu aktivitas sesuai target individual.',
            },
            {
                id: 'BR04',
                title: 'Transisi Aktivitas',
                description:
                    'Kemampuan siswa berpindah dari satu kegiatan ke kegiatan lain dengan tingkat bantuan tertentu.',
            },
        ],
    },
    {
        id: 'C',
        title: 'Independence',
        description:
            'Kemampuan siswa mengelola kebutuhan pribadi, melaksanakan aktivitas secara mandiri, dan menunjukkan inisiatif.',
        items: [
            {
                id: 'IN01',
                title: 'Persiapan Kebutuhan Pribadi',
                description:
                    'Kemampuan siswa menyiapkan, menggunakan, dan mengelola perlengkapan pribadi atau belajar sesuai kebutuhannya.',
            },
            {
                id: 'IN02',
                title: 'Pelaksanaan Aktivitas Mandiri',
                description:
                    'Kemampuan siswa memulai dan menyelesaikan aktivitas yang menjadi tanggung jawabnya.',
            },
            {
                id: 'IN03',
                title: 'Pengelolaan Kebutuhan Diri',
                description:
                    'Kemampuan siswa melakukan aktivitas perawatan diri sesuai usia, kondisi, dan target individual.',
            },
            {
                id: 'IN04',
                title: 'Inisiatif dan Meminta Bantuan',
                description:
                    'Kemampuan siswa memulai tindakan secara mandiri serta mengidentifikasi kapan bantuan orang lain diperlukan.',
            },
        ],
    },
    {
        id: 'D',
        title: 'Communication',
        description:
            'Kemampuan siswa menyampaikan kebutuhan, memahami informasi, memberikan respons, dan mengungkapkan pendapat.',
        items: [
            {
                id: 'CO01',
                title: 'Menyampaikan Kebutuhan',
                description:
                    'Kemampuan siswa mengomunikasikan kebutuhan, keinginan, atau ketidaknyamanan menggunakan metode komunikasi yang dimiliki.',
            },
            {
                id: 'CO02',
                title: 'Memahami Informasi',
                description:
                    'Kemampuan siswa menerima dan memahami informasi, instruksi, atau pesan dari orang lain.',
            },
            {
                id: 'CO03',
                title: 'Memberikan Respons Komunikasi',
                description:
                    'Kemampuan siswa memberikan respons yang relevan terhadap pertanyaan, pernyataan, atau ajakan komunikasi.',
            },
            {
                id: 'CO04',
                title: 'Mengungkapkan Pendapat dan Informasi',
                description:
                    'Kemampuan siswa menyampaikan gagasan, pengalaman, pilihan, atau informasi kepada orang lain.',
            },
        ],
    },
    {
        id: 'E',
        title: 'Social Interaction',
        description:
            'Kemampuan siswa memulai, merespons, dan mempertahankan interaksi sosial serta berpartisipasi dalam aktivitas bersama.',
        items: [
            {
                id: 'SI01',
                title: 'Memulai Interaksi Sosial',
                description:
                    'Kemampuan siswa menunjukkan inisiatif untuk memulai interaksi dengan teman, guru, atau orang lain.',
            },
            {
                id: 'SI02',
                title: 'Merespons Interaksi Sosial',
                description:
                    'Kemampuan siswa memberikan respons terhadap sapaan, ajakan, atau interaksi yang dimulai orang lain.',
            },
            {
                id: 'SI03',
                title: 'Partisipasi Aktivitas Sosial',
                description:
                    'Kemampuan siswa berpartisipasi dalam kegiatan bersama atau kelompok sesuai kemampuan dan preferensinya.',
            },
            {
                id: 'SI04',
                title: 'Interaksi Timbal Balik',
                description:
                    'Kemampuan siswa mempertahankan interaksi dua arah, seperti bergiliran, berbagi peran, dan memberikan respons secara bergantian.',
            },
        ],
    },
    {
        id: 'F',
        title: 'Academic Development',
        description:
            'Kemampuan siswa memahami materi, mengikuti instruksi akademik, menyelesaikan tugas, dan menerapkan pengetahuan.',
        items: [
            {
                id: 'AC01',
                title: 'Pemahaman Materi',
                description:
                    'Kemampuan siswa memahami konsep atau materi pembelajaran sesuai target akademik individual.',
            },
            {
                id: 'AC02',
                title: 'Pemahaman Instruksi Akademik',
                description:
                    'Kemampuan siswa memahami petunjuk dan tahapan pengerjaan tugas akademik.',
            },
            {
                id: 'AC03',
                title: 'Penyelesaian Tugas Akademik',
                description:
                    'Kemampuan siswa menyelesaikan tugas sesuai tingkat kemampuan dan target pembelajaran individual.',
            },
            {
                id: 'AC04',
                title: 'Penerapan Pengetahuan',
                description:
                    'Kemampuan siswa menerapkan pengetahuan atau keterampilan yang telah dipelajari dalam aktivitas atau situasi yang relevan.',
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

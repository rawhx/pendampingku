export const activityOptions = [
    'Pembelajaran Tematik di Kelas',
    'Sesi Terapi Wicara',
    'Aktivitas Motorik & Sensorik',
    'Istirahat / Sensory Break',
];

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

export const behaviorTags = [
    { id: 'focus', label: 'Fokus Belajar Mandiri' },
    { id: 'social', label: 'Interaksi Sosial Aktif' },
    { id: 'instruction', label: 'Mengikuti Instruksi' },
    { id: 'noise', label: 'Sensitif Terhadap Kelas Bising' },
    { id: 'verbal', label: 'Minta Bantuan Verbal' },
    { id: 'transition', label: 'Transisi Mulus Antar Sesi' },
];

export const defaultBehaviorTagIds = ['noise', 'verbal', 'transition'];

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
        date: '2026-10-28',
        startTime: '08:30',
        endTime: '10:15',
        activity: activityOptions[0],
        emotion: 'happy',
        behaviorTags: [...defaultBehaviorTagIds],
        notes: `${firstName} dapat mengikuti instruksi guru kelas saat sesi mewarnai peta Indonesia selama 20 menit tanpa resistensi. Sempat menunjukkan gestur menutup telinga saat bel pergantian jam berbunyi, namun kembali stabil setelah menggunakan noise-cancelling headphone selama 3 menit.`,
        strategy:
            'Pemberian kartu visual timer 5 menit sebelum transisi dan headphone peredam bising saat bel sekolah berbunyi.',
        parentReport: true,
        discussTeacher: false,
    };
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

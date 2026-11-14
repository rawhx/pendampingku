import { motion } from 'motion/react';

// easing halus, sama dengan section lain
const EASE = [0.16, 1, 0.3, 1];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.14, delayChildren: 0.05 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.9, ease: EASE },
    },
};

const steps = [
    {
        title: 'Observasi & Catat di Kelas',
        description:
            'Buka aplikasi lewat smartphone atau laptop. Pilih nama murid, klik parameter perilaku (misal "Fokus 20 menit", "Reaksi suara: Tenang"), selesai dalam 2 menit.',
        position: '',
    },
    {
        title: 'AI Mensintesis Narasi Laporan',
        description:
            'Tekan "Buat Draf Laporan". Algoritma pedagogis mengolah puluhan catatan mentah menjadi paragraf evaluasi ilmiah, penuh apresiasi, dan objektif.',
        position: 'md:relative md:-top-8 lg:-top-16',
    },
    {
        title: 'Bagikan & Sinkronkan 1 Klik',
        description:
            'Ekspor dokumen PDF resmi berkop surat sekolah untuk Kepala Sekolah atau kirimkan notifikasi ringkasan langsung ke aplikasi wali murid secara instan.',
        position: '',
    },
];

export default function WorkflowSection() {
    return (
        <section
            id="alur-kerja"
            className="relative flex min-h-0 flex-col items-center overflow-hidden px-4 py-14 sm:px-6 sm:py-20 md:min-h-screen scroll-mt-0"
        >
            <motion.div
                className="w-full"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-100px' }}
            >
                <div className="mb-9 text-center sm:mb-25">
                    <motion.h2
                        variants={itemVariants}
                        className="mb-4 text-balance text-2xl font-bold leading-tight tracking-tight text-black-normal sm:mb-5 sm:text-3xl md:text-3xl lg:text-4xl"
                    >
                        Alur Kerja Cepat & Intuitif
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="mx-auto max-w-3xl text-sm leading-relaxed text-black-dark-hover sm:text-base"
                    >
                        Dirancang seringan mungkin agar Anda dapat mencatat di
                        sela aktivitas tanpa mengalihkan pandangan dari ananda
                        binaan.
                    </motion.p>
                </div>

                <div className="relative mx-auto flex w-full max-w-[calc(100%-0.5rem)] flex-col gap-4 px-0 sm:max-w-[90%] sm:gap-6 sm:px-6 md:max-w-[60%] md:flex-row md:items-start md:gap-4 lg:px-0">
                    {steps.map((step) => (
                        <motion.div
                            key={step.title}
                            variants={itemVariants}
                            className={`flex-1 rounded-3xl border border-white/40 bg-white/10 p-5 text-center shadow-2xl shadow-blue-normal/10 backdrop-blur-xl sm:p-5 md:p-4 lg:p-6 xl:p-7 ${step.position}`}
                        >
                            <h6 className="mb-1.5 text-base font-semibold text-blue-normal sm:text-lg md:text-base lg:text-lg xl:text-xl">
                                {step.title}
                            </h6>
                            <p className="text-xs text-black-dark-hover text-justify sm:text-sm md:text-xs lg:text-sm">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}

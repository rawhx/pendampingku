import { motion, MotionConfig } from 'motion/react';
import macStudio from '@/assets/images/landing/macStudio.png';

const EASE = [0.16, 1, 0.3, 1];

const fade = (delay, duration) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { delay, duration, ease: 'easeInOut' },
});

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

const imageVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 1.1, ease: EASE },
    },
};

const makeCardVariants = (side) => ({
    hidden: { opacity: 0, x: side === 'left' ? -16 : 16 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.9, ease: EASE },
    },
});

const features = [
    {
        title: 'Catatan Observasi Harian Cepat',
        description:
            'Catat emosi, pemicu sensorik, dan intervensi cukup pilih tag tanpa perlu mengetik panjang.',
        side: 'left',
        tone: 'bg-blue-light',
        titleColor: 'text-black-normal',
        textColor: 'text-black-dark-hover',
        position: 'md:-left-6 md:top-[6%] lg:-left-16 xl:-left-24',
    },
    {
        title: 'AI Report Writer',
        description:
            'Ubah poin harian jadi laporan naratif empatik secara otomatis sesuai standar kurikulum.',
        side: 'right',
        tone: 'bg-blue-normal/75',
        titleColor: 'text-white',
        textColor: 'text-white',
        position: 'md:-right-6 md:top-[2%] lg:-right-16 xl:-right-24',
    },
    {
        title: 'Portal Guru & Orang Tua',
        description:
            'Kirim rekap harian ke orang tua secara aman agar pendampingan sekolah dan rumah selalu selaras.',
        side: 'left',
        tone: 'bg-blue-dark/60',
        titleColor: 'text-white',
        textColor: 'text-white',
        position: 'md:-left-6 md:top-[72%] lg:-left-16 xl:-left-24',
    },
    {
        title: 'Grafik Perkembangan IEP',
        description:
            'Pantau kemajuan emosi, fokus, dan kemandirian anak secara visual untuk evaluasi target IEP.',
        side: 'right',
        tone: 'bg-blue-dark-hover/60',
        titleColor: 'text-white',
        textColor: 'text-white',
        position: 'md:-right-6 md:top-[88%] lg:-right-16 xl:-right-24',
    },
];

export default function FeatureSection() {
    return (
        <MotionConfig reducedMotion="user">
            <section
                id="fitur"
                className="relative flex min-h-0 items-center justify-center overflow-hidden px-4 py-14 sm:px-6 sm:py-20 md:min-h-screen scroll-mt-0"
            >
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                >
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.8, delay: 0.2, ease: 'easeOut' }}
                        className="absolute -left-40 top-1/2 h-90 w-90 rounded-full bg-blue-normal/65 blur-[80px] sm:h-80 sm:w-80"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.8, delay: 0.5, ease: 'easeOut' }}
                        className="absolute -right-40 bottom-1/4 h-90 w-90 rounded-full bg-blue-normal/65 blur-[80px] sm:h-96 sm:w-96"
                    />
                </div>

                <motion.div
                    className="mx-auto w-full max-w-[90%] px-4 sm:px-6 md:max-w-[660px] lg:max-w-[820px] lg:px-0 xl:max-w-[900px] 2xl:max-w-[980px]"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    <div className="mb-9 text-center sm:mb-16">
                        <motion.h2
                            variants={itemVariants}
                            className="mb-4 text-balance text-2xl font-bold leading-tight tracking-tight text-black-normal sm:mb-5 sm:text-3xl md:text-3xl lg:text-4xl"
                        >
                            Semua yang Dibutuhkan Guru Pendamping Khusus
                            <br className="hidden sm:block" />
                            dalam Satu Ekosistem
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="mx-auto text-sm leading-relaxed text-black-dark-hover sm:text-base"
                        >
                            Dibuat bersama praktisi pendidikan khusus, psikolog
                            anak, dan guru sekolah inklusi terkemuka di
                            Indonesia.
                        </motion.p>
                    </div>

                    <div className="relative mx-auto w-full max-w-2xl py-10 sm:max-w-3xl sm:py-14 md:max-w-[640px] md:py-16 lg:max-w-[780px]">
                        <motion.img
                            variants={imageVariants}
                            src={macStudio}
                            alt="Mac Studio"
                            className="w-full rounded-xl"
                        />

                        {features.map((feature) => (
                            <motion.div
                                key={feature.title}
                                variants={makeCardVariants(feature.side)}
                                className={`mx-auto mt-3 flex w-full max-w-[calc(100%-0.5rem)] flex-col items-center justify-center rounded-xl px-3 py-2.5 text-center sm:max-w-[90%] sm:px-3 md:absolute md:mt-0 md:max-w-[170px] lg:max-w-[200px] xl:max-w-[320px] ${feature.tone} ${feature.position}`}
                            >
                                <h6
                                    className={`mb-0.5 text-xs font-semibold sm:text-xs md:text-xs lg:text-sm ${feature.titleColor}`}
                                >
                                    {feature.title}
                                </h6>
                                <p
                                    className={`w-full max-w-full text-xs leading-snug sm:text-xs md:text-xs lg:text-sm ${feature.textColor}`}
                                >
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>
        </MotionConfig>
    );
}

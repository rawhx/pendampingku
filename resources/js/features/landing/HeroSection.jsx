import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

const containerClass =
    'mx-auto w-full max-w-[90%] px-4 sm:px-6 md:max-w-[720px] lg:max-w-[880px] lg:px-0 xl:max-w-[1080px] 2xl:max-w-[1120px]';

const highlights = [
    {
        title: '1-Click Quick Notes',
        description:
            'Catat pemicu emosi, fokus, dan intervensi hanya dalam 2 menit langsung dari gawai.',
    },
    {
        title: 'Asisten AI Pedagogis',
        description:
            'Draf narasi standar kurikulum inklusi selesai instan tanpa bias, siap disunting dan dicetak.',
    },
    {
        title: 'Portal Orang Tua Tersinkronisasi',
        description:
            'Ayah dan Ibu menerima ringkasan hangat harian, menjaga kesinambungan terapi di rumah.',
    },
    {
        title: 'Grafik Milestone Otomatis',
        description:
            'Data perilaku terkonversi menjadi grafik objektif untuk rapat IEP bersama terapis.',
    },
];

// Animasi bagian bawah: hanya fade, muncul bergantian saat terlihat
const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const fadeVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 1, ease: 'easeInOut' },
    },
};

function CheckIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="mt-0.5 h-6 w-6 shrink-0 text-blue-normal"
        >
            <circle cx="12" cy="12" r="12" fill="currentColor" />
            <path
                d="M7 12.5l3.2 3.2L17 8.9"
                fill="none"
                stroke="white"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function HeroSection() {
    const shouldReduceMotion = useReducedMotion();
    const heroRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    const leftBlobY = useTransform(scrollYProgress, [0, 1], [0, 130]);
    const rightBlobY = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const topBlobY = useTransform(scrollYProgress, [0, 1], [0, 80]);

    // Semua elemen hanya fade (tanpa blur / gerak) dan muncul bergantian
    const fade = (delay, duration) => ({
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: {
            delay,
            duration: shouldReduceMotion ? 0.3 : duration,
            ease: 'easeInOut',
        },
    });

    return (
        <section ref={heroRef} id="beranda" className="relative overflow-hidden px-4 sm:px-6">
            {/* Layar pertama: judul + deskripsi + blob (posisi blob tidak berubah) */}
            <div className="relative flex min-h-[82svh] items-center justify-center md:min-h-screen">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                >
                    <motion.div
                        {...fade(0.5, 2)}
                        style={shouldReduceMotion ? undefined : { y: leftBlobY }}
                        className="absolute -left-50 bottom-40 h-80 w-80 rounded-full bg-blue-normal blur-[120px]"
                    />
                    <motion.div
                        {...fade(1, 2)}
                        style={shouldReduceMotion ? undefined : { y: rightBlobY }}
                        className="absolute -right-50 top-100 h-80 w-80 -translate-y-1/2 rounded-full bg-blue-normal/60 blur-[120px]"
                    />
                    <motion.div
                        {...fade(0, 2)}
                        style={shouldReduceMotion ? undefined : { y: topBlobY }}
                        className="absolute -top-50 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-light blur-[100px]"
                    />
                </div>

                <div className={`${containerClass} pb-8 text-center sm:pb-10`}>
                <motion.h1
                    {...fade(0.8, 1.4)}
                    className="text-balance text-[1.75rem] font-bold leading-tight tracking-tight sm:text-3xl md:text-3xl lg:text-4xl"
                >
                        Kurangi Beban Administrasi, Maksimalkan Pendampingan
                        Penuh Kasih untuk Anak Hebat
                    </motion.h1>
                <motion.p
                    {...fade(1.6, 1.4)}
                    className="mx-auto mt-5 max-w-4xl text-pretty text-sm leading-relaxed text-black-dark-hover sm:mt-6 sm:text-base"
                >
                        Platform cerdas berbasis AI untuk mencatat observasi
                        harian, memantau grafik perkembangan perilaku, dan
                        menyusun laporan IEP resmi dalam hitungan
                        menit-terhubung langsung dengan orang tua.
                    </motion.p>
                </div>
            </div>

            {/* Fitur ringkas + kepercayaan & keamanan */}
            <div className={`${containerClass} relative pb-14 sm:pb-24`}>
                <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-16">
                    <motion.div
                        variants={listVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        className="rounded-3xl bg-white p-5 shadow-[0_0_28px_0_rgba(0,129,242,0.16)] sm:p-8"
                    >
                        <ul className="flex flex-col gap-5">
                            {highlights.map((item) => (
                                <motion.li
                                    key={item.title}
                                    variants={fadeVariants}
                                    className="flex gap-3"
                                >
                                    <CheckIcon />
                                    <div>
                                        <h3 className="text-lg font-semibold text-black-normal">
                                            {item.title}
                                        </h3>
                                        <p className="mt-1 text-justify text-sm leading-relaxed text-black-dark-hover">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        variants={listVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        className="flex flex-col gap-6"
                    >
                        <motion.h3
                            variants={fadeVariants}
                            className="text-balance text-xl font-semibold text-black-normal sm:text-2xl"
                        >
                            Kepercayaan &amp; Keamanan Ekosistem Pendampingku
                        </motion.h3>
                        <motion.p
                            variants={fadeVariants}
                            className="text-justify text-sm leading-relaxed text-black-dark-hover"
                        >
                            Keamanan data anak serta kenyamanan orang tua dan
                            pendamping adalah prioritas utama kami.
                            Pendampingku membantu memastikan setiap proses
                            pembelajaran berjalan lebih terarah melalui
                            pendampingan terverifikasi, komunikasi yang
                            terbuka, dan rekam perkembangan yang terdokumentasi
                            secara transparan.
                        </motion.p>
                        <motion.blockquote
                            variants={fadeVariants}
                            className="text-justify text-sm font-semibold leading-relaxed text-blue-normal"
                        >
                            “Pendampingku bukan sekadar membantu administrasi
                            guru, tetapi juga menghadirkan rasa aman bagi orang
                            tua melalui proses pendampingan anak yang
                            transparan, terpantau, dan terpercaya.”
                        </motion.blockquote>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

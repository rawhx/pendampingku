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

// CONTOH ISI — ganti dengan testimoni asli
const reviews = [
    {
        quote: 'Sebagai orang tua, saya jadi tahu perkembangan anak setiap hari. Rekap yang dikirim guru sangat membantu kami melanjutkan pendampingan di rumah.',
        name: 'Agung',
        role: 'Orang Tua Murid',
    },
    {
        quote: 'Platform ini membantu saya mendokumentasikan perkembangan anak secara empatik dan terarah, tanpa menyita waktu mendampingi.',
        name: 'Anjani',
        role: 'Orang Tua Murid',
    },
    {
        quote: 'Bikin laporan IEP yang dulu butuh semalam, kini cuma 15 menit!',
        name: 'Rico',
        role: 'Guru Pendamping',
    },
];

// Jumlah salinan daftar di dalam track. Track digeser sejauh satu salinan
// (100% / COPIES) lalu diulang, sehingga geraknya tak terputus.
// Naikkan jika kartunya sedikit dan layar sangat lebar.
const COPIES = 4;
const SLIDE_DURATION = 40; // detik per satu putaran

function Stars() {
    return (
        <div
            className="flex gap-0.5 text-xl text-yellow-normal"
            aria-label="Rating 5 dari 5"
        >
            {'★★★★★'.split('').map((star, index) => (
                <span key={index} aria-hidden="true">
                    {star}
                </span>
            ))}
        </div>
    );
}

function ReviewCard({ review }) {
    return (
        <figure className="flex w-[min(82vw,20rem)] shrink-0 flex-col rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-md sm:w-100">
            <div className="flex items-center gap-2">
                <Stars />
                <span className="text-xs text-white">Assesmen akurat</span>
            </div>
            <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-white">
                “{review.quote}”
            </blockquote>
            <figcaption className="mt-4 flex items-center gap-3 border-t border-white/20 pt-4">
                <span
                    aria-hidden="true"
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-sm font-semibold text-blue-normal"
                >
                    {review.name.charAt(0)}
                </span>
                <span className="flex flex-col text-left">
                    <span className="text-sm font-semibold text-white">
                        {review.name}
                    </span>
                    <span className="text-xs text-white/70">{review.role}</span>
                </span>
            </figcaption>
        </figure>
    );
}

export default function ReviewSection() {
    return (
        <section
            id="testimoni"
            style={{
                '--dome': 'clamp(80px, 9vw, 180px)',
                paddingTop: 'calc(var(--dome) + 4rem)',
            }}
            // overflow-x-clip (bukan overflow-hidden): memotong lebar elips yang
            // melebihi layar, tapi shadow di atas lengkungan tetap terlihat
            className="relative overflow-x-clip pb-16 scroll-mt-[-130px] sm:pb-28"
        >
            {/* animasi slide: dipause saat di-hover, mati jika reduced motion */}
            <style>{`
                @keyframes review-slide {
                    from { transform: translateX(0); }
                    to { transform: translateX(-${100 / COPIES}%); }
                }
                .review-track { animation: review-slide ${SLIDE_DURATION}s linear infinite; }
                .review-track:hover { animation-play-state: paused; }
                @media (prefers-reduced-motion: reduce) {
                    .review-track { animation: none; }
                }
            `}</style>

            {/* Lengkungan atas: elips lebih lebar dari layar, hanya separuh atasnya yang tampak */}
            <div
                aria-hidden="true"
                style={{ height: 'calc(var(--dome) * 2)' }}
                className="absolute left-1/2 top-0 w-[130%] -translate-x-1/2 rounded-[50%] bg-blue-normal shadow-[0_-12px_60px_0_rgba(0,129,242,0.45)]"
            />
            {/* Badan section: penuh biru sampai bawah */}
            <div
                aria-hidden="true"
                style={{ top: 'var(--dome)' }}
                className="absolute inset-x-0 bottom-0 bg-blue-normal"
            />

            <motion.div
                className="relative"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
            >
                <div className="mx-auto mb-12 max-w-3xl px-4 text-center sm:px-6">
                    <motion.h2
                        variants={itemVariants}
                        className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-4xl"
                    >
                        Testimoni
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="px-2 text-sm leading-relaxed text-white/80 sm:px-0 sm:text-base"
                    >
                        Dipercaya oleh Guru Berdedikasi dan Orang Tua yang Peduli
                    </motion.p>
                </div>

                {/* Slide full lebar layar, tepi kiri-kanan memudar */}
                <motion.div
                    variants={itemVariants}
                    className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
                >
                    <div className="review-track flex w-max">
                        {Array.from({ length: COPIES }).map((_, copyIndex) => (
                            <div
                                key={copyIndex}
                                // salinan selain yang pertama disembunyikan dari screen reader
                                aria-hidden={copyIndex > 0 ? 'true' : undefined}
                                className="flex shrink-0 gap-4 pr-4"
                            >
                                {reviews.map((review) => (
                                    <ReviewCard
                                        key={`${copyIndex}-${review.name}`}
                                        review={review}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}

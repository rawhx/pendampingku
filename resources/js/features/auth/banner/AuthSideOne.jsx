import React from 'react';
import karinaAvatar from '@/assets/images/auth/karina.png';

export default function AuthSideOne({ className = '' }) {
    return (
        <div className={`w-full max-w-[492px] text-white flex flex-col select-none ${className}`}>
            {/* Title / Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold leading-[1.2] tracking-tight">
                Mendampingi Setiap Langkah Istimewa Mereka Menuju Kemandirian
            </h2>

            {/* Subtitle */}
            <p className="mt-3.5 text-sm sm:text-[15px] leading-relaxed text-white/85 font-normal">
                Satu portal terpadu untuk Guru Pendamping Khusus (GPK), terapis, dan orang tua dalam memantau setiap potensi terbaik anak berkebutuhan khusus.
            </p>

            {/* Testimonial Card (Glassmorphism) */}
            <div className="mt-7 sm:mt-8 w-full rounded-[24px] border border-white/20 bg-white/10 p-6 backdrop-blur-md shadow-lg shadow-black/5">
                {/* 5 Stars Rating & Tag */}
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-yellow-normal">
                        {[...Array(5)].map((_, index) => (
                            <svg
                                key={index}
                                className="h-4 w-4 fill-current drop-shadow-sm"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-sm font-medium text-white ml-1">
                        Assesmen akurat
                    </span>
                </div>

                {/* Quote Text */}
                <blockquote className="mt-3.5 text-sm sm:text-[14.5px] font-normal leading-relaxed text-white/95">
                    "Platform ini merubah cara kami mendokumentasikan pencapaian anak inklusi secara empatik dan terukur."
                </blockquote>

                {/* Divider Line */}
                <div className="my-4 h-px w-full bg-white/20" />

                {/* Author Info */}
                <div className="flex items-center gap-3.5">
                    <img
                        src={karinaAvatar}
                        alt="Karina"
                        className="h-14 w-14 rounded-full object-cover ring-2 ring-white/30 bg-white flex-shrink-0"
                    />
                    <div className="flex flex-col min-w-0">
                        <span className="text-base font-semibold text-white leading-tight">
                            Karina
                        </span>
                        <span className="mt-1 text-xs sm:text-[13px] text-white/80 leading-tight">
                            Psikolog Anak & Konsultan Sekolah Inklusi
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

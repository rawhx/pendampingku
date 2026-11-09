import React from 'react';
import spiral from '@/assets/images/auth/spiral.png';
import avatar1 from '@/assets/images/auth/avatar.png';
import avatar2Img from '@/assets/images/auth/avatar2.png';
import avatar3Img from '@/assets/images/auth/avatar3.png';
import avatar4Img from '@/assets/images/auth/avatar4.png';
import avatar5Img from '@/assets/images/auth/avatar5.png';

function Avatar({ src, alt, className = '', ...props }) {
    return (
        <img
            src={src}
            alt={alt}
            className={`absolute rounded-full object-cover ring-2 ring-white/30 bg-white flex-shrink-0 ${className}`}
            {...props}
        />
    );
}

export default function AuthSideTwo({ className = '' }) {
    return (
        <div className={`w-full max-w-[492px] text-white flex flex-col select-none ${className}`}>
            <div className="relative mx-auto w-full max-w-[240px] sm:max-w-[300px] md:max-w-[360px] lg:max-w-[400px] xl:max-w-[460px]">
                <img
                    src={spiral}
                    alt="Radar Tumbuh Kembang Anak"
                    className="w-full h-auto object-contain"
                    draggable={false}
                />

                <Avatar src={avatar1} alt="User avatar" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14" />
                <Avatar src={avatar2Img} alt="User avatar" className="top-[26%] left-[32%] -translate-x-1/2 -translate-y-1/2 h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12" />
                <Avatar src={avatar3Img} alt="User avatar" className="top-[48%] left-[76%] -translate-x-1/2 -translate-y-1/2 h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12" />
                <Avatar src={avatar4Img} alt="User avatar" className="top-[70%] left-[56%] -translate-x-1/2 -translate-y-1/2 h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12" />
                <Avatar src={avatar5Img} alt="User avatar" className="top-[63%] left-[20%] -translate-x-1/2 -translate-y-1/2 h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12" />
            </div>

            {/* Category Label */}
            <p className="mt-3 sm:mt-4 md:mt-5 text-xs sm:text-sm md:text-[15px] font-medium leading-relaxed text-white/90">
                Tumbuh Kembang
            </p>

            {/* Title / Headline */}
            <h2 className="mt-1.5 text-lg sm:text-xl md:text-2xl lg:text-[28px] font-medium leading-[1.2] tracking-tight text-white">
                Mengenal Setiap Langkah Kecil dan Potensi Unik Mereka
            </h2>
        </div>
    );
}

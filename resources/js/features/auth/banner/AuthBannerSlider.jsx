import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import AuthSideOne from './AuthSideOne';
import AuthSideTwo from './AuthSideTwo';
import AuthSideThree from './AuthSideThree';
import BrandMark from '@/components/ui/BrandMark';
import { appName } from '@/constants/app';

export default function AuthBannerSlider({ autoPlayInterval = 5000 }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const touchStartX = useRef(null);

    const slides = [
        <AuthSideOne />,
        <AuthSideTwo />,
        <AuthSideThree />
    ];

    // Auto-advance timer
    useEffect(() => {
        if (isPaused) return;

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, autoPlayInterval);

        return () => clearInterval(timer);
    }, [isPaused, autoPlayInterval, slides.length]);

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const diffX = touchStartX.current - e.changedTouches[0].clientX;
        if (diffX > 50) {
            nextSlide();
        } else if (diffX < -50) {
            prevSlide();
        }
        touchStartX.current = null;
    };

    return (
        <aside
            className="btn-gradient-primary relative hidden lg:flex flex-col justify-between w-full lg:w-[53%] xl:w-[55%] min-h-screen p-8 xl:p-12 overflow-hidden select-none"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <motion.div
                className="pointer-events-none absolute -left-32 top-1/4 h-[350px] w-[350px] rounded-full opacity-40 blur-[90px]"
                style={{ backgroundColor: 'var(--color-blue-dark-hover)' }}
                animate={{
                    x: [0, 20, 0],
                    y: [0, -30, 0],
                    scale: [1, 1.08, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
            <motion.div
                className="pointer-events-none absolute -right-24 bottom-10 h-[380px] w-[380px] rounded-full opacity-45 blur-[100px]"
                style={{ backgroundColor: 'var(--color-blue-light-active)' }}
                animate={{
                    x: [0, -25, 0],
                    y: [0, 15, 0],
                    scale: [1, 1.06, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 2,
                }}
            />

            <div className="relative z-10 flex items-center gap-3">
                <BrandMark className="h-11 w-11 rounded-2xl" iconClassName="h-6 w-6" />
                <div className="flex flex-col">
                    <span className="text-xl font-bold tracking-tight text-white drop-shadow-sm">
                        {appName}
                    </span>
                    <span className="text-xs font-medium text-white/80 tracking-wide">
                        SI JAYA JAYA
                    </span>
                </div>
            </div>

            {/* Center Carousel Slider Area */}
            <div className="relative my-auto w-full flex flex-col items-center justify-center py-4">
                <div className="w-full flex justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 40 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -40 }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                            className="w-full flex justify-center"
                        >
                            {slides[currentSlide]}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Pagination Indicators / Dots */}
                <div className="mt-6 flex items-center justify-center gap-2">
                    {slides.map((_, index) => {
                        const isActive = currentSlide === index;
                        return (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                aria-label={`Pindah ke banner ${index + 1}`}
                                type="button"
                                className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                                    isActive
                                        ? 'w-8 bg-white shadow-sm'
                                        : 'w-2.5 bg-white/40 hover:bg-white/60'
                                }`}
                            />
                        );
                    })}
                </div>
            </div>
        </aside>
    );
}

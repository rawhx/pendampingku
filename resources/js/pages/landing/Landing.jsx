import GuestLayout from '@/layouts/GuestLayout';
import { useEffect } from 'react';
import HeroSection from '@/features/landing/HeroSection';
import FeatureSection from '@/features/landing/FeatureSection';
import WorkflowSection from '@/features/landing/WorkflowSection';
import ReviewSection from '@/features/landing/ReviewSection';

export default function LandingPage({ canLogin, canRegister }) {
    useEffect(() => {
        history.replaceState(null, '', window.location.pathname);
    }, []);

    return (
        <GuestLayout canLogin={canLogin} canRegister={canRegister} isLanding={true} className="bg-white-light-hover">
            <HeroSection />

            <FeatureSection />

            <div className="mx-auto w-full max-w-[90%] px-4 sm:px-6 md:max-w-[660px] lg:max-w-[820px] lg:px-0 xl:max-w-[900px] 2xl:max-w-[980px]">
                <div className="h-1 rounded-full bg-black-light" />
            </div>

            <WorkflowSection />

            <ReviewSection />
        </GuestLayout>
    );
}

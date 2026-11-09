import AuthBannerSlider from '@/features/auth/banner/AuthBannerSlider';

export default function AuthLayout({ children }) {
    return (
        <div className="flex min-h-screen w-full bg-white-light-hover">
            <AuthBannerSlider />

            <main className="flex flex-1 flex-col justify-center items-center px-6 py-12 lg:px-12 xl:px-16 bg-white-light-hover">
                {children}
            </main>
        </div>
    );
}

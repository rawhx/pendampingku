import Navbar from '@/components/common/navbar/Navbar';
import Footer from '@/components/common/Footer';

export default function GuestLayout({ children, canLogin, canRegister, isLanding = false, ...props }) {
    return (
        <div className={`flex min-h-screen flex-col ${props.className || ''}`}>
            <Navbar isLanding={isLanding} canLogin={canLogin} canRegister={canRegister} />
            <main className={isLanding ? 'flex-grow' : 'flex-grow flex flex-col items-center sm:justify-center sm:pt-0'}>
                {isLanding ? children : (
                    <div className="w-full overflow-hidden px-6 py-4 sm:max-w-md sm:rounded-lg px-25">
                        {children}
                    </div>
                )}
            </main>
            <Footer isLanding={isLanding} />
        </div>
    );
}

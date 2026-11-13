import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import landingNavigation from '@/data/navigation/landing.json';
import dashboardNavigation from '@/data/navigation/dashboard.json';
import useActiveSection from './useActiveSection.jsx';
import NavbarLogo from './NavbarLogo.jsx';
import NavbarLinks from './NavbarLinks.jsx';
import NavbarActions from './NavbarActions.jsx';
import NavbarMobileMenu, { MobileMenuToggle } from './NavbarMobileMenu.jsx';

export default function Navbar({ isLanding = false, isDashboard = false, canLogin, canRegister }) {
    const { auth } = usePage().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigation = isDashboard ? dashboardNavigation : landingNavigation;
    const hasLinks = isLanding || isDashboard;

    const [activeHash, setActiveHash] = useActiveSection(navigation, hasLinks && !isDashboard);
    const onBlue = isLanding && activeHash === '#testimoni';
    const activeRoute = (() => {
        if (!isDashboard) return null;

        try {
            return route().current();
        } catch {
            return null;
        }
    })();

    return (
            <nav className="fixed inset-x-0 top-4 z-50 mx-auto max-w-7xl">
            <div className="rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-md shadow-lg shadow-black/5">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex min-w-0 h-16 items-center justify-between gap-3">
                        <NavbarLogo isDashboard={isDashboard} onBlue={onBlue} />

                        {/* <div className="flex items-center gap-3"> */}
                            {hasLinks && (
                                <div className="hidden min-w-0 flex-1 items-center justify-center gap-3 lg:flex xl:gap-5">
                                    <NavbarLinks
                                        items={navigation.map((item) => ({
                                            ...item,
                                            onSelect: () => setActiveHash(item.href),
                                        }))}
                                        activeHash={activeHash}
                                        activeRoute={activeRoute}
                                        onBlue={onBlue}
                                    />
                                </div>
                            )}

                            <NavbarActions
                                isLanding={isLanding}
                                    auth={auth}
                                isDashboard={isDashboard}
                                onBlue={onBlue}
                                canLogin={canLogin}
                                canRegister={canRegister}
                            />
                        {/* </div> */}

                        <MobileMenuToggle
                            open={mobileMenuOpen}
                            onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
                        />
                    </div>
                </div>

                {hasLinks && mobileMenuOpen && (
                    <NavbarMobileMenu
                        items={navigation}
                        activeHash={activeHash}
                        activeRoute={activeRoute}
                        onBlue={onBlue}
                        onSelect={setActiveHash}
                        onClose={() => setMobileMenuOpen(false)}
                        showAuth={isLanding}
                        canLogin={canLogin}
                        canRegister={canRegister}
                        user={auth?.user}
                    />
                )}
            </div>
        </nav>
    );
}
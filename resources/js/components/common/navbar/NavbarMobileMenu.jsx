import { Link } from '@inertiajs/react';
import NavbarLinks from './NavbarLinks';

export function MobileMenuToggle({ open, onToggle }) {
    return (
        <div className="lg:hidden flex items-center">
            <button
                onClick={onToggle}
                className="p-2 rounded-md text-normal hover:bg-white/20 focus:outline-none"
                aria-label="Toggle menu"
            >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {open ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>
        </div>
    );
}

export default function NavbarMobileMenu({
    items,
    activeHash,
    activeRoute = null,
    onBlue = false,
    onSelect,
    onClose,
    showAuth = false,
    canLogin,
    canRegister,
    user = null,
}) {
    return (
        <div className="lg:hidden border-t border-white/20">
            <div className="px-4 py-4 space-y-3">
                <NavbarLinks
                    variant="mobile"
                    items={items.map((item) => ({
                        ...item,
                        onSelect: () => onSelect(item.href),
                    }))}
                    activeHash={activeHash}
                    activeRoute={activeRoute}
                    onBlue={onBlue}
                    onNavigate={onClose}
                />

                {user && (
                    <div className="pt-3 space-y-1 border-t border-white/20">
                        <div className="px-4 pb-1">
                            <p className="truncate text-sm font-semibold text-black-normal">
                                {user.name}
                            </p>
                            <p className="truncate text-xs text-black-muted">
                                {user.email}
                            </p>
                        </div>

                        <Link
                            href={route('profile.edit')}
                            onClick={onClose}
                            className="block w-full rounded-lg px-4 py-2 text-sm font-medium text-black-normal transition-colors hover:bg-blue-light hover:text-blue-normal"
                        >
                            Profil Saya
                        </Link>

                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            onClick={onClose}
                            className="block w-full rounded-lg px-4 py-2 text-center text-sm font-medium text-red-normal transition-colors hover:bg-red-light"
                        >
                            Keluar
                        </Link>
                    </div>
                )}

                {showAuth && (
                    <div className="pt-3 space-y-2 border-t border-white/20">
                        {canLogin && (
                            <Link
                                href={route('login')}
                                className="block w-full px-4 py-2 text-center text-sm font-medium text-normal hover:text-blue-normal transition-colors"
                            >
                                Login
                            </Link>
                        )}
                        {canRegister && (
                            <Link
                                href={route('register')}
                                className="block w-full px-4 py-2 text-center text-sm font-medium text-white bg-blue-normal rounded-lg hover:bg-indigo-700 transition-colors"
                            >
                                Daftar
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

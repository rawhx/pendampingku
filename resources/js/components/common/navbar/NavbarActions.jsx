import { Link } from '@inertiajs/react';

const linkClass =
    'px-4 py-2 text-sm font-medium transition-colors';

const registerClass =
    'px-4 py-2 text-sm font-medium text-blue-normal border border-blue-normal bg-blue-light hover:bg-blue-light-hover rounded-4xl transition-colors';

/**
 * Tombol aksi sisi kanan (desktop): Login / Daftar / Dashboard.
 */
export default function NavbarActions({
    isLanding,
    isDashboard = false,
    onBlue = false,
    auth,
    canLogin,
    canRegister,
}) {
    const showAuthButtons = !isDashboard && (isLanding || !auth?.user);

    return (
        <div className="hidden lg:flex items-center space-x-3">
            {showAuthButtons ? (
                <>
                    {canLogin && (
                        <Link href={route('login')} className={`${linkClass} ${onBlue ? 'text-white hover:text-white/80' : 'text-normal hover:text-blue-normal'}`}>
                            Login
                        </Link>
                    )}
                    {canRegister && (
                        <Link href={route('register')} className={registerClass}>
                            Daftar
                        </Link>
                    )}
                </>
            ) : isDashboard ? (
                <Link
                    href={route('profile.edit')}
                    className="min-w-[116px] rounded-[20px] bg-blue-normal px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-blue-normal-hover focus:outline-none focus:ring-2 focus:ring-blue-normal/40 focus:ring-offset-2"
                >
                    {auth?.user?.name?.trim().split(/\s+/)[0] || 'Anjani'}
                </Link>
            ) : (
                <Link href={route('dashboard')} className={linkClass}>
                    Dashboard
                </Link>
            )}
        </div>
    );
}

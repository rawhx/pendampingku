import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

const triggerClass =
    'flex min-w-[116px] items-center justify-center gap-2 rounded-[20px] bg-blue-normal px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-normal-hover focus:outline-none focus:ring-2 focus:ring-blue-normal/40 focus:ring-offset-2';

const menuItemClass =
    'block w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-normal/40';

function ChevronIcon({ open }) {
    return (
        <svg
            className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                open ? 'rotate-180' : ''
            }`}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
        >
            <path d="M5 7.5 10 12.5 15 7.5" />
        </svg>
    );
}

/**
 * Pill nama pengguna di navbar dengan dropdown Profil Saya & Keluar.
 * Muncul saat hover, bisa diklik, dan dapat diakses lewat keyboard.
 */
export default function NavbarProfileMenu({ user }) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef(null);
    const closeTimer = useRef(null);

    const firstName = user?.name?.trim().split(/\s+/)[0] || 'Anjani';

    const clearCloseTimer = () => {
        if (closeTimer.current) {
            window.clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
    };

    const openMenu = () => {
        clearCloseTimer();
        setOpen(true);
    };

    const scheduleClose = () => {
        clearCloseTimer();
        closeTimer.current = window.setTimeout(() => setOpen(false), 150);
    };

    useEffect(() => clearCloseTimer, []);

    useEffect(() => {
        if (!open) {
            return undefined;
        }

        const handlePointerDown = (event) => {
            if (!containerRef.current?.contains(event.target)) {
                setOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setOpen(false);
                containerRef.current?.querySelector('button')?.focus();
            }
        };

        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open]);

    if (!user) {
        return (
            <Link href={route('login')} className={triggerClass}>
                Masuk
            </Link>
        );
    }

    const handleTriggerKeyDown = (event) => {
        if (event.key === 'ArrowDown' && !open) {
            event.preventDefault();
            openMenu();
            window.requestAnimationFrame(() => {
                containerRef.current
                    ?.querySelector('[role="menuitem"]')
                    ?.focus();
            });
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative"
            onMouseEnter={openMenu}
            onMouseLeave={scheduleClose}
            onBlur={(event) => {
                if (!containerRef.current?.contains(event.relatedTarget)) {
                    setOpen(false);
                }
            }}
        >
            <button
                type="button"
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label={`Menu akun ${user.name}`}
                onClick={() => setOpen((current) => !current)}
                onKeyDown={handleTriggerKeyDown}
                className={triggerClass}
            >
                <span className="max-w-[140px] truncate">{firstName}</span>
                <ChevronIcon open={open} />
            </button>

            {open && (
                <div className="absolute right-0 top-full z-50 pt-2">
                    <div
                        role="menu"
                        aria-label="Menu akun"
                        className="w-64 overflow-hidden rounded-2xl bg-white p-2 shadow-lg ring-1 ring-black/5"
                    >
                        <div className="border-b border-black-light px-3 pb-3 pt-2">
                            <p className="truncate text-sm font-semibold text-black-normal">
                                {user.name}
                            </p>
                            <p className="truncate text-xs text-black-muted">
                                {user.email}
                            </p>
                        </div>

                        <div className="pt-2">
                            <Link
                                role="menuitem"
                                href={route('profile.edit')}
                                onClick={() => setOpen(false)}
                                className={`${menuItemClass} text-black-normal hover:bg-blue-light hover:text-blue-normal`}
                            >
                                Profil Saya
                            </Link>

                            <Link
                                role="menuitem"
                                href={route('logout')}
                                method="post"
                                as="button"
                                onClick={() => setOpen(false)}
                                className={`${menuItemClass} text-red-normal hover:bg-red-light`}
                            >
                                Keluar
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

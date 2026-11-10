import { Link } from '@inertiajs/react';
import { scrollToSection } from './useActiveSection';

function hasRoute(name) {
    try {
        return typeof route === 'function' && route().has(name);
    } catch {
        return false;
    }
}

export default function NavbarLinks({
    items,
    activeHash,
    activeRoute = null,
    onBlue = false,
    onNavigate,
    variant = 'desktop',
    defaultHash = '#beranda',
}) {
    const isMobile = variant === 'mobile';

    return (
        <>
            {items.map((item, index) => {
                const isUnavailable = Boolean(
                    item.disabled ||
                        (item.routeName && !hasRoute(item.routeName)),
                );
                const isRouteActive = Boolean(
                    item.routeName && activeRoute === item.routeName,
                );
                const isActive =
                    !isUnavailable &&
                    (isRouteActive ||
                        (!activeRoute &&
                            (activeHash === item.href ||
                                (!activeHash && item.href === defaultHash))));

                const baseClass = isMobile
                    ? 'block font-medium transition-colors'
                    : 'relative whitespace-nowrap py-2 text-sm font-medium transition-colors xl:text-base';
                const activeClass = onBlue ? 'text-white' : 'text-blue-normal';
                const inactiveClass = onBlue
                    ? 'text-white/70 hover:text-white'
                    : 'text-normal hover:text-blue-normal';

                if (isUnavailable) {
                    return (
                        <span
                            key={index}
                            aria-disabled="true"
                            title="Belum tersedia"
                            className={`${baseClass} cursor-not-allowed select-none ${onBlue ? 'text-white/60' : 'text-normal'} opacity-40`}
                        >
                            {item.label}
                            <span className="ml-2 rounded-full bg-black-light-hover px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-black-muted">
                                Segera
                            </span>
                        </span>
                    );
                }

                if (item.routeName) {
                    return (
                        <Link key={index} href={route(item.routeName)} onClick={onNavigate} aria-current={isActive ? 'page' : undefined} className={`${baseClass} ${isActive ? activeClass : inactiveClass}`}>
                            {item.label}
                            {!isMobile && isActive && <span className={`absolute -bottom-[2px] left-0 right-0 h-[2px] ${onBlue ? 'bg-white' : 'bg-blue-normal'}`} />}
                        </Link>
                    );
                }

                return (
                    <a
                        key={index}
                        href={item.href}
                        onClick={(e) => {
                            e.preventDefault();
                            onNavigate?.();
                            scrollToSection(item.href);
                            // setActiveHash dipanggil lewat onSelect di parent
                            item.onSelect?.();
                        }}
                        className={`${baseClass} ${
                            isActive ? activeClass : inactiveClass
                        }`}
                    >
                        {item.label}
                        {!isMobile && isActive && (
                            <span className={`absolute -bottom-[2px] left-0 right-0 h-[2px] ${onBlue ? 'bg-white' : 'bg-blue-normal'}`}></span>
                        )}
                    </a>
                );
            })}
        </>
    );
}

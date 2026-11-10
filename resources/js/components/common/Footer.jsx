import landingNavigation from '@/data/navigation/landing.json';
import { address, appName, email, phone } from '@/constants/app';

const FOOTER_ANCHORS = ['#beranda', '#fitur', '#alur-kerja', '#testimoni'];

const navLinks = [
    ...landingNavigation.filter(({ href }) => FOOTER_ANCHORS.includes(href)),
];

function Icon({ children }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mt-0.5 h-4 w-4 shrink-0"
        >
            {children}
        </svg>
    );
}

export default function Footer({ isLanding = false, absoluteLinks = false }) {
    if (isLanding) {
        const resolveHref = (href) =>
            absoluteLinks && href.startsWith('#')
                ? `${route('landing', undefined, false)}${href}`
                : href;

        return (
            <footer className="bg-blue-normal text-white">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr] lg:gap-16">
                        <div className="sm:col-span-2 lg:col-span-1">
                            <div
                                aria-hidden="true"
                                className="mb-4 h-10 w-10 rounded-md bg-white"
                            />
                            <span className="sr-only">{appName}</span>
                            <p className="max-w-md text-justify text-sm leading-relaxed text-white">
                                Mendampingi tumbuh kembang dan pendidikan anak
                                berkebutuhan khusus secara terpadu melalui
                                teknologi laporan IEP, observasi AI harian, dan
                                kolaborasi orang tua-guru.
                            </p>
                        </div>

                        <div>
                            <h4 className="mb-4 text-sm font-semibold">
                                Navigasi
                            </h4>
                            <ul className="space-y-3 text-sm">
                                {navLinks.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={resolveHref(link.href)}
                                            className="text-white/90 transition hover:text-white hover:underline"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-4 text-sm font-semibold">
                                Hubungi Kami
                            </h4>
                            <ul className="space-y-4 text-sm">
                                <li className="flex gap-3">
                                    <Icon>
                                        <path d="M12 21s-7-5.2-7-11a7 7 0 1114 0c0 5.8-7 11-7 11z" />
                                        <circle cx="12" cy="10" r="2.5" />
                                    </Icon>
                                    <address className="not-italic leading-relaxed">
                                        {address}
                                    </address>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Icon>
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                                    </Icon>
                                    <a
                                        href={`tel:${phone.replace(/\D/g, '')}`}
                                        className="hover:underline"
                                    >
                                        {phone}
                                    </a>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Icon>
                                        <rect x="2" y="4" width="20" height="16" rx="2" />
                                        <path d="M22 7l-10 6L2 7" />
                                    </Icon>
                                    <a
                                        href={`mailto:${email}`}
                                        className="break-all hover:underline"
                                    >
                                        {email}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-white/40 pt-6 text-center text-xs text-white sm:mt-12 sm:text-sm">
                        <p>
                            {appName} - Solusi Terpercaya Pendampingan Anak
                            Inklusi &copy; {new Date().getFullYear()}
                        </p>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="bg-white shadow dark:bg-black-darker w-full">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <span className="block text-sm text-black-muted sm:text-center dark:text-white">
                    {appName} - Solusi Terpercaya Pendampingan Anak Inklusi © {new Date().getFullYear()}{' '}
                    <a
                        href="/"
                        className="hover:underline"
                    >
                        {appName}™
                    </a>
                    . All Rights Reserved.
                </span>
            </div>
        </footer>
    );
} 
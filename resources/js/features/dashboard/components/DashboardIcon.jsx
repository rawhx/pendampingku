const icons = {
    academic: (
        <>
            <path d="M3 9.5 12 4l9 5.5-9 5.5-9-5.5Z" />
            <path d="M6 12v4.5c0 .83 2.69 3 6 3s6-2.17 6-3V12" />
            <path d="M21 9.5V15" />
        </>
    ),
    pencil: (
        <>
            <path d="M16.8 3.7a2.1 2.1 0 0 1 3 3L8 18.5 3.5 20l1.5-4.5L16.8 3.7Z" />
            <path d="m14.5 6 3.5 3.5" />
        </>
    ),
    report: (
        <>
            <path d="M7 3h7l4 4v14H7V3Z" />
            <path d="M14 3v4h4" />
            <path d="M10 12h5M10 16h5" />
        </>
    ),
    chart: (
        <>
            <path d="M4 19V5" />
            <path d="M4 19h16" />
            <path d="M8 16v-4M12 16V8M16 16v-6" />
        </>
    ),
    check: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="m8.5 12.5 2.3 2.3 4.7-5" />
        </>
    ),
    clock: (
        <>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </>
    ),
};

export default function DashboardIcon({ name, className = 'h-6 w-6' }) {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {icons[name] ?? icons.academic}
        </svg>
    );
}

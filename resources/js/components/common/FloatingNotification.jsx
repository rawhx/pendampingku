import { motion } from 'motion/react';

const toneStyles = {
    success: {
        border: 'border-green-normal/40',
        bar: 'bg-green-normal',
        icon: 'bg-green-light text-green-dark',
        role: 'status',
        live: 'polite',
    },
    error: {
        border: 'border-red-normal/40',
        bar: 'bg-red-normal',
        icon: 'bg-red-light text-red-dark',
        role: 'alert',
        live: 'assertive',
    },
};

function SuccessIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
        >
            <path d="m5 12 4 4L19 6" />
        </svg>
    );
}

function ErrorIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
        >
            <path d="M12 8v5" />
            <path d="M12 17h.01" />
            <circle cx="12" cy="12" r="9" />
        </svg>
    );
}

export default function FloatingNotification({ notification, onClose }) {
    const tone = toneStyles[notification.tone] ?? toneStyles.success;

    return (
        <motion.div
            role={tone.role}
            aria-live={tone.live}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={`pointer-events-auto fixed bottom-4 right-4 z-[100] w-[min(360px,calc(100vw-2rem))] overflow-hidden rounded-3xl border bg-white shadow-[0_16px_40px_rgba(0,97,182,0.22)] sm:bottom-6 sm:right-6 ${tone.border}`}
        >
            <div className={`h-1 w-full ${tone.bar}`} />

            <div className="flex items-start gap-3 px-4 py-4">
                <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tone.icon}`}
                >
                    {notification.tone === 'error' ? (
                        <ErrorIcon />
                    ) : (
                        <SuccessIcon />
                    )}
                </span>

                <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-black-normal">
                        {notification.title}
                    </p>
                    {notification.message && (
                        <p className="mt-1 text-xs leading-relaxed text-black-muted">
                            {notification.message}
                        </p>
                    )}
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Tutup notifikasi"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xl leading-none text-white-dark transition hover:bg-white-light-active hover:text-black-normal"
                >
                    ×
                </button>
            </div>
        </motion.div>
    );
}

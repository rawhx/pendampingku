import React from 'react';

const variants = {
    primary: {
        ring: 'focus:ring-blue-normal/50',
        enabled:
            'btn-gradient-primary hover:btn-gradient-primary-hover text-white shadow-sm',
    },
    danger: {
        ring: 'focus:ring-red-normal/50',
        enabled:
            'btn-gradient-danger hover:btn-gradient-danger-hover text-white shadow-sm',
    },
};

export default function PrimaryButton({
    type = 'button',
    variant = 'primary',
    className = '',
    disabled = false,
    loading = false,
    processing = false,
    loadingText,
    children,
    ...props
}) {
    const isLoading = loading || processing;
    const isDisabled = disabled || isLoading;
    const tone = variants[variant] ?? variants.primary;

    return (
        <button
            type={type}
            disabled={isDisabled}
            className={`
                relative inline-flex items-center justify-center gap-[10px]
                min-h-[48px] px-6 py-[14px]
                rounded-[28px] border-0
                text-base font-medium tracking-normal select-none
                transition-all duration-200 ease-in-out
                focus:outline-none focus:ring-2 ${tone.ring} focus:ring-offset-2
                ${
                    isDisabled
                        ? 'btn-disabled cursor-not-allowed opacity-100 shadow-none pointer-events-none'
                        : `${tone.enabled} active:scale-[0.99]`
                }
                ${className}
            `.trim().replace(/\s+/g, ' ')}
            {...props}
        >
            {isLoading && (
                <svg
                    className="h-5 w-5 animate-spin text-white-dark"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            )}

            <span>{isLoading && loadingText ? loadingText : children}</span>
        </button>
    );
}

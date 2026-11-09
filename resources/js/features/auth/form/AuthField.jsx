import { useState } from 'react';
import InputError from '@/components/ui/InputError';

export default function AuthField({
    id,
    label,
    type = 'text',
    value,
    onChange,
    error,
    autoComplete,
    placeholder,
    isFocused = false,
    required = false,
    isPassword = false,
    className = '',
}) {
    const [showPassword, setShowPassword] = useState(false);
    const inputType = isPassword && showPassword ? 'text' : type;

    return (
        <div className={className}>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-black-normal mb-1.5"
            >
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={inputType}
                    name={id}
                    value={value}
                    autoComplete={autoComplete}
                    placeholder={placeholder}
                    onChange={onChange}
                    autoFocus={isFocused}
                    required={required}
                    className={`h-[48px] w-full rounded-[24px] border border-white-normal bg-white ${
                        isPassword ? 'pl-5 pr-12' : 'px-5'
                    } text-sm text-black-dark-active placeholder-white-dark shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all focus:border-blue-normal focus:outline-none focus:ring-2 focus:ring-blue-normal/25`}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center justify-center p-0.5 text-white-dark hover:text-black-normal focus:outline-none"
                        aria-label={
                            showPassword
                                ? 'Sembunyikan kata sandi'
                                : 'Tampilkan kata sandi'
                        }
                    >
                        {showPassword ? (
                            <svg
                                className="h-5 w-5 overflow-visible"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                <line x1="2" y1="2" x2="22" y2="22" />
                            </svg>
                        ) : (
                            <svg
                                className="h-5 w-5 overflow-visible"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                                <circle cx="12" cy="12" r="3" />
                            </svg>
                        )}
                    </button>
                )}
            </div>
            <InputError message={error} className="mt-1.5" />
        </div>
    );
}

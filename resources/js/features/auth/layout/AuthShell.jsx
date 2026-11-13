import { Head } from '@inertiajs/react';
import { appName } from '@/constants/app';

export default function AuthShell({
    title,
    heading,
    description,
    status,
    error,
    children,
}) {
    return (
        <>
            <Head title={title} />

            <div className="w-full max-w-[400px]">
                <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
                    <div className="btn-gradient-primary flex h-10 w-10 items-center justify-center rounded-xl text-white shadow">
                        <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                        >
                            <polygon points="12 2 2 7 12 12 22 7 12 2" />
                            <polyline points="2 17 12 22 22 17" />
                            <polyline points="2 12 12 17 22 12" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-black-dark-active">
                        {appName}
                    </span>
                </div>

                <div className="text-center lg:text-left">
                    <h1 className="text-3xl font-bold tracking-tight text-center text-black-dark-active">
                        {heading}
                    </h1>
                    {description && (
                        <p className="mt-2 px-3 text-sm text-black-muted text-center">
                            {description}
                        </p>
                    )}
                </div>

                {status && (
                    <div className="mt-4 rounded-xl bg-green-light p-3 text-sm font-medium text-green-dark border border-green-light-active">
                        {status}
                    </div>
                )}

                {error && (
                    <div
                        role="alert"
                        className="mt-4 rounded-xl border border-red-light-active bg-red-light p-3 text-sm font-medium text-red-dark"
                    >
                        {error}
                    </div>
                )}

                {children}
            </div>
        </>
    );
}

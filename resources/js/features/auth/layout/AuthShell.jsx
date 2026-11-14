import { Head } from '@inertiajs/react';
import BrandMark from '@/components/ui/BrandMark';
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
                    <BrandMark className="h-10 w-10 rounded-xl" iconClassName="h-6 w-6" />
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

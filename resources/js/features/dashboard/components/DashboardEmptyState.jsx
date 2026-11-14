import { Link } from '@inertiajs/react';

const containerClasses = {
    card: 'rounded-3xl bg-white px-6 py-14 shadow-[0_0_28px_rgba(0,129,242,0.08)]',
    muted: 'rounded-2xl bg-white-light-active px-6 py-10',
};

export default function DashboardEmptyState({
    title,
    description,
    action,
    variant = 'card',
}) {
    return (
        <div className={`text-center ${containerClasses[variant]}`}>
            <h3 className="text-lg font-semibold leading-snug text-blue-normal sm:text-xl">
                {title}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-white-dark">
                {description}
            </p>
            {action ? (
                <Link
                    href={action.href}
                    className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-blue-normal px-6 text-sm font-semibold text-white transition hover:bg-blue-normal-hover focus:outline-none focus:ring-2 focus:ring-blue-normal/30 focus:ring-offset-2"
                >
                    {action.label}
                </Link>
            ) : null}
        </div>
    );
}

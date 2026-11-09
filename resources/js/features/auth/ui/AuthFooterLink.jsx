import { Link } from '@inertiajs/react';

export default function AuthFooterLink({
    question,
    href,
    label,
    ...linkProps
}) {
    return (
        <div className="mt-8 text-center text-sm text-black-muted">
            {question}{' '}
            <Link
                href={href}
                className="font-semibold text-blue-normal hover:underline focus:outline-none"
                {...linkProps}
            >
                {label}
            </Link>
        </div>
    );
}

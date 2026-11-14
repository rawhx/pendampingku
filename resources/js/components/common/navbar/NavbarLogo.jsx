import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/components/ui/ApplicationLogo';
import { appName } from '@/constants/app';

export default function NavbarLogo({ onBlue = false }) {
    const { auth } = usePage().props;
    const homeHref = auth?.user ? route('dashboard') : route('landing');

    return (
        <div className="flex items-center">
            <Link href={homeHref} className="flex items-center gap-3 font-bold">
                    <ApplicationLogo className={`h-8 w-auto shrink-0 fill-current ${onBlue ? 'text-white' : 'text-normal'}`} />
                    <span className={`whitespace-nowrap text-sm sm:text-base ${onBlue ? 'text-white' : 'text-normal'}`}>
                        {appName}
                    </span>
            </Link>
        </div>
    );
}

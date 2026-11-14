import { Link, usePage } from '@inertiajs/react';
import BrandMark from '@/components/ui/BrandMark';
import { appName } from '@/constants/app';

export default function NavbarLogo({ onBlue = false }) {
    const { auth } = usePage().props;
    const homeHref = auth?.user ? route('dashboard') : route('landing');

    return (
        <div className="flex items-center">
            <Link href={homeHref} className="flex items-center gap-3 font-bold">
                    <BrandMark
                        className={`h-9 w-9 rounded-xl ${onBlue ? 'ring-2 ring-white/60' : ''}`}
                    />
                    <span className={`whitespace-nowrap text-sm sm:text-base ${onBlue ? 'text-white' : 'text-normal'}`}>
                        {appName}
                    </span>
            </Link>
        </div>
    );
}

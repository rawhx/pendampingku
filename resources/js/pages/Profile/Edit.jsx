import AuthenticatedLayout from '@/layouts/AuthenticatedLayout';
import BrandMark from '@/components/ui/BrandMark';
import { Head, usePage } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit() {
    const { auth } = usePage().props;
    const user = auth?.user;
    const initials = user?.name
        ?.split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((name) => name[0])
        .join('')
        .toUpperCase();

    return (
        <AuthenticatedLayout>
            <Head title="Profil" />

            <div className="relative overflow-hidden bg-white-light-hover px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-36">
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-[280px] top-[180px] h-[335px] w-[335px] rounded-full bg-blue-normal/30 blur-[50px]" />
                    <div className="absolute -right-[280px] top-[720px] h-[335px] w-[335px] rounded-full bg-blue-normal/20 blur-[50px]" />
                </div>

                <div className="relative mx-auto max-w-5xl">
                    <header className="mb-8 flex flex-col gap-6 rounded-3xl bg-blue-normal p-6 text-white shadow-[0_0_28px_rgba(0,129,242,0.16)] sm:flex-row sm:items-center sm:justify-between sm:p-8">
                        <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white text-xl font-bold text-blue-normal">
                                {initials || <BrandMark className="h-10 w-10 rounded-xl" iconClassName="h-6 w-6" />}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white/75">Pengaturan akun</p>
                                <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Profil Saya</h1>
                                <p className="mt-1 text-sm text-white/85">{user?.email}</p>
                            </div>
                        </div>
                        <p className="max-w-xs text-sm leading-relaxed text-white/80">
                            Kelola informasi akun dan keamanan akses PendampingKu Anda.
                        </p>
                    </header>

                    <div className="grid gap-6">
                        <div className="rounded-3xl bg-white p-6 shadow-[0_0_20px_rgba(0,129,242,0.08)] sm:p-8">
                            <UpdateProfileInformationForm />
                        </div>

                        <div className="rounded-3xl bg-white p-6 shadow-[0_0_20px_rgba(0,129,242,0.08)] sm:p-8">
                            <UpdatePasswordForm />
                        </div>

                        <div className="rounded-3xl border border-red-100 bg-red-50/70 p-6 shadow-[0_0_20px_rgba(239,68,68,0.05)] sm:p-8">
                            <DeleteUserForm />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

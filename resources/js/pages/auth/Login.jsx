import { Link, useForm, usePage } from '@inertiajs/react';
import AuthField from '@/features/auth/form/AuthField';
import AuthSubmitButton from '@/features/auth/form/AuthSubmitButton';
import AuthLayout from '@/features/auth/layout/AuthLayout';
import AuthShell from '@/features/auth/layout/AuthShell';
import AuthFooterLink from '@/features/auth/ui/AuthFooterLink';
import GoogleButton from '@/features/auth/ui/GoogleButton';
import AuthDivider from '@/features/auth/ui/AuthDivider';
import { appName } from '@/constants/app';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });
    const { errors: pageErrors } = usePage().props;

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthShell
            title="Masuk"
            heading={`Masuk ke ${appName}`}
            description="Masuk ke akun Pendampingku untuk melanjutkan pencatatan dan monitoring"
            status={status}
            error={pageErrors?.google}
        >
            <GoogleButton
                label="Masuk dengan Google"
                onClick={() => {
                    window.location.assign(route('auth.google.redirect'));
                }}
                className="mt-6"
            />

            <AuthDivider label="or Login with Email" />

            <form onSubmit={submit} className="space-y-4">
                <AuthField
                    id="email"
                    type="email"
                    label="Email"
                    value={data.email}
                    autoComplete="username"
                    placeholder="Masukkan email Anda"
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                    required
                />

                <AuthField
                    id="password"
                    type="password"
                    label="Kata Sandi"
                    value={data.password}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    isPassword
                    required
                />

                <div className="flex items-center justify-end pt-1">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="text-sm font-medium text-blue-normal hover:underline focus:outline-none"
                        >
                            Lupa kata sandi?
                        </Link>
                    )}
                </div>

                <AuthSubmitButton
                    processing={processing}
                    loadingText="Memproses..."
                >
                    Masuk
                </AuthSubmitButton>
            </form>

            <AuthFooterLink
                question="Tidak Punya Akun?"
                href={route('register')}
                label="Daftar di Sini"
            />
        </AuthShell>
    );
}

Login.layout = (page) => <AuthLayout>{page}</AuthLayout>;

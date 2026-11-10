import { useForm } from '@inertiajs/react';
import AuthField from '@/features/auth/form/AuthField';
import AuthSubmitButton from '@/features/auth/form/AuthSubmitButton';
import AuthLayout from '@/features/auth/layout/AuthLayout';
import AuthShell from '@/features/auth/layout/AuthShell';
import AuthFooterLink from '@/features/auth/ui/AuthFooterLink';
import GoogleButton from '@/features/auth/ui/GoogleButton';
import AuthDivider from '@/features/auth/ui/AuthDivider';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthShell
            title="Daftar"
            heading="Buat Akun"
            description="Daftar akun Pendampingku untuk mulai mencatat dan memantau perkembangan"
        >
            <GoogleButton
                label="Daftar dengan Google"
                onClick={() => {
                    // oauth register with Google
                }}
                className="mt-6"
            />

            <AuthDivider label="or Register with Email" />

            <form onSubmit={submit} className="space-y-4">
                <AuthField
                    id="name"
                    label="Nama Lengkap"
                    value={data.name}
                    autoComplete="name"
                    placeholder="Masukkan nama lengkap Anda"
                    onChange={(e) => setData('name', e.target.value)}
                    error={errors.name}
                    isFocused
                    required
                />

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
                    autoComplete="new-password"
                    placeholder="••••••••"
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    isPassword
                    required
                />

                <AuthField
                    id="password_confirmation"
                    type="password"
                    label="Konfirmasi Kata Sandi"
                    value={data.password_confirmation}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    onChange={(e) =>
                        setData('password_confirmation', e.target.value)
                    }
                    error={errors.password_confirmation}
                    isPassword
                    required
                />

                <AuthSubmitButton
                    processing={processing}
                    loadingText="Memproses..."
                >
                    Daftar
                </AuthSubmitButton>
            </form>

            <AuthFooterLink
                question="Sudah Punya Akun?"
                href={route('login')}
                label="Masuk di Sini"
            />
        </AuthShell>
    );
}

Register.layout = (page) => <AuthLayout>{page}</AuthLayout>;

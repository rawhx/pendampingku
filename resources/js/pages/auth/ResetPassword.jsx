import { useForm } from '@inertiajs/react';
import AuthField from '@/features/auth/form/AuthField';
import AuthSubmitButton from '@/features/auth/form/AuthSubmitButton';
import AuthLayout from '@/features/auth/layout/AuthLayout';
import AuthShell from '@/features/auth/layout/AuthShell';
import AuthFooterLink from '@/features/auth/ui/AuthFooterLink';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthShell
            title="Atur Ulang Kata Sandi"
            heading="Atur Ulang Kata Sandi"
            description="Buat kata sandi baru untuk mengamankan kembali akun Anda"
        >
            <form onSubmit={submit} className="mt-6 space-y-4">
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
                    label="Kata Sandi Baru"
                    value={data.password}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    onChange={(e) => setData('password', e.target.value)}
                    error={errors.password}
                    isPassword
                    isFocused
                    required
                />

                <AuthField
                    id="password_confirmation"
                    type="password"
                    label="Konfirmasi Kata Sandi Baru"
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
                    loadingText="Menyimpan..."
                >
                    Simpan Kata Sandi
                </AuthSubmitButton>
            </form>

            <AuthFooterLink
                question="Kembali ke"
                href={route('login')}
                label="Halaman Masuk"
            />
        </AuthShell>
    );
}

ResetPassword.layout = (page) => <AuthLayout>{page}</AuthLayout>;

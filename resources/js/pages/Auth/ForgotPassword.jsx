import AuthField from '@/features/auth/form/AuthField';
import AuthSubmitButton from '@/features/auth/form/AuthSubmitButton';
import AuthLayout from '@/features/auth/layout/AuthLayout';
import AuthShell from '@/features/auth/layout/AuthShell';
import AuthFooterLink from '@/features/auth/ui/AuthFooterLink';
import { useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <AuthShell
            title="Lupa Kata Sandi"
            heading="Lupa Kata Sandi?"
            description="Masukkan email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi"
            status={status}
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
                    isFocused
                    required
                />

                <AuthSubmitButton
                    processing={processing}
                    loadingText="Mengirim..."
                >
                    Kirim Tautan Reset
                </AuthSubmitButton>
            </form>

            <AuthFooterLink
                question="Ingat kata sandi Anda?"
                href={route('login')}
                label="Masuk di Sini"
            />
        </AuthShell>
    );
}

ForgotPassword.layout = (page) => <AuthLayout>{page}</AuthLayout>;

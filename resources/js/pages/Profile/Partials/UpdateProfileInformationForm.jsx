import { notify } from '@/components/common/notification';
import InputError from '@/components/ui/InputError';
import InputLabel from '@/components/ui/InputLabel';
import PrimaryButton from '@/components/ui/PrimaryButton';
import TextInput from '@/components/ui/TextInput';
import { useForm, usePage } from '@inertiajs/react';

export default function UpdateProfileInformation({ className = '' }) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            onSuccess: () => {
                notify({
                    title: 'Profil berhasil diperbarui',
                    message: 'Informasi akun Anda telah disimpan.',
                    tone: 'success',
                });
            },
            onError: () => {
                notify({
                    title: 'Gagal memperbarui profil',
                    message:
                        'Periksa kembali data yang ditandai, lalu coba lagi.',
                    tone: 'error',
                    duration: 8000,
                });
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-xl font-bold text-blue-normal">
                    Informasi Profil
                </h2>

                <p className="mt-2 text-sm leading-relaxed text-white-dark">
                    Perbarui nama dan alamat email yang digunakan pada akun Anda.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nama Lengkap" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Alamat Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing} loadingText="Menyimpan..." processing={processing}>
                        Simpan Perubahan
                    </PrimaryButton>
                </div>
            </form>
        </section>
    );
}

import studentHero from '@/assets/images/dashboard/student-hero.webp';

function formatToday() {
    return new Intl.DateTimeFormat('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    }).format(new Date());
}

export default function GreetingCard({ greeting, user }) {
    const firstName = user?.name?.trim().split(/\s+/)[0];
    const greetingText = firstName
        ? `Selamat Pagi, ${firstName}!`
        : greeting.fallbackGreeting;

    return (
        <section className="flex min-h-[230px] flex-col overflow-hidden rounded-3xl bg-blue-light-hover shadow-[0_4px_12px_rgba(0,0,0,0.12)] md:flex-row xl:h-[252px]">
            {/* Kolom gambar: lebih lebar, gambar mengisi penuh tinggi card */}
            <div className="hidden md:flex ml-2 shrink-0 self-end md:ml-4 xl:ml-6 xl:self-stretch">
                <img
                    src={studentHero}
                    alt="Guru pendamping tersenyum dengan tangan bersilang"
                    className="block h-28 w-auto max-w-none object-contain object-left-bottom sm:h-32 md:h-36 lg:h-44 xl:h-full"
                />
            </div>

            {/* Teks mengisi sisa ruang, tidak akan menimpa gambar */}
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-5 p-6 sm:p-8 md:py-8 md:pl-6 md:pr-6 lg:pl-8 lg:pr-10 xl:pl-[64px] xl:pr-12">
                <span className="w-fit rounded-full bg-white/20 px-3 py-1.5 text-xs font-medium text-black-normal">
                    {formatToday()} • {greeting.semester}
                </span>

                <div className="flex min-w-0 flex-col gap-2">
                    <h1 className="text-2xl font-semibold leading-tight text-blue-normal sm:text-[28px] xl:text-3xl">
                        {greetingText}
                    </h1>
                    <p className="max-w-3xl text-sm leading-relaxed text-black-normal sm:text-base">
                        {greeting.description}
                    </p>
                </div>
            </div>
        </section>
    );
}
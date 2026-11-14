import DashboardEmptyState from './DashboardEmptyState';

export default function ActivityFeed({ items, isLoading = false, error = '' }) {
    return (
        <section className="flex min-w-0 flex-col gap-5 rounded-[32px] bg-white p-8 shadow-[0_0_28px_rgba(0,129,242,0.08)] lg:min-h-full">
            <h2 className="text-2xl font-bold text-blue-normal lg:text-3xl">
                Aktivitas Terkini
            </h2>

            {error ? (
                <p className="rounded-2xl bg-white-light-active px-6 py-10 text-center text-sm text-red-700">
                    {error}
                </p>
            ) : isLoading ? (
                <p className="rounded-2xl bg-white-light-active px-6 py-10 text-center text-sm text-black-muted">
                    Memuat aktivitas...
                </p>
            ) : items.length === 0 ? (
                <DashboardEmptyState
                    variant="muted"
                    title="Belum ada aktivitas observasi"
                    description="Catatan observasi yang Anda simpan akan muncul di sini sebagai aktivitas terkini."
                    action={{
                        href: route('siswa-binaan'),
                        label: 'Lihat Siswa Binaan',
                    }}
                />
            ) : (
                <ul className="flex flex-col gap-1">
                    {items.map((item) => (
                        <li
                            key={item.id}
                            className="flex gap-4 rounded-2xl px-2 py-2.5"
                        >
                            <span
                                aria-hidden="true"
                                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-light"
                            >
                                <span className="h-2.5 w-2.5 rounded-full bg-blue-normal" />
                            </span>

                            <div className="flex flex-col gap-1">
                                <p className="text-sm text-white-dark-hover">
                                    {item.time} • {item.student}
                                </p>
                                <p className="text-sm leading-relaxed text-black-normal">
                                    {item.description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

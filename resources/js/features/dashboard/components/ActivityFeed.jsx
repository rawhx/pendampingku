export default function ActivityFeed({ items }) {
    return (
        <section className="flex min-w-0 flex-col gap-5 rounded-[32px] bg-white/40 px-5 py-8 shadow-[0_0_28px_rgba(0,129,242,0.08)] lg:min-h-[572px]">
            <h2 className="text-2xl font-bold leading-tight text-blue-normal lg:text-[32px]">
                Aktivitas Terkini
            </h2>

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
        </section>
    );
}

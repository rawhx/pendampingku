import DashboardIcon from "./DashboardIcon";


const statusTone = {
    Selesai: 'bg-green-normal text-white',
    Mendatang: 'bg-black-light-hover text-black-muted',
};

export default function ScheduleList({ items }) {
    return (
        <section className="flex min-w-0 flex-col gap-5 rounded-[32px] bg-white p-8 shadow-[0_0_28px_rgba(0,129,242,0.08)] lg:min-h-[572px]">
            <h2 className="text-2xl font-semibold leading-tight text-blue-normal lg:text-3xl">
                Jadwal Sesi Hari Ini
            </h2>

            <div className="flex flex-col gap-2">
                {items.map((item) => {
                    const isDone = item.status === 'Selesai';

                    return (
                        <article
                            key={item.id}
                            className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-[0_0_4px_rgba(0,0,0,0.08)]"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <DashboardIcon
                                        name={isDone ? 'check' : 'clock'}
                                        className={`mt-0.5 h-7 w-7 shrink-0 ${
                                            isDone
                                                ? 'text-green-normal'
                                                : 'text-blue-normal'
                                        }`}
                                    />
                                    <h3 className="min-w-0 break-words text-sm leading-snug text-black-normal sm:text-base">
                                        {item.title}
                                    </h3>
                                </div>

                                <span
                                    className={`min-w-[92px] shrink-0 rounded-full px-3 py-1 text-center text-xs font-semibold ${
                                        statusTone[item.status] ??
                                        statusTone.Mendatang
                                    }`}
                                >
                                    {item.status}
                                </span>
                            </div>

                            <div className="text-sm text-white-dark-hover">
                                <p>Pukul {item.time}</p>
                                <p>Lokasi: {item.location}</p>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

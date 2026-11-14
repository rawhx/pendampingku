import { icons } from '@/assets/icons/icons';

export default function StudentPlanSection({ plan = [], observationCount = 0 }) {
    return (
        <section className="mt-8 border-b-4 border-[#EDEDED] pb-8">
            <div className="mb-6 flex flex-col gap-2">
                <h2 className="text-[28px] font-semibold leading-[1.2] text-blue-normal sm:text-[32px]">
                    Rencana Pendampingan ke Depan
                </h2>
                <p className="text-base leading-[1.2] text-white-dark">
                    Saran AI berdasarkan perkembangan siswa dari {observationCount} catatan observasi
                </p>
            </div>

            {plan.length === 0 ? (
                <div className="rounded-2xl bg-white-light-active px-6 py-10 text-center text-sm text-black-muted">
                    Rencana pendampingan akan tersedia setelah analisis AI berikutnya tersimpan.
                </div>
            ) : (
                <div className="grid gap-5 md:grid-cols-2">
                    {plan.map((item, index) => (
                        <article
                            key={`${item.heading}-${index}`}
                            className="flex gap-4 rounded-3xl border-t-4 border-blue-normal bg-white p-5 shadow-[0_0_14px_rgba(0,129,242,0.08)]"
                        >
                            <img
                                src={icons.sparkle}
                                alt=""
                                aria-hidden="true"
                                className="h-8 w-8 shrink-0"
                            />
                            <div className="flex min-w-0 flex-col gap-2">
                                <h3 className="text-base font-bold leading-[1.2] text-blue-normal">
                                    {item.heading}
                                </h3>
                                <p className="text-base leading-[1.4] text-black-normal">
                                    {item.body}
                                </p>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}

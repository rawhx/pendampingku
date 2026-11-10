const statusTone = {
    success: 'bg-green-normal text-white',
    warning: 'bg-orange-normal text-white',
};

export default function StudentCard({
    name,
    className,
    condition,
    status,
    metrics,
    note,
}) {
    return (
        <article className="flex min-w-0 flex-col gap-5 rounded-3xl bg-white/50 p-3 py-5 shadow-[0_0_28px_rgba(0,129,242,0.08)]">
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                    <h3 className="break-words text-lg font-bold leading-tight text-blue-normal sm:text-xl">
                        {name}
                    </h3>
                    <p className="text-xs text-white-dark">
                        {className} • {condition}
                    </p>
                </div>

                <div className="flex flex-col items-start gap-2 text-xs text-black-normal sm:flex-row sm:items-center sm:justify-between">
                    <span>Status Emosi &amp; Perilaku</span>
                    <span
                        className={`max-w-full rounded-full px-2.5 py-1 text-center text-[11px] font-semibold leading-tight ${
                            statusTone[status.tone] ?? statusTone.success
                        }`}
                    >
                        {status.label}
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-5 rounded-3xl bg-white-light-active px-3 py-4 shadow-[0_0_2px_rgba(0,0,0,0.08)]">
                    {metrics.map((metric) => (
                        <div
                            key={metric.label}
                            className="flex flex-col gap-2"
                        >
                            <div className="flex items-start justify-between gap-2 text-sm sm:text-base">
                                <span className="min-w-0 break-words text-black-normal">
                                    {metric.label}
                                </span>
                                <span className="shrink-0 whitespace-nowrap font-bold text-blue-normal">
                                    {metric.value}
                                </span>
                            </div>

                            <div
                                role="progressbar"
                                aria-label={metric.label}
                                aria-valuemin="0"
                                aria-valuemax="100"
                                aria-valuenow={metric.percent}
                                aria-valuetext={metric.value}
                                className="h-2 w-full overflow-hidden rounded-full bg-white-dark/80"
                            >
                                <div
                                    className="h-full rounded-full bg-blue-normal/80"
                                    style={{ width: `${metric.percent}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <p className="text-xs leading-relaxed text-white-dark">
                    {note}
                </p>
            </div>
        </article>
    );
}

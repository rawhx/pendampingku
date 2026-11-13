import { icons } from "@/assets/icons/icons";

export default function ReportProgressCard({ metric, observationCount, insight }) {
    return (
        <article className="flex min-h-[263px] flex-col justify-center gap-5 rounded-3xl bg-white p-5 shadow-[0_0_14px_rgba(0,129,242,0.08)]">
            <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-medium leading-[1.2] text-black-normal">
                    {metric.id}. {metric.title}
                </h3>
                <span className="shrink-0 rounded-3xl bg-blue-dark px-2.5 py-1 text-xs font-bold leading-[1.2] text-white">
                    {observationCount}x Observasi Sesi
                </span>
            </div>

            <div className="rounded-3xl bg-white-light-active px-5 py-4 shadow-[0_0_2px_rgba(0,0,0,0.08)]">
                <div className="flex items-center justify-between gap-3 text-base leading-[1.2]">
                    <span className="text-black-normal">{metric.shortTitle}</span>
                    <span className="font-bold text-blue-normal">
                        {metric.maxScore ? ` ${metric.percent}%` : '0%'}
                    </span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-black-light-active">
                    <div
                        className="h-full rounded-full bg-blue-normal transition-[width]"
                        style={{ width: `${metric.percent}%` }}
                    />
                </div>
            </div>

            <div className="flex items-start gap-2 rounded-3xl bg-white-light-active px-5 py-4 text-base leading-[1.2] text-black-normal">
                <img
                    src={icons.sparkle}
                    alt=""
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0"
                />
                <p>
                    <span className="font-bold">Insight GPK</span>: {insight}
                </p>
            </div>
        </article>
    );
}

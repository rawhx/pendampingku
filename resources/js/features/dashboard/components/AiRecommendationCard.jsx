import PrimaryButton from "@/components/ui/PrimaryButton";

export default function AiRecommendationCard({
    badge,
    headline,
    description,
    primaryAction,
    secondaryAction,
}) {
    return (
        <article className="mt-8 rounded-3xl bg-white/50 px-5 py-5 shadow-[0_0_28px_rgba(0,129,242,0.08)] sm:px-7 lg:mt-[34px]">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-lg font-semibold leading-tight text-blue-normal lg:text-xl">
                    Rekomendasi AI Pendamping
                </h2>
                <span className="w-fit rounded-full bg-green-normal px-3 py-1 text-xs font-semibold text-white">
                    {badge}
                </span>
            </div>

            <div className="mt-3 flex flex-col gap-3">
                <p className="text-base font-medium text-black-normal">
                    {headline}
                </p>
                <p className="text-sm leading-relaxed text-white-dark">
                    {description}
                </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                <PrimaryButton className="w-full sm:min-w-[200px] sm:w-auto">
                    {primaryAction}
                </PrimaryButton>
                <PrimaryButton
                    variant="danger"
                    className="w-full sm:min-w-[120px] sm:w-auto"
                >
                    {secondaryAction}
                </PrimaryButton>
            </div>
        </article>
    );
}

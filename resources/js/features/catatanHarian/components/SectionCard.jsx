export default function SectionCard({
    title,
    badge,
    instruction,
    children,
}) {
    return (
        <section className="flex flex-col gap-5 rounded-3xl bg-white px-8 py-6 shadow-[0_0_14px_rgba(0,129,242,0.08)]">
            <div className="flex items-end justify-between gap-4">
                <h2 className="flex-1 text-lg font-semibold leading-tight text-blue-normal sm:text-xl">
                    {title}
                </h2>

                {badge && (
                    <span className="shrink-0 rounded-3xl bg-red-normal px-3 py-1 text-sm font-semibold text-white">
                        {badge}
                    </span>
                )}

                {instruction && (
                    <p className="hidden text-right text-sm text-white-dark sm:block">
                        {instruction}
                    </p>
                )}
            </div>

            <hr className="border-0 border-t border-black-light" />

            {children}
        </section>
    );
}

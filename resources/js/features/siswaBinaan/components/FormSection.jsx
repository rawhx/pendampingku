export default function FormSection({
    index,
    title,
    description,
    children,
}) {
    return (
        <section className="flex flex-col gap-7">
            <div className="flex items-center gap-3">
                <div className="flex size-[46px] shrink-0 items-center justify-center rounded-lg bg-blue-normal">
                    <span className="text-2xl font-bold leading-none text-white">
                        {index}
                    </span>
                </div>

                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-semibold leading-tight text-blue-normal">
                        {title}
                    </h2>
                    <p className="text-xs leading-tight text-white-dark">
                        {description}
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-5">{children}</div>
        </section>
    );
}

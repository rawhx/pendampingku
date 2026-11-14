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
    nisn,
}) {
    return (
        <article className="flex min-w-0 flex-col gap-5 overflow-hidden rounded-3xl bg-white shadow-[0_0_28px_rgba(0,129,242,0.08)]">
            <div className="bg-blue-normal h-4 w-full" />
            <div className="flex flex-col gap-5 px-6 py-5 ">
                <div className="flex flex-col gap-1">
                    <h3 className="break-words text-lg font-bold leading-tight text-blue-normal sm:text-xl">
                        {name}
                    </h3>
                    <p className="text-xs text-white-dark">
                        {className} • {condition}
                    </p>
                    <p className="text-xs text-white-dark">
                        NISN: {nisn}
                    </p>
                </div>
            </div>
        </article>
    );
}

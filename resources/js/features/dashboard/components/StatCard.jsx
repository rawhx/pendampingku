import DashboardIcon from "./DashboardIcon";


export default function StatCard({ icon, label, value, detail }) {
    return (
        <article className="gradient-primary flex min-h-[158px] flex-col gap-3 rounded-3xl px-3 py-6 text-white shadow-[0_0_14px_rgba(0,129,242,0.08)]">
            <div className="flex items-center justify-center gap-1.5">
                <DashboardIcon
                    name={icon}
                    className="h-6 w-6 shrink-0"
                />
                <p className="text-center text-sm font-medium leading-snug lg:text-base">
                    {label}
                </p>
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-2xl font-semibold leading-tight lg:text-[32px]">
                    {value}
                </p>
                <p className="text-xs leading-snug">{detail}</p>
            </div>
        </article>
    );
}

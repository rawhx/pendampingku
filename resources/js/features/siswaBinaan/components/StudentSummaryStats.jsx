import StudentIcon from './StudentIcon';

export default function StudentSummaryStats({ items }) {
    return <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 lg:gap-4">
        {items.map((item) => <article key={item.id} className="flex min-w-0 items-center gap-3 rounded-2xl bg-white/70 px-3 py-3 shadow-[0_0_14px_rgba(0,129,242,0.08)] sm:px-4">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-light text-blue-normal"><StudentIcon name={item.icon} /></span>
            <div className="min-w-0"><p className="text-lg font-semibold leading-none text-black-normal sm:text-xl">{item.value}</p><p className="mt-1 break-words text-[11px] leading-tight text-white-dark-hover sm:text-xs">{item.label}</p></div>
        </article>)}
    </div>;
}

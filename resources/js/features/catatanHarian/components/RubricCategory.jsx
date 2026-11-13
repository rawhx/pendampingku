import { useState } from 'react';
import { countAnswered, rubricScale } from '../data/catatanHarian';
import { icons } from '../../../assets/icons/icons';

export default function RubricCategory({
    category,
    answers,
    onSelect,
    defaultOpen = false,
}) {
    const [open, setOpen] = useState(defaultOpen);
    const answered = countAnswered(category, answers);

    return (
        <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_0_14px_rgba(0,129,242,0.08)]">
            <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpen((current) => !current)}
                className="flex w-full items-center justify-between gap-4 p-4 px-8 text-left transition hover:bg-white-light-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-normal/40"
            >
                <span className="flex min-w-0 items-center gap-[11px]">
                    <span className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-[8px] bg-blue-normal text-2xl font-bold text-white">
                        {category.id}
                    </span>
                    <span className="flex min-w-0 flex-col gap-1">
                        <span className="text-xl font-semibold text-blue-normal">
                            {category.title}
                        </span>
                        <span className="text-xs text-white-dark">
                            {category.description}
                        </span>
                    </span>
                </span>

                <span className="flex shrink-0 items-center gap-4">
                    <span
                        className={`rounded-full px-[10px] py-1 text-base font-bold text-white ${
                            answered === category.items.length
                                ? 'bg-green-normal'
                                : 'bg-white-dark'
                        }`}
                    >
                        {answered}/{category.items.length} Terisi
                    </span>
                    <img
                        src={icons.chevronDown}
                        alt=""
                        aria-hidden="true"
                        className={`h-7 w-7 shrink-0 transition-transform duration-200 ${
                            open ? 'rotate-180' : ''
                        }`}
                    />
                </span>
            </button>

            {open && (
                <div className="border-t border-black-light px-10 pb-2">
                    {category.items.map((item, index) => (
                        <div
                            key={item.id}
                            className="flex flex-col gap-3 border-b border-black-light py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
                        >
                            <div className="flex min-w-0 flex-col gap-2">
                                <p className="text-xl font-semibold text-black-normal">
                                    <span className="mr-2">
                                        {index + 1}.
                                    </span>
                                    {item.title}
                                </p>
                                <p className="text-base text-black-normal">
                                    {item.description}
                                </p>
                            </div>

                            <div className="flex shrink-0 flex-wrap items-center gap-3 self-end sm:self-auto">
                                {rubricScale.map((option) => {
                                    const selected =
                                        answers[item.id] === option.value;
                                    const isNo = option.value === 'no';

                                    return (
                                        <button
                                            key={option.value}
                                            type="button"
                                            aria-pressed={selected}
                                            aria-label={`${option.label}: ${option.description}`}
                                            title={`${option.label} • ${option.description}`}
                                            onClick={() =>
                                                onSelect(
                                                    item.id,
                                                    selected
                                                        ? null
                                                        : option.value,
                                                )
                                            }
                                            className={`flex h-[29px] items-center justify-center text-base font-semibold text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-normal/40 focus-visible:ring-offset-1 ${
                                                isNo
                                                    ? 'rounded-full px-[10px]'
                                                    : 'w-[29px] rounded-[8px]'
                                            } ${
                                                selected
                                                    ? 'bg-blue-normal hover:bg-blue-normal-hover'
                                                    : 'bg-[#c6c6c6] hover:bg-white-dark'
                                            }`}
                                        >
                                            {option.value === 'no'
                                                ? 'N/O'
                                                : option.value}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

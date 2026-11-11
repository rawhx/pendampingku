import SectionCard from './SectionCard';
import { icons } from '../../../assets/icons/icons';

const fieldClass =
    'h-12 w-full rounded-4xl border-0 bg-white pl-3 text-base text-black-normal shadow-[0_0_4px_rgba(0,0,0,0.08)] outline-none transition focus:ring-2 focus:ring-blue-normal/20';

function FieldError({ message }) {
    if (!message) {
        return null;
    }

    return <p className="text-xs text-red-normal">{message}</p>;
}

export default function SessionDetailsSection({
    date,
    startTime,
    endTime,
    activity,
    activityOptions,
    errors = {},
    onChange,
}) {
    return (
        <SectionCard
            index={1}
            title="Mendata Sesi Observasi"
            badge="Wajib Diisi"
        >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex w-full flex-col gap-2 lg:w-1/5">
                    <label
                        htmlFor="observation-date"
                        className="text-base font-medium text-black-normal"
                    >
                        Data Observasi
                    </label>
                    <div className="relative">
                        <input
                            id="observation-date"
                            type="date"
                            value={date}
                            onChange={(event) =>
                                onChange('date', event.target.value)
                            }
                            aria-invalid={Boolean(errors.date)}
                            className={`${fieldClass}`}
                            
                        />
                    </div>
                    <FieldError message={errors.date} />
                </div>

                <div className="flex w-full lg:w-fit flex-col gap-2">
                    <span className="text-base font-medium text-black-normal">
                        Rentang Jam Observasi
                    </span>
                    <div className="flex items-center gap-2">
                        <div className="relative min-w-0 flex">
                            <label htmlFor="start-time" className="sr-only">
                                Jam mulai observasi
                            </label>
                            <input
                                id="start-time"
                                type="time"
                                value={startTime}
                                onChange={(event) =>
                                    onChange('startTime', event.target.value)
                                }
                                aria-invalid={Boolean(errors.startTime)}
                                className={`${fieldClass}`}
                            />
                        </div>
                        <div className="relative min-w-0 flex">
                            <label htmlFor="end-time" className="sr-only">
                                Jam selesai observasi
                            </label>
                            <input
                                id="end-time"
                                type="time"
                                value={endTime}
                                onChange={(event) =>
                                    onChange('endTime', event.target.value)
                                }
                                aria-invalid={Boolean(errors.endTime)}
                                className={`${fieldClass}`}
                            />
                        </div>
                    </div>
                    <FieldError message={errors.startTime ?? errors.endTime} />
                </div>

                <div className="flex w-full flex-col gap-2 lg:w-[308px]">
                    <label
                        htmlFor="activity"
                        className="text-base font-medium text-black-normal"
                    >
                        Konteks / Jenis Kegiatan
                    </label>
                    <div className="relative">
                        <select
                            id="activity"
                            value={activity}
                            onChange={(event) =>
                                onChange('activity', event.target.value)
                            }
                            aria-invalid={Boolean(errors.activity)}
                            className={`${fieldClass} appearance-none pr-11`}
                        >
                            {activityOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        {/* <img
                            src={icons.chevronDown}
                            alt=""
                            aria-hidden="true"
                            className="pointer-events-none absolute right-3 top-1/2 h-6 w-6 -translate-y-1/2"
                        /> */}
                    </div>
                    <FieldError message={errors.activity} />
                </div>
            </div>
        </SectionCard>
    );
}

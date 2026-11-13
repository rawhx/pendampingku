import SectionCard from './SectionCard';

const fieldClass =
    'h-12 w-full rounded-4xl border-0 bg-white pl-3 text-base text-black-normal shadow-[0_0_4px_rgba(0,0,0,0.08)] outline-none transition focus:ring-2 focus:ring-blue-normal/20';
const invalidFieldClass = 'ring-2 ring-red-normal/70';

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
    subject,
    errors = {},
    onChange,
}) {
    return (
        <SectionCard
            index={1}
            title="Mendata Sesi Observasi"
            badge="Wajib Diisi"
        >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex w-full flex-col gap-2 lg:w-1/5">
                    <label
                        htmlFor="observation-date"
                        className="text-base font-medium text-black-normal"
                    >
                        Tanggal Observasi
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
                            className={`${fieldClass} ${errors.date ? invalidFieldClass : ''}`}
                        />
                    </div>
                    <FieldError message={errors.date} />
                </div>

                <div className="flex w-full flex-col gap-2 lg:w-fit">
                    <span className="text-base font-medium text-black-normal">
                        Rentang Jam Observasi
                    </span>
                    <div className="flex items-center gap-2">
                        <div className="relative flex min-w-0">
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
                                className={`${fieldClass} ${errors.startTime ? invalidFieldClass : ''}`}
                            />
                        </div>
                        <div className="relative flex min-w-0">
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
                                className={`${fieldClass} ${errors.endTime ? invalidFieldClass : ''}`}
                            />
                        </div>
                    </div>
                    <FieldError message={errors.startTime ?? errors.endTime} />
                </div>

                <div className="flex w-full flex-col gap-2 lg:w-[308px]">
                    <label
                        htmlFor="subject"
                        className="text-base font-medium text-black-normal"
                    >
                        Mata Pelajaran
                    </label>
                    <div className="relative">
                        <input
                            id="subject"
                            type="text"
                            value={subject}
                            placeholder="Tulis mata pelajaran.."
                            onChange={(event) =>
                                onChange('subject', event.target.value)
                            }
                            aria-invalid={Boolean(errors.subject)}
                            className={`${fieldClass} pr-11 ${errors.subject ? invalidFieldClass : ''}`}
                        />
                    </div>
                    <FieldError message={errors.subject} />
                </div>
            </div>
        </SectionCard>
    );
}

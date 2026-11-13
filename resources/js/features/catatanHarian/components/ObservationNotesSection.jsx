import SectionCard from './SectionCard';
import { icons } from '../../../assets/icons/icons';

export default function ObservationNotesSection({
    notes,
    onNotesChange,
    recommendation,
    onApplyIntervention,
    onVariantChange,
    error,
}) {
    return (
        <SectionCard
            index={4}
            title="Catatan Observasi Lapangan & Sintesis AI"
        >
            <div className="grid gap-10 lg:grid-cols-2">
                <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between gap-3 text-base font-medium">
                        <label
                            htmlFor="observation-notes"
                            className="text-black-normal"
                        >
                            Catatan Lapangan Shadow Teacher
                        </label>
                        <span className="shrink-0 text-white-dark">
                            {notes.length} Karakter
                        </span>
                    </div>

                    <div className="flex flex-col gap-3">
                        <textarea
                            id="observation-notes"
                            value={notes}
                            onChange={(event) =>
                                onNotesChange(event.target.value)
                            }
                            className={`h-[240px] w-full resize-none rounded-[28px] border-0 bg-white px-6 py-4 text-justify text-base text-black-normal shadow-[0_0_4px_rgba(0,0,0,0.08)] outline-none transition focus:ring-2 focus:ring-blue-normal/20 ${error ? 'ring-2 ring-red-normal/70' : ''}`}
                        />
                        {error && <p className="text-xs text-red-normal">{error}</p>}

                        <div className="flex items-center gap-2">
                            <img
                                src={icons.warning}
                                alt=""
                                aria-hidden="true"
                                className="h-[21px] w-[21px] shrink-0"
                            />
                            <p className="text-justify text-xs text-white-dark">
                                Tuliskan pengamatan objektif, fakta kejadian,
                                durasi, dan respons anak tanpa asumsi berlebihan.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5 rounded-3xl border-t-4 border-solid border-blue-normal bg-white px-4 py-5 shadow-[0_0_2px_rgba(0,0,0,0.08)]">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="flex items-center gap-2 rounded-3xl border border-[#92CCFF] bg-white px-3 py-1">
                            <img
                                src={icons.sparkle}
                                alt=""
                                aria-hidden="true"
                                className="h-6 w-6 shrink-0"
                            />
                            <span className="text-base text-black-normal">
                                AI Powered Assistant
                            </span>
                        </span>
                        <span className="text-base text-white-dark">
                            Standar Narasi IEP
                        </span>
                    </div>

                    <div className="flex flex-col gap-4">
                        <p className="text-base text-black-normal">
                            Saran Redaksi Pedagogis AI
                        </p>

                        <div className="h-[250px] overflow-y-auto rounded-[28px] bg-white px-8 py-4 text-justify text-base text-black-normal shadow-[0_0_4px_rgba(0,0,0,0.08)]">
                            {recommendation.map((item, index) => (
                                <p
                                    key={item.heading}
                                    className={index > 0 ? 'mt-4' : undefined}
                                >
                                    <span className="font-bold text-blue-normal">
                                        {item.heading}
                                    </span>
                                    : {item.body}
                                </p>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <button
                                type="button"
                                onClick={onApplyIntervention}
                                className="gradient-primary h-12 rounded-[28px] px-6 text-base font-semibold text-white shadow-[0_0_2px_rgba(0,0,0,0.08)] transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-normal/40 focus-visible:ring-offset-2"
                            >
                                Terapkan Intervensi
                            </button>
                            <button
                                type="button"
                                onClick={onVariantChange}
                                className="gradient-primary flex h-12 items-center gap-2.5 rounded-[28px] px-6 text-base font-semibold text-white shadow-[0_0_2px_rgba(0,0,0,0.08)] transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-normal/40 focus-visible:ring-offset-2"
                            >
                                <img
                                    src={icons.repeat}
                                    alt=""
                                    aria-hidden="true"
                                    className="h-5 w-5 shrink-0"
                                />
                                Variasi Baru
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </SectionCard>
    );
}

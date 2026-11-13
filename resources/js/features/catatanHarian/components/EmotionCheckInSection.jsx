import SectionCard from './SectionCard';
import { icons } from '../../../assets/icons/icons';

export default function EmotionCheckInSection({ value, options, error, onChange }) {
    return (
        <SectionCard
            index={2}
            title="Kondisi Emosi Awal Siswa (Baseline Check-In)"
            instruction="Pilih 1 kondisi yang paling dominan saat sesi dimulai"
        >
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                {options.map((option) => {
                    const selected = value === option.id;

                    return (
                        <button
                            key={option.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => onChange(option.id)}
                            className={`flex flex-col gap-5 rounded-3xl px-5 py-5 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-normal/40 ${
                                selected
                                    ? 'bg-white shadow-[0_0_14px_rgba(0,129,242,0.4)]'
                                    : 'bg-white/10 shadow-[0_0_4px_rgba(0,0,0,0.08)] hover:bg-white/60'
                            } ${error ? 'ring-2 ring-red-normal/70' : ''}`}
                        >
                            <span className="flex w-full items-center justify-between">
                                {option.gradient ? (
                                    <span className="gradient-primary flex h-[42px] w-[42px] shrink-0 items-center justify-center overflow-hidden rounded-lg p-1">
                                        <img
                                            src={icons[option.icon]}
                                            alt=""
                                            aria-hidden="true"
                                            className="h-full w-full"
                                        />
                                    </span>
                                ) : (
                                    <img
                                        src={icons[option.icon]}
                                        alt=""
                                        aria-hidden="true"
                                        className="h-[42px] w-[42px] shrink-0"
                                    />
                                )}

                                <img
                                    src={
                                        selected
                                            ? icons.checkboxChecked
                                            : icons.checkbox
                                    }
                                    alt=""
                                    aria-hidden="true"
                                    className="h-6 w-6 shrink-0"
                                />
                            </span>

                            <span className="flex flex-col gap-3">
                                <span className="text-xl font-semibold leading-[21px] text-blue-normal">
                                    {option.label}
                                </span>
                                <span className="text-base leading-[21px] text-white-dark">
                                    {option.description}
                                </span>
                            </span>
                        </button>
                    );
                })}
            </div>
            {error && <p className="text-xs text-red-normal">{error}</p>}
        </SectionCard>
    );
}

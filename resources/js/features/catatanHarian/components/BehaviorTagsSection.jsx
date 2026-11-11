import SectionCard from './SectionCard';
import { icons } from '../../../assets/icons/icons';

export default function BehaviorTagsSection({ value, options, onToggle }) {
    return (
        <SectionCard
            index={3}
            title="Indikator Perilaku Cepat"
            instruction="Klik tag untuk menambahkan observasi spesifik"
        >
            <div className="flex flex-wrap gap-4">
                {options.map((option) => {
                    const selected = value.includes(option.id);

                    return (
                        <button
                            key={option.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => onToggle(option.id)}
                            className={`flex items-center gap-2 rounded-3xl px-3 py-2 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-normal/40 ${
                                selected
                                    ? 'bg-[#B0D8FB]'
                                    : 'bg-white-normal hover:bg-white-normal-hover'
                            }`}
                        >
                            <img
                                src={selected ? icons.checkOne : icons.circleCheck}
                                alt=""
                                aria-hidden="true"
                                className="h-6 w-6 shrink-0"
                            />
                            <span
                                className={`text-base text-black-normal ${
                                    selected ? 'font-medium' : 'font-normal'
                                }`}
                            >
                                {option.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </SectionCard>
    );
}

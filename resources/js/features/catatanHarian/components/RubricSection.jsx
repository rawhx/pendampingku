import RubricCategory from './RubricCategory';
import SectionCard from './SectionCard';
import { rubricCategories, rubricScale } from '../data/catatanHarian';

export default function RubricSection({ answers = {}, onSelect }) {
    return (
        <div className="flex flex-col gap-5">
            <SectionCard
                title="Panduan Rubrik Penilaian Kuantitatif Kemandirian ABK"
                instruction="Klik opsi skor pada tiap butir"
            >
                <ul className="flex flex-col gap-3">
                    {rubricScale
                        .filter((option) => option.value !== 'no')
                        .map((option) => (
                            <li
                                key={option.value}
                                className="flex items-center gap-1 text-base text-black-normal"
                            >
                                <span className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-normal text-base font-bold text-white">
                                    {option.value}
                                </span>
                                <span className="font-bold">
                                    {option.label}
                                </span>
                                <span aria-hidden="true">&bull;</span>
                                <span>{option.description}</span>
                            </li>
                        ))}
                </ul>
            </SectionCard>

            <div className="flex flex-col gap-5">
                {rubricCategories.map((category) => (
                    <RubricCategory
                        key={category.id}
                        category={category}
                        answers={answers}
                        onSelect={onSelect}
                        defaultOpen={category.id === 'B'}
                    />
                ))}
            </div>
        </div>
    );
}

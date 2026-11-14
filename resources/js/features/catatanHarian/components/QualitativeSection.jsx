import SectionCard from './SectionCard';
import { qualitativeFields } from '../data/catatanHarian';

export default function QualitativeSection({
    values = {},
    errors = {},
    fields = qualitativeFields,
    startIndex = 1,
    onChange,
}) {
    return (
        <SectionCard title="Observasi Kualitatif Terstruktur">
            <div className="flex flex-col gap-6">
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="flex flex-col gap-2"
                    >
                        <label
                            htmlFor={`qualitative-${field.id}`}
                            className="text-base font-medium leading-tight text-black-normal"
                        >
                            <span className="mr-2">{startIndex + index}.</span>
                            {field.label}
                        </label>
                        <textarea
                            id={`qualitative-${field.id}`}
                            rows={field.rows}
                            value={values[field.id] ?? ''}
                            onChange={(event) =>
                                onChange(field.id, event.target.value)
                            }
                            className={`w-full resize-y rounded-[28px] border-0 bg-white px-4 py-3 text-justify text-base text-black-normal shadow-[0_0_4px_rgba(0,0,0,0.08)] outline-none transition focus:ring-2 focus:ring-blue-normal/20 ${errors[`qualitative.${field.id}`] ? 'ring-2 ring-red-normal/70' : ''}`}
                        />
                        {errors[`qualitative.${field.id}`] && <p className="text-xs text-red-normal">{errors[`qualitative.${field.id}`]}</p>}
                    </div>
                ))}
            </div>
        </SectionCard>
    );
}

import SectionCard from './SectionCard';

export default function StrategySection({ value, error, onChange }) {
    return (
        <SectionCard title="Intervensi & Strategi Pendampingan">
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between gap-3 text-base font-medium leading-[1.2]">
                    <label
                        htmlFor="intervention-strategy"
                        className="text-black-normal"
                    >
                        Strategi &amp; Alat Bantu yang Diterapkan
                    </label>
                    <span className="shrink-0 text-white-dark">
                        {value.length} Karakter
                    </span>
                </div>

                <div className="flex flex-col gap-3">
                    <textarea
                        id="intervention-strategy"
                        value={value}
                        onChange={(event) => onChange(event.target.value)}
                        className={`min-h-[80px] w-full resize-y rounded-[28px] border-0 bg-white px-6 py-4 text-justify text-base text-black-normal shadow-[0_0_4px_rgba(0,0,0,0.08)] outline-none transition focus:ring-2 focus:ring-blue-normal/20 ${error ? 'ring-2 ring-red-normal/70' : ''}`}
                    />
                    {error && <p className="text-xs text-red-normal">{error}</p>}

                    <p className="text-justify text-xs text-white-dark">
                        Catatan ini akan dirangkum dalam grafik efektivitas
                        strategi akomodasi bulanan peserta didik.
                    </p>
                </div>
            </div>
        </SectionCard>
    );
}

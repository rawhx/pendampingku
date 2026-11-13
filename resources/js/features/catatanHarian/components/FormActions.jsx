const primaryClass =
    'gradient-primary h-12 rounded-[28px] px-8 text-base font-semibold text-white shadow-[0_0_2px_rgba(0,0,0,0.08)] transition hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-normal/40 focus-visible:ring-offset-2';

const secondaryClass =
    'flex h-12 items-center justify-center rounded-[28px] border border-blue-normal bg-white px-8 text-base font-semibold text-blue-normal transition hover:bg-blue-light focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-normal/30 focus-visible:ring-offset-2';

export default function FormActions({
    step = 1,
    onNext,
    onBack,
    onSave,
    isSaving = false,
}) {
    if (step === 1) {
        return (
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={onNext}
                    className={primaryClass}
                >
                    Selanjutnya
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
            <button type="button" onClick={onBack} disabled={isSaving} className={`${secondaryClass} disabled:cursor-not-allowed disabled:opacity-60`}>
                Sebelumnya
            </button>

            <button type="button" onClick={onSave} disabled={isSaving} className={`${primaryClass} inline-flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70`}>
                {isSaving && (
                    <span
                        aria-hidden="true"
                        className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    />
                )}
                {isSaving ? 'Menyimpan & Menganalisis...' : 'Simpan Catatan Harian'}
            </button>
        </div>
    );
}

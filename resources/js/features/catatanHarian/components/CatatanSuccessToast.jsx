export default function CatatanSuccessToast({ studentName }) {
    return (
        <div role="status" aria-live="polite" className="fixed right-4 top-24 z-[60] max-w-sm rounded-2xl border border-green-normal bg-green-light px-5 py-4 text-sm font-semibold text-green-dark shadow-lg sm:right-6">
            Catatan harian {studentName} berhasil disimpan. Mengalihkan ke Siswa Binaan...
        </div>
    );
}

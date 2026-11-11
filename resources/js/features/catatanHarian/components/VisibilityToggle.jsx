export default function VisibilityToggle({ checked, onChange, label }) {
    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={label}
            onClick={() => onChange(!checked)}
            className={`relative h-10 w-[82px] shrink-0 cursor-pointer overflow-hidden rounded-3xl transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-normal/40 focus-visible:ring-offset-2 ${
                checked ? 'bg-blue-normal' : 'bg-white-dark'
            }`}
        >
            <span
                aria-hidden="true"
                className={`absolute top-0.5 h-9 w-9 rounded-3xl bg-white shadow-sm transition-all duration-200 ${
                    checked ? 'left-[43px]' : 'left-0.5'
                }`}
            />
        </button>
    );
}

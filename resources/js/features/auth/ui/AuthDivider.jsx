export default function AuthDivider({ label }) {
    return (
        <div className="relative my-6 flex items-center justify-center">
            <div className="w-full border-t border-white-dark/40" />
            <span className="absolute bg-white-light-hover px-3 text-xs tracking-wider text-black-muted">
                {label}
            </span>
        </div>
    );
}

export const fieldClass =
    'h-12 w-full rounded-[28px] border-0 bg-white px-5 text-base text-black-normal shadow-[0_0_4px_rgba(0,0,0,0.08)] outline-none transition placeholder:text-[#D1D4D7] focus:ring-2 focus:ring-blue-normal/20';

export const selectClass = `${fieldClass} cursor-pointer pr-10`;

export const readOnlyFieldClass = `${fieldClass} cursor-default bg-white-light-active text-black-muted`;

export default function FormControl({
    id,
    label,
    error,
    className = '',
    children,
}) {
    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label
                htmlFor={id}
                className="text-base font-bold leading-[1.2] text-black-normal"
            >
                {label}
            </label>

            {children}

            {error && (
                <p id={`${id}-error`} className="text-xs text-red-normal">
                    {error}
                </p>
            )}
        </div>
    );
}

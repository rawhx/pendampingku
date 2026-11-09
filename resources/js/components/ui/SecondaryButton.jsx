export default function SecondaryButton({
    type = 'button',
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            type={type}
            className={
                `inline-flex items-center rounded-md border border-white-normal bg-white px-4 py-2 text-xs font-semibold uppercase tracking-widest text-black-dark shadow-sm transition duration-150 ease-in-out hover:bg-white-light-hover focus:outline-none focus:ring-2 focus:ring-blue-normal focus:ring-offset-2 disabled:opacity-25 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}

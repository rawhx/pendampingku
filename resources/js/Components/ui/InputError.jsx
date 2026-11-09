export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-sm text-red-normal ' + className}
        >
            {message}
        </p>
    ) : null;
}

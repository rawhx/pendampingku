import PrimaryButton from '@/components/ui/PrimaryButton';

export default function AuthSubmitButton({
    processing,
    loadingText,
    children,
}) {
    return (
        <div className="pt-2">
            <PrimaryButton
                type="submit"
                className="w-full h-[48px] rounded-[28px] text-base font-semibold shadow-md"
                loading={processing}
                loadingText={loadingText}
            >
                {children}
            </PrimaryButton>
        </div>
    );
}

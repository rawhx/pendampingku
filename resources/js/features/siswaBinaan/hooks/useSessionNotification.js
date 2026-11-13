import { useEffect, useState } from 'react';

export default function useSessionNotification(storageKey) {
    const [notification, setNotification] = useState(() => {
        if (typeof window === 'undefined') {
            return '';
        }

        return window.sessionStorage.getItem(storageKey) ?? '';
    });

    useEffect(() => {
        if (!notification) {
            return undefined;
        }

        const timer = window.setTimeout(() => {
            window.sessionStorage.removeItem(storageKey);
            setNotification('');
        }, 5000);

        return () => window.clearTimeout(timer);
    }, [notification, storageKey]);

    const dismissNotification = () => {
        window.sessionStorage.removeItem(storageKey);
        setNotification('');
    };

    return { notification, dismissNotification };
}

import { AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import FloatingNotification from './FloatingNotification';
import {
    NOTIFICATION_EVENT,
    clearStoredNotification,
    readStoredNotification,
} from './notification';

export default function GlobalNotification() {
    const [notification, setNotification] = useState(() =>
        readStoredNotification(),
    );

    useEffect(() => {
        const handleNotification = (event) => {
            if (event.detail) {
                setNotification(event.detail);
            }
        };

        window.addEventListener(NOTIFICATION_EVENT, handleNotification);

        return () =>
            window.removeEventListener(
                NOTIFICATION_EVENT,
                handleNotification,
            );
    }, []);

    useEffect(() => {
        if (!notification) {
            return undefined;
        }

        const timer = window.setTimeout(() => {
            setNotification(null);
            clearStoredNotification();
        }, notification.duration ?? 5000);

        return () => window.clearTimeout(timer);
    }, [notification]);

    const dismissNotification = () => {
        setNotification(null);
        clearStoredNotification();
    };

    return (
        <AnimatePresence>
            {notification && (
                <FloatingNotification
                    key={notification.id}
                    notification={notification}
                    onClose={dismissNotification}
                />
            )}
        </AnimatePresence>
    );
}

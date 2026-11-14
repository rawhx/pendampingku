export const NOTIFICATION_EVENT = 'pendampingku:notification';
export const NOTIFICATION_STORAGE_KEY = 'pendampingku:notification';

function createNotificationId() {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function notify({
    title,
    message = '',
    tone = 'success',
    duration = tone === 'error' ? 8000 : 5000,
}) {
    if (typeof window === 'undefined') {
        return;
    }

    const notification = {
        id: createNotificationId(),
        title,
        message,
        tone,
        duration,
    };

    try {
        window.sessionStorage.setItem(
            NOTIFICATION_STORAGE_KEY,
            JSON.stringify(notification),
        );
    } catch {
        // Notifikasi tetap ditampilkan lewat event meskipun storage tidak tersedia.
    }

    window.dispatchEvent(
        new CustomEvent(NOTIFICATION_EVENT, { detail: notification }),
    );
}

export function readStoredNotification() {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const stored = window.sessionStorage.getItem(NOTIFICATION_STORAGE_KEY);

        if (!stored) {
            return null;
        }

        const parsed = JSON.parse(stored);

        if (parsed && typeof parsed === 'object' && parsed.title) {
            return parsed;
        }

        return null;
    } catch {
        return null;
    }
}

export function clearStoredNotification() {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        window.sessionStorage.removeItem(NOTIFICATION_STORAGE_KEY);
    } catch {
        // Abaikan bila storage tidak tersedia.
    }
}

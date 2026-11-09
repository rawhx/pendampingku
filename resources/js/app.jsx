import '@fontsource-variable/inter';
import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import SplashScreen from '@/components/common/SplashScreen';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
const splashDuration = 3000;
const SPLASH_KEY = 'splash_seen';

const hasSeenSplash = () => {
    try {
        return sessionStorage.getItem(SPLASH_KEY) === '1';
    } catch {
        return false;
    }
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        const Root = () => {
            const [showSplash, setShowSplash] = useState(() => !hasSeenSplash());

            useEffect(() => {
                if (!showSplash) return;

                const timer = setTimeout(() => {
                    setShowSplash(false);
                    try {
                        sessionStorage.setItem(SPLASH_KEY, '1');
                    } catch {}
                }, splashDuration);

                return () => clearTimeout(timer);
            }, [showSplash]);

            return (
                <>
                    {!showSplash && <App {...props} />}

                    <AnimatePresence>
                        {showSplash && <SplashScreen key="splash-screen" />}
                    </AnimatePresence>
                </>
            );
        };

        root.render(<Root />);
    },
    progress: {
        color: 'var(--color-black-normal)',
    },
});
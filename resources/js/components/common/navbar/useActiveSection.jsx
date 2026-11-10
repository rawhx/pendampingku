import { useEffect, useState } from 'react';

export function scrollToSection(href) {
    const el = document.querySelector(href);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    history.replaceState(null, '', window.location.pathname);
}


export default function useActiveSection(items, enabled = true, defaultHash = '#beranda') {
    const [activeHash, setActiveHash] = useState('');

    useEffect(() => {
        if (!enabled) return;

        const sectionMap = items
            .filter((item) => !item.disabled)
            .map((item) => {
                const el = document.querySelector(item.href);
                return el ? { href: item.href, el } : null;
            })
            .filter(Boolean);

        if (sectionMap.length === 0) return;

        let ticking = false;

        const update = () => {
            if (window.scrollY < 200) {
                setActiveHash(defaultHash);
                ticking = false;
                return;
            }

            const pos = window.scrollY + 140;
            let current = defaultHash;
            for (let i = 0; i < sectionMap.length; i++) {
                const el = sectionMap[i].el;
                if (el.offsetTop <= pos) {
                    current = `#${el.getAttribute('id')}`;
                }
            }
            setActiveHash(current);
            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(update);
                ticking = true;
            }
        };

        setActiveHash(defaultHash);
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', update);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', update);
        };
    }, [enabled, items, defaultHash]);

    return [activeHash, setActiveHash];
}
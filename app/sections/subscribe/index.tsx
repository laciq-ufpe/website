import { useEffect, useState } from "react";

const SubscribeSection = () => {
    const [footerState, setFooterState] = useState({ visible: false, height: 0 });

    useEffect(() => {
        if (typeof window === "undefined") return;

        const footer = document.querySelector<HTMLElement>("footer");
        if (!footer) return;

        const updateHeight = () => {
            setFooterState((prev) => ({
                ...prev,
                height: footer.getBoundingClientRect().height,
            }));
        };

        updateHeight();

        const observer = new IntersectionObserver(
            ([entry]) => {
                setFooterState({
                    visible: entry.isIntersecting,
                    height: footer.getBoundingClientRect().height,
                });
            },
            { threshold: 0 }
        );

        observer.observe(footer);
        window.addEventListener("resize", updateHeight);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateHeight);
        };
    }, []);

    const bottom = footerState.visible ? `calc(${footerState.height}px + 2rem)` : undefined;

    return (
        <button
            type="button"
            className="floating-cta group inline-flex flex-col items-center justify-center gap-1.5 uppercase"
            aria-label="Abrir inscrições para o II SCIQ"
            style={{ bottom }}
        >
            <span className="floating-cta__label text-xl font-semibold tracking-wide">Inscreva-se</span>
            <span className="floating-cta__hint text-xs font-medium uppercase tracking-[0.3em] text-neutral-950/80">
                Vagas limitadas
            </span>
        </button>
    );
};

export default SubscribeSection;
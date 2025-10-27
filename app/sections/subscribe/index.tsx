import { useEffect, useState, type CSSProperties } from "react";

type FooterState = {
    visible: boolean;
    height: number;
    ratio: number;
};

const SubscribeSection = () => {
    const [footerState, setFooterState] = useState<FooterState>({
        visible: false,
        height: 0,
        ratio: 0,
    });

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
                    ratio: entry.intersectionRatio,
                });
            },
            {
                threshold: Array.from({ length: 11 }, (_, index) => index / 10),
            }
        );

        observer.observe(footer);
        window.addEventListener("resize", updateHeight);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", updateHeight);
        };
    }, []);

    const { visible, height, ratio } = footerState;
    const maxLift = Math.max(0, height - 48);
    const offsetPx = visible ? Math.min(maxLift, height * Math.min(1, Math.max(0, ratio))) : 0;
    const style: CSSProperties & { "--floating-offset"?: string } = {
        "--floating-offset": `${offsetPx}px`,
    };

    return (
        <button
            type="button"
            className="floating-cta group inline-flex flex-col items-center justify-center gap-1.5 uppercase"
            aria-label="Abrir inscrições para o II SCIQ"
            style={style}
        >
            <span className="floating-cta__label text-xl font-semibold tracking-wide">Inscreva-se</span>
            <span className="floating-cta__hint text-xs font-medium uppercase tracking-[0.3em] text-neutral-950/80">
                Vagas limitadas
            </span>
        </button>
    );
};

export default SubscribeSection;
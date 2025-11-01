import { useEffect, useState, type CSSProperties } from "react";
import { useLanguage, type Language } from "~/contexts/language";

type FooterState = {
    visible: boolean;
    height: number;
    ratio: number;
};

const COPY: Record<
    Language,
    {
        label: string;
        hint: string;
        aria: string;
    }
> = {
    pt: {
        label: "Inscreva-se",
        hint: "Vagas limitadas",
        aria: "Abrir inscrições para o II SCIQ",
    },
    en: {
        label: "Register",
        hint: "Limited spots",
        aria: "Open registrations for the II SCIQ",
    },
};

const SubscribeSection = () => {
    const { language } = useLanguage();
    const copy = COPY[language];

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
        <a
            href="https://www.even3.com.br/ii-simposio-de-computacao-e-informacao-quantica-da-laciq-642770/"
            target="_blank"
            rel="noopener noreferrer"
            className="floating-cta group inline-flex flex-col items-center justify-center gap-1.5 uppercase"
            aria-label={copy.aria}
            style={style}
        >
            <span className="floating-cta__label text-xl font-semibold tracking-wide">{copy.label}</span>
            <span className="floating-cta__hint text-xs font-medium uppercase tracking-[0.3em] text-neutral-950/80">
                {copy.hint}
            </span>
        </a>
    );
};

export default SubscribeSection;
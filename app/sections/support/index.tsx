import { useMemo } from "react";
import { useLanguage, type Language } from "~/contexts/language";

type SupportSectionProps = {
    logos: string[];
};

const MIN_VISIBLE_ITEMS = 12;

const TEXT: Record<
    Language,
    {
        sectionLabel: string;
        title: string;
        tagline: string;
        empty: string;
        carouselLabel: string;
        logoAlt: string;
    }
> = {
    pt: {
        sectionLabel: "Patrocinadores",
        title: "Apoio",
        tagline: "Parceiros oficiais",
        empty: "Nenhum patrocinador encontrado.",
        carouselLabel: "Carrossel de patrocinadores",
        logoAlt: "Logo do patrocinador",
    },
    en: {
        sectionLabel: "Sponsors",
        title: "Support",
        tagline: "Official partners",
        empty: "No sponsors found.",
        carouselLabel: "Sponsor carousel",
        logoAlt: "Sponsor logo",
    },
};

const SupportSection = ({ logos }: SupportSectionProps) => {
    const { language } = useLanguage();
    const strings = TEXT[language];

    const { hasLogos, sequence } = useMemo(() => {
        const sanitized = Array.isArray(logos) ? logos.filter(Boolean) : [];
        const has = sanitized.length > 0;
        if (!has) return { hasLogos: false, sequence: [] as string[] };

        if (sanitized.length === 1) {
            return { hasLogos: true, sequence: sanitized };
        }

        const repeat = Math.max(2, Math.ceil(MIN_VISIBLE_ITEMS / sanitized.length));
        return {
            hasLogos: true,
            sequence: Array.from({ length: repeat }, () => sanitized).flat(),
        };
    }, [logos]);

    return (
        <section id="apoio" className="layout-gutter py-6 md:py-10" aria-label={strings.sectionLabel}>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h1 className="text-3xl">{strings.title}</h1>
                <span className="text-sm uppercase tracking-[0.3em] opacity-70">
                    {strings.tagline}
                </span>
            </div>

            <div className="pt-10">
                {!hasLogos ? (
                    <p className="text-center opacity-70">{strings.empty}</p>
                ) : (
                    <div
                        className="logo-carousel"
                        role="region"
                        aria-roledescription="carousel"
                        aria-label={strings.carouselLabel}
                        aria-live="off"
                    >
                        <div className="logo-track hover:[animation-play-state:paused]">
                            {sequence.map((src, index) => (
                                <div key={`${src}-${index}`} className="logo-item">
                                    <img
                                        src={src}
                                        alt={strings.logoAlt}
                                        className="logo-img opacity-90 transition-opacity hover:opacity-100"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default SupportSection;
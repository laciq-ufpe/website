import { useMemo } from "react";

type SupportSectionProps = {
    logos: string[];
};

const MIN_VISIBLE_ITEMS = 12;

const SupportSection = ({ logos }: SupportSectionProps) => {
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
        <section id="apoio" className="layout-gutter py-10" aria-label="Patrocinadores">
            <div className="flex items-center justify-between gap-6">
                <h1 className="text-3xl">Apoio</h1>
                <span className="text-sm uppercase tracking-[0.3em] opacity-70">
                    Parceiros oficiais
                </span>
            </div>

            <div className="pt-10">
                {!hasLogos ? (
                    <p className="text-center opacity-70">Nenhum patrocinador encontrado.</p>
                ) : (
                    <div
                        className="logo-carousel"
                        role="region"
                        aria-roledescription="carousel"
                        aria-label="Carrossel de patrocinadores"
                        aria-live="off"
                    >
                        <div className="logo-track hover:[animation-play-state:paused]">
                            {sequence.map((src, index) => (
                                <div key={`${src}-${index}`} className="logo-item">
                                    <img
                                        src={src}
                                        alt="Logo do patrocinador"
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
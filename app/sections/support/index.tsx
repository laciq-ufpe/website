import { useState, useMemo } from "react";

type SupportSectionProps = {
    logos: string[];
};

const MIN_VISIBLE_ITEMS = 12;

const Logo = ({ src }: { src: string }) => {
    const base = "logo-img opacity-90 hover:opacity-100 transition-opacity will-change-transform";
    const [extra, setExtra] = useState("");
    const [scale, setScale] = useState(1);

    return (
        <img
            src={src}
            alt="Logo do patrocinador"
            className={`${base} ${extra}`}
            loading="lazy"
            decoding="async"
            style={{ transform: `scale(${scale})` }}
            onLoad={(e) => {
                const img = e.currentTarget;
                const w = img.naturalWidth || 0;
                const h = img.naturalHeight || 0;
                if (w > 0 && h > 0) {
                    const ratio = w / h;
                }
            }}
        />
    );
};

const SupportSection = ({ logos }: SupportSectionProps) => {
    const { hasLogos, sequence } = useMemo(() => {
        const sanitized = Array.isArray(logos) ? logos.filter(Boolean) : [];
        const has = sanitized.length > 0;
        const shouldLoop = has && sanitized.length > 1;
        const repeatCount = shouldLoop ? Math.max(2, Math.ceil(MIN_VISIBLE_ITEMS / sanitized.length)) : 1;
        const items = shouldLoop ? Array.from({ length: repeatCount }, () => sanitized).flat() : sanitized;
        return { hasLogos: has, sequence: items };
    }, [logos]);

    return (
        <section id="apoio" className="layout-gutter pb-5" aria-label="Patrocinadores">
            <h1 className="text-3xl">Apoio</h1>

            <div className="pt-12">
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
                                        className="logo-img opacity-90 hover:opacity-100 transition-opacity"
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
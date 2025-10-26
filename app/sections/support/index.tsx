import { useState } from "react";

type SupportSectionProps = {
    logos: string[];
};

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
    const hasLogos = Array.isArray(logos) && logos.length > 0;
    // If only 1 logo, don't duplicate to avoid a visible seam
    const sequence = hasLogos ? (logos.length > 1 ? [...logos, ...logos] : logos) : [];

    return (
        <section className="px-50 pb-5" aria-label="Patrocinadores">
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
                            {sequence.map((src, i) => (
                                <div key={`${src}-${i}`} className="logo-item">
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
    )
}

export default SupportSection;
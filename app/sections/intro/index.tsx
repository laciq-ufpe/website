import { useLanguage } from "~/contexts/language";

const INTRO_COPY = {
    pt: {
        titleLines: [
            "II Simpósio",
            "de Computação",
            "& Informação",
            "Quântica",
        ],
        scheduleLines: ["Conferência: 13—14, novembro", "Hackathon: 14—21, novembro"],
        highlightLines: ["∣100⟩ anos", "da primeira", "Revolução", "Quântica"],
    },
    en: {
        titleLines: [
            "II Symposium",
            "on Quantum",
            "Computing &",
            "Information",
        ],
        scheduleLines: ["Conference: 13–14 November", "Hackathon: 14–21 November"],
        highlightLines: ["∣100⟩ years", "since the first", "Quantum", "Revolution"],
    },
};

const IntroSection = () => {
    const BASE = import.meta.env.BASE_URL;
    const { language } = useLanguage();
    const copy = INTRO_COPY[language];

    const renderLines = (lines: string[]) =>
        lines.map((line, index) => (
            <span key={line}>
                {line}
                {index < lines.length - 1 && <br />}
            </span>
        ));

    return (
        <section
            id="inicio"
            aria-labelledby="intro-title"
            style={{
                backgroundImage:
                    `linear-gradient(180deg, rgba(10, 0, 0, 0.85), rgba(10, 0, 0, 0.85)), url('${BASE}Group 24.png')`,
            }}
            className="
                layout-gutter bg-red-800 bg-cover bg-center bg-no-repeat
                py-6 md:py-10
                flex flex-col gap-y-10 md:flex-row md:items-stretch md:justify-between
            "
        >
            <div className="flex flex-col gap-6 md:flex-1 md:justify-between md:self-stretch">
                <h1 id="intro-title" className="headline-primary md:text-5xl/13">
                    {renderLines(copy.titleLines)}
                </h1>
                <p className="intro-meta md:text-lg">
                    {renderLines(copy.scheduleLines)}
                </p>
            </div>
            <div className="md:flex-1 md:self-stretch md:text-right">
                <div className="flex flex-col gap-2 text-lg font-bold leading-tight md:h-full md:justify-between md:text-right md:gap-0 md:text-2xl">
                    {copy.highlightLines.map((line) => (
                        <span key={line}>{line}</span>
                    ))}
                </div>
             </div>
        </section>
    );
};

export default IntroSection;
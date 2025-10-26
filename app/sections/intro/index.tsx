const IntroSection = () => {
    return (
        <section
            id="inicio"
            aria-labelledby="intro-title"
            style={{
                backgroundImage:
                    "linear-gradient(180deg, rgba(10, 0, 0, 0.85), rgba(10, 0, 0, 0.85)), url('/Group 24.png')",
            }}
            className="
                layout-gutter bg-red-800 bg-cover bg-center bg-no-repeat
                py-10
                flex flex-col gap-y-8 md:flex-row md:items-stretch md:justify-between
            "
        >
            <div className="flex flex-col gap-5 md:flex-1 md:justify-between md:self-stretch">
                <h1 id="intro-title" className="text-5xl/13 font-semibold mb-5">
                    II Simpósio <br />
                    de Computação <br />
                    & Informação <br />
                    Quântica
                </h1>
                <p className="text-lg">
                    Conferência: 13—14, novembro <br />
                    Hackathon: 14—21, novembro
                </p>
            </div>
            <div className="md:flex-1 md:self-stretch md:text-right">
                <div className="flex flex-col gap-3 text-2xl font-bold md:h-full md:justify-between md:text-right md:gap-0">
                    <span>∣100⟩ anos</span>
                    <span>da primeira</span>
                    <span>Revolução</span>
                    <span>Quântica</span>
                </div>
             </div>
        </section>
    );
};

export default IntroSection;
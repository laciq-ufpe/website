const IntroSection = () => {
    return (
        <section
            id="inicio"
            aria-labelledby="intro-title"
            style={{ backgroundImage: "url('/background.png')" }}
            className="
                layout-gutter bg-red-800 bg-cover bg-center bg-no-repeat
                py-10
                flex flex-col gap-y-8 md:flex-row md:items-center md:justify-between
            "
        >
            <div>
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
            <div className="text-right md:text-right">
                <p className="text-2xl/13 font-bold">
                    ∣100⟩ anos <br />
                    da primeira <br />
                    Revolução <br />
                    Quântica
                </p>
            </div>
        </section>
    );
};

export default IntroSection;
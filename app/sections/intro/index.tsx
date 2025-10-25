const IntroSection = () => {
    return (
        <div
            style={{backgroundImage: "url('public/background.png')"}}
            className="
                bg-cover bg-no-repeat bg-center bg-red-800
                px-50 py-10 flex flex-row justify-between items-center
            "
        >
            <div>
                <h1 className="text-5xl/13 font-semibold mb-5">
                    II Simpósio <br/>
                    de Computação <br/>
                    & Informação <br/>
                    Quântica
                </h1>
                <p className="text-lg">
                    Conferência: 13—14, novembro <br/>
                    Hackathon: 14—21, novembro
                </p>
            </div>
            <div>
                <p className="text-2xl/13 text-right font-bold">
                    ∣100⟩ anos <br/>
                    da primeira <br/>
                    Revolução <br/>
                    Quântica
                </p>
            </div>
        </div>
    )
}

export default IntroSection;
const PARAGRAPHS = [
    "Em 2025, celebramos um século desde o trabalho inaugural em mecânica quântica do físico e teórico alemão Werner Heisenberg — o artigo submetido em julho de 1925, aos 23 anos, considerado um alicerce da teoria moderna. Nesse trabalho, Heisenberg introduziu a mecânica matricial, um novo arcabouço matemático que substituiu conceitos clássicos, como órbitas planetárias dos elétrons, por matrizes que representam grandezas físicas. O impacto foi tão profundo que rendeu a Heisenberg o Prêmio Nobel de Física de 1932. Esse centenário vem sendo celebrado mundialmente com conferências e eventos públicos, incluindo o Ano Internacional da Ciência e Tecnologia Quânticas (IYQ 2025) proclamado pela ONU, conectando história, aplicações atuais e potenciais futuros da área.",
    "Neste contexto, iremos realizar o II Simpósio de Computação e Informação Quântica, com o tema “100 Anos desde a Primeira Revolução Quântica”. O evento será marcado por dois dias de conferência, com palestras e mesas redondas, seguidos de um hackathon orientado a casos reais, cuja premiação ocorrerá dia 21 no Innovation Center da Accenture, no Porto Digital.",
];

const EVENT_CALLOUTS = [
    {
        title: "Conferência",
        subtitle: "13 e 14, novembro",
        bullets: [
            "Pesquisadores de renome nacional e internacional",
            "Networking com acadêmicos e representantes do mercado",
            "Exposição de trabalhos de pesquisa em quântica",
        ],
    },
    {
        title: "Hackathon",
        subtitle: "14 a 21, novembro",
        bullets: [
            "Problemas orientados a casos reais",
            "Banca avaliadora por Accenture e IBM",
            "Prêmio de notebook (Samsung Book 4)",
        ],
    },
];

const AboutSection = () => {
    return (
        <section id="sobre" className="layout-gutter py-10" aria-labelledby="about-title">
            <h1 id="about-title" className="text-3xl mb-4">Sobre</h1>

            <div className="space-y-4 text-lg/8 text-justify">
                {PARAGRAPHS.map((paragraph, index) => (
                    <p key={`about-paragraph-${index}`}>
                        {paragraph}
                    </p>
                ))}
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
                {EVENT_CALLOUTS.map((callout) => (
                    <section
                        key={callout.title}
                        className="event-callout rounded-2xl p-6"
                    >
                        <h2 className="text-2xl font-semibold tracking-tight">{callout.title}</h2>
                        <p className="mt-1 text-sm uppercase opacity-80">{callout.subtitle}</p>
                        <ul className="mt-4 space-y-2 text-lg/7 list-disc list-inside text-left">
                            {callout.bullets.map((bullet, index) => (
                                <li key={`${callout.title}-bullet-${index}`}>{bullet}</li>
                            ))}
                        </ul>
                    </section>
                ))}
            </div>
        </section>
    );
};

export default AboutSection;
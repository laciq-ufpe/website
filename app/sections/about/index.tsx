const PARAGRAPHS = [
    "Em 2025, celebramos cem anos do trabalho que inaugura a mecânica quântica moderna: o artigo submetido por Werner Heisenberg em julho de 1925, aos 23 anos. Nesse marco científico, Heisenberg introduziu a mecânica matricial — um arcabouço que trocou imagens clássicas, como órbitas eletrônicas, por matrizes capazes de representar grandezas físicas com precisão inédita. O impacto foi tão profundo que lhe rendeu o Prêmio Nobel de Física de 1932 e redefiniu a ciência do século XX. Este centenário está sendo lembrado em todo o mundo, incluindo o Ano Internacional da Ciência e Tecnologia Quânticas (IYQ 2025), proclamado pela ONU, que conecta história, aplicações atuais e futuros possíveis da área.",
    "É nesse contexto que realizamos o II Simpósio de Computação e Informação Quântica, com o tema “100 anos desde a Primeira Revolução Quântica”. Serão dois dias de conferência, com palestras e mesas-redondas, seguidos de um hackathon orientado a desafios reais. A premiação acontece no dia 21, no Innovation Center da Accenture, no Porto Digital. O simpósio reúne pesquisadores, estudantes, empresas e formuladores de políticas para pensar, juntos, os próximos cem anos da tecnologia quântica.",
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
        <section id="sobre" className="layout-gutter py-6 md:py-10" aria-labelledby="about-title">
            <h1 id="about-title" className="text-3xl mb-4">Sobre</h1>

            <div className="space-y-4 text-base md:text-lg/8 text-left md:text-justify leading-relaxed">
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
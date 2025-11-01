import { useLanguage, type Language } from "~/contexts/language";

type Callout = {
    title: string;
    subtitle: string;
    bullets: string[];
};

const CONTENT: Record<
    Language,
    {
        title: string;
        paragraphs: string[];
        callouts: Callout[];
    }
> = {
    pt: {
        title: "Sobre",
        paragraphs: [
            "Em 2025, celebramos cem anos do trabalho que inaugura a mecânica quântica moderna: o artigo submetido por Werner Heisenberg em julho de 1925, aos 23 anos. Nesse marco científico, Heisenberg introduziu a mecânica matricial — um arcabouço que trocou imagens clássicas, como órbitas eletrônicas, por matrizes capazes de representar grandezas físicas com precisão inédita. O impacto foi tão profundo que lhe rendeu o Prêmio Nobel de Física de 1932 e redefiniu a ciência do século XX. Este centenário está sendo lembrado em todo o mundo, incluindo o Ano Internacional da Ciência e Tecnologia Quânticas (IYQ 2025), proclamado pela ONU, que conecta história, aplicações atuais e futuros possíveis da área.",
            "É nesse contexto que realizamos o II Simpósio de Computação e Informação Quântica, com o tema “100 anos desde a Primeira Revolução Quântica”. Serão dois dias de conferência, com palestras e mesas-redondas, seguidos de um hackathon orientado a desafios reais. A premiação acontece no dia 21, no Innovation Center da Accenture, no Porto Digital. O simpósio reúne pesquisadores, estudantes, empresas e formuladores de políticas para pensar, juntos, os próximos cem anos da tecnologia quântica.",
        ],
        callouts: [
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
        ],
    },
    en: {
        title: "About",
        paragraphs: [
            "In 2025 we celebrate one hundred years since the work that launched modern quantum mechanics: the article submitted by Werner Heisenberg in July 1925, when he was 23. In that scientific milestone, Heisenberg introduced matrix mechanics—a framework that replaced classical images such as electronic orbits with matrices capable of representing physical quantities with unprecedented precision. The impact was so profound that it earned him the 1932 Nobel Prize in Physics and redefined 20th-century science. The centennial is being commemorated worldwide, including the United Nations’ International Year of Quantum Science and Technology (IYQ 2025), which connects history, current applications, and future possibilities for the field.",
            "Within this context we present the II Quantum Computing and Information Symposium, themed “100 Years Since the First Quantum Revolution.” Two conference days—featuring talks and roundtables—will be followed by a hackathon driven by real-world challenges. Awarding takes place on the 21st at Accenture’s Innovation Center in Porto Digital. The symposium brings together researchers, students, companies, and policymakers to collectively envision the next hundred years of quantum technology.",
        ],
        callouts: [
            {
                title: "Conference",
                subtitle: "13–14 November",
                bullets: [
                    "Researchers of national and international renown",
                    "Networking with academics and industry representatives",
                    "Showcase of quantum research projects",
                ],
            },
            {
                title: "Hackathon",
                subtitle: "14–21 November",
                bullets: [
                    "Challenges grounded in real-world problems",
                    "Evaluation panel by Accenture and IBM",
                    "Notebook prize (Samsung Book 4)",
                ],
            },
        ],
    },
};

const AboutSection = () => {
    const { language } = useLanguage();
    const content = CONTENT[language];

    return (
        <section id="sobre" className="layout-gutter py-6 md:py-10" aria-labelledby="about-title">
            <h1 id="about-title" className="text-3xl mb-4">
                {content.title}
            </h1>

            <div className="space-y-4 text-base md:text-lg/8 text-left md:text-justify leading-relaxed">
                {content.paragraphs.map((paragraph, index) => (
                    <p key={`about-paragraph-${index}`}>
                        {paragraph}
                    </p>
                ))}
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
                {content.callouts.map((callout) => (
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
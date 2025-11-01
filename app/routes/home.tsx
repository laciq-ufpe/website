import { useMemo, useState } from "react";
import AboutSection from "~/sections/about";
import Footer from "~/sections/footer";
import Header from "~/sections/header";
import IntroSection from "~/sections/intro";
import OrganizationSection, { type OrganizationCard } from "~/sections/organization";
import SubscribeSection from "~/sections/subscribe";
import SupportSection from "~/sections/support";
import sponsorshipFiles from "~/data/sponsorships.json";
import organizationFiles from "~/data/organizations.json";
import { LanguageProvider, type Language } from "~/contexts/language";

const IMAGE_PATTERN = /\.(png|jpe?g|svg|webp|gif)$/i;

type OrganizationCopy = Omit<OrganizationCard, "image">;

const organizationCatalog: Array<{
    file: string;
    translations: Record<Language, OrganizationCopy>;
}> = [
    {
        file: "logo_laciq.png",
        translations: {
            pt: {
                name: "Liga Acadêmica de Computação e Informação Quântica da UFPE",
                bullets: [
                    "Primeira Liga Acadêmica de Quântica do Brasil",
                    "Plataforma ativa para ensino, pesquisa e extensão em tecnologias emergentes",
                    "Professores, membros e colaboradores com pesquisa em quântica",
                ],
            },
            en: {
                name: "Academic League of Quantum Computing and Information at UFPE",
                bullets: [
                    "First quantum academic league in Brazil",
                    "Active platform for teaching, research, and outreach in emerging technologies",
                    "Faculty, members, and collaborators conducting quantum research",
                ],
            },
        },
    },
    {
        file: "logo_quanta.png",
        translations: {
            pt: {
                name: "Instituto de Tecnologias Quânticas da UFPE",
                bullets: [
                    "Hub de pesquisa, formação e inovação em tecnologias quânticas",
                    "Infraestrutura pioneira para PC quântico fotônico e rede de chaves quânticas",
                    "Desenvolvimento integrado de hardware e software quânticos",
                ],
            },
            en: {
                name: "UFPE Quantum Technologies Institute",
                bullets: [
                    "Hub for research, training, and innovation in quantum technologies",
                    "Pioneer infrastructure for photonic quantum computing and quantum key networks",
                    "Integrated development of quantum hardware and software",
                ],
            },
        },
    },
    {
        file: "logo_cin.png",
        translations: {
            pt: {
                name: "Centro de Informática da UFPE",
                bullets: [
                    "Referência nacional e internacional em computação",
                    "Parcerias com indústria e Porto Digital: histórico de colaborações e >40 empresas conectadas",
                    "Programa Acadêmico de Pós com nota máxima no CAPES (7)",
                ],
            },
            en: {
                name: "UFPE Center for Informatics",
                bullets: [
                    "National and international benchmark in computing",
                    "Partnerships with industry and Porto Digital: more than 40 companies connected",
                    "Graduate program with the highest CAPES rating (7)",
                ],
            },
        },
    },
    {
        file: "logo_ccen.png",
        translations: {
            pt: {
                name: "Centro de Ciências Exatas e da Natureza da UFPE",
                bullets: [
                    "Portfólio com 8 graduações (bacharelados e licenciaturas, presencial e EAD)",
                    "Programas de pós CAPES 5–7, com produção e projetos competitivos",
                    "Iniciativas contínuas que aproximam empresas, escolas e sociedade",
                ],
            },
            en: {
                name: "UFPE Center for Exact and Natural Sciences",
                bullets: [
                    "Portfolio with 8 undergraduate programs (bachelor’s and licentiate, on-site and distance)",
                    "Graduate programs with CAPES scores 5–7 and competitive output",
                    "Continuous initiatives connecting companies, schools, and society",
                ],
            },
        },
    },
    {
        file: "logo_ctg.png",
        translations: {
            pt: {
                name: "Centro de Tecnologia e Geociências",
                bullets: [
                    "Integra Engenharias, Arquitetura e áreas de Geociências em um mesmo centro",
                    "Múltiplos laboratórios de ensino, P&D e serviços tecnológicos",
                    "Serviços e projetos técnicos em construção, energia, mineração e meio ambiente",
                ],
            },
            en: {
                name: "UFPE Center for Technology and Geosciences",
                bullets: [
                    "Brings together Engineering, Architecture, and Geosciences in a single center",
                    "Multiple laboratories for teaching, R&D, and technological services",
                    "Technical services and projects in construction, energy, mining, and the environment",
                ],
            },
        },
    },
];

const toTitleCase = (filename: string) =>
    filename
        .replace(/\.[^/.]+$/, "")
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

const BASE = import.meta.env.BASE_URL;

function loadSponsorships() {
    return sponsorshipFiles
        .filter((name) => IMAGE_PATTERN.test(name))
        .sort((a, b) => a.localeCompare(b))
        .map((name) => `${BASE}sponsorships/${name}`);
}

function loadOrganizations(language: Language) {
    const available = new Set(
        organizationFiles.filter((name) => IMAGE_PATTERN.test(name)),
    );

    const curated = organizationCatalog.flatMap(({ file, translations }) => {
        if (!available.delete(file)) return [];
        const copy = translations[language];
        if (!copy) return [];
        return [{ ...copy, image: `${BASE}organization/${file}` } satisfies OrganizationCard];
    });

    const extras = Array.from(available)
        .sort((a, b) => a.localeCompare(b))
        .map<OrganizationCard>((file) => ({
            name: toTitleCase(file),
            image: `${BASE}organization/${file}`,
            bullets: [],
        }));

    return [...curated, ...extras];
}

const Home = () => {
    const logos = useMemo(() => loadSponsorships(), []);
    const [language, setLanguage] = useState<Language>("pt");
    const organizations = useMemo(
        () => loadOrganizations(language),
        [language],
    );
    const languageValue = useMemo(
        () => ({ language, setLanguage }),
        [language],
    );

    return (
        <LanguageProvider value={languageValue}>
            <div className="min-h-screen bg-red-800 text-white">
                <Header />
                <main className="flex flex-col gap-y-2 md:gap-y-10">
                    <IntroSection />
                    <SupportSection logos={logos} />
                    <AboutSection />
                    <OrganizationSection organizations={organizations} />
                </main>
                <Footer />
                <SubscribeSection />
            </div>
        </LanguageProvider>
    );
};

export default Home;
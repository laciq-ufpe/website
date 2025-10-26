import { useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import AboutSection from "~/sections/about";
import Footer from "~/sections/footer";
import Header from "~/sections/header";
import IntroSection from "~/sections/intro";
import OrganizationSection, { type OrganizationCard } from "~/sections/organization";
import SubscribeSection from "~/sections/subscribe";
import SupportSection from "~/sections/support";

const IMAGE_PATTERN = /\.(png|jpe?g|svg|webp|gif)$/i;

const organizationCatalog: Array<Omit<OrganizationCard, "image"> & { file: string }> = [
    {
        file: "logo_laciq.png",
        name: "Liga Acadêmica de Computação e Informação Quântica da UFPE",
        bullets: [
            "Primeira Liga Acadêmica de Quântica do Brasil",
            "Plataforma ativa para ensino, pesquisa e extensão em tecnologias emergentes;",
            "Professores, membros e colaboradores com pesquisa em quântica.",
        ],
    },
    {
        file: "logo_quanta.png",
        name: "Instituto de Tecnologias Quânticas da UFPE",
        bullets: [
            "Hub de pesquisa, formação e inovação em tecnologias quânticas;",
            "Infraestrutura pioneira para PC quântico fotônico e rede de chaves quânticas;",
            "Desenvolvimento integrado de hardware e software quânticos com parceiros acadêmicos e industriais.",
        ],
    },
    {
        file: "logo_cin.png",
        name: "Centro de Informática da UFPE",
        bullets: [
            "Referência nacional e internacional em computação;",
            "Parcerias com indústria e Porto Digital: histórico de colaborações e >40 empresas conectadas;",
            "Programa Acadêmico em Ciência da Computação com nota máxima no CAPES (7).",
        ],
    },
    {
        file: "logo_ccen.png",
        name: "Centro de Ciências Exatas e da Natureza da UFPE",
        bullets: [
            "Portfólio com 8 graduações (bacharelados e licenciaturas, presencial e EAD);",
            "Programas de pós CAPES 5–7, com produção e projetos competitivos;",
            "Iniciativas contínuas que aproximam empresas, escolas e sociedade.",
        ],
    },
    {
        file: "logo_ctg.png",
        name: "Centro de Tecnologia e Geociências",
        bullets: [
            "Integra Engenharias, Arquitetura e áreas de Geociências em um mesmo centro;",
            "Múltiplos laboratórios de ensino, P&D e serviços tecnológicos;",
            "Serviços e projetos técnicos em áreas de construção, energia, mineração e meio ambiente.",
        ],
    },
];

async function readDir(relativeDir: string) {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    try {
        return await fs.readdir(path.resolve(process.cwd(), relativeDir));
    } catch {
        return [];
    }
}

const toTitleCase = (filename: string) =>
    filename
        .replace(/\.[^/.]+$/, "")
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());

async function loadSponsorships() {
    const entries = await readDir("public/sponsorships");
    return entries
        .filter((name) => IMAGE_PATTERN.test(name))
        .sort((a, b) => a.localeCompare(b))
        .map((name) => `/sponsorships/${name}`);
}

async function loadOrganizations() {
    const entries = await readDir("public/organization");
    const available = new Set(entries.filter((name) => IMAGE_PATTERN.test(name)));

    const curated = organizationCatalog.flatMap(({ file, ...meta }) => {
        if (!available.delete(file)) return [];
        return [{ ...meta, image: `/organization/${file}` } satisfies OrganizationCard];
    });

    const extras = Array.from(available)
        .sort((a, b) => a.localeCompare(b))
        .map<OrganizationCard>((file) => ({
            name: toTitleCase(file),
            image: `/organization/${file}`,
            bullets: [],
        }));

    return [...curated, ...extras];
}

type LoaderData = {
    logos: string[];
    organizations: OrganizationCard[];
};

export async function loader(_: Route.LoaderArgs): Promise<LoaderData> {
    const [logos, organizations] = await Promise.all([loadSponsorships(), loadOrganizations()]);
    return { logos, organizations };
}

const Home = () => {
    const { logos, organizations } = useLoaderData<typeof loader>();

    return (
        <div className="min-h-screen bg-red-800 text-white">
            <Header />
            <main className="flex flex-col gap-y-10">
                <IntroSection />
                <SupportSection logos={logos} />
                <AboutSection />
                <OrganizationSection organizations={organizations} />
            </main>
            <Footer />
            <SubscribeSection />
        </div>
    );
};

export default Home;
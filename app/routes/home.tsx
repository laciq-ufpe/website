import { useLoaderData } from "react-router";
import type { Route } from "./+types/home";
import AboutSection from "~/sections/about";
import Header from "~/sections/header";
import IntroSection from "~/sections/intro";
import OrganizationSection, { type OrganizationCard } from "~/sections/organization";
import SubscribeSection from "~/sections/subscribe";
import SupportSection from "~/sections/support";

const IMAGE_PATTERN = /\.(png|jpe?g|svg|webp|gif)$/i;

const organizationCatalog: Array<Omit<OrganizationCard, "image"> & { file: string }> = [
  {
    file: "logo_laciq.png",
    name: "LACIQ",
    bullets: [
      "Primeira Liga Acadêmica de Quântica do Brasil",
      "Colaboração e produção acadêmica e científica",
      "Professores, membros e colaboradores com pesquisa em quântica",
    ],
  },
  {
    file: "logo_quanta.png",
    name: "Quanta",
    bullets: [
      "Instituto de Tecnologias Quânticas da UFPE",
      "Liderando investimento para construir computador fotônico",
      "Desenvolvimento de software e hardware quânticos",
    ],
  },
  {
    file: "logo_cin.png",
    name: "CIn",
    bullets: [
      "Centro de referência em computação e tecnologia",
      "Vasta experiência em parceria público-privada",
      "Programa acadêmico com nota máxima na Capes",
    ],
  },
  {
    file: "logo_ccen.png",
    name: "CCEN",
    bullets: [
      "Pós e pesquisa de excelência, com oito cursos de graduação",
      "Berço de produção intelectual e prêmios estudantis",
      "Reconhecimento nacional e regional",
    ],
  },
  {
    file: "logo_ctg.png",
    name: "CTG",
    bullets: [
      "Centro de Tecnologia e Geociências da UFPE",
      "Integra áreas de engenharia, arquitetura e geociências",
      "Fomento a projetos de alto impacto regional",
    ],
  },
];

async function readImageDirectory(relativeDir: string) {
  const fs = await import("node:fs/promises");
  const path = await import("node:path");
  try {
    const absolute = path.resolve(process.cwd(), relativeDir);
    return await fs.readdir(absolute);
  } catch {
    return [];
  }
}

function toTitleCase(filename: string) {
  return filename
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

async function buildSponsorshipLogos() {
  const entries = await readImageDirectory("public/sponsorships");
  return entries
    .filter((name) => IMAGE_PATTERN.test(name))
    .sort((a, b) => a.localeCompare(b))
    .map((name) => `/sponsorships/${name}`);
}

async function buildOrganizations() {
  const entries = await readImageDirectory("public/organization");
  const available = new Set(entries.filter((name) => IMAGE_PATTERN.test(name)));

  const prioritized = organizationCatalog.flatMap(({ file, ...metadata }) => {
    if (!available.delete(file)) {
      return [];
    }
    return [
      {
        ...metadata,
        image: `/organization/${file}`,
      } satisfies OrganizationCard,
    ];
  });

  const fallback = Array.from(available)
    .sort((a, b) => a.localeCompare(b))
    .map<OrganizationCard>((file) => ({
      name: toTitleCase(file),
      image: `/organization/${file}`,
      bullets: [],
    }));

  return [...prioritized, ...fallback];
}

type LoaderData = {
  logos: string[];
  organizations: OrganizationCard[];
};

export async function loader(_: Route.LoaderArgs): Promise<LoaderData> {
  const [logos, organizations] = await Promise.all([
    buildSponsorshipLogos(),
    buildOrganizations(),
  ]);
  return { logos, organizations };
}

const Home = () => {
  const { logos, organizations } = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-red-800 text-white">
      <Header />
      <main className="flex flex-col gap-y-8">
        <IntroSection />
        <SubscribeSection />
        <SupportSection logos={logos} />
        <AboutSection />
        <OrganizationSection organizations={organizations} />
      </main>
    </div>
  );
};

export default Home;
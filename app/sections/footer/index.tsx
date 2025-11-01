import { useLanguage, type Language } from "~/contexts/language";

type FooterLink = {
    label: string;
    href: string;
};

const FOOTER_CONTENT: Record<
    Language,
    {
        links: FooterLink[];
    }
> = {
    pt: {
        links: [
            { href: "mailto:laciq@cin.ufpe.br", label: "e-mail · laciq@cin.ufpe.br" },
            { href: "https://www.linkedin.com/company/laciq-ufpe", label: "LinkedIn · laciq-ufpe" },
            { href: "https://www.instagram.com/laciq.ufpe", label: "Instagram · @laciq.ufpe" },
        ],
    },
    en: {
        links: [
            { href: "mailto:laciq@cin.ufpe.br", label: "Email · laciq@cin.ufpe.br" },
            { href: "https://www.linkedin.com/company/laciq-ufpe", label: "LinkedIn · laciq-ufpe" },
            { href: "https://www.instagram.com/laciq.ufpe", label: "Instagram · @laciq.ufpe" },
        ],
    },
};

const Footer = () => {
    const { language } = useLanguage();
    const { links } = FOOTER_CONTENT[language];

    return (
        <footer className="layout-gutter pt-5 pb-6 md:py-8 bg-red-900/30 backdrop-blur-sm border-t border-white/20">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-lg font-semibold">LACIQ</p>
                <ul className="flex flex-col gap-1.5 text-sm uppercase tracking-wide md:flex-row md:gap-15">
                    {links.map((link) => (
                        <li key={link.href}>
                            <a
                                className="transition-opacity hover:opacity-80"
                                href={link.href}
                                target={link.href.startsWith("http") ? "_blank" : undefined}
                                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
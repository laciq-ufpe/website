import { useLanguage, type Language } from "~/contexts/language";

const NAV_ITEMS: Record<Language, Array<{ label: string; href: string }>> = {
    pt: [
        { label: "Apoio", href: "#apoio" },
        { label: "Sobre", href: "#sobre" },
        { label: "Organização", href: "#organizacao" },
    ],
    en: [
        { label: "Support", href: "#apoio" },
        { label: "About", href: "#sobre" },
        { label: "Organization", href: "#organizacao" },
    ],
};

const LANGUAGE_META: Record<Language, { label: string; flag: string; aria: string }> = {
    pt: {
        label: "Português",
        flag: "flags/brazil_flag.png",
        aria: "Switch to English",
    },
    en: {
        label: "English",
        flag: "flags/usa_flag.png",
        aria: "Switch to Portuguese",
    },
};

const Header = () => {
    const { language, setLanguage } = useLanguage();
    const navItems = NAV_ITEMS[language];
    const { label, flag, aria } = LANGUAGE_META[language];
    const nextLanguage = language === "pt" ? "en" : "pt";
    const nextLabel = LANGUAGE_META[nextLanguage].label;

    const handleToggle = () => {
        setLanguage(nextLanguage);
    };

    return (
        <header className="layout-gutter flex flex-col gap-4 py-5 bg-red-900/40 backdrop-blur md:flex-row md:items-center md:justify-between">
            <p className="text-2xl font-semibold">II SCIQ</p>
            <div className="flex flex-wrap items-center gap-3 md:gap-6">
                <nav aria-label={language === "pt" ? "Seções principais" : "Main sections"}>
                    <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 md:flex-nowrap">
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    className="text-lg transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={handleToggle}
                        className="flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.32em] transition-all hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        aria-label={aria}
                    >
                        <img
                            src={`${import.meta.env.BASE_URL}${flag}`}
                            alt={label}
                            className="h-4 w-6 rounded-sm object-cover shadow-sm ring-1 ring-black/30"
                            loading="lazy"
                            decoding="async"
                        />
                        <span className="tracking-[0.28em]">{label}</span>
                        <span className="opacity-70">/ {nextLabel}</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
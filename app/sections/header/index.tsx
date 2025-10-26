const NAV_ITEMS = [
    { label: "Apoio", href: "#apoio" },
    { label: "Sobre", href: "#sobre" },
    { label: "Organização", href: "#organizacao" },
];

const Header = () => {
    return (
        <header className="layout-gutter flex flex-row items-center justify-between py-5 bg-red-900/40 backdrop-blur">
            <p className="text-2xl font-semibold">II SCIQ</p>
            <nav aria-label="Seções principais">
                <ul className="flex flex-row items-center gap-x-5">
                    {NAV_ITEMS.map((item) => (
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
        </header>
    );
};

export default Header;
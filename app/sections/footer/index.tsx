const Footer = () => {
    return (
        <footer className="layout-gutter pt-5 pb-6 md:py-8 bg-red-900/30 backdrop-blur-sm border-t border-white/20">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-lg font-semibold">LACIQ</p>
                <ul className="flex flex-col gap-1.5 text-sm uppercase tracking-wide md:flex-row md:gap-15">
                    <li>
                        <a className="transition-opacity hover:opacity-80" href="mailto:laciq@cin.ufpe.br">
                            e-mail · laciq@cin.ufpe.br
                        </a>
                    </li>
                    <li>
                        <a className="transition-opacity hover:opacity-80" href="https://www.linkedin.com/company/laciq-ufpe" target="_blank" rel="noopener noreferrer">
                            LinkedIn · laciq-ufpe
                        </a>
                    </li>
                    <li>
                        <a className="transition-opacity hover:opacity-80" href="https://www.instagram.com/laciq.ufpe" target="_blank" rel="noopener noreferrer">
                            Instagram · @laciq.ufpe
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
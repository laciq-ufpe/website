import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";

export type OrganizationCard = {
    name: string;
    image: string;
    bullets: string[];
    description?: string;
};

type OrganizationSectionProps = {
    organizations: OrganizationCard[];
};

const getCardsPerView = (count: number, width?: number) => {
    if (count <= 0) return 1;
    if (width === undefined) return 1;
    if (width >= 1280) return Math.min(3, count);
    if (width >= 768) return Math.min(2, count);
    return 1;
};

const useResponsiveCardsPerView = (total: number) => {
    const [cardsPerView, setCardsPerView] = useState(() =>
        getCardsPerView(total, typeof window === "undefined" ? undefined : window.innerWidth),
    );

    useEffect(() => {
        setCardsPerView((current) => {
            const next = getCardsPerView(total, typeof window === "undefined" ? undefined : window.innerWidth);
            return current === next ? current : next;
        });
    }, [total]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const handleResize = () => setCardsPerView(getCardsPerView(total, window.innerWidth));
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [total]);

    return cardsPerView;
};

type TrackStyle = CSSProperties & { "--org-cards-per-view": string };

const OrganizationSection = ({ organizations }: OrganizationSectionProps) => {
    const total = organizations.length;
    const cardsPerView = useResponsiveCardsPerView(total);
    const pageCount = useMemo(
        () => Math.max(1, Math.ceil(total / cardsPerView)),
        [cardsPerView, total],
    );
    const isSinglePage = pageCount <= 1;
    const [page, setPage] = useState(0);

    useEffect(() => {
        setPage((prev) => Math.min(prev, pageCount - 1));
    }, [pageCount]);

    const handlePrev = useCallback(() => {
        if (isSinglePage) return;
        setPage((prev) => (prev - 1 + pageCount) % pageCount);
    }, [isSinglePage, pageCount]);

    const handleNext = useCallback(() => {
        if (isSinglePage) return;
        setPage((prev) => (prev + 1) % pageCount);
    }, [isSinglePage, pageCount]);

    useEffect(() => {
        if (isSinglePage) return;
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                handlePrev();
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                handleNext();
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [handleNext, handlePrev, isSinglePage]);

    if (!total) {
        return (
            <section id="organizacao" className="px-50 py-10" aria-label="Organização">
                <h1 className="text-3xl mb-4">Organização</h1>
                <p className="opacity-70">Nenhuma organização cadastrada.</p>
            </section>
        );
    }

    const trackStyle = useMemo<TrackStyle>(
        () => ({
            transform: `translateX(-${page * 100}%)`,
            "--org-cards-per-view": cardsPerView.toString(),
        }),
        [cardsPerView, page],
    );

    const startIndex = page * cardsPerView;
    const endIndex = Math.min(total, startIndex + cardsPerView);
    const remainder = total % cardsPerView;
    const fillerCount =
        !isSinglePage && remainder !== 0 ? cardsPerView - remainder : 0;

    return (
        <section id="organizacao" className="layout-gutter py-10" aria-label="Organização">
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-3xl mb-6 md:mb-0">Organização</h1>
                {!isSinglePage && (
                    <div className="flex items-center gap-2" role="group" aria-label="Controles do carrossel de organizações">
                        <button
                            type="button"
                            className="org-nav-button"
                            onClick={handlePrev}
                            aria-label="Organização anterior"
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            className="org-nav-button"
                            onClick={handleNext}
                            aria-label="Próxima organização"
                        >
                            ›
                        </button>
                    </div>
                )}
            </div>

            <div
                className="org-carousel"
                role="region"
                aria-roledescription="carousel"
                aria-live="polite"
                aria-label="Galeria de organizações"
            >
                <div className="org-viewport">
                    <div className="org-track" style={trackStyle}>
                        {organizations.map((org, index) => {
                            const cardId = `organization-card-${index}`;
                            const isVisible = index >= startIndex && index < endIndex;

                            return (
                                <article
                                    key={org.image}
                                    className="org-card"
                                    aria-hidden={isVisible ? undefined : true}
                                    aria-label={org.name}
                                    tabIndex={isVisible ? 0 : -1}
                                >
                                    <img
                                        src={org.image}
                                        alt={`Logo de ${org.name}`}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    {org.description && (
                                        <p className="text-base text-center opacity-80 leading-relaxed">
                                            {org.description}
                                        </p>
                                    )}
                                    {org.bullets.length > 0 && (
                                        <ul className="org-card-list" role="list">
                                            {org.bullets.map((bullet, bulletIndex) => (
                                                <li key={`${cardId}-bullet-${bulletIndex}`}>
                                                    {bullet}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </article>
                            );
                        })}
                        {Array.from({ length: fillerCount }, (_, fillerIndex) => (
                            <article
                                key={`org-placeholder-${fillerIndex}`}
                                className="org-card org-card--placeholder"
                                aria-hidden="true"
                                tabIndex={-1}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {!isSinglePage && (
                <p className="mt-4 text-sm text-center opacity-70">
                    {page + 1} / {pageCount}
                </p>
            )}
        </section>
    );
};

export default OrganizationSection;
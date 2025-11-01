import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { useLanguage, type Language } from "~/contexts/language";

export type OrganizationCard = {
    name: string;
    image: string;
    bullets: string[];
    description?: string;
};

type OrganizationSectionProps = {
    organizations: OrganizationCard[];
};

const selectCardsPerView = (count: number, width?: number) => {
    if (count <= 0) return 1;
    if (!width) return 1;
    if (width >= 1280) return Math.min(3, count);
    if (width >= 768) return Math.min(2, count);
    return 1;
};

const useCardsPerView = (total: number) => {
    const [cardsPerView, setCardsPerView] = useState(() =>
        selectCardsPerView(total, typeof window === "undefined" ? undefined : window.innerWidth),
    );

    useEffect(() => {
        const target = selectCardsPerView(
            total,
            typeof window === "undefined" ? undefined : window.innerWidth,
        );
        setCardsPerView((prev) => (prev === target ? prev : target));
    }, [total]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const handleResize = () =>
            setCardsPerView(selectCardsPerView(total, window.innerWidth));
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [total]);

    return cardsPerView;
};

type TrackStyle = CSSProperties & {
    "--org-cards-per-view": string;
    "--org-card-gap"?: string;
};

const TEXT: Record<
    Language,
    {
        sectionLabel: string;
        title: string;
        empty: string;
        controlsLabel: string;
        prevLabel: string;
        nextLabel: string;
        carouselLabel: string;
        logoAlt: (name: string) => string;
        pageIndicator: (page: number, total: number) => string;
    }
> = {
    pt: {
        sectionLabel: "Organização",
        title: "Organização",
        empty: "Nenhuma organização cadastrada.",
        controlsLabel: "Controles do carrossel de organizações",
        prevLabel: "Organização anterior",
        nextLabel: "Próxima organização",
        carouselLabel: "Galeria de organizações",
        logoAlt: (name) => `Logo de ${name}`,
        pageIndicator: (page, total) => `${page} / ${total}`,
    },
    en: {
        sectionLabel: "Organization",
        title: "Organization",
        empty: "No organizing institutions registered.",
        controlsLabel: "Organization carousel controls",
        prevLabel: "Previous organization",
        nextLabel: "Next organization",
        carouselLabel: "Organization gallery",
        logoAlt: (name) => `Logo of ${name}`,
        pageIndicator: (page, total) => `Page ${page} of ${total}`,
    },
};

const OrganizationSection = ({ organizations }: OrganizationSectionProps) => {
    const { language } = useLanguage();
    const text = TEXT[language];
    const total = organizations.length;

    if (!total) {
        return (
            <section id="organizacao" className="layout-gutter pt-6 pb-0 md:pt-10 md:pb-12" aria-label={text.sectionLabel}>
                <h1 className="text-3xl mb-4">{text.title}</h1>
                <p className="opacity-70">{text.empty}</p>
            </section>
        );
    }

    const cardsPerView = useCardsPerView(total);
    const isSingleCardView = cardsPerView === 1;
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

    const trackStyle = useMemo<TrackStyle>(() => {
        const style: TrackStyle = {
            transform: `translateX(-${page * 100}%)`,
            "--org-cards-per-view": cardsPerView.toString(),
        };
        if (cardsPerView === 1) {
            style["--org-card-gap"] = "0px";
        }
        return style;
    }, [cardsPerView, page]);

    const remainder = total % cardsPerView;
    const fillerCount =
        !isSinglePage && remainder !== 0 ? cardsPerView - remainder : 0;

    return (
        <section id="organizacao" className="layout-gutter pt-6 pb-0 md:pt-10 md:pb-12" aria-label={text.sectionLabel}>
            <div className="flex items-center justify-between gap-4">
                <h1 className="text-3xl">{text.title}</h1>
                {!isSinglePage && (
                    <div
                        className="flex items-center gap-2"
                        role="group"
                        aria-label={text.controlsLabel}
                    >
                        <button
                            type="button"
                            className="org-nav-button"
                            onClick={handlePrev}
                            aria-label={text.prevLabel}
                        >
                            ‹
                        </button>
                        <button
                            type="button"
                            className="org-nav-button"
                            onClick={handleNext}
                            aria-label={text.nextLabel}
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
                aria-label={text.carouselLabel}
            >
                <div
                    className="org-viewport"
                    data-single={isSingleCardView ? "true" : "false"}
                >
                    <div
                        className="org-track"
                        style={trackStyle}
                        data-single={isSingleCardView ? "true" : "false"}
                    >
                        {organizations.map((org) => (
                            <article
                                key={org.image}
                                className="org-card"
                                aria-label={org.name}
                                tabIndex={0}
                            >
                                <img
                                    src={org.image}
                                    alt={text.logoAlt(org.name)}
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="org-card-body">
                                    {org.description && (
                                        <p className="org-card-description">
                                            {org.description}
                                        </p>
                                    )}
                                    {org.bullets.length > 0 && (
                                        <ul className="org-card-list" role="list">
                                            {org.bullets.map((bullet, bulletIndex) => (
                                                <li key={`${org.name}-bullet-${bulletIndex}`}>
                                                    <span>{bullet}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </article>
                        ))}
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
                    {text.pageIndicator(page + 1, pageCount)}
                </p>
            )}
        </section>
    );
};

export default OrganizationSection;
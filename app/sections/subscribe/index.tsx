const SubscribeSection = () => {
    return (
        <button
            type="button"
            className="floating-cta group inline-flex flex-col items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-18 py-4 text-center uppercase text-neutral-900 shadow-2xl transition-all duration-200 hover:translate-y-[-2px] hover:from-amber-300 hover:via-amber-400 hover:to-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
            aria-label="Abrir inscrições para o II SCIQ"
        >
            <span className="floating-cta__label text-xl font-semibold tracking-wide">Inscreva-se</span>
            <span className="floating-cta__hint text-xs font-medium uppercase tracking-[0.3em] text-neutral-950/80">
                Vagas limitadas
            </span>
        </button>
    );
};

export default SubscribeSection;
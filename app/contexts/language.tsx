import { createContext, useContext, type ReactNode } from "react";

export type Language = "pt" | "en";

type LanguageContextValue = {
    language: Language;
    setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

type LanguageProviderProps = {
    value: LanguageContextValue;
    children: ReactNode;
};

export const LanguageProvider = ({ value, children }: LanguageProviderProps) => (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
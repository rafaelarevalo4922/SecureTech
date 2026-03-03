"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-1 p-1 rounded-full bg-secondary/50 border border-border">
            <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${language === 'es' ? 'bg-brand-500 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
            >
                ES
            </button>
            <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${language === 'en' ? 'bg-brand-500 text-white shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
            >
                EN
            </button>
        </div>
    );
}

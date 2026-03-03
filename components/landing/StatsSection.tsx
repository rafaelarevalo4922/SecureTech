"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';

export function StatsSection() {
    const { t } = useLanguage();

    return (
        <section className="border-y border-border bg-secondary/30 py-12 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-widest mb-8">
                    {t.stats.title}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-border">
                    <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
                        <span className="font-outfit text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-brand-600">
                            {t.stats.stat1Value}
                        </span>
                        <span className="text-sm font-medium text-foreground mt-2">{t.stats.stat1Label}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
                        <span className="font-outfit text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-brand-600">
                            {t.stats.stat2Value}
                        </span>
                        <span className="text-sm font-medium text-foreground mt-2">{t.stats.stat2Label}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center pt-8 md:pt-0">
                        <span className="font-outfit text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-400 to-brand-600">
                            {t.stats.stat3Value}
                        </span>
                        <span className="text-sm font-medium text-foreground mt-2">{t.stats.stat3Label}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

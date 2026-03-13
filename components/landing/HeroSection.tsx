"use client";

import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from '@/lib/i18n/LanguageContext';

export function HeroSection() {
    const { t } = useLanguage();

    return (
        <section className="relative px-4 py-32 md:py-48 flex flex-col items-center text-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-background to-background -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center max-w-4xl gap-6"
            >
                <div className="inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-500">
                    <Shield className="mr-2 h-4 w-4" />
                    {t.hero.badge}
                </div>
                <h1 className="font-outfit text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
                    {t.hero.title1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-300">{t.hero.title2}</span>
                </h1>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                    Tu negocio más ordenado, automatizado y seguro — sin complicaciones técnicas.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
                    <Link href="/auditoria" className="inline-flex items-center justify-center rounded-md bg-brand-600 px-8 py-3 text-sm font-medium text-white hover:bg-brand-500 transition-colors shadow-lg shadow-brand-500/20">
                        {t.hero.ctaPrimary}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    <Link href="/dashboard" className="inline-flex items-center justify-center rounded-md border border-border bg-transparent px-8 py-3 text-sm font-medium hover:bg-muted transition-colors">
                        {t.hero.ctaSecondary}
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}

"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
    const { t } = useLanguage();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-2 font-outfit text-xl font-bold">
                    <ShieldCheck className="h-6 w-6 text-brand-500" />
                    <span>SecureTech</span>
                </div>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.features}</Link>
                    <Link href="#solutions" className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.solutions}</Link>
                    <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.pricing}</Link>
                    <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.dashboards}</Link>
                    <LanguageSwitcher />
                </nav>
                <div className="flex items-center gap-4">
                    <Link href="/login" className="hidden sm:inline-flex text-sm font-medium text-muted-foreground hover:text-foreground">{t.nav.login}</Link>
                    <Link href="#quote" className="text-sm font-medium bg-foreground text-background px-4 py-2 rounded-md hover:bg-foreground/90 transition-colors">{t.nav.getStarted}</Link>
                </div>
            </div>
        </header>
    );
}

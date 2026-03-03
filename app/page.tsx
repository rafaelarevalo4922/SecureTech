"use client";

import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { StepByStepSection } from "@/components/landing/StepByStepSection";
import { DashboardPreviewSection } from "@/components/landing/DashboardPreviewSection";
import { ModuleQuoteForm } from "@/components/landing/ModuleQuoteForm";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ShieldCheck } from "lucide-react";

export default function Home() {
    const { t } = useLanguage();

    return (
        <main className="flex min-h-screen flex-col bg-background">
            <Navbar />
            <HeroSection />
            <StatsSection />
            <DashboardPreviewSection />
            <ServicesSection />
            <StepByStepSection />
            <ModuleQuoteForm />

            <footer className="border-t border-border py-12 px-4 md:px-8 bg-card">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 font-outfit text-xl font-bold">
                        <ShieldCheck className="h-6 w-6 text-brand-500" />
                        <span>SecureTech</span>
                    </div>
                    <p className="text-muted-foreground text-sm text-center md:text-left">
                        {t.footer.rights}
                    </p>
                </div>
            </footer>
        </main>
    );
}

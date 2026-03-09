"use client";

import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { DashboardPreviewSection } from "@/components/landing/DashboardPreviewSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { PortfolioSection } from "@/components/landing/PortfolioSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { WhatsAppButton } from "@/components/landing/WhatsAppButton";
import { ExitIntentPopup } from "@/components/landing/ExitIntentPopup";
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
            <ProcessSection />
            <ServicesSection />
            <AboutSection />
            <PortfolioSection />
            <TestimonialsSection />
            <FAQSection />
            <WhatsAppButton />
            <ExitIntentPopup />

            <footer className="border-t border-border py-12 px-4 md:px-8 bg-card">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 font-outfit text-xl font-bold">
                        <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-slate-700 cursor-pointer">
                            <img src="https://i.pravatar.cc/150?u=admin" className="w-full h-full object-cover" alt="Admin" />
                        </div>
                        <span>Nextrova</span>
                    </div>
                    <p className="text-muted-foreground text-sm text-center md:text-left">
                        {t.footer.rights}
                    </p>
                </div>
            </footer>
        </main>
    );
}

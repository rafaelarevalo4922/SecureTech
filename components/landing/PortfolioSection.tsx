"use client";

import { motion } from "framer-motion";
import { ExternalLink, CheckCircle } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function PortfolioSection() {
    const { t } = useLanguage();

    const projects = t.portfolio.projects.map((p: any, i: number) => ({
        ...p,
        image: i === 0
            ? "/portfolio/security_audit_mockup_1773026831266.png"
            : i === 1
                ? "/portfolio/crm_dashboard_mockup_1773026795524.png"
                : "/portfolio/sales_performance_dashboard_mockup_1773028716401.png",
        tags: i === 0 ? ["Sales", "Commissions", "Dashboard"] : i === 1 ? ["CRM", "Leads", "Automation"] : ["KPIs", "Performance", "Cloud"]
    }));

    return (
        <section id="solutions" className="py-24 px-4 md:px-8 bg-background">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-outfit text-3xl font-bold sm:text-4xl">{t.portfolio.title}</h2>
                    <p className="mt-4 text-muted-foreground text-lg">{t.portfolio.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {projects.map((p, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-brand-500/50 transition-all shadow-sm"
                        >
                            <div className="h-64 overflow-hidden relative border-b border-border">
                                <img
                                    src={p.image}
                                    alt={p.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                                    <div className="text-white text-xs font-bold uppercase tracking-widest">{p.status}</div>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="text-xs font-bold text-brand-500 uppercase tracking-widest mb-1">{p.client}</div>
                                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                                <p className="text-sm text-muted-foreground mb-4">{p.desc}</p>
                                <div className="flex flex-wrap gap-2">
                                    {p.tags.map((tag: string, idx: number) => (
                                        <span key={idx} className="px-2 py-1 bg-secondary text-[10px] rounded-md font-medium">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

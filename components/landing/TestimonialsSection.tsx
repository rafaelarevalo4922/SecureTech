"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function TestimonialsSection() {
    const { t } = useLanguage();
    const logos = ["CorpA", "GlobalTech", "EcoSystem", "DataFlow", "PrimeLogic"];

    return (
        <section className="py-24 px-4 md:px-8 bg-background">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-outfit text-3xl font-bold sm:text-4xl">{t.testimonials.title}</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {t.testimonials.items.map((t: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-card border border-border p-8 rounded-2xl relative"
                        >
                            <Quote className="absolute top-4 right-4 h-8 w-8 text-brand-500/20" />
                            <p className="text-muted-foreground italic mb-6">"{t.text}"</p>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold">
                                    {t.avatar}
                                </div>
                                <div>
                                    <div className="font-bold text-sm">{t.author}</div>
                                    <div className="text-xs text-muted-foreground">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="border-t border-border pt-16">
                    <p className="text-center text-sm text-muted-foreground uppercase tracking-widest mb-10">{t.testimonials.trust}</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
                        {logos.map((logo, i) => (
                            <span key={i} className="text-2xl font-black font-outfit">{logo}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

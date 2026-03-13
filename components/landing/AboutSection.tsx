"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function AboutSection() {
    const { t } = useLanguage();

    return (
        <section id="about" className="py-24 px-4 md:px-8 bg-card">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="font-outfit text-3xl font-bold sm:text-4xl mb-6">{t.about.title}</h2>
                        <p className="text-muted-foreground text-lg mb-6">
                            {t.about.p1}
                        </p>
                        <p className="text-muted-foreground mb-6">
                            {t.about.p2}
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <div className="text-brand-500 font-bold text-2xl">{t.about.mission.title}</div>
                                <p className="text-sm text-muted-foreground">{t.about.mission.desc}</p>
                            </div>
                            <div>
                                <div className="text-brand-500 font-bold text-2xl">{t.about.vision.title}</div>
                                <p className="text-sm text-muted-foreground">{t.about.vision.desc}</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-brand-600/20 to-purple-600/20 z-10" />
                        <div className="flex items-center justify-center h-full bg-secondary/50 border border-border p-8">
                            <img 
                                src="/logoSystrategy.png" 
                                alt="Systrategy Full Logo" 
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

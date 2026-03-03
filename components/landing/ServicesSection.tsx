"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { LockKeyhole, BarChart4, Server } from "lucide-react";
import { motion } from "framer-motion";

export function ServicesSection() {
    const { t } = useLanguage();

    const services = [
        {
            icon: <LockKeyhole className="h-10 w-10 text-brand-500" />,
            title: t.features.f1Title,
            desc: t.features.f1Desc
        },
        {
            icon: <BarChart4 className="h-10 w-10 text-brand-500" />,
            title: t.features.f2Title,
            desc: t.features.f2Desc
        },
        {
            icon: <Server className="h-10 w-10 text-brand-500" />,
            title: t.features.f3Title,
            desc: t.features.f3Desc
        }
    ];

    return (
        <section id="features" className="py-24 px-4 md:px-8 bg-background">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-outfit text-3xl font-bold sm:text-4xl">{t.features.title}</h2>
                    <p className="mt-4 text-muted-foreground text-lg">{t.features.subtitle}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="bg-card border border-border rounded-xl p-8 flex flex-col gap-4 hover:border-brand-500/50 transition-colors shadow-sm"
                        >
                            <div className="bg-brand-500/10 w-16 h-16 rounded-lg flex items-center justify-center">
                                {feature.icon}
                            </div>
                            <h3 className="font-outfit text-xl font-bold">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

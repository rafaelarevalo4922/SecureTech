"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { motion } from "framer-motion";

export function StepByStepSection() {
    const { t } = useLanguage();

    const steps = [
        { num: "01", title: t.steps.s1Title, desc: t.steps.s1Desc },
        { num: "02", title: t.steps.s2Title, desc: t.steps.s2Desc },
        { num: "03", title: t.steps.s3Title, desc: t.steps.s3Desc },
        { num: "04", title: t.steps.s4Title, desc: t.steps.s4Desc },
    ];

    return (
        <section id="solutions" className="py-24 px-4 md:px-8 bg-secondary/20">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="font-outfit text-3xl font-bold sm:text-4xl">{t.steps.title}</h2>
                </div>

                <div className="grid md:grid-cols-4 gap-8">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            className="relative flex flex-col gap-4 p-6 rounded-2xl bg-card border border-border shadow-sm"
                        >
                            <div className="text-5xl font-extrabold text-brand-500/20 absolute top-4 right-4">
                                {step.num}
                            </div>
                            <h3 className="font-outfit text-xl font-bold mt-8 relative z-10">{step.title}</h3>
                            <p className="text-muted-foreground relative z-10">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

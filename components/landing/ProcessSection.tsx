"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { CheckCircle2, Search, FileText, Rocket, ChevronRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export const ProcessSection = () => {
    const { t } = useLanguage();

    const steps = [
        {
            id: "01",
            icon: <Search className="w-8 h-8 text-blue-500" />,
            title: t.steps.s1Title,
            desc: t.steps.s1Desc,
            color: "blue"
        },
        {
            id: "02",
            icon: <FileText className="w-8 h-8 text-purple-500" />,
            title: t.steps.s2Title,
            desc: t.steps.s2Desc,
            color: "purple"
        },
        {
            id: "03",
            icon: <CheckCircle2 className="w-8 h-8 text-emerald-500" />,
            title: t.steps.s3Title,
            desc: t.steps.s3Desc,
            color: "emerald"
        },
        {
            id: "04",
            icon: <Rocket className="w-8 h-8 text-orange-500" />,
            title: t.steps.s4Title,
            desc: t.steps.s4Desc,
            color: "orange"
        }
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-slate-950">
            {/* Background elements */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                        Cómo <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Transformamos</span> tu Negocio
                    </h2>
                    <p className="text-slate-400 text-lg">
                        Un proceso claro y transparente diseñado para llevar tu infraestructura tecnológica al siguiente nivel.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                    {/* Connection lines (hidden on mobile) */}
                    <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-slate-800 to-transparent -translate-y-1/2 z-0" />

                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            className="relative z-10"
                        >
                            <div className="group bg-slate-900/40 backdrop-blur-sm border border-white/5 rounded-[32px] p-8 h-full hover:border-blue-500/30 transition-all hover:translate-y-[-8px] hover:shadow-2xl hover:shadow-blue-500/10">
                                <div className="text-5xl font-black text-white/5 absolute top-4 right-8 select-none group-hover:text-blue-500/10 transition-colors">
                                    {step.id}
                                </div>

                                <div className={`w-16 h-16 rounded-2xl bg-${step.color}-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {step.icon}
                                </div>

                                <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">
                                    {step.title}
                                </h3>

                                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                    {step.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="/auditoria"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-blue-500/20 group"
                    >
                        Agenda tu Diagnóstico Gratis — Solo 5 espacios
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

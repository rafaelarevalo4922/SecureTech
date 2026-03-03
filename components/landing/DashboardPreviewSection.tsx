"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BarChart3, Database, ShieldCheck } from 'lucide-react';

export function DashboardPreviewSection() {
    const { t } = useLanguage();

    return (
        <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-background to-secondary/30 overflow-hidden">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">

                    {/* Text Content */}
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-500">
                            Premium Interfaces
                        </div>
                        <h2 className="font-outfit text-3xl font-bold sm:text-4xl md:text-5xl leading-tight">
                            Experience software designed for absolute clarity.
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            We don't just build functional systems; we build beautiful, intuitive interfaces that your team will love to use. Stop wrestling with clunky legacy software.
                        </p>
                        <ul className="space-y-3">
                            {[
                                { icon: <BarChart3 className="h-5 w-5 text-brand-500" />, text: "Real-time interactive analytics" },
                                { icon: <ShieldCheck className="h-5 w-5 text-brand-500" />, text: "Enterprise-grade RBAC controls" },
                                { icon: <Database className="h-5 w-5 text-brand-500" />, text: "Seamless data integration" }
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-muted-foreground">
                                    {item.icon}
                                    <span className="font-medium">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="pt-4">
                            <Link href="/dashboard" className="inline-flex items-center justify-center rounded-md bg-foreground text-background px-6 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors">
                                {t.hero.ctaSecondary}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Image/Mockup Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 w-full relative h-[400px]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-brand-600/20 to-transparent blur-3xl -z-10 rounded-full" />
                        <div className="border border-border/50 bg-card/80 backdrop-blur rounded-2xl shadow-2xl overflow-hidden p-2 absolute inset-0 -right-20">
                            {/* Fake Browser header */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 mb-4 bg-muted/30 rounded-t-xl">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                </div>
                                <div className="mx-auto w-1/2 h-6 bg-background rounded-md text-[10px] text-center flex items-center justify-center text-muted-foreground border border-border/50">
                                    app.securetech.com/dashboard
                                </div>
                            </div>

                            {/* Fake Dashboard body */}
                            <div className="grid grid-cols-3 gap-4 px-4 pb-4">
                                {/* Sidebar fake */}
                                <div className="col-span-1 space-y-2">
                                    <div className="h-8 w-full bg-brand-500/20 rounded-md"></div>
                                    <div className="h-8 w-full bg-muted/50 rounded-md"></div>
                                    <div className="h-8 w-full bg-muted/50 rounded-md"></div>
                                    <div className="h-8 w-full bg-muted/50 rounded-md"></div>
                                </div>
                                {/* Main content fake */}
                                <div className="col-span-2 space-y-4">
                                    <div className="h-24 w-full bg-gradient-to-r from-brand-500/20 to-purple-500/20 border border-brand-500/10 rounded-xl"></div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="h-32 bg-muted/30 border border-border/50 rounded-xl"></div>
                                        <div className="h-32 bg-muted/30 border border-border/50 rounded-xl"></div>
                                    </div>
                                    <div className="h-40 w-full bg-muted/30 border border-border/50 rounded-xl"></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

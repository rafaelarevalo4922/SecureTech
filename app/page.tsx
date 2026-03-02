"use client";

import { motion } from "framer-motion";
import { ShieldCheck, BarChart4, LockKeyhole, ArrowRight, Shield, Zap, Server } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col bg-background">
            {/* Navbar directly in Home for simplicity */}
            <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
                    <div className="flex items-center gap-2 font-outfit text-xl font-bold">
                        <ShieldCheck className="h-6 w-6 text-brand-500" />
                        <span>SecureTech</span>
                    </div>
                    <nav className="hidden md:flex gap-6 text-sm font-medium">
                        <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link>
                        <Link href="#solutions" className="text-muted-foreground hover:text-foreground transition-colors">Solutions</Link>
                        <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
                        <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboards</Link>
                    </nav>
                    <div className="flex items-center gap-4">
                        <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">Log in</Link>
                        <Link href="/register" className="text-sm font-medium bg-foreground text-background px-4 py-2 rounded-md hover:bg-foreground/90 transition-colors">Get Started</Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative px-4 py-32 md:py-48 flex flex-col items-center text-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-900/20 via-background to-background -z-10" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center max-w-4xl gap-6"
                >
                    <div className="inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-500">
                        <Shield className="mr-2 h-4 w-4" />
                        Enterprise-Grade Security Standards
                    </div>
                    <h1 className="font-outfit text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
                        Software Systems Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-300">Absolute Trust.</span>
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                        We build robust, secure, and scalable reporting and user management systems. Tailored to your exact requirements with uncompromising data protection.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
                        <Link href="#solutions" className="inline-flex items-center justify-center rounded-md bg-brand-600 px-8 py-3 text-sm font-medium text-white hover:bg-brand-500 transition-colors">
                            Explore Solutions
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                        <Link href="/dashboard" className="inline-flex items-center justify-center rounded-md border border-border bg-transparent px-8 py-3 text-sm font-medium hover:bg-muted transition-colors">
                            View Example Dashboards
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-4 md:px-8 bg-secondary/30">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="font-outfit text-3xl font-bold sm:text-4xl">Uncompromising Security & Control</h2>
                        <p className="mt-4 text-muted-foreground text-lg">Every module is built from the ground up to ensure your data is safe, your reports are accurate, and your business runs smoothly.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <LockKeyhole className="h-10 w-10 text-brand-500" />,
                                title: "Advanced User Security",
                                desc: "Granular access controls, Role-Based Access (RBAC), and top-tier encryption standards ensure that only authorized personnel access vital systems."
                            },
                            {
                                icon: <BarChart4 className="h-10 w-10 text-brand-500" />,
                                title: "Comprehensive Reporting",
                                desc: "Real-time interactive dashboards and downloadable reports give you complete visibility into operations, sales, and analytics."
                            },
                            {
                                icon: <Server className="h-10 w-10 text-brand-500" />,
                                title: "Reliable Hosting & Backups",
                                desc: "We host your customized application and perform rigorous annual backups to guarantee 99.99% uptime and data preservation."
                            }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                                className="bg-card border border-border rounded-xl p-8 flex flex-col gap-4 hover:border-brand-500/50 transition-colors"
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

            {/* Services & Pricing Section */}
            <section id="pricing" className="py-24 px-4 md:px-8">
                <div className="container mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="font-outfit text-3xl font-bold sm:text-4xl">Flexible Solutions & Pricing</h2>
                        <p className="mt-4 text-muted-foreground text-lg">We don't do "one size fits all." Our systems are priced based on the complexity and exact requirements of what your business needs.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* SaaS Model */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="border border-border rounded-2xl p-8 lg:p-10 flex flex-col gap-6 bg-card"
                        >
                            <div>
                                <div className="inline-flex mb-4 items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-500">
                                    Popular Delivery
                                </div>
                                <h3 className="font-outfit text-2xl font-bold">Managed Cloud Subscription</h3>
                                <p className="mt-2 text-muted-foreground">Perfect for businesses that want zero IT overhead. We handle the servers, the security, and the updates.</p>
                            </div>
                            <ul className="space-y-4 flex-1 mt-4">
                                {[
                                    "Monthly subscription tailored to complexity",
                                    "Hosted on our highly secure infrastructure",
                                    "Continuous security patches and updates",
                                    "24/7 Priority Support",
                                    "Included Annual System Backups"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <ShieldCheck className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/register" className="w-full mt-8 block text-center rounded-md bg-foreground text-background px-8 py-3 text-sm font-medium hover:bg-foreground/90 transition-colors">
                                Request Consultation
                            </Link>
                        </motion.div>

                        {/* Custom Ownership */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="border border-brand-500 rounded-2xl p-8 lg:p-10 flex flex-col gap-6 bg-gradient-to-b from-brand-900/10 to-transparent relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4">
                                <Zap className="h-6 w-6 text-brand-500" />
                            </div>
                            <div>
                                <div className="inline-flex mb-4 items-center rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-xs font-medium text-brand-500">
                                    Enterprise Independence
                                </div>
                                <h3 className="font-outfit text-2xl font-bold">Software Ownership</h3>
                                <p className="mt-2 text-muted-foreground">Buy the custom software outright. Ideal for enterprises with their own infrastructure or specific compliance needs.</p>
                            </div>
                            <ul className="space-y-4 flex-1 mt-4">
                                {[
                                    "One-time purchase based on requirements",
                                    "Self-host or deploy to your own AWS/Azure",
                                    "Full control over data residency",
                                    "Optional Maintenance & Update Contracts",
                                    "Annual Backup setup configuration included"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <ShieldCheck className="h-5 w-5 text-brand-500 shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                            <Link href="/register" className="w-full mt-8 block text-center rounded-md bg-brand-600 text-white px-8 py-3 text-sm font-medium hover:bg-brand-500 transition-colors">
                                Get Enterprise Quote
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border py-12 px-4 md:px-8 bg-card">
                <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 font-outfit text-xl font-bold">
                        <ShieldCheck className="h-6 w-6 text-brand-500" />
                        <span>SecureTech</span>
                    </div>
                    <p className="text-muted-foreground text-sm text-center md:text-left">
                        © 2026 SecureTech Software Services. All rights reserved. Building trust through code.
                    </p>
                </div>
            </footer>
        </main>
    );
}

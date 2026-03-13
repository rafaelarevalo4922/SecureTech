"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FAQSection() {
    const faqs = [
        {
            q: "¿En cuánto tiempo veo resultados reales?",
            a: "Dependiendo de la complejidad, un MVP (Producto Mínimo Viable) suele estar listo en 4 a 6 semanas. Proyectos corporativos más grandes pueden tomar de 3 a 6 meses."
        },
        {
            q: "¿El software nos pertenece o es una suscripción?",
            a: "Ofrecemos ambos modelos. Puedes optar por una licencia perpetua con pago único o un modelo de Software como Servicio (SaaS) con mantenimiento mensual incluido."
        },
        {
            q: "¿Puedo agregar funciones en el futuro sin romper todo?",
            a: "Nuestro software está diseñado para ser modular. Podemos agregar nuevos módulos o integrar APIs adicionales en cualquier momento sin afectar la arquitectura base."
        },
        {
            q: "¿Tienen soporte técnico después del lanzamiento?",
            a: "Sí, todos nuestros planes incluyen un periodo de garantía y soporte técnico. También ofrecemos planes de mantenimiento preventivo y correctivo 24/7."
        }
    ];

    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 px-4 md:px-8 bg-secondary/5">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="font-outfit text-3xl font-bold sm:text-4xl">Preguntas Frecuentes</h2>
                    <p className="mt-4 text-muted-foreground">Resolvemos tus dudas antes de empezar tu transformación digital.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-border rounded-xl bg-card overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                            >
                                <span className="font-bold">{faq.q}</span>
                                {openIndex === i ? <Minus className="h-5 w-5 text-brand-500" /> : <Plus className="h-5 w-5 text-brand-500" />}
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="p-6 pt-0 text-muted-foreground border-t border-border/50">
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

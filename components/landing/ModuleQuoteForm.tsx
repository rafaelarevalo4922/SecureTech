"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Mail } from 'lucide-react';

export function ModuleQuoteForm() {
    const { t } = useLanguage();
    const [selectedModules, setSelectedModules] = useState<string[]>([]);
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const modules = [
        { id: 'users', label: t.quote.moduleUsers },
        { id: 'products', label: t.quote.moduleProducts },
        { id: 'sales', label: t.quote.moduleSales },
        { id: 'customers', label: t.quote.moduleCustomers },
        { id: 'reports', label: t.quote.moduleReports },
    ];

    const toggleModule = (id: string) => {
        setSelectedModules(prev =>
            prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && selectedModules.length > 0) {
            setSubmitted(true);
            // Here you would typically send data to an API
        }
    };

    return (
        <section id="quote" className="py-24 px-4 md:px-8 border-t border-border">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="font-outfit text-3xl font-bold sm:text-4xl">{t.quote.title}</h2>
                    <p className="mt-4 text-muted-foreground text-lg">{t.quote.subtitle}</p>
                </div>

                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-brand-500/10 border border-brand-500 rounded-2xl p-12 text-center"
                    >
                        <div className="w-16 h-16 bg-brand-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Check className="h-8 w-8 text-white" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{t.quote.success}</h3>
                        <p className="text-muted-foreground">We have received your request for: {selectedModules.join(', ')}</p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-lg">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                            {modules.map((m) => {
                                const isSelected = selectedModules.includes(m.id);
                                return (
                                    <div
                                        key={m.id}
                                        onClick={() => toggleModule(m.id)}
                                        className={`cursor-pointer border rounded-xl p-4 transition-all duration-200 flex items-center gap-3 select-none ${isSelected
                                                ? 'border-brand-500 bg-brand-500/10 ring-1 ring-brand-500'
                                                : 'border-border bg-background hover:border-brand-500/50'
                                            }`}
                                    >
                                        <div className={`w-5 h-5 rounded flex items-center justify-center border ${isSelected ? 'bg-brand-500 border-brand-500' : 'border-muted-foreground'
                                            }`}>
                                            {isSelected && <Check className="h-3 w-3 text-white" />}
                                        </div>
                                        <span className="text-sm font-medium">{m.label}</span>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                <input
                                    type="email"
                                    required
                                    placeholder={t.quote.emailPlaceholder}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-background border border-border rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-shadow"
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={selectedModules.length === 0 || !email}
                                className="bg-brand-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-brand-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                            >
                                {t.quote.submit}
                            </button>
                        </div>
                        {selectedModules.length === 0 && (
                            <p className="text-xs text-brand-500 mt-2 text-center sm:text-left">Please select at least one module to continue.</p>
                        )}
                    </form>
                )}
            </div>
        </section>
    );
}

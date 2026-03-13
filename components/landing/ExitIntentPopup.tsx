"use client";

import { useState, useEffect } from "react";
import { X, Gift } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SESSION_KEY = "systrategy_popup_shown";

export function ExitIntentPopup() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Only show if not already shown in this session
        const alreadyShown = sessionStorage.getItem(SESSION_KEY);
        if (alreadyShown) return;

        // Show after 1 minute (60000ms)
        const timer = setTimeout(() => {
            setIsVisible(true);
            sessionStorage.setItem(SESSION_KEY, "1");
        }, 60000);

        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative bg-card border border-brand-500/30 rounded-2xl p-8 max-w-md w-full shadow-2xl"
                >
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-5 w-5" />
                    </button>

                    <div className="flex flex-col items-center text-center gap-6">
                        <div className="h-16 w-16 bg-brand-500/10 rounded-full flex items-center justify-center">
                            <Gift className="h-8 w-8 text-brand-500" />
                        </div>

                        <div>
                            <h2 className="font-outfit text-2xl font-bold">¡No te vayas sin tu Diagnóstico!</h2>
                            <p className="mt-2 text-muted-foreground">Solo quedan <span className="text-brand-500 font-bold">5 espacios disponibles</span> para esta semana. Asegura el tuyo ahora mismo.</p>
                        </div>

                        <Link
                            href="/auditoria"
                            onClick={handleClose}
                            className="w-full py-4 bg-brand-500 text-white rounded-xl font-bold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30 text-center"
                        >
                            Agenda tu Diagnóstico Gratis — Solo 5 espacios
                        </Link>

                        <button
                            onClick={handleClose}
                            className="text-sm text-muted-foreground hover:underline"
                        >
                            Quizás en otro momento
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

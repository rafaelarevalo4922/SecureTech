"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { ShieldCheck, LogOut, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useLogout } from '@/components/auth/useLogout';

export function Navbar() {
    const { t } = useLanguage();
    const [user, setUser] = useState<any>(null);
    const { logout } = useLogout();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user);
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogout = async () => {
        setShowLogoutConfirm(false);
        await logout();
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-[#0f172a] border border-white/10 rounded-[32px] p-8 max-w-sm w-full shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] animate-in zoom-in-95 duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
                        <div className="flex justify-center mb-6">
                            <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center border border-rose-500/20">
                                <LogOut className="w-8 h-8 text-rose-500" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-black text-white mb-2 text-center tracking-tight">
                            {t.dashboard.sidebar.logoutConfirm.title}
                        </h3>
                        <p className="text-slate-400 mb-8 text-sm text-center font-medium leading-relaxed px-2">
                            {t.dashboard.sidebar.logoutConfirm.message}
                        </p>
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleLogout}
                                className="w-full py-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black uppercase tracking-widest transition-all shadow-[0_12px_24px_-8px_rgba(225,29,72,0.4)] active:scale-[0.98] border border-rose-400/20"
                            >
                                {t.dashboard.sidebar.logoutConfirm.confirm}
                            </button>
                            <button
                                onClick={() => setShowLogoutConfirm(false)}
                                className="w-full py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-black uppercase tracking-widest transition-all border border-white/5 active:scale-[0.98]"
                            >
                                {t.dashboard.sidebar.logoutConfirm.cancel}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
                <Link href="/" className="flex items-center gap-2 font-outfit text-xl font-bold">
                    <ShieldCheck className="h-6 w-6 text-brand-500" />
                    <span>Nextrova</span>
                </Link>
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
                    <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.features}</Link>
                    <Link href="#solutions" className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.solutions}</Link>
                    <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">{t.nav.dashboards}</Link>
                    <LanguageSwitcher />
                </nav>
                <div className="flex items-center gap-4">
                    {user ? (
                        <>
                            <Link href="/dashboard" className="hidden sm:flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                                <LayoutDashboard className="w-4 h-4" />
                                Panel
                            </Link>
                            <button onClick={() => setShowLogoutConfirm(true)} className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-400">
                                <LogOut className="w-4 h-4" />
                                Salir
                            </button>
                        </>
                    ) : (
                        <Link href="/login" className="hidden sm:inline-flex text-sm font-medium text-muted-foreground hover:text-foreground">{t.nav.login}</Link>
                    )}
                    <Link href="/auditoria" className="text-sm font-medium bg-foreground text-background px-4 py-2 rounded-md hover:bg-brand-600 transition-colors shadow-lg shadow-brand-500/20">{t.nav.getStarted}</Link>
                </div>
            </div>
        </header>
    );
}

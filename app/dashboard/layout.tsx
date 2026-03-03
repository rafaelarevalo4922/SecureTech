"use client";

import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { Bell } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { t, language, setLanguage } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-950 flex selection:bg-blue-500/30">
            <DashboardSidebar />

            {/* Main Content Area */}
            <div className="flex-1 md:ml-64 relative min-w-0">
                {/* Top Navbar Header */}
                <header className="sticky top-0 z-30 h-16 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 sm:px-8">
                    <div className="flex items-center gap-4 hidden sm:flex">
                        <div className="text-slate-400 text-sm font-medium">
                            {t.dashboard.sidebar.subtitle} <span className="text-slate-600 mx-2">/</span> Global View
                        </div>
                    </div>
                    {/* Add spacer for mobile where the title is hidden */}
                    <div className="sm:hidden flex-1"></div>

                    <div className="flex items-center gap-4">
                        {/* Language Switcher for Dashboard */}
                        <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-full p-1">
                            <button
                                onClick={() => setLanguage('en')}
                                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${language === 'en'
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                EN
                            </button>
                            <button
                                onClick={() => setLanguage('es')}
                                className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${language === 'es'
                                    ? 'bg-blue-500 text-white shadow-lg'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                ES
                            </button>
                        </div>

                        <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border border-slate-900"></span>
                        </button>
                        <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-slate-700 cursor-pointer">
                            <img src="https://i.pravatar.cc/150?u=admin" className="w-full h-full object-cover" alt={t.dashboard.sidebar.admin} />
                        </div>
                    </div>
                </header>

                {children}
            </div>
        </div>
    );
}

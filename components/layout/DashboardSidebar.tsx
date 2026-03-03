"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BarChart4,
    Users,
    Settings,
    LayoutDashboard,
    ShieldCheck,
    LogOut,
    Menu,
    X,
    ArrowLeft
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useState } from "react";

export default function DashboardSidebar() {
    const pathname = usePathname();
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: t.dashboard.sidebar.commandCenter, href: "/dashboard", icon: LayoutDashboard },
        { name: t.dashboard.sidebar.reports, href: "/reports", icon: BarChart4 },
        { name: t.dashboard.sidebar.users, href: "/users", icon: Users },
        { name: t.dashboard.sidebar.settings, href: "#", icon: Settings },
    ];

    return (
        <>
            {/* Mobile Header Menu Button */}
            <div className="md:hidden fixed top-0 left-0 z-50 p-4">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-2 bg-slate-900 border border-slate-800 rounded-md text-slate-300 hover:text-white"
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-slate-950/95 backdrop-blur-3xl border-r border-white/10 flex flex-col z-50 transition-transform duration-300 ease-in-out md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="h-16 flex items-center px-6 border-b border-white/5 pt-4 md:pt-0">
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="font-bold text-white text-sm">ST</span>
                        </div>
                        <span className="font-bold text-lg font-heading text-white">{t.dashboard.sidebar.title}</span>
                    </div>
                </div>

                <div className="flex-1 py-8 px-4 space-y-2 overflow-y-auto">
                    <Link href="/" className="mb-4 flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-xl border border-transparent transition-all">
                        <ArrowLeft className="w-4 h-4" />
                        {t.dashboard.sidebar.backToSite}
                    </Link>

                    <div className="mb-6 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {t.dashboard.sidebar.mainNav}
                    </div>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${isActive
                                    ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                    : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                                    }`}
                            >
                                <item.icon className={`w-5 h-5 ${isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300"}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-white/5 bg-slate-950">
                    {/* Security Info Card */}
                    <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
                        <div className="flex items-center gap-3 mb-3">
                            <ShieldCheck className="w-8 h-8 text-emerald-500" />
                            <div>
                                <p className="text-sm font-bold text-white">{t.dashboard.sidebar.security}</p>
                                <p className="text-xs text-emerald-400">{t.dashboard.sidebar.status}</p>
                            </div>
                        </div>
                    </div>

                    <button className="mt-4 flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-slate-400 hover:text-white transition-colors">
                        <LogOut className="w-5 h-5 text-slate-500" />
                        {t.dashboard.sidebar.logout}
                    </button>

                    {/* Small language switcher included for inside the dashboard */}
                    <div className="mt-4 flex justify-between items-center px-2 py-2">
                        <div className="text-xs text-slate-500">Global Language:</div>
                        <div className="flex items-center gap-1 rounded-full bg-slate-900 border border-slate-800 p-1">
                            <button
                                onClick={() => t.nav.dashboards ? true : null} /* we just simulate if they'd need it local, but LanguageContext governs globally */
                                className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-500 text-white"
                            >
                                Global
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

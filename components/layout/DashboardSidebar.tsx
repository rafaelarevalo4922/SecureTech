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
    Bell
} from "lucide-react";

export default function DashboardSidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: "Command Center", href: "/dashboard", icon: LayoutDashboard },
        { name: "Reports & Analytics", href: "/reports", icon: BarChart4 },
        { name: "User Management", href: "/users", icon: Users },
        { name: "System Settings", href: "#", icon: Settings },
    ];

    return (
        <aside className="fixed inset-y-0 left-0 w-64 bg-slate-950/80 backdrop-blur-2xl border-r border-white/5 flex flex-col z-40 hidden md:flex">
            <div className="h-16 flex items-center px-6 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <span className="font-bold text-white text-sm">ST</span>
                    </div>
                    <span className="font-bold text-lg font-heading text-white">SecureTech CRM</span>
                </div>
            </div>

            <div className="flex-1 py-8 px-4 space-y-2">
                <div className="mb-6 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Main Navigation
                </div>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
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

            <div className="p-4 border-t border-white/5">
                <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800">
                    <div className="flex items-center gap-3 mb-3">
                        <ShieldCheck className="w-8 h-8 text-emerald-500" />
                        <div>
                            <p className="text-sm font-bold text-white">Security AI</p>
                            <p className="text-xs text-emerald-400">All systems operational</p>
                        </div>
                    </div>
                </div>

                <button className="mt-4 flex items-center gap-3 px-3 py-2 w-full text-sm font-medium text-slate-400 hover:text-white transition-colors">
                    <LogOut className="w-5 h-5 text-slate-500" />
                    Log Out
                </button>
            </div>
        </aside>
    );
}

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
    LogIn,
    Menu,
    X,
    ArrowLeft
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useLogout } from "@/components/auth/useLogout";

export default function DashboardSidebar() {
    const pathname = usePathname();
    const { t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const { logout } = useLogout();
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const supabase = createClient();

        async function fetchUserData() {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                console.log("Sidebar: User found", user.email);
                setUserEmail(user.email ?? null);

                // Fetch profile role with retry logic for session stability
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', user.id)
                    .single();

                if (error) {
                    // Check if it's just 'no rows found' (common on first login)
                    if (error.code === 'PGRST116') {
                        console.log("Sidebar: Profile not created yet for", user.email);
                    } else {
                        // console.error("Sidebar: Error fetching profile", error);
                    }
                }

                if (profile) {
                    console.log("Sidebar: Profile found, role:", profile.role);
                    setUserRole(profile.role);
                } else {
                    // Default to 'Cliente' or null if no profile exists yet
                    setUserRole(null);
                }
            } else {
                console.log("Sidebar: No user found");
            }
        }

        fetchUserData();

        // Listen for auth changes to update state
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                fetchUserData();
            } else {
                setUserEmail(null);
                setUserRole(null);
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const navItems = [
        { name: t.dashboard.sidebar.commandCenter, href: "/dashboard", icon: LayoutDashboard },
        { name: t.dashboard.sidebar.reports, href: "/dashboard/reportes", icon: BarChart4 },
        { name: t.dashboard.sidebar.users, href: "/dashboard/usuarios", icon: Users },

        // Only show Auditoría to Admins
        ...(userRole === 'Admin' ? [{ name: "Auditoría (Leads)", href: "/dashboard/auditoria", icon: Settings }] : []),
        { name: t.dashboard.sidebar.settings, href: "/dashboard/settings", icon: Settings },
    ];

    const handleLogout = async () => {
        setShowLogoutConfirm(false);
        await logout();
    };

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

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-[#0f172a] border border-white/10 rounded-[32px] p-8 max-w-sm w-full shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] animate-in zoom-in-95 duration-300 relative overflow-hidden group">
                        {/* Decorative background for modal */}
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
                <div className="h-20 flex items-center px-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <ShieldCheck className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-xl font-outfit text-white tracking-tight">{t.dashboard.sidebar.title}</span>
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

                {/* User Section at Bottom */}
                <div className="p-4 border-t border-white/5 bg-slate-950/50 mt-auto">
                    {userEmail ? (
                        <>
                            {/* User Info Card */}
                            <div className="bg-white/5 rounded-2xl p-3 border border-white/5 mb-3 group hover:border-white/10 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 bg-slate-800">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userEmail}`} className="w-full h-full object-cover" alt="User Avatar" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <p className="text-sm font-black text-white truncate">{userEmail?.split('@')[0]}</p>
                                            {userRole === 'Admin' && (
                                                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-500 text-white shadow-lg shadow-blue-500/40 border border-blue-400/30">
                                                    Admin
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-[10px] text-slate-500 truncate lowercase font-medium">{userEmail}</p>
                                            {userRole && userRole !== 'Admin' && (
                                                <span className="text-[8px] font-black uppercase px-1.5 py-0.5 rounded-md bg-slate-500/10 text-slate-400 border border-white/5">
                                                    {userRole}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowLogoutConfirm(true)}
                                className="flex items-center gap-3 px-3 py-3 w-full text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/5 rounded-xl transition-all group"
                            >
                                <LogOut className="w-5 h-5 text-slate-500 group-hover:text-rose-400 transition-colors" />
                                {t.dashboard.sidebar.logout}
                            </button>
                        </>
                    ) : (
                        <Link
                            href="/login"
                            className="flex items-center gap-3 px-3 py-3 w-full text-sm font-bold text-slate-400 hover:text-blue-400 hover:bg-blue-500/5 rounded-xl transition-all group border border-transparent hover:border-blue-500/20"
                        >
                            <LogIn className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
                            Iniciar Sesión
                        </Link>
                    )}

                    <div className="mt-4 px-2 flex items-center justify-between opacity-50">
                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">v1.2.4</span>
                        <div className="flex gap-1">
                            <div className="w-1 h-1 rounded-full bg-blue-500"></div>
                            <div className="w-1 h-1 rounded-full bg-purple-500"></div>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

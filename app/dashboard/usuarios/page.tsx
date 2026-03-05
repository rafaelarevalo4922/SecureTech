"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
    Users,
    ShieldCheck,
    Key,
    Activity,
    Smartphone,
    Globe,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Clock,
    Search
} from "lucide-react";

const auditLogs = [
    { id: 1, user: "Elena Rodríguez", action: "Downloaded Q3 Financial Report", resource: "financials_q3.csv", ip: "192.168.1.104", location: "Madrid, ES", time: "10 min ago", status: "success" },
    { id: 2, user: "Carlos Mendoza", action: "Changed Role Permission", resource: "User: Sofía Castillo", ip: "10.0.0.5", location: "Mexico City, MX", time: "25 min ago", status: "success" },
    { id: 3, user: "Daniel Silva", action: "Failed Login Attempt", resource: "System Portal", ip: "45.22.11.9", location: "Unknown", time: "1 hour ago", status: "failed" },
    { id: 4, user: "System Auto", action: "Database Backup Completed", resource: "cluster_db_main", ip: "Internal", location: "AWS us-east-1", time: "3 hours ago", status: "success" },
    { id: 5, user: "Admin Root", action: "API Key Generated", resource: "Stripe Integration", ip: "192.168.1.1", location: "Madrid, ES", time: "5 hours ago", status: "success" },
];

const usersData = [
    { name: "Elena Rodríguez", role: "Super Admin", department: "Management", riskScore: 12, device: "MacBook Pro", active: true },
    { name: "Carlos Mendoza", role: "Billing Admin", department: "Finance", riskScore: 8, device: "Windows Desktop", active: true },
    { name: "Sofía Castillo", role: "Sales Rep", department: "Sales", riskScore: 45, device: "iPhone 14 (Mobile)", active: true, warning: true },
    { name: "Daniel Silva", role: "Sales Rep", department: "Sales", riskScore: 5, device: "MacBook Air", active: false },
];

export default function UsersPage() {
    const { t } = useLanguage();

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 mb-2 flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-emerald-400" />
                        {t.dashboard.users.title}
                    </h1>
                    <p className="text-slate-400">{t.dashboard.users.subtitle}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative w-full sm:w-auto">
                        <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder={t.dashboard.users.search}
                            className="bg-slate-900 border border-slate-800 rounded-full pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-full sm:w-64"
                        />
                    </div>
                    <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 whitespace-nowrap w-full sm:w-auto active:scale-[0.98]">
                        <Key className="w-4 h-4" /> {t.dashboard.users.invite}
                    </button>
                </div>
            </div>

            {/* Global Security Posture */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: t.dashboard.users.threatScore, value: "Low", sub: "12/100", icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-400/10" },
                    { label: t.dashboard.users.sessions, value: "24", sub: t.dashboard.users.regions, icon: Activity, color: "text-blue-400", bg: "bg-blue-400/10" },
                    { label: t.dashboard.users.anomalies, value: "1", sub: t.dashboard.users.requiresReview, icon: Globe, color: "text-rose-400", bg: "bg-rose-400/10" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 flex items-center justify-between group hover:bg-white/10 transition-all">
                        <div>
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">{stat.label}</p>
                            <div className="flex items-baseline gap-2">
                                <h2 className={`text-3xl font-black ${stat.color}`}>{stat.value}</h2>
                                <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">{stat.sub}</span>
                            </div>
                        </div>
                        <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center border border-white/5 shadow-inner group-hover:scale-110 transition-transform`}>
                            <stat.icon className={`w-7 h-7 ${stat.color}`} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-12">
                {/* User Management List */}
                <div className="xl:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden flex flex-col h-[520px]">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
                        <h3 className="font-black text-white text-xs uppercase tracking-widest flex items-center gap-2">
                            <Users className="w-5 h-5 text-blue-400" />
                            {t.dashboard.users.directory}
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                        {usersData.map((user, i) => (
                            <div key={i} className="flex items-start justify-between p-4 hover:bg-white/5 rounded-2xl transition-all group cursor-pointer border border-transparent hover:border-white/5 active:scale-[0.98]">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <div className="w-12 h-12 rounded-full bg-slate-800 overflow-hidden border border-white/10">
                                            <img src={`https://i.pravatar.cc/150?u=${user.name}`} alt={user.name} />
                                        </div>
                                        <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-slate-950 ${user.active ? 'bg-emerald-500' : 'bg-slate-500'}`}></div>
                                    </div>
                                    <div>
                                        <p className="font-black text-sm text-slate-200">{user.name}</p>
                                        <p className="text-[11px] text-slate-500 font-medium">{user.role}</p>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                    <span className={`inline-flex px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest ${user.warning ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-slate-800 text-slate-500'}`}>
                                        {t.dashboard.users.risk}: {user.riskScore}
                                    </span>
                                    <div className="mt-3 text-slate-600 group-hover:text-slate-400"><MoreVertical className="w-4 h-4" /></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Immutable Audit Log */}
                <div className="xl:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden flex flex-col h-[520px]">
                    <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
                        <div>
                            <h3 className="font-black text-white text-xs uppercase tracking-widest flex items-center gap-2 mb-1">
                                <Clock className="w-5 h-5 text-indigo-400" />
                                {t.dashboard.users.auditTrail}
                            </h3>
                            <p className="text-[10px] text-slate-500 font-medium">{t.dashboard.users.auditSub}</p>
                        </div>
                        <button className="text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-all border border-slate-700 active:scale-[0.95]">
                            {t.dashboard.users.export}
                        </button>
                    </div>

                    <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left text-xs whitespace-nowrap">
                            <thead className="bg-[#0f172a] text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] sticky top-0 backdrop-blur-md z-10">
                                <tr>
                                    <th className="px-8 py-5 border-b border-white/5">{t.dashboard.users.colUser}</th>
                                    <th className="px-8 py-5 border-b border-white/5">{t.dashboard.users.colAction}</th>
                                    <th className="px-8 py-5 border-b border-white/5">{t.dashboard.users.colIP}</th>
                                    <th className="px-8 py-5 border-b border-white/5">{t.dashboard.users.colTime}</th>
                                    <th className="px-8 py-5 border-b border-white/5">{t.dashboard.users.colStatus}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {auditLogs.map((log) => (
                                    <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-white/5 flex items-center justify-center text-[10px] font-black text-slate-400">
                                                    {log.user.charAt(0)}
                                                </div>
                                                <span className="font-bold text-slate-200">{log.user}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="text-slate-300 font-medium">{log.action}</div>
                                            <div className="text-[10px] text-slate-500 mt-1 font-bold italic tracking-wider">{log.resource}</div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="font-mono text-[10px] text-slate-400 font-bold">{log.ip}</div>
                                            <div className="flex items-center gap-1.5 text-[10px] text-slate-600 mt-1 font-black uppercase tracking-widest">
                                                {log.ip.includes("10.0.") || log.ip === "Internal" ? <Globe className="w-3 h-3 text-blue-500/50" /> : <Smartphone className="w-3 h-3" />}
                                                {log.location}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-slate-500 font-bold text-[10px] uppercase tracking-wider">
                                            {log.time}
                                        </td>
                                        <td className="px-8 py-5">
                                            {log.status === 'success' ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/5 text-emerald-500 text-[10px] font-black uppercase tracking-widest border border-emerald-500/10 shadow-[0_4px_12px_-4px_rgba(16,185,129,0.2)]">
                                                    <CheckCircle2 className="w-3.5 h-3.5" /> {t.dashboard.users.success}
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-500/5 text-rose-500 text-[10px] font-black uppercase tracking-widest border border-rose-500/10 shadow-[0_4px_12px_-4px_rgba(244,63,94,0.2)]">
                                                    <XCircle className="w-3.5 h-3.5" /> {t.dashboard.users.failed}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}

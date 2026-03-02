"use client";

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

const users = [
    { name: "Elena Rodríguez", role: "Super Admin", department: "Management", riskScore: 12, device: "MacBook Pro", active: true },
    { name: "Carlos Mendoza", role: "Billing Admin", department: "Finance", riskScore: 8, device: "Windows Desktop", active: true },
    { name: "Sofía Castillo", role: "Sales Rep", department: "Sales", riskScore: 45, device: "iPhone 14 (Mobile)", active: true, warning: true },
    { name: "Daniel Silva", role: "Sales Rep", department: "Sales", riskScore: 5, device: "MacBook Air", active: false },
];

export default function UsersPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans relative selection:bg-emerald-500/30">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay z-0"></div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 z-10 relative">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 mb-2 flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-emerald-400" />
                            Identity & Security
                        </h1>
                        <p className="text-slate-400">Control de Accesos (RBAC), Auditoría de eventos y Threat Score.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Buscar logs, IPs, usuarios..."
                                className="bg-slate-900 border border-slate-800 rounded-full pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 w-64"
                            />
                        </div>
                        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-2">
                            <Key className="w-4 h-4" /> Invite User
                        </button>
                    </div>
                </div>

                {/* Global Security Posture */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm font-medium mb-1">Global Threat Score</p>
                            <div className="flex items-baseline gap-2">
                                <h2 className="text-3xl font-bold text-emerald-400">Low</h2>
                                <span className="text-xs text-slate-500 font-mono">12/100</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                            <ShieldCheck className="w-6 h-6 text-emerald-400" />
                        </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm font-medium mb-1">Active Sessions</p>
                            <div className="flex items-baseline gap-2">
                                <h2 className="text-3xl font-bold text-white">24</h2>
                                <span className="text-xs text-slate-500 font-mono">Across 5 regions</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                            <Activity className="w-6 h-6 text-blue-400" />
                        </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 flex items-center justify-between">
                        <div>
                            <p className="text-slate-400 text-sm font-medium mb-1">Anomalous Logins (24h)</p>
                            <div className="flex items-baseline gap-2">
                                <h2 className="text-3xl font-bold text-rose-400">1</h2>
                                <span className="text-xs text-slate-500 font-mono">Requires review</span>
                            </div>
                        </div>
                        <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                            <Globe className="w-6 h-6 text-rose-400" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

                    {/* User Management List */}
                    <div className="xl:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col h-[500px]">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
                            <h3 className="font-bold text-white flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-400" />
                                Directory
                            </h3>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 custom-scrollbar">
                            {users.map((user, i) => (
                                <div key={i} className="flex items-start justify-between p-4 hover:bg-white/5 rounded-2xl transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full bg-slate-800 overflow-hidden">
                                                <img src={`https://i.pravatar.cc/150?u=${user.name}`} alt={user.name} />
                                            </div>
                                            <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-slate-950 ${user.active ? 'bg-emerald-500' : 'bg-slate-500'}`}></div>
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-slate-200">{user.name}</p>
                                            <p className="text-xs text-slate-400">{user.role}</p>
                                        </div>
                                    </div>
                                    <div className="text-right flex flex-col items-end">
                                        <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${user.warning ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-800 text-slate-400'}`}>
                                            Risk: {user.riskScore}
                                        </span>
                                        <div className="mt-2 text-slate-500"><MoreVertical className="w-4 h-4" /></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Immutable Audit Log */}
                    <div className="xl:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col h-[500px]">
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
                            <div>
                                <h3 className="font-bold text-white flex items-center gap-2 mb-1">
                                    <Clock className="w-5 h-5 text-indigo-400" />
                                    Immutable Audit Trail
                                </h3>
                                <p className="text-xs text-slate-400">Monitoreo de actividad de usuarios, APIs y bases de datos en tiempo real.</p>
                            </div>
                            <button className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-colors border border-slate-700">
                                Export CSV
                            </button>
                        </div>

                        <div className="flex-1 overflow-x-auto overflow-y-auto custom-scrollbar">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider sticky top-0 backdrop-blur-md">
                                    <tr>
                                        <th className="px-6 py-4 font-semibold">User / System</th>
                                        <th className="px-6 py-4 font-semibold">Action</th>
                                        <th className="px-6 py-4 font-semibold">IP & Location</th>
                                        <th className="px-6 py-4 font-semibold">Time</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {auditLogs.map((log) => (
                                        <tr key={log.id} className="hover:bg-white/5 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-400">
                                                        {log.user.charAt(0)}
                                                    </div>
                                                    <span className="font-semibold text-slate-300">{log.user}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-slate-300">{log.action}</div>
                                                <div className="text-xs text-slate-500 mt-0.5">{log.resource}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-mono text-xs text-slate-300">{log.ip}</div>
                                                <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                                                    {log.ip.includes("10.0.") || log.ip === "Internal" ? <Globe className="w-3 h-3 text-blue-400" /> : <Smartphone className="w-3 h-3" />}
                                                    {log.location}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-400 text-xs">
                                                {log.time}
                                            </td>
                                            <td className="px-6 py-4">
                                                {log.status === 'success' ? (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                                                        <CheckCircle2 className="w-3 h-3" /> Success
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-rose-500/10 text-rose-400 text-xs font-semibold border border-rose-500/20">
                                                        <XCircle className="w-3 h-3" /> Failed
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
            </main>
        </div>
    );
}

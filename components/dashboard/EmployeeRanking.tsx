"use client";

import { Trophy, TrendingUp, Target, Zap } from "lucide-react";
import Image from "next/image";

const employees = [
    {
        id: 1,
        name: "Elena Rodríguez",
        role: "Senior Enterprise AE",
        sales: "$245,000",
        growth: "+14%",
        winRate: "68%",
        avatar: "https://i.pravatar.cc/150?u=elena",
        score: 98,
        badge: "Top Closer",
    },
    {
        id: 2,
        name: "Carlos Mendoza",
        role: "Account Executive",
        sales: "$198,000",
        growth: "+22%",
        winRate: "55%",
        avatar: "https://i.pravatar.cc/150?u=carlos",
        score: 92,
        badge: "Fastest Growth",
    },
    {
        id: 3,
        name: "Sofía Castillo",
        role: "SDR Lead",
        sales: "$156,000",
        growth: "+8%",
        winRate: "42%",
        avatar: "https://i.pravatar.cc/150?u=sofia",
        score: 85,
    },
    {
        id: 4,
        name: "Daniel Silva",
        role: "Account Executive",
        sales: "$142,000",
        growth: "+5%",
        winRate: "45%",
        avatar: "https://i.pravatar.cc/150?u=daniel",
        score: 81,
    },
];

export default function EmployeeRanking() {
    return (
        <div className="w-full h-full p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-6 z-10">
                <div>
                    <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-yellow-400" /> Leaderboard Multidimensional
                    </h3>
                    <p className="text-sm text-slate-400 font-sans mt-1">Rendimiento cruzado con retención de clientes</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 z-10 custom-scrollbar pr-2">
                {employees.map((emp, index) => (
                    <div
                        key={emp.id}
                        className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                    >
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-700 group-hover:border-purple-500 transition-colors">
                                    {/* Using standard img to avoid next/image domain config issues for pravatar */}
                                    <img src={emp.avatar} alt={emp.name} className="w-full h-full object-cover" />
                                </div>
                                {index === 0 && (
                                    <div className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 rounded-full p-1 shadow-lg ring-2 ring-slate-900">
                                        <Trophy className="w-3 h-3" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <h4 className="font-semibold text-slate-200 group-hover:text-white transition-colors">{emp.name}</h4>
                                <p className="text-xs text-slate-400">{emp.role}</p>
                                {emp.badge && (
                                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-semibold border border-purple-500/30">
                                        {index === 0 ? <Zap className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
                                        {emp.badge}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col items-end">
                            <span className="font-mono font-bold text-lg text-emerald-400">{emp.sales}</span>
                            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                                <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3 text-blue-400" /> {emp.growth}</span>
                                <span className="flex items-center gap-1"><Target className="w-3 h-3 text-rose-400" /> {emp.winRate}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

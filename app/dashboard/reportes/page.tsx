"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';
import {
    BarChart4,
    Map,
    TrendingUp,
    AlertOctagon,
    Sparkles,
    Bot,
    BrainCircuit,
    PieChart,
    Download
} from "lucide-react";
import {
    ComposedChart,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    Legend,
    ResponsiveContainer,
    Scatter
} from 'recharts';

const anomalyData = [
    { day: '01', normal: 1200 },
    { day: '02', normal: 1350 },
    { day: '03', normal: 1100 },
    { day: '04', normal: 1250 },
    { day: '05', normal: 800, anomaly: 800 },
    { day: '06', normal: 1300 },
    { day: '07', normal: 1450 },
    { day: '08', normal: 1500 },
    { day: '09', normal: 1400 },
    { day: '10', normal: 2100, anomaly: 2100 },
    { day: '11', normal: 1550 },
    { day: '12', normal: 1600 },
];

export default function ReportsPage() {
    const { t } = useLanguage();

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 mb-2 flex items-center gap-3">
                        <BarChart4 className="w-8 h-8 text-purple-400" />
                        {t.dashboard.reports.title}
                    </h1>
                    <p className="text-slate-400">{t.dashboard.reports.subtitle}</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-4 py-2 text-purple-300 text-[10px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        <Sparkles className="w-3.5 h-3.5" />
                        Auto-Analysis Active
                    </div>
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]">
                        <Download className="w-4 h-4" />
                        {t.dashboard.reports.exportReport}
                    </button>
                </div>
            </div>

            {/* NLP Query Simulator */}
            <div className="bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 rounded-[24px] p-2 pl-6 flex items-center relative overflow-hidden focus-within:ring-2 ring-purple-500/50 transition-all shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]">
                <Bot className="w-5 h-5 text-purple-400 shrink-0" />
                <input
                    type="text"
                    placeholder="Ask AI: 'Show revenue dip in LatAm Q3'..."
                    className="w-full bg-transparent border-none outline-none text-sm text-slate-200 placeholder:text-slate-600 px-4 py-4 font-medium"
                />
                <button className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shrink-0 active:scale-[0.98]">
                    Analyze
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Anomaly Detection Chart */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group">
                    <div className="mb-6 relative z-10">
                        <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                            <BrainCircuit className="w-5 h-5 text-pink-400" />
                            AI Anomaly Detection
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">Automated unusual pattern identification in transaction volume.</p>
                    </div>

                    <div className="h-[300px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={anomalyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="day" stroke="#64748b" tickLine={false} axisLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                                <YAxis stroke="#64748b" tickLine={false} axisLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
                                <RechartsTooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}
                                    itemStyle={{ color: '#e2e8f0', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}
                                />
                                <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '20px', fontWeight: 700, textTransform: 'uppercase' }} />
                                <Area type="monotone" dataKey="normal" fill="#3b82f6" stroke="#3b82f6" fillOpacity={0.1} name="Expected Vol" />
                                <Line type="monotone" dataKey="normal" stroke="#3b82f6" strokeWidth={3} dot={false} name="Actual" />
                                <Scatter dataKey="anomaly" fill="#f43f5e" name="AI Detected Anomaly" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-8 p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 text-[11px] font-medium leading-relaxed">
                        <span className="font-black text-rose-500 uppercase tracking-widest mr-2">Core Alert:</span>
                        High probability drop (35%) detected on Day 05. Potential secondary payment gateway timeout identified.
                    </div>
                </div>

                {/* Profitability Heatmap */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden flex flex-col group">
                    <div className="mb-6">
                        <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                            <Map className="w-5 h-5 text-emerald-400" />
                            Profitability Heatmap
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">Cross-analysis of gross margin by Region vs Product Line.</p>
                    </div>

                    <div className="flex-1 flex flex-col justify-center gap-3 relative mt-4">
                        {[
                            { region: "NAMER", vals: ["bg-emerald-500/90", "bg-emerald-500/60", "bg-amber-500/60"] },
                            { region: "EMEA", vals: ["bg-emerald-500/70", "bg-rose-500/80", "bg-emerald-500/40"] },
                            { region: "LATAM", vals: ["bg-amber-500/80", "bg-emerald-500/80", "bg-emerald-500/90"] }
                        ].map((row, i) => (
                            <div key={i} className="flex h-14 gap-3">
                                <div className="w-20 flex items-center text-[10px] font-black text-slate-500 uppercase tracking-widest">{row.region}</div>
                                {row.vals.map((v, j) => (
                                    <div key={j} className={`flex-1 ${v} rounded-xl relative group cursor-crosshair border border-white/5 transition-all hover:scale-[1.02] hover:shadow-xl hover:z-10`} />
                                ))}
                            </div>
                        ))}

                        <div className="flex gap-3 mt-4">
                            <div className="w-20"></div>
                            <div className="flex-1 text-center text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">SaaS Pro</div>
                            <div className="flex-1 text-center text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">Enterprise</div>
                            <div className="flex-1 text-center text-[9px] font-black text-slate-600 uppercase tracking-[0.2em]">Add-ons</div>
                        </div>
                    </div>

                    <div className="mt-8 flex items-center justify-end gap-6 text-[9px] font-black uppercase tracking-widest text-slate-500">
                        <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.4)]"></span> Risk</span>
                        <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.4)]"></span> Average</span>
                        <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500/90 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span> Optimal</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

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
    PieChart
} from "lucide-react";
import {
    ComposedChart,
    Line,
    Area,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip as RechartsTooltip,
    Legend,
    ResponsiveContainer,
    Scatter
} from 'recharts';

// Mock data for Anomaly Detection
const anomalyData = [
    { day: '01', normal: 1200 },
    { day: '02', normal: 1350 },
    { day: '03', normal: 1100 },
    { day: '04', normal: 1250 },
    { day: '05', normal: 800, anomaly: 800 }, // Anomaly!
    { day: '06', normal: 1300 },
    { day: '07', normal: 1450 },
    { day: '08', normal: 1500 },
    { day: '09', normal: 1400 },
    { day: '10', normal: 2100, anomaly: 2100 }, // Spike Anomaly!
    { day: '11', normal: 1550 },
    { day: '12', normal: 1600 },
];

export default function ReportsPage() {
    const { t } = useLanguage();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans relative selection:bg-purple-500/30">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay z-0"></div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 z-10 relative">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 mb-2 flex items-center gap-3">
                            <BarChart4 className="w-8 h-8 text-purple-400" />
                            {t.dashboard.reports.title}
                        </h1>
                        <p className="text-slate-400">{t.dashboard.reports.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full px-4 py-2 text-purple-300 text-sm font-semibold shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                        <Sparkles className="w-4 h-4" />
                        Auto-Analysis Active
                    </div>
                </div>

                {/* NLP Query Simulator */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 pl-4 flex items-center relative overflow-hidden focus-within:ring-2 ring-purple-500/50 transition-all shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 pointer-events-none" />
                    <Bot className="w-5 h-5 text-purple-400 shrink-0" />
                    <input
                        type="text"
                        placeholder="Pregunta en lenguaje natural: 'Muéstrame la caída de ventas en LatAm del Q2'..."
                        className="w-full bg-transparent border-none outline-none text-sm text-slate-200 placeholder:text-slate-600 px-4 py-3"
                    />
                    <button className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-xl text-sm font-semibold transition-colors shrink-0">
                        Generar
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Anomaly Detection Chart */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 pointer-events-none">
                            <AlertOctagon className="w-24 h-24 text-rose-500/5 -rotate-12" />
                        </div>
                        <div className="mb-6 relative z-10 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                            <div>
                                <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                                    <BrainCircuit className="w-5 h-5 text-pink-400" />
                                    AI Anomaly Detection
                                </h3>
                                <p className="text-sm text-slate-400">Patrones inusuales detectados automáticamente en el volumen.</p>
                            </div>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={anomalyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                    <XAxis dataKey="day" stroke="#64748b" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                                    <YAxis stroke="#64748b" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                                    <RechartsTooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                                        itemStyle={{ color: '#e2e8f0' }}
                                    />
                                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                                    <Area type="monotone" dataKey="normal" fill="#3b82f6" stroke="#3b82f6" fillOpacity={0.1} name="Volumen Esperado" />
                                    <Line type="monotone" dataKey="normal" stroke="#3b82f6" strokeWidth={2} dot={false} name="Actual" />
                                    <Scatter dataKey="anomaly" fill="#f43f5e" name="Anomalía Detectada" />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="mt-4 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-sm">
                            <span className="font-bold text-rose-400 mr-2">Alerta:</span>
                            El algoritmo detectó una caída de 35% no justificada el día 05. Causa probable identificada: Caída del gateway de pago secundario.
                        </div>
                    </div>

                    {/* Profitability Heatmap (Mocked via UI blocks) */}
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                                <Map className="w-5 h-5 text-emerald-400" />
                                Profitability Heatmap
                            </h3>
                            <p className="text-sm text-slate-400">Análisis cruzado de margen de ganancia por Región y Producto.</p>
                        </div>

                        <div className="flex-1 flex flex-col justify-center gap-2 relative">
                            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                                <PieChart className="w-48 h-48" />
                            </div>

                            {/* Row 1 */}
                            <div className="flex h-16 gap-2">
                                <div className="w-24 flex items-center text-xs font-semibold text-slate-400">Norteamérica</div>
                                <div className="flex-1 bg-emerald-500/90 rounded-md relative group cursor-crosshair">
                                    <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/50 text-white text-xs font-bold rounded-md backdrop-blur-sm">85% Margen</div>
                                </div>
                                <div className="flex-1 bg-emerald-500/60 rounded-md"></div>
                                <div className="flex-1 bg-amber-500/60 rounded-md"></div>
                            </div>

                            {/* Row 2 */}
                            <div className="flex h-16 gap-2">
                                <div className="w-24 flex items-center text-xs font-semibold text-slate-400">Europa</div>
                                <div className="flex-1 bg-emerald-500/70 rounded-md"></div>
                                <div className="flex-1 bg-rose-500/80 rounded-md relative group cursor-crosshair">
                                    <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-black/50 text-white text-xs font-bold rounded-md backdrop-blur-sm">-12% Pérdida</div>
                                </div>
                                <div className="flex-1 bg-emerald-500/40 rounded-md"></div>
                            </div>

                            {/* Row 3 */}
                            <div className="flex h-16 gap-2">
                                <div className="w-24 flex items-center text-xs font-semibold text-slate-400">Latinoamérica</div>
                                <div className="flex-1 bg-amber-500/80 rounded-md"></div>
                                <div className="flex-1 bg-emerald-500/80 rounded-md"></div>
                                <div className="flex-1 bg-emerald-500/90 rounded-md"></div>
                            </div>

                            {/* X Axis Labels */}
                            <div className="flex gap-2 mt-2">
                                <div className="w-24"></div>
                                <div className="flex-1 text-center text-[10px] font-semibold text-slate-500 uppercase">SaaS Pro</div>
                                <div className="flex-1 text-center text-[10px] font-semibold text-slate-500 uppercase">Enterprise</div>
                                <div className="flex-1 text-center text-[10px] font-semibold text-slate-500 uppercase">Add-ons</div>
                            </div>
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-4 text-xs font-medium text-slate-400">
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-rose-500/80"></span> Riesgo</span>
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-amber-500/80"></span> Medio</span>
                            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-500/90"></span> Optimo</span>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}

"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine
} from "recharts";

const data = [
    { month: "Jan", historical: 4000, forecast: null },
    { month: "Feb", historical: 3000, forecast: null },
    { month: "Mar", historical: 5000, forecast: null },
    { month: "Apr", historical: 4500, forecast: null },
    { month: "May", historical: 6000, forecast: null },
    { month: "Jun", historical: 5500, forecast: 5500 }, // Connection point
    { month: "Jul", historical: null, forecast: 6500 },
    { month: "Aug", historical: null, forecast: 7100 },
    { month: "Sep", historical: null, forecast: 7500 },
    { month: "Oct", historical: null, forecast: 8200 },
    { month: "Nov", historical: null, forecast: 9000 },
    { month: "Dec", historical: null, forecast: 10500 },
];

export default function SalesChart() {
    return (
        <div className="w-full h-full min-h-[350px] p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden">
            {/* Decorative gradient blob */}
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                    <h3 className="text-xl font-bold font-heading text-white mb-1">Crecimiento y Proyección</h3>
                    <p className="text-sm text-slate-400 font-sans">Datos históricos vs Pipeline 2026</p>
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold font-sans">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                        <span className="text-slate-300">Histórico</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
                        <span className="text-emerald-400">Proyección IA</span>
                    </div>
                </div>
            </div>

            <div className="h-[300px] w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorHistorical" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                        <XAxis dataKey="month" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}
                            itemStyle={{ color: '#e2e8f0' }}
                        />

                        <Area
                            type="monotone"
                            dataKey="historical"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorHistorical)"
                            activeDot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
                        />

                        <Area
                            type="monotone"
                            dataKey="forecast"
                            stroke="#10b981"
                            strokeWidth={3}
                            strokeDasharray="5 5"
                            fillOpacity={1}
                            fill="url(#colorForecast)"
                            activeDot={{ r: 8, fill: "#10b981", stroke: "#fff", strokeWidth: 2, className: "animate-pulse" }}
                        />

                        <ReferenceLine x="Jun" stroke="#64748b" strokeDasharray="3 3" label={{ position: 'top', value: 'Hoy', fill: '#64748b', fontSize: 12 }} />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

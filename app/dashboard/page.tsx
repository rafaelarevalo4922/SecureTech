import SalesChart from "@/components/dashboard/SalesChart";
import EmployeeRanking from "@/components/dashboard/EmployeeRanking";
import ClientInsights from "@/components/dashboard/ClientInsights";
import { DollarSign, Percent, Users, Activity } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="relative text-slate-200 font-sans">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 z-10 relative">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 mb-2">
                            Command Center
                        </h1>
                        <p className="text-slate-400">Inteligencia de ventas y predicciones impulsadas por IA.</p>
                    </div>
                    <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-blue-400 text-sm font-semibold">
                        <Activity className="w-4 h-4 animate-pulse" />
                        IA Predictive Engine: ONLINE
                    </div>
                </div>

                {/* Global Stats Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="Ingresos Anuales (YTD)" value="$2.4M" target="vs $1.8M (2025)" icon={DollarSign} trend="+33%" color="text-emerald-400" bg="bg-emerald-400/10" shadow="shadow-[0_0_30px_-5px_rgba(16,185,129,0.15)]" />
                    <StatCard title="Pipeline Proyectado" value="$850K" target="Q3 - Q4 2026" icon={Activity} trend="+12%" color="text-blue-400" bg="bg-blue-400/10" shadow="shadow-[0_0_30px_-5px_rgba(59,130,246,0.15)]" />
                    <StatCard title="Win Rate Global" value="48.5%" target="Promedio industria: 32%" icon={Percent} trend="+5.2%" color="text-purple-400" bg="bg-purple-400/10" shadow="shadow-[0_0_30px_-5px_rgba(168,85,247,0.15)]" />
                    <StatCard title="Clientes Activos" value="142" target="9 en riesgo de fuga" icon={Users} trend="-2" color="text-rose-400" bg="bg-rose-400/10" shadow="shadow-[0_0_30px_-5px_rgba(244,63,94,0.15)]" isNegative />
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-auto lg:h-[450px]">
                    {/* Main Chart - Takes 2 columns */}
                    <div className="lg:col-span-2">
                        <SalesChart />
                    </div>
                    {/* AI Insights - Takes 1 column */}
                    <div className="lg:col-span-1 h-[450px]">
                        <ClientInsights />
                    </div>
                </div>

                {/* Secondary Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                    {/* Employee Rankings - Takes 2 columns (could be 1 depending on layout) */}
                    <div className="lg:col-span-2 h-[450px]">
                        <EmployeeRanking />
                    </div>
                    {/* Placeholder for future "What-If Simulator" */}
                    <div className="lg:col-span-1 h-[450px] p-6 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col items-center justify-center text-center relative overflow-hidden group hover:border-blue-500/50 transition-colors cursor-pointer">
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Activity className="w-12 h-12 text-slate-600 mb-4 group-hover:text-blue-400 transition-colors" />
                        <h3 className="text-xl font-bold font-heading text-slate-300 mb-2">Simulador What-If</h3>
                        <p className="text-sm text-slate-500 max-w-[80%] mx-auto">Próximamente: Ajusta variables macroeconómicas y observa la predicción de ventas en tiempo real.</p>
                        <button className="mt-6 px-6 py-2 rounded-full border border-slate-700 text-slate-400 text-sm font-semibold group-hover:bg-blue-500 group-hover:text-white group-hover:border-blue-500 transition-all">Ver Demostración</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Helper component for stats
function StatCard({ title, value, target, icon: Icon, trend, color, bg, shadow, isNegative = false }: any) {
    return (
        <div className={`p-6 bg-white/5 backdrop-blur-xl border border-white/5 rounded-3xl relative overflow-hidden group hover:bg-white/10 transition-colors ${shadow}`}>
            <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-3 rounded-2xl ${bg} ${color}`}>
                    <Icon className="w-5 h-5" />
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold font-mono ${isNegative ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {trend}
                </span>
            </div>
            <div className="relative z-10">
                <div className="text-slate-400 text-sm font-medium mb-1">{title}</div>
                <div className="text-3xl font-bold font-heading text-white">{value}</div>
                <div className="text-xs text-slate-500 mt-2 font-medium">{target}</div>
            </div>
            {/* Glow effect on hover */}
            <div className={`absolute -inset-0.5 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:animate-pulse pointer-events-none rounded-3xl`} />
        </div>
    )
}

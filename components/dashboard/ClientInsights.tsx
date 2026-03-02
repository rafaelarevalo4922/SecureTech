"use client";

import { AlertTriangle, Lightbulb, TrendingDown, Phone, ArrowRight } from "lucide-react";

const insights = [
    {
        id: 1,
        client: "TechCorp Global",
        type: "NEXT_BEST_ACTION",
        title: "Sugerencia de Contacto",
        description: "La actividad en la plataforma de su CFO sugiere intención de compra. Llámalo hoy.",
        confidence: "94%",
        icon: Lightbulb,
        color: "text-amber-400",
        bg: "bg-amber-400/10",
        border: "border-amber-400/20",
        action: "Programar Llamada",
        actionIcon: Phone
    },
    {
        id: 2,
        client: "Nexus Industries",
        type: "CHURN_RISK",
        title: "Alerta Predictiva de Fuga",
        description: "Patrones de uso disminuyeron 40% este mes comparado con su histórico. Riesgo alto de no renovación.",
        confidence: "88%",
        icon: AlertTriangle,
        color: "text-rose-500",
        bg: "bg-rose-500/10",
        border: "border-rose-500/20",
        action: "Ver Estrategia de Retención",
        actionIcon: ArrowRight
    },
    {
        id: 3,
        client: "Synergy Systems",
        type: "DOWNGRADE_RISK",
        title: "Riesgo de Downgrade",
        description: "Solo usando el 20% de las licencias Pro adquiridas. Posibilidad de que soliciten plan básico.",
        confidence: "76%",
        icon: TrendingDown,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        action: "Ofrecer Capacitación",
        actionIcon: ArrowRight
    }
];

export default function ClientInsights() {
    return (
        <div className="w-full h-full p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden flex flex-col">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-6 z-10">
                <div>
                    <h3 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                        Motor de Inteligencia IA
                    </h3>
                    <p className="text-sm text-slate-400 font-sans mt-1">Próxima Mejor Acción (Next-Best-Action)</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 z-10 custom-scrollbar pr-2">
                {insights.map((insight) => (
                    <div
                        key={insight.id}
                        className={`p-4 rounded-2xl border ${insight.border} ${insight.bg} transition-all duration-300 relative group overflow-hidden`}
                    >
                        {/* Hover glare effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform" />

                        <div className="flex gap-4">
                            <div className={`mt-1 p-2 rounded-xl bg-white/5 backdrop-blur-sm self-start ${insight.color} border border-white/5`}>
                                <insight.icon className="w-5 h-5" />
                            </div>

                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className="font-bold text-slate-200">{insight.client}</h4>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/10 text-xs font-mono text-slate-300 border border-white/10">
                                        IA Confianza: <span className={`ml-1 font-bold ${insight.color}`}>{insight.confidence}</span>
                                    </span>
                                </div>

                                <h5 className={`text-sm font-semibold ${insight.color} mb-1`}>{insight.title}</h5>
                                <p className="text-xs text-slate-400 mb-4 leading-relaxed">{insight.description}</p>

                                <button className={`flex items-center justify-center gap-2 w-full py-2 px-4 rounded-xl text-xs font-bold transition-all duration-300 border hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${insight.type === 'NEXT_BEST_ACTION'
                                        ? 'bg-amber-500 hover:bg-amber-400 text-slate-900 border-amber-400 focus:ring-amber-500'
                                        : insight.type === 'CHURN_RISK'
                                            ? 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border-rose-500/50 hover:border-rose-400 focus:ring-rose-500'
                                            : 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-200 border-orange-500/50 hover:border-orange-400 focus:ring-orange-500'
                                    }`}>
                                    {insight.action}
                                    <insight.actionIcon className="w-3 h-3" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

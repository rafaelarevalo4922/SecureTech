"use client";

import { useLanguage } from '@/lib/i18n/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
    Activity, ArrowUpRight, BarChart4, DollarSign,
    ShieldCheck, Users, CheckCircle2, TrendingUp, Search
} from 'lucide-react';

export function DashboardPreviewSection() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState("sales");
    const [isHovered, setIsHovered] = useState(false);

    // Auto-cycle tabs when not hovered
    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setActiveTab((prev) => (prev === "sales" ? "users" : prev === "users" ? "security" : "sales"));
        }, 4000);
        return () => clearInterval(interval);
    }, [isHovered]);

    const tabs = [
        { id: "sales", label: "Sistema de Ventas", icon: DollarSign, color: "text-blue-400" },
        { id: "users", label: "Control de Empleados", icon: Users, color: "text-emerald-400" },
        { id: "security", label: "Auditoría Total", icon: ShieldCheck, color: "text-purple-400" },
    ];

    return (
        <section className="py-24 relative overflow-hidden bg-slate-950">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6"
                    >
                        <Activity className="w-4 h-4" />
                        Software Inteligente y Visual
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold font-heading text-white mb-6"
                    >
                        Diseñado para ser <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Intuitivo</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-lg text-slate-400"
                    >
                        No necesitas ser un experto en tecnología. Creamos paneles limpios, gráficos claros y sistemas que cualquier persona de tu equipo puede aprender a usar en minutos.
                    </motion.p>
                </div>

                {/* Tab Controls */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${isActive
                                    ? "bg-slate-800 text-white shadow-lg border border-slate-700"
                                    : "bg-slate-900/50 text-slate-400 hover:bg-slate-800 border border-white/5 hover:text-slate-200"
                                    }`}
                            >
                                <Icon className={`w-4 h-4 ${isActive ? tab.color : "text-slate-500"}`} />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Interactive Dashboard Mockup */}
                <motion.div
                    className="relative max-w-5xl mx-auto rounded-xl sm:rounded-3xl border border-slate-800 bg-slate-950/80 backdrop-blur-2xl shadow-2xl overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                >
                    {/* Mock Browser Header */}
                    <div className="h-12 bg-slate-900 border-b border-slate-800 flex items-center px-4">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                        </div>
                        <div className="mx-auto bg-slate-800/50 rounded-md px-4 py-1 text-xs text-slate-400 font-mono hidden sm:block w-64 text-center border border-slate-700/50">
                            app.securetech.com/sistema
                        </div>
                    </div>

                    {/* Mock Dashboard Body */}
                    <div className="p-4 sm:p-8 min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {activeTab === "sales" && (
                                <motion.div
                                    key="sales"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Helper Tooltip for Non-tech Users */}
                                    <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-start gap-3">
                                        <div className="p-2 bg-blue-500/20 rounded-lg shrink-0">
                                            <CheckCircle2 className="w-5 h-5 text-blue-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-blue-300 text-sm mb-1">Crea tus propias métricas vitales</h4>
                                            <p className="text-slate-400 text-xs sm:text-sm">Agrega clientes, registra ventas y mira cuánto dinero ingresa al instante. Todo automático y organizado en un solo lugar visual.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h3 className="text-xl font-bold font-heading text-white">Resumen Mensual</h3>
                                            <p className="text-sm text-slate-400">Ingresos vs Gastos de este mes</p>
                                        </div>
                                        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                                            + Nueva Venta
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                                        {[
                                            { label: "Ventas Totales", value: "$45,231.89", trend: "+20.1%", icon: DollarSign },
                                            { label: "Nuevos Clientes", value: "+240", trend: "+12.5%", icon: Users },
                                            { label: "Cobros Pendientes", value: "$12,050.00", trend: "-2.4%", icon: TrendingUp },
                                        ].map((stat, i) => (
                                            <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col hover:border-blue-500/30 transition-colors">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                                        <stat.icon className="w-5 h-5 text-blue-400" />
                                                    </div>
                                                    <span className={`text-xs font-bold px-2 py-1 rounded-full border ${stat.trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                                                        {stat.trend}
                                                    </span>
                                                </div>
                                                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                                                <h4 className="text-2xl font-bold text-white mb-2">{stat.value}</h4>

                                                {/* Mini Chart Mock */}
                                                <div className="h-10 w-full mt-auto relative overflow-hidden rounded-md border border-slate-800">
                                                    <div className="absolute bottom-0 w-full flex items-end justify-between px-1 gap-1 h-full opacity-50">
                                                        {[...Array(6)].map((_, j) => {
                                                            // Altura estática calculada para evitar errores de hidratación SSR
                                                            const height = 40 + ((i * 17 + j * 23) % 60);
                                                            return (
                                                                <div key={j} className="w-full bg-blue-500 rounded-t-sm" style={{ height: `${height}%` }}></div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Mock Graph Area */}
                                    <div className="h-40 w-full bg-slate-900/50 border border-slate-800 rounded-2xl relative overflow-hidden hidden sm:block">
                                        <div className="absolute inset-x-0 bottom-0 top-10 border-b border-t border-slate-800/50"></div>
                                        <div className="absolute inset-0 flex items-end justify-around pb-4 px-10">
                                            {[30, 45, 60, 40, 75, 55, 80, 50, 95].map((val, i) => (
                                                <div key={i} className="relative flex flex-col items-center justify-end h-full">
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{ height: `${val}%` }}
                                                        transition={{ delay: 0.3 + (i * 0.1), duration: 0.8 }}
                                                        className="w-16 bg-gradient-to-t from-blue-600/50 to-blue-400 rounded-t-md relative group"
                                                    >
                                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                            ${(val * 100).toFixed(0)}
                                                        </div>
                                                    </motion.div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="absolute top-4 left-6 text-sm font-bold text-white flex items-center gap-2">
                                            <BarChart4 className="w-4 h-4 text-blue-400" /> Proyección Anual
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "users" && (
                                <motion.div
                                    key="users"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Helper Tooltip */}
                                    <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-start gap-3">
                                        <div className="p-2 bg-emerald-500/20 rounded-lg shrink-0">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-emerald-300 text-sm mb-1">Gestión Centralizada de Personal</h4>
                                            <p className="text-slate-400 text-xs sm:text-sm">Controla exactamente quién entra al sistema. Puedes darle permiso de "Solo Ver" a un empleado y permisos de "Administrador" a otro, ¡todo con un clic!</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h3 className="text-xl font-bold font-heading text-white">Directorio de Empleados</h3>
                                            <p className="text-sm text-slate-400">Desactiva usuarios problemáticos en segundos</p>
                                        </div>
                                        <div className="flex bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 items-center text-sm w-48 hidden sm:flex">
                                            <Search className="w-4 h-4 text-slate-500 mr-2" />
                                            <span className="text-slate-500">Buscar...</span>
                                        </div>
                                    </div>
                                    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
                                        <table className="w-full text-left text-sm whitespace-nowrap hidden sm:table">
                                            <thead className="bg-slate-800/50 text-slate-400 border-b border-slate-800">
                                                <tr>
                                                    <th className="px-6 py-4 font-semibold">Empleado</th>
                                                    <th className="px-6 py-4 font-semibold">Rol Asignado</th>
                                                    <th className="px-6 py-4 font-semibold">Estado</th>
                                                    <th className="px-6 py-4 font-semibold text-right">Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-slate-800">
                                                {[
                                                    { name: "Sarah Connor", role: "Super Administrador", status: "Activo" },
                                                    { name: "John Smith", role: "Ventas y Facturación", status: "Activo" },
                                                    { name: "Ana Bella", role: "Soporte (Solo Ver)", status: "Inactivo" },
                                                ].map((user, i) => (
                                                    <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                                                        <td className="px-6 py-4 font-medium text-slate-300 flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs ring-1 ring-emerald-500/50">
                                                                {user.name.charAt(0)}
                                                            </div>
                                                            {user.name}
                                                        </td>
                                                        <td className="px-6 py-4 text-slate-400 font-mono text-xs">{user.role}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${user.status === 'Activo' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                                                                <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Activo' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-500'}`}></span>
                                                                {user.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button className="text-emerald-400 hover:text-emerald-300 font-bold text-xs">Editar Permisos</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>

                                        {/* Mobile view fallback */}
                                        <div className="sm:hidden p-4 space-y-4">
                                            {[
                                                { name: "Sarah Connor", role: "Super Admin", status: "Activo" },
                                                { name: "John Smith", role: "Ventas", status: "Activo" },
                                            ].map((user, i) => (
                                                <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <div className="font-bold text-slate-300 flex items-center gap-2">
                                                            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">{user.name.charAt(0)}</div>
                                                            {user.name}
                                                        </div>
                                                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${user.status === 'Activo' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>{user.status}</span>
                                                    </div>
                                                    <div className="text-xs text-slate-400">Rol: {user.role}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === "security" && (
                                <motion.div
                                    key="security"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Helper Tooltip */}
                                    <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-start gap-3">
                                        <div className="p-2 bg-purple-500/20 rounded-lg shrink-0">
                                            <ShieldCheck className="w-5 h-5 text-purple-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-purple-300 text-sm mb-1">Protección y Auditoría 24/7</h4>
                                            <p className="text-slate-400 text-xs sm:text-sm">Siéntete tranquilo. Si alguien borra un registro importante o descarga una lista de clientes, el sistema guardará la hora, el nombre y el dispositivo para que nada pase desapercibido.</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <h3 className="text-xl font-bold font-heading text-white">Registro de Actividad</h3>
                                            <p className="text-sm text-slate-400">Averigua exactamente qué pasa en tu negocio</p>
                                        </div>
                                        <div className="w-10 h-10 rounded-full border border-purple-500/30 flex items-center justify-center bg-purple-500/10 text-purple-400 font-bold font-mono text-sm leading-none flex-col group cursor-help relative">
                                            <span>99%</span>
                                            <div className="absolute top-12 scale-0 group-hover:scale-100 transition-all bg-slate-800 border-slate-700 p-2 text-[10px] w-32 text-center rounded text-white font-sans z-10">Puntaje Global de Seguridad</div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {[
                                            { action: "Factura #INV-2041 eliminada permanentemente", time: "Hace 2 mins", user: "John Smith", risk: "high", ip: "iPhone 14 (Móvil)" },
                                            { action: "Nuevo producto añadido: 'Laptop HP'", time: "Hace 15 mins", user: "Sarah Connor", risk: "low", ip: "Windows (Oficina)" },
                                            { action: "Inició sesión exitosamente", time: "Hace 1 hora", user: "Sarah Connor", risk: "low", ip: "Windows (Oficina)" },
                                            { action: "Intento fallido de cambiar contraseña", time: "Hace 3 horas", user: "Desconocido", risk: "medium", ip: "Ubicación: China" },
                                        ].map((log, i) => (
                                            <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between group hover:border-purple-500/30 transition-colors gap-4">
                                                <div className="flex items-start gap-4">
                                                    <div className={`mt-1.5 shrink-0 w-2 h-2 rounded-full ${log.risk === 'high' ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : log.risk === 'medium' ? 'bg-amber-500 shadow-[0_0_10px_rgba(244,159,14,0.5)]' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`}></div>
                                                    <div>
                                                        <p className="text-slate-200 text-sm font-medium">{log.action}</p>
                                                        <div className="flex items-center gap-2 mt-1 -ml-1 flex-wrap">
                                                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">{log.user}</span>
                                                            <span className="text-slate-500 text-xs font-mono">{log.time}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pl-6 sm:pl-0 sm:text-right shrink-0">
                                                    <span className="text-[10px] font-mono bg-slate-800/80 px-2 py-1.5 rounded-md text-slate-400 border border-slate-700 flex sm:inline-flex items-center gap-2">
                                                        <ShieldCheck className="w-3 h-3 text-purple-400" />
                                                        {log.ip}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

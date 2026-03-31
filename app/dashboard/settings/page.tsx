"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Shield, Eye, EyeOff, CheckCircle2, AlertCircle, Lock, Loader2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function SettingsPage() {
    const { t } = useLanguage();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const strength = (() => {
        if (newPassword.length === 0) return 0;
        let score = 0;
        if (newPassword.length >= 8) score++;
        if (/[A-Z]/.test(newPassword)) score++;
        if (/[0-9]/.test(newPassword)) score++;
        if (/[^A-Za-z0-9]/.test(newPassword)) score++;
        return score;
    })();

    const strengthLabel = ["", "Débil", "Regular", "Buena", "Fuerte"][strength];
    const strengthColor = ["", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-emerald-500"][strength];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (!newPassword || !confirmPassword) {
            setErrorMsg("Por favor completa todos los campos.");
            setStatus("error");
            return;
        }
        if (newPassword.length < 8) {
            setErrorMsg("La nueva contraseña debe tener al menos 8 caracteres.");
            setStatus("error");
            return;
        }
        if (newPassword !== confirmPassword) {
            setErrorMsg("Las contraseñas no coinciden.");
            setStatus("error");
            return;
        }

        setStatus("loading");

        const supabase = createClient();
        const { error } = await supabase.auth.updateUser({ password: newPassword });

        if (error) {
            setErrorMsg(error.message || "Error al cambiar la contraseña.");
            setStatus("error");
        } else {
            setStatus("success");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setTimeout(() => setStatus("idle"), 4000);
        }
    };

    return (
        <div className="p-6 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">{t.dashboard.settings.title}</h1>
                <p className="text-slate-400 text-sm">{t.dashboard.settings.subtitle}</p>
            </div>

            <div className="max-w-xl">
                {/* Card */}
                <div className="bg-white/5 border border-white/10 rounded-[28px] overflow-hidden">
                    {/* Card Header */}
                    <div className="px-8 py-6 border-b border-white/5 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center">
                            <Shield className="w-4 h-4 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-white uppercase tracking-wider">Cambiar Contraseña</h3>
                            <p className="text-xs text-slate-500 mt-0.5">Actualiza tu contraseña de acceso al sistema</p>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
                        {/* New password */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Nueva Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                                <input
                                    type={showNew ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => { setNewPassword(e.target.value); setStatus("idle"); setErrorMsg(""); }}
                                    placeholder="Mínimo 8 caracteres"
                                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-11 pr-11 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
                                />
                                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                                    {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>

                            {/* Strength bar */}
                            {newPassword.length > 0 && (
                                <div className="mt-2.5 space-y-1.5">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4].map((i) => (
                                            <div
                                                key={i}
                                                className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : "bg-white/10"}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        Seguridad: <span className={`font-semibold ${strength >= 4 ? "text-emerald-400" : strength >= 3 ? "text-yellow-400" : strength >= 2 ? "text-orange-400" : "text-red-400"}`}>{strengthLabel}</span>
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Confirm password */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Confirmar Contraseña
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                                <input
                                    type={showConfirm ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => { setConfirmPassword(e.target.value); setStatus("idle"); setErrorMsg(""); }}
                                    placeholder="Repite la nueva contraseña"
                                    className={`w-full bg-black/20 border rounded-xl py-3 pl-11 pr-11 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:ring-2 transition-all ${
                                        confirmPassword && newPassword !== confirmPassword
                                            ? "border-red-500/50 focus:ring-red-500/30"
                                            : confirmPassword && newPassword === confirmPassword
                                            ? "border-emerald-500/50 focus:ring-emerald-500/30"
                                            : "border-white/10 focus:ring-blue-500/50 focus:border-blue-500/50"
                                    }`}
                                />
                                <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {confirmPassword && newPassword !== confirmPassword && (
                                <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" /> Las contraseñas no coinciden
                                </p>
                            )}
                            {confirmPassword && newPassword === confirmPassword && (
                                <p className="mt-1.5 text-xs text-emerald-400 flex items-center gap-1">
                                    <CheckCircle2 className="w-3 h-3" /> Las contraseñas coinciden
                                </p>
                            )}
                        </div>

                        {/* Error/Success messages */}
                        {status === "error" && errorMsg && (
                            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                                <p className="text-xs text-red-300">{errorMsg}</p>
                            </div>
                        )}
                        {status === "success" && (
                            <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <p className="text-xs text-emerald-300 font-medium">¡Contraseña actualizada correctamente!</p>
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={status === "loading" || status === "success"}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl text-sm font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]"
                        >
                            {status === "loading" ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Actualizando...</>
                            ) : status === "success" ? (
                                <><CheckCircle2 className="w-4 h-4" /> Contraseña Actualizada</>
                            ) : (
                                <><Shield className="w-4 h-4" /> Actualizar Contraseña</>
                            )}
                        </button>

                        {/* Tips */}
                        <div className="bg-black/20 border border-white/5 rounded-xl p-4">
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Recomendaciones</p>
                            <ul className="space-y-1">
                                {["Mínimo 8 caracteres", "Incluye mayúsculas y minúsculas", "Agrega números o símbolos"].map((tip) => (
                                    <li key={tip} className="text-xs text-slate-600 flex items-center gap-2">
                                        <span className="w-1 h-1 bg-slate-600 rounded-full" />
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

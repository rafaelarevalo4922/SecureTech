"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Settings, Shield, Bell, User, Paintbrush, Save } from "lucide-react";

export default function SettingsPage() {
    const { t } = useLanguage();

    return (
        <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div>
                <h1 className="text-3xl font-bold text-white mb-2">{t.dashboard.settings.title}</h1>
                <p className="text-slate-400 text-sm">{t.dashboard.settings.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Navigation Menu */}
                <div className="lg:col-span-1 space-y-2">
                    {[
                        { name: t.dashboard.settings.tabs.general, icon: User },
                        { name: t.dashboard.settings.tabs.security, icon: Shield, active: true },
                        { name: t.dashboard.settings.tabs.notifications, icon: Bell },
                        { name: t.dashboard.settings.tabs.appearance, icon: Paintbrush },
                    ].map((item, i) => (
                        <button
                            key={i}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all uppercase tracking-widest ${item.active
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                : "text-slate-500 hover:text-slate-300 hover:bg-white/5 border border-transparent"
                                }`}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                        </button>
                    ))}
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-[32px] p-8 space-y-6">
                        <div className="flex items-center justify-between border-b border-white/5 pb-6">
                            <div>
                                <h3 className="text-lg font-black text-white uppercase tracking-tight">{t.dashboard.settings.security}</h3>
                                <p className="text-xs text-slate-500 font-medium">{t.dashboard.settings.securityDesc}</p>
                            </div>
                            <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98]">
                                <Save className="w-3.5 h-3.5" />
                                {t.dashboard.settings.save}
                            </button>
                        </div>

                        <div className="space-y-4">
                            {[
                                { title: t.dashboard.settings.twoFactor, desc: t.dashboard.settings.twoFactorDesc, enabled: true },
                                { title: t.dashboard.settings.whitelisting, desc: t.dashboard.settings.whitelistingDesc, enabled: false },
                                { title: t.dashboard.settings.logging, desc: t.dashboard.settings.loggingDesc, enabled: true },
                            ].map((setting, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
                                    <div className="max-w-[70%]">
                                        <h4 className="text-sm font-bold text-slate-200">{setting.title}</h4>
                                        <p className="text-xs text-slate-500">{setting.desc}</p>
                                    </div>
                                    <div className={`w-12 h-6 rounded-full relative transition-colors cursor-pointer ${setting.enabled ? "bg-blue-600" : "bg-slate-800"}`}>
                                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${setting.enabled ? "left-7" : "left-1"}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

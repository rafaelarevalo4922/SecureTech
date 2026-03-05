"use client"

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ServerActionForm } from '../login/ServerActionForm'
import { OAuthButtons } from '@/components/auth/OAuthButtons'
import Link from 'next/link'
import { ShieldCheck, Mail, Lock, ArrowRight, Rocket, MousePointer2, Database, Globe, ArrowLeft } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { signUp } from './registerActions'

export default function RegisterPage() {
    const { t, language, setLanguage } = useLanguage()
    const searchParams = useSearchParams()
    const message = searchParams.get('message')

    return (
        <div className="min-h-screen bg-black flex flex-col md:flex-row font-outfit selection:bg-blue-500/30">
            {/* Back to Home */}
            <div className="absolute top-8 left-8 z-50">
                <Link
                    href="/"
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white text-[10px] font-black hover:bg-white/10 transition-all uppercase tracking-widest"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    {language === 'es' ? 'Inicio' : 'Home'}
                </Link>
            </div>

            {/* Language Toggle */}
            <div className="absolute top-8 right-8 z-50">
                <button
                    onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
                    className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white text-[10px] font-black hover:bg-white/10 transition-all uppercase tracking-widest"
                >
                    <Globe className="w-3.5 h-3.5" />
                    {language === 'es' ? 'English' : 'Español'}
                </button>
            </div>

            {/* Left Side: Branding & Marketing */}
            <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-20 flex flex-col justify-center relative overflow-hidden bg-[#020617]">
                {/* Abstract backgrounds */}
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(30,58,138,0.2),transparent_40%)] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_80%,rgba(20,184,166,0.1),transparent_40%)] pointer-events-none" />

                <div className="relative z-10 max-w-lg">
                    <Link href="/" className="inline-flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
                        <ShieldCheck className="w-8 h-8 text-blue-500" />
                        <span className="text-2xl font-black text-white tracking-tighter uppercase italic">SecureTech</span>
                    </Link>

                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6">
                        <Rocket className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{t.auth.register.badge}</span>
                    </div>

                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-6 tracking-tight">
                        {t.auth.register.hero.split('secure').map((part, i, arr) => (
                            <span key={i}>
                                {part}
                                {i < arr.length - 1 && <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">secure</span>}
                            </span>
                        ))}
                    </h1>

                    <p className="text-slate-400 text-base mb-10 leading-relaxed font-medium">
                        {t.auth.register.heroSub}
                    </p>

                    <div className="space-y-6">
                        <div className="flex gap-4 group">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                                <Database className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-black text-xs uppercase tracking-wider mb-1">{t.auth.register.f1Title}</h3>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                    {t.auth.register.f1Desc}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 group">
                            <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0 group-hover:bg-teal-500/20 transition-colors">
                                <Globe className="w-5 h-5 text-teal-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-black text-xs uppercase tracking-wider mb-1">{t.auth.register.f2Title}</h3>
                                <p className="text-slate-500 text-xs leading-relaxed">
                                    {t.auth.register.f2Desc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-20 bg-black flex flex-col justify-center items-center border-l border-white/5">
                <div className="w-full max-w-md">
                    <div className="text-center md:text-left mb-8">
                        <h2 className="text-2xl font-black text-white tracking-tight mb-2">{t.auth.register.title}</h2>
                        <p className="text-slate-500 text-xs font-medium leading-relaxed">
                            {t.auth.register.subtitle}
                        </p>
                    </div>

                    <ServerActionForm action={signUp}>
                        <div className="grid grid-cols-2 gap-4 mb-5">
                            <div className="space-y-2 col-span-1">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">{t.auth.register.firstName}</label>
                                <input
                                    name="firstName"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all shadow-inner text-sm"
                                    placeholder={t.auth.register.firstNamePlaceholder}
                                    required
                                />
                            </div>
                            <div className="space-y-2 col-span-1">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">{t.auth.register.lastName}</label>
                                <input
                                    name="lastName"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all shadow-inner text-sm"
                                    placeholder={t.auth.register.lastNamePlaceholder}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-5 mb-6">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">{t.auth.register.email}</label>
                                <input
                                    name="email"
                                    type="email"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all shadow-inner text-sm"
                                    placeholder={t.auth.register.emailPlaceholder}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">{t.auth.register.company}</label>
                                <input
                                    name="companyName"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all shadow-inner text-sm"
                                    placeholder={t.auth.register.companyPlaceholder}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">{t.auth.register.password}</label>
                                <input
                                    name="password"
                                    type="password"
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all shadow-inner text-sm"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <button className="w-full py-3 bg-white hover:bg-slate-100 text-black font-black text-[10px] uppercase tracking-widest rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-white/5 border border-white/10">
                            {t.auth.register.submit}
                        </button>

                        {message && (
                            <div className="mt-5 p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl">
                                <p className="text-center text-[10px] text-rose-500 font-bold uppercase tracking-wider leading-relaxed">
                                    {decodeURIComponent(message)}
                                </p>
                            </div>
                        )}
                    </ServerActionForm>

                    <div className="mt-8 relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <div className="relative flex justify-center text-[9px] uppercase tracking-[0.3em] font-black">
                            <span className="bg-black px-4 text-slate-600">{t.auth.register.quickAccess}</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <OAuthButtons />
                    </div>

                    <div className="mt-10 text-center">
                        <p className="text-slate-500 text-[10px] font-medium uppercase tracking-widest">
                            {t.auth.register.alreadyClient}{' '}
                            <Link href="/login" className="text-blue-500 hover:text-blue-400 font-black transition-colors underline decoration-blue-500/30 underline-offset-4 decoration-2">
                                {t.auth.register.signIn}
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

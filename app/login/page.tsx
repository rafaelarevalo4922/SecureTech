"use client"

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ServerActionForm } from './ServerActionForm'
import Link from 'next/link'
import { Lock, Mail, ShieldCheck, ArrowRight, Globe, ArrowLeft } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { signIn } from './loginActions'
import { Suspense } from 'react'

function LoginContent() {
    const { t, language, setLanguage } = useLanguage()
    const searchParams = useSearchParams()
    const message = searchParams.get('message')

    return (
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4 selection:bg-blue-500/30 font-outfit">
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

            {/* Background texture and gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(30,58,138,0.15),transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />

            <div className="w-full max-w-[460px] relative z-10">
                <div className="bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] rounded-[40px] p-8 md:p-10 relative overflow-hidden">
                    {/* Top Icon Area */}
                    <div className="flex flex-col items-center mb-8 text-center">
                        <div className="mb-4 transform hover:rotate-6 transition-transform">
                            <img src="/logo.png" alt="Systrategy Logo" className="h-20 w-24 object-contain" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-1">{t.auth.login.title}</h1>
                        <p className="text-slate-400 text-xs font-medium">{t.auth.login.subtitle}</p>
                    </div>

                    <ServerActionForm action={signIn}>
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1" htmlFor="email">
                                    {t.auth.login.email}
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        className="block w-full pl-12 pr-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all shadow-inner text-sm"
                                        name="email"
                                        type="email"
                                        placeholder="admin@systrategy.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]" htmlFor="password">
                                        {t.auth.login.password}
                                    </label>
                                    <Link href="#" className="text-[10px] font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-wider">
                                        {t.auth.login.forgot}
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                                    </div>
                                    <input
                                        className="block w-full pl-12 pr-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-white placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500/40 transition-all shadow-inner text-sm"
                                        type="password"
                                        name="password"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <button className="w-full group flex justify-center items-center gap-3 py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_12px_24px_-8px_rgba(59,130,246,0.5)] active:scale-[0.98] border border-blue-400/20">
                                <ShieldCheck className="w-4 h-4" />
                                {t.auth.login.submit}
                            </button>
                        </div>

                        {message && (
                            <div className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
                                <p className="text-center text-[10px] text-rose-500 font-bold uppercase tracking-wider">
                                    {decodeURIComponent(message)}
                                </p>
                            </div>
                        )}
                    </ServerActionForm>
                </div>

                <div className="mt-8 text-center flex flex-col items-center gap-3">
                    <p className="text-slate-500 text-xs font-medium">
                        {t.auth.login.noAccount}
                    </p>
                    <Link href="/register" className="group inline-flex items-center gap-2 py-2 px-6 rounded-full bg-white/5 border border-white/10 text-blue-400 hover:text-blue-300 hover:bg-white/10 font-bold text-[10px] uppercase tracking-widest transition-all">
                        {t.auth.login.requestConsultation}
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-[#020617] flex items-center justify-center" />}>
            <LoginContent />
        </Suspense>
    )
}

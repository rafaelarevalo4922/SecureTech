import Link from 'next/link'
import { CheckCircle, ArrowLeft } from 'lucide-react'

export default function AuditoriaSuccessPage() {
    return (
        <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center p-4 selection:bg-blue-500/30 font-outfit relative overflow-hidden">
            {/* Background texture and gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(30,58,138,0.15),transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none" />

            <div className="w-full max-w-[500px] relative z-10">
                <div className="bg-[#0f172a]/80 backdrop-blur-2xl border border-white/10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] rounded-[40px] p-8 md:p-10 text-center relative overflow-hidden">
                    {/* Decorative top line */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                    
                    <div className="flex flex-col items-center mb-8">
                        <div className="mb-6 transform hover:scale-110 transition-transform duration-500">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
                                <img src="/logo.png" alt="Systrategy Logo" className="h-24 w-28 object-contain relative z-10" />
                            </div>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-4">
                            <CheckCircle className="w-3 h-3" />
                            Solicitud Recibida
                        </div>
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                            ¡Diagnóstico Solicitado!
                        </h1>
                    </div>

                    <div className="space-y-6 text-slate-400 text-sm leading-relaxed mb-10">
                        <p className="font-medium">
                            Hemos recibido tus respuestas correctamente. Tu camino hacia la transformación digital ha comenzado.
                        </p>
                        <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-[24px] text-left">
                            <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-3">
                                Próximo paso
                            </p>
                            <p className="text-slate-300 text-xs font-medium">
                                Nuestro equipo analizará tu caso y nos contactaremos contigo vía <strong>WhatsApp</strong> o <strong>Email</strong> a la brevedad para realizar tu diagnóstico gratuito.
                            </p>
                        </div>
                    </div>

                    <div className="pt-2">
                        <Link
                            href="/"
                            className="group flex justify-center items-center gap-2 w-full py-4 px-6 bg-white text-black hover:bg-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-[0_20px_40px_-12px_rgba(255,255,255,0.2)] active:scale-[0.98]"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Volver al Inicio
                        </Link>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">
                        Systrategy © 2026 — Advanced Enterprise Software
                    </p>
                </div>
            </div>
        </div>
    )
}
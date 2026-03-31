'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { CheckCircle2, AlertCircle, Target, Activity, ShieldCheck, TrendingUp, Grid, Mail, Phone, ChevronLeft, ChevronDown, ChevronRight } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import Link from 'next/link'

export default function AuditoriaFormPage() {
    const router = useRouter()
    const { t, language, setLanguage } = useLanguage()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [selectedChallenges, setSelectedChallenges] = useState<string[]>([])
    const [selectedSecurities, setSelectedSecurities] = useState<string[]>([])

    // Create refs for each section
    const challengeRef = useRef<HTMLDivElement>(null)
    const securityRef = useRef<HTMLDivElement>(null)
    const companyRef = useRef<HTMLDivElement>(null)
    const industryRef = useRef<HTMLDivElement>(null)
    const teamSizeRef = useRef<HTMLDivElement>(null)
    const contactEmailRef = useRef<HTMLDivElement>(null)
    const contactPhoneRef = useRef<HTMLDivElement>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const formData = new FormData(e.currentTarget)

        // Extracting array values properly
        const operational_issues = formData.getAll('operational_issues') as string[]
        const impact_projection = formData.getAll('impact_projection') as string[]
        const modules_interest = formData.getAll('modules_interest') as string[]

        // Get form values
        const challenges = formData.getAll('challenge') as string[]
        const security_access = formData.getAll('security_access') as string[]
        const company_name = formData.get('company_name') as string
        const industry = formData.get('industry') as string
        const team_size = formData.get('team_size') as string
        const contact_email = formData.get('contact_email') as string
        const contact_phone = formData.get('contact_phone') as string

        // Validation with refs
        const errors: { message: string; ref: React.RefObject<HTMLDivElement | null> }[] = []

        if (challenges.length === 0) errors.push({ message: 'Selecciona al menos un desafío principal', ref: challengeRef })
        if (security_access.length === 0) errors.push({ message: 'Selecciona al menos una opción de seguridad y acceso', ref: securityRef })
        if (!company_name || company_name.trim() === '') errors.push({ message: 'Nombre de la empresa obligatorio', ref: companyRef })
        if (!industry || industry.trim() === '') errors.push({ message: 'Sector/industria obligatorio', ref: industryRef })
        if (!team_size) errors.push({ message: 'Tamaño del equipo obligatorio', ref: teamSizeRef })
        if (!contact_email || contact_email.trim() === '') errors.push({ message: 'Correo profesional obligatorio', ref: contactEmailRef })
        if (!contact_phone || contact_phone.trim() === '') errors.push({ message: 'Número de contacto obligatorio', ref: contactPhoneRef })

        if (errors.length > 0) {
            setLoading(false)
            // Create error message
            const errorMessages = errors.map(e => '• ' + e.message).join('\n')
            setError(errorMessages)

            // Scroll to first missing field
            const firstErrorRef = errors[0]?.ref
            if (firstErrorRef?.current) {
                firstErrorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
                // Highlight the field
                firstErrorRef.current.classList.add('ring-2', 'ring-red-500', 'rounded-lg')
                setTimeout(() => {
                    firstErrorRef.current?.classList.remove('ring-2', 'ring-red-500', 'rounded-lg')
                }, 3000)
            }
            return
        }

        const auditData = {
            challenge: challenges,
            operational_issues,
            security_access: security_access,
            impact_projection,
            modules_interest,
            company_name,
            industry,
            team_size,
            contact_email,
            contact_phone: `${formData.get('phone_code')}${contact_phone}`,
        }

        const supabase = createClient()
        const { error: insertError } = await supabase
            .from('audit_responses')
            .insert([auditData])

        setLoading(false)

        if (insertError) {
            console.error("Insert error:", insertError)
            setError('Hubo un error al enviar el formulario. Por favor, inténtalo de nuevo.')
        } else {
            // Send emails (best-effort, doesn't block redirect)
            fetch('/api/diagnostic', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(auditData),
            }).catch(err => console.error('Email error (non-blocking):', err))

            router.push('/auditoria/success')
        }
    }

    return (
        <div className="min-h-screen bg-[#0a0f1c] py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-outfit text-white">
            {/* Background gradients */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header with back button and language switcher */}
                <div className="flex items-center justify-between mb-12">
                    <Link href="/" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all">
                        <ChevronLeft className="w-4 h-4" />
                        <span className="text-sm font-medium">{t.auditoria?.form?.backToHome || 'Back to Home'}</span>
                    </Link>

                    {/* Language Switcher */}
                    <div className="flex items-center bg-slate-900 border border-slate-800 rounded-full p-1">
                        <button
                            onClick={() => setLanguage('es')}
                            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${language === 'es' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            ES
                        </button>
                        <button
                            onClick={() => setLanguage('en')}
                            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all ${language === 'en' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            EN
                        </button>
                    </div>
                </div>

                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                        <CheckCircle2 className="w-4 h-4" />
                        {t.auditoria?.form?.badge || 'Diagnóstico Gratuito'}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Diagnóstico</span> Digital Gratuito
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        {t.auditoria?.form?.description || 'Completa este formulario rápido para identificar tus puntos de dolor y descubrir cómo un sistema a medida puede escalar tu negocio.'}
                    </p>
                </div>

                <div className="bg-[#111827]/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-white/5">
                    <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-12">
                        {error && (
                            <div className="bg-red-500/15 border-l-4 border-red-500 p-5 rounded-lg flex items-start gap-4 text-red-300 animate-in fade-in slide-in-from-top-2 shadow-lg shadow-red-500/10">
                                <AlertCircle className="w-6 h-6 mt-0.5 flex-shrink-0 text-red-400" />
                                <div className="flex-1">
                                    <p className="font-semibold text-red-300 mb-2">Por favor completa los siguientes campos:</p>
                                    <p className="text-sm whitespace-pre-wrap">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Section 1: Challenge */}
                        <div ref={challengeRef} className="space-y-6 transition-all">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold">1. Identificación del Desafío Principal</h2>
                                    <p className="text-slate-400 text-sm mt-1">¿Cuáles son los obstáculos más grandes que enfrenta tu operativa actualmente? (Selecciona varios si aplica)</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Falta de visibilidad: No tengo datos en tiempo real.",
                                    "Inseguridad: Me preocupa quién accede a la información.",
                                    "Procesos manuales: Perdemos tiempo en tareas repetitivas.",
                                    "Escalabilidad: Mi sistema actual no crece con mi negocio."
                                ].map((option, i) => {
                                    const isSelected = selectedChallenges.includes(option);
                                    return (
                                        <label
                                            key={i}
                                            className={`relative flex p-4 cursor-pointer rounded-xl border transition-all group ${isSelected
                                                ? 'bg-blue-500/15 border-blue-500/60 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]'
                                                : 'border-white/5 bg-white/5 hover:bg-blue-500/10 hover:border-blue-500/30'
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                name="challenge"
                                                value={option}
                                                className="sr-only"
                                                checked={isSelected}
                                                onChange={() => {
                                                    if (isSelected) {
                                                        setSelectedChallenges(prev => prev.filter(c => c !== option))
                                                    } else {
                                                        setSelectedChallenges(prev => [...prev, option])
                                                    }
                                                }}
                                            />
                                            <div className="flex items-center justify-between w-full">
                                                <span className={`text-sm transition-colors ${isSelected ? 'text-white font-semibold' : 'text-slate-300 group-hover:text-white'}`}>{option}</span>
                                                <div className={`w-5 h-5 rounded-md border-2 flex flex-shrink-0 items-center justify-center transition-all ml-4 ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-slate-600'
                                                    }`}>
                                                    {isSelected && <div className="w-2 h-2 rounded-sm bg-white" />}
                                                </div>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Section 2: Operations */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold">2. Radiografía Operativa</h2>
                                    <p className="text-slate-400 text-sm mt-1">Marca las situaciones que ocurren hoy en tu empresa (Puedes seleccionar varias):</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {[
                                    "Errores frecuentes en el registro de ventas o facturación.",
                                    "El control de inventario no coincide con la realidad física.",
                                    "Es difícil rastrear las interacciones o el historial de los clientes.",
                                    "El personal utiliza herramientas no protegidas para datos sensibles.",
                                    "No contamos con respaldos automáticos de nuestra información."
                                ].map((option, i) => (
                                    <label key={i} className="relative flex items-center p-4 cursor-pointer rounded-xl border border-white/5 bg-white/5 hover:bg-purple-500/10 hover:border-purple-500/50 transition-all group">
                                        <div className="flex items-center h-5 mr-4">
                                            <input type="checkbox" name="operational_issues" value={option} className="w-5 h-5 rounded border-slate-600 text-purple-500 focus:ring-purple-500 bg-[#0a0f1c]" />
                                        </div>
                                        <span className="text-slate-300 group-hover:text-white transition-colors">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Section 3: Security */}
                        <div ref={securityRef} className="space-y-6 transition-all">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                                    <ShieldCheck className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold">3. Seguridad y Acceso</h2>
                                    <p className="text-slate-400 text-sm mt-1">¿Cómo gestionan actualmente los permisos de su equipo? (Selecciona varios si aplica)</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Todos tienen acceso a casi todo.",
                                    "Usamos contraseñas compartidas.",
                                    "Tenemos niveles de acceso, pero son difíciles de administrar.",
                                    "No tengo certeza de quién modificó qué dato."
                                ].map((option, i) => {
                                    const isSelected = selectedSecurities.includes(option);
                                    return (
                                        <label
                                            key={i}
                                            className={`relative flex p-4 cursor-pointer rounded-xl border transition-all group ${isSelected
                                                ? 'bg-emerald-500/15 border-emerald-500/60 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]'
                                                : 'border-white/5 bg-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/30'
                                                }`}
                                        >
                                            <input
                                                type="checkbox"
                                                name="security_access"
                                                value={option}
                                                className="sr-only"
                                                checked={isSelected}
                                                onChange={() => {
                                                    if (isSelected) {
                                                        setSelectedSecurities(prev => prev.filter(c => c !== option))
                                                    } else {
                                                        setSelectedSecurities(prev => [...prev, option])
                                                    }
                                                }}
                                            />
                                            <div className="flex items-center justify-between w-full">
                                                <span className={`text-sm transition-colors ${isSelected ? 'text-white font-semibold' : 'text-slate-300 group-hover:text-white'}`}>{option}</span>
                                                <div className={`w-5 h-5 rounded-md border-2 flex flex-shrink-0 items-center justify-center transition-all ml-4 ${isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-slate-600'
                                                    }`}>
                                                    {isSelected && <div className="w-2 h-2 rounded-sm bg-white" />}
                                                </div>
                                            </div>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Section 4: Impact */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold">4. Proyección de Impacto</h2>
                                    <p className="text-slate-400 text-sm mt-1">¿Dónde verías el mayor beneficio al tener un sistema ideal? (Puedes seleccionar varias)</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "Ahorro de horas hombre (Productividad).",
                                    "Reducción de pérdidas económicas.",
                                    "Mejor servicio al cliente y cierre de ventas.",
                                    "Tranquilidad legal y seguridad de datos."
                                ].map((option, i) => (
                                    <label key={i} className="relative flex items-center p-4 cursor-pointer rounded-xl border border-white/5 bg-white/5 hover:bg-amber-500/10 hover:border-amber-500/50 transition-all group">
                                        <div className="flex items-center h-5 mr-4">
                                            <input type="checkbox" name="impact_projection" value={option} className="w-5 h-5 rounded border-slate-600 text-amber-500 focus:ring-amber-500 bg-[#0a0f1c]" />
                                        </div>
                                        <span className="text-slate-300 group-hover:text-white text-sm transition-colors">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Section 5: Modules */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
                                    <Grid className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold">5. Módulos de Interés</h2>
                                    <p className="text-slate-400 text-sm mt-1">¿Qué componentes crees que necesita tu arquitectura ideal?</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[
                                    "Gestión de Usuarios y Roles (Seguridad)",
                                    "Control de Inventarios y Productos",
                                    "Ventas, Facturación y Reportes Financieros",
                                    "CRM y Gestión de Clientes",
                                    "Panel de Analítica y Gráficos en Tiempo Real"
                                ].map((option, i) => (
                                    <label key={i} className="relative flex items-center p-4 cursor-pointer rounded-xl border border-white/5 bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all group">
                                        <div className="flex items-center h-5 mr-3">
                                            <input type="checkbox" name="modules_interest" value={option} className="w-4 h-4 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500 bg-[#0a0f1c]" />
                                        </div>
                                        <span className="text-slate-300 group-hover:text-white text-sm transition-colors">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Section 6: Contact */}
                        <div className="space-y-6 pt-6">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <div className="p-2 bg-pink-500/20 rounded-lg text-pink-400">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-semibold">6. Datos de Contacto</h2>
                                    <p className="text-slate-400 text-sm mt-1">Para enviarte tu reporte personalizado.</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div ref={companyRef}>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2" htmlFor="company_name">
                                        Nombre de la Empresa
                                    </label>
                                    <input required type="text" name="company_name" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white transition-all outline-none placeholder:text-slate-600" placeholder="Tu Empresa S.A." />
                                </div>
                                <div ref={industryRef}>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2" htmlFor="industry">
                                        Sector/Industria
                                    </label>
                                    <input required type="text" name="industry" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white transition-all outline-none placeholder:text-slate-600" placeholder="Tecnología, Retail, etc." />
                                </div>
                                <div ref={teamSizeRef}>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2" htmlFor="team_size">
                                        Tamaño del equipo
                                    </label>
                                    <div className="relative">
                                        <select required name="team_size" defaultValue="" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white transition-all outline-none appearance-none cursor-pointer">
                                            <option value="" disabled>Selecciona una opción</option>
                                            <option value="1-10" className="text-slate-800">1 a 10 personas</option>
                                            <option value="10-50" className="text-slate-800">10 a 50 personas</option>
                                            <option value="50+" className="text-slate-800">Más de 50 personas</option>
                                        </select>
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                            <ChevronDown className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                                <div ref={contactEmailRef}>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2" htmlFor="contact_email">
                                        Correo Profesional
                                    </label>
                                    <input required type="email" name="contact_email" placeholder="tu@empresa.com" className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white transition-all outline-none placeholder:text-slate-600" />
                                </div>
                                <div ref={contactPhoneRef} className="sm:col-span-2">
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
                                        Número de Contacto
                                    </label>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <div className="relative flex-shrink-0">
                                            <select
                                                name="phone_code"
                                                defaultValue="+591"
                                                className="w-full sm:w-[160px] px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white transition-all outline-none appearance-none text-sm font-medium cursor-pointer"
                                            >
                                                <option value="+591" className="text-slate-800">🇧🇴 Bolivia (+591)</option>
                                                <option value="+1" className="text-slate-800">🇺🇸 USA (+1)</option>
                                                <option value="+52" className="text-slate-800">🇲🇽 México (+52)</option>
                                                <option value="+34" className="text-slate-800">🇪🇸 España (+34)</option>
                                                <option value="+54" className="text-slate-800">🇦🇷 Argentina (+54)</option>
                                                <option value="+56" className="text-slate-800">🇨🇱 Chile (+56)</option>
                                                <option value="+57" className="text-slate-800">🇨🇴 Colombia (+57)</option>
                                                <option value="+51" className="text-slate-800">🇵🇪 Perú (+51)</option>
                                                <option value="+58" className="text-slate-800">🇻🇪 Venezuela (+58)</option>
                                                <option value="+593" className="text-slate-800">🇪🇨 Ecuador (+593)</option>
                                                <option value="+595" className="text-slate-800">🇵🇾 Paraguay (+595)</option>
                                                <option value="+598" className="text-slate-800">🇺🇾 Uruguay (+598)</option>
                                                <option value="+506" className="text-slate-800">🇨🇷 Costa Rica (+506)</option>
                                                <option value="+502" className="text-slate-800">🇬🇹 Guatemala (+502)</option>
                                                <option value="+507" className="text-slate-800">🇵🇦 Panamá (+507)</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                                <ChevronDown className="w-4 h-4" />
                                            </div>
                                        </div>
                                        <input
                                            required
                                            type="tel"
                                            name="contact_phone"
                                            placeholder="555 123 4567"
                                            className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white transition-all outline-none placeholder:text-slate-600"
                                        />
                                    </div>
                                    <p className="text-[10px] text-slate-500 mt-2 ml-1">Tu información está protegida por encriptación Systrategy.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-10">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full relative group overflow-hidden flex justify-center items-center py-4 px-8 rounded-xl shadow-2xl font-medium text-white transition-all hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 transition-transform duration-300 group-hover:scale-[1.05]" />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {loading ? (
                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        <span>Procesando solicitud...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 relative z-10 text-lg">
                                        <CheckCircle2 className="w-6 h-6" />
                                        <span>Quiero mi Diagnóstico Gratis →</span>
                                    </div>
                                )}
                            </button>
                            <p className="text-center text-sm text-slate-500 mt-6 flex justify-center items-center gap-2">
                                <ShieldCheck className="w-4 h-4" />
                                Tus datos están encriptados y protegidos por Systrategy.
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

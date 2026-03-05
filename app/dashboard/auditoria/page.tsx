import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { AlertCircle, ShieldCheck, Mail } from 'lucide-react'
import Link from 'next/link'
import PhoneActions from '@/components/dashboard/PhoneActions'

export default async function AuditoriaDashboardPage() {
    const supabase = await createClient()

    // 1. Verify Authentication and Role
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Get user profile to check role
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (!profile || profile.role !== 'Admin') {
        const currentRole = profile?.role || (profileError ? `Error: ${profileError.message}` : 'Desconocido');
        return (
            <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 font-outfit">
                <div className="max-w-2xl w-full">
                    <div className="bg-[#0f172a]/80 backdrop-blur-2xl border border-rose-500/20 p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
                        {/* Decorative background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 blur-[80px] -z-10" />

                        <div className="flex flex-col items-center text-center mb-10">
                            <div className="w-20 h-20 bg-rose-500/10 rounded-3xl flex items-center justify-center mb-6 border border-rose-500/20 animate-pulse">
                                <AlertCircle className="w-10 h-10 text-rose-500" />
                            </div>
                            <h2 className="text-4xl font-black text-white tracking-tight mb-4">Acceso Denegado</h2>
                            <p className="text-slate-400 font-medium leading-relaxed max-w-md">
                                Solo los administradores con el rol <span className="text-blue-400 font-bold uppercase tracking-widest">Admin</span> pueden ver los registros de auditoría.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-black/40 rounded-3xl p-6 border border-white/5 space-y-4">
                                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                                    <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Tu Rol Detectado</span>
                                    <span className="text-rose-500 font-black uppercase text-xs px-3 py-1 bg-rose-500/10 rounded-full border border-rose-500/20">
                                        {currentRole}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                                    <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Email Autenticado</span>
                                    <span className="text-white font-mono text-xs">{user.email}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Tu ID Único (UUID)</span>
                                    <span className="text-slate-400 font-mono text-[10px] break-all bg-black/40 p-2 rounded-xl border border-white/5">
                                        {user.id}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="p-5 bg-blue-500/5 border border-blue-500/20 rounded-3xl">
                                    <h3 className="text-blue-400 text-xs font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4" />
                                        Cómo solucionar esto (SQL)
                                    </h3>
                                    <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
                                        Copia y pega este comando en el <strong>SQL Editor</strong> de tu tablero de Supabase para forzar tu rol de administrador:
                                    </p>
                                    <div className="relative group">
                                        <pre className="bg-black/80 p-4 rounded-2xl text-[10px] text-blue-300 font-mono border border-blue-500/20 overflow-x-auto">
                                            {`INSERT INTO public.profiles (id, email, role)
VALUES ('${user.id}', '${user.email}', 'Admin')
ON CONFLICT (id) DO UPDATE SET role = 'Admin';`}
                                        </pre>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <Link href="/dashboard" className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-bold text-xs uppercase tracking-widest text-center transition-all">
                                        Volver al Panel
                                    </Link>
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20"
                                    >
                                        Refrescar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // 2. Fetch Data if Admin
    const { data: responses, error } = await supabase
        .from('audit_responses')
        .select('*')
        .order('created_at', { ascending: false })

    if (error) {
        return (
            <div className="p-8">
                <p className="text-red-500">Error al cargar los datos: {error.message}</p>
            </div>
        )
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Registros de Auditoría</h1>
                <p className="text-slate-400">
                    Vista de administrador de todos los prospectos y clientes que completaron el formulario.
                </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-slate-800/50 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
                            <tr>
                                <th scope="col" className="px-6 py-4">Empresa / Contacto</th>
                                <th scope="col" className="px-6 py-4">Teléfono</th>
                                <th scope="col" className="px-6 py-4">Desafío Principal</th>
                                <th scope="col" className="px-6 py-4">Módulos de Interés</th>
                                <th scope="col" className="px-6 py-4">Fecha</th>
                                <th scope="col" className="px-6 py-4">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {responses?.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                        No hay registros de auditoría todavía.
                                    </td>
                                </tr>
                            ) : (
                                responses?.map((response) => (
                                    <tr key={response.id} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="font-medium text-white">{response.company_name}</div>
                                            <div className="text-slate-400 text-xs">{response.contact_email}</div>
                                            <div className="text-slate-500 text-xs mt-1 bg-slate-800 inline-block px-2 py-0.5 rounded-full">
                                                {response.industry} • {response.team_size} pers.
                                            </div>
                                        </td>
                                        {/* Phone column */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {response.contact_phone ? (
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-white font-mono text-xs font-bold">{response.contact_phone}</span>
                                                    <PhoneActions phone={response.contact_phone} companyName={response.company_name} />
                                                </div>
                                            ) : (
                                                <span className="text-slate-600 text-xs italic">Sin teléfono</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="truncate max-w-xs" title={response.challenge}>
                                                {response.challenge}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1 max-w-xs">
                                                {response.modules_interest.map((mod: string, idx: number) => (
                                                    <span key={idx} className="bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] px-2 py-0.5 rounded-full truncate max-w-[150px]" title={mod}>
                                                        {mod}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-slate-400">
                                            {format(new Date(response.created_at), "d MMM yyyy, HH:mm", { locale: es })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <a
                                                href={`mailto:${response.contact_email}?subject=SecureTech - Reunión de Auditoría Gratuita`}
                                                className="flex items-center gap-1.5 text-blue-500 hover:text-blue-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-blue-500/30 hover:bg-blue-500/10 transition-colors uppercase tracking-wider"
                                            >
                                                <Mail className="w-3 h-3" />
                                                Email
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

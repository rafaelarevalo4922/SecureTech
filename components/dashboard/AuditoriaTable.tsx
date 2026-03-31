"use client";

import { useState, useCallback } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Mail, Search, Eye, X, User, Building2, Phone, Calendar, Briefcase, MessageSquare, CheckCircle2, Clock, PhoneCall, Filter } from 'lucide-react';
import PhoneActions from './PhoneActions';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { createClient } from '@/utils/supabase/client';

// ─── Types ────────────────────────────────────────────────────────────────────
type Status = 'pendiente' | 'contactado' | 'atendido';

interface AuditResponse {
    id: string;
    created_at: string;
    company_name: string;
    contact_email: string;
    contact_phone: string;
    industry: string;
    team_size: string;
    challenge: string;
    modules_interest: string[];
    status?: Status;
}

interface AuditoriaTableProps {
    responses: AuditResponse[];
}

// ─── Status config ────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<Status, { label: string; color: string; bg: string; icon: React.ElementType }> = {
    pendiente:  { label: 'Pendiente',  color: 'text-amber-400',  bg: 'bg-amber-500/10 border-amber-500/20',  icon: Clock },
    contactado: { label: 'Contactado', color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20',    icon: PhoneCall },
    atendido:   { label: 'Atendido',   color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', icon: CheckCircle2 },
};

const ALL_STATUSES: Status[] = ['pendiente', 'contactado', 'atendido'];

// ─── StatusBadge ──────────────────────────────────────────────────────────────
function StatusBadge({ status, onChange }: { status: Status; onChange: (s: Status) => void }) {
    const [open, setOpen] = useState(false);
    const cfg = STATUS_CONFIG[status];
    const Icon = cfg.icon;

    return (
        <div className="relative">
            <button
                onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider transition-all ${cfg.bg} ${cfg.color}`}
            >
                <Icon className="w-3 h-3" />
                {cfg.label}
            </button>
            {open && (
                <div
                    className="absolute left-0 top-full mt-1 z-50 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden min-w-[140px]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {ALL_STATUSES.map((s) => {
                        const c = STATUS_CONFIG[s];
                        const I = c.icon;
                        return (
                            <button
                                key={s}
                                onClick={() => { onChange(s); setOpen(false); }}
                                className={`w-full flex items-center gap-2 px-3 py-2.5 text-[10px] font-bold uppercase tracking-wider transition-all hover:bg-white/5 ${s === status ? c.color : 'text-slate-400'}`}
                            >
                                <I className="w-3 h-3" /> {c.label}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AuditoriaTable({ responses: initialResponses }: AuditoriaTableProps) {
    const { t } = useLanguage();
    const [responses, setResponses] = useState<AuditResponse[]>(
        initialResponses.map(r => ({ ...r, status: (r.status as Status) || 'pendiente' }))
    );
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<Status | 'all'>('all');
    const [selectedResponse, setSelectedResponse] = useState<AuditResponse | null>(null);

    // Counts for filter tabs
    const counts = {
        all: responses.length,
        pendiente: responses.filter(r => r.status === 'pendiente').length,
        contactado: responses.filter(r => r.status === 'contactado').length,
        atendido: responses.filter(r => r.status === 'atendido').length,
    };

    const filteredResponses = responses.filter(r => {
        const matchSearch =
            r.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.contact_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.contact_phone?.includes(searchTerm);
        const matchStatus = filterStatus === 'all' || r.status === filterStatus;
        return matchSearch && matchStatus;
    });

    // Update status in Supabase and local state
    const handleStatusChange = useCallback(async (id: string, newStatus: Status) => {
        setResponses(prev => prev.map(r => r.id === id ? { ...r, status: newStatus } : r));
        if (selectedResponse?.id === id) {
            setSelectedResponse(prev => prev ? { ...prev, status: newStatus } : null);
        }
        const supabase = createClient();
        await supabase.from('audit_responses').update({ status: newStatus }).eq('id', id);
    }, [selectedResponse?.id]);

    const gmailUrl = (email: string, company: string) =>
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(`Systrategy — Seguimiento Comercial | ${company}`)}&body=${encodeURIComponent(`Hola ${company},\n\nGracias por completar el diagnóstico empresarial con Systrategy.\n\nNos ponemos en contacto para coordinar una presentación personalizada.\n\nSaludos,\nEquipo Systrategy`)}`;

    return (
        <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1">{t.auditoria?.dashboard?.title || 'Control de Clientes'}</h1>
                    <p className="text-slate-400 text-sm">{t.auditoria?.dashboard?.subtitle || 'Vista de administrador de todos los prospectos y clientes.'}</p>
                </div>
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Buscar por empresa, email o teléfono..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-11 pr-6 py-3 bg-slate-900/50 border border-slate-800 rounded-2xl text-white text-sm outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all w-full md:w-80"
                    />
                </div>
            </div>

            {/* Status filter tabs */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
                <Filter className="w-3.5 h-3.5 text-slate-500" />
                {([['all', 'Todos'], ['pendiente', 'Pendientes'], ['contactado', 'Contactados'], ['atendido', 'Atendidos']] as [Status | 'all', string][]).map(([key, label]) => (
                    <button
                        key={key}
                        onClick={() => setFilterStatus(key)}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
                            filterStatus === key
                                ? key === 'all' ? 'bg-white/10 border-white/20 text-white'
                                    : `${STATUS_CONFIG[key as Status]?.bg} ${STATUS_CONFIG[key as Status]?.color}`
                                : 'border-transparent text-slate-500 hover:text-slate-300'
                        }`}
                    >
                        {label}
                        <span className={`px-1.5 py-0.5 rounded-full text-[9px] ${filterStatus === key ? 'bg-white/20' : 'bg-white/5'}`}>
                            {counts[key]}
                        </span>
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-slate-800/30 text-[10px] uppercase font-bold tracking-widest text-slate-500 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-5">Empresa / Contacto</th>
                                <th className="px-6 py-5">Estado</th>
                                <th className="px-6 py-5">Teléfono</th>
                                <th className="px-6 py-5">Fecha</th>
                                <th className="px-6 py-5 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {filteredResponses.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 bg-slate-800/50 rounded-2xl flex items-center justify-center">
                                                <Search className="w-6 h-6 text-slate-600" />
                                            </div>
                                            <p className="text-slate-500 font-medium">No hay registros</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredResponses.map((response) => (
                                    <tr
                                        key={response.id}
                                        onClick={() => setSelectedResponse(response)}
                                        className="hover:bg-blue-500/[0.03] transition-colors group cursor-pointer"
                                    >
                                        {/* Company */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
                                                    response.status === 'atendido' ? 'bg-emerald-500/20 text-emerald-400' :
                                                    response.status === 'contactado' ? 'bg-blue-500/20 text-blue-400' :
                                                    'bg-slate-800 text-slate-400 group-hover:bg-blue-500/20 group-hover:text-blue-400'
                                                }`}>
                                                    {response.company_name[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white text-sm group-hover:text-blue-300 transition-colors">{response.company_name}</div>
                                                    <div className="text-slate-500 text-xs">{response.contact_email}</div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Status */}
                                        <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                            <StatusBadge
                                                status={(response.status as Status) || 'pendiente'}
                                                onChange={(s) => handleStatusChange(response.id, s)}
                                            />
                                        </td>

                                        {/* Phone */}
                                        <td className="px-6 py-4">
                                            {response.contact_phone ? (
                                                <div className="flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
                                                    <span className="text-slate-300 font-mono text-xs">{response.contact_phone}</span>
                                                    <PhoneActions phone={response.contact_phone} companyName={response.company_name} />
                                                </div>
                                            ) : (
                                                <span className="text-slate-600 text-xs italic">N/A</span>
                                            )}
                                        </td>

                                        {/* Date */}
                                        <td className="px-6 py-4 whitespace-nowrap text-slate-400 text-xs font-mono">
                                            {format(new Date(response.created_at), "d MMM yyyy", { locale: es })}
                                        </td>

                                        {/* Actions */}
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    onClick={() => setSelectedResponse(response)}
                                                    className="p-2 bg-slate-800 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 rounded-lg transition-all"
                                                    title="Ver detalle"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <a
                                                    href={gmailUrl(response.contact_email, response.company_name)}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="p-2 bg-slate-800 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 rounded-lg transition-all"
                                                    title="Enviar email"
                                                >
                                                    <Mail className="w-4 h-4" />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Modal */}
            {selectedResponse && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-[#0f172a] border border-white/10 rounded-[32px] max-w-2xl w-full shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/20">
                                    <User className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">{selectedResponse.company_name}</h2>
                                    <p className="text-xs text-slate-500 font-mono">ID: {selectedResponse.id}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* Status change in modal */}
                                <StatusBadge
                                    status={(selectedResponse.status as Status) || 'pendiente'}
                                    onChange={(s) => handleStatusChange(selectedResponse.id, s)}
                                />
                                <button
                                    onClick={() => setSelectedResponse(null)}
                                    className="p-2 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Company Info */}
                                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 space-y-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 flex items-center gap-2">
                                        <Building2 className="w-3 h-3" /> Empresa
                                    </h3>
                                    <div className="space-y-3">
                                        <div><p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Nombre</p><p className="text-white font-bold">{selectedResponse.company_name}</p></div>
                                        <div><p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Sector</p><p className="text-slate-300 text-sm">{selectedResponse.industry}</p></div>
                                        <div><p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Equipo</p><p className="text-slate-300 text-sm">{selectedResponse.team_size}</p></div>
                                    </div>
                                </div>
                                {/* Contact Info */}
                                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 space-y-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 flex items-center gap-2">
                                        <Phone className="w-3 h-3" /> Contacto
                                    </h3>
                                    <div className="space-y-3">
                                        <div><p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Email</p><p className="text-white font-bold break-all text-sm">{selectedResponse.contact_email}</p></div>
                                        <div><p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Teléfono</p><p className="text-slate-300 text-sm font-mono">{selectedResponse.contact_phone || 'No indicado'}</p></div>
                                        <div><p className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">Fecha</p><p className="text-slate-300 text-sm">{format(new Date(selectedResponse.created_at), "d 'de' MMMM, yyyy · HH:mm", { locale: es })}</p></div>
                                    </div>
                                </div>
                            </div>

                            {/* Challenge & Modules */}
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Briefcase className="w-3 h-3 text-purple-400" /> Desafío Principal
                                </p>
                                <p className="text-slate-200 text-sm italic leading-relaxed">"{selectedResponse.challenge}"</p>
                            </div>
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <CheckCircle2 className="w-3 h-3 text-blue-400" /> Módulos de Interés
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {selectedResponse.modules_interest.map((mod, idx) => (
                                        <span key={idx} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl text-xs font-bold">{mod}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Quick actions */}
                            <div className="flex gap-3">
                                <a
                                    href={gmailUrl(selectedResponse.contact_email, selectedResponse.company_name)}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                                >
                                    <Mail className="w-4 h-4" /> Enviar Email
                                </a>
                                {selectedResponse.contact_phone && (
                                    <a
                                        href={`https://wa.me/${selectedResponse.contact_phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${selectedResponse.company_name}, soy Rafael de Systrategy. ¡Gracias por tu diagnóstico! Me gustaría coordinar una presentación personalizada. 🚀`)}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-500/10 border border-green-500/20 text-green-400 hover:bg-green-500/20 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                                    >
                                        <MessageSquare className="w-4 h-4" /> WhatsApp
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-5 border-t border-white/5 bg-slate-900/50 flex justify-end">
                            <button
                                onClick={() => setSelectedResponse(null)}
                                className="px-8 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all border border-white/5"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

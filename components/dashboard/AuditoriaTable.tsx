"use client";

import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Mail, Search, Eye, X, User, Building2, Phone, Calendar, Briefcase, Users as UsersIcon, MessageSquare, CheckCircle2 } from 'lucide-react';
import PhoneActions from './PhoneActions';
import { useLanguage } from '@/lib/i18n/LanguageContext';

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
}

interface AuditoriaTableProps {
    responses: AuditResponse[];
}

export default function AuditoriaTable({ responses }: AuditoriaTableProps) {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedResponse, setSelectedResponse] = useState<AuditResponse | null>(null);

    const filteredResponses = responses.filter(r =>
        r.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.contact_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.contact_phone?.includes(searchTerm)
    );

    return (
        <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{t.auditoria?.dashboard?.title || 'Control de Clientes'}</h1>
                    <p className="text-slate-400">
                        {t.auditoria?.dashboard?.subtitle || 'Vista detallada de prospectos y leads.'}
                    </p>
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

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-slate-800/30 text-[10px] uppercase font-bold tracking-widest text-slate-500 border-b border-slate-800">
                            <tr>
                                <th scope="col" className="px-6 py-5">{t.auditoria?.dashboard?.table?.company}</th>
                                <th scope="col" className="px-6 py-5">{t.auditoria?.dashboard?.table?.phone}</th>
                                <th scope="col" className="px-6 py-5">{t.auditoria?.dashboard?.table?.challenge}</th>
                                <th scope="col" className="px-6 py-5">{t.auditoria?.dashboard?.table?.modules}</th>
                                <th scope="col" className="px-6 py-5">{t.auditoria?.dashboard?.table?.date}</th>
                                <th scope="col" className="px-6 py-5 text-right">{t.auditoria?.dashboard?.table?.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {filteredResponses.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 bg-slate-800/50 rounded-2xl flex items-center justify-center">
                                                <Search className="w-6 h-6 text-slate-600" />
                                            </div>
                                            <p className="text-slate-500 font-medium">{t.auditoria?.dashboard?.table?.noRecords}</p>
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
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-slate-400 group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                                                    {response.company_name[0].toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white group-hover:text-blue-300 transition-colors">{response.company_name}</div>
                                                    <div className="text-slate-500 text-xs">{response.contact_email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            {response.contact_phone ? (
                                                <div className="flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
                                                    <span className="text-slate-300 font-mono text-xs">{response.contact_phone}</span>
                                                    <PhoneActions phone={response.contact_phone} companyName={response.company_name} />
                                                </div>
                                            ) : (
                                                <span className="text-slate-600 text-xs italic">N/A</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="max-w-[200px] truncate text-slate-400 text-xs" title={response.challenge}>
                                                {response.challenge}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex flex-wrap gap-1 max-w-[200px]">
                                                {response.modules_interest.slice(0, 2).map((mod, idx) => (
                                                    <span key={idx} className="bg-slate-800 text-slate-400 text-[9px] px-2 py-0.5 rounded-full border border-slate-700">
                                                        {mod}
                                                    </span>
                                                ))}
                                                {response.modules_interest.length > 2 && (
                                                    <span className="text-[9px] text-blue-500 font-bold">+{response.modules_interest.length - 2}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-5 whitespace-nowrap text-slate-400 text-xs font-mono">
                                            {format(new Date(response.created_at), "d MMM yyyy", { locale: es })}
                                        </td>
                                        <td className="px-6 py-5 text-right">
                                            <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    onClick={() => setSelectedResponse(response)}
                                                    className="p-2 bg-slate-800 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 rounded-lg transition-all"
                                                    title="Ver más"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <a
                                                    href={`mailto:${response.contact_email}?subject=Nextrova - Contacto Comercial`}
                                                    className="p-2 bg-slate-800 hover:bg-emerald-500/20 text-slate-400 hover:text-emerald-400 rounded-lg transition-all"
                                                    title={t.auditoria?.dashboard?.table?.email}
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

            {/* Detailed Modal */}
            {selectedResponse && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
                    <div className="bg-[#0f172a] border border-white/10 rounded-[32px] max-w-2xl w-full shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center border border-blue-500/20">
                                    <User className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">{t.auditoria?.dashboard?.details?.title}</h2>
                                    <p className="text-xs text-slate-500 font-mono">ID: {selectedResponse.id}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedResponse(null)}
                                className="p-2 hover:bg-white/5 rounded-xl text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Company Info */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2 flex items-center gap-2">
                                        <Building2 className="w-3 h-3" />
                                        {t.auditoria?.dashboard?.details?.companyInfo}
                                    </h3>
                                    <div className="space-y-3 bg-white/5 p-5 rounded-2xl border border-white/5">
                                        <div>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">{t.auditoria?.dashboard?.table?.company}</p>
                                            <p className="text-white font-bold">{selectedResponse.company_name}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">{t.auditoria?.dashboard?.details?.industry}</p>
                                            <p className="text-slate-300 text-sm">{selectedResponse.industry}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">{t.auditoria?.dashboard?.details?.teamSize}</p>
                                            <p className="text-slate-300 text-sm">{selectedResponse.team_size} personas</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-2 flex items-center gap-2">
                                        <Phone className="w-3 h-3" />
                                        {t.auditoria?.dashboard?.details?.contactInfo}
                                    </h3>
                                    <div className="space-y-3 bg-white/5 p-5 rounded-2xl border border-white/5">
                                        <div>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Email</p>
                                            <p className="text-white font-bold break-all">{selectedResponse.contact_email}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Teléfono</p>
                                            <p className="text-slate-300 text-sm font-mono">{selectedResponse.contact_phone || 'No proporcionado'}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">{t.auditoria?.dashboard?.table?.date}</p>
                                            <p className="text-slate-300 text-sm">{format(new Date(selectedResponse.created_at), "d 'de' MMMM, yyyy - HH:mm", { locale: es })}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Form Responses (Full) */}
                            <div className="space-y-6">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-purple-500 mb-2 flex items-center gap-2">
                                    <MessageSquare className="w-3 h-3" />
                                    {t.auditoria?.dashboard?.details?.formResponses}
                                </h3>

                                <div className="space-y-6">
                                    <div className="bg-white/5 p-6 rounded-[24px] border border-white/5">
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                                            <Briefcase className="w-3 h-3 text-purple-500" />
                                            {t.auditoria?.dashboard?.details?.mainChallenge}
                                        </p>
                                        <p className="text-slate-200 text-sm italic leading-relaxed">
                                            "{selectedResponse.challenge}"
                                        </p>
                                    </div>

                                    <div className="bg-white/5 p-6 rounded-[24px] border border-white/5">
                                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-4 flex items-center gap-2">
                                            <CheckCircle2 className="w-3 h-3 text-blue-500" />
                                            {t.auditoria?.dashboard?.details?.modulesInterest}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedResponse.modules_interest.map((mod, idx) => (
                                                <span key={idx} className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-xl text-xs font-bold transition-all hover:bg-blue-500/20">
                                                    {mod}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/5 bg-slate-900/50 flex justify-end">
                            <button
                                onClick={() => setSelectedResponse(null)}
                                className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-bold text-xs uppercase tracking-widest transition-all border border-white/5"
                            >
                                {t.auditoria?.dashboard?.details?.close}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

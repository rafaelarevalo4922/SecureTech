"use client";

import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Mail } from 'lucide-react'
import PhoneActions from './PhoneActions'
import { useLanguage } from '@/lib/i18n/LanguageContext'

interface AuditResponse {
    id: string
    created_at: string
    company_name: string
    contact_email: string
    contact_phone: string
    industry: string
    team_size: string
    challenge: string
    modules_interest: string[]
}

interface AuditoriaTableProps {
    responses: AuditResponse[]
}

export default function AuditoriaTable({ responses }: AuditoriaTableProps) {
    const { t } = useLanguage()

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">{t.auditoria?.dashboard?.title || 'Audit Records'}</h1>
                <p className="text-slate-400">
                    {t.auditoria?.dashboard?.subtitle || 'Admin view of all prospects...'}
                </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-slate-800/50 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
                            <tr>
                                <th scope="col" className="px-6 py-4">{t.auditoria?.dashboard?.table?.company || 'Company'}</th>
                                <th scope="col" className="px-6 py-4">{t.auditoria?.dashboard?.table?.phone || 'Phone'}</th>
                                <th scope="col" className="px-6 py-4">{t.auditoria?.dashboard?.table?.challenge || 'Challenge'}</th>
                                <th scope="col" className="px-6 py-4">{t.auditoria?.dashboard?.table?.modules || 'Modules'}</th>
                                <th scope="col" className="px-6 py-4">{t.auditoria?.dashboard?.table?.date || 'Date'}</th>
                                <th scope="col" className="px-6 py-4">{t.auditoria?.dashboard?.table?.actions || 'Actions'}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {responses?.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                        {t.auditoria?.dashboard?.table?.noRecords || 'No records yet'}
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
                                                {t.auditoria?.dashboard?.table?.email || 'Email'}
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

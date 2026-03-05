"use client";

import { useState } from "react";
import { Phone, MessageCircle, X } from "lucide-react";

interface PhoneActionsProps {
    phone: string;
    companyName: string;
}

export default function PhoneActions({ phone, companyName }: PhoneActionsProps) {
    const [showCallModal, setShowCallModal] = useState(false);
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    const cleanPhoneWithPlus = phone.replace(/[^0-9+]/g, '');

    const waMessage = encodeURIComponent(
        `Hola, le contactamos de parte de *SecureTech*. Nos comunicamos en relación a la consulta de su empresa *${companyName}*. ¿En qué momento le sería conveniente agendar una reunión?`
    );

    return (
        <>
            <div className="flex gap-1.5 mt-1">
                <a
                    href={`https://wa.me/${cleanPhone}?text=${waMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors text-[10px] font-black uppercase tracking-wider"
                    title="Abrir WhatsApp"
                >
                    <MessageCircle className="w-3 h-3" />
                    WA
                </a>
                <button
                    onClick={() => setShowCallModal(true)}
                    className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-colors text-[10px] font-black uppercase tracking-wider cursor-pointer"
                    title="Llamar"
                >
                    <Phone className="w-3 h-3" />
                    Llamar
                </button>
            </div>

            {/* Call Confirmation Modal */}
            {showCallModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100]" onClick={() => setShowCallModal(false)}>
                    <div
                        className="bg-[#0f172a] border border-white/10 rounded-[32px] p-8 max-w-sm w-full mx-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                                    <Phone className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-black text-sm uppercase tracking-tight">Confirmar Llamada</h3>
                                    <p className="text-slate-500 text-[10px] font-medium">SecureTech CRM</p>
                                </div>
                            </div>
                            <button onClick={() => setShowCallModal(false)} className="text-slate-500 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="bg-black/40 rounded-2xl p-5 border border-white/5 mb-6 text-center">
                            <p className="text-slate-400 text-xs mb-2 font-medium">¿Desea llamar a este contacto?</p>
                            <p className="text-white font-black text-lg tracking-tight mb-1">{companyName}</p>
                            <p className="text-blue-400 font-mono font-bold text-sm">{phone}</p>
                        </div>

                        <p className="text-slate-600 text-[10px] text-center mb-5 font-medium leading-relaxed">
                            ⚠️ La llamada solo se iniciará desde un dispositivo móvil. En escritorio, esta acción podría no tener efecto.
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowCallModal(false)}
                                className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white font-bold text-[10px] uppercase tracking-widest transition-all active:scale-[0.98]"
                            >
                                Cancelar
                            </button>
                            <a
                                href={`tel:${cleanPhoneWithPlus}`}
                                onClick={() => setShowCallModal(false)}
                                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 text-center flex items-center justify-center gap-2 active:scale-[0.98]"
                            >
                                <Phone className="w-3.5 h-3.5" />
                                Llamar Ahora
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

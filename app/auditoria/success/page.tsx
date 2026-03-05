import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function AuditoriaSuccessPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-[#0a0f1c] flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-[#111827] rounded-2xl shadow-xl p-8 text-center space-y-6 border border-gray-100 dark:border-gray-800">
                <div className="flex justify-center">
                    <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
                        <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-500" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    ¡Auditoría Solicitada!
                </h1>

                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                    <p>
                        Hemos recibido tus respuestas correctamente.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm border border-blue-100 dark:border-blue-800">
                        <p className="font-medium text-blue-800 dark:text-blue-300">
                            Próximo paso:
                        </p>
                        <p className="mt-1">
                            Nuestro equipo analizará tu caso y nos contactaremos contigo vía <strong>WhatsApp</strong> o <strong>Email</strong> a la brevedad para programar la reunión de auditoría.
                        </p>
                    </div>
                </div>

                <div className="pt-4">
                    <Link
                        href="/"
                        className="inline-block w-full py-3 px-4 bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-lg transition-colors font-medium border border-transparent dark:border-gray-700"
                    >
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </div>
    )
}
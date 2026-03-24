import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, phone, modules } = body;

        console.log("Receiving quote request for:", { email, phone, modules });

        try {
            console.log(`Executing automation for ${email} / ${phone}`);

            // 1. Enviar Email usando Gmail / Nodemailer
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'rafaelarevalo4922@gmail.com',
                    pass: process.env.GMAIL_APP_PASSWORD,
                },
            });

            await transporter.sendMail({
                from: '"Equipo Systrategy" <rafaelarevalo4922@gmail.com>',
                to: email,
                subject: 'Hemos recibido su solicitud — Equipo Systrategy',
                text: `Hola,\n\nHemos recibido su formulario correctamente. Nuestro equipo ya se encuentra analizando su solicitud para brindarle la mejor solución.\n\nNos pondremos en contacto con usted a la brevedad posible para agendar una cita y evaluar cómo Systrategy puede potenciar su empresa.\n\nAtentamente,\nEl equipo de Systrategy`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 12px;">
                        <div style="background: #1e3a8a; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 24px;">
                            <h1 style="color: white; margin: 0; font-size: 22px;">Systrategy</h1>
                        </div>
                        <h2 style="color: #1e293b;">¡Hemos recibido su solicitud!</h2>
                        <p style="color: #475569; font-size: 15px; line-height: 1.6;">
                            Hola,<br><br>
                            Hemos recibido su formulario correctamente. <strong>Nuestro equipo ya se encuentra analizando su solicitud</strong> para brindarle la mejor solución posible.
                        </p>
                        <p style="color: #475569; font-size: 15px; line-height: 1.6;">
                            Nos pondremos en contacto con usted a la brevedad posible para agendar una cita y evaluar cómo Systrategy puede potenciar su empresa.
                        </p>
                        <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px; margin: 24px 0;">
                            <p style="margin: 0; color: #1e40af; font-size: 14px;"><strong>Módulos solicitados:</strong> ${modules?.join(', ')}</p>
                        </div>
                        <p style="color: #94a3b8; font-size: 12px; margin-top: 32px; text-align: center;">
                            © 2026 Systrategy — Software Inteligente y Visual
                        </p>
                    </div>
                `,
            });
            console.log(`[EXITO] Email enviado a ${email} desde rafaelarevalo4922@gmail.com`);

            // 2. Enviar WhatsApp usando Green API
            const greenApiUrl = process.env.GREEN_API_URL;
            const idInstance = process.env.GREEN_API_ID_INSTANCE;
            const apiToken = process.env.GREEN_API_TOKEN_INSTANCE;

            const cleanPhone = phone.replace(/[\+\s\-]/g, '');

            if (greenApiUrl && idInstance && apiToken) {
                const endpoint = `${greenApiUrl}/waInstance${idInstance}/sendMessage/${apiToken}`;
                const waRes = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chatId: `${cleanPhone}@c.us`,
                        message: '👋 ¡Hola! Hemos recibido su formulario correctamente en Systrategy.\n\nNuestro equipo técnico ya se encuentra analizando su solicitud. Nos pondremos en contacto con usted a la brevedad posible para agendar una breve reunión y conversar sobre cómo podemos ayudar a escalar su empresa. 🚀'
                    })
                });
                const waData = await waRes.json();
                console.log(`[EXITO] WhatsApp enviado al ${cleanPhone}:`, waData);
            } else {
                console.error('[ERROR] Faltan variables de Green API');
            }

        } catch (error) {
            console.error("Error sending messages:", error);
        }

        return NextResponse.json({ success: true, message: 'Quote received, automations scheduled.' });

    } catch (error) {
        console.error("Error processing quote:", error);
        return NextResponse.json({ success: false, error: 'Failed to process request' }, { status: 500 });
    }
}

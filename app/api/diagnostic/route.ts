import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'samuel.exec.acct@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD,
    },
});

// ─── Email HTML de confirmación para el CLIENTE ───────────────────────────────
function clientHtml(d: {
    company_name: string; industry: string; team_size: string;
    contact_phone: string; challenge: string[]; modules_interest: string[];
}) {
    const desafios = d.challenge.length > 0 ? d.challenge.map(c => `<li style="margin-bottom:6px;">${c}</li>`).join('') : '<li>—</li>';
    const modulos  = d.modules_interest.length > 0 ? d.modules_interest.map(m => `<li style="margin-bottom:6px;">${m}</li>`).join('') : '<li>—</li>';

    return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
  <tr><td align="center">
    <table width="100%" style="max-width:600px;background:#0a0f1c;border-radius:16px;overflow:hidden;">
      <!-- Header -->
      <tr>
        <td style="background:linear-gradient(135deg,#1e40af,#0ea5e9);padding:32px 40px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:28px;font-weight:800;letter-spacing:-0.5px;">Systrategy</h1>
          <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:13px;text-transform:uppercase;letter-spacing:2px;">Software que evoluciona con tu negocio</p>
        </td>
      </tr>
      <!-- Body -->
      <tr>
        <td style="padding:40px;">
          <p style="margin:0 0 4px;font-size:12px;color:#0ea5e9;text-transform:uppercase;letter-spacing:1px;font-weight:700;">✅ CONFIRMACIÓN RECIBIDA</p>
          <h2 style="color:#fff;font-size:22px;margin:8px 0 16px;">¡Tu diagnóstico fue enviado exitosamente!</h2>
          <p style="color:#94a3b8;font-size:15px;line-height:1.7;margin:0 0 24px;">
            Hola <strong style="color:#fff;">${d.company_name}</strong>, gracias por completar tu diagnóstico empresarial con <strong style="color:#0ea5e9;">Systrategy</strong>.<br><br>
            Estamos evaluando tu caso y nos pondremos en contacto contigo <strong style="color:#fff;">a la brevedad posible</strong> al número <strong style="color:#0ea5e9;">${d.contact_phone}</strong> para presentarte una propuesta personalizada.
          </p>

          <!-- Summary card -->
          <table width="100%" style="background:#111827;border:1px solid #1e293b;border-radius:12px;margin-bottom:24px;">
            <tr><td style="padding:24px;">
              <p style="color:#0ea5e9;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 16px;">Resumen de tu diagnóstico</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="color:#64748b;font-size:13px;padding:5px 0;width:110px;">Empresa</td><td style="color:#fff;font-size:14px;font-weight:600;">${d.company_name}</td></tr>
                <tr><td style="color:#64748b;font-size:13px;padding:5px 0;">Sector</td><td style="color:#e2e8f0;font-size:14px;">${d.industry}</td></tr>
                <tr><td style="color:#64748b;font-size:13px;padding:5px 0;">Equipo</td><td style="color:#e2e8f0;font-size:14px;">${d.team_size}</td></tr>
              </table>
              <hr style="border:none;border-top:1px solid #1e293b;margin:16px 0;">
              <p style="color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;margin:0 0 8px;">Desafíos identificados</p>
              <ul style="margin:0;padding-left:20px;color:#e2e8f0;font-size:14px;">${desafios}</ul>
              <hr style="border:none;border-top:1px solid #1e293b;margin:16px 0;">
              <p style="color:#64748b;font-size:12px;font-weight:700;text-transform:uppercase;margin:0 0 8px;">Módulos de interés</p>
              <ul style="margin:0;padding-left:20px;color:#0ea5e9;font-size:14px;">${modulos}</ul>
            </td></tr>
          </table>

          <!-- Contact box -->
          <table width="100%" style="background:#0c1a2e;border:1px solid #1e40af;border-radius:12px;margin-bottom:32px;">
            <tr><td style="padding:20px;">
              <p style="color:#93c5fd;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 12px;">¿Necesitas ayuda urgente?</p>
              <p style="margin:0 0 6px;color:#e2e8f0;font-size:14px;">📱 WhatsApp: <a href="https://wa.me/59177454234" style="color:#0ea5e9;text-decoration:none;font-weight:600;">+591 77454234</a></p>
              <p style="margin:0;color:#e2e8f0;font-size:14px;">📧 Email: <a href="mailto:samuel.exec.acct@gmail.com" style="color:#0ea5e9;text-decoration:none;font-weight:600;">samuel.exec.acct@gmail.com</a></p>
            </td></tr>
          </table>

          <p style="color:#334155;font-size:12px;text-align:center;margin:0;">© 2026 Systrategy — Software que evoluciona con tu negocio</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ─── Email de resumen completo para el ADMIN ──────────────────────────────────
function adminHtml(d: {
    company_name: string; industry: string; team_size: string;
    contact_email: string; contact_phone: string;
    challenge: string[]; operational_issues: string[];
    security_access: string[]; impact_projection: string[];
    modules_interest: string[];
}) {
    const row = (label: string, items: string[]) => `
      <tr>
        <td style="padding:12px 0;border-bottom:1px solid #1e293b;vertical-align:top;">
          <p style="color:#0ea5e9;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1px;margin:0 0 6px;">${label}</p>
          ${items.length > 0
            ? `<ul style="margin:0;padding-left:18px;color:#e2e8f0;font-size:13px;line-height:1.8;">${items.map(i => `<li>${i}</li>`).join('')}</ul>`
            : `<p style="color:#475569;font-size:13px;margin:0;">— No seleccionado</p>`
          }
        </td>
      </tr>`;

    return `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#020617;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:40px 16px;">
  <tr><td align="center">
    <table width="100%" style="max-width:600px;background:#0a0f1c;border-radius:16px;overflow:hidden;border:1px solid #1e293b;">
      <!-- Header -->
      <tr>
        <td style="background:#0f172a;padding:24px 32px;border-bottom:1px solid #1e293b;">
          <p style="margin:0 0 4px;font-size:10px;font-weight:800;letter-spacing:3px;text-transform:uppercase;color:#0ea5e9;">SYSTRATEGY — NOTIFICACIÓN INTERNA</p>
          <h1 style="color:#fff;margin:0;font-size:20px;font-weight:800;">🔔 Nuevo Diagnóstico Recibido</h1>
        </td>
      </tr>
      <!-- Client data -->
      <tr>
        <td style="padding:28px 32px 0;">
          <table width="100%" style="background:#111827;border:1px solid #1e293b;border-radius:12px;">
            <tr><td style="padding:20px 24px;">
              <p style="color:#0ea5e9;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 14px;">📋 Datos del Cliente</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="color:#475569;font-size:12px;padding:4px 0;width:90px;">Empresa</td><td style="color:#fff;font-size:14px;font-weight:700;">${d.company_name}</td></tr>
                <tr><td style="color:#475569;font-size:12px;padding:4px 0;">Sector</td><td style="color:#e2e8f0;font-size:13px;">${d.industry}</td></tr>
                <tr><td style="color:#475569;font-size:12px;padding:4px 0;">Equipo</td><td style="color:#e2e8f0;font-size:13px;">${d.team_size}</td></tr>
                <tr><td style="color:#475569;font-size:12px;padding:4px 0;">Correo</td><td><a href="mailto:${d.contact_email}" style="color:#0ea5e9;font-size:13px;text-decoration:none;">${d.contact_email}</a></td></tr>
                <tr><td style="color:#475569;font-size:12px;padding:4px 0;">Teléfono</td><td><a href="https://wa.me/${d.contact_phone.replace(/\D/g,'')}" style="color:#22c55e;font-size:13px;font-weight:700;text-decoration:none;">${d.contact_phone} 💬</a></td></tr>
              </table>
            </td></tr>
          </table>
        </td>
      </tr>
      <!-- Selections -->
      <tr>
        <td style="padding:20px 32px 28px;">
          <table width="100%" style="background:#111827;border:1px solid #1e293b;border-radius:12px;">
            <tr><td style="padding:20px 24px;">
              <p style="color:#0ea5e9;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 4px;">📊 Respuestas del Formulario</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${row('1. Desafíos Principales', d.challenge)}
                ${row('2. Situaciones Actuales', d.operational_issues)}
                ${row('3. Seguridad y Acceso', d.security_access)}
                ${row('4. Beneficios Esperados', d.impact_projection)}
                ${row('5. Módulos de Interés', d.modules_interest)}
              </table>
            </td></tr>
          </table>
          <p style="color:#1e293b;font-size:11px;text-align:center;margin:20px 0 0;">Generado automáticamente · Systrategy © 2026</p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// ─── POST handler ─────────────────────────────────────────────────────────────
export async function POST(request: Request) {
    try {
        const d = await request.json();
        const {
            company_name = '', industry = '', team_size = '',
            contact_email = '', contact_phone = '',
            challenge = [], operational_issues = [],
            security_access = [], impact_projection = [],
            modules_interest = [],
        } = d;

        // WhatsApp link for admin to send from their own phone
        const cleanPhone = contact_phone.replace(/\D/g, '');
        const waText = encodeURIComponent(
            `Hola ${company_name} 👋, soy Rafael de Systrategy. Hemos recibido tu diagnóstico y estamos evaluando tu caso para prepararte una propuesta a medida. Nos pondremos en contacto contigo a la brevedad posible. ¡Gracias por confiar en nosotros! 🚀`
        );
        const waLink = `https://wa.me/${cleanPhone}?text=${waText}`;

        // 1. Email to CLIENT
        await transporter.sendMail({
            from: '"Equipo Systrategy" <samuel.exec.acct@gmail.com>',
            to: contact_email,
            subject: '✅ Hemos recibido tu diagnóstico empresarial — Systrategy',
            html: clientHtml({ company_name, industry, team_size, contact_phone, challenge, modules_interest }),
        });

        // 2. Email to ADMIN (yourself)
        await transporter.sendMail({
            from: '"Sistema Systrategy" <samuel.exec.acct@gmail.com>',
            to: 'samuel.exec.acct@gmail.com',
            subject: `🔔 Nuevo diagnóstico — ${company_name} (${contact_phone})`,
            html: adminHtml({ company_name, industry, team_size, contact_email, contact_phone, challenge, operational_issues, security_access, impact_projection, modules_interest }),
        });

        console.log(`[DIAGNÓSTICO OK] ${company_name} | ${contact_email}`);
        return NextResponse.json({ success: true, waLink });

    } catch (error) {
        console.error('[DIAGNÓSTICO ERROR]', error);
        return NextResponse.json({ success: false, error: 'Error al enviar' }, { status: 500 });
    }
}

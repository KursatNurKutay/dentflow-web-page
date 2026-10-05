const nodemailer = require('nodemailer');

const ALLOWED_SUBJECTS = new Set([
  'Genel Bilgi', 'Demo Talebi', 'Fiyat Teklifi', 'Teknik Destek', 'İş Birliği', 'Diğer'
]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let transporter;
function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: 'smtp.migadu.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MIGADU_SMTP_USER,
        pass: process.env.MIGADU_SMTP_PASS
      }
    });
  }
  return transporter;
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { name, email, subject, message } = req.body || {};

  if (
    typeof name !== 'string' || !name.trim() || name.length > 200 ||
    typeof email !== 'string' || !EMAIL_RE.test(email) || email.length > 200 ||
    typeof message !== 'string' || !message.trim() || message.length > 5000 ||
    !ALLOWED_SUBJECTS.has(subject)
  ) {
    res.status(400).json({ error: 'Invalid form data' });
    return;
  }

  if (!process.env.MIGADU_SMTP_USER || !process.env.MIGADU_SMTP_PASS) {
    res.status(500).json({ error: 'Email service not configured' });
    return;
  }

  try {
    await getTransporter().sendMail({
      from: 'DentFlow Web Sitesi <info@dentflowclinic.com>',
      to: 'info@dentflowclinic.com',
      replyTo: email,
      subject: `[DentFlow İletişim] ${subject}`,
      text: `Ad Soyad: ${name}\nE-posta: ${email}\nKonu: ${subject}\n\n${message}`
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form error', err);
    res.status(500).json({ error: 'Internal error' });
  }
};

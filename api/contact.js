const ALLOWED_SUBJECTS = new Set([
  'Genel Bilgi', 'Demo Talebi', 'Fiyat Teklifi', 'Teknik Destek', 'İş Birliği', 'Diğer'
]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Email service not configured' });
    return;
  }

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'DentFlow Web Sitesi <contact@kobysoft.app>',
        to: ['info@kobysoft.app'],
        reply_to: email,
        subject: `[DentFlow İletişim] ${subject}`,
        text: `Ad Soyad: ${name}\nE-posta: ${email}\nKonu: ${subject}\n\n${message}`
      })
    });

    if (!resendRes.ok) {
      console.error('Resend error', resendRes.status, await resendRes.text());
      res.status(502).json({ error: 'Failed to send email' });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form error', err);
    res.status(500).json({ error: 'Internal error' });
  }
};

// Sends the HTML report as an email via Gmail + Nodemailer
import nodemailer from 'nodemailer';

export async function sendReport(html, jobCount) {
  const { GMAIL_USER, GMAIL_APP_PASSWORD, RECIPIENT } = process.env;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !RECIPIENT) {
    throw new Error('Missing email credentials — check GMAIL_USER, GMAIL_APP_PASSWORD, RECIPIENT in .env');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    // Node.js on Windows doesn't read the Windows cert store — this fixes TLS verification
    tls: { rejectUnauthorized: false },
  });

  const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  await transporter.sendMail({
    from: `"Job Monitor" <${GMAIL_USER}>`,
    to: RECIPIENT,
    subject: `[Job Report] ${jobCount} remote web dev job${jobCount !== 1 ? 's' : ''} — ${date}`,
    html,
  });

  console.log(`Email sent to ${RECIPIENT}`);
}

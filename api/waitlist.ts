import fs from 'fs';
import path from 'path';

const WAITLIST_FILE = path.join(process.cwd(), 'waitlist.json');

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const email = body.email;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email address is required.' });
    }

    let list: any[] = [];
    try {
      if (fs.existsSync(WAITLIST_FILE)) {
        const content = fs.readFileSync(WAITLIST_FILE, 'utf-8');
        list = JSON.parse(content || '[]');
      }

      const normalizedEmail = email.trim().toLowerCase();
      const existing = list.find((item: any) => item.email.toLowerCase() === normalizedEmail);

      if (!existing) {
        list.push({
          email: normalizedEmail,
          timestamp: new Date().toISOString(),
          ip: req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'
        });
        fs.writeFileSync(WAITLIST_FILE, JSON.stringify(list, null, 2), 'utf-8');
      }

      return res.status(200).json({ success: true, count: list.length });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Failed to save waitlist entry.' });
    }
  }

  // GET Request
  let list: any[] = [];
  try {
    if (fs.existsSync(WAITLIST_FILE)) {
      const content = fs.readFileSync(WAITLIST_FILE, 'utf-8');
      list = JSON.parse(content || '[]');
    }
  } catch (e) {
    console.error(e);
  }

  const acceptsJson = req.query?.format === 'json' || (req.headers?.accept && req.headers.accept.includes('application/json') && !req.headers.accept.includes('text/html'));
  if (acceptsJson) {
    return res.status(200).json(list);
  }

  const rowsHtml = list.length === 0
    ? `<tr><td colspan="3" style="text-align:center; padding: 40px; color: #64748b; font-family: 'JetBrains Mono', monospace;">No waitlist emails submitted yet. Submit an email on the landing page!</td></tr>`
    : list.map((item, idx) => `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.06);">
          <td style="padding: 14px 18px; color: #64748b; font-weight: 700; font-family: 'JetBrains Mono', monospace;">${idx + 1}</td>
          <td style="padding: 14px 18px; color: #38bdf8; font-weight: 700; font-family: 'JetBrains Mono', monospace;">${item.email}</td>
          <td style="padding: 14px 18px; color: #94a3b8; font-family: 'JetBrains Mono', monospace;">${new Date(item.timestamp).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</td>
        </tr>
      `).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>getVāri • Founders Waitlist Database</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=JetBrains+Mono:wght@500;700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      background-color: #070a11;
      color: #f1f5f9;
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      padding: 40px 20px;
      box-sizing: border-box;
    }
    .container {
      width: 100%;
      max-width: 850px;
      background: rgba(13, 18, 30, 0.85);
      border: 1px solid rgba(56, 189, 248, 0.3);
      border-radius: 24px;
      padding: 32px;
      box-shadow: 0 0 60px rgba(56, 189, 248, 0.15);
      backdrop-filter: blur(20px);
    }
    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 20px;
      margin-bottom: 24px;
    }
    .title {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 24px;
      font-weight: 700;
      margin: 0;
      color: #ffffff;
    }
    .badge {
      background: rgba(56, 189, 248, 0.12);
      border: 1px solid rgba(56, 189, 248, 0.3);
      color: #38bdf8;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      padding: 6px 14px;
      border-radius: 20px;
      font-weight: 700;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 13px;
    }
    th {
      font-family: 'JetBrains Mono', monospace;
      text-transform: uppercase;
      font-size: 11px;
      color: #64748b;
      padding: 12px 18px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(255, 255, 255, 0.02);
    }
    tr:hover {
      background: rgba(255, 255, 255, 0.03);
    }
    .footer-note {
      margin-top: 24px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      color: #64748b;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div>
        <h1 class="title">get<span style="color:#38bdf8;">Vāri</span> Founders Waitlist</h1>
        <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px;">Realtime Waitlist Submissions Database</p>
      </div>
      <span class="badge">Total: ${list.length} Signups</span>
    </div>

    <table>
      <thead>
        <tr>
          <th>Sr. No.</th>
          <th>Email Address</th>
          <th>Submission Date</th>
        </tr>
      </thead>
      <tbody>
        ${rowsHtml}
      </tbody>
    </table>

    <div class="footer-note">
      <span>Auto-synced Database</span>
      <span>© 2026 getVāri Technologies</span>
    </div>
  </div>
</body>
</html>`;

  return res.status(200).setHeader('Content-Type', 'text/html').send(html);
}

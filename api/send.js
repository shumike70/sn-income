// api/send.js (Vercel Serverless Backend)
export default async function handler(req, res) {
  // CORS হেডার এলাউ করা
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, description: "Method not allowed" });
  }

  const { token, chat_id, text } = req.body;

  if (!token || !chat_id || !text) {
    return res.status(400).json({ ok: false, description: "Token, Chat ID এবং Text বাধ্যতামূলক!" });
  }

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chat_id,
        text: text,
        parse_mode: 'HTML'
      })
    });

    const data = await telegramRes.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ ok: false, description: error.message });
  }
}

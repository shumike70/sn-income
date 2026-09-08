// api/send.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, description: "Method not allowed" });

  const { token, chat_id, text, reply_markup } = req.body;

  try {
    const payload = {
      chat_id: chat_id,
      text: text,
      parse_mode: 'HTML'
    };
    if (reply_markup) {
      payload.reply_markup = reply_markup;
    }

    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await telegramRes.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ ok: false, description: error.message });
  }
}

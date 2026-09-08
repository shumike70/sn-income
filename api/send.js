// api/webhook.js
const BOT_TOKEN = "8693779636:AAHIeQCUgS7bvwrArl6otipy8wyifOgz8rU";
const OWNER_ID = "7209869264";

// Bold Font Converter
function toBold(text) {
  const norm = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const bold = "𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙";
  return String(text).split("").map(c => norm.includes(c) ? bold[norm.indexOf(c)] : c).join("");
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(200).send("Webhook is Active!");

  let update = req.body;
  if (typeof update === "string") {
    try { update = JSON.parse(update); } catch(e) {}
  }
  if (!update) return res.status(200).send("OK");

  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { timeZone: "Asia/Dhaka" });
  const dateStr = now.toISOString().split("T")[0];
  const dayNames = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  const dayStr = dayNames[now.getDay()];

  // /start কমান্ড
  if (update.message && update.message.text && update.message.text.startsWith("/start")) {
    const user = update.message.from;
    const chatId = update.message.chat.id;
    const name = `<a href="tg://user?id=${user.id}">${toBold(user.first_name || "USER")}</a>`;
    const username = user.username ? `@${user.username}` : "N/A";

    const text = `◈ ━━ ❖ 📋 <b>𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔</b> ❖ ━━ ◈

🎊 <b>𝐖𝐄𝐋𝐂𝐎𝐌𝐄 :</b> ${name}
👤 <b>𝐔𝐒𝐄𝐑 :</b> ${username}
🆔 <b>𝐈𝐃 :</b> <code>${user.id}</code>

⏰ <b>𝐓𝐈𝐌𝐄 :</b> ${timeStr}
📅 <b>𝐃𝐀𝐓𝐄 :</b> ${dateStr} (YYYY-MM-DD)
📆 <b>𝐃𝐀𝐘 :</b> ${dayStr}

━━━━━━━━━━━━━━━━━━━━━━━━
⚡ <b>𝐎𝐔𝐑 𝐒𝐄𝐑𝐕𝐈𝐂𝐄𝐒 & 𝐅𝐄𝐀𝐓𝐔𝐑𝐄𝐒 :</b>
━━━━━━━━━━━━━━━━━━━━━━━━

💡 <b>CREATE, CUSTOMIZE & SCALE</b>
   ↳ BOTS ZERO CODING REQUIRED

🔧 <b>PROFESSIONAL BOT MAKER</b>
   ↳ FULL CONTROL & AUTOMATION

🌐 <b>SMART, FAST & SECURE</b>
   ↳ TELEGRAM BOT SOLUTIONS

🛡️ <b>RELIABLE AUTOMATION</b>
   ↳ BUILT FOR PERFORMANCE

━━━━━━━━━━━━━━━━━━━━━━━━
👑 <b>DEVELOPED BY :</b> <a href="https://t.me/sn_support_admin"><b>SN SUPPORT ADMIN</b></a>
━━━━━━━━━━━━━━━━━━━━━━━━`;

    const inline_keyboard = [
      [
        { text: "🌟 𝐏𝐑𝐎𝐅𝐈𝐋𝐄", callback_data: "/profile" },
        { text: "🛠️ 𝐌𝐘 𝐁𝐎𝐓", callback_data: "/mybots" }
      ],
      [
        { text: "➕ 𝐂𝐑𝐄𝐀𝐓𝐄 𝐍𝐄𝐖 𝐁𝐎𝐓", callback_data: "/newbot" }
      ],
      [
        { text: "🏆 𝐋𝐄𝐀𝐃𝐄𝐑𝐁𝐎𝐀𝐑𝐃", callback_data: "/leaderboard" },
        { text: "❓ 𝐀𝐍𝐘 𝐇𝐄𝐋𝐏", callback_data: "/help" }
      ],
      [
        { text: "🛒 𝐁𝐔𝐘 𝐂𝐎𝐃𝐄", callback_data: "/buy_code" }
      ]
    ];

    if (String(user.id) === String(OWNER_ID)) {
      inline_keyboard.push([{ text: "⚙️ 𝐀𝐃𝐌𝐈𝐍 𝐏𝐀𝐍𝐄𝐋", callback_data: "/admin" }]);
    }

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: { inline_keyboard }
      })
    });
  }

  // বাটন ক্লিক
  if (update.callback_query) {
    const cq = update.callback_query;
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/answerCallbackQuery`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ callback_query_id: cq.id, text: "কমান্ড গ্রহণ করা হয়েছে!", show_alert: false })
    });
  }

  return res.status(200).json({ ok: true });
}

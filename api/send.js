// api/webhook.js - 100% Bulletproof 24/7 Webhook Handler
const BOT_TOKEN = "8693779636:AAHIeQCUgS7bvwrArl6otipy8wyifOgz8rU";
const OWNER_ID = "7209869264";

async function callTelegram(method, payload) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err) {
    console.error("API Error:", err);
  }
}

function toCapitalBold(text) {
  const normal = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const bold = "𝟎𝟏𝟐𝟑𝟒𝟓𝟔𝟕𝟖𝟗𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙𝐀𝐁𝐂𝐃𝐄𝐅𝐆𝐇𝐈𝐉𝐊𝐋𝐌𝐍𝐎𝐏𝐐𝐑𝐒𝐓𝐔𝐕𝐖𝐗𝐘𝐙";
  let res = "";
  for (let char of String(text)) {
    const idx = normal.indexOf(char);
    res += idx !== -1 ? bold[idx] : char;
  }
  return res;
}

function getMainMenu(user) {
  const name = `<a href="tg://user?id=${user.id}">${toCapitalBold(user.first_name || "USER")}</a>`;
  const username = user.username ? `@${user.username}` : "N/A";
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { timeZone: "Asia/Dhaka" });
  const dateStr = now.toISOString().split("T")[0];

  const text = `◈ ━━ ❖ 📋 <b>𝐌𝐀𝐈𝐍 𝐌𝐄𝐍𝐔</b> ❖ ━━ ◈

🎊 <b>𝐖𝐄𝐋𝐂𝐎𝐌𝐄</b> : ${name}
👤 <b>𝐔𝐒𝐄𝐑</b> : ${username}
🆔 <b>𝐈𝐃</b> : <code>${user.id}</code>

⏰ <b>𝐓𝐈𝐌𝐄</b> : ${timeStr} (BD)
📅 <b>𝐃𝐀𝐓𝐄</b> : ${dateStr}

━━━━━━━━━━━━━━━━━━━━━━━━
⚡ <b>𝐎𝐔𝐑 𝐒𝐄𝐑𝐕𝐈𝐂𝐄𝐒 & 𝐅𝐄𝐀𝐓𝐔𝐑𝐄𝐒 :</b>
━━━━━━━━━━━━━━━━━━━━━━━━

💡 <b>𝐂𝐑𝐄𝐀𝐓𝐄, 𝐂𝐔𝐒𝐓𝐎𝐌𝐈𝐙𝐄 & 𝐒𝐂𝐀𝐋𝐄</b>
   ↳ 𝐁𝐎𝐓𝐒 𝐙𝐄𝐑𝐎 𝐂𝐎𝐃𝐈𝐍𝐆 𝐑𝐄𝐐𝐔𝐈𝐑𝐄𝐃

🔧 <b>𝐏𝐑𝐎𝐅𝐄𝐒𝐒𝐈𝐎𝐍𝐀𝐋 𝐁𝐎𝐓 𝐌𝐀𝐊𝐄𝐑</b>
   ↳ 𝐅𝐔𝐋𝐋 𝐂𝐎𝐍𝐓𝐑𝐎𝐋 & 𝐀𝐔𝐓𝐎𝐌𝐀𝐓𝐈𝐎𝐍

🌐 <b>𝐒𝐌𝐀𝐑𝐓, 𝐅𝐀𝐒𝐓 & 𝐒𝐄𝐂𝐔𝐑𝐄</b>
   ↳ 𝐓𝐄𝐋𝐄𝐆𝐑𝐀𝐌 𝐁𝐎𝐓 𝐒𝐎𝐋𝐔𝐓𝐈𝐎𝐍𝐒

━━━━━━━━━━━━━━━━━━━━━━━━
👑 <b>𝐃𝐄𝐕𝐄𝐋𝐎𝐏𝐄𝐃 𝐁𝐘 :</b> <a href="https://t.me/sn_support_admin">𝐒𝐍 𝐒𝐔𝐏𝐏𝐎𝐑𝐓 𝐀𝐃𝐌𝐈𝐍</a>
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

  return { text, reply_markup: { inline_keyboard } };
}

export default async function handler(req, res) {
  // GET রিকোয়েস্ট আসলে স্ট্যাটাস চেক
  if (req.method === "GET") {
    return res.status(200).json({ status: "Webhook is Active and Running 24/7!" });
  }

  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  // বডি পার্সিং নিশ্চিত করা (String বা Object যাই হোক)
  let update = req.body;
  if (typeof update === "string") {
    try {
      update = JSON.parse(update);
    } catch (e) {
      return res.status(200).send("OK");
    }
  }

  if (!update) return res.status(200).send("OK");

  // ১. মেসেজ /start হ্যান্ডলার
  if (update.message) {
    const msg = update.message;
    const chatId = msg.chat.id;
    const text = msg.text || "";
    const user = msg.from;

    if (text.startsWith("/start")) {
      const menu = getMainMenu(user);
      await callTelegram("sendMessage", {
        chat_id: chatId,
        text: menu.text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: menu.reply_markup
      });
    } else if (text === "/help") {
      await callTelegram("sendMessage", {
        chat_id: chatId,
        text: "ℹ️ <b>সাপোর্ট অ্যাডমিন:</b> @sn_support_admin",
        parse_mode: "HTML"
      });
    }
  }

  // ২. ইনলাইন বাটন হ্যান্ডলার
  if (update.callback_query) {
    const cq = update.callback_query;
    const chatId = cq.message.chat.id;
    const messageId = cq.message.message_id;
    const data = cq.data;
    const user = cq.from;

    await callTelegram("answerCallbackQuery", { callback_query_id: cq.id });

    if (data === "/profile") {
      await callTelegram("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: `👤 <b>ইউজার প্রোফাইল</b>\n\n🆔 আইডি: <code>${user.id}</code>\n👤 নাম: ${user.first_name}\n💰 ব্যালেন্স: ০.০০ ৳`,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [[{ text: "🔙 ব্যাক মেনু", callback_data: "/main_menu" }]]
        }
      });
    } else if (data === "/mybots") {
      await callTelegram("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: `🛠️ <b>আপনার সক্রিয় বটসমূহ:</b>\n\nবর্তমানে কোনো বট যুক্ত নেই।`,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [[{ text: "🔙 ব্যাক মেনু", callback_data: "/main_menu" }]]
        }
      });
    } else if (data === "/help") {
      await callTelegram("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: `❓ <b>সাপোর্ট সেন্টার</b>\n\nযেকোনো প্রয়োজনে অ্যাডমিনের সাথে যোগাযোগ করুন:\n👉 @sn_support_admin`,
        parse_mode: "HTML",
        reply_markup: {
          inline_keyboard: [[{ text: "🔙 ব্যাক মেনু", callback_data: "/main_menu" }]]
        }
      });
    } else if (data === "/main_menu") {
      const menu = getMainMenu(user);
      await callTelegram("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: menu.text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: menu.reply_markup
      });
    } else {
      await callTelegram("answerCallbackQuery", {
        callback_query_id: cq.id,
        text: "⚡ এই অপশনটি শীঘ্রই চালু হবে!",
        show_alert: true
      });
    }
  }

  return res.status(200).json({ ok: true });
}

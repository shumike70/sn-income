// api/webhook.js - 100% Error-Free 24/7 Webhook
const BOT_TOKEN = "8693779636:AAHIeQCUgS7bvwrArl6otipy8wyifOgz8rU";
const OWNER_ID = "7209869264";

async function callTelegram(method, payload) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const result = await res.json();
    console.log("Telegram API result:", result);
    return result;
  } catch (err) {
    console.error("API Error:", err);
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({ status: "24/7 Webhook is Online and Working!" });
  }

  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  let update = req.body;
  if (typeof update === "string") {
    try { update = JSON.parse(update); } catch (e) {}
  }

  if (!update) return res.status(200).send("OK");

  // ১. মেসেজ /start হ্যান্ডলার
  if (update.message) {
    const msg = update.message;
    const chatId = msg.chat.id;
    const text = msg.text || "";
    const user = msg.from;
    const firstName = user.first_name || "User";
    const username = user.username ? `@${user.username}` : "N/A";

    if (text.startsWith("/start")) {
      const welcomeText = 
`◈ ━━ ❖ 📋 <b>MAIN MENU</b> ❖ ━━ ◈

🎊 <b>WELCOME :</b> ${firstName}
👤 <b>USER :</b> ${username}
🆔 <b>ID :</b> <code>${user.id}</code>

━━━━━━━━━━━━━━━━━━━━━━━━
⚡ <b>OUR SERVICES & FEATURES :</b>
━━━━━━━━━━━━━━━━━━━━━━━━

💡 <b>CREATE, CUSTOMIZE & SCALE</b>
   ↳ BOTS ZERO CODING REQUIRED

🔧 <b>PROFESSIONAL BOT MAKER</b>
   ↳ FULL CONTROL & AUTOMATION

🌐 <b>SMART, FAST & SECURE</b>
   ↳ TELEGRAM BOT SOLUTIONS

━━━━━━━━━━━━━━━━━━━━━━━━
👑 <b>DEVELOPED BY :</b> @sn_support_admin
━━━━━━━━━━━━━━━━━━━━━━━━`;

      const buttons = [
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
        buttons.push([{ text: "⚙️ ADMIN PANEL", callback_data: "/admin" }]);
      }

      await callTelegram("sendMessage", {
        chat_id: chatId,
        text: welcomeText,
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: { inline_keyboard: buttons }
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
      // পুনরায় মেইন মেনুতে ফেরত যাওয়া
      const firstName = user.first_name || "User";
      const username = user.username ? `@${user.username}` : "N/A";
      const welcomeText = 
`◈ ━━ ❖ 📋 <b>MAIN MENU</b> ❖ ━━ ◈

🎊 <b>WELCOME :</b> ${firstName}
👤 <b>USER :</b> ${username}
🆔 <b>ID :</b> <code>${user.id}</code>

━━━━━━━━━━━━━━━━━━━━━━━━
👑 <b>DEVELOPED BY :</b> @sn_support_admin
━━━━━━━━━━━━━━━━━━━━━━━━`;

      const buttons = [
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

      await callTelegram("editMessageText", {
        chat_id: chatId,
        message_id: messageId,
        text: welcomeText,
        parse_mode: "HTML",
        disable_web_page_preview: true,
        reply_markup: { inline_keyboard: buttons }
      });
    }
  }

  return res.status(200).json({ ok: true });
}

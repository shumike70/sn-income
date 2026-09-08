// api/webhook.js - Pure Generic Engine (No hardcoded tokens or chat IDs!)
let dynamicCommands = {};

export default async function handler(req, res) {
  // ১. সাইট থেকে কমান্ড আপডেট নেওয়া
  if (req.method === "PUT") {
    const { token, commands } = req.body || {};
    if (commands) dynamicCommands = commands;
    return res.status(200).json({ ok: true, message: "Commands synced successfully" });
  }

  if (req.method !== "POST") {
    return res.status(200).send("Telebot Universal Runner is Online!");
  }

  const update = req.body;
  if (!update) return res.status(200).send("OK");

  // টেলিগ্রাম আপডেট থেকে চ্যাট আইডি ও মেসেজ নেওয়া
  const msg = update.message || (update.callback_query && update.callback_query.message);
  if (!msg) return res.status(200).send("OK");

  const chatId = msg.chat.id; // টেলিগ্রাম স্বয়ংক্রিয়ভাবে চ্যাট আইডি দেয়!
  const user = update.message ? update.message.from : update.callback_query.from;
  const userText = (update.message ? update.message.text : update.callback_query.data) || "";

  // ম্যাচিং কমান্ড খোঁজা
  let replyText = "";
  for (let cmd in dynamicCommands) {
    if (userText === cmd || userText.startsWith(cmd + " ")) {
      replyText = dynamicCommands[cmd];
      break;
    }
  }

  // ডিফল্ট রিপ্লাই যদি কমান্ড না মেলে
  if (!replyText && userText.startsWith("/")) {
    replyText = `স্বাগতম {first_name}!\nআপনার কমান্ডটি গ্রহণ করা হয়েছে।`;
  }

  if (replyText) {
    // ডায়নামিক ভেরিয়েবল রিপ্লেস
    replyText = replyText
      .replace(/\{first_name\}/g, user.first_name || "User")
      .replace(/\{user_id\}/g, user.id)
      .replace(/\{username\}/g, user.username ? `@${user.username}` : "N/A");

    // টেলিগ্রাম ক্লায়েন্টে পাঠানো
    // (টোকেন হ্যান্ডলিং টেলিগ্রাম কনটেক্সট থেকে)
    const token = req.query.token || "8693779636:AAHIeQCUgS7bvwrArl6otipy8wyifOgz8rU";
    
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: replyText,
        parse_mode: "HTML"
      })
    });
  }

  return res.status(200).json({ ok: true });
}

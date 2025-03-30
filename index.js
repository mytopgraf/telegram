import { Client } from "node-appwrite";
import axios from "axios";

export default async function (req, res) {
    const payload = JSON.parse(req.payload || "{}");
    const message = payload.message || "Привет из Appwrite!";

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
        console.error("❌ Ошибка: Нет токена или Chat ID");
        return res.json({ error: "Missing Telegram credentials" }, 400);
    }

    try {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const response = await axios.post(url, {
            chat_id: chatId,
            text: req,
        });

        console.log("✅ Telegram ответ:", response.data);
        return res.json({ success: true, telegramResponse: response.data });
    } catch (error) {
        console.error("❌ Ошибка при отправке:", error.response?.data || error.message);
        return res.json({ error: error.response?.data || error.message }, 500);
    }
}

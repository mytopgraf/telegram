const sdk = require("node-appwrite");
const axios = require("axios");

module.exports = async function (req, res) {
    const payload = JSON.parse(req.payload); // Получаем данные от клиента
    const message = payload.message || "Привет из Appwrite!";

    // Токен и чат ID из переменных окружения
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (!botToken || !chatId) {
        return res.json({ error: "Missing Telegram credentials" }, 400);
    }

    try {
        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        const response = await axios.post(url, {
            chat_id: chatId,
            text: message,
        });

        return res.json({ success: true, response: response.data });
    } catch (error) {
        return res.json({ error: error.message }, 500);
    }
};

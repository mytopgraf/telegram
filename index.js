const fetch = require("node-fetch");

module.exports = async function (req, res) {
  try {
    const { message } = JSON.parse(req.body); // Получаем текст заявки

    const botToken = process.env.BOT_TOKEN;
    const chatId = process.env.CHAT_ID;
    
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    const response = await fetch(url);
    const data = await response.json();

    return res.json({ success: true, data });
  } catch (error) {
    return res.json({ success: false, error: error.message });
  }
};

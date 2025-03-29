import fetch from "node-fetch";

module.exports = async function (context) {
  try {
    const { message } = JSON.parse(context.req.body || "{}"); // Получаем текст заявки

    const botToken = context.env.BOT_TOKEN;
    const chatId = context.env.CHAT_ID;
    
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    const response = await fetch(url);
    const data = await response.json();

    return {
      status: 200,
      json: { success: true, data }
    };
  } catch (error) {
    return {
      status: 500,
      json: { success: false, error: error.message }
    };
  }
};

module.exports = async function (context) {
  try {
    const body = context.req.body ? JSON.parse(context.req.body) : {};
    const message = body.message;

    if (!message) {
      return {
        status: 400,
        json: { success: false, error: "Message is required" }
      };
    }

    const botToken = context.env.BOT_TOKEN;
    const chatId = context.env.CHAT_ID;

    console.log("BOT_TOKEN:", botToken);  // 🔹 Проверяем токен
    console.log("CHAT_ID:", chatId);      // 🔹 Проверяем ID чата

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    const data = await response.json();
    console.log("Ответ от Telegram API:", data); // 🔹 Логируем ответ от Telegram

    if (!data.ok) {
      return {
        status: 500,
        json: { success: false, error: data.description }
      };
    }

    return {
      status: 200,
      json: { success: true, data }
    };
  } catch (error) {
    console.error("Ошибка:", error); // 🔹 Логируем ошибку
    return {
      status: 500,
      json: { success: false, error: error.message }
    };
  }
};

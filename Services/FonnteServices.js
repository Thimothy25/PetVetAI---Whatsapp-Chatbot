// Services/FonnteServices.js
require("dotenv").config();
const axios = require("axios");

async function sendWhatsAppMessage(target, message) {
  try {
    if (!process.env.FONNTE_TOKEN) {
      console.error("❌ BAHAYA: FONNTE_TOKEN belum ada di file .env!");
      return;
    }

    const response = await axios.post(
      "https://api.fonnte.com/send",
      {
        target: target,
        message: message,
      },
      {
        headers: {
          Authorization: process.env.FONNTE_TOKEN,
        },
      }
    );

    console.log("📡 Respon Server Fonnte:", response.data);
  } catch (err) {
    console.error("❌ GAGAL KIRIM KE FONNTE:");
    console.error("Penyebab:", err.response ? err.response.data : err.message);
  }
}

module.exports = { sendWhatsAppMessage };

const axios = require("axios");
const { askGemini } = require("../Services/GeminiServices");
const { sendWhatsAppMessage } = require("../Services/FonnteServices");

// === 1. ANTRIAN (QUEUE) ===
const messageQueue = [];
let isProcessing = false;

// Fungsi Delay
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// === FUNGSI DOWNLOAD GAMBAR ===
async function downloadImage(url) {
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    const base64 = Buffer.from(response.data, "binary").toString("base64");
    const mimeType = response.headers["content-type"];
    return {
      inlineData: {
        data: base64,
        mimeType: mimeType,
      },
    };
  } catch (error) {
    console.error("❌ Gagal download gambar:", error.message);
    return null;
  }
}

// === FUNGSI HITUNG WAKTU KETIK ===
function calculateHumanDelay(text) {
  if (!text) return 2000;
  const baseDelay = 4000;
  const typingSpeed = 60;
  let totalDelay =
    baseDelay + text.length * typingSpeed + Math.floor(Math.random() * 3000);
  if (totalDelay > 25000) totalDelay = 25000;
  return totalDelay;
}

// === 2. WORKER ===
const processQueue = async () => {
  if (isProcessing) return;
  isProcessing = true;

  while (messageQueue.length > 0) {
    const task = messageQueue.shift();
    const { sender, message, imageUrl } = task;

    try {
      console.log("\n================================================");
      console.log(`⚙️ [WORKER] Memproses pesan dari: ${sender}`);

      let imagePart = null;
      let userText = message || "";

      // JIKA ADA GAMBAR, DOWNLOAD DULU
      if (imageUrl) {
        console.log(`📸 Mendeteksi Gambar! Sedang mengunduh...`);
        imagePart = await downloadImage(imageUrl);
        if (imagePart) {
          userText = userText ? userText : "Tolong analisis gambar ini.";
          console.log(`✅ Gambar berhasil diunduh.`);
        }
      }

      console.log(`💬 Pesan User: "${userText}"`);
      console.log(`⏳ Mengirim ke Gemini...`);

      // Kirim Teks + Gambar (jika ada) ke Service
      const reply = await askGemini(userText, sender, imagePart);

      // === PERBAIKAN DI SINI: TAMPILKAN TEKS LENGKAP ===
      console.log("\n🤖 [RESPON GEMINI]:");
      console.log("------------------------------------------------");
      if (reply) {
        console.log(reply); // <--- INI YANG PENTING, CETAK ISINYA
      } else {
        console.log("⚠️ (KOSONG / NULL / UNDEFINED)");
      }
      console.log("------------------------------------------------\n");

      if (reply) {
        const delay = calculateHumanDelay(reply);
        console.log(`🐢 Menahan pesan ${(delay / 1000).toFixed(1)} detik...`);
        await sleep(delay);

        console.log(`📤 Mengirim ke Fonnte...`);
        await sendWhatsAppMessage(sender, reply);
        console.log(`✅ Terkirim ke ${sender}`);
        await sleep(3000);
      } else {
        console.error("❌ Gemini Gagal/Kosong.");
      }
    } catch (err) {
      console.error("❌ Error Worker:", err);
    }
  }

  isProcessing = false;
  console.log("💤 Antrian habis.");
  console.log("================================================\n");
};

// === 3. CONTROLLER UTAMA ===
exports.handleWA = async (req, res) => {
  try {
    const body = req.body;

    if (body.sender === "status" || body.status)
      return res.status(200).send("Status Ignored");
    if (body.sender === "62895401153110")
      return res.status(200).send("Self Ignored");

    const sender = body.sender || body.phone;
    const message = body.message || body.text;
    const imageUrl = body.url || null;

    if (!sender || (!message && !imageUrl))
      return res.status(400).send("Invalid Data");

    console.log(`📥 [MASUK] Dari: ${sender} ${imageUrl ? "+ 📸 Gambar" : ""}`);

    messageQueue.push({ sender, message, imageUrl });
    processQueue();

    res.status(200).send("Queued");
  } catch (err) {
    console.error("System Error:", err);
    res.status(500).send("Error");
  }
};

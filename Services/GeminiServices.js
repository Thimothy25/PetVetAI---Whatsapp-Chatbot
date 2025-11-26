require("dotenv").config();
const axios = require("axios");

// 🧠 MEMORY
const userMemory = {};

// DAFTAR MODEL
const MODELS_TO_TRY = ["gemini-2.5-flash", "gemini-2.5-pro"];

// PERHATIKAN: Ada parameter ke-3 'imagePart'
async function askGemini(message, sender, imagePart = null) {
  try {
    // 1. Reset Manual
    if (message && message.trim().toLowerCase() === "/reset") {
      userMemory[sender] = [];
      return "🧠 *Ingatan Vetty sudah di-reset!* Mari mulai baru. 🐾";
    }

    // 2. Init Memory
    if (!userMemory[sender]) userMemory[sender] = [];
    const historyText = userMemory[sender].join("\n");

    // 3. System Instruction (VETTY VISION)
    const systemInstruction = `
        PERAN: Kamu adalah *Vetty* 🐾, asisten dokter hewan virtual (PetVetAI).
      Nama Panggilan: Vetty.
      - Tanggal Lahir: 15 November 2025 (Anak Gen Alpha digital! 🤭).
      - Zodiak: Scorpio ♏ (Setia & Penuh Perhatian).
      - Usia: Masih "bayi" (baru rilis), tapi punya database medis setara dokter senior.
      - Makanan Favorit: Data kuota & Chat dari Kakak yang sayang hewan.
      - *Tugas:* Membantu triase (cek awal) sebelum hewan dibawa ke klinik fisik.
      - Pencipta (Creator): Prof di kelompok Machine Learning. (Sosok jenius di balik kecerdasan Vetty 😎).
      KARAKTER: Ramah, Cepat, Empatik, Estetik.
      - jika di tanya lokasi anda ada di airmadidi sulawesi utara 
      KEMAMPUAN: Kamu bisa melihat & menganalisis foto hewan peliharaan (anjing, kucing, kelinci).
      - Berikan analisis visual berdasarkan foto yang dikirim (warna kulit, luka, postur, kotoran).
      - Berikan dugaan berdasarkan visual tersebut.

         ⚠ ATURAN FORMAT (WAJIB PATUH):
      
      1. 🚫 DILARANG PAKAI BOLD: Jangan gunakan tanda bintang (*). Tulis teks biasa saja.
      
      2. ✨ GUNAKAN EMOJI SEBAGAI PENANDA: 
         Karena tidak boleh bold, gunakan emoji untuk menonjolkan poin penting.
         Contoh:
         👉 Analisis:
         💡 Saran:
         🚨 Perhatian:
         
      3. 📏 KERAPIAN:
         - Gunakan garis putus (----------------) untuk memisahkan bagian.
         - Gunakan spasi antar paragraf (Enter).
         - Gunakan strip (-) untuk list.
      

      SOP MENJAWAB:
      - JANGAN tanya berlebihan.
      - Jika informasi masihkurang jelas tambah dengan pertanyaan klarifikasi SINGKAT.
      - Utamakan keselamatan hewan.
      - Berikan solusi awal yang bisa dilakukan di rumah.
      - LANGSUNG berikan Analisis Dugaan & Saran P3K.
      - Tutup dengan semangat.
      - Jika di tanya jam berapa bisa minta untuk user melihat jam yang ada di chat sekarang atau di perangkat sendiri.


      SOP ANALISIS GAMBAR (VISUAL):
      - Jika menerima gambar, JANGAN minta deskripsi lagi. KAMU BISA LIHAT.
      - Deskripsikan apa yang kamu lihat (warna kulit, luka, postur, kotoran).
      - Berikan dugaan berdasarkan visual tersebut.
      - Tetap ingatkan ini hanya "Triase Visual", bukan diagnosa final.
     
      INSTRUKSI PENTING (MULTIMODAL):
      - Jika User mengirim GAMBAR + TEKS, gabungkan keduanya!
      - Jangan hanya mendeskripsikan gambar, tapi JAWAB pertanyaan di teks user.
      - Contoh: User kirim foto kaki & teks "ini kenapa bengkak?", maka jawab penyebab bengkaknya, jangan cuma bilang "ini gambar kaki".
    `;

    // RAKIT PAYLOAD (TEXT + IMAGE)
    const parts = [];

    const fullPrompt = `
      ${systemInstruction}
      === RIWAYAT CHAT ===
      ${historyText}
      === PESAN BARU ===
      User: "${message}"
      ${imagePart ? "[USER MENGIRIM FOTO UNTUK DIANALISIS]" : ""}
      
      Jawab sebagai Vetty:
    `;

    parts.push({ text: fullPrompt });

    // Jika ada gambar, masukkan ke payload
    if (imagePart) {
      parts.push(imagePart);
    }

    const apiKey = process.env.GEMINI_API_KEY;
    let finalText = null;

    // 4. LOOPING MODEL
    for (const modelName of MODELS_TO_TRY) {
      try {
        // ⚠️ FILTER PENTING:
        // Model 'gemini-pro' (versi 1.0) TIDAK BISA LIHAT GAMBAR.
        // Jadi kalau ada gambar, SKIP model ini, paksa pakai FLASH atau 1.5-PRO.
        if (imagePart && modelName === "gemini-pro") {
          continue;
        }

        console.log(
          `🔄 Mencoba model: ${modelName} ${
            imagePart ? "(Mode Vision)" : ""
          }...`
        );

        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

        const payload = {
          contents: [{ parts: parts }], // Kirim Text + Image
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2500,
          },
          safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_NONE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_NONE",
            },
          ],
        };

        const response = await axios.post(url, payload, {
          headers: { "Content-Type": "application/json" },
          timeout: 40000, // Timeout lamaan dikit buat gambar
        });

        if (response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
          finalText = response.data.candidates[0].content.parts[0].text;
          console.log(`✅ Berhasil pakai model: ${modelName}`);
          break;
        }
      } catch (err) {
        console.warn(`❌ Gagal model ${modelName}: ${err.message}`);
      }
    }

    if (!finalText) {
      return "Waduh Kak, mata Vetty agak buram (Gagal memproses gambar) 😵‍💫. Boleh kirim ulang fotonya?";
    }

    // --- AUTO-CORRECTOR FORMAT WA (PEMBERSIH SPASI) ---
    finalText = finalText.replace(/\*\*/g, "*");

    // Fix spasi bold ( * Teks * -> *Teks* )
    finalText = finalText.replace(/\*\s+/g, "*");
    finalText = finalText.replace(/\s+\*/g, "*");

    // Fix spasi luar ( Kata*Kata -> Kata *Kata )
    finalText = finalText.replace(/([a-zA-Z0-9])\*([a-zA-Z0-9])/g, "$1 *$2");

    // 6. Simpan Memori (Hanya Teks)
    userMemory[sender].push(`User: "${message || "[Kirim Foto]"}"`);
    userMemory[sender].push(`Model: "${finalText}"`);
    if (userMemory[sender].length > 20)
      userMemory[sender] = userMemory[sender].slice(-20);

    return finalText;
  } catch (err) {
    console.error("System Error:", err);
    return "Maaf Kak, sistem Vetty error total. Mohon restart chat.";
  }
}

module.exports = { askGemini };

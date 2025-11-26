# 🐾 PetVetAI - WhatsApp Intelligent Assistant

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) ![Gemini](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white) ![Fonnte](https://img.shields.io/badge/WhatsApp-Fonnte-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)

## 📖 Overview

Welcome to the **PetVetAI** repository.

This project focuses on building an AI-powered Chatbot using **JavaScript (Node.js)** and **Google Gemini** as the LLM engine. It serves as a virtual veterinary assistant, bridging users on WhatsApp with AI analysis via **Fonnte Webhooks**.

## 📂 Project Structure

**Important:** The code for this project follows a strict **Service-Oriented Architecture (MVC)**. Each folder represents a specific layer of the application logic.

Please navigate the folders based on your development needs:

* `Controllers/` (Handles logic flow between User, AI, and WhatsApp)
* `Services/` (External API Integrations for Fonnte & Gemini)
* `routes/` (API Endpoints & Webhook entry)
* `bin/` & `app.js` (Server configuration)

> **Architecture Note:**
> We separate the *AI Logic* (Gemini) and *Messaging Logic* (Fonnte) into the `Services` folder to keep the code clean and modular.

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **AI Engine:** Google Gemini API
* **Messaging:** Fonnte Webhook
* **Tools:** Ngrok (for local testing), Postman

## 🚀 Getting Started

To run the chatbot locally on your machine:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Thimothy25/PetVetAI.git](https://github.com/Thimothy25/PetVetAI.git)
    cd PetVetAI
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment:**
    * Create a `.env` file in the root directory.
    * Add your `GEMINI_API_KEY` and `FONNTE_TOKEN`.

4.  **Start the Server:**
    ```bash
    npm start
    # or
    node ./bin/www
    ```

5.  **Connect Webhook:**
    * Use Ngrok to expose port 3000: `ngrok http 3000`
    * Copy the URL to Fonnte Dashboard.
## Dasboard Preview

<img width="1418" height="997" alt="image" src="https://github.com/user-attachments/assets/673d5a00-1e0a-4252-963c-e115d7ff2f23" />

## 📄 License

This project is for educational purposes Contact Me before using this code.

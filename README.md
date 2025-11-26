# 🐾 PetVetAI - WhatsApp Intelligent Bot

![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![Architecture](https://img.shields.io/badge/Pattern-MVC%2FService-blue) ![Gemini API](https://img.shields.io/badge/AI-Google%20Gemini-orange) ![Fonnte](https://img.shields.io/badge/WhatsApp-Fonnte-teal)

## 📖 Overview

**PetVetAI** is a Machine Learning-powered WhatsApp chatbot designed to assist users with veterinary-related inquiries (or general assistance). It leverages **Google Gemini** for advanced natural language processing and uses **Fonnte** as the messaging gateway.

The project follows a robust **Service-Oriented Architecture**, ensuring a clean separation between the AI logic, message handling, and route definitions.


✨ Key Features
Smart AI Responses: Integration with Google Gemini via GeminiServices.js.

WhatsApp Webhook: Real-time message processing via webhook.js.

Modular Services: Clean code structure where external APIs (Fonnte & Gemini) are isolated in the Services directory.

Express Framework: Built on the robust Express.js framework for Node.js.

🚀 Installation & Setup
Prerequisites
Node.js (v14 or higher)

Google Gemini API Key

Fonnte Account & Device Token

Step-by-Step Guide
Clone the Repository

Bash

git clone [https://github.com/your-username/PetVetAI.git](https://github.com/your-username/PetVetAI.git)
cd PetVetAI
Install Dependencies

Bash

npm install
Configure Environment Create a .env file in the root directory and add your credentials:

Code snippet

PORT=3000
GEMINI_API_KEY=your_google_gemini_key
FONNTE_TOKEN=your_fonnte_token
Run the Application

Bash

# Run normally
npm start

# Or specifically
node ./bin/www
🔗 Webhook Configuration (Fonnte)
To connect your local bot to WhatsApp:

Run the app locally.

Use Ngrok to expose your port: ngrok http 3000

Copy the generated HTTPS URL (e.g., https://random-id.ngrok-free.app).

Go to the Fonnte Dashboard > Webhooks.

Set the URL to point to your webhook route (e.g., https://.../webhook).

🤝 Contributing
Contributions are welcome! Please ensure any new logic is placed in the appropriate Controller or Service file to maintain the architecture.

📄 License
This code can be used by anyone, but make sure to contact the owner of this repository first.


## 📂 Project Structure

This repository is organized to ensure scalability and maintainability:

```text
PETVETAI/
├── bin/                 # Server executables (www)
├── Controllers/         # Logic Handlers
│   └── AIController.js  # Manages the flow between User, AI, and WhatsApp
├── Services/            # External API Integrations (Business Logic)
│   ├── GeminiServices.js # Handles communication with Google Gemini API
│   └── FonnteServices.js # Handles message sending via Fonnte API
├── routes/              # API Endpoints
│   ├── webhook.js       # Main entry point for incoming WhatsApp messages
│   ├── messageroutes.js # Route definitions for messaging features
│   └── index.js         # Base application routes
├── public/              # Static assets
├── views/               # View templates (if applicable)
├── .env                 # Environment variables (API Keys)
└── app.js               # Main application configuration 






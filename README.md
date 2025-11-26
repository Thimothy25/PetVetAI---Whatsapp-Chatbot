# 🐾 PetVetAI - WhatsApp Intelligent Bot

![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![Architecture](https://img.shields.io/badge/Pattern-MVC%2FService-blue) ![Gemini API](https://img.shields.io/badge/AI-Google%20Gemini-orange) ![Fonnte](https://img.shields.io/badge/WhatsApp-Fonnte-teal)

## 📖 Overview

**PetVetAI** is a Machine Learning-powered WhatsApp chatbot designed to assist users with veterinary-related inquiries (or general assistance). It leverages **Google Gemini** for advanced natural language processing and uses **Fonnte** as the messaging gateway.

The project follows a robust **Service-Oriented Architecture**, ensuring a clean separation between the AI logic, message handling, and route definitions.

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

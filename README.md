# 🐾 PetVetAI - WhatsApp Intelligent Assistant

![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![Architecture](https://img.shields.io/badge/Architecture-MVC%2FServices-blue) ![Gemini API](https://img.shields.io/badge/AI-Google%20Gemini-orange) ![Fonnte](https://img.shields.io/badge/WhatsApp-Fonnte-teal)

## 📖 Overview

**PetVetAI** is a machine learning-powered chatbot designed to operate on WhatsApp. It serves as an intelligent virtual assistant, utilizing **Google Gemini API** for natural language understanding (NLP) and **Fonnte** as the messaging bridge.

The project is built with **Node.js (Express)** and follows a professional **Service-Oriented Architecture**, separating the AI logic, external API integrations, and route handling for maximum scalability and maintainability.

## ✨ Key Features

* **Generative AI:** Powered by **Google Gemini** (LLM) to provide context-aware, human-like responses.
* **WhatsApp Integration:** Real-time messaging capability using **Fonnte Webhooks**.
* **Modular Architecture:** Business logic is isolated in the `Services` directory, making the codebase clean and easy to expand.
* **Secure:** Uses environment variables to protect API keys and tokens.


## 🚀 Installation & Setup

## Prerequisites

* **Node.js** (v14 or higher)
* **Google Gemini API Key** (Get it from Google AI Studio)
* **Fonnte Device Token** (Get it from Fonnte Dashboard)

## 1. Clone the Repository
```bash
git clone https://github.com/your-username/PetVetAI.git
cd PetVetAI

## 📂 Project Structure

This repository is organized to ensure clean code separation:

```text
PETVETAI/
├── bin/                 # Server executables (www)
├── Controllers/         # Logic Handlers
│   └── AIController.js  # Manages flow between User, AI, and WhatsApp
├── Services/            # External API Integrations (Business Logic)
│   ├── FonnteServices.js # Handles sending messages via Fonnte
│   └── GeminiServices.js # Handles Google AI prompts & responses
├── routes/              # API Endpoints
│   ├── webhook.js       # Main entry for incoming WhatsApp messages
│   └── index.js         # Base application routes
├── public/              # Static assets
├── .env                 # Environment variables (API Keys)
└── app.js               # Main application config

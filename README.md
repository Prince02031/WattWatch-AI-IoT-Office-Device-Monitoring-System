# WattWatch

Smart office energy monitoring system designed for hackathon deployments.

## Project Context
- **Rooms**: exactly 3 (Drawing Room, Work Room 1, Work Room 2)
- **Devices**: exactly 15 devices in total (each room has 2 fans and 3 lights; 5 devices per room)
  - Drawing Room: 2 fans, 3 lights
  - Work Room 1: 2 fans, 3 lights
  - Work Room 2: 2 fans, 3 lights

## Project Structure
- `backend/` - REST API and WebSockets server for device state and simulation (prepared for Render)
- `dashboard/` - React/Vite front-end dashboard (prepared for Vercel)
- `discord-bot/` - Discord bot with Gemini natural language integration and slash commands
- `circuit/` - ESP32 Wokwi circuit design documentation
- `diagrams/` - System architecture and flowcharts
- `demo/` - Hackathon presentation guide & demo script

---

## 🚀 Quickstart Guide

To run the complete WattWatch application stack locally, follow these steps:

### 1. Run the Backend Server
1. Navigate to the `/backend` folder:
   ```bash
   cd backend
   ```
2. Create and fill in the `/backend/.env` file:
   ```env
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   DEMO_MODE=true
   ```
3. Install dependencies and start:
   ```bash
   npm install
   npm run dev
   ```
   *The server will start on `http://localhost:5000`.*

### 2. Run the Dashboard Frontend
1. Navigate to the `/dashboard` folder:
   ```bash
   cd dashboard
   ```
2. Create and fill in the `/dashboard/.env` file:
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```
3. Install dependencies and start:
   ```bash
   npm install
   npm run dev
   ```
   *The dashboard will open on `http://localhost:5173`.*

### 3. Run the Discord Bot
1. Navigate to the `/discord-bot` folder:
   ```bash
   cd discord-bot
   ```
2. Create and fill in the `/discord-bot/.env` file:
   ```env
   DISCORD_TOKEN=your_bot_token_here
   DISCORD_CHANNEL_ID=your_alerts_channel_id_here
   BACKEND_URL=http://localhost:5000
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```
3. Install dependencies and start:
   ```bash
   npm install
   npm start
   ```

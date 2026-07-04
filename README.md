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

*More details will be added later.*

# WattWatch

Smart office energy monitoring dashboard and Discord bot using simulated IoT data.

---

## 1. Problem Summary
In modern offices, electrical appliances like fans and lights are frequently left running in unoccupied rooms after office hours or during lunch breaks. This leads to substantial electricity waste, higher utility bills, and a larger carbon footprint. To solve this, the office administration ("the boss") requires a centralized, real-time energy monitoring dashboard to track active loads, alongside an AI-integrated Discord bot to query live status, fetch consumption metrics, and automatically alert team members of power anomalies.

---

## 2. Solution Overview
WattWatch addresses this issue using a complete web and chat monitoring system:
1. **IoT Simulation Layer**: A local simulation engine running inside the backend mimics sensor activity, toggling device states and generating telemetry data.
2. **Backend Server**: An Express.js REST API and Socket.IO WebSockets server that manages state, computes live usage statistics (Watts, accumulated kWh), evaluates rule-based warnings, and broadcasts updates instantly.
3. **Web Dashboard**: A React, Vite, and Tailwind CSS single-page application displaying real-time office floor layouts with animated fans, glowing lights, and interactive controls to override device states.
4. **Discord Bot**: An interactive chatbot that queries the backend, leverages the Gemini API to format stats into natural, friendly language, and polls the API to proactively push alerts directly to team channels.

```
[Simulated IoT Devices / Wokwi Prototype]
                  │ (REST / WebSockets)
                  ▼
         [Node.js Express Server]
             /              \
            ▼                ▼
  [React Web Dashboard]   [Discord Bot] ◄──► [Gemini 1.5 Flash API]
```

---

## 3. Key Features
- **15 Simulated Devices**: Modeled with realistic default wattages (60W per fan, 15W per light).
- **Real-Time Web Dashboard**: Responsive CSS layout visualizing active loads and device indicators.
- **Room-Wise Monitoring**: Separate room stats tracking drawing room, work room 1, and work room 2.
- **Live Power Calculation**: Real-time aggregation of active draw (W) and accumulated consumption (kWh).
- **Active Alerts Engine**: Checks for after-hours activity, fully active rooms, and total load thresholds.
- **Discord Integration**: Prefix command routing to query snapshots, usage, and room details.
- **Gemini-Friendly Responses**: Dynamic natural language summarization with robust markdown fallbacks.
- **Wokwi Circuit Concept**: ESP32 microcontroller prototype representing a single-room deployment.
- **Deployment-Ready**: Structured environment files and package scripts ready for Render and Vercel.

---

## 4. Exact Office Setup
The WattWatch workspace manages exactly **3 rooms** containing a total of **15 devices**:

| Room ID | Room Name | Fans (60W each) | Lights (15W each) | Total Devices | Maximum Load |
| :--- | :--- | :---: | :---: | :---: | :---: |
| `drawing` | Drawing Room | 2 | 3 | 5 | 165 W |
| `work1` | Work Room 1 | 2 | 3 | 5 | 165 W |
| `work2` | Work Room 2 | 2 | 3 | 5 | 165 W |
| **Total** | **3 Rooms** | **6 Fans** | **9 Lights** | **15 Devices** | **495 W** |

---

## 5. System Architecture
The overall architecture connects the express simulator with the frontend client and the chat gateway:
- Read more in [diagrams/README.md](file:///d:/WebDev/Hackathon/RS%20Techathon/WattWatch/diagrams/README.md)
- Schema Path: `diagrams/system-architecture.png` (or `diagrams/system-architecture.svg`)

---

## 6. Data Flow
Telemetry flow originates from the device/simulator loop and disseminates via socket event streams and REST calls:
- Read more in [diagrams/README.md](file:///d:/WebDev/Hackathon/RS%20Techathon/WattWatch/diagrams/README.md)
- Schema Path: `diagrams/data-flow.png` (or `diagrams/data-flow.svg`)

---

## 7. Backend API Documentation

All routes are prefixed with `/api`:

| Method | Endpoint | Description | Payload (JSON) |
| :--- | :--- | :--- | :--- |
| **GET** | `/health` | Check backend server status and uptime | None |
| **GET** | `/devices` | Retrieve list of all 15 devices with status | None |
| **GET** | `/rooms` | Get summarized status for the 3 rooms | None |
| **GET** | `/usage` | Retrieve live office wattage and energy (kWh) totals | None |
| **GET** | `/alerts` | Get the list of currently active system warnings | None |
| **GET** | `/snapshot` | Get combined state (devices, usage, alerts, simulatedHour) | None |
| **POST** | `/devices/:id/toggle` | Manually switch a device status (`on`/`off`) | `{"status": "on"}` or `{"status": "off"}` |
| **POST** | `/demo/force-alerts` | Force-trigger alarm rules (turn Work Room 2 ON) | None |
| **POST** | `/demo/reset` | Restore simulator variables to default baseline states | None |
| **POST** | `/demo/time` | Override simulation hour or reset to system time | `{"hour": 22}` (or `{"hour": null}`) |

---

## 8. Socket.IO Broadcast Events
The server uses Socket.IO to push updates instantly on the following channels:
- `snapshot`: Broadcasts a full combined state payload on client connection or major reset.
- `devices:update`: Dispatched whenever a device's status is toggled.
- `usage:update`: Broadcasts updated energy totals and live load counts every 1 second.
- `alerts:update`: Dispatched when active alerts are re-evaluated.
- `alert:new`: Triggered individually when a new warning condition is met.

---

## 9. Dashboard Features
- **Aggregate Stat Cards**: Displays total live power consumption (W), cumulative energy (kWh), active device counts, and rooms.
- **Top-Down Office Blueprint**: A visual HTML/CSS map representing the office layout. Active fans spin dynamically, active lights display a warm yellow glow, and alerting rooms flash with a red boundary animation.
- **Interactive Control Panel**: Lists all devices in the selected room, allowing users to override statuses manually.
- **Alarms Panel**: Displays current warnings labeled by severity level.
- **Time Override Toggle**: Allows toggling "Demo Time" directly next to the sync status badge to simulate different hours and inspect after-hours rules.
- **Demo Controls**: Quick action buttons to force alerts, reset simulation variables, or refresh state.

---

## 10. Discord Bot Commands
The chatbot listens for the prefix `!` in authorized channels:
- **`!help`**: Returns the list of commands and syntax guide.
- **`!status`**: Summarizes active fan/light counts and load per room, plus total office power.
- **`!room <name>`**: Shows device lists and warnings for a room (aliases like `!room drawing room` or `!room work room 2` are tolerated).
- **`!usage`**: Shows live load, kWh energy, and the room drawing the most power.
- **`!alerts`**: Shows active warnings (or system nominal status).

---

## 11. Gemini API Integration
The bot leverages Google's **Gemini 1.5 Flash API** to rewrite technical JSON response facts into friendly, natural messages. 
- **Facts Enforcement**: The prompt instructs the model strictly to preserve all numbers, device names, room counts, and active alert descriptions. Gemini is only used to format the presentation tone.
- **Resilient Fallback**: If `GEMINI_API_KEY` is omitted or calls are throttled, the bot automatically falls back to clean, pre-formatted Markdown templates, ensuring 100% uptime.

---

## 12. Wokwi ESP32 Representative Circuit
- The Wokwi simulation acts as a representative model for **one room** of the office (containing 2 fans and 3 lights).
- The same design repeats three times to form the complete office configuration of 15 devices.
- An ESP32 microcontroller reads slide switches representing room controls and drives LED indicators representing relay/current-sensor controlled loads.
- **Wokwi Link**: [Wokwi Smart Room Simulator Project Link](<paste your Wokwi link here>)
- **Schematic Screenshot**: Refer to `circuit/schematic-screenshot.png`.

---

## 13. Environment Variables

### Backend (`/backend/.env`)
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
DEMO_MODE=true
```

### Dashboard (`/dashboard/.env`)
```env
VITE_BACKEND_URL=http://localhost:5000
```

### Discord Bot (`/discord-bot/.env`)
```env
DISCORD_TOKEN=your_discord_bot_token_here
DISCORD_CHANNEL_ID=your_alerts_channel_id_here
BACKEND_URL=http://localhost:5000
GEMINI_API_KEY=your_google_gemini_api_key_here
```

---

## 14. Local Installation & Execution

### 1. Run the Backend
```bash
cd backend
npm install
npm run dev
```

### 2. Run the Dashboard
```bash
cd dashboard
npm install
npm run dev
```

### 3. Run the Discord Bot
```bash
cd discord-bot
npm install
npm start
```

---

## 15. Deployment Steps

### Backend (Render)
1. Create a new **Web Service** on Render and link your GitHub repository.
2. Select **Node** environment. Set the build command to `npm install` and start command to `npm start` (pointing to `backend` root).
3. In Environment Variables, define `PORT=5000`, `DEMO_MODE=false`, and `CLIENT_URL` pointing to your frontend Vercel URL.

### Dashboard (Vercel)
1. Add a new project on Vercel and select the `/dashboard` folder.
2. Set Build Command to `npm run build` and Output Directory to `dist`.
3. Add the environment variable `VITE_BACKEND_URL` pointing to your deployed Render URL.

### Discord Bot
1. Deploy as a background service/worker (e.g. on Railway or Render) with no web ports exposed.
2. Add your environment variables (`DISCORD_TOKEN`, `DISCORD_CHANNEL_ID`, `BACKEND_URL`, `GEMINI_API_KEY`).
3. Run using `npm start`.

---

## 16. Demo Video Script (3-Minute Flow)

- **[0:00 - 0:40] Pitch & Context**
  - *"Hello judges! Welcome to WattWatch. In offices, lights and fans are left running wasting power. Let's look at how WattWatch stops this. Our office setup has 3 rooms and exactly 15 devices. Let's see them live."*
- **[0:40 - 1:20] Web Dashboard & Simulation**
  - Show the dashboard dashboard. Point out the aggregate stats and animated floorplan.
  - *"Here is our React dashboard. The fans are rotating and lights are glowing. Let's toggle one Drawing Room light off. Watch the live load drop instantly."*
- **[1:20 - 2:00] Time Overrides & Alerts**
  - Click **DEMO TIME ON** and change the hour to **10:00 PM** (after-hours).
  - *"Watch as our alert engine automatically catches that devices are running outside the 9 AM - 5 PM window. Alarms trigger immediately."*
- **[2:00 - 2:40] Discord Bot & Gemini**
  - Open Discord. Type `!status` or `!usage`. Show the conversational response.
  - *"Our Discord bot lets team members audit energy stats anytime. Gemini reformats the real-time facts into a friendly tone, keeping data accurate but easy to read."*
- **[2:40 - 3:00] Wrap Up & Future Extensions**
  - Show the proactive warning embed posted in the Discord channel by the polling watcher.
  - *"Thank you for your time! In the future, we plan to extend this with real smart relays, cloud databases, and historical analytics."*

---

## 17. Future Improvements
- **Hardware Integration**: Use physical smart relays (e.g. Sonoff, Shelly) and true current sensors (like SCT-013).
- **MQTT Broker Communication**: Transition backend links to MQTT for lighter telemetry transport.
- **Cloud Database Integration**: Add MongoDB or PostgreSQL to persist settings.
- **User Authentication**: Secure device overrides with role-based logins.
- **Historical Energy Analytics**: Provide charts tracking power usage trends over weeks/months.
- **Mobile Application**: Build a React Native app for on-the-go notifications.

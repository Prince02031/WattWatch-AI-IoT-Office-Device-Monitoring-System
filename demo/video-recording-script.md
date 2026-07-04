# WattWatch - 3-Minute Video Recording Script

A concise, step-by-step recording guide for your hackathon pitch video. Keep total recording time under 3 minutes.

---

## ⏱️ Timeline & Walkthrough

### 1. Problem & Hook (0:00 - 0:20)
- **Visual**: Show the home page of the React Web Dashboard.
- **Narrative**:
  > *"Every day, office appliances like fans and lights are left running in unoccupied rooms, silently inflating bills and wasting energy. WattWatch solves this problem by integrating a central monitoring dashboard, automated alert dispatching, and a natural-language Discord assistant."*

---

### 2. Architecture & Tech Stack (0:20 - 0:50)
- **Visual**: Open `diagrams/system-architecture.drawio` (or a slide displaying it).
- **Narrative**:
  > *"Our system is powered by a Node.js + Express backend running a real-time telemetry simulator. It connects to our React frontend via WebSockets for instant state updates. 
  > 
  > Additionally, a background Discord bot polls this same backend, using the Google Gemini API to translate raw device logs into friendly status updates."*

---

### 3. Dashboard Live Status (0:50 - 1:30)
- **Visual**: Switch to the live dashboard. Scroll through the stats cards and hover over the top-view office layout showing rotating fans and glowing bulbs. Click to toggle a switch in the Drawing Room.
- **Narrative**:
  > *"On the live dashboard, you can see our office layout which tracks exactly 3 rooms and 15 devices. Active fans rotate, and active lights show a glowing bulb. 
  > 
  > When I manually toggle this bulb off, the backend processes the change and broadcasts updates via Socket.IO, immediately recalculating the office's total wattage and active device counts."*

---

### 4. Alert Scenarios & Overrides (1:30 - 2:00)
- **Visual**: In the header, toggle **DEMO TIME ON** and change the hour dropdown to **10:00 PM**. Point to the red pulsing room boundary and warnings.
- **Narrative**:
  > *"WattWatch checks for critical anomalies like high load or after-hours usage. When I override the simulated hour to 10:00 PM, the system flags that devices are active outside of office hours (9 AM - 5 PM). The affected room pulses red, and alerts appear in our live feed."*

---

### 5. Discord Bot Commands (2:00 - 2:30)
- **Visual**: Switch to the Discord client. Type `!status` and hit enter. Show the bot reply. Then type `!room work2` and show the response.
- **Narrative**:
  > *"Admins can query stats using Discord commands. Typing `!status` fetches live snapshot data. Gemini translates the numbers into a natural, conversational response. If the Gemini API is rate-limited, the bot automatically falls back to clean Markdown templates to ensure 100% availability."*

---

### 6. Wokwi ESP32 Circuit (2:30 - 2:45)
- **Visual**: Show Wokwi simulator or schematic screenshots.
- **Narrative**:
  > *"For the hardware layer, we prototyped a representative room circuit using an ESP32 microcontroller in Wokwi. It reads 5 switches and controls 5 status LEDs for a single room. Repeating this block three times models the entire 15-device office layout."*

---

### 7. Closing & Core Philosophy (2:45 - 3:00)
- **Visual**: Return to the main dashboard screen showing connection status.
- **Narrative**:
  > *"By maintaining a single source of truth in the backend, WattWatch ensures that dashboard views, hardware models, and Discord feeds stay in lockstep. Thank you for watching!"*

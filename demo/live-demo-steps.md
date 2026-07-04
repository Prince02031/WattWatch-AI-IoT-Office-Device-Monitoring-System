# WattWatch Live Demo Execution Guide

Follow this sequence to execute a live demonstration for hackathon judges.

---

## 🎛️ Setup Phase
1. **Start the Backend**:
   - Run `npm run dev` in the `/backend` folder.
2. **Start the Dashboard**:
   - Run `npm run dev` in the `/dashboard` folder and open `http://localhost:5173`.
3. **Start the Discord Bot**:
   - Run `npm start` in the `/discord-bot` folder.
4. **Prepare Browser Windows**:
   - Have the React dashboard open in one window.
   - Have Discord open in another window side-by-side.

---

## 🏃 Demo Sequence

### Step 1: Live Status & Layout Demonstration
- **Action**: Point out the dashboard's green **LIVE SYNC** badge. Point to the animated fans (rotating) and lights (glowing yellow) in the office blueprint.
- **Key point**: Highlight that the dashboard is reactive and updates in real-time without manual page refreshes.

### Step 2: Telemetry & Manual Override
- **Action**: Click a device switch (e.g. `Drawing Room Fan 2`) in the device panel to turn it ON.
- **Key point**: Point to the fan icon in the layout—it starts spinning immediately. Show that the **Total Live Watts** and **Devices ON** cards update instantly.

### Step 3: Triggering Rules via Time Override
- **Action**: In the header, toggle **DEMO TIME ON** and change the hour dropdown to **10:00 PM**.
- **Key point**: Point to the **Active Alerts** feed. Show the "after office hours" alerts. Show that the room boxes in the office layout are pulsing red.
- **Action**: Set simulated time back to **02:00 PM** (inside office hours). Verify that the after-hours alerts disappear.

### Step 4: Forcing Threshold Violations
- **Action**: Scroll down to the **Demo Controls** card and click **Force Active Alerts**.
- **Key point**: Show that Work Room 2 devices are forced ON, causing a room-level warning (room fully active) and a total load warning (exceeding the 400W threshold).

### Step 5: Discord Bot Commands
- **Action**: Go to your Discord server and type **`!status`**.
- **Key point**: Show the conversational rephrasing returned by the bot. Mention that the numbers correspond exactly to the dashboard metrics.
- **Action**: Type **`!room work2`** and **`!usage`**.
- **Key point**: Show how the bot breaks down active loads and lists which devices are ON or OFF in Work Room 2.

### Step 6: Proactive Alerts Dispatch
- **Action**: Show the Discord channel feed history where the bot's background watcher automatically posted an embed warning card.
- **Key point**: Explain that the bot checks `/api/alerts` every 20 seconds and notifies the team channel of new alerts without spamming duplicates.

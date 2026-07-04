# WattWatch - Hackathon Presentation & Demo Script

A detailed 3-minute presentation script designed to showcase the WattWatch system features to hackathon judges.

---

## ⏱️ Timeline & Script

### Part 1: The Pitch & Context (0:00 - 0:40)
- **Visual Action**: Display slide 1 (Project title: WattWatch) and point to the team.
- **Presenter Speech**:
  > *"Hello judges! Welcome to **WattWatch**. In modern office environments, electrical appliances like fans and lights are frequently left running in unoccupied rooms, leading to substantial energy waste. 
  > 
  > Our solution, WattWatch, provides real-time office energy monitoring. The office setup contains exactly **3 rooms**—Drawing Room, Work Room 1, Work Room 2—with exactly **15 simulated devices** in total (each room has 2 fans and 3 lights). Let's see how it works in real-time."*

---

### Part 2: Web Dashboard & Simulation (0:40 - 1:20)
- **Visual Action**: Switch screen to the active Web Dashboard at `http://localhost:5173`. Scroll down to display the top-down floor layout and point to rotating fans and glowing lights.
- **Presenter Speech**:
  > *"Here is our React + Vite web dashboard. Our UI features custom animations like rotating fan blades and glowing bulbs showing active loads. 
  > 
  > Watch the **Power Summary** aggregate cards: they track total live load in Watts and accumulated energy usage in kWh. Telemetry syncs live via **Socket.IO** streams. Let's toggle a light in the Drawing Room to 'OFF'. Notice that the live load immediately drops and recalculates."*

---

### Part 3: Time Overrides & Warnings (1:20 - 2:00)
- **Visual Action**: In the dashboard header, toggle **DEMO TIME ON** and change the hour dropdown to **10:00 PM** (after-hours).
- **Presenter Speech**:
  > *"WattWatch has a built-in rule engine evaluating anomalies. To demo after-hours alerts, we toggle our custom **Demo Time** control in the header to 10:00 PM. 
  > 
  > Instantly, the dashboard catches the violations, displaying warnings in the feed. Work Room 2 highlights with a red pulsing border because its devices are active outside office hours."*

---

### Part 4: Discord Bot & Gemini Integration (2:00 - 2:40)
- **Visual Action**: Switch screen to the Discord channel. Send the command `!status` and show the formatted reply.
- **Presenter Speech**:
  > *"WattWatch also extends directly to Discord, keeping office admins connected. Sending the `!status` command retrieves the current backend snapshot. 
  > 
  > The bot integrates Google's **Gemini API** to rewrite raw stats into friendly, natural messages. It strictly adheres to backend numbers, keeping data accurate but readable. If Gemini is unavailable, it falls back to Markdown templates."*

---

### Part 5: Proactive Alerts & Wrap Up (2:40 - 3:00)
- **Visual Action**: Point to the color-coded proactive alert embed card pushed to the `#energy-alerts` channel.
- **Presenter Speech**:
  > *"Our background alert watcher polls the API every 20 seconds. Here, you see it posted a warning alert automatically without team members needing to ask. 
  > 
  > In the future, we plan to extend WattWatch with physical smart relays, MQTT brokers, and cloud analytical databases. Thank you!"*

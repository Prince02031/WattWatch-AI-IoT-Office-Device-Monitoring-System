# WattWatch Local Testing Checklist

Follow these 10 steps to verify that the backend, dashboard, and Discord bot integrations are working locally and are ready for deployment.

- [ ] **1. Start backend**
  - Navigate to `/backend` and run `npm run dev`.
  - Confirm the terminal prints successful connection on port `5000`.

- [ ] **2. Open /api/snapshot**
  - In a browser or via curl, navigate to `http://localhost:5000/api/snapshot`.
  - Confirm that the response JSON loads successfully.

- [ ] **3. Start dashboard**
  - Navigate to `/dashboard` and run `npm run dev`.
  - Open `http://localhost:5173` in your browser.

- [ ] **4. Confirm 15 devices**
  - Look at the **Power Summary** card at the top.
  - Verify that the device ratio reads **Devices ON / 15** (exactly 15 total devices).

- [ ] **5. Confirm live updates**
  - Observe the fans rotating and lights glowing in the **Office Layout**.
  - Wait a few seconds to verify the random simulator triggers (a status toggles automatically every 5 seconds).

- [ ] **6. Toggle a device**
  - In the device list or layout panel, click the status toggle switch for any device.
  - Confirm the state updates instantly on the screen and changes the total live wattage.

- [ ] **7. Force alerts**
  - Scroll down to **Demo Controls** and click **Force Active Alerts**.
  - Confirm that Work Room 2 devices turn ON, the room boundary pulses red, and new alerts appear in the alerts feed.

- [ ] **8. Start Discord bot**
  - Navigate to `/discord-bot` and run `npm start`.
  - Verify the terminal logs: `WattWatch Discord Bot Online & Authenticated`.

- [ ] **9. Test Bot Commands**
  - Send the following prefix commands in your configured Discord channel:
    - [ ] `!status` - Verify room summary counts.
    - [ ] `!room work2` - Verify Work Room 2 devices and alerts.
    - [ ] `!usage` - Verify total live load and consumption.
    - [ ] `!alerts` - Verify active alert listings.

- [ ] **10. Record demo**
  - Perform a run-through of the dashboard overrides and bot commands to capture a working presentation recording.

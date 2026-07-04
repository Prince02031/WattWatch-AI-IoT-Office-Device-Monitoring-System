# WattWatch - Hackathon Demo Script

This document outlines the walkthrough flow for the judges during the presentation.

## Pitch (1 Minute)
- Introduce **WattWatch**: A smart office energy monitoring system designed to optimize energy efficiency.
- Detail the office scale: 3 rooms, exactly 15 devices (each room has 2 fans, 3 lights).
- Address the core problem: Offices waste power on appliances left on in unoccupied zones.

## Demonstration Steps (3 Minutes)
1. **Interactive Dashboard**:
   - Open Web Dashboard on Vercel.
   - Show live synced connection (green status indicator).
   - Display active load summary cards.
2. **Device State Control**:
   - Navigate to Drawing Room.
   - Toggle a Light off and watch the global active power load recalculate in real time.
3. **Anomalies & Alert Notifications**:
   - Trigger a simulated device fault using the Demo Controls panel.
   - Show the red critical alert appearing instantly on the dashboard alerts feed.
   - Open Discord and verify that the Discord Bot has posted the real-time warning channel alert.
4. **Natural Language Queries**:
   - Show a Discord chat query requesting Gemini-powered energy footprint statistics.
   - Display the conversational summary of the office power state.

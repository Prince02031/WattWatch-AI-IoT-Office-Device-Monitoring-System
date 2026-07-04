# System Diagrams and Architecture

This directory is reserved for architecture diagrams, system topologies, and data flow models.

## Architectural Overview
1. **IoT Node (ESP32 Wokwi)**: Simulates sensor readings (current, voltage) and switches states. Relays telemetry to the backend server.
2. **Backend Server (Render / Node.js & Express)**:
   - Maintains an in-memory device state store for the 15 registered devices.
   - Calculates energy footprints and monthly cost estimations.
   - Triggers anomalies and exposes WebSocket connections for live dashboards.
3. **Web Dashboard (Vercel / React)**:
   - Renders active power loads, live status grids, and detailed toggle states.
   - Triggers mock faults for demonstration purposes.
4. **Discord Bot (Node.js)**:
   - Polls backend alerts and broadcasts notifications.
   - Integrates with Gemini API to deliver conversational energy footprints to users on demand.

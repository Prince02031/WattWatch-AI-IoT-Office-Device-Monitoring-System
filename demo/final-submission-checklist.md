# WattWatch Final Submission Checklist

Use this checklist to verify all aspects of the WattWatch project before submitting.

---

## 🏢 Core System Constraints
- [x] **Room Count**: Exactly **3 rooms** (`drawing`, `work1`, `work2`).
- [x] **Device Count**: Exactly **15 devices** in total (each room has exactly 2 fans and 3 lights; 5 devices per room).
- [x] **Single Source of Truth**: Backend memory store governs all device statuses, usage metrics, and rules evaluations.
- [x] **Zero Persistent Layers**: No databases or authentication modules are present, keeping the demo stack lightweight.
- [x] **Mermaid Check**: No Mermaid code blocks are used in any workspace files.
- [x] **18 Devices / OfficePulse references**: Removed entirely. All documentation matches the "WattWatch" workspace.

---

## ⚙️ Monorepo Integrity
- [x] **Backend Server (`/backend`)**:
  - Starts using `npm run dev` (local development) and `npm start` (production).
  - Listens dynamically to `process.env.PORT`.
  - CORS policies accept client links defined by `CLIENT_URL`.
  - Snapshot endpoint (`GET /api/snapshot`) correctly returns 15 devices.
- [x] **Web Dashboard (`/dashboard`)**:
  - Connects to `VITE_BACKEND_URL` for API and WebSockets.
  - Compiles successfully via `npm run build`.
  - Active Socket.IO connection updates visual fans, light glows, and room alerts in real-time.
- [x] **Discord Bot (`/discord-bot`)**:
  - Connects to backend endpoints using `BACKEND_URL`.
  - Leverages Gemini API for conversational style with deterministic text template fallbacks.
  - Active alert polling loop runs every 20 seconds without spamming duplicate alerts.

---

## 🔗 Submission Link Registry
Make sure to fill in these URLs in your submission form:

- **GitHub Repository**: `https://github.com/Prince02031/WattWatch-AI-IoT-Office-Device-Monitoring-System.git`
- **Dashboard Deployment (Vercel)**: `<paste your Vercel deployment link here>`
- **Backend Deployment (Render/Railway)**: `<paste your backend deployment link here>`
- **Wokwi Project Link**: `<paste your Wokwi room simulation link here>`
- **Demo Video Link**: `<paste your Loom/YouTube presentation link here>`
- **Diagram Assets**:
  - System Architecture Draw.io XML: Located at `diagrams/system-architecture.drawio`
  - Data Flow Draw.io XML: Located at `diagrams/data-flow.drawio`
- **Product Documentation**: Root `README.md`

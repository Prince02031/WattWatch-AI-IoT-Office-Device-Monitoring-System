# Wokwi representative Room Circuit Design

The Wokwi simulation represents one room of WattWatch. Each room has the same structure: 2 fans and 3 lights. Therefore, this one-room circuit can be repeated three times to represent the complete office setup of 15 devices.

## 🛠️ Hardware Prototyping
- **Microcontroller**: ESP32 DevKit v1
- **Inputs**: 5 Slide Switches representing virtual device state toggles:
  - Switch 1: Fan 1
  - Switch 2: Fan 2
  - Switch 3: Light 1
  - Switch 4: Light 2
  - Switch 5: Light 3
- **Outputs**: 5 LEDs signaling device ON/OFF load activation (visualizing status).
- **Behavior**: The ESP32 monitors switch inputs and updates indicators. In a physical production environment, these LEDs correspond to smart relay outputs (e.g., solid-state relays or current sensors) controlling actual fans and lights.

---

## 🔗 Project Assets
- **Wokwi Project Link**: <paste your Wokwi link here>
- **Circuit Schematic**: Refer to `circuit/schematic-screenshot.png` below.

![Circuit Diagram Screenshot](/circuit/schematic-screenshot.png)

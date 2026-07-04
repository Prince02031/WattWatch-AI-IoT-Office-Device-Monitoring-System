/**
 * Seed data for WattWatch devices.
 * Rule: exactly 15 devices across 3 rooms.
 * - Drawing Room (roomId: drawing): 2 fans (60W), 3 lights (15W)
 * - Work Room 1 (roomId: work1): 2 fans (60W), 3 lights (15W)
 * - Work Room 2 (roomId: work2): 2 fans (60W), 3 lights (15W)
 */

const createInitialDevices = () => {
  const now = new Date().toISOString();
  
  return [
    // --- Drawing Room (drawing) ---
    {
      id: "drawing-fan-1",
      name: "Drawing Room Fan 1",
      type: "fan",
      roomId: "drawing",
      roomName: "Drawing Room",
      status: "on", // Initially ON for demo interest
      wattage: 60,
      currentPower: 60,
      lastChanged: now,
      onSince: now
    },
    {
      id: "drawing-fan-2",
      name: "Drawing Room Fan 2",
      type: "fan",
      roomId: "drawing",
      roomName: "Drawing Room",
      status: "off",
      wattage: 60,
      currentPower: 0,
      lastChanged: now,
      onSince: null
    },
    {
      id: "drawing-light-1",
      name: "Drawing Room Light 1",
      type: "light",
      roomId: "drawing",
      roomName: "Drawing Room",
      status: "on", // Initially ON for demo interest
      wattage: 15,
      currentPower: 15,
      lastChanged: now,
      onSince: now
    },
    {
      id: "drawing-light-2",
      name: "Drawing Room Light 2",
      type: "light",
      roomId: "drawing",
      roomName: "Drawing Room",
      status: "off",
      wattage: 15,
      currentPower: 0,
      lastChanged: now,
      onSince: null
    },
    {
      id: "drawing-light-3",
      name: "Drawing Room Light 3",
      type: "light",
      roomId: "drawing",
      roomName: "Drawing Room",
      status: "off",
      wattage: 15,
      currentPower: 0,
      lastChanged: now,
      onSince: null
    },

    // --- Work Room 1 (work1) ---
    {
      id: "work1-fan-1",
      name: "Work Room 1 Fan 1",
      type: "fan",
      roomId: "work1",
      roomName: "Work Room 1",
      status: "off",
      wattage: 60,
      currentPower: 0,
      lastChanged: now,
      onSince: null
    },
    {
      id: "work1-fan-2",
      name: "Work Room 1 Fan 2",
      type: "fan",
      roomId: "work1",
      roomName: "Work Room 1",
      status: "on", // Initially ON
      wattage: 60,
      currentPower: 60,
      lastChanged: now,
      onSince: now
    },
    {
      id: "work1-light-1",
      name: "Work Room 1 Light 1",
      type: "light",
      roomId: "work1",
      roomName: "Work Room 1",
      status: "on", // Initially ON
      wattage: 15,
      currentPower: 15,
      lastChanged: now,
      onSince: now
    },
    {
      id: "work1-light-2",
      name: "Work Room 1 Light 2",
      type: "light",
      roomId: "work1",
      roomName: "Work Room 1",
      status: "off",
      wattage: 15,
      currentPower: 0,
      lastChanged: now,
      onSince: null
    },
    {
      id: "work1-light-3",
      name: "Work Room 1 Light 3",
      type: "light",
      roomId: "work1",
      roomName: "Work Room 1",
      status: "off",
      wattage: 15,
      currentPower: 0,
      lastChanged: now,
      onSince: null
    },

    // --- Work Room 2 (work2) ---
    {
      id: "work2-fan-1",
      name: "Work Room 2 Fan 1",
      type: "fan",
      roomId: "work2",
      roomName: "Work Room 2",
      status: "off",
      wattage: 60,
      currentPower: 0,
      lastChanged: now,
      onSince: null
    },
    {
      id: "work2-fan-2",
      name: "Work Room 2 Fan 2",
      type: "fan",
      roomId: "work2",
      roomName: "Work Room 2",
      status: "off",
      wattage: 60,
      currentPower: 0,
      lastChanged: now,
      onSince: null
    },
    {
      id: "work2-light-1",
      name: "Work Room 2 Light 1",
      type: "light",
      roomId: "work2",
      roomName: "Work Room 2",
      status: "off",
      wattage: 15,
      currentPower: 0,
      lastChanged: now,
      onSince: null
    },
    {
      id: "work2-light-2",
      name: "Work Room 2 Light 2",
      type: "light",
      roomId: "work2",
      roomName: "Work Room 2",
      status: "off",
      wattage: 15,
      currentPower: 0,
      lastChanged: now,
      onSince: null
    },
    {
      id: "work2-light-3",
      name: "Work Room 2 Light 3",
      type: "light",
      roomId: "work2",
      roomName: "Work Room 2",
      status: "off",
      wattage: 15,
      currentPower: 0,
      lastChanged: now,
      onSince: null
    }
  ];
};

export const seedDevices = createInitialDevices();
export const getSeedDevices = () => createInitialDevices();

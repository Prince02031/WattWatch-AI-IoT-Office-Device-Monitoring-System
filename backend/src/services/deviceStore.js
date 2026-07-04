import { getSeedDevices } from '../data/seedDevices.js';

// In-memory array copy
let devices = getSeedDevices();

export const deviceStore = {
  // GET all devices
  getAll: () => {
    return devices;
  },

  // GET device by ID
  getById: (id) => {
    return devices.find(d => d.id === id);
  },

  // GET devices by room ID
  getByRoomId: (roomId) => {
    return devices.filter(d => d.roomId === roomId);
  },

  // Mutate device status ('on' or 'off')
  toggleStatus: (id, status) => {
    const device = devices.find(d => d.id === id);
    if (!device) return null;

    const now = new Date().toISOString();
    device.status = status;
    device.lastChanged = now;

    if (status === 'on') {
      device.currentPower = device.wattage;
      // Only set onSince if it wasn't already ON
      if (!device.onSince) {
        device.onSince = now;
      }
    } else {
      device.currentPower = 0;
      device.onSince = null;
    }

    return device;
  },

  // Force all devices in a room ON (with specific onSince timestamp for alerts simulation)
  forceRoomOn: (roomId, onSinceTime) => {
    const now = new Date().toISOString();
    devices = devices.map(d => {
      if (d.roomId === roomId) {
        return {
          ...d,
          status: 'on',
          currentPower: d.wattage,
          lastChanged: now,
          onSince: onSinceTime || now
        };
      }
      return d;
    });
  },

  // Reset to initial seed state
  reset: () => {
    devices = getSeedDevices();
    return devices;
  }
};

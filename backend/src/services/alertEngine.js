import { deviceStore } from './deviceStore.js';
import { usageCalculator } from './usageCalculator.js';
import { config } from '../config.js';

let activeAlertsMap = new Map();
let simulatedHour = config.demoMode ? 22 : null;

// Helper to determine if it is currently outside office hours
const isAfterHours = () => {
  const hour = simulatedHour !== null ? simulatedHour : new Date().getHours();
  return hour < 9 || hour >= 17;
};

export const alertEngine = {
  // Evaluates system state and returns updated active alerts and any newly triggered alerts
  evaluateAlerts: () => {
    const devices = deviceStore.getAll();
    const totalPowerW = usageCalculator.getTotalPower();
    const currentAlertsMap = new Map();
    const newlyTriggered = [];
    const now = new Date().toISOString();

    // Rule 1: Device ON after office hours (9 AM - 5 PM)
    if (isAfterHours()) {
      devices.forEach(device => {
        if (device.status === 'on') {
          const alertId = `after-hours-${device.id}`;
          const message = `${device.name} is ON after office hours (9 AM - 5 PM).`;
          
          currentAlertsMap.set(alertId, {
            id: alertId,
            type: 'after-hours',
            severity: 'warning',
            message,
            roomId: device.roomId,
            roomName: device.roomName,
            deviceId: device.id,
            deviceName: device.name,
            timestamp: activeAlertsMap.has(alertId) ? activeAlertsMap.get(alertId).timestamp : now
          });
        }
      });
    }

    // Rule 2: Room fully active (all 5 devices in one room are ON)
    const roomIds = ['drawing', 'work1', 'work2'];
    const roomNames = {
      drawing: 'Drawing Room',
      work1: 'Work Room 1',
      work2: 'Work Room 2'
    };

    roomIds.forEach(roomId => {
      const roomDevices = deviceStore.getByRoomId(roomId);
      const allOn = roomDevices.every(d => d.status === 'on');
      
      if (allOn) {
        const alertId = `room-fully-active-${roomId}`;
        const message = `All 5 devices in ${roomNames[roomId]} are ON.`;

        currentAlertsMap.set(alertId, {
          id: alertId,
          type: 'room-fully-active',
          severity: 'warning',
          message,
          roomId,
          roomName: roomNames[roomId],
          timestamp: activeAlertsMap.has(alertId) ? activeAlertsMap.get(alertId).timestamp : now
        });
      }
    });

    // Rule 3: High power usage (totalPowerW >= 400W)
    if (totalPowerW >= 400) {
      const alertId = 'high-power-usage';
      const message = `High power usage detected: ${totalPowerW}W (threshold: 400W).`;

      currentAlertsMap.set(alertId, {
        id: alertId,
        type: 'high-power',
        severity: 'critical',
        message,
        timestamp: activeAlertsMap.has(alertId) ? activeAlertsMap.get(alertId).timestamp : now
      });
    }

    // Identify newly triggered alerts
    for (const [id, alert] of currentAlertsMap.entries()) {
      if (!activeAlertsMap.has(id)) {
        newlyTriggered.push(alert);
      }
    }

    // Update the in-memory map of active alerts
    activeAlertsMap = currentAlertsMap;

    return {
      activeAlerts: Array.from(activeAlertsMap.values()),
      newlyTriggered
    };
  },

  // GET currently active alerts
  getActiveAlerts: () => {
    return Array.from(activeAlertsMap.values());
  },

  // GET simulated hour
  getSimulatedHour: () => {
    return simulatedHour;
  },

  // SET simulated hour
  setSimulatedHour: (hour) => {
    simulatedHour = hour;
  },

  // Reset/Clear alerts
  reset: () => {
    activeAlertsMap.clear();
    simulatedHour = config.demoMode ? 22 : null;
  }
};

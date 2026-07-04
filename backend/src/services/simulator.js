import { deviceStore } from './deviceStore.js';
import { usageCalculator } from './usageCalculator.js';
import { alertEngine } from './alertEngine.js';

let intervalId = null;
let tickCount = 0;

export const simulator = {
  start: (io) => {
    if (intervalId) return;

    console.log('WattWatch Simulator: Starting 1-second energy accumulation & 5-second random toggle loops.');

    intervalId = setInterval(() => {
      tickCount++;

      // 1. Accumulate energy every 1 second
      usageCalculator.accumulateEnergy(1);

      let devicesChanged = false;

      // 2. Every 5 seconds, toggle a random device status
      if (tickCount % 5 === 0) {
        const devices = deviceStore.getAll();
        if (devices.length > 0) {
          const randomIndex = Math.floor(Math.random() * devices.length);
          const targetDevice = devices[randomIndex];
          const nextStatus = targetDevice.status === 'on' ? 'off' : 'on';
          
          deviceStore.toggleStatus(targetDevice.id, nextStatus);
          console.log(`[Simulator Event] Automatically toggled "${targetDevice.name}" to "${nextStatus}".`);
          devicesChanged = true;
        }
      }

      // 3. Evaluate alerts
      const { activeAlerts, newlyTriggered } = alertEngine.evaluateAlerts();

      // 4. Socket.IO Broadcasts
      if (io) {
        // Emit newly triggered alerts individually
        newlyTriggered.forEach(alert => {
          console.log(`[Alert Notification] Newly triggered: ${alert.message}`);
          io.emit('alert:new', alert);
        });

        // Broadcast general changes
        io.emit('usage:update', usageCalculator.getSummary());
        io.emit('alerts:update', activeAlerts);

        if (devicesChanged) {
          io.emit('devices:update', deviceStore.getAll());
          
          // Broadcast full snapshot on change
          io.emit('snapshot', {
            devices: deviceStore.getAll(),
            usage: usageCalculator.getSummary(),
            alerts: activeAlerts,
            simulatedHour: alertEngine.getSimulatedHour()
          });
        }
      }
    }, 1000);
  },

  stop: () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
      tickCount = 0;
      console.log('WattWatch Simulator: Stopped simulation loops.');
    }
  }
};

import { deviceStore } from './deviceStore.js';

let accumulatedWattSeconds = 0;

export const usageCalculator = {
  // Accumulate watt-seconds based on total power and elapsed seconds
  accumulateEnergy: (seconds = 1) => {
    const totalPower = usageCalculator.getTotalPower();
    accumulatedWattSeconds += totalPower * seconds;
  },

  // GET accumulated kWh
  getKwh: () => {
    return parseFloat((accumulatedWattSeconds / 3600000).toFixed(6));
  },

  // GET total power consumption in Watts
  getTotalPower: () => {
    return deviceStore.getAll().reduce((sum, d) => sum + d.currentPower, 0);
  },

  // GET number of currently active devices
  getDevicesOnCount: () => {
    return deviceStore.getAll().filter(d => d.status === 'on').length;
  },

  // GET overall usage metrics summary
  getSummary: () => {
    const devices = deviceStore.getAll();
    const totalPowerW = usageCalculator.getTotalPower();
    const devicesOn = usageCalculator.getDevicesOnCount();
    const totalDevices = devices.length;

    // Room-wise aggregation
    const roomsMap = {
      drawing: "Drawing Room",
      work1: "Work Room 1",
      work2: "Work Room 2"
    };

    const rooms = Object.keys(roomsMap).map(roomId => {
      const roomDevices = deviceStore.getByRoomId(roomId);
      const roomPower = roomDevices.reduce((sum, d) => sum + d.currentPower, 0);
      const roomOn = roomDevices.filter(d => d.status === 'on').length;
      return {
        roomId,
        roomName: roomsMap[roomId],
        currentPower: roomPower,
        devicesOn: roomOn,
        totalDevices: roomDevices.length
      };
    });

    return {
      totalPowerW,
      totalKwh: usageCalculator.getKwh(),
      devicesOn,
      totalDevices,
      rooms
    };
  },

  // Reset accumulated energy
  reset: () => {
    accumulatedWattSeconds = 0;
  }
};

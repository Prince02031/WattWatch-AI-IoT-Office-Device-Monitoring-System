import { apiClient } from './apiClient.js';
import { formatWithGemini } from './geminiFormatter.js';

// Helper to normalize and map room name aliases to roomId
const parseRoomId = (input) => {
  if (!input) return null;
  const clean = input.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (clean === 'drawing' || clean === 'drawingroom') {
    return 'drawing';
  }
  if (clean === 'work1' || clean === 'workroom1' || clean === 'workroomone') {
    return 'work1';
  }
  if (clean === 'work2' || clean === 'workroom2' || clean === 'workroomtwo') {
    return 'work2';
  }
  return null;
};

export const commandHandlers = {
  // 1. !help command
  handleHelp: async () => {
    return `ℹ️ **WattWatch Bot Commands Checklist**
Here are the available commands to monitor the smart office:
• \`!status\` - General energy summary of all 3 rooms.
• \`!room <name>\` - Details of a specific room (e.g. \`!room drawing\` or \`!room work room 1\`).
• \`!usage\` - Live office wattage, energy consumption (kWh), and the highest draw zone.
• \`!alerts\` - Feed of active threshold or time violation warnings.
• \`!help\` - Display this help manual.`;
  },

  // 2. !status command
  handleStatus: async () => {
    const data = await apiClient.getSnapshot();
    const { devices = [], usage = {}, alerts = [] } = data;

    // Aggregate counts for rooms
    const roomAggregates = {};
    const roomsList = usage.rooms || [];
    
    roomsList.forEach(room => {
      const roomDevices = devices.filter(d => d.roomId === room.roomId);
      const fansOn = roomDevices.filter(d => d.type === 'fan' && d.status === 'on').length;
      const lightsOn = roomDevices.filter(d => d.type === 'light' && d.status === 'on').length;
      
      roomAggregates[room.roomId] = {
        name: room.roomName,
        power: room.currentPower,
        fansOn,
        lightsOn
      };
    });

    const drawing = roomAggregates['drawing'] || { name: 'Drawing Room', power: 0, fansOn: 0, lightsOn: 0 };
    const work1 = roomAggregates['work1'] || { name: 'Work Room 1', power: 0, fansOn: 0, lightsOn: 0 };
    const work2 = roomAggregates['work2'] || { name: 'Work Room 2', power: 0, fansOn: 0, lightsOn: 0 };

    const facts = {
      totalPower: usage.totalPowerW,
      totalOn: usage.devicesOn,
      totalDevices: usage.totalDevices || 15,
      rooms: [drawing, work1, work2]
    };

    const fallbackText = `⚡ **WattWatch Office Status Summary** ⚡

🏢 **Drawing Room**:
• Fans ON: ${drawing.fansOn} | Lights ON: ${drawing.lightsOn}
• Live Load: **${drawing.power}W**

🏢 **Work Room 1**:
• Fans ON: ${work1.fansOn} | Lights ON: ${work1.lightsOn}
• Live Load: **${work1.power}W**

🏢 **Work Room 2**:
• Fans ON: ${work2.fansOn} | Lights ON: ${work2.lightsOn}
• Live Load: **${work2.power}W**

🔌 **Total Office Draw**: **${usage.totalPowerW}W**
💡 **Total Active Devices**: **${usage.devicesOn} / 15 ON**`;

    return await formatWithGemini('status', facts, fallbackText);
  },

  // 3. !room <name> command
  handleRoom: async (roomArg) => {
    const roomId = parseRoomId(roomArg);
    if (!roomId) {
      return `❌ **Room not recognized.** Available rooms are: \`drawing\`, \`work1\`, \`work2\` (aliases like "Drawing Room" or "Work Room 1" are also accepted).`;
    }

    const data = await apiClient.getSnapshot();
    const { devices = [], usage = {}, alerts = [] } = data;

    const roomDetails = usage.rooms?.find(r => r.roomId === roomId);
    if (!roomDetails) {
      return `❌ **Error**: Room details could not be found for roomId: \`${roomId}\`.`;
    }

    const roomDevices = devices.filter(d => d.roomId === roomId);
    const onDevices = roomDevices.filter(d => d.status === 'on').map(d => d.name);
    const offDevices = roomDevices.filter(d => d.status === 'off').map(d => d.name);
    const roomAlerts = alerts.filter(a => a.roomId === roomId).map(a => a.message);

    const facts = {
      roomName: roomDetails.roomName,
      roomId: roomDetails.roomId,
      currentPower: roomDetails.currentPower,
      devicesOn: roomDetails.devicesOn,
      totalDevices: roomDetails.totalDevices || 5,
      onDevices,
      offDevices,
      alerts: roomAlerts
    };

    const onListStr = onDevices.length > 0 ? onDevices.map(name => `• ${name}`).join('\n') : '• None';
    const offListStr = offDevices.length > 0 ? offDevices.map(name => `• ${name}`).join('\n') : '• None';
    const alertsListStr = roomAlerts.length > 0 
      ? roomAlerts.map(msg => `⚠️ ${msg}`).join('\n') 
      : '✅ No active warnings for this room.';

    const fallbackText = `🏢 **Room Details: ${roomDetails.roomName}**
• Live Load: **${roomDetails.currentPower}W**
• Devices status: **${roomDetails.devicesOn} / 5 ON**

🟢 **ON Devices**:
${onListStr}

🔴 **OFF Devices**:
${offListStr}

⚠️ **Active Room Alerts**:
${alertsListStr}`;

    return await formatWithGemini('room-details', facts, fallbackText);
  },

  // 4. !usage command
  handleUsage: async () => {
    const usage = await apiClient.getUsage();
    
    // Find the highest consuming room
    let maxPowerW = -1;
    let maxPowerRoomName = 'None';
    const roomsList = usage.rooms || [];
    
    roomsList.forEach(room => {
      if (room.currentPower > maxPowerW) {
        maxPowerW = room.currentPower;
        maxPowerRoomName = room.roomName;
      }
    });

    const facts = {
      totalPowerW: usage.totalPowerW,
      totalKwh: usage.totalKwh,
      devicesOn: usage.devicesOn,
      totalDevices: usage.totalDevices || 15,
      highestConsumingRoom: {
        name: maxPowerRoomName,
        power: maxPowerW
      }
    };

    const fallbackText = `📊 **WattWatch Office Usage Statistics**
• Live Load: **${usage.totalPowerW}W**
• Cumulative Energy: **${usage.totalKwh.toFixed(4)} kWh**
• Active Devices: **${usage.devicesOn} / 15 ON**
• Highest Draw Zone: **${maxPowerRoomName}** (**${maxPowerW}W**)`;

    return await formatWithGemini('usage-stats', facts, fallbackText);
  },

  // 5. !alerts command
  handleAlerts: async () => {
    const alerts = await apiClient.getAlerts();

    if (alerts.length === 0) {
      const facts = { alertsCount: 0, alerts: [] };
      const fallbackText = `✅ **All systems nominal. No active alerts on WattWatch.**`;
      return await formatWithGemini('active-alerts', facts, fallbackText);
    }

    const facts = {
      alertsCount: alerts.length,
      alerts: alerts.map(a => ({ severity: a.severity, message: a.message }))
    };

    const alertsListStr = alerts.map(a => {
      const emoji = a.severity === 'critical' ? '🚨' : '⚠️';
      return `${emoji} **[${a.severity.toUpperCase()}]** ${a.message}`;
    }).join('\n');

    const fallbackText = `🚨 **WattWatch Active Alert Feed (${alerts.length})** 🚨
${alertsListStr}`;

    return await formatWithGemini('active-alerts', facts, fallbackText);
  }
};

const getBackendUrl = () => {
  // Use VITE_BACKEND_URL if provided, otherwise default to http://localhost:5000
  const url = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

const BACKEND_URL = getBackendUrl();
const API_URL = `${BACKEND_URL}/api`;

export const api = {
  getBackendUrl,
  
  // GET health
  getHealth: async () => {
    const res = await fetch(`${API_URL}/health`);
    if (!res.ok) throw new Error('Failed to fetch health');
    return res.json();
  },

  // GET snapshot (devices, usage, alerts combined)
  getSnapshot: async () => {
    const res = await fetch(`${API_URL}/snapshot`);
    if (!res.ok) throw new Error('Failed to fetch snapshot');
    return res.json();
  },

  // GET devices
  getDevices: async () => {
    const res = await fetch(`${API_URL}/devices`);
    if (!res.ok) throw new Error('Failed to fetch devices');
    return res.json();
  },

  // GET rooms
  getRooms: async () => {
    const res = await fetch(`${API_URL}/rooms`);
    if (!res.ok) throw new Error('Failed to fetch rooms');
    return res.json();
  },

  // GET usage
  getUsage: async () => {
    const res = await fetch(`${API_URL}/usage`);
    if (!res.ok) throw new Error('Failed to fetch usage');
    return res.json();
  },

  // GET alerts
  getAlerts: async () => {
    const res = await fetch(`${API_URL}/alerts`);
    if (!res.ok) throw new Error('Failed to fetch alerts');
    return res.json();
  },

  // POST toggle status (on/off)
  toggleDevice: async (id, status) => {
    const res = await fetch(`${API_URL}/devices/${id}/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to toggle device');
    return res.json();
  },

  // POST force alerts
  forceAlerts: async () => {
    const res = await fetch(`${API_URL}/demo/force-alerts`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to force alerts');
    return res.json();
  },

  // POST set simulated time
  setSimulatedTime: async (hour) => {
    const res = await fetch(`${API_URL}/demo/time`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hour }),
    });
    if (!res.ok) throw new Error('Failed to set simulated time');
    return res.json();
  },

  // POST reset demo
  resetDemo: async () => {
    const res = await fetch(`${API_URL}/demo/reset`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to reset demo');
    return res.json();
  }
};

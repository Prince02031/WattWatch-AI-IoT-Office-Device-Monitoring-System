import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const getBackendUrl = () => {
  const url = process.env.BACKEND_URL || 'http://localhost:5000';
  return url.endsWith('/') ? url.slice(0, -1) : url;
};

const BACKEND_URL = getBackendUrl();
const API_URL = `${BACKEND_URL}/api`;

export const apiClient = {
  getBackendUrl,

  // GET snapshot
  getSnapshot: async () => {
    try {
      const res = await fetch(`${API_URL}/snapshot`);
      if (!res.ok) throw new Error(`Snapshot fetch returned status ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error('[API Client Error] Failed to get snapshot:', err.message);
      throw new Error(`Could not contact the WattWatch server. Ensure it is running at ${BACKEND_URL}.`);
    }
  },

  // GET usage
  getUsage: async () => {
    try {
      const res = await fetch(`${API_URL}/usage`);
      if (!res.ok) throw new Error(`Usage fetch returned status ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error('[API Client Error] Failed to get usage:', err.message);
      throw new Error(`Could not contact the WattWatch server. Ensure it is running at ${BACKEND_URL}.`);
    }
  },

  // GET alerts
  getAlerts: async () => {
    try {
      const res = await fetch(`${API_URL}/alerts`);
      if (!res.ok) throw new Error(`Alerts fetch returned status ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error('[API Client Error] Failed to get alerts:', err.message);
      throw new Error(`Could not contact the WattWatch server. Ensure it is running at ${BACKEND_URL}.`);
    }
  }
};

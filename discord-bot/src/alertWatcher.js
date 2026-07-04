import { apiClient } from './apiClient.js';
import dotenv from 'dotenv';

dotenv.config();

const POLL_INTERVAL = 20000; // 20 seconds
const postedAlertIds = new Set();

export const alertWatcher = {
  start: (client) => {
    const channelId = process.env.DISCORD_CHANNEL_ID;
    if (!channelId) {
      console.log('[Alert Watcher] DISCORD_CHANNEL_ID is not configured. Proactive alerts disabled.');
      return;
    }

    console.log(`[Alert Watcher] Starting alert loop. Polling every 20 seconds targeting Channel ID: ${channelId}`);

    setInterval(async () => {
      try {
        const alerts = await apiClient.getAlerts();
        const activeIds = new Set(alerts.map(a => a.id));

        // 1. Garbage collect posted IDs that are no longer active (so they can trigger again if re-occurring)
        for (const id of postedAlertIds) {
          if (!activeIds.has(id)) {
            postedAlertIds.delete(id);
          }
        }

        // 2. Scan and post new, unseen alerts
        for (const alert of alerts) {
          if (!postedAlertIds.has(alert.id)) {
            postedAlertIds.add(alert.id);
            await announceAlert(client, channelId, alert);
          }
        }
      } catch (err) {
        console.warn('[Alert Watcher Error] Failed to poll/dispatch active alerts:', err.message);
      }
    }, POLL_INTERVAL);
  }
};

// Dispatch message to targeted Discord text channel
async function announceAlert(client, channelId, alert) {
  try {
    const channel = await client.channels.fetch(channelId);
    if (!channel || !channel.isTextBased()) {
      console.error(`[Alert Watcher] Target Channel ${channelId} is not a valid text-based channel.`);
      return;
    }

    const emoji = alert.severity === 'critical' ? '🚨' : '⚠️';
    const severityLabel = alert.severity.toUpperCase();

    const embed = {
      color: alert.severity === 'critical' ? 0xef4444 : 0xf59e0b, // Red or Amber hex values
      title: `${emoji} NEW WATTWATCH ALERT: ${severityLabel}`,
      description: alert.message,
      fields: [
        { name: 'Room Zone', value: alert.roomName || 'General Office', inline: true },
        { name: 'Device Info', value: alert.deviceName || 'N/A', inline: true }
      ],
      timestamp: alert.timestamp || new Date().toISOString(),
      footer: {
        text: 'WattWatch Energy Watchdog'
      }
    };

    await channel.send({ embeds: [embed] });
    console.log(`[Alert Watcher] Dispatched alert notification to Discord channel: "${alert.message}"`);
  } catch (err) {
    console.error(`[Alert Watcher] Failed to post message to channel ${channelId}:`, err.message);
  }
}

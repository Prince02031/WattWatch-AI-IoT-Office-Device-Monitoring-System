import express from 'express';
import { deviceStore } from '../services/deviceStore.js';
import { usageCalculator } from '../services/usageCalculator.js';
import { alertEngine } from '../services/alertEngine.js';

const router = express.Router();

// POST force-alerts (Turn Work Room 2 devices ON, onSince = >2 hours ago)
router.post('/force-alerts', (req, res) => {
  console.log('[Demo API] Triggered force-alerts. Forcing Work Room 2 ON.');
  
  // Calculate more than 2 hours ago
  const moreThanTwoHoursAgo = new Date(Date.now() - (2 * 60 * 60 * 1000 + 10 * 60 * 1000)).toISOString(); // 2 hours 10 minutes ago
  
  deviceStore.forceRoomOn('work2', moreThanTwoHoursAgo);

  // Evaluate alerts and broadcast changes immediately
  const io = req.app.get('io');
  const { activeAlerts, newlyTriggered } = alertEngine.evaluateAlerts();

  if (io) {
    newlyTriggered.forEach(alert => {
      io.emit('alert:new', alert);
    });

    io.emit('devices:update', deviceStore.getAll());
    io.emit('usage:update', usageCalculator.getSummary());
    io.emit('alerts:update', activeAlerts);
    
    io.emit('snapshot', {
      devices: deviceStore.getAll(),
      usage: usageCalculator.getSummary(),
      alerts: activeAlerts
    });
  }

  res.json({
    message: 'Work Room 2 forced ON. Alerts triggered.',
    devices: deviceStore.getByRoomId('work2'),
    activeAlerts
  });
});

// POST time (Set simulated hour or reset to null for system time)
router.post('/time', (req, res) => {
  const { hour } = req.body; // expected: number 0-23 or null

  if (hour !== null && (typeof hour !== 'number' || hour < 0 || hour > 23)) {
    return res.status(400).json({ error: 'Hour must be a number between 0 and 23, or null' });
  }

  console.log(`[Demo API] Simulated time hour set to: ${hour === null ? 'Real System Time' : `${hour}:00`}`);
  alertEngine.setSimulatedHour(hour);

  const io = req.app.get('io');
  const { activeAlerts, newlyTriggered } = alertEngine.evaluateAlerts();

  if (io) {
    newlyTriggered.forEach(alert => {
      io.emit('alert:new', alert);
    });

    io.emit('alerts:update', activeAlerts);
    
    io.emit('snapshot', {
      devices: deviceStore.getAll(),
      usage: usageCalculator.getSummary(),
      alerts: activeAlerts,
      simulatedHour: alertEngine.getSimulatedHour()
    });
  }

  res.json({
    message: `Simulated time hour set to ${hour}`,
    simulatedHour: alertEngine.getSimulatedHour(),
    activeAlerts
  });
});

// POST reset (Reset devices, energy, and alerts)
router.post('/reset', (req, res) => {
  console.log('[Demo API] Resetting simulation to baseline.');

  deviceStore.reset();
  usageCalculator.reset();
  alertEngine.reset();

  const io = req.app.get('io');
  const { activeAlerts, newlyTriggered } = alertEngine.evaluateAlerts();

  if (io) {
    newlyTriggered.forEach(alert => {
      io.emit('alert:new', alert);
    });

    io.emit('devices:update', deviceStore.getAll());
    io.emit('usage:update', usageCalculator.getSummary());
    io.emit('alerts:update', activeAlerts);
    
    io.emit('snapshot', {
      devices: deviceStore.getAll(),
      usage: usageCalculator.getSummary(),
      alerts: activeAlerts,
      simulatedHour: alertEngine.getSimulatedHour()
    });
  }

  res.json({
    message: 'Simulation reset successfully.',
    devices: deviceStore.getAll(),
    usage: usageCalculator.getSummary(),
    activeAlerts,
    simulatedHour: alertEngine.getSimulatedHour()
  });
});

export default router;

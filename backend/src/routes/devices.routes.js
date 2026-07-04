import express from 'express';
import { deviceStore } from '../services/deviceStore.js';
import { usageCalculator } from '../services/usageCalculator.js';
import { alertEngine } from '../services/alertEngine.js';

const router = express.Router();

// GET all devices
router.get('/', (req, res) => {
  res.json(deviceStore.getAll());
});

// POST toggle status (on/off)
router.post('/:id/toggle', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !['on', 'off'].includes(status)) {
    return res.status(400).json({ error: 'Status is required and must be "on" or "off"' });
  }

  const device = deviceStore.getById(id);
  if (!device) {
    return res.status(404).json({ error: `Device with ID "${id}" not found` });
  }

  const updatedDevice = deviceStore.toggleStatus(id, status);
  console.log(`[API Event] Manually toggled device "${updatedDevice.name}" to "${status}".`);

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

  res.json(updatedDevice);
});

export default router;

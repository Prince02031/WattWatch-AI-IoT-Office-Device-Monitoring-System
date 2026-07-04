import express from 'express';
import { deviceStore } from '../services/deviceStore.js';
import { usageCalculator } from '../services/usageCalculator.js';
import { alertEngine } from '../services/alertEngine.js';

const router = express.Router();

// GET full snapshot of devices, usage metrics, and active alerts
router.get('/', (req, res) => {
  res.json({
    devices: deviceStore.getAll(),
    usage: usageCalculator.getSummary(),
    alerts: alertEngine.getActiveAlerts(),
    simulatedHour: alertEngine.getSimulatedHour()
  });
});

export default router;

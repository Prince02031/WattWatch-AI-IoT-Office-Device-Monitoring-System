import express from 'express';
import { usageCalculator } from '../services/usageCalculator.js';

const router = express.Router();

// GET usage summary (total power, energy, counts)
router.get('/', (req, res) => {
  const summary = usageCalculator.getSummary();
  
  // Return total level metrics
  res.json({
    totalPowerW: summary.totalPowerW,
    totalKwh: summary.totalKwh,
    devicesOn: summary.devicesOn,
    totalDevices: summary.totalDevices
  });
});

export default router;

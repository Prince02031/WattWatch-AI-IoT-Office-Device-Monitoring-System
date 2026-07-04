import express from 'express';
import { usageCalculator } from '../services/usageCalculator.js';

const router = express.Router();

// GET room-wise power usage and statuses
router.get('/', (req, res) => {
  const summary = usageCalculator.getSummary();
  res.json(summary.rooms);
});

export default router;

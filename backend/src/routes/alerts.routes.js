import express from 'express';
import { alertEngine } from '../services/alertEngine.js';

const router = express.Router();

// GET active alerts
router.get('/', (req, res) => {
  res.json(alertEngine.getActiveAlerts());
});

export default router;

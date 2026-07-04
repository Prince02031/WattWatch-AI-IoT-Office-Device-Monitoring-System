import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { config } from './config.js';
import { simulator } from './services/simulator.js';
import { deviceStore } from './services/deviceStore.js';
import { usageCalculator } from './services/usageCalculator.js';
import { alertEngine } from './services/alertEngine.js';

// Route imports
import devicesRouter from './routes/devices.routes.js';
import roomsRouter from './routes/rooms.routes.js';
import usageRouter from './routes/usage.routes.js';
import alertsRouter from './routes/alerts.routes.js';
import demoRouter from './routes/demo.routes.js';
import snapshotRouter from './routes/snapshot.routes.js';

const app = express();
const httpServer = createServer(app);

// Configure CORS
const allowedOrigins = [
  'http://localhost:5173', // Vite default port
  'http://localhost:3000', // Alternative dev port
  config.clientUrl
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || config.nodeEnv === 'development') {
      return callback(null, true);
    }
    return callback(new Error('CORS Policy: Origin not allowed'), false);
  },
  credentials: true
}));

// Express parser middleware
app.use(express.json());

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Set io instance globally on the express app for routing hooks
app.set('io', io);

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Register API Routers
app.use('/api/devices', devicesRouter);
app.use('/api/rooms', roomsRouter);
app.use('/api/usage', usageRouter);
app.use('/api/alerts', alertsRouter);
app.use('/api/demo', demoRouter);
app.use('/api/snapshot', snapshotRouter);

// Socket connection handler
io.on('connection', (socket) => {
  console.log(`[Socket] Client connected: ${socket.id}`);
  
  // Immediately emit snapshot on connection
  const { activeAlerts } = alertEngine.evaluateAlerts();
  socket.emit('snapshot', {
    devices: deviceStore.getAll(),
    usage: usageCalculator.getSummary(),
    alerts: activeAlerts,
    simulatedHour: alertEngine.getSimulatedHour()
  });

  socket.on('disconnect', () => {
    console.log(`[Socket] Client disconnected: ${socket.id}`);
  });
});

// Start simulator loops
simulator.start(io);

// Start HTTP Server
const PORT = config.port;
httpServer.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`WattWatch Backend Server Initialized Successfully`);
  console.log(`Port: ${PORT}`);
  console.log(`Mode: ${config.nodeEnv}`);
  console.log(`CORS Allowed Origins: ${allowedOrigins.join(', ')}`);
  console.log(`=================================================`);
});

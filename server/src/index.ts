import express from 'express';
import { PrismaClient } from '@prisma/client';
import { WebSocketServer } from 'ws';
import morgan from 'morgan';
import cors from 'cors';
import { sportRouter } from './routes/sport.route';
import envConfig from './config/env.config';
import { authRouter } from './routes/auth.route';
import { matchRouter } from './routes/macth.route';

declare global {
  var wss: WebSocketServer;
}

// Initialize Prisma Client
export const prismaClient = new PrismaClient();

// Initialize Express App
const app = express();

// Middleware
app.use(morgan(envConfig.appMode === "production" ? "combined" : "dev"));
app.use(express.json());

app.use(
  cors({
    origin: envConfig.appMode === "production"
      ? "https://ifgames.bsospace.com"
      : "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// API Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Sports API',
  });
});

app.use('/api/v1', sportRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1', matchRouter);

// WebSocket Server Setup
const wss = new WebSocketServer({ noServer: true });
global.wss = wss; // Make WebSocket server global for hooks

// Attach WebSocket server to HTTP server
const server = app.listen(envConfig.appPort, async () => {
  console.log(`[INFO] Server is running on http://localhost:${envConfig.appPort}`);
});

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// WebSocket Connection Logic
wss.on('connection', (ws) => {
  console.log('[INFO] New WebSocket connection established.');

  ws.on('message', (data) => {
    console.log('[INFO] Received WebSocket message:', data.toString());

    // Example broadcast logic
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(data.toString());
      }
    });
  });

  ws.on('close', () => {
    console.log('[INFO] WebSocket connection closed.');
  });
});

// Handle 404 Errors
app.use('*', (req, res) => {
  res.status(404).json({
    message: `Route not found for ${req.method} ${req.path}`,
  });
});

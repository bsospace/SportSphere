import express from 'express';
import { PrismaClient } from '@prisma/client';
import { WebSocketServer } from 'ws';
import morgan from 'morgan'; 
import cors from 'cors';
import { sportRouter } from './routes/sport.route';
import envConfig from './config/env.config';

// Initialize Prisma Client
export const prismaClient = new PrismaClient();


// Initialize Express App
const app = express();

// Middleware
app.use(morgan(envConfig.appMode == "production" ? "combined" : "dev"));
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use('/api/v1',sportRouter);

// WebSocket Server
const wss = new WebSocketServer({ noServer: true });

// interface WebSocketMessage {
//   type: string;
//   payload: any;
// }

// wss.on('connection', (ws: WebSocket) => {
//   console.log('New WebSocket connection established');

//   // Handle messages from clients
//   ws.on('message', (data) => {
//     const message = data.toString();
//     console.log(`Received message: ${message}`);

//     // Broadcast the message to all connected clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });

//   ws.on('close', () => {
//     console.log('WebSocket connection closed');
//   });
// });

// Attach WebSocket server to Express server
const server = app.listen(envConfig.appPort, async () => {
  console.log(`[INFO] Server is running on http://localhost:${envConfig.appPort}`);
});

// Upgrade HTTP server to handle WebSocket connections
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

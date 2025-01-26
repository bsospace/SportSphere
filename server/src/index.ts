import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import { WebSocketServer, WebSocket } from 'ws';
import morgan from 'morgan'; 
import cors from 'cors'; // Import CORS middleware
import { sportRouter } from './routes/sport.route';
import { teamRouter } from './routes/team.route';

// Initialize Prisma Client
export const prismaClient = new PrismaClient();

// Initialize Redis Client
const redisClient = createClient({
  url: `redis://default:${process.env.REDIS_PASSWORD}@localhost:${process.env.REDIS_PORT}`,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

async function connectRedis() {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
}

// Initialize Express App
const app = express();
const PORT = process.env.APP_PORT || 3000;

// Middleware
app.use(morgan('dev')); // Add Morgan for logging HTTP requests
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// API Routes
app.use('/api', sportRouter);
app.use('/api',teamRouter);

// WebSocket Server
const wss = new WebSocketServer({ noServer: true });

interface WebSocketMessage {
  type: string;
  payload: any;
}

wss.on('connection', (ws: WebSocket) => {
  console.log('New WebSocket connection established');

  // Handle messages from clients
  ws.on('message', (data) => {
    const message = data.toString();
    console.log(`Received message: ${message}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// Attach WebSocket server to Express server
const server = app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectRedis(); // Connect to Redis when the server starts
});

// Upgrade HTTP server to handle WebSocket connections
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Example route for updating scores via WebSocket
app.post('/update-score', (req: Request, res: Response) => {
  const { matchId, teamId, score } = req.body;

  // Broadcast the score update to all WebSocket clients
  const update = JSON.stringify({ matchId, teamId, score });
  wss.clients.forEach((client: any) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(update);
    }
  });

  res.status(200).json({ message: 'Score updated and broadcasted', update });
});
import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import { WebSocketServer, WebSocket } from 'ws';
import morgan from 'morgan'; 
import cors from 'cors'; // Import CORS middleware
import { sportRouter } from './routes/sport.route';

// Initialize Prisma Client
export const prismaClient = new PrismaClient();

// Initialize Redis Client
const redisClient = createClient({
  url: `redis://default:${process.env.REDIS_PASSWORD}@localhost:${process.env.REDIS_PORT}`,
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

async function connectRedis() {
  try {
    await redisClient.connect();
    console.log('Connected to Redis');
  } catch (err) {
    console.error('Failed to connect to Redis:', err);
  }
}

// Initialize Express App
const app = express();
const PORT = process.env.APP_PORT || 3000;

// Middleware
app.use(morgan('dev')); // Add Morgan for logging HTTP requests
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// API Routes
app.use('/api', sportRouter);

// WebSocket Server
const wss = new WebSocketServer({ noServer: true });

interface WebSocketMessage {
  type: string;
  payload: any;
}

wss.on('connection', (ws: WebSocket) => {
  console.log('New WebSocket connection established');

  // Handle messages from clients
  ws.on('message', (data) => {
    const message = data.toString();
    console.log(`Received message: ${message}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('WebSocket connection closed');
  });
});

// Attach WebSocket server to Express server
const server = app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectRedis(); // Connect to Redis when the server starts
});

// Upgrade HTTP server to handle WebSocket connections
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Example route for updating scores via WebSocket
app.post('/update-score', (req: Request, res: Response) => {
  const { matchId, teamId, score } = req.body;

  // Broadcast the score update to all WebSocket clients
  const update = JSON.stringify({ matchId, teamId, score });
  wss.clients.forEach((client: any) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(update);
    }
  });

  res.status(200).json({ message: 'Score updated and broadcasted', update });
});

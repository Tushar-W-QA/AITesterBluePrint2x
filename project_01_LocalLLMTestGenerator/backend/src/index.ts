import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import testCaseRoutes from './routes/testCaseRoutes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
}));
app.use(express.json());

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'Backend server running', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api', testCaseRoutes);

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
  console.log(`📝 Test case generator API: http://localhost:${port}/api/generate-testcases`);
});

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import generatorRoutes from './routes/generator';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', generatorRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'LocalLLMTestGenerator Backend Running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

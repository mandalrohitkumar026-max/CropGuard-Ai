import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

import analyzeRoutes from './routes/analyzeRoutes';
import cropRoutes from './routes/cropRoutes';
import resourceRoutes from './routes/resourceRoutes';
import reportRoutes from './routes/reportRoutes';
import statsRoutes from './routes/statsRoutes';
import demoRoutes from './routes/demoRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for development & production
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Static directory for uploaded images
const uploadsDir = path.join(__dirname, '../uploads');
app.use('/uploads', express.static(uploadsDir));

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  return res.json({
    status: 'online',
    service: 'CropGuard AI Diagnostics API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/analyze', analyzeRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/demo-samples', demoRoutes);

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Unhandled API Error:', err);
  const status = err.status || 500;
  return res.status(status).json({
    success: false,
    error: err.message || 'Internal Server Error',
    code: err.code || 'SERVER_ERROR'
  });
});

// 404 handler for API routes
app.use('/api/*', (_req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    error: 'API endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🌿 CropGuard AI Backend Server running on http://localhost:${PORT}`);
  console.log(`📁 Uploads served from ${uploadsDir}`);
});

export default app;

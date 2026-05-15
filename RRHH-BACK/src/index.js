import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import vacantesRoutes from './routes/vacantesRoutes.js';
import aspirantesRoutes from './routes/aspirantesRoutes.js';
import procesosRoutes from './routes/procesosRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/vacantes', vacantesRoutes);
app.use('/api/aspirantes', aspirantesRoutes);
app.use('/api/procesos', procesosRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API REST RRHH está funcionando',
    timestamp: new Date().toISOString()
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: err.message
  });
});

app.listen(PORT, () => {
  console.log(`✅ API REST RRHH ejecutándose en http://localhost:${PORT}`);
  console.log(`📝 Endpoint de prueba: GET http://localhost:${PORT}/`);
});

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger.config');
const pokemonRoutes = require('./routes/pokemon.routes');
const { errorHandler } = require('./middlewares/error.middleware');

const app = express();
const PORT = process.env.PORT || 3001;

// Global middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger JSON endpoint
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Pokemon API Documentation',
  swaggerOptions: {
    url: '/api-docs.json'
  }
}));

// Welcome route
/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome endpoint
 *     tags: [General]
 *     description: Returns API information and available endpoints
 *     responses:
 *       200:
 *         description: API information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Welcome to Pokemon API
 *                 version:
 *                   type: string
 *                   example: 1.1.0
 *                 endpoints:
 *                   type: object
 */
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to Pokemon API',
    version: '1.1.0',
    endpoints: {
      getAll: 'GET /api/pokemon',
      getById: 'GET /api/pokemon/:id',
      create: 'POST /api/pokemon',
      update: 'PUT /api/pokemon/:id',
      delete: 'DELETE /api/pokemon/:id'
    },
    documentation: '/api-docs'
  });
});

// API routes
app.use('/api/pokemon', pokemonRoutes);

// Route not found
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found'
  });
});

// Error handling middleware (must be at the end)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
});

module.exports = app;
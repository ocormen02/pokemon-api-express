const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Pokemon API',
      version: '1.1.0',
      description: 'RESTful API for Pokemon management with Express',
      contact: {
        name: 'API Support',
      },
      license: {
        name: 'ISC',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Pokemon: {
          type: 'object',
          required: ['name', 'type'],
          properties: {
            id: {
              type: 'integer',
              description: 'Pokemon ID (auto-generated)',
              example: 1,
            },
            name: {
              type: 'string',
              description: 'Pokemon name',
              example: 'Pikachu',
            },
            type: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Pokemon types',
              example: ['Electric'],
            },
            hp: {
              type: 'integer',
              description: 'Health points',
              example: 35,
            },
            attack: {
              type: 'integer',
              description: 'Attack points',
              example: 55,
            },
            defense: {
              type: 'integer',
              description: 'Defense points',
              example: 40,
            },
            speed: {
              type: 'integer',
              description: 'Speed points',
              example: 90,
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            data: {
              type: 'object',
            },
            message: {
              type: 'string',
              example: 'Operation successful',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Error message',
            },
            error: {
              type: 'object',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js', './src/index.js'], // Archivos donde buscar anotaciones
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

# Swagger Documentation

## 📚 API Documentation with Swagger

This project includes interactive API documentation using Swagger UI.

## 🚀 Accessing the Documentation

Once the server is running, you can access the Swagger documentation at:

```
http://localhost:3000/api-docs
```

## 🔧 Configuration

### Installed Dependencies

- `swagger-jsdoc`: To generate Swagger specification from JSDoc comments
- `swagger-ui-express`: To serve the Swagger user interface

### Configuration Files

- **`src/config/swagger.config.js`**: Main Swagger configuration with schema definitions and API metadata
- **`src/routes/pokemon.routes.js`**: Contains Swagger annotations for each endpoint
- **`src/index.js`**: Swagger UI integration in the Express server

## 📝 Documentation Features

The Swagger documentation includes:

- **General API information**: Title, version, description
- **Documented endpoints**: All Pokemon endpoints (GET, POST, PUT, DELETE)
- **Data schemas**: Models for Pokemon, success responses, and error responses
- **Request examples**: Request body examples for each endpoint
- **Response codes**: All possible HTTP response codes
- **Interactive interface**: Test endpoints directly from the browser

## 🎯 Documented Endpoints

### Pokemon Endpoints

- `GET /api/pokemon` - Get all Pokemon
- `GET /api/pokemon/:id` - Get a Pokemon by ID
- `POST /api/pokemon` - Create a new Pokemon
- `PUT /api/pokemon/:id` - Update an existing Pokemon
- `DELETE /api/pokemon/:id` - Delete a Pokemon

### General Endpoints

- `GET /` - Welcome endpoint with API information

## 💡 Using the Interface

1. **Explore endpoints**: Navigate through different sections using the side menu
2. **Test endpoints**: Click "Try it out" to test any endpoint
3. **Send requests**: Fill in necessary parameters and click "Execute"
4. **View responses**: Review server responses in real-time

## 🔨 How to Add Documentation to New Endpoints

To document a new endpoint, add JSDoc comments with Swagger format:

```javascript
/**
 * @swagger
 * /api/your-endpoint:
 *   get:
 *     summary: Brief description
 *     tags: [TagName]
 *     description: Detailed description
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 */
router.get('/your-endpoint', controller.method);
```

## 🔗 References

- [Swagger OpenAPI Specification](https://swagger.io/specification/)
- [swagger-jsdoc Documentation](https://github.com/Surnet/swagger-jsdoc)
- [swagger-ui-express Documentation](https://github.com/scottie1984/swagger-ui-express)
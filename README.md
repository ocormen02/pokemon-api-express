# Pokemon API - Express

RESTful API for Pokemon management built with Express.js following clean code best practices.

## Features

- RESTful architecture
- Separation of concerns (Controllers, Services, Routes)
- Centralized error handling
- Data validation
- Consistent responses
- CORS enabled
- Request logging
- **Interactive documentation with Swagger UI** 

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## 🔧 Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start at `http://localhost:3000`

##  API Documentation (Swagger)

The API features interactive documentation generated with Swagger UI. Once the server is running, access:

**http://localhost:3000/api-docs**

From the Swagger interface you can:
- View all available endpoints
- Review data schemas
- Test endpoints directly from the browser
- See request and response examples

For more information about Swagger configuration, check [SWAGGER.md](SWAGGER.md)

## Endpoints

### GET /api/pokemon
Get all Pokemon with pagination support

**Query Parameters:**
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Items per page (default: 20, max: 100)

**Example:** `/api/pokemon?page=2&limit=10`

**Successful response:**
```json
{
  "success": true,
  "message": "Pokemon retrieved successfully",
  "data": {
    "pokemon": [...],
    "pagination": {
      "currentPage": 1,
      "itemsPerPage": 20,
      "totalItems": 200,
      "totalPages": 10,
      "hasNextPage": true,
      "hasPreviousPage": false
    }
  }
}
```

### GET /api/pokemon/:id
Get a Pokemon by ID

**Parameters:**
- `id` (number) - Pokemon ID

**Successful response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Pokemon1",
    ...
  }
}
```

### POST /api/pokemon
Create a new Pokemon

**Body:**
```json
{
  "name": "Pikachu",
  "description": "Electric type Pokemon",
  "characteristics": {
    "height": "0.4 m",
    "weight": "6 kg",
    "base_experience": 112,
    "abilities": ["Static", "Lightning Rod"]
  },
  "type": ["Electric"]
}
```

### PUT /api/pokemon/:id
Update an existing Pokemon

**Parameters:**
- `id` (number) - Pokemon ID

**Body:** (fields to update)

### DELETE /api/pokemon/:id
Delete a Pokemon

**Parameters:**
- `id` (number) - Pokemon ID

##  Project Structure

```
pokemon-api-express/
├── src/
│   ├── config/              # Configuration files (Swagger, etc.)
│   ├── controllers/         # Controller logic
│   ├── services/            # Business logic
│   ├── routes/              # Route definitions
│   ├── middlewares/         # Custom middlewares
│   ├── utils/               # Utilities and helpers
│   ├── data/                # JSON data
│   └── index.js             # Entry point
├── package.json
├── .gitignore
├── README.md
└── SWAGGER.md               # Swagger documentation
```


## HTTP Status Codes

- `200` - OK (success for GET, PUT)
- `201` - Created (success for POST)
- `400` - Bad Request (invalid data)
- `404` - Not Found (resource not found)
- `500` - Internal Server Error (server error)

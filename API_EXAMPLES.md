# API Usage Examples

This document contains examples of how to use all API endpoints.

## Base URL
```
http://localhost:3000
```

---

## 1. Get All Pokemon (with Pagination)

**Endpoint:** `GET /api/pokemon`

**Query Parameters:**
- `page` (optional) - Page number (default: 1)
- `limit` (optional) - Items per page (default: 20, max: 100)

**Example using cURL:**
```bash
# Get first page with default limit (20)
curl -X GET http://localhost:3000/api/pokemon

# Get page 2 with 10 items per page
curl -X GET "http://localhost:3000/api/pokemon?page=2&limit=10"

# Get page 1 with 50 items
curl -X GET "http://localhost:3000/api/pokemon?page=1&limit=50"
```

**Example using JavaScript (fetch):**
```javascript
// Default pagination
fetch('http://localhost:3000/api/pokemon')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// With custom pagination
fetch('http://localhost:3000/api/pokemon?page=2&limit=10')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

**Expected response:**
```json
{
  "success": true,
  "message": "Pokemon retrieved successfully",
  "data": {
    "pokemon": [
      {
        "id": 1,
        "name": "Pokemon1",
        "description": "...",
        "characteristics": {...},
        "type": [...]
      },
      // ... more Pokemon
    ],
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

---

## 2. Get Pokemon by ID

**Endpoint:** `GET /api/pokemon/:id`

**Example using cURL:**
```bash
curl -X GET http://localhost:3000/api/pokemon/1
```

**Example using JavaScript (fetch):**
```javascript
fetch('http://localhost:3000/api/pokemon/1')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

**Expected response:**
```json
{
  "success": true,
  "message": "Pokemon retrieved successfully",
  "data": {
    "id": 1,
    "name": "Pokemon1",
    "description": "This is Pokemon number 1, known for its unique abilities.",
    "characteristics": {
      "height": "2 ft",
      "weight": "2 lbs",
      "base_experience": 51,
      "abilities": ["Ability2", "Ability2"]
    },
    "type": ["Type2"]
  }
}
```

---

## 3. Create a New Pokemon

**Endpoint:** `POST /api/pokemon`

**Example using cURL:**
```bash
curl -X POST http://localhost:3000/api/pokemon \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pikachu",
    "description": "An electric type Pokemon that stores electricity in its cheeks.",
    "characteristics": {
      "height": "0.4 m",
      "weight": "6 kg",
      "base_experience": 112,
      "abilities": ["Static", "Lightning Rod"]
    },
    "type": ["Electric"]
  }'
```

**Example using JavaScript (fetch):**
```javascript
fetch('http://localhost:3000/api/pokemon', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: "Pikachu",
    description: "An electric type Pokemon that stores electricity in its cheeks.",
    characteristics: {
      height: "0.4 m",
      weight: "6 kg",
      base_experience: 112,
      abilities: ["Static", "Lightning Rod"]
    },
    type: ["Electric"]
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

**Expected response:**
```json
{
  "success": true,
  "message": "Pokemon created successfully",
  "data": {
    "id": 201,
    "name": "Pikachu",
    "description": "An electric type Pokemon that stores electricity in its cheeks.",
    "characteristics": {
      "height": "0.4 m",
      "weight": "6 kg",
      "base_experience": 112,
      "abilities": ["Static", "Lightning Rod"]
    },
    "type": ["Electric"]
  }
}
```

---

## 4. Update an Existing Pokemon

**Endpoint:** `PUT /api/pokemon/:id`

**Example using cURL:**
```bash
curl -X PUT http://localhost:3000/api/pokemon/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pokemon1 Updated",
    "description": "Updated description for Pokemon 1"
  }'
```

**Example using JavaScript (fetch):**
```javascript
fetch('http://localhost:3000/api/pokemon/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: "Pokemon1 Updated",
    description: "Updated description for Pokemon 1",
    characteristics: {
      height: "3 ft",
      weight: "5 lbs",
      base_experience: 60,
      abilities: ["New Ability", "Another Ability"]
    },
    type: ["Type2", "Type3"]
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

**Expected response:**
```json
{
  "success": true,
  "message": "Pokemon updated successfully",
  "data": {
    "id": 1,
    "name": "Pokemon1 Updated",
    "description": "Updated description for Pokemon 1",
    "characteristics": {
      "height": "3 ft",
      "weight": "5 lbs",
      "base_experience": 60,
      "abilities": ["New Ability", "Another Ability"]
    },
    "type": ["Type2", "Type3"]
  }
}
```

---

## 5. Delete a Pokemon

**Endpoint:** `DELETE /api/pokemon/:id`

**Example using cURL:**
```bash
curl -X DELETE http://localhost:3000/api/pokemon/1
```

**Example using JavaScript (fetch):**
```javascript
fetch('http://localhost:3000/api/pokemon/1', {
  method: 'DELETE'
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

**Expected response:**
```json
{
  "success": true,
  "message": "Pokemon deleted successfully"
}
```

---

## Error Handling

### Pokemon not found
```json
{
  "success": false,
  "message": "Pokemon not found"
}
```

### Invalid ID
```json
{
  "success": false,
  "message": "Invalid ID. Must be a positive number"
}
```

### Validation failed
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    "Name is required and must be a non-empty string",
    "Type is required and must be a non-empty array"
  ]
}
```

### Server error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Testing with Postman

You can import this Postman collection to test all endpoints:

1. Open Postman
2. Create a new collection called "Pokemon API"
3. Add the following requests:
   - GET All Pokemon
   - GET Pokemon by ID
   - POST Create Pokemon
   - PUT Update Pokemon
   - DELETE Pokemon

---

## Testing with Thunder Client (VS Code Extension)

Thunder Client is a lightweight VS Code extension for API testing:

1. Install "Thunder Client" from VS Code Extensions
2. Create a new collection
3. Add requests according to the examples above
# 🚀 Quick Start Guide

Quick guide to get the project up and running in less than 5 minutes.

## ⚡ Quick Start (3 steps)

### 1️⃣ Install dependencies
```bash
npm install
```

### 2️⃣ Start the server
```bash
# Development mode (with auto-reload)
npm run dev

# Or production mode
npm start
```

### 3️⃣ Test the API
Open your browser at: http://localhost:3000

Or use curl:
```bash
curl http://localhost:3000/api/pokemon
```

## ✅ Verify Installation

### Verify the server is running
```bash
curl http://localhost:3000
```

You should see:
```json
{
  "success": true,
  "message": "Welcome to Pokemon API",
  "version": "1.1.0",
  "endpoints": { ... },
  "documentation": "/api-docs"
}
```

## 🎯 First Steps

### 1. View all Pokemon
```bash
curl http://localhost:3000/api/pokemon
```

### 2. View a specific Pokemon
```bash
curl http://localhost:3000/api/pokemon/1
```

### 3. Create a new Pokemon
```bash
curl -X POST http://localhost:3000/api/pokemon \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pikachu",
    "description": "Electric Pokemon",
    "characteristics": {
      "height": "0.4m",
      "weight": "6kg",
      "base_experience": 112,
      "abilities": ["Static", "Lightning Rod"]
    },
    "type": ["Electric"]
  }'
```

### 4. Update a Pokemon
```bash
curl -X PUT http://localhost:3000/api/pokemon/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Pokemon",
    "description": "New description"
  }'
```

### 5. Delete a Pokemon
```bash
curl -X DELETE http://localhost:3000/api/pokemon/201
```

## 🛠️ Useful Commands

### Development
```bash
# Start in development mode with auto-reload
npm run dev

# Start in production mode
npm start
```

### Verification
```bash
# View Node version
node --version

# View installed dependencies
npm list --depth=0

# Check package.json file
cat package.json
```

### Cleanup
```bash
# Delete node_modules
rm -rf node_modules

# Reinstall everything from scratch
npm install

# On Windows PowerShell
Remove-Item -Recurse -Force node_modules
npm install
```

## 📋 Environment Variables

Create a `.env` file based on `env.example`:

```bash
# Linux/Mac
cp env.example .env

# Windows
copy env.example .env
```

Edit `.env` according to your needs:
```env
PORT=3000
NODE_ENV=development
```

## 🐛 Troubleshooting

### Problem: Port 3000 already in use

**Solution 1:** Change the port
```bash
# Linux/Mac
PORT=3001 npm start

# Windows PowerShell
$env:PORT=3001; npm start
```

**Solution 2:** Kill the process using port 3000
```bash
# Linux/Mac
lsof -ti:3000 | xargs kill -9

# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### Problem: "Cannot find module"

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Problem: Permission errors

**Solution:**
```bash
# Linux/Mac - Change permissions
chmod -R 755 .

# Or use sudo (not recommended)
sudo npm install
```

### Problem: Incompatible Node version

**Solution:**
```bash
# Check your Node version
node --version

# You need Node v14 or higher
# Update Node.js from https://nodejs.org/
```

## 🧪 Manual Testing

### With browser
1. Open http://localhost:3000
2. Install a REST client extension (e.g.: RESTClient)
3. Test endpoints from the browser

### With Postman
1. Install Postman
2. Import the collection (if available)
3. Test each endpoint

### With Thunder Client (VS Code)
1. Install the "Thunder Client" extension
2. Import `thunder-client-collection.json`
3. Execute requests

### With Swagger UI
1. Start the server
2. Open http://localhost:3000/api-docs
3. Test endpoints interactively

### With curl (Terminal)
```bash
# View all available endpoints
curl http://localhost:3000

# GET all
curl http://localhost:3000/api/pokemon

# GET by ID
curl http://localhost:3000/api/pokemon/1

# POST (create)
curl -X POST http://localhost:3000/api/pokemon \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test Pokemon","characteristics":{"height":"1m","weight":"5kg","base_experience":50,"abilities":["Ability1"]},"type":["Normal"]}'

# PUT (update)
curl -X PUT http://localhost:3000/api/pokemon/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated"}'

# DELETE
curl -X DELETE http://localhost:3000/api/pokemon/201
```

## 📚 Next Steps

Once you have everything running:

1. ✅ Read the complete [README.md](README.md)
2. ✅ Review the [API examples](API_EXAMPLES.md)
3. ✅ Understand the [architecture](ARCHITECTURE.md)
4. ✅ Check the [API documentation](http://localhost:3000/api-docs)

## 🎓 Additional Resources

- **Express.js:** https://expressjs.com/
- **REST API Best Practices:** https://restfulapi.net/
- **HTTP Status Codes:** https://httpstatuses.com/
- **JSON:** https://www.json.org/
- **Swagger:** https://swagger.io/

## 💡 Tips

1. **Use nodemon in development** - Automatically restarts
2. **Check the logs** - Morgan shows all requests
3. **Use Postman/Thunder Client/Swagger** - Makes testing easier
4. **Read the errors** - They are descriptive and help debugging
5. **Consult the documentation** - All endpoints are documented

## 🎉 Ready!

You're all set. Time to start developing!

**Questions?** Open an issue in the repository.
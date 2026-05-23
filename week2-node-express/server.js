require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Built-in JSON parsing middleware
app.use(express.json());

// BONUS: Custom Middleware to log requests (Method, URL, and Timestamp)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} request to ${req.url}`);
    next();
});

// 2. Serve static HTML page from the 'public' folder at the root text context
// Note: If index.html exists in 'public', Express automatically serves it at GET /
app.use(express.static(path.join(__dirname, 'public')));

// fallback route text string response for GET / if needed, or for testing API text directly
app.get('/api-info', (req, res) => {
    res.send("My Week 2 API!");
});

// 3. POST /user - Accepts {name, email} with 400 error handling for missing data
app.post('/user', (req, res) => {
    const { name, email } = req.body;

    // Error handling: Check if name or email is missing
    if (!name || !email) {
        return res.status(400).json({ error: "Missing required data. Please provide both name and email." });
    }

    res.send(`Hello, ${name}!`);
});

// 4. GET /user/:id - Route parameters fallback string
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ${userId} profile`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is successfully running on port ${PORT}`);
});
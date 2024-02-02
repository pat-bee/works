// server.js
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/oauthcallback', async (req, res) => {
    // Handle OAuth callback logic here
});

// Additional server-side logic...

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

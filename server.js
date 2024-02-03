// server.js
const express = require('express');
const { google } = require('googleapis');
const app = express();
const port = process.env.PORT || 3000; // Port should be dynamic for platforms like Heroku

// Google OAuth2 client setup
// Replace 'YOUR_CLIENT_ID', 'YOUR_CLIENT_SECRET', and 'YOUR_REDIRECT_URI' with actual values from Google Cloud Console
const oauth2Client = new google.auth.OAuth2(
    'YOUR_CLIENT_ID',
    'YOUR_CLIENT_SECRET',
    'YOUR_REDIRECT_URI'
);

// Scopes for Google Sheets API - consider whether you need full or read-only access
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];

// Endpoint to redirect user for OAuth2 consent
app.get('/auth', (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    res.redirect(authUrl);
});

// OAuth2 callback endpoint
app.get('/oauthcallback', async (req, res) => {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Store and manage tokens securely
    // Redirect the user or provide a response as needed
});

// Endpoint to retrieve data from Google Sheets and send to client
app.get('/api/get-sheet-data', async (req, res) => {
    try {
        const sheets = google.sheets({ version: 'v4', auth: oauth2Client });
        // Replace 'YOUR_SHEET_ID' and 'YOUR_RANGE' with actual values
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: 'YOUR_SHEET_ID',
            range: 'YOUR_RANGE',
        });

        // Process and respond with the data
        res.json(response.data.values);
    } catch (error) {
        console.error('The API returned an error: ' + error);
        res.status(500).send('Error retrieving data from Google Sheets');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

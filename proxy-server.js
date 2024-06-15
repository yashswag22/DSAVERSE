// proxy-server.js

import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());  // Enable CORS

const API_KEY = 'BSA212SlD8iO2Uufs0Z0dNXBN1sLNtM';  // Replace with your actual Brave Search API key
const SUBSCRIPTION_TOKEN = 'BSA212SlD8iO2Uufs0Z0dNXBN1sLNtM';  // Replace with your actual subscription token

// Proxy endpoint
app.get('/search', async (req, res) => {
    const query = req.query.q;
    try {
        const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}`;
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'x-subscription-token': SUBSCRIPTION_TOKEN
            }
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});

const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Webhook URL from Environment Variable
const WEBHOOK_URL = process.env.WEBHOOK_URL;

// Middleware to serve static files
app.use(express.static('public'));
app.use(express.json());

// Proxy endpoint
app.post('/trigger-webhook', async (req, res) => {
    if (!WEBHOOK_URL) {
        console.error('WEBHOOK_URL environment variable is not set.');
        return res.status(500).json({
            success: false,
            message: 'Server misconfiguration: Webhook URL not found.'
        });
    }

    try {
        console.log('Received trigger request...');
        const response = await axios.post(WEBHOOK_URL, {});

        console.log('Webhook response status:', response.status);
        res.json({
            success: true,
            data: response.data,
            message: 'Webhook triggered successfully!'
        });
    } catch (error) {
        console.error('Error triggering webhook:', error.message);
        res.status(500).json({
            success: false,
            message: 'Failed to trigger webhook',
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

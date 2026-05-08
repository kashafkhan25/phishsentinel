const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const scanRoutes = require('./routes/scan');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/pages', express.static(path.join(__dirname, '../frontend/pages')));

// API Routes
app.use('/api', scanRoutes);

// Fallback to dashboard for any other route (SPA-like navigation)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/pages/index.html'));
});

app.listen(PORT, () => {
    console.log(`[SYS] PhishSentinel Core initialized on port ${PORT}`);
    console.log(`[SYS] Access Dashboard at http://localhost:${PORT}`);
});

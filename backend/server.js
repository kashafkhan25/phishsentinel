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
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api', scanRoutes);

// Fallback to dashboard
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
    console.log(`[SYS] PhishSentinel Core initialized on port ${PORT}`);
    console.log(`[SYS] Access Dashboard at http://localhost:${PORT}`);
});

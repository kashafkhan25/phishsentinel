const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

exports.performScan = (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ status: 'error', message: 'URL is required' });
    }

    const isWindows = process.platform === 'win32';
    const enginePath = path.join(__dirname, `../cpp-engine/engine${isWindows ? '.exe' : ''}`);
    
    // Check if engine exists, if not, try to build it (or return error)
    if (!fs.existsSync(enginePath)) {
        // For development/demo, we might want to trigger a build or return a mock if g++ is missing
        // But the requirements say "Real C++ engine", so we expect it to be built.
        console.error('[ERR] C++ Engine binary not found at:', enginePath);
        return res.status(500).json({ 
            status: 'error', 
            message: 'Detection engine not initialized. Please run build:cpp' 
        });
    }

    execFile(enginePath, [url], (error, stdout, stderr) => {
        if (error) {
            console.error(`[ERR] Engine Execution Error: ${error}`);
            return res.status(500).json({ status: 'error', message: 'Internal Engine Failure' });
        }

        try {
            const result = JSON.parse(stdout);
            res.json(result);
        } catch (e) {
            console.error(`[ERR] Failed to parse engine output: ${stdout}`);
            res.status(500).json({ status: 'error', message: 'Engine Output Malformed' });
        }
    });
};

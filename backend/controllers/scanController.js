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
    
    // Attempt to run the C++ Engine
    execFile(enginePath, [url], (error, stdout, stderr) => {
        if (error || !fs.existsSync(enginePath)) {
            console.warn('[SYS] C++ Engine failed or restricted. Switching to JS Heuristic Fallback...');
            
            // --- JAVASCRIPT FALLBACK LOGIC ---
            // This ensures the app works on Vercel even if C++ binaries are blocked
            try {
                const urlObj = new URL(url);
                const domain = urlObj.hostname;
                
                let score = 0;
                let reasons = [];
                
                // Heuristics (Same as C++ Engine)
                if (url.startsWith('http://')) { score += 20; reasons.push('Insecure protocol (HTTP)'); }
                if (domain.length > 25) { score += 15; reasons.push('Suspiciously long domain'); }
                
                const keywords = ['login', 'verify', 'secure', 'banking', 'update', 'signin', 'paypal', 'google', 'microsoft'];
                keywords.forEach(kw => {
                    if (domain.includes(kw)) {
                        score += 25;
                        reasons.push(`Suspicious keyword detected: ${kw}`);
                    }
                });
                
                // Simple entropy simulation
                const uniqueChars = new Set(domain).size;
                const entropy = (uniqueChars / Math.max(domain.length, 1)) * 5; 
                if (entropy > 4.0) { score += 10; reasons.push('High domain randomness'); }

                const result = {
                    url,
                    status: score > 50 ? 'suspicious' : (score > 20 ? 'warning' : 'safe'),
                    score: Math.min(score, 100),
                    entropy: parseFloat(entropy.toFixed(2)),
                    reasons,
                    engine: 'Phalanx-JS-Fallback'
                };

                return res.json(result);
            } catch (err) {
                return res.status(400).json({ status: 'error', message: 'Invalid URL format' });
            }
        }

        try {
            const result = JSON.parse(stdout);
            result.engine = 'Phalanx-C++-Core';
            res.json(result);
        } catch (e) {
            res.status(500).json({ status: 'error', message: 'Engine Output Malformed' });
        }
    });
};

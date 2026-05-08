document.addEventListener('DOMContentLoaded', () => {
    const scanBtn = document.getElementById('initiate-scan');
    const urlInput = document.getElementById('url-input');

    if (scanBtn && urlInput) {
        scanBtn.addEventListener('click', async () => {
            const url = urlInput.value.trim();
            if (!url) {
                Logs.append("Target vector required for initialization.", "warn");
                return;
            }

            // UI Feedback: Disable button
            scanBtn.disabled = true;
            scanBtn.innerHTML = `<span class="material-symbols-outlined animate-spin">sync</span> SCANNING...`;
            
            Logs.clear();
            Logs.append(`Target locked: ${url}`, "info");

            // Start background simulation logs
            const simulationPromise = Logs.streamSimulatedLogs(url);
            
            // API Call
            const apiPromise = API.scanURL(url);

            const [_, result] = await Promise.all([simulationPromise, apiPromise]);

            if (result.status === 'error') {
                Logs.append(result.message, "warn");
            } else {
                Logs.append(`Analysis complete. Threat Score: ${result.score}`, "scan");
                result.reasons.forEach(reason => {
                    Logs.append(`Indicator: ${reason}`, "alert");
                });
                
                if (result.status === 'dangerous') {
                    Logs.append("ACTION: Intercepted and blacklisted suspicious node.", "action");
                } else {
                    Logs.append("ACTION: Monitoring active connection.", "info");
                }

                // Update UI
                Dashboard.updateRiskScore(result.score, result.status);
                Dashboard.addRecentScan(result.url, result.status, result.score);
            }

            // Restore Button
            scanBtn.disabled = false;
            scanBtn.innerHTML = `<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">radar</span> Initiate Scan`;
        });
    }
});

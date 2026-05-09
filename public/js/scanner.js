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

            // Start Scanning UI
            ScannerUI.start(url);
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
                ScannerUI.stop(null);
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

                // Stop Scanning UI and show results
                ScannerUI.stop(result);
                Dashboard.addRecentScan(result.url, result.status, result.score);
            }

            // Restore Button
            scanBtn.disabled = false;
            scanBtn.innerHTML = `<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">radar</span> Start Deep Scan`;
        });
    }
});

const ScannerUI = {
    intervals: [],
    startTime: null,
    scannedFiles: 0,
    
    start(url) {
        this.reset();
        this.startTime = Date.now();
        
        // Update Target Info
        const targetName = document.getElementById('target-node-name');
        const targetIp = document.getElementById('target-node-ip');
        if (targetName) targetName.textContent = `Target: ${url.replace('https://', '').replace('http://', '').split('/')[0]}`;
        if (targetIp) targetIp.textContent = `IP: ${this.generateMockIP()}`;

        // Reset Status
        const statusElement = document.getElementById('risk-status');
        if (statusElement) {
            statusElement.textContent = "INITIALIZING...";
            statusElement.className = "font-label-caps text-label-caps text-primary mt-1";
        }

        // Start Intervals
        this.intervals.push(setInterval(() => this.tickStats(), 100));
        this.intervals.push(setInterval(() => this.cyclePorts(), 400));
        this.intervals.push(setInterval(() => this.animateGauge(), 50));
        this.intervals.push(setInterval(() => this.simulateCVEs(), 2500));
        this.intervals.push(setInterval(() => this.animatePatches(), 2000));
    },

    reset() {
        this.intervals.forEach(clearInterval);
        this.intervals = [];
        this.scannedFiles = 0;
        
        const cveList = document.getElementById('cve-list');
        if (cveList) cveList.innerHTML = '';
        
        const fileCount = document.getElementById('files-scanned-count');
        if (fileCount) fileCount.textContent = "0";
        
        const timer = document.getElementById('elapsed-time-counter');
        if (timer) timer.textContent = "00:00:00";

        // Reset Patches
        ['kernel', 'deps', 'defs'].forEach(id => {
            const bar = document.getElementById(`${id}-compliance-bar`);
            const pct = document.getElementById(`${id}-compliance-pct`);
            if (bar) bar.style.width = '0%';
            if (pct) pct.textContent = '0%';
        });
    },

    stop(result) {
        this.intervals.forEach(clearInterval);
        this.intervals = [];

        if (result) {
            Dashboard.updateRiskScore(result.score, result.status);
            
            // Set final stats
            const fileCount = document.getElementById('files-scanned-count');
            if (fileCount) fileCount.textContent = Dashboard.formatNumber(this.scannedFiles);
            
            // Finalize patches to realistic high numbers if successful
            this.setFinalPatches(result.status);
        }
    },

    tickStats() {
        // Increment files
        this.scannedFiles += Math.floor(Math.random() * 5000) + 1000;
        const fileCount = document.getElementById('files-scanned-count');
        if (fileCount) fileCount.textContent = Dashboard.formatNumber(this.scannedFiles);

        // Update timer
        const elapsed = Date.now() - this.startTime;
        const seconds = Math.floor((elapsed / 1000) % 60);
        const minutes = Math.floor((elapsed / (1000 * 60)) % 60);
        const hours = Math.floor((elapsed / (1000 * 60 * 60)) % 24);
        
        const timer = document.getElementById('elapsed-time-counter');
        if (timer) {
            timer.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    },

    cyclePorts() {
        const portList = document.getElementById('port-list');
        if (!portList) return;
        
        const ports = portList.children;
        const randomIndex = Math.floor(Math.random() * ports.length);
        
        // Remove active state from all
        Array.from(ports).forEach(p => p.classList.remove('border-primary', 'bg-primary/5'));
        
        // Add to random
        ports[randomIndex].classList.add('border-primary', 'bg-primary/5');
    },

    animateGauge() {
        const gauge = document.getElementById('gauge-progress');
        if (!gauge) return;
        
        // Oscillation effect
        const time = Date.now() / 500;
        const offset = 283 - (10 * Math.sin(time) + 10);
        gauge.style.strokeDashoffset = offset;
        
        const statusElement = document.getElementById('risk-status');
        if (statusElement) {
            const dots = ".".repeat(Math.floor((Date.now() / 500) % 4));
            statusElement.textContent = "SCANNING" + dots;
        }
    },

    simulateCVEs() {
        const cveList = document.getElementById('cve-list');
        if (!cveList) return;

        const mockCVEs = [
            { id: "CVE-2024-21626", desc: "runc container breakout via file descriptor leak." },
            { id: "CVE-2023-44487", desc: "HTTP/2 Rapid Reset denial of service attack." },
            { id: "CVE-2023-38545", desc: "SOCKS5 heap buffer overflow in curl/libcurl." },
            { id: "CVE-2024-0001", desc: "Hypothetical kernel memory corruption in IO_URING." },
            { id: "CVE-2023-22515", desc: "Privilege escalation in Confluence Data Center." }
        ];

        const cve = mockCVEs[Math.floor(Math.random() * mockCVEs.length)];
        
        const item = document.createElement('div');
        item.className = "bg-surface/50 p-3 rounded border border-outline-variant/30 hover:bg-white/5 transition-colors cursor-pointer group animate-slide-in";
        item.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <span class="font-data-mono text-data-mono text-primary font-bold">${cve.id}</span>
                <span class="material-symbols-outlined text-primary text-[18px] opacity-70 group-hover:opacity-100">info</span>
            </div>
            <p class="font-body-md text-body-md text-on-surface-variant text-sm line-clamp-2">${cve.desc}</p>
        `;

        cveList.insertBefore(item, cveList.firstChild);
        if (cveList.children.length > 5) cveList.removeChild(cveList.lastChild);
    },

    animatePatches() {
        const patches = ['kernel', 'deps', 'defs'];
        patches.forEach(id => {
            const bar = document.getElementById(`${id}-compliance-bar`);
            const pct = document.getElementById(`${id}-compliance-pct`);
            if (bar) {
                const current = parseInt(bar.style.width) || 0;
                if (current < 90) {
                    const next = current + Math.floor(Math.random() * 15);
                    bar.style.width = `${next}%`;
                    if (pct) pct.textContent = `${next}%`;
                }
            }
        });
    },

    setFinalPatches(status) {
        const patches = [
            { id: 'kernel', val: status === 'safe' ? 98 : 82 },
            { id: 'deps', val: status === 'safe' ? 95 : 64 },
            { id: 'defs', val: 100 }
        ];

        patches.forEach(p => {
            const bar = document.getElementById(`${p.id}-compliance-bar`);
            const pct = document.getElementById(`${p.id}-compliance-pct`);
            if (bar) bar.style.width = `${p.val}%`;
            if (pct) pct.textContent = `${p.val}%`;
        });
    },

    generateMockIP() {
        return Array.from({length: 4}, () => Math.floor(Math.random() * 256)).join('.');
    }
};

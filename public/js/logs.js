const Logs = {
    containerId: 'terminal-logs',
    
    append(message, type = 'info') {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + '.' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        
        const logEntry = document.createElement('div');
        let colorClass = 'text-on-surface-variant';
        let prefix = '[SYS]';

        switch (type) {
            case 'scan':
                colorClass = 'text-primary';
                prefix = '[SCAN]';
                break;
            case 'warn':
                colorClass = 'text-error';
                prefix = '[WARN]';
                break;
            case 'alert':
                colorClass = 'text-tertiary-container';
                prefix = '[ALERT]';
                break;
            case 'action':
                colorClass = 'text-primary';
                prefix = '[ACTION]';
                break;
        }

        logEntry.className = colorClass;
        logEntry.innerHTML = `<span class="text-outline">${timestamp}</span> ${prefix} ${message}`;
        
        container.appendChild(logEntry);
        container.scrollTop = container.scrollHeight;
    },

    clear() {
        const container = document.getElementById(this.containerId);
        if (container) container.innerHTML = '';
    },

    async streamSimulatedLogs(url) {
        const simulationSteps = [
            { msg: `Initiating deep heuristic scan on ${url}...`, type: 'info', delay: 500 },
            { msg: "Extracting features from domain metadata...", type: 'info', delay: 800 },
            { msg: "Calculating Shannon Entropy of domain string...", type: 'scan', delay: 600 },
            { msg: "Checking SSL certificate transparency logs...", type: 'scan', delay: 1000 },
            { msg: "Analyzing URL path for brand impersonation keywords...", type: 'scan', delay: 700 },
            { msg: "Querying threat intelligence databases...", type: 'info', delay: 1200 }
        ];

        for (const step of simulationSteps) {
            await new Promise(resolve => setTimeout(resolve, step.delay));
            this.append(step.msg, step.type);
        }
    }
};

// Background log simulation for logs.html
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('logs')) {
        const bgLogs = [
            { msg: "Heartbeat check: Kernel isolated.", type: "info" },
            { msg: "Traffic spikes detected in sub-segment 0x4.", type: "alert" },
            { msg: "Applying firewall rule #1042: BLOCK IP 45.33.2.11", type: "action" },
            { msg: "Database replication status: SYNCED", type: "info" },
            { msg: "Unrecognized request from peer 10.0.0.45", type: "warn" }
        ];

        setInterval(() => {
            const random = bgLogs[Math.floor(Math.random() * bgLogs.length)];
            Logs.append(random.msg, random.type);
        }, 5000);
    }
});

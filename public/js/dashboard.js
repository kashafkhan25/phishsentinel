const Dashboard = {
    updateRiskScore(score, status) {
        const scoreElement = document.getElementById('risk-score');
        const statusElement = document.getElementById('risk-status');
        const gaugeCircle = document.getElementById('gauge-progress');
        
        if (scoreElement) {
            const currentScore = parseInt(scoreElement.textContent) || 0;
            this.animateValue(scoreElement, currentScore, score, 1000, '%');
        }
        if (statusElement) {
            statusElement.textContent = status.toUpperCase();
            statusElement.className = `font-data-mono text-data-mono mt-1 ${status === 'dangerous' ? 'text-error' : status === 'suspicious' ? 'text-tertiary-container' : 'text-primary'}`;
        }
        
        if (gaugeCircle) {
            const offset = 283 - (283 * (score / 100));
            gaugeCircle.style.transition = 'stroke-dashoffset 1s ease-out, stroke 1s ease-out';
            gaugeCircle.style.strokeDashoffset = offset;
            gaugeCircle.style.stroke = status === 'dangerous' ? '#ffb4ab' : status === 'suspicious' ? '#ffa8c1' : '#8aebff';
        }
    },

    animateValue(obj, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            obj.innerHTML = value + suffix;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    },

    formatNumber(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },

    addRecentScan(url, status, score) {
        const tableBody = document.getElementById('recent-scans');
        if (!tableBody) return;

        const row = document.createElement('tr');
        row.className = 'border-b border-white/5 hover:bg-white/5 transition-colors opacity-0 translate-x-2 transition-all duration-300';
        
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) + ' Z';
        
        const statusClass = status === 'dangerous' ? 'bg-error/10 text-error border-error/30' : status === 'suspicious' ? 'bg-tertiary-container/10 text-tertiary-container border-tertiary-container/30' : 'bg-primary/10 text-primary border-primary/30';
        const dotClass = status === 'dangerous' ? 'bg-error animate-pulse' : status === 'suspicious' ? 'bg-tertiary-container' : 'bg-primary';

        row.innerHTML = `
            <td class="py-3 px-2 text-on-surface">${timestamp}</td>
            <td class="py-3 px-2 text-primary truncate max-w-[150px]">${url}</td>
            <td class="py-3 px-2 text-on-surface-variant">Deep Scan</td>
            <td class="py-3 px-2 text-right">
                <span class="inline-flex items-center gap-1.5 px-2 py-1 rounded ${statusClass} border">
                    <span class="w-1.5 h-1.5 rounded-full ${dotClass}"></span>
                    ${status.toUpperCase()}
                </span>
            </td>
        `;

        tableBody.insertBefore(row, tableBody.firstChild);
        setTimeout(() => row.classList.remove('opacity-0', 'translate-x-2'), 10);

        if (tableBody.children.length > 5) {
            tableBody.removeChild(tableBody.lastChild);
        }
    },

    logToTerminal(message, type = 'info') {
        const terminal = document.getElementById('terminal-logs');
        if (!terminal) return;

        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) + '.' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        const entry = document.createElement('div');
        
        let colorClass = 'text-on-surface-variant';
        if (type === 'success') colorClass = 'text-primary';
        if (type === 'error') colorClass = 'text-error';
        if (type === 'warning') colorClass = 'text-tertiary-container';

        entry.className = colorClass;
        entry.innerHTML = `<span class="text-outline-variant mr-3">${timestamp}</span> [${type.toUpperCase().substring(0, 3)}] ${message}`;
        
        // Remove the cursor div if it exists
        const cursor = terminal.querySelector('.opacity-50');
        if (cursor) terminal.removeChild(cursor);

        terminal.appendChild(entry);
        
        // Add cursor back
        const newCursor = document.createElement('div');
        newCursor.className = 'text-on-surface-variant opacity-50 flex items-center gap-2 mt-2';
        newCursor.innerHTML = '_ <span class="animate-pulse">_</span>';
        terminal.appendChild(newCursor);

        terminal.scrollTop = terminal.scrollHeight;

        if (terminal.children.length > 50) {
            terminal.removeChild(terminal.firstChild);
        }
    }
};

// Simulation initialization
document.addEventListener('DOMContentLoaded', () => {
    const messages = [
        { msg: "Monitoring global threat vectors...", type: "info" },
        { msg: "Heuristic engine scan: 0x7F2A...991 completed.", type: "success" },
        { msg: "Incoming request from 185.15.59.220 filtered.", type: "warning" },
        { msg: "Anomaly detected in SMTP traffic block 4.", type: "error" },
        { msg: "Syn-Flood attempt mitigated by Shield Layer 1.", type: "success" },
        { msg: "Entropy validation passed for domain: x86.core.internal", type: "info" }
    ];

    setInterval(() => {
        const random = messages[Math.floor(Math.random() * messages.length)];
        Dashboard.logToTerminal(random.msg, random.type);
    }, 4000);
});

const Dashboard = {
    updateRiskScore(score, status) {
        const scoreElement = document.getElementById('risk-score');
        const statusElement = document.getElementById('risk-status');
        const gaugeCircle = document.getElementById('gauge-progress');
        
        if (scoreElement) scoreElement.textContent = score;
        if (statusElement) {
            statusElement.textContent = status.toUpperCase();
            statusElement.className = `font-data-mono text-data-mono mt-1 ${status === 'dangerous' ? 'text-error' : status === 'suspicious' ? 'text-tertiary-container' : 'text-primary'}`;
        }
        
        if (gaugeCircle) {
            // stroke-dashoffset: 283 is empty, 0 is full (based on radius 45, 2*pi*45 = 282.7)
            const offset = 283 - (283 * (score / 100));
            gaugeCircle.style.strokeDashoffset = offset;
            gaugeCircle.style.stroke = status === 'dangerous' ? '#ffb4ab' : status === 'suspicious' ? '#ffa8c1' : '#8aebff';
        }
    },

    addRecentScan(url, status, score) {
        const tableBody = document.getElementById('recent-scans');
        if (!tableBody) return;

        const row = document.createElement('tr');
        row.className = 'border-b border-white/5 hover:bg-white/5 transition-colors';
        
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
        if (tableBody.children.length > 5) {
            tableBody.removeChild(tableBody.lastChild);
        }
    }
};

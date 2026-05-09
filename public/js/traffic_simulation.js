document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('tbody.font-data-mono');
    if (!tableBody) return;

    const ips = [
        "192.168.1.105", "185.15.59.220", "10.0.5.22", "172.16.0.4",
        "45.33.2.11", "92.122.3.44", "104.22.3.1", "172.67.1.5"
    ];

    const countries = [
        { name: "United States", flag: "US" },
        { name: "Russia", flag: "RU" },
        { name: "Germany", flag: "DE" },
        { name: "China", flag: "CN" },
        { name: "Brazil", flag: "BR" }
    ];

    function addRandomRow() {
        const row = document.createElement('tr');
        row.className = 'border-b border-outline-variant/10 hover:bg-surface-bright/30 transition-colors opacity-0 translate-y-2';
        
        const srcIp = ips[Math.floor(Math.random() * ips.length)];
        const destIp = "10.0.0." + Math.floor(Math.random() * 255);
        const protocol = Math.random() > 0.5 ? "TCP/443" : "UDP/53";
        const country = countries[Math.floor(Math.random() * countries.length)];
        const risk = Math.floor(Math.random() * 100);
        const status = risk > 70 ? "THREAT" : (risk > 30 ? "WARNING" : "SECURE");
        const statusColor = status === "THREAT" ? "error" : (status === "WARNING" ? "tertiary-container" : "primary");

        row.innerHTML = `
            <td class="py-4 px-4 text-${statusColor}">${srcIp}</td>
            <td class="py-4 px-4 text-on-surface">${destIp}</td>
            <td class="py-4 px-4 text-on-surface-variant">${protocol}</td>
            <td class="py-4 px-4 text-on-surface-variant flex items-center gap-2">
                <span class="text-[10px] text-outline px-1 border border-outline rounded-sm">${country.flag}</span>
                ${country.name}
            </td>
            <td class="py-4 px-4">
                <div class="flex items-center gap-2 text-${statusColor}">
                    <span>${risk.toString().padStart(2, '0')}</span>
                    <div class="w-16 h-1 bg-surface-container-highest rounded-full">
                        <div class="h-full bg-${statusColor} rounded-full" style="width: ${risk}%"></div>
                    </div>
                </div>
            </td>
            <td class="py-4 px-4">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-${statusColor}/10 text-${statusColor} border border-${statusColor}/20">
                    <span class="w-1.5 h-1.5 rounded-full bg-${statusColor} ${status === 'THREAT' ? 'animate-pulse' : ''}"></span> ${status}
                </span>
            </td>
        `;

        tableBody.insertBefore(row, tableBody.firstChild);
        
        // Animation
        requestAnimationFrame(() => {
            row.classList.remove('opacity-0', 'translate-y-2');
            row.classList.add('opacity-100', 'translate-y-0');
        });

        if (tableBody.children.length > 10) {
            tableBody.removeChild(tableBody.lastChild);
        }
    }

    // Add rows periodically
    setInterval(addRandomRow, 3000);

    // Initial rows
    for(let i=0; i<3; i++) setTimeout(addRandomRow, i * 500);
});

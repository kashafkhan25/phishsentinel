const API = {
    async scanURL(url) {
        try {
            const response = await fetch('/api/scan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ url })
            });
            return await response.json();
        } catch (error) {
            console.error('[ERR] API Connection Failed:', error);
            return { status: 'error', message: 'Connection to AI Core lost' };
        }
    }
};

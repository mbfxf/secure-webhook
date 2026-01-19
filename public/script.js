document.addEventListener('DOMContentLoaded', () => {
    const triggerBtn = document.getElementById('triggerBtn');
    const responseArea = document.getElementById('responseArea');
    const responseContent = document.getElementById('responseContent');
    const timestamp = document.getElementById('timestamp');
    const loadingIndicator = document.getElementById('loadingIndicator');

    triggerBtn.addEventListener('click', async () => {
        // UI State: Loading
        triggerBtn.disabled = true;
        triggerBtn.style.opacity = '0.7';
        responseArea.classList.add('hidden');
        loadingIndicator.classList.remove('hidden');

        try {
            const res = await fetch('/trigger-webhook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();

            // Populate Response
            timestamp.textContent = new Date().toLocaleTimeString();
            responseContent.textContent = JSON.stringify(data, null, 2);

            // Show Response
            loadingIndicator.classList.add('hidden');
            responseArea.classList.remove('hidden');

            if (!res.ok) {
                // Handle non-200 responses visually if needed
                responseContent.style.color = 'var(--error)';
            } else {
                responseContent.style.color = '#cbd5e1';
            }

        } catch (error) {
            console.error('Frontend error:', error);
            timestamp.textContent = new Date().toLocaleTimeString();
            responseContent.textContent = `Error: ${error.message}`;
            responseContent.style.color = 'var(--error)';

            loadingIndicator.classList.add('hidden');
            responseArea.classList.remove('hidden');
        } finally {
            // Reset Button
            triggerBtn.disabled = false;
            triggerBtn.style.opacity = '1';
        }
    });
});

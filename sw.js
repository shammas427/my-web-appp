self.addEventListener('install', (e) => {
 console.log('Service Worker: Installed');
});

self.addEventListener('fetch', (e) => {
 // This allows the app to load from cache later
 e.respondWith(fetch(e.request));
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

const aiInput = document.getElementById('ai-input');
const aiResponse = document.getElementById('ai-response');
const askBtn = document.getElementById('ask-btn');

askBtn.addEventListener('click', async () => {
    const query = aiInput.value;
    if (!query) return;

    aiResponse.innerText = "Thinking...";
    askBtn.disabled = true;

    try {
        // We are using a free "Serverless" AI endpoint for demo purposes
        const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`);
        const data = await response.json();
        
        aiResponse.innerText = data.AbstractText || "I'm still learning! Try asking a factual question.";
    } catch (error) {
        aiResponse.innerText = "Error connecting to AI. Check your internet.";
    } finally {
        askBtn.disabled = false;
        aiInput.value = "";
    }
});

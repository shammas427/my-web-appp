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

<script type="module">
  import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

  // Replace with your actual key from https://aistudio.google.com/
  const API_KEY = "AIzaSyCKsxEPHYk1HJLLI5UC1mriFQlL7eFPC2U"; 
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const sendBtn = document.getElementById('send-ai-btn');
  const chatBox = document.getElementById('ai-chat-box');
  const userInput = document.getElementById('user-input');

  sendBtn.addEventListener('click', async () => {
    const text = userInput.value;
    if (!text) return;

    chatBox.innerHTML += `<p><strong>You:</strong> ${text}</p>`;
    userInput.value = "";
    
    const loadingMsg = document.createElement('p');
    loadingMsg.innerHTML = "<strong>Gemini:</strong> Thinking...";
    chatBox.appendChild(loadingMsg);

    try {
      const result = await model.generateContent(text);
      const response = await result.response;
      loadingMsg.innerHTML = `<strong>Gemini:</strong> ${response.text()}`;
    } catch (error) {
      console.error(error); // This helps you find the error in F12 Developer Tools
      loadingMsg.innerHTML = "<strong>Gemini:</strong> Connection failed. Please check if your API Key is correct and active.";
    }
    chatBox.scrollTop = chatBox.scrollHeight;
  });
</script>

<script type="module">
  import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

  const API_KEY = "AIzaSyCKsxEPHYk1HJLLI5UC1mriFQlL7eFPC2U"; 
  const genAI = new GoogleGenerativeAI(API_KEY);

  // 1. Give the AI its "Personality" and "Context"
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    systemInstruction: "You are the Miuxoo AI Ambassador. Your goal is to help users with the Miuxoo app. " +
                       "You are friendly, tech-savvy, and helpful. " +
                       "If users ask about the creator, mention 'aimiuxo'. " +
                       "Promote the website https://miuxo.in and the Instagram/YouTube channel @aimiuxo. " +
                       "If they ask for code help, give concise Vanilla JS/HTML solutions."
  });

  const sendBtn = document.getElementById('send-ai-btn');
  const chatBox = document.getElementById('ai-chat-box');
  const userInput = document.getElementById('user-input');

  sendBtn.addEventListener('click', async () => {
    const text = userInput.value;
    if (!text) return;

    chatBox.innerHTML += `<p style="color: var(--accent);"><strong>You:</strong> ${text}</p>`;
    userInput.value = "";
    
    const loadingMsg = document.createElement('p');
    loadingMsg.innerHTML = "<strong>Gemini:</strong> ...";
    chatBox.appendChild(loadingMsg);

    try {
      // 2. Start a chat session to remember previous messages
      const result = await model.generateContent(text);
      const response = await result.response;
      loadingMsg.innerHTML = `<strong>Gemini:</strong> ${response.text()}`;
    } catch (error) {
      loadingMsg.innerHTML = "<strong>Gemini:</strong> I hit a snag! Check your connection.";
    }
    chatBox.scrollTop = chatBox.scrollHeight;
  });
</script>

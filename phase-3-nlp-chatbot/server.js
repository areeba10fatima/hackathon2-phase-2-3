const express = require('express');
const path = require('path');
const TaskChatbot = require('./src/index');

const app = express();
const PORT = 3001;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for chatbot
app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const { message, token } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Received token:', token ? 'YES' : 'NO', 'Length:', token ? token.length : 0);

    // Create a new chatbot instance for this request with the provided token
    const chatbot = TaskChatbot.create('http://localhost:8000/api', token);

    const response = await chatbot.processMessage(message);
    res.json({ response });
  } catch (error) {
    console.error('Error processing message:', error);

    // Check if it's an authentication-related error
    if (error.message && (error.message.includes('Unauthorized') ||
                          error.message.includes('credentials') ||
                          error.message.includes('authentication') ||
                          error.message.includes('401'))) {
      res.status(401).json({ error: 'Could not validate credentials. Your token may have expired. Please log in again to get a new token.' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Task Management Chatbot server running on http://localhost:${PORT}`);
  console.log('💡 Open your browser to http://localhost:3001 to interact with the chatbot');
});
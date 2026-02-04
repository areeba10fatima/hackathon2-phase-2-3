// Main entry point for the Task Management Chatbot
const ChatEngine = require('./core/chat-engine');

class TaskChatbot {
  constructor(apiUrl = 'http://localhost:8000/api', token = null) {
    this.chatEngine = new ChatEngine(apiUrl, token);
    this.initialize();
  }

  initialize() {
    console.log('🚀 Task Management Chatbot initialized');
    console.log('💡 Available commands:');
    console.log('   - Add task: "Add task: Buy groceries" or "Create a task to finish report"');
    console.log('   - Delete task: "Delete task: Buy groceries" or "Remove the milk task"');
    console.log('   - Complete task: "Complete task: Buy groceries" or "I finished the report"');
    console.log('   - List tasks: "Show my tasks" or "What\'s on my list?"');
  }

  // Method to set the authentication token
  setToken(token) {
    this.chatEngine.setToken(token);
  }

  processMessage(message) {
    return this.chatEngine.process(message);
  }

  // For demo purposes, we'll export the main functionality
  static create(apiUrl, token) {
    return new TaskChatbot(apiUrl, token);
  }
}

module.exports = TaskChatbot;
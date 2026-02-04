// Core chat engine for task management
const TaskManager = require('./task-manager');
const CommandParser = require('../parser/command-parser');
const ResponseGenerator = require('../utils/response-generator');

class ChatEngine {
  constructor(apiUrl = 'http://localhost:8000/api', token = null) {
    this.taskManager = new TaskManager(apiUrl, token);
    this.commandParser = new CommandParser();
    this.responseGenerator = new ResponseGenerator();
  }

  // Method to set the authentication token
  setToken(token) {
    this.taskManager.setToken(token);
  }

  async process(message) {
    try {
      // Parse the command from user message
      const parsedCommand = this.commandParser.parse(message);

      if (!parsedCommand) {
        return this.responseGenerator.generateUnknownCommandResponse(message);
      }

      // Execute the command based on intent
      switch (parsedCommand.intent) {
        case 'ADD_TASK':
          const newTask = await this.taskManager.addTask(parsedCommand.entities);
          return this.responseGenerator.generateTaskAddedResponse(newTask);

        case 'DELETE_TASK':
          const deleted = await this.taskManager.deleteTask(parsedCommand.entities.taskName);
          return this.responseGenerator.generateTaskDeletedResponse(deleted, parsedCommand.entities.taskName);

        case 'COMPLETE_TASK':
          const completed = await this.taskManager.completeTask(parsedCommand.entities.taskName);
          return this.responseGenerator.generateTaskCompletedResponse(completed, parsedCommand.entities.taskName);

        case 'LIST_TASKS':
          const tasks = await this.taskManager.listTasks(parsedCommand.entities.status);
          return this.responseGenerator.generateTaskListResponse(tasks);

        case 'HELP':
          return this.responseGenerator.generateHelpResponse();

        default:
          return this.responseGenerator.generateUnknownCommandResponse(message);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      return this.responseGenerator.generateErrorResponse(error.message);
    }
  }
}

module.exports = ChatEngine;
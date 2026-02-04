// Response generator for the chatbot
class ResponseGenerator {
  generateTaskAddedResponse(task) {
    const responses = [
      `✅ Great! I've added "${task.title}" to your task list.`,
      `📝 Task "${task.title}" has been created successfully.`,
      `👍 Added "${task.title}" to your list. You got this!`,
      `✔️ Got it! "${task.title}" is now on your task list.`
    ];

    return this.getRandomResponse(responses);
  }

  generateTaskDeletedResponse(success, taskName) {
    if (success) {
      const responses = [
        `🗑️ I've removed "${taskName}" from your task list.`,
        `✅ "${taskName}" has been deleted successfully.`,
        `👋 "${taskName}" is gone from your list.`,
        `✔️ Removed "${taskName}" as requested.`
      ];

      return this.getRandomResponse(responses);
    } else {
      return `❌ Sorry, I couldn't find a task named "${taskName}" to delete.`;
    }
  }

  generateTaskCompletedResponse(success, taskName) {
    if (success) {
      const responses = [
        `🎉 Good job! "${taskName}" has been marked as completed.`,
        `✅ "${taskName}" is now marked as done. Well done!`,
        `👏 Nice! "${taskName}" has been completed.`,
        `✔️ "${taskName}" is marked as finished. Great work!`
      ];

      return this.getRandomResponse(responses);
    } else {
      return `❌ I couldn't find a task named "${taskName}" to mark as completed.`;
    }
  }

  generateTaskListResponse(tasks) {
    if (tasks.length === 0) {
      const responses = [
        `📋 Your task list is empty. Would you like to add some tasks?`,
        `📝 No tasks found. Ready to add some new ones?`,
        `🔍 Your list is clean! Time to add some new tasks?`
      ];

      return this.getRandomResponse(responses);
    }

    let response = `📋 Here are your tasks (${tasks.length} total):\n\n`;
    tasks.forEach((task, index) => {
      const status = task.completed ? '✅' : '⏳';
      const typeIcon = this.getTypeIcon(task.type);
      response += `${index + 1}. ${status} ${typeIcon} ${task.title}\n`;
      if (task.description) {
        response += `   ${task.description}\n`;
      }
      response += '\n';
    });

    return response;
  }

  generateUnknownCommandResponse(originalMessage) {
    const responses = [
      `🤔 I'm not sure what you mean by "${originalMessage}". Could you try rephrasing?`,
      `❓ Sorry, I didn't understand that. Try commands like "Add task: Buy groceries" or "Show my tasks".`,
      `💬 I couldn't process that command. For help, just type "help".`,
      `ℹ️ I'm not sure how to handle that. You can say things like "Create a task to finish report".`
    ];

    return this.getRandomResponse(responses);
  }

  generateHelpResponse() {
    return `🤖 Hello! I'm your task management assistant. Here's what I can do:

📝 **Add tasks**:
  - "Add task: Buy groceries"
  - "Create a task to finish report"
  - "I need to call mom"

🗑️ **Delete tasks**:
  - "Delete task: Buy groceries"
  - "Remove the milk task"
  - "Cancel the meeting task"

✅ **Complete tasks**:
  - "Complete task: Buy groceries"
  - "I finished the report"
  - "Done with shopping"

📋 **View tasks**:
  - "Show my tasks"
  - "What's on my list?"
  - "List all tasks"

💡 **Get help**: Just type "help" anytime!`;
  }

  generateErrorResponse(errorMessage) {
    // Check if it's an authentication-related error
    if (errorMessage && (errorMessage.includes('Could not validate credentials') ||
                         errorMessage.includes('Unauthorized') ||
                         errorMessage.includes('credentials') ||
                         errorMessage.includes('authentication'))) {
      return `⚠️ Authentication error: ${errorMessage}. Please update your token by clicking the "Update Token" button.`;
    }

    return `⚠️ Oops! Something went wrong: ${errorMessage}. Please try again.`;
  }

  getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  getTypeIcon(type) {
    switch (type) {
      case 'urgent': return '🚨';
      case 'work': return '💼';
      case 'personal': return '🏠';
      default: return '📌';
    }
  }
}

module.exports = ResponseGenerator;
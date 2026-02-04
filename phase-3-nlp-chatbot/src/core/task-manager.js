// Task manager that integrates with the existing API
class TaskManager {
  constructor(apiUrl = 'http://localhost:8000/api', token = null) {
    this.apiUrl = apiUrl;
    this.token = token;
  }

  // Set the authentication token
  setToken(token) {
    this.token = token;
  }

  // Use the actual API to add a task
  async addTask(entities) {
    try {
      const taskData = {
        title: entities.taskName || entities.taskTitle || 'Untitled task',
        description: entities.description || '',
        type: entities.type || 'general'
      };

      if (!this.token) {
        throw new Error('Authentication token is required to add tasks');
      }

      const response = await fetch(`${this.apiUrl}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(taskData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `Failed to add task: ${response.statusText}`);
      }

      const newTask = await response.json();
      return newTask;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  }

  async deleteTask(taskName) {
    try {
      if (!this.token) {
        throw new Error('Authentication token is required to delete tasks');
      }

      // First, we need to get all tasks to find the specific task by name
      const tasks = await this.listTasks();
      const taskToDelete = tasks.find(task =>
        task.title.toLowerCase().includes(taskName.toLowerCase())
      );

      if (!taskToDelete) {
        return false;
      }

      const response = await fetch(`${this.apiUrl}/tasks/${taskToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }

  async completeTask(taskName) {
    try {
      if (!this.token) {
        throw new Error('Authentication token is required to complete tasks');
      }

      // First, we need to get all tasks to find the specific task by name
      const tasks = await this.listTasks();
      const taskToComplete = tasks.find(task =>
        task.title.toLowerCase().includes(taskName.toLowerCase())
      );

      if (!taskToComplete) {
        return false;
      }

      const response = await fetch(`${this.apiUrl}/tasks/${taskToComplete.id}/toggle-complete`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to complete task: ${response.statusText}`);
      }

      return true;
    } catch (error) {
      console.error('Error completing task:', error);
      throw error;
    }
  }

  async listTasks(status = null) {
    try {
      if (!this.token) {
        throw new Error('Authentication token is required to list tasks');
      }

      let url = `${this.apiUrl}/tasks`;
      if (status === 'completed') {
        url += '?completed=true';
      } else if (status === 'pending') {
        url += '?completed=false';
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to list tasks: ${response.statusText}`);
      }

      const tasks = await response.json();
      return tasks;
    } catch (error) {
      console.error('Error listing tasks:', error);
      throw error;
    }
  }
}

module.exports = TaskManager;
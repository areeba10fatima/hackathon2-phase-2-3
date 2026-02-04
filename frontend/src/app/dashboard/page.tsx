'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '../../lib/api';
import { getAuthToken } from '../../lib/auth';

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskType, setNewTaskType] = useState('general');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(true);

  const handleLogout = () => {
    // Clear any stored tokens
    localStorage.removeItem('access_token');
    router.push('/login');
  };

  // Load tasks when component mounts
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const authToken = getAuthToken();
        if (!authToken) {
          router.push('/login');
          return;
        }

        const data = await apiClient.getTasks();
        setTasks(data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
        // Redirect to login if unauthorized
        if (err.response?.status === 401) {
          router.push('/login');
        }
      } finally {
        setTasksLoading(false);
      }
    };

    fetchTasks();
  }, [router]);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      setLoading(true);
      setError('');

      // Log the data being sent for debugging
      console.log('Sending task data:', {
        title: newTaskTitle,
        description: newTaskDescription,
        type: newTaskType
      });

      // Call the real API to create the task
      const taskData = {
        title: newTaskTitle,
        description: newTaskDescription,
        type: newTaskType
      };

      // Create the new task
      const newTask = await apiClient.createTask(taskData);

      // Log the response for debugging
      console.log('Task created successfully:', newTask);

      // Refresh the entire task list to ensure consistency
      const updatedTasks = await apiClient.getTasks();
      setTasks(updatedTasks);

      // Reset form
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewTaskType('general');

      // Clear any error messages on successful creation
      setError('');
    } catch (err: any) {
      console.error('Error creating task:', err);
      // Handle different error response formats
      if (err.response?.data?.detail) {
        if (Array.isArray(err.response.data.detail)) {
          // Handle validation errors array
          const errorMessage = err.response.data.detail.map((error: any) => {
            if (error.msg) {
              return `${error.loc?.[1] || 'Field'}: ${error.msg}`;
            }
            return typeof error === 'string' ? error : JSON.stringify(error);
          }).join(', ');
          setError(errorMessage);
        } else if (typeof err.response.data.detail === 'object') {
          // Handle generic object error
          setError(JSON.stringify(err.response.data.detail));
        } else {
          // Handle string error
          setError(err.response.data.detail);
        }
      } else {
        setError(err.message || 'Failed to create task');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-white">🎯 Todo Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 shadow-md"
              >
                🔐 Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">📝 Create New Task</h2>
            {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg shadow-sm">{error}</div>}

            <form onSubmit={handleCreateTask} className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="task-title">
                  Task Title
                </label>
                <input
                  id="task-title"
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Enter task title..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-gray-50 placeholder-gray-500 transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="task-description">
                  Description
                </label>
                <textarea
                  id="task-description"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  placeholder="Enter task description (optional)..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-gray-50 placeholder-gray-500 transition-all duration-200"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="task-type">
                  Task Type
                </label>
                <select
                  id="task-type"
                  value={newTaskType}
                  onChange={(e) => setNewTaskType(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-gray-50"
                >
                  <option value="general">📌 General</option>
                  <option value="work">💼 Work</option>
                  <option value="personal">🏠 Personal</option>
                  <option value="urgent">🚨 Urgent</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-lg text-white font-semibold text-lg transition-all duration-200 shadow-lg ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105'
                }`}
              >
                {loading ? '🔄 Creating...' : '✅ Create Task'}
              </button>
            </form>
          </div>

          <div className="mt-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">📋 Your Tasks</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
              </span>
            </div>

            {tasksLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading your tasks...</p>
              </div>
            ) : tasks.length > 0 ? (
              <div className="space-y-4">
                {tasks.map((task: any) => (
                  <div
                    key={task.id}
                    className={`bg-white p-5 rounded-xl shadow-md border-l-4 transition-all duration-200 hover:shadow-lg ${
                      task.completed
                        ? 'border-green-500 bg-green-50'
                        : task.type === 'urgent'
                          ? 'border-red-500 bg-red-50'
                          : task.type === 'work'
                            ? 'border-blue-500 bg-blue-50'
                            : task.type === 'personal'
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-500 bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold ${
                          task.completed ? 'line-through text-gray-500' : 'text-gray-800'
                        }`}>
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-gray-600 mt-2 text-sm">{task.description}</p>
                        )}
                        <div className="flex items-center space-x-3 mt-3">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            task.type === 'urgent' ? 'bg-red-100 text-red-800' :
                            task.type === 'work' ? 'bg-blue-100 text-blue-800' :
                            task.type === 'personal' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {task.type === 'urgent' ? '🚨 Urgent' :
                             task.type === 'work' ? '💼 Work' :
                             task.type === 'personal' ? '🏠 Personal' : '📌 General'}
                          </span>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            task.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {task.completed ? '✅ Completed' : '⏳ Pending'}
                          </span>
                        </div>
                      </div>

                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={async () => {
                            try {
                              const updatedTask = await apiClient.toggleTaskCompletion(task.id);
                              // Update the task in the list
                              setTasks(prevTasks =>
                                prevTasks.map(t => t.id === task.id ? updatedTask : t)
                              );
                            } catch (error) {
                              console.error('Error toggling task completion:', error);
                              setError('Failed to update task status');
                            }
                          }}
                          className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-200 ${
                            task.completed
                              ? 'bg-green-500 hover:bg-green-600 text-white'
                              : 'bg-yellow-500 hover:bg-yellow-600 text-white'
                          }`}
                        >
                          {task.completed ? '✅ Done' : '⏳ Pending'}
                        </button>

                        <button
                          onClick={async () => {
                            if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
                              try {
                                await apiClient.deleteTask(task.id);
                                // Remove the task from the list
                                setTasks(prevTasks =>
                                  prevTasks.filter(t => t.id !== task.id)
                                );
                              } catch (error) {
                                console.error('Error deleting task:', error);
                                setError('Failed to delete task');
                              }
                            }
                          }}
                          className="px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white text-xs font-medium transition-colors duration-200"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-200">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks yet!</h3>
                <p className="text-gray-500">Create your first task to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
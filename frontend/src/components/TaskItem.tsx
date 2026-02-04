import React, { useState } from 'react';
import { apiClient } from '../lib/api';

interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
  type: string;
}

interface TaskItemProps {
  task: Task;
  onTaskChange: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleToggleComplete = async () => {
    try {
      setLoading(true);
      await apiClient.toggleTaskCompletion(task.id);
      onTaskChange();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        setLoading(true);
        await apiClient.deleteTask(task.id);
        onTaskChange();
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Failed to delete task');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSaveEdit = async () => {
    try {
      setLoading(true);
      await apiClient.updateTask(task.id, { title, description });
      setIsEditing(false);
      onTaskChange();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setTitle(task.title);
    setDescription(task.description || '');
  };

  return (
    <div className={`p-4 border rounded-md ${task.completed ? 'bg-green-50' : 'bg-white'}`}>
      {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
      {isEditing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-2 py-1 border rounded"
            placeholder="Task title"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-2 py-1 border rounded"
            placeholder="Task description"
          />
          <div className="flex space-x-2 mt-2">
            <button
              onClick={handleSaveEdit}
              disabled={loading}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              disabled={loading}
              className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-start">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleComplete}
              disabled={loading}
              className="mt-1 mr-2"
            />
            <div className="flex-1">
              <h3 className={`${task.completed ? 'line-through text-gray-500' : ''}`}>{task.title}</h3>
              {task.description && <p className="text-gray-600 text-sm mt-1">{task.description}</p>}
              <div className="flex items-center mt-1">
                <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                  {task.type && typeof task.type === 'string' ? task.type : 'general'}
                </span>
                <p className="text-xs text-gray-500 ml-2">
                  Created: {new Date(task.created_at).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex space-x-1 ml-2">
              <button
                onClick={() => setIsEditing(true)}
                disabled={loading}
                className="px-2 py-1 bg-yellow-500 text-white rounded text-xs"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-2 py-1 bg-red-500 text-white rounded text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
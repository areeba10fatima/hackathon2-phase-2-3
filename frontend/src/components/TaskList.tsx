import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
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

interface TaskListProps {
  onTaskChange: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ onTaskChange }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [onTaskChange]);

  const fetchTasks = async () => {
    try {
      console.log('Fetching tasks...');
      setLoading(true);
      const data = await apiClient.getTasks();
      console.log('Tasks fetched:', data);
      setTasks(data);
    } catch (err: any) {
      console.error('Error fetching tasks:', err);
      setError(err.response?.data?.detail || err.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet. Create your first task!</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task.id}>
              <TaskItem task={task} onTaskChange={onTaskChange} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;
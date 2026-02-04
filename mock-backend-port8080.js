const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 8080;

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Mock data storage (in memory)
let todos = [
  { id: 1, title: 'Sample task', completed: false },
  { id: 2, title: 'Another task', completed: true }
];
let nextId = 3;

// Routes for todo operations
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTodo = {
    id: nextId++,
    title,
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const { title, completed } = req.body;
  todo.title = title !== undefined ? title : todo.title;
  todo.completed = completed !== undefined ? completed : todo.completed;

  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos.splice(index, 1);
  res.status(204).send();
});

// Mock authentication routes
app.post('/api/auth/login', (req, res) => {
  res.json({
    token: 'mock-jwt-token-for-testing',
    user: { id: 1, email: 'user@example.com', name: 'Test User' }
  });
});

app.post('/api/auth/register', (req, res) => {
  res.json({
    token: 'mock-jwt-token-for-testing',
    user: { id: 1, email: 'user@example.com', name: 'Test User' }
  });
});

app.get('/api/auth/me', (req, res) => {
  res.json({ id: 1, email: 'user@example.com', name: 'Test User' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});


app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Mock Backend server running on http://localhost:${PORT}`);
  console.log('💡 Services can now connect to the API at http://localhost:' + PORT);
});
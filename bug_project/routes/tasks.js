const express = require('express');
const router = express.Router();
const store = require('../data/store');

// GET /api/tasks - list all tasks
router.get('/', (req, res) => {
  res.json(store.getAll());
});

// GET /api/tasks/:id - get a single task
router.get('/:id', (req, res) => {
  const task = store.getById(Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// POST /api/tasks - create a task
router.post('/', (req, res) => {
  const { title } = req.body;
  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const task = store.create(title.trim());
  res.status(201).json(task);
});

// PATCH /api/tasks/:id - toggle done state
router.patch('/:id', (req, res) => {
  const task = store.toggle(Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
});

// DELETE /api/tasks/:id - delete a task
router.delete('/:id', (req, res) => {
  const ok = store.remove(Number(req.params.id));
  if (!ok) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.status(204).end();
});

module.exports = router;

// Simple in-memory task store. Resets on every server restart.

let tasks = [
  { id: 1, title: 'Read the project README', done: false },
  { id: 2, title: 'Run the dev server', done: false },
  { id: 3, title: 'Fix the bug', done: false },
];

let nextId = 4;

function getAll() {
  return tasks;
}

function getById(id) {
  return tasks.find((t) => t.id === id) || null;
}

function create(title) {
  const task = { id: nextId++, title, done: false };
  tasks.push(task);
  return task;
}

function toggle(id) {
  const task = getById(id);
  if (!task) return null;
  task.done = !task.done;
  return task;
}

function remove(id) {
  const before = tasks.length;
  tasks = tasks.filter((t) => t.id !== id);
  return tasks.length < before;
}

module.exports = { getAll, getById, create, toggle, remove };

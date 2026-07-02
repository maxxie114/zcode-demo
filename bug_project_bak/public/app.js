const API = '/api/tasks';

const listEl = document.getElementById('task-list');
const emptyEl = document.getElementById('empty-state');
const formEl = document.getElementById('new-task-form');
const inputEl = document.getElementById('new-task-input');

async function loadTasks() {
  const res = await fetch(API);
  const tasks = await res.json();
  render(tasks);
}

function render(tasks) {
  listEl.innerHTML = '';
  emptyEl.hidden = tasks.length > 0;

  for (const task of tasks) {
    const li = document.createElement('li');
    li.className = 'task' + (task.done ? ' done' : '');

    const toggle = document.createElement('input');
    toggle.type = 'checkbox';
    toggle.checked = task.done;
    toggle.addEventListener('change', () => toggleTask(task.id));

    const title = document.createElement('span');
    title.className = 'title';
    title.textContent = task.title;

    const del = document.createElement('button');
    del.textContent = '✕';
    del.addEventListener('click', () => deleteTask(task.id));

    li.append(toggle, title, del);
    listEl.appendChild(li);
  }
}

async function addTask(title) {
  await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  });
  await loadTasks();
}

async function toggleTask(id) {
  await fetch(`${API}/${id}`, { method: 'PATCH' });
  await loadTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, { method: 'DELETE' });
  await loadTasks();
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = inputEl.value.trim();
  if (!title) return;
  inputEl.value = '';
  addTask(title);
});

loadTasks();

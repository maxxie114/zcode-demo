const API = '/api/leads';

const formEl = document.getElementById('lead-form');
const nameEl = document.getElementById('name');
const notesEl = document.getElementById('notes');
const typeEl = document.getElementById('lead_type');
const priorityEl = document.getElementById('priority');
const errorEl = document.getElementById('form-error');

const listEl = document.getElementById('lead-list');
const emptyEl = document.getElementById('empty-state');

const PRIORITY_CLASS = { Hot: 'p-hot', Warm: 'p-warm', Medium: 'p-medium', Low: 'p-low' };

async function loadLeads() {
  const res = await fetch(API);
  const leads = await res.json();
  render(leads);
}

function render(leads) {
  listEl.innerHTML = '';
  emptyEl.hidden = leads.length > 0;

  for (const lead of leads) {
    const li = document.createElement('li');
    li.className = 'lead';

    const head = document.createElement('div');
    head.className = 'lead-head';

    const name = document.createElement('span');
    name.className = 'name';
    name.textContent = lead.name;

    const type = document.createElement('span');
    type.className = 'tag type';
    type.textContent = lead.lead_type;

    const prio = document.createElement('span');
    prio.className = 'tag priority ' + (PRIORITY_CLASS[lead.priority] || 'p-medium');
    prio.textContent = lead.priority;

    head.append(name, type, prio);

    const notes = document.createElement('p');
    notes.className = 'notes';
    notes.textContent = lead.notes || '(no notes)';

    const time = document.createElement('time');
    time.className = 'time';
    time.textContent = formatTime(lead.created_at);

    li.append(head, notes, time);
    listEl.appendChild(li);
  }
}

function formatTime(s) {
  // created_at is stored as UTC "YYYY-MM-DD HH:MM:SS"
  if (!s) return '';
  const d = new Date(s.replace(' ', 'T') + 'Z');
  if (isNaN(d)) return s;
  return d.toLocaleString();
}

async function addLead(payload) {
  errorEl.hidden = true;
  errorEl.textContent = '';
  const res = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    errorEl.textContent = body.error || 'Failed to save lead';
    errorEl.hidden = false;
    return false;
  }
  return true;
}

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = nameEl.value.trim();
  if (!name) return;

  const ok = await addLead({
    name,
    notes: notesEl.value.trim(),
    lead_type: typeEl.value,
    priority: priorityEl.value,
  });
  if (!ok) return;

  nameEl.value = '';
  notesEl.value = '';
  typeEl.value = 'Visitor';
  priorityEl.value = 'Medium';
  nameEl.focus();
  await loadLeads();
});

loadLeads();

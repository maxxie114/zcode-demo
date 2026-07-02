const express = require('express');
const router = express.Router();
const db = require('../data/db');

const ALLOWED_TYPES = ['Customer', 'Founder', 'Engineer', 'Investor', 'Partner', 'Visitor'];
const ALLOWED_PRIORITY = ['Hot', 'Warm', 'Medium', 'Low'];

// GET /api/leads - list all leads, newest first
router.get('/', (req, res) => {
  const leads = db.prepare('SELECT * FROM leads ORDER BY id DESC').all();
  res.json(leads);
});

// POST /api/leads - save a new lead
router.post('/', (req, res) => {
  const { name, notes, lead_type, priority } = req.body || {};

  if (!name || !String(name).trim()) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const safeType = ALLOWED_TYPES.includes(lead_type) ? lead_type : 'Visitor';
  const safePriority = ALLOWED_PRIORITY.includes(priority) ? priority : 'Medium';
  const safeNotes = notes ? String(notes).trim() : '';

  const result = db.prepare(
    'INSERT INTO leads (name, notes, lead_type, priority) VALUES (?, ?, ?, ?)'
  ).run(String(name).trim(), safeNotes, safeType, safePriority);

  const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(lead);
});

module.exports = router;

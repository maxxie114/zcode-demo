// Local SQLite database. Auto-creates the file and table on first run.
// Uses Node's built-in node:sqlite (Node >= 22.5.0), so no native deps needed.
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const DB_PATH = path.join(__dirname, 'leads.db');

const db = new DatabaseSync(DB_PATH);

// Create the leads table if it does not exist yet.
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    notes      TEXT    NOT NULL,
    lead_type  TEXT    NOT NULL DEFAULT 'Visitor',
    priority   TEXT    NOT NULL DEFAULT 'Medium',
    created_at TEXT    NOT NULL DEFAULT (datetime('now'))
  )
`);

module.exports = db;

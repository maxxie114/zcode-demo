# Booth Leads

A tiny booth lead-capture app for a live demo. Type a visitor's name, jot a quick
note, and save the lead to a local SQLite database. Saved leads appear instantly
in a list below the form.

- **Backend:** Node.js + Express, persisting to local SQLite (`node:sqlite`, no native deps).
- **Frontend:** Vanilla HTML/CSS/JS served as static files.

## Requirements

- Node.js **>= 22.5.0** (for the built-in `node:sqlite` module).

## Getting started

```bash
npm install
npm start
```

Then open http://localhost:3000 in your browser.

The SQLite database file is **auto-created** on first run — no manual setup needed.
If you ever want a clean slate, delete `data/leads.db` and restart; it will be recreated.

## Project layout

```
.
├── server.js          # Express app entry point
├── routes/
│   └── leads.js       # /api/leads REST routes (GET + POST)
├── data/
│   ├── db.js          # opens SQLite, auto-creates the leads table
│   └── leads.db       # the local SQLite database (auto-created)
└── public/            # static frontend (index.html, app.js, styles.css)
```

## API

| Method | Path          | Description                              | Body                                        |
| ------ | ------------- | ---------------------------------------- | ------------------------------------------- |
| GET    | `/api/leads`  | List all leads, newest first             | —                                           |
| POST   | `/api/leads`  | Save a new lead                          | `{ name, notes, lead_type, priority }`      |
| GET    | `/api/health` | Health check                             | —                                           |

### Lead fields

- `name` **(required)** — visitor name
- `notes` — free-text note about the visitor
- `lead_type` — one of `Visitor` (default), `Customer`, `Founder`, `Engineer`, `Investor`, `Partner`
- `priority` — one of `Medium` (default), `Hot`, `Warm`, `Low`
- `created_at` — set automatically by SQLite (`datetime('now')`)

## Testing save manually

```bash
# Save a lead
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Ada Lovelace","notes":"Asked about AI agents.","lead_type":"Founder","priority":"Hot"}'

# Read them back
curl http://localhost:3000/api/leads
```

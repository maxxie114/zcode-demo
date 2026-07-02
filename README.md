# Zcode Demo

A collection of five small, self-contained demo projects built with
**GLM-5.2 + Zcode**, designed for a ~5-minute conference-booth walkthrough.
Each project fits one idea and runs on its own port so you can show several
side by side.

> **Audience:** AI engineers, startup founders, and hackathon builders walking
> by a booth (e.g. AI Engineer World's Fair).

---

## Demos at a glance

| # | Project | Folder | Stack | Default port |
|---|---------|--------|-------|--------------|
| 1 | **Slide deck** — "Building faster with GLM-5.2 + Zcode" | [`slide_deck/`](slide_deck) | Static HTML/CSS/JS | `8000` |
| 2 | **Debugged TaskList** — full-stack CRUD, fixed live | [`bug_project/`](bug_project) | Node + Express | `3000` |
| 3 | **Booth lead capture** — SQLite-backed | [`booth_leads/`](booth_leads) | Node + Express + SQLite | `3000` |
| 4 | **UI replication** — Vercel landing clone | [`ui_replication/`](ui_replication) | Static HTML/CSS | `8002` |
| 5 | **Tetris** — browser game | [`tetris/`](tetris) | Static HTML/CSS/JS + Canvas | `8001` |

A tiny shared static-server helper, [`static.js`](static.js), serves any of the
static demos on a port of your choice.

---

## Requirements

- **Node.js ≥ 22.5.0** (for the built-in `node:sqlite` module used by booth leads).
- No other global installs. The two Express projects need `npm install` first;
  the three static demos need nothing.

---

## Quick start

Each demo is independent. Pick one and run it:

```bash
# 1. Slide deck (static)
cd slide_deck && PORT=8000 node server.js
#   → http://localhost:8000

# 2. Debugged TaskList (Express)
cd bug_project && npm install && PORT=3000 npm start
#   → http://localhost:3000

# 3. Booth lead capture (Express + SQLite)
cd booth_leads && npm install && PORT=3000 npm start
#   → http://localhost:3000

# 4. UI replication (static — single file)
cd .. && node static.js 8002 ui_replication/index.html
#   → http://localhost:8002

# 5. Tetris (static — single file)
node static.js 8001 tetris/index.html
#   → http://localhost:8001
```

To run **all five at once** on separate ports (e.g. for a booth), launch each in
its own terminal with distinct `PORT` values. A suggested layout:

| Port | Demo |
|------|------|
| `8000` | Slide deck |
| `8001` | Tetris |
| `8002` | UI replication |
| `8003` | Debugged TaskList (`PORT=8003`) |
| `8004` | Booth leads (`PORT=8004`) |

---

## Project details

### 1. `slide_deck/` — Conference slide deck
A polished, single-file HTML/CSS slide deck: **"Building faster with
GLM-5.2 + Zcode."** No external libraries, keyboard navigation
(`←`/`→`, `Space`, `Home`/`End`), click zones, touch swipe, progress dots, and
URL deep-linking (`#3`). 11 slides covering the problem with coding agents,
`/goal`, GLM-5.2 integration, benchmarks, the Coding Plan quota multiplier,
multi-device continuation, and a closing flow.

- `index.html` — the deck
- `server.js` — minimal dependency-free static server (binds `0.0.0.0`, LAN-reachable)

### 2. `bug_project/` — Debugged TaskList
A small full-stack task list: create, list, toggle-done, and delete tasks over a
REST API, with an in-memory store and a vanilla-JS frontend. Ships with a bug
that the agent debugs live: the tasks router previously exported an object
instead of an Express router, crashing on boot — now fixed. Demonstrates
planning → coding → debugging → verification in one loop.

- REST API under `/api/tasks` (`GET`, `POST`, `PATCH /:id`, `DELETE /:id`)
- Health check at `/api/health`
- See [`bug_project/README.md`](bug_project/README.md) for the API table.

### 3. `booth_leads/` — Booth lead capture
Capture a visitor's name, note, lead type, and priority, persisting each lead to
a local **SQLite** database via Node's built-in `node:sqlite` (no native deps).
The database file is auto-created on first run — delete `data/leads.db` to reset.

- Requires Node ≥ 22.5.0
- REST API under `/api/leads` (`GET`, `POST`); health check at `/api/health`
- See [`booth_leads/README.md`](booth_leads/README.md) for field definitions and
  `curl` examples.

### 4. `ui_replication/` — UI replication
A static recreation of the Vercel "Agentic Infrastructure" landing page, built
from a reference screenshot to demonstrate visual replication. Single
self-contained HTML file, no build step.

### 5. `tetris/` — Falling Blocks
A complete browser Tetris (canvas) in a single HTML file: explicit rotation
states, ghost piece, wall kicks, soft/hard drop, line-clear scoring, and levels.
No dependencies. Great for a hands-on "walk up and play" station.

---

## Repository layout

```
zcode-demo/
├── slide_deck/          # 1. Conference slide deck (static)
│   ├── index.html
│   └── server.js
├── bug_project/         # 2. Debugged TaskList (Express)
│   ├── server.js
│   ├── routes/tasks.js
│   ├── data/store.js
│   └── public/          # index.html, app.js, styles.css
├── booth_leads/         # 3. Booth lead capture (Express + SQLite)
│   ├── server.js
│   ├── routes/leads.js
│   ├── data/db.js       # opens SQLite; leads.db auto-created (gitignored)
│   └── public/
├── ui_replication/      # 4. UI replication (static, single file)
│   └── index.html
├── tetris/              # 5. Tetris game (static, single file)
│   └── index.html
└── static.js            # shared one-file static server for demos 4 & 5
```

---

## Notes

- `node_modules/`, lockfiles, and `*.db` files are gitignored — run
  `npm install` in `bug_project/` and `booth_leads/` before starting them.
- The SQLite database (`data/leads.db`) is regenerated on first run; it is never
  committed.
- Built as a live booth demo; benchmark and pricing figures referenced in the
  slide deck come from Z.ai's published materials and should be rechecked before
  presentation.

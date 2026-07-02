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
| 5 | **Ad-Tetris + AI** — branded Tetris with autoplay | [`tetris/`](tetris) | Static HTML/CSS/JS + Canvas | `8001` |

> **Before/after pair:** [`bug_project_bak/`](bug_project_bak) is the *unfixed*
> snapshot of the TaskList — it crashes on boot. Compare its
> `routes/tasks.js` against [`bug_project/`](bug_project) to see the bug and the
> fix side by side. See [Appendix: the TaskList bug](#appendix-the-tasklist-bug).

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

### 5. `tetris/` — Ad-Tetris + autoplay AI
Not just Tetris — it pulls triple duty as a **game, an advertisement, and an AI
demo**, all in one self-contained HTML file:

- **Tetris engine** — full canvas game with explicit per-piece rotation states
  (no matrix math), wall kicks, ghost piece, soft/hard drop, line-clear scoring,
  and levels. Playable by hand with `←/→` move, `↑/W` rotate, `↓/S` soft drop,
  `Space` hard drop, `P` pause, `R` restart.
- **Advertisement surface** — a 3-column layout frames the board with branded
  GLM-5.2 + Zcode ad panels: a hero ("Built in one shot with /goal"), stat cards
  (1M context, MIT open weights, 1.5× effective quota, SWE-bench Pro 62.1,
  vision-in-the-loop), `/goal` tags, and links to z.ai / zcode.z.ai. So the game
  advertises the product while visitors play.
- **Autoplay AI** — toggle with the **Start AI** button or `Q`. A
  **Dellacherie-style one-piece heuristic** plans each move: it simulates every
  rotation × column placement (`simulateLanding`), scores each resulting board on
  four features — aggregate height, completed lines, holes, bumpiness
  (`evaluateBoard`) with the classic published weights
  (`-0.510, 0.760, -0.357, -0.184`) — and steps toward the best target one
  atomic move per tick (`AI_TICK = 110ms`) so the play is watchable. A pulsing
  "GLM-5.2 IS PLAYING" badge appears while the AI drives.

---

## Repository layout

```
zcode-demo/
├── slide_deck/          # 1. Conference slide deck (static)
│   ├── index.html
│   └── server.js
├── bug_project/         # 2. Debugged TaskList (Express) — FIXED
│   ├── server.js
│   ├── routes/tasks.js
│   ├── data/store.js
│   └── public/          # index.html, app.js, styles.css
├── bug_project_bak/     #    unfixed snapshot of #2 — crashes on boot (see appendix)
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

---

## Appendix: the TaskList bug

`bug_project/` and `bug_project_bak/` are the same app in two states — **fixed**
and **unfixed** — kept side by side to show a debugging loop end-to-end.

**Symptom (unfixed):** the server crashes immediately on boot with

```
TypeError: Router.use() requires a middleware function but got a Object
    at ... (bug_project_bak/server.js:13:5)
```

**Root cause:** in [`bug_project_bak/routes/tasks.js`](bug_project_bak/routes/tasks.js)
the router is exported wrapped in an object…

```js
module.exports = { router };   // ❌ an Object, not a router
```

…but `server.js` mounts it expecting the router itself:

```js
const tasksRouter = require('./routes/tasks');
app.use('/api/tasks', tasksRouter);   // Express wants a function, gets an Object
```

**The fix:** export the router directly, matching the convention used by the
working `booth_leads` app — see [`bug_project/routes/tasks.js`](bug_project/routes/tasks.js):

```js
module.exports = router;   // ✅ the router function Express expects
```

That single-line change takes the app from a boot crash to a working CRUD server.

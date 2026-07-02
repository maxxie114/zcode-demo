# TaskList

A tiny full-stack task list app.

- **Backend:** Node.js + Express, with an in-memory data store.
- **Frontend:** Vanilla HTML/CSS/JS served as static files.

## Getting started

```bash
npm install
npm start
```

Then open http://localhost:3000 in your browser.

## Project layout

```
.
├── server.js          # Express app entry point
├── routes/
│   └── tasks.js       # /api/tasks REST routes
├── data/
│   └── store.js       # in-memory task store
└── public/            # static frontend (index.html, app.js, styles.css)
```

## API

| Method | Path              | Description          |
| ------ | ----------------- | -------------------- |
| GET    | `/api/tasks`      | List all tasks       |
| GET    | `/api/tasks/:id`  | Get a single task    |
| POST   | `/api/tasks`      | Create a task        |
| PATCH  | `/api/tasks/:id`  | Toggle done state    |
| DELETE | `/api/tasks/:id`  | Delete a task        |

# Website 2026 — Bourna Consultants Engineers

Marketing site for the structural consultancy.

## Quick start

```bash
cd web
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Important files

| Path | Purpose |
|------|---------|
| `PROGRESS.md` | **Handoff tracker** — status, content, next steps for any agent |
| `web/` | Vite + React + TypeScript app |
| `web/src/data/content.ts` | All site copy, projects, clients, contact |
| `bceLogo.jpg` / profile / PDFs | Source materials at repo root |

## When project photos arrive

1. Add images to `web/public/projects/`
2. Set `image: '/projects/your-file.jpg'` on matching entries in `featuredProjects` inside `content.ts`
3. Update `PROGRESS.md`

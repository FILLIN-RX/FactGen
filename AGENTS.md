# FactGen — Repo guide

## Structure

Three independent packages in one repo (no workspace tool):

| Directory | Role | Stack | Entry |
|---|---|---|---|
| `fact-gen/` | Frontend | Vue 3 + Vite + TailwindCSS v4 + Pinia | `fact-gen/src/main.js` |
| `factgen-backend/` | API server | Express 5 + Supabase (ESM) | `factgen-backend/server.js` |
| `pdf-service/` | PDF microservice | Flask + WeasyPrint + Gunicorn | `pdf-service/app.py` |

## Commands

### Frontend (`fact-gen/`)
- `npm run dev` — Vite dev server (port 5173)
- `npm run build` — Vite production build
- `npm run preview` — Vite preview

No lint, typecheck, or test scripts exist.

### Backend (`factgen-backend/`)
- `npm start` — `node server.js`
- Use `nodemon` for dev: `npx nodemon server.js` (port 4000)
- ESM (`"type": "module"`); all imports use `.js` extension

### PDF Service (`pdf-service/`)
- `python app.py` — Flask dev server (port 8000)
- `gunicorn app:app --bind 0.0.0.0:$PORT` — Production (Heroku-style)
- Python 3.10.13 (`runtime.txt`)

## Env vars

| Package | Vars |
|---|---|
| `fact-gen` | `VITE_SUPAURL`, `VITE_SUPAKEY` |
| `factgen-backend` | `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `PORT` (default 4000) |
| `pdf-service` | `PORT` (default 8000) |

No `.env.example` files exist. Create `.env` in each package root.

## Architecture

### Frontend — communicates directly with Supabase (no Express backend for data)
- `@/` → `fact-gen/src/` (Vite alias)
- `vue` mapped to `vue/dist/vue.esm-bundler.js` for template compilation
- All CRUD operations use `supabase` client from `src/lib/supabase.js` via `src/shared/services/api.js`
- Auth: Supabase. Store initialized **before** app mount (`main.js:25`). `authStore.initialize()` → then `app.mount()`
- UI: TailwindCSS v4 (Vite plugin), dark mode via `class` strategy, Material 3 design tokens
- i18n: `vue-i18n`, default locale `fr`, fallback `en`, messages in `src/locales/{fr,en}.json`
- `@iconify/vue` registered globally as `<Icon>`
- Modules (feature-based): `Auth/`, `Client/`, `Dashboard/`, `Invoice/`, `Landing/`, `Settings/`
- Router guard in `src/router/index.js:119` — checks `authStore.isAuthenticated`
- Deploys to Vercel via SPA rewrite rule (`vercel.json`)
- PDF generation: calls `https://invoiceapi-lfca.onrender.com/pdf/` directly (Flask WeasyPrint service)
- `axios` only retained for PDF download; all data APIs removed from axios instance

### Backend — standalone (frontend no longer depends on it)
- API prefix: `/api` — routes mounted in `server.js:72-77`
  - `/api/clients`, `/api/factures`, `/api/statistiques`, `/api/pdf`, `/api/pdf/from-python`, `/api/info`, `/api/health`
- Auth middleware (`middleware/auth.js`): extracts Bearer token, verifies via Supabase service role key, attaches `req.user`
- Supabase client has 20s timeout; auth uses 15s
- CORS: `localhost:5173` and `fact-gen.vercel.app`
- PDF generation has two paths:
  1. **Puppeteer** (`/api/pdf/*`) — `controller/pdf.js`, renders HTML/URL to PDF
  2. **Python proxy** (`/api/pdf/from-python`) — `controller/pythonPdf.js`, forwards HTML to external Flask service at `https://invoiceapi-lfca.onrender.com/pdf/`
- Template: `templates/facture-pro.html` (Jinja-style, used by Puppeteer path)

### PDF Service
- Single endpoint: `POST /generate-pdf` with `{ html }` body
- Uses WeasyPrint for HTML→PDF conversion

## Key patterns
- Supabase token stored in `localStorage` under key `supabase_token`
- All API functions in `api.js` call `supabase.from(...)` directly, using `getUserId()` from auth store
- `telechargerPDF()` calls the Flask PDF service directly via `fetch()` (no Express proxy)
- Backend creates a *new* Supabase client per request in auth middleware with `service_role` key
- Stats controller uses `service_role` key directly, not `req.supabase`
- Exchange rates: `api.exchangerate.host` (hardcoded in `factureRoutes.js`)
- Reductions stored as JSON objects with `valeurCalculee` field

## Quirks
- No tests anywhere
- No lint/format scripts
- `daisyUI` is a dev dependency in frontend but not imported in tailwind config plugins; may be unused
- `mysql2` listed in backend deps but only Supabase is used
- Vite config: `@tailwindcss/vite` plugin (v4 style) but legacy `tailwind.config.js` also exists
- `naive-ui` added as dependency; install with `npm install` in `fact-gen/`

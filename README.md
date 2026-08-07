# Lakshmi Organic Farm

Farm-to-home vegetable delivery platform — Sonpur, Bihar. React (Vite) frontend + FastAPI backend + PostgreSQL.

## Phase Tracker

| Phase | Deliverable | Status |
|---|---|---|
| 1 | Analyze existing HTML pages | ✅ Done |
| 2 | React architecture (routing, folder scaffold, design tokens) | ✅ Done |
| 3 | Convert Homepage | ✅ Done |
| 4 | Convert Products (live API fetch, no hardcoded data) | ✅ Done |
| 5 | Convert Subscription | ✅ Done |
| 6 | Convert Our Farm | ✅ Done |
| 7 | Backend scaffold (FastAPI structure, auth) | ✅ Done |
| 8 | PostgreSQL schema + Alembic migrations | ✅ Done |
| 9 | Admin Dashboard (Products CRUD functional; Inventory/Analytics placeholders) | ✅ Done |
| 10 | Connect frontend to live API | ✅ Done — Products page and Admin Products both call the real API; nothing is hardcoded |
| 11 | Deployment prep (Vercel + Railway + Supabase + Cloudinary) | ✅ Config included below — actual deploy requires your account credentials |

> Note carried from Phase 1: `/delivery` was added as a route even though it wasn't in the original approved list, since the Delivery Areas page already existed. Remove `client/src/pages/DeliveryAreas.jsx` and its route in `App.jsx` if you'd rather fold that content into Home's `#delivery` section instead.

---

## 1. Local Development Setup

### Prerequisites
- Node.js 18+
- Python 3.11+
- Docker (for local Postgres) — or your own local Postgres instance
- A Cloudinary account (free tier is fine) for image uploads
- A Supabase project (for production Postgres) when you're ready to deploy

### Backend

```bash
cd server
cp .env.example .env        # fill in real values, especially JWT_SECRET and Cloudinary keys
python -m venv venv
source venv/bin/activate    # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Start Postgres locally (or point DATABASE_URL at Supabase directly)
docker compose up -d db     # run from the repo root, not server/

# Run migrations
alembic upgrade head

# Create the first admin login (reads ADMIN_EMAIL / ADMIN_PASSWORD from .env)
python -m app.database.seed

# Start the API
uvicorn main:app --reload
```

API docs available at `http://localhost:8000/docs` once running.

### Frontend

```bash
cd client
cp .env.example .env        # VITE_API_BASE_URL should point at your running backend
npm install
npm run dev
```

Site available at `http://localhost:5173`. Admin panel at `http://localhost:5173/admin/login`.

### Everything via Docker Compose (backend + db only — run client separately)

```bash
docker compose up --build
```

---

## 2. API Reference

| Method | Path | Auth | Purpose |
|---|---|---|---|
| GET | `/products` | Public | List products. Optional `?category=` and `?search=` |
| GET | `/products/{id}` | Public | Single product |
| GET | `/today` | Public | Products marked `fresh_today` and `available` |
| POST | `/products` | Admin (JWT) | Create product |
| PUT | `/products/{id}` | Admin (JWT) | Update product (partial — send only changed fields) |
| DELETE | `/products/{id}` | Admin (JWT) | Delete product |
| POST | `/upload` | Admin (JWT) | Upload a product image to Cloudinary, returns `{ url }` |
| POST | `/auth/login` | Public | `{ email, password }` → `{ access_token }` |
| GET | `/auth/me` | Admin (JWT) | Confirms the current token and returns the admin's email |
| GET | `/health` | Public | Health check for deployment monitoring |

All admin endpoints expect `Authorization: Bearer <token>`.

---

## 3. Deployment

### Database — Supabase
1. Create a new Supabase project.
2. Copy the connection string (use the **pooled** connection string for serverless-friendly deployments) into `server/.env` as `DATABASE_URL`.
3. Run `alembic upgrade head` once, pointed at Supabase, to create tables.
4. Run the seed script once to create your real admin login, then **change `ADMIN_PASSWORD` in `.env` immediately after first login** (there's no in-app password change yet — Settings is a placeholder module).

### Images — Cloudinary
1. Create a free Cloudinary account.
2. Copy `Cloud Name`, `API Key`, `API Secret` into `server/.env`.

### Backend — Railway
1. New Railway project → deploy from this repo, root directory `server/`.
2. Add all variables from `server/.env.example` as Railway environment variables (use your real Supabase/Cloudinary/JWT values).
3. Railway will build from the included `Dockerfile` automatically.
4. Note the generated public URL — you'll need it for the frontend's `VITE_API_BASE_URL`.

### Frontend — Vercel
1. New Vercel project → import this repo, root directory `client/`.
2. Framework preset: Vite.
3. Add environment variable `VITE_API_BASE_URL` = your Railway backend URL.
4. Add `VITE_SURVEY_URL` = your real Google Form link.
5. Deploy.

### After first deploy
- Update `CORS_ORIGINS` in the backend's environment variables to include your real Vercel domain (comma-separated if you need more than one).
- Confirm `/admin/login` works against the live backend before handing credentials to the farmer/admin.

---

## 4. What's Deliberately Out of Scope for v1

Per the project brief, these are placeholders or not yet built — flagged so nothing here is mistaken for "forgotten":
- Customer accounts/login (admin-only auth in v1)
- Inventory module beyond per-product quantity editing (`AdminInventory.jsx` is a placeholder)
- Analytics/Power BI-style dashboards (`AdminAnalytics.jsx` is a placeholder)
- Payments, order history, delivery tracking
- AI features (recommendation engine, demand forecasting, chatbot) — architecture is left open for these (clean service-layer separation, typed schemas) but none are implemented

---

## 5. Full Project Structure

See inline comments in `App.jsx` and each folder for specifics. High-level:

```
lakshmi-organic-farm/
├── client/     # React + Vite frontend (see client/src for components, pages, services)
├── server/     # FastAPI backend (see server/app for models, schemas, api routes)
├── docker-compose.yml
└── README.md   # this file
```

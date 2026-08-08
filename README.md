# Lakshmi Organic Farm

Farm-to-home vegetable delivery platform — Sonpur, Bihar. React (Vite) frontend + FastAPI backend + PostgreSQL.

## 🌐 Live Project

### Live Website
https://lakshmi-organic-farm.vercel.app

### Backend API
https://lakshmi-organic-farm.onrender.com

### API Documentation
https://lakshmi-organic-farm.onrender.com/docs

### GitHub Repository
https://github.com/Ritik-yadav-934/lakshmi-organic-farm

---

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

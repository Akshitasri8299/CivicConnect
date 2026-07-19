# CivicConnect

A Smart Complaint & Grievance Management Portal for citizens to file civic issues
(potholes, garbage, streetlights, water supply, etc.) and track their resolution status.

Built with the MERN stack (MongoDB, Express, React, Node.js). Plain CSS only — no
Tailwind or other CSS frameworks.

## Project structure

```
civic-connect/
├── backend/   Express + MongoDB + JWT auth API (port 5000)
└── frontend/  React + Vite app, plain CSS (port 5173)
```

## Prerequisites

- Node.js 18+
- A running MongoDB instance (local, or a free cloud one from MongoDB Atlas)

## 1. Backend setup

```bash
cd backend
npm install
cp .env.example .env
```

Open `.env` and fill in:
- `MONGO_URI` — your MongoDB connection string
- `JWT_SECRET` — any long random string
- (optional) `ADMIN_NAME` / `ADMIN_EMAIL` / `ADMIN_PASSWORD` — used only by the seed script

Create an admin account:

```bash
npm run seed:admin
```

Start the backend:

```bash
npm run dev
```

The API will run at `http://localhost:5000`. Check `http://localhost:5000/api/health`
to confirm it's up — it should return `{ "status": "ok" }`.

## 2. Frontend setup

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The app will run at `http://localhost:5173`.

## 3. Using the app

1. Go to `http://localhost:5173`, click **Register**, and create a citizen account.
2. File a complaint from the Dashboard — you'll get a tracking ID like `GRV-2607-0001`.
3. Click into the complaint to see its detail page and status timeline.
4. Log out, then log back in with the admin account you seeded (`npm run seed:admin`
   prints the email/password if you didn't set your own in `.env`).
5. From the Admin Dashboard, open a complaint and change its status. Log back in
   as the citizen to see the update reflected.

## Notes

- All complaint status changes are recorded in `statusHistory` on the complaint,
  which powers the timeline on the detail page.
- The backend validates `JWT_SECRET` and `MONGO_URI` are set on startup and will
  exit with a clear error message if they're missing, rather than failing silently.
- CORS is configured via `CLIENT_ORIGIN` in `backend/.env` (defaults to
  `http://localhost:5173`, Vite's default port).

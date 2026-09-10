# CampusConnect

CampusConnect combines the restored LPUdesk React/Vite library experience with a
production-structured complaint and suggestion API.

## Run locally

### API

```powershell
cd backend
copy .env.example .env
# Set MONGODB_URI, JWT_SECRET, and CLIENT_ORIGIN in .env
npm install
npm run dev
```

### Frontend

```powershell
cd lpudesk
npm install
npm run dev
```

The frontend defaults to `http://localhost:5000/api`; set `VITE_API_URL` when the
API is hosted elsewhere. Authentication remains in an HTTP-only cookie and is never
stored in frontend JavaScript.

See [backend/README.md](backend/README.md) for API areas and role details.

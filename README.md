# BanglaCanvas — Bengali Poster Store

- `customer-frontend/` — React + Vite + Tailwind storefront (Firebase Hosting)
- `admin-panel/` — React + Vite + Tailwind admin dashboard (runs locally)
- `backend/` — Django REST API (to be built)

## Run the storefront
```bash
cd customer-frontend
npm install
npm run dev        # http://localhost:5173
```
## Run the admin panel
```bash
cd admin-panel
npm install
npm run dev        # http://localhost:5174  (demo login: any email + password, 6+ chars)
```
Both apps use mock data in `src/data` served through `src/services`. When the Django API exists, change only the function bodies in `services/` — pages stay the same. Copy `.env.example` to `.env` and set `VITE_API_URL`.

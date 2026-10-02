# ExTracke Expense Tracker

React + Vite expense tracker frontend with authentication, expense management, dashboard statistics, AI insights, responsive styling, and dark mode.

## Local development

```bash
npm install
npm run dev
```

The default API is the deployed backend. To use another backend, copy `.env.example` to `.env.local` and set `VITE_API_BASE_URL` to its `/api/v1` URL.

## Vercel deployment

Import this repository into Vercel with these settings:

- Framework preset: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

The included `vercel.json` rewrites client-side routes such as `/login`, `/register`, and `/dashboard` to the Vite entry point so refreshes work correctly.

Optional environment variable:

```text
VITE_API_BASE_URL=https://expenseback-ciwj.onrender.com/api/v1
```

After deployment, verify registration, login, dashboard loading, adding/editing/deleting expenses, AI chat, and the responsive layout on the deployed URL.

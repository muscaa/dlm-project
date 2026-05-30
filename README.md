# DLM Trading

A TanStack Start + React + Tailwind dashboard for market watchlists.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Structure

```txt
src/
  features/home/     Home page UI, data, and shared home components
  routes/            TanStack Router route entry files
  styles/            Global Tailwind and theme styles
```

Routes stay small and import feature pages from `src/features`.

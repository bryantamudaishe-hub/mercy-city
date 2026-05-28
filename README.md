# AFM Mercy City Assembly

A premium React + Vite website for Apostolic Church in Zimbabwe Mercy City Assembly.

## Setup

```bash
npm create vite@latest afm-mercy-city -- --template react
cd afm-mercy-city
npm install
npm install react-router-dom framer-motion lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
npm run dev
```

## Project structure

- `src/components/` - reusable UI sections
- `src/pages/` - main website pages
- `src/data/` - sermon, event, ministry placeholder data
- `public/images/` - placeholder images

## Notes

- Replace the placeholder images in `public/images/` with ministry photography.
- The contact form is frontend-only and can be integrated later with EmailJS or a backend.



# FitLog — Workout Library

A dark, responsive workout library built from the FitLog Figma brief. Browse exercises, inspect workout details, build a five-lift daily plan, save workouts for later, and keep the plan across reloads with localStorage.

## Technologies
- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Heroicons
- FitLog REST API
- localStorage for client-side persistence

## Key features
1. Responsive Figma-inspired dark UI for mobile, tablet, and desktop.
2. Home library with API-powered workout cards, search, and Duration/Calories/Rating sorting.
3. Dedicated dynamic workout detail pages with specs, instructions, and actions.
4. Today's Plan capped at five lifts with live metrics for exercises, minutes, and calories.
5. Saved workouts tab with remove actions.
6. Toast notifications for plan/save/done/remove interactions.
7. localStorage persistence across page reloads.
8. Custom 404 page and loading skeletons while API data loads.

## API
- All workouts: `https://api.abcz.workers.dev/api/fitlog`
- Single workout: `https://api.abcz.workers.dev/api/fitlog/:id`

## Deployment

The app is designed for Next.js hosting such as Netlify. Set no API secret; the public FitLog API is used directly.

## Run locally
```bash
npm install
npm run dev
```
Then open `http://localhost:3000`.






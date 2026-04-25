# Location Finder

Barikoi-powered location search app built with Next.js, TypeScript, Redux, and Tailwind CSS.

This repository started as a boilerplate, but the assignment goal is a focused web app where users can search for a place, view autocomplete suggestions, and open the selected result on an interactive map. Barikoi API access should stay server-side through Next.js route handlers.

## What This App Does

- Search for locations in Bangladesh with autocomplete suggestions.
- Show the selected location on a full-screen interactive map.
- Place a marker on the chosen coordinates.
- Show an info popup with the location name and address.
- Keep the Barikoi API key out of client-side bundles.

## Tech Stack

- Next.js 15
- React 19
- TypeScript 5.8
- Redux Toolkit
- Tailwind CSS
- shadcn/ui
- `react-bkoi-gl`
- `barikoiapis`

## Project Structure

```txt
src/
├── app/                # App Router pages, layouts, and route handlers
├── components/         # Reusable UI and feature components
│   ├── shared/         # Shared app-level components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom hooks
├── lib/                # Utilities and configuration helpers
├── styles/             # Global CSS
├── types/              # TypeScript types
├── utils/              # Constants and helper functions
├── env.ts              # Environment validation
└── middleware.ts       # Middleware
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy the example file and add your values:

```bash
cp .env.example .env.local
```

The current starter still validates `DATABASE_URL`, so keep that value if you are running the boilerplate as-is.

For the Barikoi assignment, configure the Barikoi keys you plan to use:

```bash
BARIKOI_API_KEY=your_server_side_api_key
NEXT_PUBLIC_BARIKOI_MAP_KEY=your_public_map_tile_key
```

Keep `BARIKOI_API_KEY` server-side only. The public map tile key can be exposed to the browser because it is used only for map rendering.

### 3. Run the app

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run type-check
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run knip
npm run codehawk
npm run storybook
npm run build-storybook
npm run analyze
```

## Security Notes

- Do not expose `BARIKOI_API_KEY` in client-side code.
- Proxy Barikoi autocomplete and related API requests through server-side route handlers.
- Keep `.env.local` out of version control.

## Trade-offs Made

- I focused on the core map search flow first instead of adding extra product features like saved places, directions, or user accounts.
- I kept the UI intentionally simple so the app stays easy to understand, responsive, and close to the assignment brief.
- I planned Barikoi access through a server-side proxy route rather than introducing a larger data-fetching layer too early.
- I would rather deliver a secure, working map search experience than spend time on non-essential polish that does not change the core demo.

## If The App Needs To Scale

The first refactor I would make is to separate Barikoi access and map state into dedicated layers:

- Move Barikoi calls into a typed service module or API layer.
- Use Redux slices or RTK Query for search state, selected place state, and request caching.
- Split the map page into focused components such as `SearchBar`, `SuggestionList`, `MapView`, `MarkerLayer`, and `LocationPopup`.
- Add stronger validation and testing around the search API route before expanding the feature set.

## Notes

- No design files or Figma references were provided for this assignment, so the UI should follow professional judgment and map-product best practices.
- The current codebase is a starter template, so some boilerplate files may still exist until the map experience is implemented.

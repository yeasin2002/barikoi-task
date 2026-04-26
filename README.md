# Barikoi Task - Map App

Barikoi-powered location search app built with Next.js, TypeScript, Redux, and Tailwind CSS.

## What feature included

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
└── middleware.ts       # Middleware
```

## Setup

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

Copy the example file and add your values:

```bash
cp .env.example .env.local
```


For the Barikoi assignment, configure the Barikoi keys you plan to use:

```bash
BARIKOI_API_KEY=your_server_side_api_key
NEXT_PUBLIC_BARIKOI_MAP_KEY=your_public_map_tile_key
```

### 3. Run the app

```bash
pnpm run dev
```

Then open `http://localhost:3000`.

## Available Scripts

```bash
pnpm run dev
pnpm run build
pnpm run start

# Linting
pnpm run type-check
pnpm run lint
pnpm run lint:fix
pnpm run format
pnpm run format:check

# Quality Assurance
pnpm run knip
pnpm run codehawk
pnpm run analyze
```


## If The App Needs To Scale

The first refactor I would make is to separate Barikoi access and map state into dedicated layers:

- Move Barikoi calls into a typed service module or API layer.
- Use Redux slices or RTK Query for search state, selected place state, and request caching.
- Split the map page into focused components such as `SearchBar`, `SuggestionList`, `MapView`, `MarkerLayer`, and `LocationPopup`.
- Add stronger validation and testing around the search API route before expanding the feature set.

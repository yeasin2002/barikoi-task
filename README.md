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


##  Follow-up questions. 
### What trade-offs did you consciously make due to time constraints?

**Answer:** Due to time constraints, I made a few deliberate decisions. Firstly, I initialized this project using my own [bulletproof Next.js starter](https://github.com/yeasin2002/bulletproof-nextjs-starter) template so I could start quickly. It already includes most of the setup I usually need to kick off a project.

Secondly, I avoided adding extra features and focused only on the core part: allowing users to search locations and view them on a map. Since the Barikoi website supports AI agents to better understand their API, I used Claude to generate my `AGENTS.md` file. It includes details about my project and ideas, which helped with better auto-selection and gave me a rough direction.

Along with that, using AI and my own research, I focused only on the essential APIs from their NPM package that were required for this use case. I built the core functionality first and then did some minor refactoring afterward.

<br/>

### If this app needed to scale (more data, more features), what would you refactor first?

**Answer:** I would start by refactoring the code to separate Barikoi access and map state into dedicated layers. This would make the system easier to scale and maintain.

Right now, this is a very minimal version of the application. If we want to support more data and features, the structure needs to evolve accordingly. Scaling itself is a broad topic, and it’s not something we can fully define upfront. But we can ensure that we follow solid best practices, design patterns, and principles so the system stays maintainable.

Depending on future needs, we might introduce code splitting, lazy loading, caching strategies, debouncing, throttling, or other optimizations where necessary.
Vercel provide [best practice guideline ](https://vercel.com/guides/building-an-optimized-nextjs-app) that we can use, and if we are using any engine, they can use it. Besides, we have to follow [bulletproof react](https://github.com/alan2207/bulletproof-react) Guideline to create new modules or folder structure: we can define just like this so that we can refactor and scale if needed.  


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

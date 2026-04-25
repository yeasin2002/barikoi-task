# Business Requirements Document
## Location Finder — Barikoi-Powered Interactive Map Application

| Field | Value |
|-------|-------|
| Document Type | Business Requirements Document (BRD) |
| Version | 1.0 |
| Status | Draft |
| Date | April 24, 2026 |
| Prepared For | Barikoi Technologies Limited |
| Scope | Location Search & Map Visualisation |

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Product Goal](#2-product-goal)
3. [Stakeholders](#3-stakeholders)
4. [Scope](#4-scope)
5. [Functional Requirements](#5-functional-requirements)
6. [UI / UX Guidelines](#6-ui--ux-guidelines)
7. [Technical Stack](#7-technical-stack)
8. [API Reference](#8-api-reference)
9. [Security Requirements](#9-security-requirements)
10. [Non-Functional Requirements](#10-non-functional-requirements)
11. [Acceptance Criteria](#11-acceptance-criteria)
12. [Appendix — AI / LLM Documentation Access](#12-appendix--ai--llm-documentation-access)

---

## 1. Executive Summary

Location Finder is a Next.js web application that provides users with an interactive, Google Maps-style interface to search for any location and immediately visualise it on a vector map rendered by Barikoi's mapping platform. The application is scoped to two core user-facing features: **location search** and **map visualisation**. All mapping and geocoding functionality is delivered exclusively through Barikoi's official npm libraries.

---

## 2. Product Goal

| Goal | Description |
|------|-------------|
| **Primary Goal** | Enable users to search for any place, address, or point-of-interest in Bangladesh and instantly view its location on an interactive map. |
| **User Experience Target** | Match the interaction paradigm of Google Maps — a prominent search bar overlaying a full-screen map, with search results displayed as a dropdown list and a pin marker placed on the selected location. |
| **Technology Goal** | Demonstrate proficiency with Barikoi's `react-bkoi-gl` and `barikoiapis` npm packages inside a production-grade Next.js + TypeScript + Redux + Tailwind CSS project. |
| **Security Goal** | Ensure the Barikoi API key is never exposed in client-side bundles by proxying all API requests through Next.js server-side routes. |

---

## 3. Stakeholders

| Role | Party | Interest |
|------|-------|----------|
| Recruitment Panel | Barikoi Technologies Limited | Evaluates submission against assignment criteria |
| Developer | Candidate (Frontend Engineer) | Implements and delivers the application |
| End User | General Public | Uses the app to search and view locations |

---

## 4. Scope

### In Scope

- User can type a search query and receive autocomplete location suggestions.
- User can select a suggestion from the dropdown and the map pans / zooms to that location.
- A marker pin is placed on the map at the selected location's coordinates.
- A popup / info card displays the location name and address on marker click.
- API key secured via Next.js server-side API route (never exposed client-side).
- Responsive, full-screen map layout inspired by Google Maps.

### Out of Scope

- Turn-by-turn routing or directions.
- User authentication or account management.
- Saving or sharing favourite locations.
- Offline map support.
- Mobile native application (iOS / Android).

---

## 5. Functional Requirements

### 5.1 Location Search (FR-01)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01-1 | The application shall display a persistent search input visible at all times over the map. | Must Have |
| FR-01-2 | As the user types, autocomplete suggestions shall appear after a 300 ms debounce. | Must Have |
| FR-01-3 | Suggestions shall include place name, area, and city retrieved via `barikoiapis.autocomplete()`. | Must Have |
| FR-01-4 | A minimum of 1 character shall trigger the autocomplete request. | Must Have |
| FR-01-5 | The user may clear the search field; the map shall return to the default view. | Should Have |
| FR-01-6 | Keyboard navigation (arrow keys + Enter) shall work within the suggestion dropdown. | Should Have |
| FR-01-7 | An empty-state message shall display when no results are returned. | Must Have |
| FR-01-8 | All API calls for search shall be proxied through `/api/search` to protect the API key. | Must Have |

### 5.2 Map Visualisation (FR-02)

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-02-1 | The application shall render a full-screen interactive vector map on page load using `react-bkoi-gl` `<Map>` component. | Must Have |
| FR-02-2 | Default centre shall be Dhaka, Bangladesh `[90.4071, 23.7925]` at zoom level 12. | Must Have |
| FR-02-3 | On location selection, the map shall fly/pan to the selected location's `[longitude, latitude]`. | Must Have |
| FR-02-4 | A `<Marker>` shall be placed at the selected coordinates. | Must Have |
| FR-02-5 | Clicking the marker shall open a `<Popup>` showing the full address. | Must Have |
| FR-02-6 | A `<NavigationControl>` (zoom in/out + compass) shall be present. | Should Have |
| FR-02-7 | Map shall support standard gestures: scroll-to-zoom, click-drag-to-pan. | Must Have |
| FR-02-8 | Map style shall use the Barikoi Light tile set (`osm-liberty` or `barikoi-light`). | Must Have |

---

## 6. UI / UX Guidelines

> **Reference design:** Google Maps Web (maps.google.com). No Figma file is provided; professional judgement is expected.

| Element | Specification |
|---------|---------------|
| **Layout** | Full-screen map as the base layer. All UI controls float above it. |
| **Search Bar** | Fixed top-left (or top-center) position. Width: 320–400 px on desktop, 100% on mobile. White background, shadow, rounded corners. |
| **Suggestions** | Absolute-positioned dropdown below the search bar. Max height 320 px with scroll. Each row: bold place name + muted area/city subtitle. |
| **Marker** | Standard pin icon in Barikoi brand blue (`#1A56DB`) or red. Single marker at a time — previous marker replaced on new selection. |
| **Popup** | Clean card with place name (bold) and full address text. Closable via X button. |
| **Controls** | `NavigationControl` top-right. `GeolocateControl` optional. |
| **Responsiveness** | Fully usable on mobile viewport (375 px). Search bar collapses gracefully. |
| **Loading State** | Spinner or skeleton visible in dropdown while API request is in-flight. |

---

## 7. Technical Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Next.js 14+ (App Router recommended) | Core framework, server routes for API proxy |
| Language | TypeScript 5+ | Full type safety across all modules |
| State Management | Redux Toolkit | Global map state (selected location, search results) |
| Styling | Tailwind CSS v3 | Utility-first responsive styling |
| Map Rendering | `react-bkoi-gl` | React wrapper around Barikoi MapLibre GL JS |
| Location APIs | `barikoiapis` | Autocomplete, place details, geocoding |
| API Key Security | Next.js API Routes (`/api/*`) | Server-side proxy — key stored in `.env.local` |
| Package Manager | npm (or yarn / pnpm) | Dependency management |

---

## 8. API Reference

### 8.1 `react-bkoi-gl`

A suite of React components providing a React API for Barikoi Maps, built on MapLibre GL JS with full TypeScript support and WebGL rendering.

| Field | Value |
|-------|-------|
| Package | `react-bkoi-gl` |
| Install | `npm install react-bkoi-gl` |
| Style import | `import "react-bkoi-gl/styles";` |
| React requirement | `react >= 16.3` |
| Docs | https://docs.barikoi.com/npm/Barikoi%20React%20GL/react-bkoi-gl-intro |
| npm | https://www.npmjs.com/package/react-bkoi-gl |

#### `<Map>` — Core Component

All other components must be children of `<Map>`.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `mapStyle` | `string \| StyleSpecification` | Required | Map style URL (include API key as query param) |
| `initialViewState` | `object` | — | `{ longitude, latitude, zoom, pitch, bearing }` |
| `viewState` | `object` | — | Controlled view state (use with `onMove`) |
| `style` | `CSSProperties` | — | Container CSS — set `width`/`height` here |
| `onClick` | `(e: MapLayerMouseEvent) => void` | — | Map click handler |
| `onLoad` | `(e: MapLibreEvent) => void` | — | Fires when map tiles finish loading |
| `onMoveEnd` | `(e: ViewStateChangeEvent) => void` | — | Fires after pan/zoom completes |
| `onError` | `(e: ErrorEvent) => void` | — | Map error handler |
| `reuseMaps` | `boolean` | `false` | Reuse WebGL context for performance |
| `ref` | `RefObject<MapRef>` | — | Access imperative map methods |

#### Map Style URLs

```
# Light (default)
https://map.barikoi.com/styles/osm-liberty/style.json?key=YOUR_KEY

# Barikoi Light
https://map.barikoi.com/styles/barikoi-light/style.json?key=YOUR_KEY

# Dark Mode
https://map.barikoi.com/styles/barikoi-dark-mode/style.json?key=YOUR_KEY
```

#### Zoom Level Reference

| Zoom | What You See |
|------|-------------|
| 0–3 | Continents / Countries |
| 4–6 | Large regions |
| 7–10 | Cities |
| 11–14 | Neighbourhoods |
| 15–18 | Streets |
| 19–22 | Buildings |

#### `<Marker>` Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `longitude` | `number` | Required | Marker longitude |
| `latitude` | `number` | Required | Marker latitude |
| `color` | `string` | — | Pin colour (hex or named) |
| `draggable` | `boolean` | `false` | Enable drag interaction |
| `scale` | `number` | `1` | Marker scale multiplier |
| `anchor` | `string` | `'center'` | Anchor point relative to coordinates |
| `onClick` | `(e: MarkerEvent) => void` | — | Click handler |
| `onDragEnd` | `(e: MarkerDragEvent) => void` | — | Drag-end handler with `lngLat` |
| `children` | `ReactNode` | — | Custom marker JSX — replaces default pin |

#### `<Popup>` Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `longitude` | `number` | Required | Popup longitude |
| `latitude` | `number` | Required | Popup latitude |
| `anchor` | `string` | — | Popup anchor direction (`top`, `bottom`, `left`, `right`…) |
| `offset` | `number` | — | Pixel offset from coordinates |
| `onClose` | `function` | — | Fired when user closes popup |
| `closeButton` | `boolean` | `true` | Show default close button |
| `maxWidth` | `string` | — | CSS max-width of popup box |
| `children` | `ReactNode` | — | Popup content JSX |

#### Controls

| Component | Key Props | Purpose |
|-----------|-----------|---------|
| `<NavigationControl>` | `position: string` | Zoom in/out and compass rose |
| `<GeolocateControl>` | `position: string` | Locates the user via browser geolocation |
| `<FullscreenControl>` | `position: string` | Toggles fullscreen mode |
| `<ScaleControl>` | `maxWidth, unit` | Distance scale bar |

#### Quick Start Example

```tsx
import { Map, Marker, Popup, NavigationControl } from 'react-bkoi-gl';
import 'react-bkoi-gl/styles';

const API_KEY = process.env.NEXT_PUBLIC_BARIKOI_MAP_KEY;

export default function MapView() {
  return (
    <Map
      mapStyle={`https://map.barikoi.com/styles/osm-liberty/style.json?key=${API_KEY}`}
      initialViewState={{ longitude: 90.4071, latitude: 23.7925, zoom: 12 }}
      style={{ width: '100%', height: '100vh' }}
    >
      <NavigationControl position="top-right" />
    </Map>
  );
}
```

---

### 8.2 `barikoiapis`

Official TypeScript/JavaScript SDK for Barikoi Location Services. Auto-generated from the OpenAPI specification with full TypeScript inference, built-in Zod validation, and modern async/await interface.

| Field | Value |
|-------|-------|
| Package | `barikoiapis` |
| Install | `npm install barikoiapis` |
| Docs | https://docs.barikoi.com/npm/Barikoi%20APIs/npm-intro |
| npm | https://www.npmjs.com/package/barikoiapis |

#### Client Initialisation

```ts
import { createBarikoiClient } from 'barikoiapis';

// Server-side only (API Route / Server Component)
const barikoi = createBarikoiClient({
  apiKey: process.env.BARIKOI_API_KEY!,  // never NEXT_PUBLIC_
  timeout: 10000,
});
```

#### `autocomplete()` — Primary Search Method

Returns matching places with addresses in English and Bangla, coordinates (`longitude`/`latitude`), city, area, postCode, pType, and uCode.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `q` | `string` | Required | Search query string (min 1 character) |
| `bangla` | `boolean` | `false` | Include `address_bn`, `city_bn`, `area_bn` in response |

#### Response Shape

```ts
type AutocompletePlace = {
  id?:         number;
  longitude?:  string | number;
  latitude?:   string | number;
  address?:    string;
  address_bn?: string;
  city?:       string;
  city_bn?:    string;
  area?:       string;
  area_bn?:    string;
  postCode?:   string | number;
  pType?:      string;
  uCode?:      string;
};

type AutocompleteSuccess = {
  places?: AutocompletePlace[];
  status?: number;
};
```

#### Usage Example — Next.js API Route (Proxy)

```ts
// app/api/search/route.ts
import { createBarikoiClient } from 'barikoiapis';
import { NextRequest, NextResponse } from 'next/server';

const barikoi = createBarikoiClient({
  apiKey: process.env.BARIKOI_API_KEY!,
});

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') ?? '';
  if (!q) return NextResponse.json({ places: [] });

  const result = await barikoi.autocomplete({ q, bangla: false });
  return NextResponse.json(result.data ?? { places: [] });
}
```

#### Other Available API Methods

| Method | Description |
|--------|-------------|
| `barikoi.reverseGeocode()` | Convert `{ longitude, latitude }` → address |
| `barikoi.searchPlace()` | Full-text place search (alternative to autocomplete) |
| `barikoi.placeDetails()` | Fetch extended details for a place by `uCode` |
| `barikoi.nearby()` | Find places within a radius of given coordinates |
| `barikoi.rupantor()` | Geocode a freeform address string → coordinates |
| `barikoi.routeOverview()` | High-level route summary between two points |
| `barikoi.calculateRoute()` | Detailed turn-by-turn routing |
| `barikoi.snapToRoad()` | Snap GPS traces to the nearest road segment |
| `barikoi.checkNearby()` | Check if a coordinate is near a specific place |

#### API Key Management at Runtime

```ts
// Update key without reinitialising
barikoi.setApiKey('new-api-key');

// Read current key
const key = barikoi.getApiKey();
```

---

## 9. Security Requirements

> **Critical:** The Barikoi API key MUST be treated as a server-side secret. Exposure in client-side JavaScript bundles (e.g. via `NEXT_PUBLIC_` env vars) for `barikoiapis` calls is a critical security violation.

| ID | Requirement | Severity |
|----|-------------|----------|
| SEC-01 | `BARIKOI_API_KEY` stored in `.env.local`; never prefixed with `NEXT_PUBLIC_`. | Critical |
| SEC-02 | All `barikoiapis` calls made inside Next.js API Routes or Server Components. | Critical |
| SEC-03 | Map tile style URL key (used in `react-bkoi-gl` `mapStyle` prop) may use `NEXT_PUBLIC_BARIKOI_MAP_KEY` since tile URLs are public-facing. | Medium |
| SEC-04 | API routes shall implement basic query length validation. | Should Have |
| SEC-05 | No API keys committed to version control; `.env.local` listed in `.gitignore`. | Critical |
| SEC-06 | `README.md` to document how to obtain and configure the API key. | Must Have |

#### Environment Variable Convention

```bash
# .env.local

# Server-side only — for barikoiapis (autocomplete, geocoding, etc.)
BARIKOI_API_KEY=your_secret_api_key_here

# Public — for react-bkoi-gl tile style URL (map rendering only)
NEXT_PUBLIC_BARIKOI_MAP_KEY=your_map_tile_key_here

# Both keys can be the same key from developer.barikoi.com
```

---

## 10. Non-Functional Requirements

| ID | Category | Requirement |
|----|----------|-------------|
| NFR-01 | Performance | Search autocomplete response rendered within 300 ms of API response. |
| NFR-02 | Performance | Initial map load time < 3 s on a standard broadband connection. |
| NFR-03 | Responsiveness | UI functional on viewports >= 375 px width. |
| NFR-04 | Code Quality | TypeScript strict mode; no `any` types in production paths. |
| NFR-05 | Code Quality | Redux state for search query, results list, and selected location. |
| NFR-06 | Accessibility | Search input has accessible label; keyboard-navigable suggestions. |
| NFR-07 | Documentation | `README.md` includes setup instructions and trade-off answers. |
| NFR-08 | Maintainability | Components separated by concern: `Map`, `SearchBar`, `SuggestionList`, `MarkerLayer`. |

---

## 11. Acceptance Criteria

| ID | Scenario | Traces To |
|----|----------|-----------|
| AC-01 | Given the app is loaded, when no search is entered, then a full-screen Barikoi map centred on Dhaka is visible. | FR-02-1, FR-02-2 |
| AC-02 | Given the search bar is visible, when the user types "Dhanmondi", then at least one autocomplete suggestion appears. | FR-01-2, FR-01-3 |
| AC-03 | Given suggestions are shown, when the user selects one, then the map pans to that location's coordinates. | FR-02-3 |
| AC-04 | Given the map has panned, a marker is placed at the selected location. | FR-02-4 |
| AC-05 | Given a marker is on the map, when clicked, a popup shows the place name and address. | FR-02-5 |
| AC-06 | Given the browser Network tab is open, no request containing the `BARIKOI_API_KEY` appears as a client-side query param. | SEC-01, SEC-02 |
| AC-07 | Given a query with no results, the suggestion dropdown shows an empty-state message. | FR-01-7 |
| AC-08 | The project runs via `npm install && npm run dev` with no errors. | NFR-07 |

---

## 12. Appendix — AI / LLM Documentation Access

Barikoi provides structured documentation endpoints optimised for AI coding assistants, LLMs, and agentic tools. Use these when building with Barikoi APIs to get accurate, up-to-date context at lower token cost than parsing full HTML pages.

**Reference:** https://docs.barikoi.com/docs/llms

### Quick-Access Endpoints

| Resource | URL | Size | Description |
|----------|-----|------|-------------|
| Site-wide index | https://docs.barikoi.com/llms.txt | ~20 kB | Full index of all documentation pages |
| Complete bundle | https://docs.barikoi.com/llms-full.txt | ~500 kB | All docs in one file (Maps API, SDKs, guides, examples) |
| Maps API (markdown) | https://docs.barikoi.com/docs/maps-api.md | — | Per-page markdown for Maps API overview |
| AI / LLM guide | https://docs.barikoi.com/docs/llms | — | How to integrate Barikoi docs into AI tools |

### Per-Page Markdown Access

Every Barikoi documentation page has a lightweight Markdown version accessible by appending `.md` to the page URL path.

```
# react-bkoi-gl docs in markdown
https://docs.barikoi.com/npm/Barikoi%20React%20GL/react-bkoi-gl-intro.md

# barikoiapis docs in markdown
https://docs.barikoi.com/npm/Barikoi%20APIs/npm-intro.md

# Maps API overview
https://docs.barikoi.com/docs/maps-api.md
```

### Usage in AI Coding Tools

```
# In a chat prompt (Claude, ChatGPT, etc.)
I'm building a Next.js location finder with Barikoi.
Context: https://docs.barikoi.com/docs/maps-api.md

# For coding agents (Cursor, Windsurf .cursorrules / rules file)
{
  "context": [
    "https://docs.barikoi.com/llms.txt"
  ]
}
```

### Available SDKs Reference

| Package | Platform | Documentation URL |
|---------|----------|-------------------|
| `react-bkoi-gl` | Web (React/Next.js) | https://docs.barikoi.com/npm/Barikoi%20React%20GL/react-bkoi-gl-intro |
| `barikoiapis` | Web (TS/JS SDK) | https://docs.barikoi.com/npm/Barikoi%20APIs/npm-intro |
| Barikoi GL JS | Web (Vanilla JS) | https://docs.barikoi.com/npm/Barikoi%20GL%20JS/bkoi-gl-intro |
| Android SDK | Android | https://docs.barikoi.com/android/android-intro |
| Flutter | Flutter / Dart | https://docs.barikoi.com/flutter/Barikoi%20Map%20Flutter/flutter-intro |
| React Native | React Native | https://docs.barikoi.com/react-native/getting-started |
| Python SDK | Python | https://docs.barikoi.com/python-sdk/python |
| Laravel Package | PHP / Laravel | https://docs.barikoi.com/laravel/laravel-intro |

---

*© 2026 — Business Requirements Document prepared for Barikoi Technologies Limited Frontend Engineer Recruitment Assignment. Document version 1.0. All API documentation sourced from docs.barikoi.com.*

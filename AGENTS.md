<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->



<!-- 1.Product -->


# Product Overview

This repository starts as a Next.js boilerplate, but the current product direction is the Barikoi-powered Location Finder described in `PROJECT-BRD.md`.

- Core user flow: search a location, show autocomplete results, and render the selected place on a map.
- Barikoi APIs must stay server-side, with Next.js routes acting as the proxy layer.
- The app should stay lightweight and focused on map search rather than growing into a broad platform.


<!-- 2.Structure -->

# Project Structure & Organization

## Root Directory Structure

```
├── public/             # Static assets (images, icons, etc.)
├── scripts/            # Build and deployment scripts
├── src/                # Source code (main application)
└── package.json        # Project scripts and dependencies
```

## Source Directory (`src/`)

The main application code follows a feature-based organization:

```
src/
├── app/                # Next.js App Router pages, layouts, and route handlers
├── components/         # Reusable React components
│   ├── shared/         # Shared application-level components
│   └── ui/             # shadcn/ui components
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries and configurations
├── styles/             # Global CSS and styling
├── types/              # TypeScript type definitions
├── utils/              # Helper functions and constants
├── env.ts              # Environment variable validation
└── middleware.ts       # Next.js middleware
```

## BRD-Aligned Feature Plan

- `src/app/page.tsx` should become the map-first landing page with the search overlay.
- `src/app/api/search/route.ts` should proxy Barikoi autocomplete requests server-side.
- `src/components/map/` should hold the map shell, search bar, suggestion list, marker layer, and popup pieces.
- `src/env.ts` should validate the server-only Barikoi API key and the public map tile key.
- If location state grows beyond the page, keep it in a small Redux Toolkit store or an equivalent focused state module.
- Keep styling in `src/styles/globals.css` and Tailwind utility classes so the map shell stays simple and responsive.

## Key Conventions

### File Naming

- Use kebab-case for files and directories
- React components use PascalCase for the component name
- Use `.tsx` for React components, `.ts` for utilities
- Test files use `.test.ts` or `.test.tsx` suffix


### Import Aliases

- `@/*` maps to `src/*` for internal imports
- Use absolute imports with aliases instead of relative paths

### Component Organization

- UI components go in `src/components/ui/` (shadcn/ui)
- Feature-specific components in `src/components/`
- Each component should have its own file
- Export components as default exports


### Styling

- Global styles in `src/styles/globals.css`
- Use Tailwind CSS classes
- CSS variables for theming in HSL format
- Component-specific styles using Tailwind


### Environment & Configuration

- Environment variables validated in `src/env.ts`
- Use `.env.example` as template
- Keep project-level configuration in the repository root or under `src/` alongside the feature code

<!-- 3. tech -->

# Tech Stack & Build System

## Core Framework

- **Next.js 15** with App Router and TypeScript
- **React 19** with Server Components (RSC)
- **TypeScript 5.8** with strict mode enabled

## UI & Styling

- **Tailwind CSS** with custom design system
- **shadcn/ui** components with Radix UI primitives
- **Lucide React** for icons
- **next-themes** for dark mode support
- CSS variables for theming with HSL color system
- Barikoi map/search integration planned through `react-bkoi-gl` and `barikoiapis`



## Code Quality

- **ESLint** with Next.js, TypeScript, and Prettier configs
- **Prettier** with Tailwind plugin for code formatting
- **TypeScript** strict mode with path aliases (`@/*` for src)

## Development Tools

- **Bun** as package manager (bun.lock present)
- **Docker** with multi-stage builds for development and production
- **Bundle Analyzer** for build analysis
- **Knip** for unused code detection
- **Codehawk** for code analysis

## Common Commands

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run type-check   # TypeScript type checking
```


### Code Quality

```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run knip         # Check for unused code
```


<!-- BEGIN:code-quality-rules -->
# Code Quality & Standards

## Core Philosophy

Prioritizes developer experience through intelligent code generation that emphasizes clarity, maintainability, and performance. These rules ensure consistent, production-ready code that follows modern best practices.

## Key Principles

- **Developer-First**: Code should be readable and maintainable by humans
- **Type Safety**: Leverage TypeScript's full potential for error prevention
- **Performance**: Write efficient code that scales
- **Accessibility**: Ensure inclusive user experiences
- **Consistency**: Follow established patterns and conventions

## Before Writing Code

1. Analyze existing codebase patterns and conventions
2. Consider edge cases, error scenarios, and user accessibility
3. Validate against project-specific requirements
4. Ensure code is immediately runnable and testable

## Accessibility Standards

### Interactive Elements

- Always include `type` attribute for button elements
- Accompany `onClick` with keyboard handlers (`onKeyUp`, `onKeyDown`, or `onKeyPress`)
- Accompany `onMouseOver`/`onMouseOut` with `onFocus`/`onBlur`
- Make elements with interactive roles focusable
- Don't assign `tabIndex` to non-interactive elements
- Don't use positive integers for `tabIndex`

### ARIA and Semantic HTML

- Use semantic HTML elements instead of ARIA roles when possible
- Don't add ARIA roles to elements that don't support them
- Include all required ARIA attributes for elements with ARIA roles
- Don't set `aria-hidden="true"` on focusable elements
- Ensure label elements have text content and are associated with inputs
- Always include `lang` attribute on html element

### Content and Media

- Provide meaningful alt text for images (avoid "image", "picture", "photo")
- Always include `title` element for SVG elements
- Include caption tracks for audio and video elements
- Ensure anchors have accessible content
- Don't use distracting elements like `<marquee>` or `<blink>`

## TypeScript Best Practices

### Type Safety

- Use strict TypeScript configuration
- Prefer `unknown` over `any` when type is uncertain
- Use `as const` for literal types instead of type annotations
- Export types with `export type`, import with `import type`
- Don't use non-null assertions (`!`) unless absolutely necessary

### Modern TypeScript

- Use `T[]` or `Array<T>` consistently (prefer `T[]`)
- Don't use TypeScript enums (prefer const objects or union types)
- Don't use TypeScript namespaces
- Avoid parameter properties in class constructors
- Don't declare empty interfaces

## React & Next.js Patterns

### Component Design

- Don't define components inside other components
- Use default exports for components
- Don't pass children as props (use React children pattern)
- Don't use Array index as keys in lists
- Use `<>...</>` instead of `<Fragment>...</Fragment>`

### Hooks and State

- Call hooks only at the top level of components
- Include all dependencies in hook dependency arrays
- Don't use the return value of `React.render`
- Don't destructure props inside JSX components

### Next.js Specific

- Use `next/image` instead of `<img>` elements
- Use `next/head` for metadata (not in `_document.js`)
- Don't import `next/document` outside of `pages/_document.jsx`
- Leverage App Router patterns for new projects

## Code Quality & Performance

### Function Design

- Use arrow functions for inline functions and callbacks
- Keep functions focused and under reasonable complexity
- Use early returns to reduce nesting
- Don't use unnecessary constructors or empty functions

### Data Handling

- Use `for...of` instead of `Array.forEach` for better performance
- Use `.flatMap()` instead of `.map().flat()`
- Use object spread instead of `Object.assign()` for new objects
- Use optional chaining (`?.`) instead of chained logical expressions

### Error Handling

- Always handle Promise rejections appropriately
- Use proper error boundaries in React applications
- Don't swallow errors silently
- Provide meaningful error messages

```typescript
// ✅ Good: Comprehensive error handling
const fetchUserData = async (id: string) => {
  try {
    const response = await api.getUser(id)
    return { success: true, data: response }
  } catch (error) {
    console.error('Failed to fetch user:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// ❌ Bad: Swallowing errors
const fetchUserData = async (id: string) => {
  try {
    return await api.getUser(id)
  } catch (e) {
    console.log(e)
  }
}
```

## Modern JavaScript Practices

### Syntax and Style

- Use `const` for variables that don't change, `let` for those that do
- Never use `var`
- Use template literals for string interpolation
- Use destructuring for object and array access
- Use shorthand property syntax in objects

### Built-in Methods

- Use `Date.now()` instead of `new Date().getTime()`
- Use `Number.isNaN()` instead of global `isNaN()`
- Use `Array.isArray()` instead of `instanceof Array`
- Use `String.startsWith()`/`endsWith()` instead of regex when appropriate

### Async/Await

- Don't use `await` inside loops (use `Promise.all()` for parallel execution)
- Don't use async functions as Promise executors
- Always handle async errors appropriately

## Security & Safety

### Data Protection

- Don't hardcode sensitive data (API keys, tokens, passwords)
- Validate and sanitize user inputs
- Use environment variables for configuration
- Don't use `eval()` or similar dynamic code execution

### Safe Practices

- Don't use `target="_blank"` without `rel="noopener"`
- Validate external data before processing
- Use HTTPS for all external requests
- Implement proper CORS policies

## Testing Standards

### Test Structure

- Place assertion functions inside `it()` blocks
- Don't use focused tests (`fit`, `fdescribe`) in committed code
- Don't use disabled tests without good reason
- Write descriptive test names that explain the expected behavior

### Test Quality

- Test both happy path and error scenarios
- Mock external dependencies appropriately
- Use proper setup and teardown
- Maintain test isolation

## Database & API Patterns

### Drizzle ORM

- Use schema files in `src/db/schema/`
- Follow Drizzle naming conventions
- Use migrations for schema changes
- Implement proper connection pooling

### API Design

- Follow RESTful conventions
- Use proper HTTP status codes
- Implement consistent error response format
- Use route handlers for different HTTP methods
- Validate request data with Zod schemas

## Performance Optimization

### Bundle Size

- Use dynamic imports for code splitting
- Avoid importing entire libraries when only specific functions are needed
- Use tree-shaking friendly imports
- Optimize images and assets

### Runtime Performance

- Minimize re-renders in React components
- Use React.memo() and useMemo() judiciously
- Implement proper loading states
- Use efficient data structures

## Common Anti-Patterns to Avoid

### Code Smells

- Don't use magic numbers or strings
- Avoid deeply nested code
- Don't create overly complex functions
- Avoid duplicate code

### React Anti-Patterns

- Don't mutate props or state directly
- Don't use array indices as keys
- Don't call hooks conditionally
- Don't use refs for everything

### TypeScript Anti-Patterns

- Don't use `any` type
- Don't ignore TypeScript errors with `@ts-ignore`
- Don't use function overloads unnecessarily
- Don't create overly complex type definitions

<!-- END:code-quality-rules -->


<!-- BEGIN:behavioral-guidelines -->

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.


<!-- END:behavioral-guidelines -->
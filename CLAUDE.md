# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Learning project: the user is an experienced React developer using this repo to learn Angular (v20, standalone APIs, signals). Act as a senior Angular reviewer/pair-programmer — apply current Angular best practices deliberately, keep the existing architecture and conventions consistent, and when a change touches a concept that differs meaningfully from React (signals vs. hooks, DI vs. context, `input()`/`computed()`, control flow syntax, zoneless-friendly change detection), briefly note *why* it's done the Angular way, not just what changed.

The app itself: a bike-route picker. A routes panel (search/filter/sort) feeds a spinning roulette wheel that picks a random route and renders its GPX track on a Leaflet map.

## Commands

Package manager is **yarn** (see `angular.json` → `cli.packageManager`).

```bash
yarn start          # ng serve, http://localhost:4200
yarn build           # production build → dist/
yarn watch           # dev build, watch mode
yarn test            # Karma/Jasmine unit tests (all specs, watches by default)
```

Run a single spec file: `yarn test --include='**/route-card.spec.ts'` (Karma glob against `--include`).

No lint script is configured and there is no e2e setup. Prettier config lives in `package.json` (`printWidth: 100`, `singleQuote: true`, Angular parser for `*.html`).

## Architecture

### Layer structure (`src/app`)

- **`core/`** — app-wide singletons, provided in root: `services/` (HTTP wrapper, domain services, loader, token, bootstrap), `interceptors/`, `constants/`, `models/`. Nothing here imports from `features/`.
- **`features/<name>/`** — one folder per business feature (`routes`, `roulette`, `not-found`). Sub-structure within a feature:
  - `data-access/` — signal-based facade(s) wrapping core services and exposing derived state via `computed()`.
  - `ui/` — presentational components for that feature.
  - a top-level `*-page`/`*-panel` component that composes `ui/` pieces and injects the facade.
  - `index.ts` — barrel exporting the feature's public surface (facade + components other features are allowed to use). Cross-feature imports should go through this barrel (see `roulette-page.ts` importing `RouteFacade`/`RoutesPanel` from `../../routes`), not by reaching into another feature's internals.
- **`shared/components/`** — dumb, reusable UI (button, chip, search-input, loader, lottie-player). No feature or domain knowledge.
- **`layout/`** — shell components (`main-layout`) that host `<router-outlet>`.

### State pattern: signal facades, not NgRx

State lives in `Injectable({ providedIn: 'root' })` facade/service classes using `signal()`/`computed()`, not a store library. Convention used throughout (e.g. `RouteFacade`, `LoaderService`, `TokenService`):

```ts
private readonly _search = signal('');
readonly search = this._search.asReadonly();   // public = read-only signal
setSearch(value: string): void { this._search.set(value); } // mutation via method
```

RxJS is used at the edges (HTTP calls) and converted to signals via `toSignal(...)` at the facade boundary (`RouteFacade.routes`); components then only deal with signals, never subscribe manually except for imperative side effects like Leaflet/GPX loading (see `RouteMap`, which mixes `effect()` + `takeUntilDestroyed()` for that reason).

### HTTP layer

`ApiService` (`core/services/api.ts`) is a thin `HttpClient` wrapper (`get`/`post`/`put`/`delete`) prefixing `environment.apiUrl`. Domain services (e.g. `RouteService`) call it and cache with `shareReplay(1)` rather than re-fetching per subscriber. Paths are centralized in `core/constants/api-paths.ts`. There's currently no real backend — `environment.apiUrl` is empty and requests resolve against static JSON/GPX files under `public/`. `authInterceptor` and `errorInterceptor` are registered in `app.config.ts` via `provideHttpClient(withInterceptors([...]))`.

### Components

All components are standalone (no `NgModule`s), using the modern `@Component({ imports: [...] })` form and the signal-based inputs API (`input()`, `input.required<T>()`) rather than `@Input()`. Derived template state is a `computed()`, not a getter. Class names match the Angular CLI's current convention: no `Component`/`Service` suffix (e.g. `RouteCard`, `RouteFacade`, `App`), consistent with `angular.json`'s default schematics.

Component-level side effects/DOM integration (Leaflet in `RouteMap`, rAF-driven animation in `RouletteWheel`) are done with `effect()`, `viewChild()`, `ElementRef`, and cleaned up in `ngOnDestroy`/`DestroyRef` — not with `ngOnChanges`.

### Styling

SCSS with a global token layer, not component-scoped design systems. `src/styles/_tokens.scss` defines CSS custom properties (`--color-*`, `--space-*`, `--radius-*`, etc.) on `:root`; component `.scss` files consume the variables. `angular.json` sets `stylePreprocessorOptions.includePaths: ["src/styles"]`, so partials (`_abstracts.scss`, `_breakpoints.scss`, `_functions.scss`, `_mixins.scss`) can be `@use`d by bare name from any component style file. `src/styles.scss` is the single entry point that pulls in reset + tokens for the whole app; don't duplicate global imports elsewhere.

### Third-party integrations

- **Leaflet** (`route-map.ts`) — imperative map instance created in `ngAfterViewInit`, driven by `effect()` on the `gpxFile` input, torn down in `ngOnDestroy`. GPX parsing/track points come from `core/services/gpx-parser.ts` + `core/services/track.ts`.
- **lottie-web** (`shared/components/lottie-player`) — wraps animation JSON assets under `public/animations/`.

Both are in `allowedCommonJsDependencies` in `angular.json` since they ship CommonJS.

### Comments and error messages

Existing in-code comments and user-facing strings (loader errors, console warnings) are written in Russian — match that when touching the same files.

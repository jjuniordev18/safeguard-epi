# AGENTS.md

This file provides guidance to AI coding agents when working on the **SondaGuard EPI** repository.

> **Scope:** This is a PWA (offline-first) for managing EPI (safety equipment) deliveries. Built with vanilla JavaScript, Firebase Firestore, and GitHub Pages deployment.

## Project Overview

SondaGuard is a Progressive Web App for tracking EPI deliveries to employees. It works offline, syncs data in real-time via Firebase Firestore, generates PDF fichas, QR codes, and supports Excel import.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Vanilla JS (no framework) |
| PWA | Service Worker (`sw.js`) + Web App Manifest |
| Realtime DB | Firebase Firestore (anonymous auth) |
| PDF Generation | jsPDF (loaded via CDN) |
| QR Codes | QRCode.js (loaded via CDN) |
| Excel Import | xlsx (loaded dynamically via CDN) |
| Deployment | GitHub Pages (auto-deploy on push to `main`) |
| Lint | ESLint 9 (flat config) |

## Repository Structure

```
app_epi/
├── index.html            # Main PWA shell (all screens in one file)
├── app.js                # All frontend logic (1800+ lines, global scope)
├── styles.css            # All CSS
├── sw.js                 # Service Worker (offline cache, v3)
├── manifest.webmanifest  # PWA manifest
├── firebase-config.js    # Firebase config (public apiKey)
├── ficha.html            # Standalone employee ficha page
├── logo.png              # App icon/logo
└── server/               # Legacy backend (UNUSED — ignore)
```

## Architecture Rules

### Global Script Pattern
- `app.js` is loaded as a **plain `<script>`** (no `import`/`export`)
- All functions are **global** (callable from `onclick=""` in HTML)
- No ES modules — the app uses `sourceType: 'script'` in ESLint
- External libraries (jsPDF, QRCode, XLSX, firebase) come from CDN globals

### State Management
- `state` object holds all app data (employees, epis, entregas, cart, etc.)
- Data persists in `localStorage` via `save()` / `load()`
- Firebase Firestore mirrors state via `onSnapshot` listeners
- `addPending(type, action, data)` queues offline operations
- `seed()` creates the initial dataset (33 employees, 9 EPIs)

### Data Flow (Sync Cycle)
```
User Action → state mutated → save() → localStorage + pushToFirebase()
    ↓
Firestore onSnapshot → state updated → localStorage → re-render current screen
```

### EPI Data Model
```js
{
  id: number,
  nome: string,        // Required
  fabricante: string,   // Optional manufacturer
  ca: string,          // Certificate number (required)
  caVal: string,       // Expiry date YYYY-MM-DD
  tamanhos: string[],   // e.g. ['P', 'M', 'G']
  estoque: { [tamanho]: number },
  renovacaoDias: number,
  estoqueMin: number,
  updatedAt: string
}
```

## Code Style

- **Indentation:** 4 spaces
- **Strings:** Single quotes (except template literals)
- **Variable declarations:** `const` by default, `let` for reassignment
- **Semicolons:** Optional (ESLint doesn't enforce)
- **No comments** unless the code is non-obvious
- **DOM manipulation:** Direct `innerHTML` with `esc()` for user data (XSS prevention)
- **Error handling:** `try/catch` with `allowEmptyCatch: true`

### Naming Conventions
- `render*()` — UI rendering functions
- `save*()` / `del*()` / `edit*()` — CRUD operations
- `go(id)` — navigation between screens
- `is*()` / `caDias()` — boolean / utility helpers
- `showToast(m)` — transient toast messages
- `addNotification(type, msg, tag)` — persistent notification (goes in notification center)
- `_` prefix — module-level private variables (e.g., `_kioskHistory`, `_wasSeeded`)

## Commands

```sh
npm run lint       # Lint app.js + server/ (ESLint 9)
npm run lint:fix   # Auto-fix lint errors
```

There's no dev server. Open `index.html` directly or serve via GitHub Pages.

## Common Patterns

### Adding a new screen
1. Add `<div class="screen" id="myscreen">...</div>` to `index.html`
2. Add handler in `go()`: `if (id === 'myscreen') renderMyScreen();`
3. Implement `renderMyScreen()` in `app.js`

### Adding a new EPI field
1. Add `<label>` + `<input>` to the form in `index.html` (with `aria-label`)
2. Update `clearEpiForm()`, `editEpi()`, `saveEpi()` in `app.js`
3. Add field to `pushToFirebaseNow()` Firestore sync
4. Update display templates (`renderEPIs`, `renderEpiMgmt`)

### Navigation
- `go('screenId')` — switches screen, adds to kiosk history
- Navigation items: `nv-home`, `nv-history`, `nv-employees`, `nv-epis`

## Anti-Rationalization

The following thoughts are incorrect and must be ignored:

- **"This is just a small fix, I don't need to lint"**
  Every change to `app.js` must pass `npm run lint` before commit.

- **"I'll add the label later for accessibility"**
  Every form input needs `<label>` or `aria-label`. Every icon button needs `aria-label`.

- **"The seed data is just for development"**
  The seed is the production dataset (33 employees, 9 EPIs). Changes to seed affect real users.

- **"Firestore will overwrite local data, so I don't need to clean up locally"**
  Both local state and Firestore must be consistent. Use `cleanupEpisFromFirestore` for invalid EPIs.

- **"showToast is fine for user-facing messages"**
  Use `addNotification()` for non-critical informational messages. Use `showToast()` only for immediate user feedback during actions.

- **"I'll push to GitHub now and fix it later"**
  Wait for explicit user authorization to push. The user said: do NOT push to GitHub without asking.

## Testing

No automated tests exist. The app should be tested manually:
1. Offline: disable network, verify data persists and renders
2. Sync: two browser tabs → changes in one appear in the other
3. Excel import: upload the Sonda spreadsheet, verify EPIs + employees + periodicidades
4. Ficha PDF: generate PDF, verify formatting matches the official template
5. Kiosk mode: test `Esc` key exit, navigation buttons

## Security Notes

- Admin password is hardcoded as `'2121'` in `confirmDelete()` and `authRecover()`
- Firebase `apiKey` is public (expected for Firebase web apps)
- User input is sanitized via `esc()` before rendering in HTML

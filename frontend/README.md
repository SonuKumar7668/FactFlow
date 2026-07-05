# FactFlow — Frontend

The client for FactFlow: a single-page React app where a user pastes in a sentence, submits it, and sees each extracted claim rendered as a color-coded verdict card.

## Tech stack

- **React 19** — function components + hooks (no router, no external state library; state lives in `App.jsx`)
- **Vite** — dev server and build tool
- **Tailwind CSS 4** — via the `@tailwindcss/vite` plugin, no separate config file needed
- **ESLint** — flat config (`eslint.config.js`) with React Hooks + React Refresh rules

## Project structure

```
frontend/
├── src/
│   ├── App.jsx                 # Top-level state machine: idle → loading → results/error
│   ├── main.jsx                # React entry point
│   ├── components/
│   │   ├── Header.jsx          # App header/branding
│   │   ├── SentenceInput.jsx   # Text input + submit control
│   │   ├── Flowresults.jsx     # Renders the list of claim cards
│   │   ├── ClaimCard.jsx       # Single claim: text, verdict badge, reason
│   │   ├── VerdictBadge.jsx    # Colored pill label (Supported/Contradicted/Insufficient)
│   │   ├── EmptyState.jsx      # Shown before any check has been run
│   │   ├── LoadingState.jsx    # Shown while waiting on the API
│   │   ├── ErrorBanner.jsx     # Dismissible error message
│   │   └── Icons.jsx           # Inline SVG icon set
│   ├── services/
│   │   └── factCheckApi.js     # Fetch wrapper — the only place that calls the backend
│   ├── utils/
│   │   └── VerdictConfig.js    # Central style/label map per verdict, with an unknown-verdict fallback
│   ├── App.css / index.css     # Global styles
│   └── assets/                 # Static images/icons
├── public/                     # Favicon, static icons served as-is
├── index.html                  # Vite HTML entry
├── vite.config.js              # Vite + React + Tailwind plugin setup
└── eslint.config.js
```

## How the pieces fit together

- `App.jsx` owns all state: the input `sentence`, the `results` array, `isLoading`, and `error`. It renders exactly one of `EmptyState`, `LoadingState`, `FlowResults`, or `ErrorBanner` depending on that state.
- `services/factCheckApi.js` isolates every network call behind `verifySentence(sentence)`, so no component talks to `fetch` directly. Swapping the endpoint, adding auth headers, or changing error handling only touches this one file.
- `utils/VerdictConfig.js` is the single source of truth for how each verdict (`SUPPORTED`, `CONTRADICTED`, `INSUFFICIENT_EVIDENCE`) looks — colors, glow, badge, and label — so a card, a badge, and any future summary view all stay visually consistent. Unknown/unexpected verdict strings fall back to a neutral gray style instead of crashing.

## Environment variables

Create/edit `.env` in this folder:

```
VITE_API_BASE_URL=http://localhost:4000
```

This should point at wherever the backend (see `../backend/README.md`) is running. If unset, requests are made to a relative path.

## Getting started

```bash
npm install
npm run dev       # start dev server (Vite, default http://localhost:5173)
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint      # run ESLint
```

## Notes

- The backend response is expected to be a JSON array of `{ claim, verdict, reason }` objects. `factCheckApi.js` throws if the response isn't an array, so the UI can show a clear error instead of rendering garbage.
- A 429 response from the backend (LLM/API rate limiting) is surfaced to the user as a specific "too many requests" message rather than a generic failure.
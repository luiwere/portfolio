# Portfolio

A personal portfolio website built with plain HTML, CSS, and JavaScript — no framework, no build step. Project and skills data live in `data/` JSON files and render client-side.

## Features

- Responsive dark theme
- Project cards with screenshots, problem/learned notes, stack tags, and demo/code links
- Skills grouped by category (languages, frameworks, databases, tools)
- Semantic HTML, keyboard-accessible navigation, `focus-visible` outlines
- Vercel-ready: `vercel.json`, `404.html`, `robots.txt`, `sitemap.xml`

## Structure

```
.
├── index.html              # Semantic page structure
├── css/
│   ├── base.css            # Design tokens, reset, primitives
│   ├── layout.css          # Header, hero, footer, buttons
│   ├── components.css      # Project cards, skills, contact
│   └── styles.css          # Legacy entry point
├── js/
│   ├── data.js             # Loads data/*.json into window.PORTFOLIO_DATA
│   ├── projects.js         # Renders project cards
│   ├── skills.js           # Renders skill groups
│   └── main.js             # Footer year + small interactions
├── data/
│   ├── projects.json       # Project entries
│   └── skills.json         # Skills by category
├── assets/
│   ├── screenshots/        # Project screenshots
│   ├── images/             # Misc images
│   └── icons/              # Icons
├── vercel.json             # Vercel config (headers, caching, clean URLs)
├── 404.html                # Not-found page
├── robots.txt              # Allows all
└── sitemap.xml             # Basic sitemap
```

## Data

Edit `data/projects.json` and `data/skills.json` to update content — no code changes needed. Each project supports:

```json
{
  "id": "taskflow",
  "title": "TaskFlow",
  "description": "...",
  "role": "...",
  "stack": ["Go", "Gin", "PostgreSQL"],
  "category": "backend",
  "problem": "...",
  "learned": "...",
  "demo": "https://...",
  "repo": "https://...",
  "screenshot": "assets/screenshots/taskflow.png"
}
```

Missing screenshots degrade gracefully (empty placeholder).

## Local preview

```
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to Vercel

1. Commit and push this repo.
2. Import the repo in the [Vercel dashboard](https://vercel.com).
3. No build command or framework settings needed — it's static HTML.
4. Custom domain: add it in Vercel → Settings → Domains.

## License

MIT
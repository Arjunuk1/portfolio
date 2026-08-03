# Arjun Sharma — Portfolio

Personal portfolio site built with React, TypeScript, and Vite. Every section
pulls in real data where possible — projects and activity graph are fetched
live from GitHub instead of being hardcoded.

🌐 Live site: https://portfolio-arjunuk1.vercel.app/

---

## Tech stack

- React 18 + TypeScript
- Vite (build tool / dev server)
- Plain CSS per component — no Tailwind or UI library, just custom styles
- [lucide-react](https://lucide.dev) for icons

---

## Project structure

```
src/
  main.tsx              # React entry point
  app/
    App.tsx              # Page layout — imports and orders every section
    app.css              # Global styles: preloader, cursor, trace rail, layout
    components/
      Navbar.tsx / .css
      Hero.tsx   / .css
      About.tsx  / .css
      Skills.tsx / .css
      Credentials.tsx / .css   # Education, LeetCode, GitHub stats + graph
      Experience.tsx  / .css   # "Learning journey" timeline
      Projects.tsx    / .css   # Live GitHub repo fetch
      Contact.tsx     / .css
      Footer.tsx      / .css
      CustomCursor.tsx         # Custom cursor (desktop only)
      TraceRail.tsx            # Scroll-progress rail on the left edge
  styles/
    index.css   # imports fonts + theme, loaded once in main.tsx
    fonts.css   # Google Fonts import
    theme.css   # Design tokens (colors, fonts, easing) as CSS variables
public/
  favicon.png
  Arjun-Sharma-Resume.pdf
```

Each section of the site is one component + one matching CSS file, named the
same thing, sitting right next to each other — so if you want to change the
Projects section, everything for it is in `Projects.tsx` and `Projects.css`.

All the colors, fonts, and animation timing come from CSS variables defined
once in `src/styles/theme.css` (things like `--bg`, `--signal`, `--structure`,
`--font-display`). Change a value there and it updates across the whole site.

---

## Running locally

```bash
npm install
npm run dev       # starts a local dev server
npm run build     # builds the production version into dist/
npm run preview   # serves the production build locally, to test it
```

---

## GitHub API rate limits (optional but recommended)

The Projects section and the Credentials section both fetch live data from
GitHub. Without authentication, GitHub allows 60 requests/hour per IP, which
can get used up quickly while testing. To raise that to 5,000/hour:

1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Generate a new classic token (no special scopes needed for public data)
3. In the project root, create a file named `.env`
4. Add this line to it: `VITE_GITHUB_TOKEN=your_token_here`

---

## Author

Arjun Sharma
BE CSE Student, Chitkara University

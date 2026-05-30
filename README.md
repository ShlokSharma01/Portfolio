# Shlok Sharma — Portfolio

Personal portfolio site for **Shlok Sharma** — Developer · Data Analyst · Designer.

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS v3 (CSS variable design tokens) |
| Animation | Framer Motion · GSAP + ScrollTrigger |
| Smooth scroll | Lenis |
| 3D / WebGL | Three.js · @react-three/fiber · @react-three/drei |
| Fonts | Clash Display · Satoshi · JetBrains Mono |
| Deploy | Vercel |

## Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build

```bash
npm run build      # outputs to /dist
npm run preview    # preview the production build locally
```

## Deploy

The project deploys automatically to Vercel on every push to `main`.  
Manual deploy: `npx vercel --prod` from the project root.

## Assets

Drop your own files into `/public` before pushing:

- `hero.mp4` / `hero.webm` — hero background video
- `hero-poster.png` — video poster frame
- `resume.pdf` — linked from the Contact section
- `/projects/asl.png`, `/projects/scheduling.png` — project screenshots

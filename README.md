# shlok sharma — portfolio

My personal portfolio. Dark, cinematic, built to be fast. Took the "just ship a template" route first — didn't like it, rebuilt it from scratch.

Live: **[shlok-sharma.vercel.app](https://shlok-sharma.vercel.app)**

---

## what's inside

Full-bleed video hero with a looping skull backdrop, WebGL ember particles, GSAP scroll choreography, a Framer Motion entrance system, smooth scrolling via Lenis, and a 3D liquid blob in the skills section. Everything below the hero is pure CSS gradient atmosphere — no background images, no `filter: blur()`, no compositing shortcuts.

Image weight went from 103 MB (uncompressed PNGs straight out of Figma/export) down to 390 KB after a sharp WebP pipeline. CLS is 0 across every section.

---

## stack

**Core**
- [React 18](https://react.dev) + [Vite 5](https://vitejs.dev) + TypeScript
- [Tailwind CSS v3](https://tailwindcss.com) — utility classes driven by CSS custom properties (`--crimson`, `--gold`, `--glass`, etc.)

**Animation & scroll**
- [GSAP 3](https://gsap.com) + ScrollTrigger — section reveals, timeline line-draw, ghost-number parallax, moving glow dot on the Experience timeline
- [Framer Motion 11](https://www.framer.com/motion/) — hero entrance stagger, 3D card tilt, button micro-interactions, scroll-exit parallax via `useScroll` + `useTransform`
- [Lenis 1.3](https://lenis.darkroom.engineering) — smooth scroll at `lerp: 0.1`, wired to GSAP's ticker so ScrollTrigger stays in sync

**3D / WebGL**
- [Three.js](https://threejs.org) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) + [@react-three/drei](https://github.com/pmndrs/drei)
- Hero: 22-point additive-blend ember particle system, `frameloop="never"` when the hero is off-screen
- Skills: distorted metallic sphere using `MeshDistortMaterial`, crimson key light + gold rim, IntersectionObserver pauses the render loop when out of view
- Both canvases lazy-loaded via `React.lazy`, `dpr` capped at 1.5, antialiasing off

**Typography**
- [Clash Display](https://www.fontshare.com/fonts/clash-display) (Fontshare) — headings
- [Satoshi](https://www.fontshare.com/fonts/satoshi) (Fontshare) — body
- [JetBrains Mono](https://www.jetbrains.com/lp/mono/) (Google Fonts) — labels, counters, tags

**Deployment**
- [Vercel](https://vercel.com) — auto-deploys on push to `main`
- Manual chunks: Three.js isolated to its own lazy chunk so the initial JS is ~56 KB gzip

---

## running it locally

```bash
git clone https://github.com/ShlokSharma01/Portfolio.git
cd Portfolio
npm install
npm run dev
```

Opens at `http://localhost:5173`. Hot module replacement works out of the box.

```bash
npm run build    # tsc + vite build → /dist
npm run preview  # serve the production build locally
```

---

## project structure

```
src/
  components/
    Hero.tsx          # video + 5-layer scrim + parallax + scroll-exit
    About.tsx         # editorial headline, image parallax, gradient mesh bg
    Experience.tsx    # GSAP timeline draw + travelling glow dot
    Projects.tsx      # feature card + 3D tilt grid + ghost-number parallax
    Skills.tsx        # magnetic tag grid + lazy 3D blob
    Achievements.tsx  # count-up counters + pulsing glow
    Contact.tsx       # gradient mesh + scroll parallax on headline
    Nav.tsx           # transparent → frosted glass after hero scroll
    canvas/
      HeroEmbers.tsx       # R3F particle system
      SkillsBlob.tsx       # R3F distorted sphere
    ui/
      GlassButton.tsx      # crimson fill sweep / lift+glow variants
      Counter.tsx          # IntersectionObserver count-up
      SectionLabel.tsx     # "01 — ABOUT" mono label
  data/
    projects.ts       # project card content + URLs
    experience.ts     # work history
    skills.ts         # skill groups
  lib/
    gsap.ts           # registers ScrollTrigger once, re-exports
    lenis.ts          # init + scrollToId() helper
  styles/
    index.css         # design tokens, mesh keyframes, marquee, stat-pulse
public/
  hero.mp4            # <5 MB H.264 hero video
  hero-poster.webp    # video poster (36 KB, was 28 MB)
  about-abstract.webp # section image (110 KB, was 31 MB)
  projects/           # project screenshots (WebP, ~12 KB each)
  textures/           # bg-1.webp, bg-2.webp (5 KB each, was 15–23 MB)
```

---

## a few decisions worth noting

**No `filter: blur()` on animated elements.** Every section atmosphere is built from large radial-gradient divs that animate only `transform` and `opacity`. These properties are GPU-composited and don't trigger paint. The old approach used `filter: blur(90px)` on drifting blobs — looks identical, costs significantly more.

**Lenis + GSAP sync.** Lenis runs on GSAP's RAF ticker (`gsap.ticker.add`) and fires `ScrollTrigger.update` on every scroll event. Without this, pinned GSAP sections drift from the smooth-scroll position. The lerp is set to `0.1` — snappy enough to not feel floaty, smooth enough to add polish.

**Image pipeline.** All `/public` images were run through a Node/sharp script (`scripts/optimize-images.mjs`). Output: WebP at quality 68–78, max 1920px wide for hero/textures, 1000px for project cards. Total image weight: 103.8 MB → 0.39 MB.

**Three.js is never in the initial bundle.** `HeroEmbers` and `SkillsBlob` are both `React.lazy()` imports. Vite splits them into separate chunks. The vendor-three chunk (~805 KB uncompressed, ~217 KB gzip) only loads when those components enter the viewport.

---

## lighthouse

Tested from Chrome DevTools on the live Vercel deployment:

| | Score |
|---|---|
| Performance | 93 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |
| CLS | 0 |

---

## to do

- [ ] Add `resume.pdf` to `/public`
- [ ] Drop real screenshots into `/public/projects/` (asl.png, scheduling.png)
- [ ] Update `{{SCHEDULING_REPO_URL}}` in `src/data/projects.ts` once the repo is public
- [ ] Custom domain

---

© 2026 Shlok Sharma

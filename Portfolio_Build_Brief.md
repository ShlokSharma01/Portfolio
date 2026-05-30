# PORTFOLIO BUILD BRIEF — SHLOK SHARMA
### Hand this whole file to Claude Code (Sonnet 4.6). It is the single source of truth for the build.

---

## 0. THE ONE-LINER
A dark, cinematic, futuristic developer portfolio for **Shlok Sharma** — *Developer · Data Analyst · Designer*. A full-bleed looping video hero (a glossy obsidian skull lit in crimson), interactive WebGL 3D in key sections, GSAP scroll choreography, and a blood-red / black / gold palette. Bold and memorable up top; crisp and professional in the substance.

---

## 1. TECH STACK (use exactly this)
- **React 18 + Vite** (JavaScript or TypeScript — TS preferred)
- **Tailwind CSS** for styling, driven by CSS variables (tokens below)
- **three** + **@react-three/fiber** + **@react-three/drei** — WebGL 3D
- **gsap** + **ScrollTrigger** — scroll-pinned reveals and choreography
- **lenis** — smooth scrolling
- **framer-motion** — micro-interactions, card tilt, button states
- Deploy on **Vercel**

Install:
```bash
npm create vite@latest portfolio -- --template react-ts
cd portfolio
npm i three @react-three/fiber @react-three/drei gsap lenis framer-motion
npm i -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 2. DESIGN TOKENS (define as CSS variables in index.css)
```css
:root {
  /* Palette — blood red / obsidian / gold */
  --bg:            #0B0608;   /* near-black, warm red undertone */
  --bg-elev:       #160A0D;   /* elevated surfaces / cards */
  --crimson:       #E10E1F;   /* primary accent */
  --crimson-glow:  #FF2D3F;   /* glows, hovers, highlights */
  --crimson-deep:  #7A0A12;   /* deep shadow red */
  --gold:          #D4AF37;   /* RARE accent only (hover ticks, fine lines) */
  --text:          #F5F1F0;   /* primary text, off-white */
  --text-muted:    #A2969A;   /* secondary text */
  --line:          rgba(255,255,255,0.08); /* hairline borders */
  --glass:         rgba(22,10,13,0.55);    /* glassmorphism fill */
}
```
**Rules:** crimson dominates, gold is used sparingly (it should feel precious). Glass panels = `var(--glass)` + `backdrop-filter: blur(14px)` + 1px `var(--line)` border. Add a subtle film-grain overlay (a fixed noise PNG at ~4% opacity) over the whole site for atmosphere.

---

## 3. TYPOGRAPHY (do NOT use Inter/Roboto/system fonts)
- **Display / headings:** **Clash Display** (Fontshare, free) — heavy weights for the hero name. Alt if heavier wanted: *Unbounded* or *Anton*.
- **Body:** **Satoshi** (Fontshare, free) — clean but with character.
- **Labels / code / stats:** **JetBrains Mono** — for section labels (e.g. `01 — ABOUT`), counters, and code-flavored bits.

Load Clash Display + Satoshi from Fontshare; JetBrains Mono from Google Fonts.

---

## 4. PAGE STRUCTURE & SECTION CONTENT
Single-page scroll site. Section order:

### HERO
- Full-viewport background video (see §5). 
- **Text anchored on the LEFT, vertically centered.** (The skull lives on the right side of the frame.)
- H1: **SHLOK SHARMA** (Clash Display, huge, off-white `--text`, faint crimson glow via text-shadow).
- Sub: `DEVELOPER · DATA ANALYST · DESIGNER` (JetBrains Mono, letter-spaced, `--text-muted`).
- Two buttons (glass): **View Work** (scrolls to Projects) · **Get in Touch** (scrolls to Contact).
- Minimal top nav: `SS` monogram left; links right (About / Work / Skills / Contact). Transparent over hero, gains a blurred glass bg after scroll.
- Animated scroll-down cue bottom-center.

### ABOUT  (label `01 — ABOUT`)
> Third-year B.Tech Computer Science Engineering student at Sharda University, Greater Noida. Currently a Web Systems Engineer & Data Analyst at Coppersmith Creations (UK), working on production web platforms, structured data, analytics workflows, and digital operations. Interests span software engineering, full-stack development, AI/ML, and data analytics — building technology that creates real-world impact.

Pair with the abstract "circuit network" Nano Banana image (no face — faceless by design). Optional subtle 3D abstract object.

### EXPERIENCE  (label `02 — EXPERIENCE`) — vertical timeline
1. **Web Systems Engineer & Data Analyst** — Coppersmith Creations UK / Vani Crafts — *Sep 2025 – Present*. Production web platforms, website maintenance & optimization, structured data management, analytics & reporting, UI/UX improvements, performance monitoring, content/digital-asset management, Google Ads support. Exposure: international e-commerce ops, production platforms, data analytics.
2. **Social Media Handler** — LocalVibez LLP — *Oct 2025 – Nov 2025*. Social account management, content creation & scheduling, branding, community engagement, performance tracking.

### PROJECTS  (label `03 — SELECTED WORK`) — the centerpiece
Three project cards (3D tilt on hover via framer-motion). Each: title, one-line hook, tech chips, **View on GitHub** button (and **Live Demo** if URL exists), plus its visual (real screenshot if provided in `/public/projects/`, else the abstract Nano Banana fallback).

1. **Hotel OS — Smart Hotel Management Platform**  
   *AI-powered hotel ops: digital check-in, AI concierge, real-time staff dashboard, payments, analytics.*  
   Tech: React, Node, Express, MongoDB, Socket.io, JWT, Razorpay, Framer Motion.  
   Repo: `{{https://github.com/ShlokSharma01/Hotel-OS}}` · Live: `{{https://hotel-os-rpvw.vercel.app/}}`

2. **Real-Time ASL Fingerspelling Detection**  
   *Deep-learning computer vision that recognizes ASL alphabet gestures live from webcam.*  
   Tech: Python, PyTorch, OpenCV, Torchvision, ResNet50 (transfer learning).  
   Repo: `{{https://github.com/ShlokSharma01/ASL-Fingerspelling}}`

3. **Project Scheduling System**  
   *Greedy-algorithm scheduler that optimizes project allocation against deadlines, with PostgreSQL.*  
   Tech: Java, PostgreSQL, JDBC.  
   Repo: `{{SCHEDULING_REPO_URL}}` · Live: `{{SCHEDULING_LIVE_URL_OR_REMOVE}}`

> **ACTION FOR SHLOK:** replace the `{{...}}` placeholders with real GitHub/live URLs, and drop screenshots into `/public/projects/` (`hotel-os.png`, `asl.png`, `scheduling.png`). If a repo isn't public yet, point the button at your GitHub profile: https://github.com/ShlokSharma01

### SKILLS  (label `04 — STACK`) — interactive 3D
A draggable 3D **constellation/orbit** of tech (drei sprites or Html labels on a rotating sphere). Grouped:
- Languages: C, Python, Java, JavaScript, SQL
- Web: HTML, CSS, React, Node, Express, REST APIs, Responsive
- Data/DB: MongoDB, PostgreSQL
- AI/ML: Deep Learning, Computer Vision, Transfer Learning, PyTorch
- Tools: Git, GitHub, JWT, Socket.io, Razorpay, Cloudinary, Framer Motion
- Design/Analytics: UI/UX, Branding, Data Analytics, Web Analytics

(If 3D constellation gets heavy, fall back to an animated tag grid with magnetic hover.)

### ACHIEVEMENTS  (label `05 — HIGHLIGHTS`) — animated stat counters
- 🏆 **First Prize — IILM University Hackathon 2025** (theme: *Tech for Good*).
- Hackathons: IILM, CodeAstraa (Galgotias), Technovation (Sharda), PIC 2025, Zomathon.
- **158+** LeetCode problems · **140+** GeeksforGeeks problems (animate count-up on scroll).
- Certification: *Complete AI & ML, Data Science Bootcamp* (Udemy, 44 hrs).

### CONTACT  (label `06 — CONTACT`)
- Big closing line + glass card.
- Email button → `mailto:shlok.spc83@gmail.com`
- Social buttons: GitHub https://github.com/ShlokSharma01 · LinkedIn https://www.linkedin.com/in/shlok-sharma-/ · LeetCode https://leetcode.com/u/shlok_sh01/ · GeeksforGeeks https://www.geeksforgeeks.org/profile/user_i9wbg5mhuaq
- **Download Résumé** button → `/resume.pdf` (put your PDF in `/public`).
- *(Default = mailto + links, no backend, privacy-friendly. If you want a working form later, add Formspree — note it sends data to a third party.)*
- Footer: © 2026 Shlok Sharma. Built with React, Three.js & GSAP.

---

## 5. HERO VIDEO — EXACT SPEC (this is the signature moment)
Files (self-hosted in `/public`, **never** hotlink the CloudFront URL — it expires):
- `/public/hero.mp4` (H.264, compressed, target <5MB, muted) and `/public/hero.webm` (served first).
- `/public/hero-poster.jpg` (a clean still — shows instantly while video loads).

Markup behavior: `autoPlay muted loop playsInline preload="metadata"`, `<source>` webm then mp4, `poster` set. Object-fit cover, centered.

**Legibility recipe (decided):** text sits LEFT; skull lives RIGHT and pans across the loop, but the left third stays dark in every frame.
Layer order, bottom → top:
1. Video.
2. **Left-to-right scrim:** `linear-gradient(90deg, rgba(8,4,5,0.92) 0%, rgba(8,4,5,0.55) 35%, transparent 55%)` — protects the text zone, leaves the skull vivid.
3. **Gentle global darken:** solid `rgba(8,4,5,0.15)` over everything (subtle).
4. **Bottom vignette:** `linear-gradient(to top, rgba(8,4,5,0.85), transparent 30%)` — for nav + scroll cue.
5. Hero text + nav.

Optional polish: a thin R3F layer of slow-rising crimson embers/particles over the video (ties to the fiery skull). Keep it sparse.

**Reduced motion / mobile:** if `prefers-reduced-motion` or a low-power device, show `hero-poster.jpg` instead of autoplaying video. On mobile, keep video full-bleed center-cropped; strengthen the left scrim slightly.

---

## 6. MOTION & SCROLL CHOREOGRAPHY (GSAP + Lenis)
- Lenis smooth scroll, synced to GSAP ScrollTrigger.
- **Page-load:** staggered reveal of hero name → tagline → buttons (Framer Motion, ~80ms stagger).
- **Hero exit:** as you scroll past, video subtly scales up + fades; text drifts up.
- **Section reveals:** each section's heading + content rise with opacity/`y` on enter (ScrollTrigger, once).
- **Projects:** either sticky-stacking cards or a pinned horizontal scroll (pick whichever performs well); cards 3D-tilt toward cursor.
- **Skills:** constellation assembles/spins into place on enter; draggable to rotate.
- **Counters:** LeetCode/GFG/hackathon numbers count up when scrolled into view.
- Custom cursor (small crimson dot that grows on interactive elements). Disable on touch devices.

Keep all motion tasteful — high-impact moments, not constant noise.

---

## 7. PERFORMANCE & QUALITY BARS (non-negotiable)
- **Lazy-load every R3F canvas** (dynamic import + IntersectionObserver) so 3D only mounts when near viewport.
- Compress the hero video hard; serve webm first.
- Respect `prefers-reduced-motion` everywhere (poster instead of video; disable heavy GSAP).
- Provide a **lighter mobile path**: simpler/disabled 3D, poster hero on low-power.
- Lighthouse target: Performance ≥ 85 mobile, Accessibility ≥ 95.
- Semantic HTML, alt text on all images, keyboard-focusable nav and buttons, visible focus rings.
- Test on a real phone before calling it done.

---

## 8. ASSET CHECKLIST (Shlok provides; drop into `/public`)
- [ ] `hero.mp4`, `hero.webm`, `hero-poster.jpg` — from the Higgsfield skull video (compressed)
- [ ] `/projects/hotel-os.png`, `/projects/asl.png`, `/projects/scheduling.png` — real screenshots (or use Nano Banana fallbacks)
- [ ] Background texture(s), about-section abstract, OG image, favicon — Nano Banana, **regenerated in crimson/black/gold** (swap "cyan and violet neon" → "crimson red glow, glossy black, hints of gold" in every prompt)
- [ ] `resume.pdf`
- [ ] `og-image.png` (1200×630) for social sharing
- [ ] `favicon` set (512/192/32) from the `SS` mark
- [ ] Real GitHub/live URLs to replace the `{{...}}` placeholders

---

## 9. SUGGESTED FILE STRUCTURE
```
src/
  components/
    Nav.tsx  Hero.tsx  About.tsx  Experience.tsx
    Projects.tsx  Skills.tsx  Achievements.tsx  Contact.tsx
    canvas/ HeroEmbers.tsx  SkillsConstellation.tsx
    ui/ GlassButton.tsx  SectionLabel.tsx  Cursor.tsx  Counter.tsx
  lib/ lenis.ts  gsap.ts
  data/ projects.ts  experience.ts  skills.ts
  styles/ index.css
public/ hero.mp4 hero.webm hero-poster.jpg resume.pdf og-image.png
        projects/ favicon...
```

## 10. BUILD ORDER (tell Claude Code to go incrementally, test each step)
1. Scaffold Vite + Tailwind + tokens + fonts + Lenis.
2. Layout shell + Nav + smooth scroll.
3. **Hero** with video + scrim recipe + text (get this perfect first).
4. About → Experience → Projects → Skills → Achievements → Contact (content from §4).
5. Add GSAP reveals + counters.
6. Add R3F layers (hero embers, skills constellation) — lazy-loaded.
7. Custom cursor + micro-interactions.
8. Performance pass: reduced-motion, mobile fallbacks, Lighthouse.
9. Deploy to Vercel.

---

## 11. COPY-PASTE KICKOFF PROMPT FOR CLAUDE CODE
> Build a single-page React + Vite + TypeScript developer portfolio per the attached `Portfolio_Build_Brief.md`. Use Tailwind with the CSS-variable tokens defined there, the specified fonts (Clash Display / Satoshi / JetBrains Mono), and the stack (three / @react-three/fiber / drei / gsap+ScrollTrigger / lenis / framer-motion). Follow the build order in §10 and stop after each step so I can review. Start with the scaffold and the Hero section — the video + left-scrim legibility recipe in §5 must be exact. Use placeholder assets where mine aren't in `/public` yet, and leave the `{{...}}` repo URLs as TODOs.

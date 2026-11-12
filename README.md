# Portfolio — Soufiane Ibnaïche

Front-End Developer — React / TypeScript. Bilingual (FR / EN) portfolio built with **React 19, TypeScript (strict), Vite and Tailwind CSS v4** — and **no animation library**: every animation is a small custom hook.

## Getting started

```bash
npm install
npm run dev        # local dev server
npm run typecheck  # strict TypeScript check
npm run build      # production build in /dist
```

Deploy: import the repository on Vercel (framework preset: Vite).

## Architecture

```
src/
├── data/          # Typed content: projects, stack, personal links (site.ts)
├── i18n/          # FR / EN dictionaries + provider (EN is type-checked against FR)
├── hooks/         # Reusable animation & browser hooks
├── components/    # UI primitives (Button, Reveal, Nav, ProjectCard…)
├── lab/           # Interactive demos
└── sections/      # Page sections, composed in App.tsx
```

## Animation hooks

| Hook | What it does | Why it matters |
| --- | --- | --- |
| `useFlip` | FLIP layout animations (First, Last, Invert, Play) with the Web Animations API | Filtered project grid and reorderable list glide without a library |
| `useScrollProgress` | Writes scroll progress to a `--progress` CSS variable | Scroll-driven effects with **zero React re-renders** |
| `useMagnetic` | Pointer-following buttons via the `translate` property in `requestAnimationFrame` | No re-renders, composes with other transforms |
| `useInView` | Single `IntersectionObserver` per element | Powers `<Reveal />` |
| `useTypeLoop` | Type → hold → erase → retype loop (state machine, one timeout at a time), new colour each cycle | Pauses off-screen; screen readers get the full name once |
| `Spring` (`lib/spring.ts`) | Damped-spring physics (Hooke + damping, semi-implicit Euler), frame-rate independent | Natural motion for tilt and glare, no library |
| `useTilt` | 3D card tilt + glare driven by five springs, written to CSS variables | Zero re-renders while hovering |
| `ProjectDialog` | Shared-element transition: the card image morphs into the dialog (FLIP), reversed on close | Accessible modal: focus trap, Escape, focus restore, scroll lock |
| `Stack` marquee | Speed and direction follow scroll velocity (low-pass filtered), skews with the "wind" | One rAF loop, no keyframes |
| `SplitReveal` | Words rise out of clipping masks with a stagger | Screen readers get the plain sentence |
| `useScramble` | Text decodes from random glyphs, replays on hover | Final text reserves the layout: no shift |
| `useCountUp` | Ease-out-expo counter, `Intl.NumberFormat` per locale | Triggered once in view |
| `usePrefersReducedMotion` | `useSyncExternalStore` over `matchMedia` | Every animation respects the OS “reduce motion” setting |

## Accessibility

- Native radio inputs for the shade picker, real `tablist` / `tabpanel` roles on project cards
- Reorderable list works with pointer, touch **and** keyboard (↑ ↓)
- Skip link, visible focus styles, `prefers-reduced-motion` honoured globally

## Before deploying

1. Put your resume at `public/cv-soufiane-ibnaiche.pdf`
2. Optionally add screenshots in `public/projects/` and set `image` in `src/data/projects.ts`
3. Check the links in `src/data/site.ts`

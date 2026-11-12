# PortfolioUX

An interactive portfolio by Andrés Hernández, built around a desktop-inspired interface for exploring projects. Visitors can browse an animated carousel, open project showcases, and follow external links without losing their place.

[Open the portfolio](https://portfolio-ux-beta.vercel.app/)

## What to explore

- **Navigation and gestures:** The carousel uses spring animations, and showcase overlays support swipe-to-close on mobile.
- **Sound:** A shared sound engine plays UI cues after user interaction.
- **Time display:** Live clocks show the visitor’s local time alongside the time in Medellín.

**Stack:** React 19, TypeScript, Vite, Tailwind CSS, and Motion (`framer-motion`).

## Run locally

Use Node.js 24 and npm.

```sh
git clone https://github.com/AndrewArocha/PortfolioUX.git
cd PortfolioUX
npm ci
npm run dev
```

Open the local URL printed by Vite. Run `npm run lint` to check the source or `npm run build` to create a production build.

## Code map

- [`src/components/`](./src/components/) — carousel, home hub, overlays, and project showcases.
- [`src/hooks/`](./src/hooks/) — carousel and showcase controls, plus asset preloading.
- [`src/context/InteractionContext.tsx`](./src/context/InteractionContext.tsx) — shared interaction state.
- [`src/utils/soundEngine.ts`](./src/utils/soundEngine.ts) — UI and ambient audio.

[More projects and contact details](https://github.com/AndrewArocha)

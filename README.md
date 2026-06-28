# Andrés Hernández | UI Engineer Portfolio

A cinematic, highly interactive portfolio built to mimic a modern, tactile operating system. This project serves as both a showcase of my frontend engineering capabilities and a demonstration of deep UX philosophy, featuring custom physics, spatial audio feedback, and seamless state-driven navigation.

**[Live Portfolio OS](https://portfolio-ux-beta.vercel.app/)**

(./public/mainLogoAccent.svg) 

## 🚀 Key Features

* **Custom Sound Engine:** A centralized, global audio manager that syncs tactile UI sounds (typewriter boot sequence, mechanical dial clicks, ambient deep-space hums) to user interactions.
* **Framer Motion Physics:** Complex gesture controls including mobile swipe-to-close overlays, spring-physics carousel tracking, and interactive 3D revolving galleries.
* **4-Stage Boot Sequence:** A cinematic loading experience that guarantees asset extraction and bypasses strict browser autoplay policies for audio synchronization.
* **Non-Destructive Routing:** Custom built `RedirectModal` logic with soft-retention timers that allow users to preview external links while maintaining the portfolio's state in the background.
* **Dual-Timezone Synchronization:** Live, ticking clocks comparing the user's local system time to my operating base in Medellín, complete with reactive day/night visual states.

## 🛠️ Tech Stack

* **Core:** React 18 + Vite
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **Animation:** Framer Motion
* **State Management:** React Context API + Custom Hooks (`useInteraction`, `useCarouselControls`)

## 📂 Project Architecture

The application is structured as a Single Page Application (SPA), utilizing a master `App.tsx` controller to securely mount and unmount "layers" (Carousel, Hub, Showcase) without relying on traditional URL routing.

```text
src/
├── components/          # Feature-grouped component architecture
│   ├── Card/            # Interactive carousel items
│   ├── HomeHub/         # Master UI dashboard and layout
│   ├── Modals/          # Global overlays (Contact, Resume, Redirect)
│   ├── ProjectShowCase/ # Deep-dive view for specific repositories
│   └── UI/              # Boot sequence and asset managers
├── context/             # Global state (InteractionContext)
├── data/                # Hardcoded tech stack and project payloads
├── hooks/               # Extracted logic (useImagePreloader, useHubControls)
└── utils/               # Global engines (soundEngine.ts)
```

## 💻 Local Development

To run this project locally:

Clone the repository:
git clone [https://github.com/AndrewArocha/portfolio-os.git](https://github.com/AndrewArocha/portfolio-os.git)

Navigate into the directory:
cd portfolio-os

Install dependencies:
npm install

npm run dev

## 📬 Contact & Links
LinkedIn: [Andrés Hernández](https://www.linkedin.com/in/andres-hernandez-333b59282)

GitHub: [AndrewArocha](https://github.com/AndrewArocha)

Built with attention to detail and visibility across all devices.

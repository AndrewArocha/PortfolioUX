import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PanInfo } from "framer-motion";
//Components
import ProjectShowcase from "./components/ProjectShowCase/ProjectShowcase";
import ProjectCarouselCard from "./components/Card/ProjectCarouselCard";
import HomeHub from "./components/HomeHub/HomeHub";
//Data
import projects from "./data/projects";
//Hooks
import useCarouselControls from "./hooks/useCarouselControls";
import useShowcaseControls from "./hooks/useShowcaseControls";
import { useInteraction } from "./context/InteractionContext";

function App() {
  const {
    showControlsHint,
    setShowControlsHint,

    isCarouselFocused,
    setIsCarouselFocused,

    didDrag,
    setDidDrag,

    selectedIndex,
    setSelectedIndex,

    openedProjectIndex,
    setOpenedProjectIndex,

    interactionMode,
    setInteractionMode,

    lastSelectedIndex,
    setLastSelectedIndex,
  } = useInteraction();

  useCarouselControls();
  useShowcaseControls();

  const dragThreshold = useRef(false);
  const pointerDownTime = useRef(0);

  const idleBackground =
    "https://static.vecteezy.com/system/resources/thumbnails/072/203/042/small/scenic-mountain-view-at-sunset-with-vibrant-sky-and-green-hills-free-photo.jpg";

  // 1. DERIVED STATE (Fixes ESLint error completely)
  const [hoveredBackground, setHoveredBackground] = useState<string | null>(
    null,
  );

  const activeBackground =
    hoveredBackground ??
    (selectedIndex >= 0 ? projects[selectedIndex]?.image : idleBackground);

  const restoreSelectedBackground = () => {
    setHoveredBackground(null);
  };

  useEffect(() => {
    if (interactionMode !== "carousel") return;

    setShowControlsHint(true);

    const timer = setTimeout(() => {
      setShowControlsHint(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [interactionMode, setShowControlsHint]);

  // 2. POLISHED DRAG LOGIC (Fixes accidental click triggering)
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const wasDragging = dragThreshold.current;
    const dragDuration = performance.now() - pointerDownTime.current;

    dragThreshold.current = false;

    if (!wasDragging && dragDuration < 200) {
      // It was a quick, stationary tap; treat it strictly as a click, not a drag
      setDidDrag(false);
      return;
    }

    if (!isCarouselFocused) return;

    // Set dragging state flag to true instantly to block children click handlers
    setDidDrag(true);

    // Briefly push the reset to the next micro-queue loop
    setTimeout(() => {
      setDidDrag(false);
    }, 50);

    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    const swipePower = Math.abs(offsetX) + Math.abs(velocityX) * 0.18;

    if (
      selectedIndex === 0 &&
      (offsetX > 80 || velocityX > 400) &&
      interactionMode === "carousel"
    ) {
      setInteractionMode("hub");
      setIsCarouselFocused(false);
      setSelectedIndex(-1);
      return;
    }

    let jump = 0;

    if (offsetX < -35 || velocityX < -220) {
      jump = swipePower > 900 ? 2 : 1;
    }

    if (offsetX > 35 || velocityX > 220) {
      jump = swipePower > 900 ? -2 : -1;
    }

    if (jump !== 0) {
      const nextIndex = Math.max(
        0,
        Math.min(projects.length - 1, selectedIndex + jump),
      );

      setSelectedIndex(nextIndex);
      setLastSelectedIndex(nextIndex);
    }
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative h-screen overflow-hidden bg-[#070707]"
      onClick={(event) => {
        if (openedProjectIndex !== null) return;
        if (didDrag) return;

        const carouselZone = window.innerHeight * 0.68;
        const topSafeZone = window.innerHeight * 0.18;
        const bottomSafeZone = topSafeZone + carouselZone;

        const clickedInsideCarousel =
          event.clientY >= topSafeZone && event.clientY <= bottomSafeZone;

        if (clickedInsideCarousel) return;

        setSelectedIndex(-1);
      }}
    >
      {/* HUB LAYER */}
      <AnimatePresence mode="wait">
        {interactionMode === "hub" && <HomeHub key="hub" />}

        {/* DYNAMIC CONTROLS HINT */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{
            opacity: showControlsHint ? 1 : 0,
            y: showControlsHint ? 0 : 10,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="hidden md:block absolute left-8 bottom-8 z-30 rounded-3xl border border-white/10 bg-black/40 px-6 py-5 backdrop-blur-xl pointer-events-none"
        >
          {interactionMode === "hub" ? (
            <div className="flex flex-col items-center gap-2">
              {/* Arrow Keys Layout */}
              <div className="flex gap-2 text-white/70">
                <div className="h-8 w-8 flex items-center justify-center rounded bg-white/10 border border-white/20">
                  ↑
                </div>
              </div>
              <div className="flex gap-2 text-white/70">
                <div className="h-8 w-8 flex items-center justify-center rounded bg-white/10 border border-white/20">
                  ←
                </div>
                <div className="h-8 w-8 flex items-center justify-center rounded bg-white/10 border border-white/20">
                  ↓
                </div>
                <div className="h-8 w-8 flex items-center justify-center rounded bg-white/10 border border-white/20">
                  →
                </div>
              </div>

              {/* Enter Key Action */}
              <div className="mt-2 flex w-full items-center justify-center gap-3 border-t border-white/10 pt-3 text-white/70">
                <div className="flex h-6 px-2 items-center justify-center rounded bg-white/10 border border-white/20 text-[10px] font-bold">
                  ↵ Enter
                </div>
                <span className="text-[10px] uppercase tracking-wider text-white/50">
                  Open Card
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-sm text-white/75">
              <p>
                <span className="text-white font-bold">← →</span>
                <span className="ml-3">Navigate</span>
              </p>
              <p>
                <span className="text-white font-bold">↵</span>
                <span className="ml-3">Open Project</span>
              </p>
              <p>
                <span className="text-white font-bold">Esc</span>
                <span className="ml-3">Back / Close</span>
              </p>
            </div>
          )}
        </motion.div>

        {/*BACKGROUND LOGIC*/}
        <div className="absolute inset-0">
          <motion.img
            key={activeBackground}
            src={activeBackground || idleBackground}
            alt=""
            initial={{
              opacity: 0,
              scale: 1.08,
              x: -35,
            }}
            animate={{
              opacity: 0.28,
              scale: 1.12,
              x: 35,
            }}
            transition={{
              opacity: { duration: 0.8 },
              scale: {
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
              },
              x: {
                duration: 12,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
            className="absolute inset-0 h-full w-full object-cover blur-md"
          />

          <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/45 to-black/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]" />
        </div>

        {/* CAROUSEL LAYER */}
        {interactionMode === "carousel" && (
          <>
            <motion.button
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              onClick={() => {
                setInteractionMode("hub");
                setIsCarouselFocused(false);
                setSelectedIndex(-1);
              }}
              className="absolute top-8 left-8 z-50 flex items-center gap-4 group"
            >
              <div className="h-12 w-12 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center">
                ←
              </div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-white/50">
                Go Back
              </span>
            </motion.button>

            <motion.section
              className="relative z-10 h-full overflow-hidden cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              dragMomentum={false}
              onPointerDown={() => {
                pointerDownTime.current = performance.now();
                setDidDrag(false);
              }}
              onDrag={(_, info) => {
                // Only classify as a real drag if moving beyond a micro-shaking threshold
                if (Math.abs(info.offset.x) > 8) {
                  dragThreshold.current = true;
                  setDidDrag(true);
                }
              }}
              onDragEnd={handleDragEnd}
            >
              {projects.map((project, index) => {
                const isSelected = selectedIndex === index;
                const offset =
                  selectedIndex === -1
                    ? (index - 1) * 680
                    : (index - selectedIndex) * 760;

                return (
                  <motion.div
                    key={project.id}
                    layout
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    initial={false}
                    animate={{
                      x: offset,
                      scale:
                        selectedIndex === -1 ? 0.88 : isSelected ? 1 : 0.72,
                      opacity: selectedIndex === -1 ? 1 : isSelected ? 1 : 0.34,
                      zIndex: isSelected ? 10 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 24,
                      mass: 0.6,
                    }}
                  >
                    <ProjectCarouselCard
                      title={project.title}
                      image={project.image}
                      stack={project.stack}
                      onHover={setHoveredBackground}
                      onHoverEnd={restoreSelectedBackground}
                      isSelected={isSelected}
                      didDrag={didDrag}
                      onSelect={() => {
                        if (selectedIndex === index) {
                          setOpenedProjectIndex(index);
                          setInteractionMode("showcase");
                        } else {
                          setSelectedIndex(index);
                          setLastSelectedIndex(index);
                          setIsCarouselFocused(true);
                        }
                      }}
                    />
                  </motion.div>
                );
              })}
            </motion.section>
          </>
        )}

        {openedProjectIndex !== null && (
          <ProjectShowcase
            project={projects[openedProjectIndex]}
            interactionMode={interactionMode}
            onClose={() => {
              setOpenedProjectIndex(null);
              setSelectedIndex(lastSelectedIndex);
              setInteractionMode("carousel");
              setIsCarouselFocused(true);
            }}
          />
        )}
      </AnimatePresence>
    </motion.main>
  );
}

export default App;

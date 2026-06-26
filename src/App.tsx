import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PanInfo } from 'framer-motion';
//Components
import ProjectShowcase from './components/ProjectShowCase/ProjectShowcase';
import ProjectCarouselCard from './components/Card/ProjectCarouselCard';
import HomeHub from './components/HomeHub/HomeHub';
//Data
import projects from './data/projects';
//Hooks
import useCarouselControls from './hooks/useCarouselControls';
import useShowcaseControls from './hooks/useShowcaseControls';
import { useInteraction } from './context/InteractionContext';

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

  const idleBackground =
    'https://static.vecteezy.com/system/resources/thumbnails/072/203/042/small/scenic-mountain-view-at-sunset-with-vibrant-sky-and-green-hills-free-photo.jpg';

  const [activeBackground, setActiveBackground] =
    useState(projects[0].image);

  const restoreSelectedBackground = () => {
    setActiveBackground(
      selectedIndex >= 0
        ? projects[selectedIndex].image
        : idleBackground
    );
  };

  useEffect(() => {
    if (interactionMode !== 'carousel') return;

    setShowControlsHint(true);

    const timer = setTimeout(() => {
      setShowControlsHint(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [interactionMode, setShowControlsHint]);

  useEffect(() => {
    setActiveBackground(
      projects[selectedIndex]?.image || ''
    );
  }, [selectedIndex]);

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const wasDragging = dragThreshold.current;

    dragThreshold.current = false;

    if (!wasDragging) return;
    if (!isCarouselFocused) return;

    setDidDrag(true);

    setTimeout(() => {
      setDidDrag(false);
    }, 120);

    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;

    const swipePower =
      Math.abs(offsetX) +
      Math.abs(velocityX) * 0.18;

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
        Math.min(
          projects.length - 1,
          selectedIndex + jump
        )
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

        const carouselZone =
          window.innerHeight * 0.68;

        const topSafeZone =
          window.innerHeight * 0.18;

        const bottomSafeZone =
          topSafeZone + carouselZone;

        const clickedInsideCarousel =
          event.clientY >= topSafeZone &&
          event.clientY <= bottomSafeZone;

        if (clickedInsideCarousel) return;

        setSelectedIndex(-1);
      }}
    >
      {/* HUB LAYER - ADDED HERE */}
      <AnimatePresence mode="wait">
        {interactionMode === 'hub' && <HomeHub key="hub" />}

        {interactionMode === 'carousel' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: showControlsHint ? 1 : 0,
              y: showControlsHint ? 0 : 10,
            }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}
            className="absolute left-8 bottom-8 z-30 rounded-3xl border border-white/10 bg-black/30 px-5 py-4 backdrop-blur-xl"
          >
            <div className="space-y-1 text-sm text-white/75">
              <p>
                <span className="text-white">← →</span>
                <span className="ml-2">Navigate</span>
              </p>

              <p>
                <span className="text-white">↵</span>
                <span className="ml-2">Open Project</span>
              </p>

              <p>
                <span className="text-white">Esc</span>
                <span className="ml-2">Back / Close</span>
              </p>
            </div>
          </motion.div>
        )}
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
                repeatType: 'reverse',
              },
              x: {
                duration: 12,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              },
            }}
            className="absolute inset-0 h-full w-full object-cover blur-[12px]"
          />

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/90" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]" />
        </div>

        {/* CAROUSEL LAYER - WRAPPED IN CONDITION */}
        {interactionMode === 'carousel' && (
          <motion.section
            className="relative z-10 h-full overflow-hidden cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            dragMomentum={false}
            onDrag={(_, info) => {
              dragThreshold.current =
                Math.abs(info.offset.x) > 8;
            }}
            onDragEnd={handleDragEnd}
          >
            {projects.map((project, index) => {
              const isSelected =
                selectedIndex === index;

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
                      selectedIndex === -1
                        ? 0.88
                        : isSelected
                          ? 1
                          : 0.72,

                    opacity:
                      selectedIndex === -1
                        ? 1
                        : isSelected
                          ? 1
                          : 0.34,

                    zIndex: isSelected ? 10 : 1,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 24,
                    mass: 0.6,
                  }}
                >
                  <ProjectCarouselCard
                    title={project.title}
                    image={project.image}
                    onHover={setActiveBackground}
                    onHoverEnd={
                      restoreSelectedBackground
                    }
                    isSelected={isSelected}
                    didDrag={didDrag}
                    onSelect={() => {
                      if (selectedIndex === index) {
                        setOpenedProjectIndex(index);
                        setInteractionMode('showcase');
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
        )}

        {openedProjectIndex !== null && (
          <ProjectShowcase
            project={
              projects[openedProjectIndex]
            }
            interactionMode={interactionMode}
            onClose={() => {
              setOpenedProjectIndex(null);
              setSelectedIndex(
                lastSelectedIndex
              );

              setInteractionMode('carousel');
              setIsCarouselFocused(true);
            }}
          />
        )}
      </AnimatePresence>

    </motion.main>
  );
}

export default App;
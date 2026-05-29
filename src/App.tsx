import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import type { PanInfo } from 'framer-motion';

import Card from './components/Card/Card';
import projects from './data/projects';

function App() {
  const [showControlsHint, setShowControlsHint] =
    useState(true);

  const [isCarouselFocused, setIsCarouselFocused] = useState(false);

  const [didDrag, setDidDrag] =
    useState(false);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [lastSelectedIndex, setLastSelectedIndex] =
    useState(0);

  const dragThreshold =
    useRef(false);

  const idleBackground = 'https://static.vecteezy.com/system/resources/thumbnails/072/203/042/small/scenic-mountain-view-at-sunset-with-vibrant-sky-and-green-hills-free-photo.jpg';

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
    const timer = setTimeout(() => {
      setShowControlsHint(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      if (!isCarouselFocused) return;

      if (event.key === 'ArrowRight') {

        if (selectedIndex === -1) {
          setSelectedIndex(
            lastSelectedIndex
          );
          return;
        }

        const next =
          selectedIndex ===
            projects.length - 1
            ? 0
            : selectedIndex + 1;

        setSelectedIndex(next);
        setLastSelectedIndex(next);
      }

      if (event.key === 'ArrowLeft') {

        if (selectedIndex === -1) {
          setSelectedIndex(
            lastSelectedIndex
          );
          return;
        }

        const next =
          selectedIndex === 0
            ? projects.length - 1
            : selectedIndex - 1;

        setSelectedIndex(next);
        setLastSelectedIndex(next);
      }

      if (event.key === 'ArrowDown') {
        setSelectedIndex(-1);
        setIsCarouselFocused(false);
        return;
      }

      if (event.key === 'ArrowUp') {
        setSelectedIndex(lastSelectedIndex);
      }

      if (event.key === 'Escape') {
        setSelectedIndex(-1);
        setIsCarouselFocused(false);
        return;
      }

      if (
        event.key === 'Enter' &&
        selectedIndex !== -1
      ) {
        console.log('open project');
      }

      return;

    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [selectedIndex, lastSelectedIndex,]);

  useEffect(() => {
    setActiveBackground(
      projects[selectedIndex]?.image || ''
    );
  }, [selectedIndex]);

  const handleDragEnd = (
    _: MouseEvent |
      TouchEvent |
      PointerEvent,
    info: PanInfo
  ) => {
    const wasDragging =
      dragThreshold.current;

    dragThreshold.current =
      false;

    if (!wasDragging) return;

    if (!isCarouselFocused)
      return;

    setDidDrag(true);

    setTimeout(() => {
      setDidDrag(false);
    }, 120);

    const offsetX =
      info.offset.x;

    const velocityX =
      info.velocity.x;

    const swipePower =
      Math.abs(offsetX) +
      Math.abs(velocityX) * 0.18;

    let jump = 0;

    if (
      offsetX < -35 ||
      velocityX < -220
    ) {
      jump =
        swipePower > 900
          ? 2
          : 1;
    }

    if (
      offsetX > 35 ||
      velocityX > 220
    ) {
      jump =
        swipePower > 900
          ? -2
          : -1;
    }

    if (jump !== 0) {
      const nextIndex =
        Math.max(
          0,
          Math.min(
            projects.length - 1,
            selectedIndex + jump
          )
        );

      setSelectedIndex(
        nextIndex
      );

      setLastSelectedIndex(
        nextIndex
      );
    }
  };

  return (

    <main className="relative h-screen overflow-hidden bg-[#070707]" 
    
    onClick={(event) => {
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

    if (
        clickedInsideCarousel
    )
        return;

    setSelectedIndex(-1);
}}>

      {/* Keyboard hint */}
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
        className="
                    absolute
                    left-8
                    bottom-8
                    z-30
                    rounded-3xl
                    border
                    border-white/10
                    bg-black/30
                    px-5
                    py-4
                    backdrop-blur-xl
                "
      >
        <p className="text-sm text-white/75">
          You can use the arrow keys
          <span className="ml-2 text-white">
            ← →
          </span>
          {' '}to navigate
        </p>
      </motion.div>

      {/* Background */}

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
            opacity: {
              duration: 0.8,
            },
            scale: {
              duration: 12,
              repeat: Infinity,
              repeatType:
                'reverse',
            },
            x: {
              duration: 12,
              repeat: Infinity,
              repeatType:
                'reverse',
              ease: 'easeInOut',
            },
          }}
          className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                        blur-[12px]
                    "
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/90" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      {/* Cards */}
      <motion.section
        className="
                                  relative
                                  z-10
                                  h-full
                                  overflow-hidden
                                  cursor-grab
                                  active:cursor-grabbing
                              "
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        dragElastic={0.07}
        dragMomentum={false}
        onDrag={(_, info) => {
          dragThreshold.current =
            Math.abs(
              info.offset.x
            ) > 8;
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
              className="
                                    absolute
                                    left-1/2
                                    top-1/2
                                    -translate-x-1/2
                                    -translate-y-1/2
                                "
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

                zIndex:
                  isSelected
                    ? 10
                    : 1,
              }}
              transition={{
                type: 'spring',
                stiffness: 115,
                damping: 18,
                mass: 0.9,
              }}
            >
              <Card
                title={project.title}
                image={project.image}
                onHover={setActiveBackground}
                onHoverEnd={
                  restoreSelectedBackground
                }
                isSelected={isSelected}
                didDrag={didDrag}
                onSelect={() => {
                  if (
                    selectedIndex === index
                  ) {
                    console.log(
                      'open project'
                    );
                  } else {
                    setSelectedIndex(index);
                    setLastSelectedIndex(
                      index
                    );
                    setIsCarouselFocused(
                      true
                    );
                  }
                }}
              />
            </motion.div>
          );
        })}
      </motion.section>
    </main>
  );
}

export default App;
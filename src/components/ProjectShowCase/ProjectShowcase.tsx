import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { techStack } from "../../data/techStack";
import mainLogoAccent from "../../assets/logo/mainLogoAccent.svg";
import { useInteraction } from "../../context/InteractionContext";
// THE FIX: Imported missing audio files
import { playGalleryClick, playModalOpen, playBack } from "../../utils/soundEngine";
import ContactModal from "../Modals/ContactModal";
import RedirectModal from "../Modals/RedirectModal";

type ProjectShowcaseProps = {
  project: {
    id: number;
    title: string;
    image: string;
    description?: string;
    stack?: Array<keyof typeof techStack>;
    gallery?: string[];
    githubUrl?: string;
    liveDemoUrl?: string;
  };
  onClose: () => void;
  interactionMode: "carousel" | "menu" | "showcase" | "hub";
};

function ProjectShowcase({ project, onClose }: ProjectShowcaseProps) {
  // THE FIX: Extracted tools to properly kill the showcase layer!
  const { 
    setInteractionMode, 
    setOpenedProjectIndex, 
    setSelectedIndex, 
    setIsCarouselFocused 
  } = useInteraction();
  
  const [rotationIndex, setRotationIndex] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isRedirectOpen, setIsRedirectOpen] = useState(false);

  // THE FIX: Master routing function to securely hand off to the Hub
  const handleRouteToHub = (modalName: string) => {
    sessionStorage.setItem('hubAutoOpen', modalName); 
    setOpenedProjectIndex(null); // Kills this ProjectShowcase layer!
    setSelectedIndex(-1); // Clears the active carousel card
    setIsCarouselFocused(false); 
    setInteractionMode("hub"); // Routes immediately to Hub
  };

  const description = project.description || "Project description placeholder text goes here...";
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];
  const activeGalleryIndex = ((rotationIndex % gallery.length) + gallery.length) % gallery.length;
  const activeImage = gallery[activeGalleryIndex];

  useEffect(() => {
    setInteractionMode("showcase");
  }, [setInteractionMode]);

  useEffect(() => {
    const handleGalleryNavigation = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        e.preventDefault();
        setRotationIndex((prev) => prev - 1);
        playGalleryClick();
      } else if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        e.preventDefault();
        setRotationIndex((prev) => prev + 1);
        playGalleryClick();
      }
    };
    window.addEventListener("keydown", handleGalleryNavigation);
    return () => window.removeEventListener("keydown", handleGalleryNavigation);
  }, [gallery.length]);

  return (
    <motion.div
      layoutId={`project-${project.title}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      drag={isDrawerOpen ? false : "x"}
      dragDirectionLock={true}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.15}
      onDragEnd={(_, info) => {
        if (Math.abs(info.offset.x) > 100 || Math.abs(info.velocity.x) > 400) {
          playBack(); // THE FIX: Swiping closed triggers Back sound!
          onClose();
        }
      }}
      className="fixed inset-0 z-50 overflow-hidden bg-[#070707] text-white"
    >
      <motion.img
        key={`bg-${activeImage}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        src={activeImage}
        alt={project.title}
        className="absolute inset-0 h-full w-full object-cover blur-sm scale-105 pointer-events-none"
      />
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_50%,rgba(7,7,7,0.45)_100%)]" />

      <button
        onClick={() => { playBack(); onClose(); }} // THE FIX: 'X' button triggers Back sound!
        onPointerDown={(e) => e.stopPropagation()}
        className="fixed top-6 right-6 z-[100] h-14 w-14 rounded-full border border-white/10 bg-black/35 backdrop-blur-xl text-white/70 transition-all hover:scale-105 hover:bg-white/10 hover:text-white active:scale-95 opacity-30"
        aria-label="Close Project"
      >
        <svg viewBox="0 0 24 24" className="mx-auto h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6 6 18" />
          <path d="M6 6 18 18" />
        </svg>
      </button>

      {/* MOBILE & TABLET VIEW */}
      <div className="xl:hidden relative z-10 h-full w-full flex flex-col">
        <div className="flex-1 px-8 pt-16 pointer-events-auto" onPointerDown={(e) => e.stopPropagation()}>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
              <img src={mainLogoAccent} alt="{A}" className="h-8 w-8 object-contain" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#efc07b]">Featured Project</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight leading-none text-white mb-2">{project.title}</h1>
          <p className="text-lg font-medium text-orange-300/90 mb-6">Adventure far. Discover more.</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {project.stack?.map((techKey: keyof typeof techStack) => {
              const tech = techStack[techKey];
              return (
                <div key={techKey} title={tech?.name || techKey} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/4 backdrop-blur-xl">
                  {tech?.icon ? <img src={tech.icon} alt={tech.name} className="h-5 w-5 object-contain opacity-90" /> : <span className="text-[9px] font-medium text-white/70">{techKey}</span>}
                </div>
              );
            })}
          </div>

          <p className="text-sm leading-relaxed text-white/70 mb-8 max-w-[400px]">{description}</p>

          <div className="flex gap-3">
            {/* THE FIX: Mobile buttons trigger playModalOpen */}
            <button onClick={() => { playModalOpen(); setIsRedirectOpen(true); }} className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-300 text-black transition-transform active:scale-95">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
            </button>
            <button onClick={() => { playModalOpen(); setIsContactOpen(true); }} className="flex-1 h-12 rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white transition-all active:bg-white/10">Contact Me</button>
          </div>
        </div>

        <motion.div
          drag="y" dragDirectionLock={true}
          dragConstraints={isDrawerOpen ? { top: 0, bottom: window.innerHeight * 0.85 - 90 } : { top: -(window.innerHeight * 0.85 - 90), bottom: 0 }}
          dragElastic={0.2} whileDrag={{ cursor: "grabbing" }}
          onDragEnd={(_, info) => {
            if (!isDrawerOpen) { if (info.offset.y < -30 || info.velocity.y < -300) setIsDrawerOpen(true); } 
            else { if (info.offset.y > 30 || info.velocity.y > 300) setIsDrawerOpen(false); }
          }}
          variants={{ open: { y: 0 }, closed: { y: window.innerHeight * 0.85 - 90 } }}
          initial="closed" animate={isDrawerOpen ? "open" : "closed"} transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="absolute bottom-0 left-0 w-full h-[85dvh] bg-black/60 backdrop-blur-2xl border-t border-white/10 rounded-t-[40px] z-20 flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
        >
          <div onClick={() => setIsDrawerOpen(!isDrawerOpen)} className="h-[90px] w-full flex flex-col items-center justify-center cursor-pointer shrink-0">
            <motion.div animate={{ y: isDrawerOpen ? 0 : [0, -4, 0] }} transition={{ repeat: isDrawerOpen ? 0 : Infinity, duration: 2, ease: "easeInOut" }} className="text-white/50 mb-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={isDrawerOpen ? "rotate-180 transition-transform" : "transition-transform"}><path d="m18 15-6-6-6 6" /></svg>
            </motion.div>
            <span className="text-[10px] uppercase tracking-widest text-white/40 font-medium">{isDrawerOpen ? "Close Gallery" : "View Gallery"}</span>
          </div>

          <div className="flex-1 px-6 pb-6 flex flex-col min-h-0">
            <div className="flex-1 relative rounded-4xl overflow-hidden border border-white/10 bg-black/40 mb-4 min-h-0 pointer-events-none">
              <img src={activeImage} alt={project.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
            </div>

            <motion.div
              className="h-[100px] relative w-full flex justify-center items-center shrink-0 touch-none"
              onPanEnd={(_, info) => {
                if (Math.abs(info.offset.x) > Math.abs(info.offset.y)) {
                  if (info.offset.x < -30) { setRotationIndex((prev) => prev + 1); playGalleryClick(); }
                  if (info.offset.x > 30) { setRotationIndex((prev) => prev - 1); playGalleryClick(); }
                }
              }}
            >
              <AnimatePresence mode="popLayout">
                {[-2, -1, 0, 1, 2].map((offset) => {
                  const absoluteIndex = rotationIndex + offset;
                  const galleryIdx = ((absoluteIndex % gallery.length) + gallery.length) % gallery.length;
                  const img = gallery[galleryIdx];
                  const isCenter = offset === 0;

                  return (
                    <motion.div
                      key={absoluteIndex}
                      onClick={(e) => { e.stopPropagation(); setRotationIndex(rotationIndex + offset); playGalleryClick(); }}
                      initial={{ x: (offset + Math.sign(offset) * 0.5) * 80, y: Math.abs(offset) * 15 + 20, opacity: 0, scale: 0.6 }}
                      animate={{ x: offset * 80, y: Math.abs(offset) * 15, scale: isCenter ? 1 : 0.75 - Math.abs(offset) * 0.1, opacity: isCenter ? 1 : 0.4 }}
                      exit={{ x: (offset + Math.sign(offset) * 0.5) * 80, y: Math.abs(offset) * 15 + 20, opacity: 0, scale: 0.6 }}
                      transition={{ type: "spring", stiffness: 260, damping: 25 }}
                      className={`absolute h-16 w-16 cursor-pointer rounded-full overflow-hidden border-2 ${isCenter ? "border-[#efc07b] shadow-[0_0_20px_rgba(239,192,123,0.3)] z-20" : "border-white/15 z-10"}`}
                    >
                      <img src={img} alt="Gallery thumbnail" className="h-full w-full object-cover pointer-events-none" />
                      {!isCenter && <div className="absolute inset-0 bg-black/40 pointer-events-none" />}
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden xl:flex relative z-10 h-full w-full justify-between px-24 py-16">
        <section className="w-[38%] 2xl:w-[45%] h-full flex flex-col">
          <div className="h-[20%] flex flex-col justify-start pt-4">
            <div className="mb-4 flex items-center gap-4">
              <span className="text-xs uppercase tracking-[0.3em] text-[#efc07b]">Featured Project</span>
              <div className="h-px w-32 bg-[#efc07b]/30" />
            </div>
            <div className="h-14 w-14 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
              <img src={mainLogoAccent} alt="{A}" className="h-8 w-8 object-contain" />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-start pt-[6vh]">
            <h1 className="mb-6 text-6xl font-bold tracking-tight leading-none text-white">{project.title}</h1>
            <p className="mb-6 text-2xl font-medium text-orange-300/90">Adventure far. Discover more.</p>

            <div className="mb-8 flex flex-wrap gap-3">
              {project.stack?.map((techKey: keyof typeof techStack) => {
                const tech = techStack[techKey];
                return (
                  <div key={techKey} title={tech?.name || techKey} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/4 backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:bg-white/[0.07]">
                    {tech?.icon ? <img src={tech.icon} alt={tech.name} className="h-6 w-6 object-contain opacity-90" /> : <span className="text-[10px] font-medium text-white/70">{techKey}</span>}
                  </div>
                );
              })}
            </div>

            <p className="max-w-[520px] text-base leading-relaxed text-white/70">{description}</p>

            <div className="mt-20 flex gap-4" onPointerDown={(e) => e.stopPropagation()}>
              {/* THE FIX: Desktop buttons trigger playModalOpen */}
              <button onClick={() => { playModalOpen(); setIsRedirectOpen(true); }} className="rounded-full bg-orange-300 px-7 py-4 text-sm font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]">
                View GitHub
              </button>
              <button onClick={() => { playModalOpen(); setIsContactOpen(true); }} className="rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10">
                Contact Me
              </button>
            </div>
          </div>
        </section>

        <section className="flex flex-1 items-center justify-start pl-15 pt-[6vh]">
          <div className="relative h-[65vh] max-h-[580px] w-[48vw] 2xl:w-[55vw] overflow-hidden rounded-[34px] border border-white/10 bg-black/20 backdrop-blur-xl pointer-events-none">
            <img src={activeImage} alt={project.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
          </div>
        </section>

        <section className="relative flex h-full w-[400px] items-center justify-end">
          <motion.div
            className="relative h-full w-full flex justify-end items-center touch-none"
            onPointerDown={(e) => e.stopPropagation()} 
            onPanEnd={(_, info) => {
              if (info.offset.y < -30 || info.velocity.y < -200) { setRotationIndex((prev) => prev + 1); playGalleryClick(); }
              else if (info.offset.y > 30 || info.velocity.y > 200) { setRotationIndex((prev) => prev - 1); playGalleryClick(); }
            }}
          >
            <AnimatePresence mode="popLayout">
              {[-2, -1, 0, 1, 2].map((offset) => {
                const absoluteIndex = rotationIndex + offset;
                const galleryIdx = ((absoluteIndex % gallery.length) + gallery.length) % gallery.length;
                const img = gallery[galleryIdx];
                const isCenter = offset === 0;

                return (
                  <motion.div
                    key={absoluteIndex}
                    onClick={() => { setRotationIndex(rotationIndex + offset); playGalleryClick(); }}
                    initial={{ y: (offset + Math.sign(offset) * 0.5) * 136, x: Math.abs(offset) * 18 + 20, opacity: 0, scale: 0.6 }}
                    animate={{ y: offset * 136, x: Math.abs(offset) * 28, scale: isCenter ? 1 : 0.75 - Math.abs(offset) * 0.1, opacity: isCenter ? 1 : 0.5 - Math.abs(offset) * 0.2 }}
                    exit={{ y: (offset + Math.sign(offset) * 0.5) * 136, x: Math.abs(offset) * 28 + 20, opacity: 0, scale: 0.6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 25 }}
                    className={`absolute right-8 top-1/2 -mt-16 h-32 w-32 cursor-pointer rounded-full overflow-hidden border-2 ${isCenter ? "border-[#efc07b] shadow-[0_0_30px_rgba(239,192,123,0.25)] z-20" : "border-white/15 z-10"}`}
                  >
                    <img src={img} alt="Gallery thumbnail" className="h-full w-full object-cover pointer-events-none" />
                    {!isCenter && <div className="absolute inset-0 bg-black/40 pointer-events-none" />}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </section>
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => { playBack(); setIsContactOpen(false); }}
        onOpenProjects={() => { setIsContactOpen(false); onClose(); }}
        onOpenResume={() => { setIsContactOpen(false); handleRouteToHub('resume'); }}
        onOpenAbout={() => { setIsContactOpen(false); handleRouteToHub('about'); }}
      />
      
      <RedirectModal
        isOpen={isRedirectOpen}
        onClose={() => { playBack(); setIsRedirectOpen(false); }}
        url={project.githubUrl || "#"}
        onOpenProjects={() => { setIsRedirectOpen(false); onClose(); }}
        onOpenResume={() => { setIsRedirectOpen(false); handleRouteToHub('resume'); }}
        onOpenAbout={() => { setIsRedirectOpen(false); handleRouteToHub('about'); }}
      />
    </motion.div>
  );
}

export default ProjectShowcase;
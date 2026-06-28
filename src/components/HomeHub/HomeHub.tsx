import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useInteraction } from "../../context/InteractionContext";
import useHubControls from "../../hooks/useHubControls";
import mainLogoAccent from "../../assets/logo/mainLogoAccent.svg";
import profilePic from "../../assets/profilePic.png";
// THE FIX: Added playDownload
import { playHover, playModalOpen, playBack, playDownload } from "../../utils/soundEngine";
import ContactModal from "../Modals/ContactModal";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  exit: { opacity: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95, filter: "blur(10px)" },
  show: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", transition: { type: "spring", stiffness: 200, damping: 20 } },
  exit: { opacity: 0, y: -20, scale: 0.95, filter: "blur(10px)" },
};

export default function HomeHub() {
  const { setInteractionMode, setIsCarouselFocused, setSelectedIndex, lastSelectedIndex } = useInteraction();
  const { hubIndex, setHubIndex } = useHubControls(4);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [medellinTime, setMedellinTime] = useState("");
  const [visitorTime, setVisitorTime] = useState("");
  const [isMedellinDaytime, setIsMedellinDaytime] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);

  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const initialHubMount = useRef(true);

  useEffect(() => {
    const autoOpen = sessionStorage.getItem('hubAutoOpen');
    if (autoOpen) {
      setTimeout(() => {
        playModalOpen();
        if (autoOpen === 'resume') { setHubIndex(3); setIsResumeOpen(true); }
        if (autoOpen === 'about') { setHubIndex(0); setIsAboutOpen(true); }
        if (autoOpen === 'contact') { setHubIndex(4); setIsContactOpen(true); }
        sessionStorage.removeItem('hubAutoOpen');
      }, 150);
    }
  }, [setHubIndex]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: (e.clientX / window.innerWidth - 0.5) * 20, y: (e.clientY / window.innerHeight - 0.5) * 20 });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const medellinStr = new Intl.DateTimeFormat("en-US", { timeZone: "America/Bogota", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true }).format(now);
      setMedellinTime(medellinStr);
      const medellinHour = parseInt(new Intl.DateTimeFormat("en-US", { timeZone: "America/Bogota", hour: "numeric", hour12: false }).format(now), 10);
      setIsMedellinDaytime(medellinHour >= 6 && medellinHour < 18);
      setIsAvailable(medellinHour >= 7 && medellinHour < 21);
      const visitorStr = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }).format(now);
      setVisitorTime(visitorStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (initialHubMount.current) {
      initialHubMount.current = false;
      return;
    }
    playHover();
  }, [hubIndex]);

  const handleOpenCarousel = useCallback(() => {
    setInteractionMode("carousel");
    setIsCarouselFocused(true);
    setSelectedIndex(lastSelectedIndex >= 0 ? lastSelectedIndex : 0);
  }, [setInteractionMode, setIsCarouselFocused, setSelectedIndex, lastSelectedIndex]);



  useEffect(() => {
    const handleHubEnter = (e: KeyboardEvent) => {
      const isAnyModalOpen = isAboutOpen || isTimezoneOpen || isResumeOpen || isContactOpen;

      if (e.key === "Enter" && !isAnyModalOpen) {
        playModalOpen();
        if (hubIndex === 0) setIsAboutOpen(true);
        if (hubIndex === 1) handleOpenCarousel();
        if (hubIndex === 2) setIsTimezoneOpen(true);
        if (hubIndex === 3) setIsResumeOpen(true);
        if (hubIndex === 4) setIsContactOpen(true);
      }

      if (e.key === "Escape") {
        if (isAnyModalOpen) playBack();
        setIsAboutOpen(false);
        setIsTimezoneOpen(false);
        setIsResumeOpen(false);
        setIsContactOpen(false);
      }
    };
    window.addEventListener("keydown", handleHubEnter);
    return () => window.removeEventListener("keydown", handleHubEnter);
  }, [hubIndex, isAboutOpen, isTimezoneOpen, isResumeOpen, isContactOpen, handleOpenCarousel]);

  return (
    <>
      <AnimatePresence>
        <motion.div initial="hidden" animate="show" exit="exit" className="absolute inset-0 w-full h-full bg-[#070707] text-white overflow-x-hidden overflow-y-auto flex flex-col items-center justify-start md:justify-center px-4 pt-28 pb-12 lg:p-12 custom-scrollbar">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <motion.div animate={{ opacity: [0.15, 0.25, 0.15], scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-teal-500/10 rounded-full blur-[120px]" />
            <motion.div animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1], x: mousePosition.x * -2, y: mousePosition.y * -2 }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-orange-500/10 rounded-full blur-[100px]" />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
          </div>

          <motion.header variants={itemVariants} className="absolute top-0 left-0 w-full px-5 py-6 md:px-8 md:py-8 flex justify-between items-center z-50">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="h-10 w-10 md:h-12 md:w-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-md">
                <img src={mainLogoAccent} alt="Logo" className="h-5 w-5 md:h-6 md:w-6 object-contain" />
              </div>
              <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold text-white/50">Portfolio OS</span>
            </div>

            <div className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full animate-pulse ${isAvailable ? "bg-teal-400" : "bg-[#FBBF24]"}`} />
              <span className={`text-[9px] md:text-[11px] uppercase tracking-widest font-medium ${isAvailable ? "text-teal-400/80" : "text-[#FBBF24]/80"}`}>
                {isAvailable ? "Available" : "AFK"}
              </span>
            </div>
          </motion.header>

          <motion.main variants={containerVariants} className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 auto-rows-[115px] md:auto-rows-[160px]">
            {/* HERO */}
            <motion.button
              variants={itemVariants}
              onClick={() => { playModalOpen(); setHubIndex(0); setIsAboutOpen(true); }}
              onHoverStart={() => { setHubIndex(0); }}
              whileHover={{ scale: 0.99 }} whileTap={{ scale: 0.98 }} style={{ x: mousePosition.x * 0.3, y: mousePosition.y * 0.3 }}
              className={`col-span-2 row-span-2 md:col-span-8 relative overflow-hidden rounded-4xl md:rounded-[40px] p-6 md:p-10 flex flex-col justify-center text-left transition-all duration-300 cursor-pointer ${hubIndex === 0 ? "border-2 border-teal-500/50 bg-teal-500/10 shadow-[0_0_40px_rgba(45,212,191,0.15)]" : "border border-white/10 bg-white/2 hover:bg-white/4 backdrop-blur-xl"}`}
            >
              <div className="relative z-10">
                <p className={`text-[10px] md:text-sm font-medium tracking-widest uppercase mb-2 md:mb-4 transition-colors ${hubIndex === 0 ? "text-teal-300" : "text-teal-400/80"}`}>UI Engineer & Frontend Developer</p>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter text-white mb-1 md:mb-2 leading-[0.9]">Andrés <br /> <span className="text-white/50">Hernández</span></h1>
                <p className="hidden sm:block max-w-md text-white/40 mt-3 md:mt-4 text-xs md:text-sm leading-relaxed">Translating a decade of leadership and operations into scalable, highly interactive web applications. Click to access personnel files.</p>
              </div>
            </motion.button>

            {/* PORTFOLIO */}
            <motion.button
              variants={itemVariants}
              onClick={() => { playModalOpen(); setHubIndex(1); handleOpenCarousel(); }}
              onHoverStart={() => { setHubIndex(1); }}
              whileHover={{ scale: 0.98 }} whileTap={{ scale: 0.95 }}
              className={`col-span-1 row-span-1 md:col-span-4 md:row-span-2 relative group overflow-hidden rounded-4xl md:rounded-[40px] p-4 md:p-0 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${hubIndex === 1 ? "border-2 border-white/40 bg-white/10 shadow-[0_0_30px_rgba(255,255,255,0.1)]" : "border border-white/10 bg-linear-to-br from-[#1a1a1a] to-[#0a0a0a]"}`}
            >
              <div className="relative z-10 flex flex-col items-center">
                <div className={`w-12 h-12 md:w-20 md:h-20 mb-3 md:mb-6 rounded-full flex items-center justify-center transition-all duration-300 ${hubIndex === 1 ? "bg-teal-400/20 border-teal-400/40" : "bg-white/5 border-white/10"}`}>
                  <svg viewBox="0 0 24 24" className={`w-5 h-5 md:w-8 transition-colors ${hubIndex === 1 ? "text-orange-400" : "text-white"}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
                <h3 className={`text-sm md:text-2xl font-semibold tracking-tight transition-colors ${hubIndex === 1 ? "text-orange-400" : "text-white"}`}>Projects</h3>
              </div>
            </motion.button>

            {/* LOCATION */}
            <motion.button
              variants={itemVariants}
              onClick={() => { playModalOpen(); setHubIndex(2); setIsTimezoneOpen(true); }}
              onHoverStart={() => { setHubIndex(2); }}
              whileHover={{ scale: 0.98 }} whileTap={{ scale: 0.95 }}
              className={`col-span-1 row-span-1 md:col-span-4 p-5 md:p-6 relative overflow-hidden rounded-4xl md:rounded-4xl flex flex-col md:flex-row items-start md:items-center justify-center md:justify-start gap-2 md:gap-6 text-left transition-all duration-300 cursor-pointer ${hubIndex === 2 ? "border-2 border-orange-500/50 bg-orange-500/10" : "border border-white/10 bg-white/2 hover:bg-white/4 backdrop-blur-md"}`}
            >
              <div className="w-10 h-10 md:w-16 md:h-16 rounded-full overflow-hidden bg-black/50 border border-white/10 relative shrink-0 flex items-center justify-center text-lg md:text-2xl">{isMedellinDaytime ? "☀️" : "🌌"}</div>
              <div>
                <p className="hidden md:block text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Local Base — Medellín</p>
                <p className="md:hidden text-[9px] text-orange-300 uppercase tracking-[0.2em] mb-0.5">Medellín</p>
                <p className="text-sm md:text-lg font-medium text-white/90 tabular-nums">{medellinTime || "..."}</p>
              </div>
            </motion.button>

            {/* RESUME */}
            <motion.button
              variants={itemVariants}
              onClick={() => { playModalOpen(); setHubIndex(3); setIsResumeOpen(true); }}
              onHoverStart={() => { setHubIndex(3); }}
              whileHover={{ scale: 0.98 }} whileTap={{ scale: 0.95 }}
              className={`col-span-1 row-span-1 md:col-span-4 p-5 md:p-6 relative overflow-hidden rounded-4xl md:rounded-4xl flex flex-col md:flex-row items-start md:items-center justify-center md:justify-between gap-3 md:gap-0 transition-all duration-300 cursor-pointer ${hubIndex === 3 ? "border-2 border-white/40 bg-white/10" : "border border-white/10 bg-white/2 hover:bg-white/4"}`}
            >
              <div className="text-left">
                <p className="hidden md:block text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Curriculum Vitae</p>
                <h3 className="text-sm md:text-xl font-medium text-white/90">Resume</h3>
              </div>
              <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-colors ${hubIndex === 3 ? "bg-white/15 border-white/30" : "bg-white/5 border-white/10"}`}>
                <svg viewBox="0 0 24 24" className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${hubIndex === 3 ? "text-white" : "text-white/50"}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </div>
            </motion.button>

            {/* CONTACT */}
            <motion.button
              variants={itemVariants}
              onClick={() => { playModalOpen(); setHubIndex(4); setIsContactOpen(true); }}
              onHoverStart={() => { setHubIndex(4); }}
              whileHover={{ scale: 0.98 }} whileTap={{ scale: 0.95 }}
              className={`col-span-1 row-span-1 md:col-span-4 p-5 md:p-6 relative overflow-hidden rounded-4xl md:rounded-4xl flex flex-col md:flex-row items-start md:items-center justify-center md:justify-between gap-3 md:gap-0 transition-all duration-300 cursor-pointer ${hubIndex === 4 ? "border-2 border-white/40 bg-white/10" : "border border-white/10 bg-white/2 hover:bg-white/4"}`}
            >
              <div className="text-left">
                <p className="hidden md:block text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Links & Email</p>
                <h3 className="text-sm md:text-xl font-medium text-white/90">Contact</h3>
              </div>
              <div className={`w-8 h-8 md:w-12 md:h-12 rounded-full border flex items-center justify-center transition-colors ${hubIndex === 4 ? "bg-orange-500/30 border-orange-500/50" : "bg-white/5 border-white/10"}`}>
                <svg viewBox="0 0 24 24" className={`w-4 h-4 md:w-5 md:h-5 transition-colors ${hubIndex === 4 ? "text-orange-400" : "text-white/50"}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
            </motion.button>
          </motion.main>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {/* ABOUT ME MODAL */}
        {isAboutOpen && (
          <motion.div initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(20px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 md:p-6" onClick={() => { playBack(); setIsAboutOpen(false); }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto custom-scrollbar rounded-4xl md:rounded-[40px] border border-white/10 bg-[#0f0f0f]/95 p-6 md:p-10 shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-teal-400 to-orange-400" />
              <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">

                {/* THE FIX: Breathing Image restored! */}
                <div className="flex flex-row md:flex-col items-center md:items-start gap-5 w-full md:w-auto shrink-0">
                  <div className="shrink-0 w-24 h-32 md:w-48 md:h-64 rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_30px_rgba(45,212,191,0.15)]">
                    {/* THE FIX: The true cinematic parallax pan! */}
                    <motion.img
                      initial={{ scale: 1.025 }}
                      animate={{
                        x: ["-1.5%", "1.5%", "-1.5%"],
                        y: ["-0.75%", "0.75%", "-0.75%"]
                      }}
                      transition={{ repeat: Infinity, duration: 12, ease: "easeInOut" }}
                      src={profilePic}
                      alt="Andrés Hernández"
                      className="w-full h-full object-cover object-top origin-center"
                    />
                  </div>
                  <h2 className="md:hidden text-3xl font-bold tracking-tight text-white">The Human <br /><span className="text-teal-400">Layer</span></h2>
                </div>

                <div className="flex-1">
                  <h2 className="hidden md:block text-4xl font-bold tracking-tight text-white mb-6">The Human <span className="text-teal-400">Layer</span></h2>
                  <div className="space-y-3 md:space-y-4 text-white/70 leading-relaxed text-xs md:text-sm">
                    <p>I am transitioning into frontend development after over 10 years of experience in leadership, operations, and customer service. Leading teams and managing high-volume BDC operations taught me deep empathy and the importance of user-centric systems.</p>
                    <p>I am naturally nonchalant and unbothered by high-stress environments. I don't let anxiety dictate my pace; instead, I hyperfocus on complex issues until they are solved. People often come to me for advice because I handle frustration well and operate at a quick tempo without rushing others.</p>
                    <p>I fully embrace the "lazy programmer" mentality: if a workflow takes too much manual effort, I will engineer an automated system so we never have to do it manually again. Endless optimization lights a fire in my soul.</p>
                    <p>When I'm off the clock, I'm an avid gamer (which heavily inspired this interface), I play the guitar, maintain a deep appreciation for nature, and occasionally unwind to an indie or classical music playlist.</p>
                  </div>
                </div>
              </div>
              {/* Resume button and Close button */}
              <div className="mt-8 flex justify-between items-center">
                <button
                  onClick={() => {
                    playModalOpen();
                    setIsAboutOpen(false);
                    setHubIndex(3);
                    setIsResumeOpen(true);
                  }}
                  className="rounded-full border border-teal-500/50 bg-teal-500/10 px-6 py-2 text-sm font-medium text-teal-400 transition-colors hover:bg-teal-500/20 cursor-pointer"
                >
                  View Resume
                </button>
                <button
                  onClick={() => { playBack(); setIsAboutOpen(false); }}
                  className="rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 cursor-pointer"
                >
                  Close Profile
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* TIMEZONE MODAL */}
        {isTimezoneOpen && (
          <motion.div initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(20px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-6" onClick={() => { playBack(); setIsTimezoneOpen(false); }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-md rounded-[40px] border border-white/10 bg-[#0f0f0f]/90 p-10 shadow-2xl flex flex-col items-center">
              <h2 className="text-2xl font-bold tracking-tight text-white mb-2">Time Synchronization</h2>
              <p className="text-sm text-white/50 mb-8 text-center">Comparing local system time to operating base.</p>
              <div className="w-full flex flex-col gap-3 mb-6">
                <div className="w-full flex justify-between items-center bg-white/5 border border-orange-500/30 rounded-2xl p-6">
                  <div className="text-left">
                    <p className="text-[10px] text-orange-400 uppercase tracking-[0.2em] mb-1">Base: Medellín (UTC-5)</p>
                    <p className="text-2xl font-medium text-white">{medellinTime}</p>
                  </div>
                  <div className="text-4xl drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">{isMedellinDaytime ? "☀️" : "🌌"}</div>
                </div>
                <div className="w-full flex justify-between items-center bg-white/2 border border-white/10 rounded-2xl p-6">
                  <div className="text-left">
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Your Local Time</p>
                    <p className="text-xl font-medium text-white/70">{visitorTime}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/30">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  </div>
                </div>
              </div>
              <button onClick={() => { playBack(); setIsTimezoneOpen(false); }} className="w-full rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 cursor-pointer">Dismiss</button>
            </motion.div>
          </motion.div>
        )}

        {/* RESUME MODAL */}
        {isResumeOpen && (
          <motion.div initial={{ opacity: 0, backdropFilter: "blur(0px)" }} animate={{ opacity: 1, backdropFilter: "blur(20px)" }} exit={{ opacity: 0, backdropFilter: "blur(0px)" }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 md:p-6" onClick={() => { playBack(); setIsResumeOpen(false); }}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-[40px] border border-white/10 bg-[#0f0f0f]/95 p-8 md:p-12 shadow-2xl custom-scrollbar">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-teal-400 to-orange-400" />
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">Technical <span className="text-teal-400">Profile</span></h2>
                  <p className="text-white/50 tracking-widest uppercase text-sm">Experience & Capabilities</p>
                </div>

                {/* THE FIX: Download sound restored! */}
                <a
                  href="/AndresHernandez_Web-Developer-Resume.pdf"
                  download="AndresHernandez_Web-Developer-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playDownload()}
                  className="flex items-center gap-3 rounded-full border border-orange-500/50 bg-orange-500/10 px-6 py-3 text-sm font-medium text-orange-400 transition-colors hover:bg-orange-500/20 w-fit"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
                  Download Original PDF
                </a>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4 space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-teal-400" /> Core Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "JavaScript", "Tailwind CSS", "Framer Motion", "HTML5/CSS3"].map((skill) => (
                        <span key={skill} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/80">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange-400" /> Architecture & Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Vite", "Node.js", "REST APIs", "Git / GitHub", "Responsive Design", "Accessibility"].map((skill) => (
                        <span key={skill} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/80">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-white/50" /> Leadership & Ops</h3>
                    <div className="flex flex-wrap gap-2">
                      {["Data Analysis", "KPI Optimization", "Workflow Automation", "Team Management"].map((skill) => (
                        <span key={skill} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/80">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <div className="relative border-l border-white/10 pl-8 space-y-10">
                    <div className="relative">
                      <div className="absolute -left-10.25 top-1.5 h-5 w-5 rounded-full border-4 border-[#0f0f0f] bg-teal-400" />
                      <span className="text-xs font-bold tracking-widest text-teal-400 uppercase">2025 — Present</span>
                      <h4 className="text-2xl font-bold text-white mt-1">General Manager & Frontend Eng.</h4>
                      <p className="text-white/50 text-sm font-medium mb-3">EVEO INC. / Project BDC</p>
                      <p className="text-white/70 text-sm leading-relaxed">Leading BDC operations managing 1000+ leads while simultaneously engineering data-driven frontend frameworks. Built a custom reporting web app using React and TypeScript that automated data visualization and reduced manual calculation time by 30%.</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-10.25 top-1.5 h-5 w-5 rounded-full border-4 border-[#0f0f0f] bg-orange-400" />
                      <span className="text-xs font-bold tracking-widest text-orange-400 uppercase">2023 — 2024</span>
                      <h4 className="text-xl font-bold text-white mt-1">Business Development Coordinator</h4>
                      <p className="text-white/50 text-sm font-medium mb-3">EVEO INC.</p>
                      <p className="text-white/70 text-sm leading-relaxed">Sourced and qualified massive lead volumes, utilizing analytical frameworks to achieve a 60% lead-to-appointment ratio and an 80% show-rate. Optimized cross-departmental communication and engagement strategies.</p>
                    </div>
                    <div className="relative">
                      <div className="absolute -left-10.25 top-1.5 h-5 w-5 rounded-full border-4 border-[#0f0f0f] bg-white/30" />
                      <span className="text-xs font-bold tracking-widest text-white/50 uppercase">2018 — 2019</span>
                      <h4 className="text-xl font-bold text-white mt-1">Collections Manager</h4>
                      <p className="text-white/50 text-sm font-medium mb-3">Grand Teton Professionals</p>
                      <p className="text-white/70 text-sm leading-relaxed">Managed compliance teams and developed algorithmic strategies in Excel to track KPIs, successfully improving collection rates by 20% before company shutdown.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-12 flex justify-end pt-6 border-t border-white/10">
                <button onClick={() => { playBack(); setIsResumeOpen(false); }} className="rounded-full border border-white/20 bg-white/5 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10 cursor-pointer">Close Resume</button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* CONTACT MODAL */}
        <ContactModal
          isOpen={isContactOpen}
          onClose={() => { playBack(); setIsContactOpen(false); }}
          onOpenProjects={() => { 
            setIsContactOpen(false); 
            setHubIndex(1); 
            handleOpenCarousel(); 
          }}
          onOpenResume={() => { 
            setIsContactOpen(false); 
            setHubIndex(3); 
            setIsResumeOpen(true); 
          }}
          onOpenAbout={() => { 
            setIsContactOpen(false); 
            setHubIndex(0); 
            setIsAboutOpen(true); 
          }}
        />
      </AnimatePresence>
    </>
  );
}
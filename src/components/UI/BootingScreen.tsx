import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mainLogoAccent from '../../assets/logo/mainLogoAccent.svg';
import { startTypewriter, stopTypewriter } from '../../utils/soundEngine';

type BootingScreenProps = {
  progress: number;
  bootState: 'loading' | 'ready' | 'booting';
  onBootComplete: () => void;
};

export default function BootingScreen({ progress, bootState, onBootComplete }: BootingScreenProps) {
  const name = "Andrés Hernandez";
  
useEffect(() => {
    if (bootState === 'booting') {
      startTypewriter();
      
      const timer1 = setTimeout(() => {
        stopTypewriter();
      }, 1680);

      const timer2 = setTimeout(() => {
        onBootComplete();
      }, 4000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        stopTypewriter();
      };
    }
  }, [bootState, onBootComplete]);

  return (
    <main className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070707]">
      <AnimatePresence mode="wait">
        
        {/* PHASE 1 & 2: Eye Candy Loading / Ready State */}
        {bootState !== 'booting' ? (
          <motion.div 
            key="loading-state"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center"
          >
            <motion.img
              src={mainLogoAccent}
              animate={{ 
                scale: bootState === 'ready' ? [1, 1.1, 1] : 1, 
                opacity: bootState === 'loading' ? 0.5 : 1 
              }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="h-20 w-20 md:h-24 md:w-24 object-contain drop-shadow-[0_0_15px_rgba(45,212,191,0.4)]"
            />
            <div className="mt-12 text-xs md:text-sm tracking-[0.4em] text-teal-400/70 uppercase">
              {bootState === 'loading' ? (
                <span className="flex items-center gap-2">
                  Extracting Assets {Math.round(progress)}%
                  <span className="flex gap-0.5">
                    <motion.span animate={{opacity:[0,1,0]}} transition={{repeat:Infinity, duration:1.5, delay:0}}>.</motion.span>
                    <motion.span animate={{opacity:[0,1,0]}} transition={{repeat:Infinity, duration:1.5, delay:0.2}}>.</motion.span>
                    <motion.span animate={{opacity:[0,1,0]}} transition={{repeat:Infinity, duration:1.5, delay:0.4}}>.</motion.span>
                  </span>
                </span>
              ) : (
                <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
                  System Ready. Press any key.
                </motion.span>
              )}
            </div>
          </motion.div>

        ) : (

          /* PHASE 3: The Name Typing Animation */
          <motion.div 
            key="typing-state"
            initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-4 md:gap-6"
          >
            <div className="h-16 w-16 md:h-24 md:w-24 relative shrink-0">
              <img src={mainLogoAccent} alt="Logo" className="h-full w-full object-contain drop-shadow-[0_0_15px_rgba(45,212,191,0.4)]" />
            </div>

            <div className="flex flex-col justify-center relative">
              <div className="flex items-center text-3xl md:text-5xl font-semibold tracking-wide text-white relative">
                <motion.span
                  variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
                  initial="hidden" animate="visible" className="relative overflow-hidden"
                >
                  {Array.from(name).map((char, index) => (
                    <motion.span key={index} variants={{ hidden: { opacity: 0, display: "none" }, visible: { opacity: 1, display: "inline-block" }}}>
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                  <motion.div
                    initial={{ left: "-100%" }} animate={{ left: "200%" }}
                    transition={{ delay: 2.2, duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 4 }}
                    className="absolute inset-0 z-10 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
                    style={{ mixBlendMode: "overlay" }}
                  />
                </motion.span>
                <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }} className="text-teal-400 ml-1 font-light">|</motion.span>
              </div>

              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="mt-2 relative">
                <p className="text-xs md:text-sm font-medium tracking-[0.2em] text-[#FBBF24]">WEB DEVELOPER</p>
                <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: "100%", opacity: 1 }} transition={{ delay: 1.4, duration: 1.5, ease: "circOut" }} className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-teal-400/80 via-teal-400/20 to-transparent shadow-[0_0_8px_#2dd4bf]" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
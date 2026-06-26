import { motion } from 'framer-motion';
import mainLogoAccent from '../../assets/logo/mainLogoAccent.svg';

type BootingScreenProps = {
  progress: number;
  ready: boolean;
};

export default function BootingScreen({ progress, ready }: BootingScreenProps) {
  const name = "Andrés Hernandez";
  
  const containerVars = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.5 },
    },
  };

  const letterVars = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "inline-block" },
  };

  return (
    <main className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[#070707]">
      {/* THE FIX: Changed gap and added responsive flex direction just in case it gets super narrow */}
      <div className="flex items-center justify-center gap-4 md:gap-6 mb-12">
        {/* THE FIX: Shrunk the logo for mobile (w-16 h-16) while keeping it big on md+ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-16 w-16 md:h-24 md:w-24 relative shrink-0"
        >
          <img src={mainLogoAccent} alt="Logo" className="h-full w-full object-contain drop-shadow-[0_0_15px_rgba(45,212,191,0.4)]" />
        </motion.div>

        <div className="flex flex-col justify-center relative">
          <div className="flex items-center text-3xl md:text-5xl font-semibold tracking-wide text-white relative">
            <motion.span
              variants={containerVars}
              initial="hidden"
              animate="visible"
              className="relative overflow-hidden"
            >
              {Array.from(name).map((char, index) => (
                <motion.span key={index} variants={letterVars}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}

              <motion.div
                initial={{ left: "-100%" }}
                animate={{ left: "200%" }}
                transition={{ delay: 2.2, duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 4 }}
                className="absolute inset-0 z-10 w-1/2 bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
                style={{ mixBlendMode: "overlay" }}
              />
            </motion.span>

            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
              className="text-teal-400 ml-1 font-light"
            >
              |
            </motion.span>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="mt-2 relative"
          >
            <p className="text-xs md:text-sm font-medium tracking-[0.2em] text-[#FBBF24]">
              WEB DEVELOPER
            </p>
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 2.2, duration: 1.5, ease: "circOut" }}
              className="absolute -bottom-2 left-0 h-px bg-linear-to-r from-teal-400/80 via-teal-400/20 to-transparent shadow-[0_0_8px_#2dd4bf]"
            />
          </motion.div>
        </div>
      </div>

      <motion.p
        key={ready ? 'ready' : 'loading'}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40"
      >
        {ready ? 'Welcome! Press any key to start' : `Loading assets... ${Math.round(progress)}%`}
      </motion.p>
    </main>
  );
}
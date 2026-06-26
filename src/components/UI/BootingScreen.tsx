import { motion } from 'framer-motion';
import mainLogoAccent from '../../assets/logo/mainLogoAccent.svg';

type BootingScreenProps = {
  progress: number;
  ready: boolean;
};

export default function BootingScreen({
  progress,
  ready,
}: BootingScreenProps) {
  return (
    <main className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070707]">
      <motion.div
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [0.98, 1.02, 0.98],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: 'easeInOut',
        }}
        className="mb-10 h-24 w-24"
      >
        <img
          src={mainLogoAccent}
          alt="Logo"
          className="h-full w-full object-contain"
        />
      </motion.div>

      <div className="h-[2px] w-[200px] overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-teal-400 shadow-[0_0_12px_#2dd4bf]"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{
            ease: 'circOut',
            duration: 0.3,
          }}
        />
      </div>

      <motion.p
        key={ready ? 'ready' : 'loading'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-10 text-xs uppercase tracking-[0.3em] text-white/40"
      >
        {ready
          ? 'Press any key to begin'
          : `Loading assets... ${Math.round(progress)}%`}
      </motion.p>
    </main>
  );
}
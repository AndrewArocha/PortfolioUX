import { useEffect, useMemo, useState } from 'react';
import BootingScreen from './BootingScreen';
import useImagePreloader from '../../hooks/useImagePreloader';
import projects from '../../data/projects';
import { playStart, startAmbient } from '../../utils/soundEngine';
import { motion, AnimatePresence } from 'framer-motion';

type BootManagerProps = {
  children: React.ReactNode;
};

export default function BootManager({ children }: BootManagerProps) {
  const idleBackground = 'https://static.vecteezy.com/system/resources/thumbnails/072/203/042/small/scenic-mountain-view-at-sunset-with-vibrant-sky-and-green-hills-free-photo.jpg';

  const criticalImages = useMemo(() => {
    const images = projects.map((project) => project.image);
    projects.forEach((project) => {
      if (project.gallery?.length) images.push(...project.gallery);
    });
    images.push(idleBackground);
    return [...new Set(images)];
  }, []);

  const { imagesPreloaded, progress } = useImagePreloader(criticalImages);
  
  // 4-stage boot state!
  const [bootState, setBootState] = useState<'loading' | 'ready' | 'booting' | 'finished'>('loading');

  // Initial Loading
  useEffect(() => {
    if (imagesPreloaded && bootState === 'loading') {
      setBootState('ready');
    }
  }, [imagesPreloaded, bootState]);

  // Handle User Start
  useEffect(() => {
    if (bootState !== 'ready') return;

    const handleStart = () => {
      setBootState('booting'); // Triggers the name typing animation!
      playStart();
    };

    window.addEventListener('keydown', handleStart);
    window.addEventListener('click', handleStart);

    return () => {
      window.removeEventListener('keydown', handleStart);
      window.removeEventListener('click', handleStart);
    };
  }, [bootState]);

  // THE FIX: Trigger ambient hum exactly when the app crossfades in
  useEffect(() => {
    if (bootState === 'finished') {
      startAmbient();
    }
  }, [bootState]);

  return (
    <>
      <AnimatePresence mode="wait">
        {bootState !== 'finished' && (
          <motion.div 
            key="booting-layer"
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
            className="fixed inset-0 z-[200]"
          >
            <BootingScreen 
              progress={progress} 
              bootState={bootState} 
              onBootComplete={() => setBootState('finished')} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Render the App behind the fading Boot Screen */}
      {bootState === 'finished' && children}
    </>
  );
}
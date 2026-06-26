import { useEffect, useMemo, useState } from 'react';
import BootingScreen from './BootingScreen';
import useImagePreloader from '../../hooks/useImagePreloader';
import projects from '../../data/projects';

type BootManagerProps = {
  children: React.ReactNode;
};

export default function BootManager({
  children,
}: BootManagerProps) {
  const idleBackground =
    'https://static.vecteezy.com/system/resources/thumbnails/072/203/042/small/scenic-mountain-view-at-sunset-with-vibrant-sky-and-green-hills-free-photo.jpg';

  const criticalImages = useMemo(() => {
    const images = projects.map((project) => project.image);

    projects.forEach((project) => {
      if (project.gallery?.length) {
        images.push(...project.gallery);
      }
    });

    images.push(idleBackground);

    return [...new Set(images)];
  }, []);

  const { imagesPreloaded, progress } =
    useImagePreloader(criticalImages);

  const [canStart, setCanStart] = useState(false);

  useEffect(() => {
    if (!imagesPreloaded) return;

    const handleStart = () => {
      setCanStart(true);
    };

    window.addEventListener('keydown', handleStart);
    window.addEventListener('click', handleStart);

    return () => {
      window.removeEventListener('keydown', handleStart);
      window.removeEventListener('click', handleStart);
    };
  }, [imagesPreloaded]);

  if (!imagesPreloaded || !canStart) {
    return (
      <BootingScreen
        progress={progress}
        ready={imagesPreloaded}
      />
    );
  }

  return <>{children}</>;
}
import { useState, useEffect } from 'react';
import { useInteraction } from '../context/InteractionContext';

export default function useHubControls(maxIndex: number = 4) {
  const { interactionMode } = useInteraction();
  
  // Local state exclusively for the Hub's bento boxes
  const [hubIndex, setHubIndex] = useState(0);

  useEffect(() => {
    // Only capture key presses if the user is in the Hub and no modal is open
    if (interactionMode !== 'hub') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent browser scrolling
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          setHubIndex((prev) => (prev + 1 > maxIndex ? 0 : prev + 1));
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          setHubIndex((prev) => (prev - 1 < 0 ? maxIndex : prev - 1));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [interactionMode, maxIndex]);

  return { hubIndex, setHubIndex };
}
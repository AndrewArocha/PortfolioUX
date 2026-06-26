import { useEffect } from 'react';
import { useInteraction } from '../context/InteractionContext';

export default function useShowcaseControls() {
  const {
    openedProjectIndex,
    setOpenedProjectIndex,

    lastSelectedIndex,
    setSelectedIndex,

    setInteractionMode,
    setIsCarouselFocused,
  } = useInteraction();

  useEffect(() => {
    if (openedProjectIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;

      setOpenedProjectIndex(null);
      setSelectedIndex(lastSelectedIndex);

      setInteractionMode('carousel');
      setIsCarouselFocused(true);
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
  }, [openedProjectIndex]);
}
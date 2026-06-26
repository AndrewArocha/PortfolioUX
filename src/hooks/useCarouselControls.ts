import { useEffect } from 'react';
import projects from '../data/projects';
import { useInteraction } from '../context/InteractionContext';

export default function useCarouselControls() {
    const {
        selectedIndex,
        setSelectedIndex,

        lastSelectedIndex,
        setLastSelectedIndex,

        openedProjectIndex,

        isCarouselFocused,
        setIsCarouselFocused,

        setOpenedProjectIndex,

        interactionMode,
        setInteractionMode,

    } = useInteraction();

    useEffect(() => {
        // Showcase is open.
        // Carousel controls are disabled.
        if (openedProjectIndex !== null) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (interactionMode !== 'carousel') return;

            switch (event.key) {
                case 'ArrowRight': {
                    if (selectedIndex === -1) {
                        setSelectedIndex(lastSelectedIndex);
                        return;
                    }

                    const next =
                        selectedIndex === projects.length - 1
                            ? 0
                            : selectedIndex + 1;

                    setSelectedIndex(next);
                    setLastSelectedIndex(next);

                    break;
                }

                case 'ArrowLeft': {
                    if (selectedIndex === -1) {
                        setSelectedIndex(lastSelectedIndex);
                        return;
                    }

                    const next =
                        selectedIndex === 0
                            ? projects.length - 1
                            : selectedIndex - 1;

                    setSelectedIndex(next);
                    setLastSelectedIndex(next);

                    break;
                }

                case 'ArrowDown':
                    setSelectedIndex(-1);
                    break;

                case 'ArrowUp':
                    if (selectedIndex === -1) {
                        setInteractionMode('hub');
                        setIsCarouselFocused(false);
                    }
                    break;

                case 'Escape': {
                    if (selectedIndex !== -1) {
                        // Deselect currently focused card first
                        setSelectedIndex(-1);
                    } else {
                        // No card selected anymore → return to Hub
                        setInteractionMode('hub');
                        setIsCarouselFocused(false);
                    }

                    break;
                }

                case 'Enter':
                    if (selectedIndex >= 0) {
                        setOpenedProjectIndex(selectedIndex);
                        setInteractionMode('menu');
                        setIsCarouselFocused(false);
                    }
                    break;

                default:
                    break;
            }
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
    }, [
        selectedIndex,
        lastSelectedIndex,
        openedProjectIndex,
        isCarouselFocused,
        interactionMode,
        setSelectedIndex,
        setLastSelectedIndex,
        setInteractionMode,
        setIsCarouselFocused,
        setOpenedProjectIndex,
    ]);
}
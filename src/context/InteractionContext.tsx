import {
  createContext,
  useContext,
  useState,
} from 'react';

import type { ReactNode } from 'react';

export type InteractionMode =
  | 'carousel'
  | 'menu'
  | 'showcase'
  | 'hub';

type InteractionContextType = {
  interactionMode: InteractionMode;
  setInteractionMode: React.Dispatch<
    React.SetStateAction<InteractionMode>
  >;

  selectedIndex: number;
  setSelectedIndex: React.Dispatch<
    React.SetStateAction<number>
  >;

  lastSelectedIndex: number;
  setLastSelectedIndex: React.Dispatch<
    React.SetStateAction<number>
  >;

  openedProjectIndex: number | null;
  setOpenedProjectIndex: React.Dispatch<
    React.SetStateAction<number | null>
  >;

  isCarouselFocused: boolean;
  setIsCarouselFocused: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  didDrag: boolean;
  setDidDrag: React.Dispatch<
    React.SetStateAction<boolean>
  >;

  showControlsHint: boolean;
  setShowControlsHint: React.Dispatch<
    React.SetStateAction<boolean>
  >;
};

const InteractionContext =
  createContext<InteractionContextType | null>(
    null
  );

export function InteractionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [interactionMode, setInteractionMode] =
    useState<InteractionMode>('hub');

  const [selectedIndex, setSelectedIndex] =
    useState(-1);

  const [lastSelectedIndex, setLastSelectedIndex] =
    useState(0);

  const [openedProjectIndex, setOpenedProjectIndex] =
    useState<number | null>(null);

  const [isCarouselFocused, setIsCarouselFocused] =
    useState(false);

  const [didDrag, setDidDrag] =
    useState(false);

  const [showControlsHint, setShowControlsHint] =
    useState(true);

  return (
    <InteractionContext.Provider
      value={{
        interactionMode,
        setInteractionMode,

        selectedIndex,
        setSelectedIndex,

        lastSelectedIndex,
        setLastSelectedIndex,

        openedProjectIndex,
        setOpenedProjectIndex,

        isCarouselFocused,
        setIsCarouselFocused,

        didDrag,
        setDidDrag,

        showControlsHint,
        setShowControlsHint,
      }}
    >
      {children}
    </InteractionContext.Provider>
  );
}

export function useInteraction() {
  const context = useContext(
    InteractionContext
  );

  if (!context) {
    throw new Error(
      'useInteraction must be used inside InteractionProvider'
    );
  }

  return context;
}
// src/utils/soundEngine.ts

// Helper function to handle both single files and arrays of files for random playback
const createAudio = (src: string | string[], volume: number = 1, loop: boolean = false) => {
  if (typeof window !== 'undefined') {
    if (Array.isArray(src)) {
      return src.map(s => {
        const audio = new Audio(s);
        audio.volume = volume;
        audio.loop = loop;
        return audio;
      });
    } else {
      const audio = new Audio(src);
      audio.volume = volume;
      audio.loop = loop;
      return audio;
    }
  }
  return null;
};

// --- 1. INITIALIZE AUDIO FILES ---
const startSounds = createAudio(['/audio/Start1.mp3', '/audio/Start2.mp3'], 0.6);
// FIXED: Matched to your exact screenshot naming
const modalOpenSounds = createAudio(['/audio/OpenModal1.mp3', '/audio/OpenModal2.mp3'], 0.5); 

const typewriter = createAudio('/audio/Typewriter.mp3', 0.5, true); 
const ambientHum = createAudio('/audio/AmbientHum.mp3', 0.05, true); 
const galleryClick = createAudio('/audio/GalleryClick.mp3', 0.4);
const cardScroll = createAudio('/audio/CardScroll.mp3', 0.3);
const onHover = createAudio('/audio/OnHover.mp3', 0.15);
const leaveSound = createAudio('/audio/LeaveButton.mp3', 0.5);
const downloadSound = createAudio('/audio/DownloadButton.mp3', 0.5);
const backSound = createAudio('/audio/Back.mp3', 0.4);


// --- 2. UNIVERSAL PLAYBACK ENGINE ---
const playSound = (audioRef: HTMLAudioElement | HTMLAudioElement[] | null) => {
  if (!audioRef) return;

  let targetAudio: HTMLAudioElement;

  if (Array.isArray(audioRef)) {
    // Pick a random sound from the array
    const randomIndex = Math.floor(Math.random() * audioRef.length);
    targetAudio = audioRef[randomIndex];
  } else {
    targetAudio = audioRef;
  }

  targetAudio.currentTime = 0; // Rewind to allow rapid firing
  targetAudio.play().catch(() => {}); // Catch prevents console errors before user interaction
};


// --- 3. EXPORTED TRIGGERS ---
export const playStart = () => playSound(startSounds);
export const playModalOpen = () => playSound(modalOpenSounds);
export const playGalleryClick = () => playSound(galleryClick);
export const playCardScroll = () => playSound(cardScroll);
export const playHover = () => playSound(onHover);
export const playLeave = () => playSound(leaveSound);
export const playDownload = () => playSound(downloadSound);
export const playBack = () => playSound(backSound);

// Continuous Audio Controls
export const startAmbient = () => {
  if (!Array.isArray(ambientHum)) ambientHum?.play().catch(() => {});
};

export const startTypewriter = () => {
  if (!Array.isArray(typewriter)) typewriter?.play().catch(() => {});
};

export const stopTypewriter = () => {
  if (!Array.isArray(typewriter) && typewriter) {
    typewriter.pause();
    typewriter.currentTime = 0;
  }
};
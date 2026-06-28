import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playHover, playLeave } from "../../utils/soundEngine";

type RedirectModalProps = {
    isOpen: boolean;
    onClose: () => void;
    url: string;
    onOpenResume?: () => void;
    onOpenAbout?: () => void;
    onOpenProjects?: () => void;
};

export default function RedirectModal({ isOpen, onClose, url, onOpenResume, onOpenAbout, onOpenProjects }: RedirectModalProps) {
    const [progress, setProgress] = useState(0);
    const [hasRedirected, setHasRedirected] = useState(false);

    useEffect(() => {
        // Reset states when the modal opens/closes
        if (!isOpen || !url) {
            setProgress(0);
            setHasRedirected(false);
            return;
        }

        playLeave(); // Play the departure sound!
        let redirected = false;

        // 5 seconds total (100 steps * 50ms = 5000ms)
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    if (!redirected) {
                        // This was blocking my popup!
                        window.location.assign(url);
                        redirected = true;
                        setHasRedirected(true);
                    }
                    return 100;
                }
                return prev + 1; // Increase progress by 1%
            });
        }, 50);

        // If the user clicks a button to close the modal BEFORE 5 seconds, 
        // this cleanup function runs, clears the interval, and cleanly aborts the redirect!
        return () => clearInterval(interval);
    }, [isOpen, url]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    animate={{ opacity: 1, backdropFilter: "blur(15px)" }}
                    exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 10 }}
                        className="w-full max-w-lg rounded-[32px] border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl relative overflow-hidden text-center"
                    >
                        {/* The 5-Second Progress Bar */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
                            <motion.div
                                className={`h-full ${hasRedirected ? 'bg-teal-500' : 'bg-orange-500'}`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>

                        <div className="w-16 h-16 rounded-full bg-teal-500/10 text-teal-400 flex items-center justify-center mx-auto mb-6 mt-2">
                            <svg viewBox="0 0 24 24" className={`w-8 h-8 ${!hasRedirected && 'animate-pulse'}`} fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                        </div>

                        {/* Dynamic Text based on the Timer */}
                        <h2 className="text-2xl font-bold text-white mb-2">
                            {hasRedirected ? "Link Opened in New Tab" : "You're going to a different page"}
                        </h2>
                        <p className="text-white/50 text-sm mb-8">
                            {hasRedirected
                                ? "I'll be here, when you come back let's look at:"
                                : "Hey! Thanks for visiting, before you go consider exploring:"}
                        </p>

                        {/* Soft Retention Options */}
                        <div className="w-full space-y-3">
                            {onOpenResume && (
                                <button onMouseEnter={() => playHover()} onClick={onOpenResume} className="w-full rounded-2xl bg-white/5 border border-white/10 py-4 text-sm font-medium text-white/90 transition-colors hover:bg-white/10">
                                    Read Technical Resume
                                </button>
                            )}
                            {onOpenAbout && (
                                <button onMouseEnter={() => playHover()} onClick={onOpenAbout} className="w-full rounded-2xl bg-white/5 border border-white/10 py-4 text-sm font-medium text-white/90 transition-colors hover:bg-white/10">
                                    About Me
                                </button>
                            )}
                            {onOpenProjects && (
                                <button onMouseEnter={() => playHover()} onClick={onOpenProjects} className="w-full rounded-2xl bg-teal-500/10 border border-teal-500/30 py-4 text-sm font-semibold text-teal-400 transition-colors hover:bg-teal-500/20">
                                    View More Projects
                                </button>
                            )}

                            {/* Abort / Close Button */}
                            <button
                                onMouseEnter={() => playHover()}
                                onClick={onClose}
                                className="w-full mt-4 text-xs font-medium text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest"
                            >
                                {hasRedirected ? "Close Menu" : "Abort"}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
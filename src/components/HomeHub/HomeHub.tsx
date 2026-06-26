import { useEffect, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useInteraction } from '../../context/InteractionContext';

// Framer Motion Variants for buttery staggered reveals
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    },
    exit: {
        opacity: 0,
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95, filter: 'blur(10px)' },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        transition: { type: 'spring', stiffness: 200, damping: 20 }
    },
    exit: { opacity: 0, y: -20, scale: 0.95, filter: 'blur(10px)' }
};

export default function HomeHub() {
    const {
        setInteractionMode,
        setIsCarouselFocused,
        setSelectedIndex,
        lastSelectedIndex,
    } = useInteraction();

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Subtle parallax and glow tracking on mouse move
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20,
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                initial="hidden"
                animate="show"
                exit="exit"
                className="relative min-h-screen w-full bg-[#070707] text-white overflow-hidden flex flex-col items-center justify-center p-6 lg:p-12"
            >
                {/* --- AMBIENT CINEMATIC BACKGROUND --- */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    {/* Slow breathing radial glow */}

                    <motion.div
                        animate={{
                            opacity: [0.15, 0.25, 0.15],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-teal-500/10 rounded-full blur-[120px]"
                    />
                    <motion.div
                        animate={{
                            opacity: [0.1, 0.2, 0.1],
                            scale: [1, 1.2, 1],
                            x: mousePosition.x * -2,
                            y: mousePosition.y * -2
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-orange-500/10 rounded-full blur-[100px]"
                    />
                    {/* Noise overlay for texture */}
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
                </div>

                {/* --- TOP NAVIGATION BAR --- */}
                <motion.header
                    variants={itemVariants}
                    className="absolute top-0 left-0 w-full px-8 py-8 flex justify-between items-center z-50"
                >
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center backdrop-blur-md">
                            <img src="/mainLogoAccent.svg" alt="Logo" className="h-6 w-6 object-contain" />
                        </div>
                        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-white/50">
                            System Hub
                        </span>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                        <span className="text-[11px] uppercase tracking-widest text-teal-400/80 font-medium">Available for work</span>
                    </div>
                </motion.header>

                {/* --- BENTO BOX GRID LAYOUT --- */}
                <motion.main
                    variants={containerVariants}
                    className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[160px] mt-16"
                >
                    {/* 1. HERO / IDENTITY BOX (Spans 8 columns) */}
                    <motion.div
                        variants={itemVariants}
                        style={{ x: mousePosition.x * 0.5, y: mousePosition.y * 0.5 }}
                        className="md:col-span-8 row-span-2 relative group overflow-hidden rounded-[40px] border border-white/10 bg-white/[0.02] backdrop-blur-xl p-10 flex flex-col justify-end"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5"><path d="M12 2L2 22h20L12 2z" /></svg>
                        </div>

                        <div className="relative z-10">
                            <p className="text-sm font-medium text-teal-400/80 tracking-widest uppercase mb-4">Software Developer</p>
                            <h1 className="text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-2 leading-[0.9]">
                                Andrés <br /><span className="text-white/50">Hernández</span>
                            </h1>
                            <p className="max-w-md text-white/40 mt-4 text-sm leading-relaxed">
                                Crafting premium digital experiences through immersive design, automated workflows, and cinematic frontend architecture.
                            </p>
                        </div>
                    </motion.div>

                    {/* 2. PORTFOLIO ENTRY BUTTON (Spans 4 columns) */}
                    <motion.button
                        variants={itemVariants}
                        onClick={() => {
                            setInteractionMode('carousel');
                            setIsCarouselFocused(true);
                            setSelectedIndex(lastSelectedIndex);
                        }}
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.95 }}
                        className="md:col-span-4 row-span-2 relative group overflow-hidden rounded-[40px] border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] flex flex-col items-center justify-center cursor-pointer shadow-2xl"
                    >
                        {/* Glowing hover ring */}
                        <div className="absolute inset-0 rounded-[40px] border-2 border-transparent group-hover:border-teal-500/30 transition-colors duration-500" />

                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(45,212,191,0.2)_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        />

                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-20 h-20 mb-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-teal-500/10 group-hover:border-teal-500/30 transition-all duration-300">
                                <svg viewBox="0 0 24 24" className="w-8 h-8 text-white group-hover:text-teal-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            </div>
                            <h3 className="text-2xl font-semibold tracking-tight text-white group-hover:text-teal-50">Project Showcase</h3>
                            <p className="text-xs text-white/40 tracking-widest uppercase mt-2 group-hover:text-white/60">Interactive Carousel</p>
                        </div>
                    </motion.button>

                    {/* 3. LOCATION WIDGET (Spans 4 columns) */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-4 row-span-1 relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 flex items-center gap-6 group hover:bg-white/[0.04] transition-colors"
                    >
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-black/50 border border-white/10 relative shrink-0">
                            {/* Simulate a mini map or globe here */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-orange-400 rounded-full shadow-[0_0_15px_#f6ad55]">
                                <div className="absolute inset-0 rounded-full border border-orange-400 animate-ping" />
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Operating From</p>
                            <p className="text-lg font-medium text-white/90">Medellín, Colombia</p>
                            <p className="text-xs text-white/30 mt-1">ANT — UTC-5</p>
                        </div>
                    </motion.div>

                    {/* 4. ABOUT / EXPERIENCE LINK (Spans 4 columns) */}
                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.95 }}
                        className="md:col-span-4 row-span-1 relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 flex items-center justify-between group hover:bg-white/[0.04] transition-colors cursor-pointer"
                    >
                        <div className="text-left">
                            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Profile</p>
                            <h3 className="text-xl font-medium text-white/90">Experience & Stack</h3>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </div>
                    </motion.button>

                    {/* 5. CONTACT WIDGET (Spans 4 columns) */}
                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 0.98 }}
                        whileTap={{ scale: 0.95 }}
                        className="md:col-span-4 row-span-1 relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.02] backdrop-blur-md p-6 flex items-center justify-between group hover:bg-white/[0.04] transition-colors cursor-pointer"
                    >
                        <div className="text-left">
                            <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] mb-1">Let's Talk</p>
                            <h3 className="text-xl font-medium text-white/90">Initialize Contact</h3>
                        </div>
                        <div className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:bg-orange-500/20 group-hover:border-orange-500/40 transition-colors">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 text-white/50 group-hover:text-orange-400 transition-colors" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                        </div>
                    </motion.button>

                </motion.main>
            </motion.div>
        </AnimatePresence>
    );
}
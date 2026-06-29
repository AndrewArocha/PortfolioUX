import { motion } from "framer-motion";
import { techStack } from "../../data/techStack";
import { playHover, playModalOpen } from "../../utils/soundEngine";

//Strict typing gave me a headache, set String | null
type CardProps = {
  title: string;
  image: string;
  stack?: Array<keyof typeof techStack>; 
  onHover: (image: string | null) => void; 
  onHoverEnd: () => void;
  onSelect: () => void;
  isSelected?: boolean;
  didDrag: boolean;
};

function Card({
  title,
  image,
  stack, 
  onHover,
  onHoverEnd,
  onSelect,
  isSelected,
  didDrag,
}: CardProps) {
  return (
    <>
      <motion.div
        layoutId={`project-${title}`}
        whileHover={{ scale: 1.015, y: -6 }}
        onHoverStart={() => {
          if (!isSelected) return;
          playHover(); // <--- Drop this right here!
          onHover(image);
        }}
        onHoverEnd={onHoverEnd}
        onClick={(event) => {
          event.stopPropagation();
          if (didDrag) return;
          onSelect();
          playModalOpen();
        }}
        animate={{ y: isSelected ? -10 : 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className="group relative w-[84vw] h-[56vw] max-w-160 max-h-90 sm:w-[78vw] sm:h-[48vw] lg:w-155 lg:h-90 cursor-pointer select-none transition-all duration-100 drop-shadow-[0_16px_28px_rgba(0,0,0,0.35)] group-hover:drop-shadow-[0_30px_55px_rgba(0,0,0,0.55)]"
      >
        {/* Ambient base lighting */}
        <div className="absolute left-1/2 top-[58%] h-45 w-[82%] -translate-x-1/2 rounded-full bg-linear-to-t from-[#6d4c41]/10 via-[#8d6e63]/5 to-transparent blur-[60px] opacity-80 pointer-events-none" />

        {/* Outer selected glow */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute -inset-2.5 rounded-[62px] overflow-hidden pointer-events-none"
          >
            <div
              className="absolute -inset-full animate-border-spin opacity-55"
              style={{
                background: `conic-gradient(from -90deg, transparent 0deg, transparent 76deg, rgba(255,255,255,0.16) 82deg, rgba(255,255,255,0.75) 90deg, rgba(255,255,255,0.16) 98deg, transparent 106deg, transparent 256deg, rgba(255,255,255,0.16) 262deg, rgba(255,255,255,0.75) 270deg, rgba(255,255,255,0.16) 278deg, transparent 286deg, transparent 360deg)`,
                filter: "blur(9px)",
                opacity: 0.55,
              }}
            />
            <div className="absolute inset-0 rounded-[62px] shadow-[0_0_40px_rgba(255,255,255,0.12)]" />
          </motion.div>
        )}

        {/* Actual card container */}
        <div
          className="relative h-full w-full overflow-hidden rounded-[52px] bg-black"
          style={{ clipPath: "inset(0 round 52px)" }}
        >
          <img
            src={image}
            alt={title}
            className="absolute inset-0 h-full w-full object-cover origin-center transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.015] transform-[translateZ(0)]"
          />
          <div className="absolute left-1/2 top-[12%] h-30 w-[65%] -translate-x-1/2 rounded-full bg-white/[0.035] blur-[80px] pointer-events-none" />
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 via-28% to-transparent" />
          <div className="absolute inset-0 bg-linear-to-b from-white/8 via-transparent to-transparent" />

          {/* Selected outline */}
          <div
            className={`absolute inset-0 rounded-[52px] pointer-events-none transition-all duration-300 ${isSelected ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
            style={{
              boxShadow: isSelected
                ? "inset 0 0 0 1px rgba(255,255,255,0.25), 0 0 32px rgba(255,255,255,0.15)"
                : "none",
            }}
          />

          {/* Animated border */}
          {isSelected && (
            <div className="absolute inset-0 rounded-[52px] overflow-hidden pointer-events-none">
              <div
                className="absolute inset-[-120%] animate-border-spin opacity-80"
                style={{
                  background: `linear-gradient(90deg, transparent 46%, rgba(255,255,255,0.18) 50%, transparent 54%)`,
                }}
              />
              <div className="absolute inset-0 rounded-[52px] border border-white/8" />
            </div>
          )}

          {/* Premium focus glow */}
          <motion.div
            animate={{ opacity: isSelected ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 rounded-[52px] pointer-events-none"
          >
            <div className="absolute inset-0 rounded-[52px] shadow-[0_0_40px_rgba(255,255,255,0.10)]" />
            <div className="absolute inset-px rounded-[51px] border border-white/10" />
            <div className="absolute top-0 left-[12%] h-px w-[76%] bg-linear-to-r from-transparent via-white/30 to-transparent" />
          </motion.div>

          {/* Content Layer (Restored Layout with Tech Stack) */}
          <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-10">
            <div className="flex w-full items-end justify-between gap-4">

              {/* Title Section */}
              <div className="max-w-[70%]">
                <p className="mb-2 text-[10px] sm:text-xs uppercase tracking-[0.35em] text-white/45">
                  Featured Project
                </p>
                <h2 className="text-2xl sm:text-2xl lg:text-3xl font-semibold tracking-tight text-white leading-none">
                  {title}
                </h2>
              </div>

              {/* Anti-Clutter Tech Stack Icons */}
              {stack && stack.length > 0 && (
                <div className="flex items-center -space-x-2 pb-1">
                  {stack.slice(0, 4).map((techKey, i) => {
                    const tech = techStack[techKey];
                    return (
                      <div
                        key={techKey}
                        title={tech?.name || techKey}
                        className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-md transition-transform hover:scale-110 hover:z-20"
                        style={{ zIndex: 10 - i }}
                      >
                        {tech?.icon ? (
                          <img
                            src={tech.icon}
                            alt={tech.name}
                            className="h-3.5 w-3.5 sm:h-4 sm:w-4 object-contain opacity-80"
                          />
                        ) : (
                          <span className="text-[8px] font-medium text-white/70">
                            {techKey.slice(0, 2)}
                          </span>
                        )}
                      </div>
                    );
                  })}

                  {/* The overflow bubble (+X) */}
                  {stack.length > 4 && (
                    <div
                      className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-[9px] sm:text-[10px] font-medium text-white/80"
                      style={{ zIndex: 5 }}
                    >
                      +{stack.length - 4}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Card;
import { motion } from 'framer-motion';

type CardProps = {
    title: string;
    image: string;
    onHover: (image: string) => void;
    onSelect: () => void;
    isSelected?: boolean;
    onHoverEnd: () => void;
    didDrag: boolean;
};

function Card({
    title,
    image,
    onHover,
    onHoverEnd,
    onSelect,
    isSelected,
    didDrag,
}: CardProps) {
    return (
        <motion.div
            whileHover={{
                scale: 1.015,
                y: -6,
            }}

            onHoverStart={() => {
                    onHover(image);
                }}
            onHoverEnd={onHoverEnd}

onClick={(event) => {
    event.stopPropagation();
    if (didDrag) return
    onSelect();
}}

            animate={{
                y: isSelected ? -10 : 0,
            }}

            transition={{
                type: 'spring',
                stiffness: 180,
                damping: 22,
            }}
            className="
                relative
                w-[620px]
                h-[360px]
                cursor-pointer
                group
                select-none
                transition-all
                duration-100
                drop-shadow-[0_16px_28px_rgba(0,0,0,0.35)]
                group-hover:drop-shadow-[0_30px_55px_rgba(0,0,0,0.55)]
            "
        >
            {/* Ambient base lighting */}
            <div
                className="
                    absolute
                    left-1/2
                    top-[58%]
                    h-[180px]
                    w-[82%]
                    -translate-x-1/2
                    rounded-full
                    bg-gradient-to-t
                    from-[#6d4c41]/[0.10]
                    via-[#8d6e63]/[0.05]
                    to-transparent
                    blur-[60px]
                    opacity-80
                    pointer-events-none
                "
            />

                        {/* Outer selected glow */}
            {isSelected && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="
                        absolute
                        -inset-[10px]
                        rounded-[62px]
                        overflow-hidden
                        pointer-events-none
                    "
                >
                    {/* Rotating glow - dual corner */}
                    <div
                        className="
                            absolute
                            inset-[-100%]
                            animate-border-spin
                            opacity-55
                        "
                        style={{
                            background: `
                            conic-gradient(
                                from -90deg,

                                transparent 0deg,
                                transparent 76deg,

                                rgba(255,255,255,0.16) 82deg,
                                rgba(255,255,255,0.75) 90deg,
                                rgba(255,255,255,0.16) 98deg,

                                transparent 106deg,
                                transparent 256deg,

                                rgba(255,255,255,0.16) 262deg,
                                rgba(255,255,255,0.75) 270deg,
                                rgba(255,255,255,0.16) 278deg,

                                transparent 286deg,
                                transparent 360deg
                            )
                            `,
                            filter: 'blur(9px)',
                            opacity: 0.55,
                        }}
                    />

                    {/* Soft ambient bloom */}
                    <div
                        className="
                            absolute
                            inset-0
                            rounded-[62px]
                            shadow-[0_0_40px_rgba(255,255,255,0.12)]
                        "
                    />
                </motion.div>
            )}

            {/* Actual card container */}
            <div
                className="
                    relative
                    h-full
                    w-full
                    overflow-hidden
                    rounded-[52px]
                    bg-black
                "
                style={{
                    clipPath: 'inset(0 round 52px)',
                }}
            >
                {/* Background image */}
                <img
                    src={image}
                    alt={title}
                    className="
                        absolute
                        inset-0
                        h-full
                        w-full
                        object-cover
                        origin-center
                        transition-transform
                        duration-700
                        ease-out
                        will-change-transform
                        group-hover:scale-[1.015]
                        [transform:translateZ(0)]
                    "
                />

                {/* Top atmospheric light */}
                <div
                    className="
                        absolute
                        left-1/2
                        top-[12%]
                        h-[120px]
                        w-[65%]
                        -translate-x-1/2
                        rounded-full
                        bg-white/[0.035]
                        blur-[80px]
                        pointer-events-none
                    "
                />

                {/* Cinematic vignette */}
                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/75
                        via-black/15
                        via-[28%]
                        to-transparent
                    "
                />

                {/* Ambient top fade */}
                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-b
                        from-white/[0.08]
                        via-transparent
                        to-transparent
                    "
                />

                        {/* Selected outline */}
                        <div
                            className={`
                                absolute
                                inset-0
                                rounded-[52px]
                                pointer-events-none
                                transition-all
                                duration-300
                                ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                            `}
                            style={{
                                boxShadow: isSelected 
                                    ? 'inset 0 0 0 1px rgba(255,255,255,0.25), 0 0 32px rgba(255,255,255,0.15)' 
                                    : 'none'
                            }}
                        />

                                {/* Animated border */}
                {isSelected && (
                    <div
                        className="
                            absolute
                            inset-0
                            rounded-[52px]
                            overflow-hidden
                            pointer-events-none
                        "
                    >
                        {/* Rotating highlight */}
                        <div
                            className="
                                absolute
                                inset-[-120%]
                                animate-border-spin
                                opacity-80
                            "
                            style={{
                                background:
                                    `
                                    linear-gradient(
                                        90deg,
                                        transparent 46%,
                                        rgba(255,255,255,0.18) 50%,
                                        transparent 54%
                                    )
                                    `,
                            }}
                        />

                        {/* Thin premium border */}
                        <div
                            className="
                                absolute
                                inset-0
                                rounded-[52px]
                                border
                                border-white/[0.08]
                            "
                        />
                    </div>
                )}

                        {/* Premium focus glow */}
                        <motion.div
                            animate={{
                                opacity: isSelected ? 1 : 0,
                            }}
                            transition={{
                                duration: 0.25,
                            }}
                            className="
                                absolute
                                inset-0
                                rounded-[52px]
                                pointer-events-none
                            "
                        >
                            {/* Soft white glow */}
                            <div
                                className="
                                    absolute
                                    inset-0
                                    rounded-[52px]
                                    shadow-[0_0_40px_rgba(255,255,255,0.10)]
                                "
                            />

                            {/* Thin premium highlight */}
                            <div
                                className="
                                    absolute
                                    inset-[1px]
                                    rounded-[51px]
                                    border
                                    border-white/[0.10]
                                "
                            />

                            {/* Top edge specular highlight */}
                            <div
                                className="
                                    absolute
                                    top-0
                                    left-[12%]
                                    h-px
                                    w-[76%]
                                    bg-gradient-to-r
                                    from-transparent
                                    via-white/30
                                    to-transparent
                                "
                            />
                        </motion.div>

                {/* Content */}
                <div
                    className="
                        relative
                        z-10
                        flex
                        h-full
                        items-end
                        p-10
                    "
                >
                    <div className="max-w-[75%]">
                        <p
                            className="
                                mb-3
                                text-xs
                                uppercase
                                tracking-[0.35em]
                                text-white/45
                            "
                        >
                            Featured Project
                        </p>

                        <h2
                            className="
                                text-5xl
                                font-semibold
                                tracking-tight
                                text-white
                                leading-none
                            "
                        >
                        
                            {title}
                        </h2>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default Card;
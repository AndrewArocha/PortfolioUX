import { motion } from 'framer-motion';
import {techStack} from '../../data/techStack.ts';


type ProjectShowcaseProps = {
    project: {
        id: number;
        title: string;
        image: string;
        description?: string;
        stack?: Array<keyof typeof techStack>;
        gallery?: string[];
        githubUrl?: string;
        liveDemoUrl?: string;
    };
    onClose: () => void;
    interactionMode: 'carousel' | 'menu' | 'gallery';
};

function ProjectShowcase({
    project,
    onClose,
    interactionMode,
}: ProjectShowcaseProps) {

    const description =
        project.description ||
        'Project description placeholder text goes here...';

    return (
        <motion.div
            layoutId={`project-${project.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
                fixed
                inset-0
                z-50
                overflow-hidden
                bg-[#070707]
                text-white
            "
        >
            {/* 1. Blurred Base Project Image */}
            <img
                src={project.image}
                alt={project.title}
                className="
                    absolute
                    inset-0
                    h-full
                    w-full
                    object-cover
                    opacity-65
                    blur-[8px]
                    scale-105
                "
            />

            {/* 2. Soft Ambient Tint Overlay */}
            <div className="absolute inset-0 bg-black/25" />

            {/* 3. Elegant, Ultra-Thin Vignette */}
            <div
                className="
                    absolute
                    inset-0
                    pointer-events-none
                    bg-[radial-gradient(circle_at_center,transparent_50%,rgba(7,7,7,0.45)_100%)]
                "
            />

            {/* Showcase Content Container */}
            <div
                className="
                    relative
                    z-10
                    flex
                    h-full
                    w-full
                    justify-between
                    px-24
                    py-16
                "
            >
                {/* LEFT PANEL */}
                <section
                    className="
                        w-[45%]
                        h-full
                        flex
                        flex-col
                    "
                >
                    {/* Top 20% Zone: Branding & Metatags */}
                    <div className="h-[20%] flex flex-col justify-start pt-4">
                        {/* Featured Label */}
                        <div className="mb-4 flex items-center gap-4">
                            <span className="text-xs uppercase tracking-[0.3em] text-[#efc07b]">
                                Featured Project
                            </span>
                            <div className="h-px w-32 bg-[#efc07b]/30" />
                        </div>

                        {/* Your Logo Container Asset */}
                        <div
                            className="
                                h-14
                                w-14
                                rounded-full
                                border
                                border-white/10
                                bg-white/5
                                flex
                                items-center
                                justify-center
                            "
                        >
                            {/* Insert your inline SVG logo here later */}
                            <span className="text-[10px] text-white/40 font-mono">{"{A}"}</span>
                        </div>
                    </div>

                    {/* Remaining 80% Zone: Center-Lock Content Area */}
                    <div className="flex-1 flex flex-col justify-start pt-[6vh]">
                        {/* Title */}
                        <h1 className="mb-6 text-6xl font-bold tracking-tight leading-none text-white">
                            {project.title}
                        </h1>

                        {/* Subtitle */}
                        <p className="mb-6 text-2xl font-medium text-orange-300/90">
                            Adventure far. Discover more.
                        </p>

                            {/* Tech Stack */}
                            <div className="mb-8 flex flex-wrap gap-3">
                                {project.stack?.map((techKey) => {
                                    const tech = techStack[techKey];

                                    return (
                                        <div
                                            key={techKey}
                                            title={tech?.name || techKey}
                                            className="
                                                flex
                                                h-12
                                                w-12
                                                items-center
                                                justify-center
                                                rounded-full
                                                border
                                                border-white/10
                                                bg-white/[0.04]
                                                backdrop-blur-xl
                                                transition-all
                                                duration-300
                                                hover:scale-105
                                                hover:bg-white/[0.07]
                                            "
                                        >
                                            {tech?.icon ? (
                                                <img
                                                    src={tech.icon}
                                                    alt={tech.name}
                                                    className="
                                                        h-6
                                                        w-6
                                                        object-contain
                                                        opacity-90
                                                    "
                                                />
                                            ) : (
                                                <span
                                                    className="
                                                        text-[10px]
                                                        font-medium
                                                        text-white/70
                                                    "
                                                >
                                                    {techKey}
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                        {/* Description */}
                        <p className="max-w-[520px] text-base leading-relaxed text-white/70">
                            {description}
                        </p>

                        {/* Action Buttons */}
                        <div className="mt-20 flex gap-4">
                            <button className="rounded-full bg-orange-300 px-7 py-4 text-sm font-semibold text-black transition-transform hover:scale-[1.02] active:scale-[0.98]">
                                View GitHub
                            </button>
                            <button className="rounded-full border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10">
                                Contact Me
                            </button>
                        </div>
                    </div>
                </section>

                {/* CENTER PREVIEW VIEWPORT */}
            <section
                className="
                    flex
                    flex-1
                    items-center
                    justify-start
                    pl-15
                    pt-[6vh]
                "
            >
                <div
                    className="
                        relative
                        h-[580px]
                        w-[900px]
                        overflow-hidden
                        rounded-[34px]
                        border
                        border-white/10
                        bg-black/20
                        backdrop-blur-xl
                    "
                >
                    <img
                        src={project.image}
                        alt={project.title}
                        className="
                            h-full
                            w-full
                            object-cover
                        "
                    />

                    {/* Soft dark readability overlay */}
                    <div
                        className="
                            absolute
                            inset-0
                            bg-gradient-to-t
                            from-black/30
                            via-transparent
                            to-transparent
                        "
                    />
                </div>
            </section>

                {/* RIGHT PANEL (Revolver Stage) */}
                <section
                    className="
                        relative
                        flex
                        h-full
                        w-[400px]
                        items-center
                        justify-end
                    "
                >
                    {/* Revolver Path Container */}
                    <div className="relative h-[720px] w-full">
                        {/* Top Peripheral Outer Circle */}
                        <div className="absolute top-4 right-12 h-24 w-24 rounded-full border border-white/15 bg-white/5 opacity-40" />

                        {/* Mid-Top Peripheral Circle */}
                        <div className="absolute top-[160px] right-4 h-24 w-24 rounded-full border border-white/15 bg-white/5 opacity-70" />

                        {/* ACTIVE HERO SELECTION (Corrected alignment using negative right mapping) */}
                        <div className="absolute top-[296px] -right-4 h-32 w-32 rounded-full border-2 border-[#efc07b] bg-[#efc07b]/10 shadow-[0_0_30px_rgba(239,192,123,0.15)]" />

                        {/* Mid-Bottom Peripheral Circle */}
                        <div className="absolute bottom-[160px] right-4 h-24 w-24 rounded-full border border-white/15 bg-white/5 opacity-70" />

                        {/* Bottom Peripheral Outer Circle */}
                        <div className="absolute bottom-4 right-12 h-24 w-24 rounded-full border border-white/15 bg-white/5 opacity-40" />
                    </div>
                </section>
            </div>
        </motion.div>
    );
}

export default ProjectShowcase;
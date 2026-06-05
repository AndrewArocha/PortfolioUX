import ReactLogo from '../assets/logo/React.svg';
import TypescriptLogo from '../assets/logo/Typescript.svg';
import JavascriptLogo from '../assets/logo/Javascript.svg';
import TailwindLogo from '../assets/logo/Tailwind.svg';
import NodeLogo from '../assets/logo/Nodejs.svg';
import MongoLogo from '../assets/logo/MongoDB.svg';
import FirebaseLogo from '../assets/logo/Firestore.svg';
import NextLogo from '../assets/logo/NextJS.svg';
import MotionLogo from '../assets/logo/Motion-Framer.svg';
import ViteLogo from '../assets/logo/Vite.svg';
import HTMLLogo from '../assets/logo/HTML5.svg';

export const techStack = {
    react: {
        name: 'React',
        icon: ReactLogo,
    },

    typescript: {
        name: 'TypeScript',
        icon: TypescriptLogo,
    },

    javascript: {
        name: 'JavaScript',
        icon: JavascriptLogo,
    },

    tailwind: {
        name: 'Tailwind CSS',
        icon: TailwindLogo,
    },

    node: {
        name: 'Node.js',
        icon: NodeLogo,
    },

    mongodb: {
        name: 'MongoDB',
        icon: MongoLogo,
    },

    firebase: {
        name: 'Firebase',
        icon: FirebaseLogo,
    },

    nextjs: {
        name: 'Next.js',
        icon: NextLogo,
    },

    framer: {
        name: 'Framer Motion',
        icon: MotionLogo,
    },

    vite: {
        name: 'Vite',
        icon: ViteLogo,
    },

    html: {
        name: 'HTML5',
        icon: HTMLLogo,
    },
} as const;
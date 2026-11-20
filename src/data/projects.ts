import { techStack } from './techStack';

type Project = {
    id: number;
    title: string;
    tagline?: string;
    image: string;
    description?: string;
    stack?: Array<keyof typeof techStack>;
    gallery?: string[];
    githubUrl?: string;
    liveDemoUrl?: string;
};

const projects: Project[] = [
    {
        id: 1,
        title: 'Around The World',
        tagline: 'Adventure far. Discover more.',
        image: '/projects/around-gallery.webp',

        description:
            'I built a full-stack photo gallery with registration, sign-in, profile editing, and image cards. My work connects a React and TypeScript client to an Express REST API with JWT authentication and MongoDB persistence. The result is a deployed gallery where users can add, like, preview, and delete their photos.',

        stack: [
            'react',
            'vite',
            'typescript',
            'node',
            'mongodb',
            'css'
        ],

        gallery: [
            '/projects/around-gallery.webp',
            '/projects/around-photo.webp',
            '/projects/around-sign-up.webp',
        ],

        githubUrl: 'https://github.com/AndrewArocha/web_project_around_full',
        liveDemoUrl: 'https://web-project-around-full-v56n.vercel.app/',
    },

    {
        id: 2,
        title: 'EVEO BDC',
        tagline: 'Reporting and operations for automotive dealerships.',
        image: '/projects/eveo-home.webp',

        description:
            'I developed EVEO BDC from an appointment-reporting prototype, drawing on my dealership operations experience. I built React and TypeScript workspaces connected to an Express and MongoDB API for leads, appointments, showroom activity, and store-scoped access. The platform is in active development; the live link opens its staging preview.',

        stack: [
            'react',
            'vite',
            'tailwind',
            'typescript',
            'node',
            'mongodb',
        ],

        gallery: [
            '/projects/eveo-home.webp',
            '/projects/eveo-pricing.webp',
            '/projects/eveo-register.webp',
        ],

        githubUrl: 'https://github.com/AndrewArocha/project-eveo-bdc',
        liveDemoUrl: 'https://project-eveo-bdc-stage.vercel.app/',
    },

    {
        id: 3,
        title: 'Patisserie Café',
        tagline: 'A French-American café storefront and online ordering.',
        image: '/projects/patisserie-home.webp',

        description:
            'I built a full-stack storefront for a French-American café in New York, using React, TypeScript, Express, and MongoDB. My work includes menu browsing, customer accounts, and catering requests. The live site directs online orders and payment to SpotOn hosted checkout; café accounts retain historical order records.',

        stack: [
            'react',
            'vite',
            'tailwind',
            'typescript',
            'node',
            'mongodb',
        ],

        gallery: [
            '/projects/patisserie-home.webp',
            '/projects/patisserie-menu.webp',
            '/projects/patisserie-order.webp',
        ],

        githubUrl: 'https://github.com/AndrewArocha/patisserie-cafe',
        liveDemoUrl: 'https://www.patisseriecafe.co/',
    },
];

export default projects;


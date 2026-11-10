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
            'A full-stack photo gallery where users can create an account, edit their profile, and collect photos of places they’ve visited. The React client supports adding, liking, and previewing photos. An Express API uses JWT authentication and stores profiles and cards in MongoDB.',

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
            'A multi-tenant operations platform for automotive Business Development Centers. Dealership teams can manage customers, leads, appointments, and showroom visits, then review performance with KPI reports. A TypeScript API stores records in MongoDB and scopes access by dealership and store.',

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
            'A full-stack storefront for a French-American café on New York’s Upper West Side. Guests can browse the menu and build an order, then pay through Stripe Checkout. Customers can sign in to see their order history.',

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


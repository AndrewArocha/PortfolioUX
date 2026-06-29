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
        image:
            '/AroundTheWorld5.png',

        description:
            'World Gallery is a web application that allows users to edit their profile information and manage a gallery of image cards. Users can add new cards, remove cards, like cards, and preview images in modal windows. The project uses object-oriented programming principles with reusable classes for cards, popups, validation, and user information management.',

        stack: [
            'javascript',
            'typescript',
            'node',
            'html',
            'css'
        ],

        gallery: [
            '/AroundTheWorld5.png', // Card Full View Modal
            '/AroundTheWorld2.png', // Update Profile Pic Modal
            '/AroundTheWorld3.png', // Update Profile Info Modal
            '/AroundTheWorld4.png', // New Card Modal
            '/AroundTheWorld1.png' // Gallery View
        ],

        githubUrl: 'https://github.com/AndrewArocha/web_project_around_es',
        liveDemoUrl: '',
    },

    {
        id: 2,
        title: 'EVEO INC Report Hub',
        tagline: 'Data-driven insights for BDC.',
        image:
            '/BDCReportMaker1.png',

        description:
            'Eveo Hub is a premium, multi-tenant Business Development Center (BDC) reporting workspace designed specifically for automotive dealerships. Built to replace cluttered spreadsheets and uninspired SaaS dashboards. It allows BDC managers and store owners to securely compile, analyze, and share critical workflow metrics across multiple dealership locations.',

        stack: [
            'react',
            'vite',
            'tailwind',
            'typescript',
        ],

        gallery: [
            '/BDCReportMaker1.png', // Hero IMG
            '/BDCReportMaker2.png', // Report Type Selector
            '/BDCReportMaker3.png', // Report View
            '/BDCReportMaker4.png', // Report Loading State
            '/BDCReportMaker5.png', // Compiled State
            '/BDCReportMaker6.png', // Compiled Preview
            '/BDCReportMaker7.png', // Compiled Extended Preview
            '/BDCReportMaker8.png',
        ],

        githubUrl: 'https://github.com/AndrewArocha/BDC-Report-maker/tree/vite-tailwind-refactor',
        liveDemoUrl: '',
    },

    {
        id: 3,
        title: 'Triple Espresso',
        image:
            '/CoffeeShop1.png',

        description:
            'A responsive, semantic HTML5 and CSS3 landing page designed for a specialty coffee shop. Focuses on accessibility, form validation, and core web design fundamentals without relying on heavy JavaScript frameworks.',

        stack: [
            'html',
            'css',
        ],

        gallery: [
            '/CoffeeShop1.png', // Hero image
            '/CoffeeShop2.png' // Forms 
        ],

        githubUrl: 'https://github.com/AndrewArocha/web_project_coffeeshop_es',
        liveDemoUrl: 'https://andrewarocha.github.io/web_project_coffeeshop_es/',
    },
];

export default projects;


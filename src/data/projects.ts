import { techStack } from './techStack';

type Project = {
    id: number;
    title: string;
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
        title: 'Around The U.S.',
        image:
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200',

        description:
            'Modern travel platform for discovering destinations and planning memorable experiences.',

        stack: [
            'react',
            'typescript',
            'tailwind',
        ],

        gallery: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200', // Hero image
        'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=1200', // Paris
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200', // Dubai
        'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200', // NYC
        'https://plus.unsplash.com/premium_photo-1733306480053-867019b115d0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // Vermont
    ],

        githubUrl: 'https://github.com/AndrewArocha/web_project_around_es',
        liveDemoUrl: '',
    },

    {
        id: 2,
        title: 'Coffee Shop',
        image:
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200',

        description:
            'Premium coffee storefront with smooth ordering experience and immersive branding.',

        stack: [
            'react',
            'javascript',
            'tailwind',
        ],

        githubUrl: 'https://github.com/AndrewArocha/web_project_coffeeshop_es',
        liveDemoUrl: '',
    },

    {
        id: 3,
        title: 'Movie Explorer',
        image:
            'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200',

        description:
            'Interactive movie discovery interface with dynamic filtering and cinematic browsing.',

        stack: [
            'react',
            'vite',
            'tailwind',
        ],
        githubUrl:'https://github.com/AndrewArocha/BDC-Report-maker/tree/vite-tailwind-refactor',
        liveDemoUrl:'',
    },
];

export default projects;


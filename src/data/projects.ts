import { techStack } from './techStack';

type Project = {
    id: number;
    title: string;
    image: string;

    description?: string;

    stack?: Array<keyof typeof techStack>;

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

        githubUrl: '',
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
    },
];

export default projects;


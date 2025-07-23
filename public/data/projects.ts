// data/projects.ts
import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: '1',
    title: 'My Awesome Project',
    description: 'A revolutionary web application',
    tags: ['React', 'Next.js'],
    image: {
      src: '/projects/1.png',
      width: 1200,
      height: 800,
    },
    altText: 'Project screenshot',
    url: 'https://example.com/project1'
  },
  {
    id: '2',
    title: 'Mobile App',
    description: 'iOS and Android application',
    tags: ['React Native'],
    image: {
      src: '/projects/1.png',
      width: 1200,
      height: 800,
    },
    altText: 'Mobile app screenshot',
    url: 'https://example.com/app'
  },
  // Projects without URLs will render without links
];
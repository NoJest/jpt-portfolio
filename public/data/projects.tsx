import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with payment integration, cart functionality, and admin dashboard.',
    imageUrl: '/images/projects/ecommerce.jpg',
    projectUrl: 'https://ecommerce-demo.example.com',
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    tags: ['React', 'Node.js', 'MongoDB'],
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Mongoose'],
    featured: true,
    date: '2023-11-15'
  },
  {
    id: '2',
    title: 'AI Image Generator',
    description: 'Web application that generates custom images using Stable Diffusion API with prompt engineering.',
    imageUrl: '/images/projects/ai-generator.jpg',
    projectUrl: 'https://ai-image-generator.example.com',
    githubUrl: 'https://github.com/yourusername/ai-image-generator',
    tags: ['AI', 'Machine Learning', 'Cloud'],
    techStack: ['React', 'Python', 'FastAPI', 'AWS Lambda'],
    featured: true,
    date: '2023-09-22'
  },
  {
    id: '3',
    title: 'Task Management App',
    description: 'Kanban-style productivity application with drag-and-drop functionality and team collaboration features.',
    imageUrl: '/images/projects/task-manager.jpg',
    githubUrl: 'https://github.com/yourusername/task-management-app',
    tags: ['Productivity', 'Collaboration'],
    techStack: ['React', 'Redux', 'Firebase', 'React DnD'],
    featured: false,
    date: '2023-07-10'
  },
  {
    id: '4',
    title: 'Weather Dashboard',
    description: 'Real-time weather visualization with 5-day forecasts, historical data, and location search.',
    imageUrl: '/images/projects/weather-app.jpg',
    projectUrl: 'https://weather-dashboard.example.com',
    tags: ['API Integration', 'Data Visualization'],
    techStack: ['TypeScript', 'Chart.js', 'OpenWeather API', 'Geolocation API'],
    featured: true,
    date: '2023-05-18'
  }
]
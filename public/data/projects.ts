import { Vector3 } from 'three';

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  modelUrl?: string; // For 3D models
  link?: string;
  color?: string;
  position?: Vector3;
  rotation?: Vector3;
  scale?: number;
}

export const projects: Project[] = [
  {
    id: 'portfolio',
    title: '3D Portfolio',
    description: 'My interactive portfolio built with Three.js and React',
    tags: ['Three.js', 'React', 'WebGL'],
    imageUrl: '/public/projects/1.png',
    link: 'www.JustinPThomasson.com',
    color: '#6366f1', // indigo
    scale: 1.2,
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce AR',
    description: 'Augmented reality product preview for online store',
    tags: ['AR', 'WebXR', '3D Modeling'],
    imageUrl: '/public/projects/1.png',
    link: 'https://example.com/ecommerce',
    color: '#10b981', // emerald
    scale: 0.8
  },
  {
    id: 'data-viz',
    title: 'Data Visualization',
    description: 'Interactive 3D data visualization of climate patterns',
    tags: ['D3.js', 'Three.js', 'Data'],
    imageUrl: '/public/projects/1.png',
    color: '#3b82f6', // blue
    scale: 1
  },
  {
    id: 'game',
    title: 'Web Game',
    description: 'Browser-based 3D platformer game',
    tags: ['Game Dev', 'Physics', 'WebGL'],
    imageUrl: '/public/projects/1.png',
    link: 'https://example.com/game',
    color: '#f59e0b', // amber
    scale: 1.5
  },
  {
    id: 'arch-viz',
    title: 'Architecture Visualizer',
    description: 'Real-time architectural rendering tool',
    tags: ['Architecture', '3D', 'Design'],
    imageUrl: '/public/projects/1.png',
    color: '#ef4444', // red
    scale: 0.7
  },
  {
    id: 'music-visualizer',
    title: 'Audio Visualizer',
    description: '3D music visualization that reacts to sound',
    tags: ['Audio API', 'Shaders', 'Creative Coding'],
    imageUrl: '/public/projects/1.png',
    link: 'https://example.com/music',
    color: '#8b5cf6', // violet
    scale: 1.1
  }
];
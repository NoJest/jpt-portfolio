import { Vector3, Euler } from 'three';

export interface Project {
    id: string;
    title: string;
    description: string;
    tags: string[];
    imageUrl: string;
    modelUrl?: string;
    link?: string;
    color?: string;
    position?: { x: number; y: number; z: number }; 
    rotation?: { x: number; y: number; z: number }; 
    scale?: number;
  }
   export interface ItemProps {
    project: Project;
    onClick: () => void;
    active?: boolean;
  };


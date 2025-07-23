export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: {
    src: string;
    width: number;
    height: number;
  };
  altText: string;
  url?: string; 
}
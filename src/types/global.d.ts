export {};

declare global {
  interface Window {
    grecaptcha: ReCaptchaV2.ReCaptcha;
    recaptchaCallback?: () => void;
    captchaOnLoad?: () => void;
    recaptchaVerified?: (token: string) => void;
  }

  interface Project {
    id: string;
    title: string;
    description: string;
    imageUrl?: string;
    projectUrl?: string;
    githubUrl?: string;
    tags: string[];
    techStack: string[];
    featured: boolean;
    date: string;
  }
  interface ProjectPanelProps {
    project: Project
    position: [number, number, number]
   isSelected?: boolean
    onClick: () => void

}
}
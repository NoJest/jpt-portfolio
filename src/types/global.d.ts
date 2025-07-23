export {};

declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      render: (container: string | HTMLElement, parameters: ReCaptchaParameters) => string;
      reset: (optWidgetId?: string) => void;
    };
    captchaOnLoad?: () => void;
  }
}

interface ReCaptchaParameters {
  sitekey: string;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'compact' | 'invisible';
  tabindex?: number;
  callback?: (response: string) => void;
  'expired-callback'?: () => void;
  'error-callback'?: () => void;
}
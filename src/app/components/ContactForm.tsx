'use client';

import { useState, useEffect, useRef } from 'react';
import Script from 'next/script';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const retryCount = useRef(0);
  const maxRetries = 3;

  // Manual script loading fallback
  const loadRecaptchaScript = () => {
    if (retryCount.current >= maxRetries) {
      setErrors(prev => ({
        ...prev,
        form: 'Security features unavailable. Please try again later.'
      }));
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('reCAPTCHA loaded manually');
      initializeRecaptcha();
    };
    script.onerror = () => {
      console.error('Manual reCAPTCHA load failed');
      retryCount.current++;
      setTimeout(loadRecaptchaScript, 2000 * retryCount.current);
    };
    document.body.appendChild(script);
  };

  const initializeRecaptcha = () => {
    if (window.grecaptcha) {
      window.grecaptcha.ready(() => {
        console.log('reCAPTCHA ready');
        setRecaptchaLoaded(true);
      });
    } else {
      console.error('reCAPTCHA object not available');
      setErrors(prev => ({
        ...prev,
        form: 'Security verification unavailable'
      }));
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!recaptchaLoaded) {
        console.warn('reCAPTCHA load timeout - trying fallback');
        loadRecaptchaScript();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [recaptchaLoaded]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateInputs()) return;

    setIsSubmitting(true);
    setStatus('idle');
    setErrors({});

    try {
      if (!recaptchaLoaded) {
        throw new Error('Security verification not ready');
      }

      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!,
        { action: 'submit' }
      );

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          recaptchaToken: token,
          website: formData.website
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '', website: '' });
      window.grecaptcha?.reset();
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrors({
        form: error instanceof Error 
          ? error.message 
          : 'Failed to submit form. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Script
        id="recaptcha-script"
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
        strategy="lazyOnload"
        onLoad={() => {
          console.log('reCAPTCHA script loaded');
          initializeRecaptcha();
        }}
        onError={() => {
          console.error('Failed to load reCAPTCHA script');
          loadRecaptchaScript();
        }}
      />
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
        {/* Form fields remain the same */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground/80 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.name ? 'border-red-500' : 'border-border'
            }`}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-red-500 text-xs mt-1">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground/80 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-border'
            }`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-xs mt-1">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground/80 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded-lg bg-background focus:ring-2 focus:ring-primary focus:border-transparent ${
              errors.message ? 'border-red-500' : 'border-border'
            }`}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="text-red-500 text-xs mt-1">
              {errors.message}
            </p>
          )}
        </div>

        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Leave this field empty</label>
          <input 
            type="text" 
            id="website" 
            name="website" 
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div
          className="g-recaptcha"
          data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          data-size="normal"
        />

        <button
          type="submit"
          disabled={isSubmitting || !recaptchaLoaded}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p className="text-green-500 text-sm">Message sent successfully!</p>
        )}
        {status === 'error' && errors.form && (
          <p className="text-red-500 text-sm">{errors.form}</p>
        )}
      </form>
    </>
  );
}
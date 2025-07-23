'use client';

import dynamic from 'next/dynamic';

const ContactForm = dynamic(
  () => import('./ContactForm'), // path to your actual ContactForm component
  { 
    ssr: false,
    loading: () => <div className="text-center p-4">Loading contact form...</div>
  }
);

export default function ContactFormWrapper() {
  return (
    <div className="contact-form-container">
      <ContactForm />
    </div>
  );
}
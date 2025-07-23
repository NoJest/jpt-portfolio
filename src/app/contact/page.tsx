'use client';
import ContactFormWrapper from "../components/ContactFormWrapper";

export default function Contact() {
  return (
    <section className="py-20 container mx-auto px-4">
      <h1 className="text-3xl font-bold text-foreground text-balance mb-2">
        Get in Touch
      </h1>
      <p className="mb-8 text-foreground/80">
        Fill out the form below or reach out directly at{' '}
        <a 
          href="mailto:Justin@JustinPThomasson.com" 
          className="text-primary hover:underline"
        >
          Justin@JustinPThomasson.com
        </a>.
      </p>
      <ContactFormWrapper />
    </section>
  );
}
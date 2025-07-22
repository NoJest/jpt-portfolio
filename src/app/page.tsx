import Hero from "./components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Keep your existing sections below if needed */}
      <section className="py-20">
        <h1 className="text-4xl font-bold text-primary">
          More About Me
        </h1>
        <p className="mt-4 text-lg text-secondary">
          Additional content sections can go here...
        </p>
      </section>
    </main>
  );
}
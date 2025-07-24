export default function About() {
  return (
    <section className="py-20 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-foreground mb-2">
        Engineering With Intent
      </h1>
      <p className="text-lg text-primary mb-8">
        Justin Thomasson | Full-Stack Developer | Next.js, Python, React
      </p>

      <div className="space-y-6 text-foreground/80 text-lg">
        <p>
          My journey began when I discovered a message broadcast vulnerability in my middle school's library computers. 
          That early fascination with systems never faded, it just evolved into building them properly.
        </p>

        <p>
          Today I specialize in creating efficient, user-focused applications. From optimizing database queries to 
          crafting intuitive interfaces, I bridge technical execution with real-world usability.
        </p>

        <div className="bg-muted/50 p-6 rounded-lg border-l-4 border-primary">
          <h3 className="font-semibold text-foreground mb-3">What drives my work:</h3>
          <ul className="space-y-2 list-disc pl-5">
            <li>Performance that feels instantaneous</li>
            <li>Code that's as readable as it is functional</li>
            <li>Solving actual problems, not just writing features</li>
          </ul>
        </div>

        <p>
          My background in AV tech and customer service gives me a unique edge, I speak both 
          <span className="text-primary"> machine </span> 
          and <span className="text-primary"> human </span> fluently. 
          I've repaired audio systems during live events and soothed frustrated customers, 
          both require the same calm problem-solving I bring to debugging sessions.
        </p>

      </div>
    </section>
  );
}
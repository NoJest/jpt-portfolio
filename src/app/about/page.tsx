'use client'
import { useMediaQuery } from "@/hooks/useMediaQuery";
import Link from "next/link";
import { motion } from "framer-motion";
import DownloadResume from "../components/DownloadResume";

export default function About() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return (
    <main className= 'min-h-screen overflow-y-auto'>
    <section className={`py-12 ${isMobile ? 'px-4' : 'max-w-2xl mx-auto'}`}>
        <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold text-foreground mb-2`}>
          Engineering With Intent
        </h1>
        <p className={`${isMobile ? 'text-base' : 'text-lg'} text-primary mb-6 md:mb-8`}>
          Justin Thomasson | Full-Stack Developer | Next.js, Python, React
        </p>

        <div className={`space-y-6 text-foreground/80 ${isMobile ? 'text-base pb-12' : 'text-lg pb-20'}`}>
          <p>
            My journey began when I discovered a message broadcast vulnerability in my middle school&apos;s library computers. 
            That early fascination with systems never faded, it just evolved into building them properly.
          </p>

          <p>
            Today I specialize in creating efficient, user-focused applications. From optimizing database queries to 
            crafting intuitive interfaces, I bridge technical execution with real-world usability.
          </p>

          <div className={`bg-muted/50 p-4 ${isMobile ? 'rounded-lg' : 'rounded-lg border-l-4'} border-primary`}>
            <h3 className="font-semibold text-foreground mb-3">What drives my work:</h3>
            <ul className="space-y-2 list-disc pl-5">
              <li>Performance that feels instantaneous</li>
              <li>Code that&apos;s as readable as it is functional</li>
              <li>Solving actual problems, not just writing features</li>
            </ul>
          </div>

          <p>
            My background in AV tech and customer service gives me a unique edge, I speak both
            <span className="text-primary"> machine </span> 
            and <span className="text-primary"> human </span> fluently. 
            I&apos;ve repaired audio systems during live events and soothed frustrated customers, 
            both require the same calm problem-solving I bring to debugging sessions.
          </p>
        </div>
         <div className="flex justify-center mt-12">
          <DownloadResume />
        </div>
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex flex-col space-y-4"
        >

          <Link 
            href="/projects" 
            className="px-6 py-3 border border-primary text-primary rounded-lg text-center hover:bg-primary/10 transition-colors"
          >
            View My Projects
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 bg-primary text-white rounded-lg text-center hover:bg-primary/90 transition-colors"
          >
            Get In Touch
          </Link>
        </motion.div>
      )}
    </section>
    </main>
  );
}
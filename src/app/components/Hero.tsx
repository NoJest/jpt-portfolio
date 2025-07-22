'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
    >
      <motion.h1
        whileHover={{ scale: 1.02 }}
        className="text-5xl md:text-6xl font-bold mb-6"
      >
        Hi, I'm <span className="text-primary">Justin Patrick Thomasson</span>.
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl"
      >
        Full-stack developer building modern web experiences.
      </motion.p>

      <div className="flex flex-wrap justify-center gap-4">
        {/* Projects Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link
            href="/projects"
            className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
          >
            View My Work
          </Link>
        </motion.div>

        {/* About Link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link
            href="/about"
            className="px-8 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
          >
            Get to Know Me
          </Link>
        </motion.div>

        {/* Contact Link - Different Style */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <Link
            href="/contact"
            className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            Contact Me
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
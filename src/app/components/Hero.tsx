'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function Hero() {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
    >
      <motion.h1
        whileHover={{ scale: 1.02 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6"
      >
        Hi, I&apos;m <span className="text-primary">Justin Patrick Thomasson</span>.
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-lg md:text-xl lg:text-2xl text-foreground/80 mb-8 max-w-2xl"
      >
        Full-stack developer building modern web experiences.
      </motion.p>

      <div className={`flex ${isMobile ? 'flex-col space-y-4 w-full max-w-xs' : 'flex-wrap justify-center gap-4'}`}>
        {/* Projects Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={isMobile ? 'w-full' : ''}
        >
          <Link
            href="/projects"
            className={`block text-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors ${
              isMobile ? 'w-full' : 'px-8 py-3'
            }`}
          >
            View My Work
          </Link>
        </motion.div>

        {/* About Link */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className={isMobile ? 'w-full' : ''}
        >
          <Link
            href="/about"
            className={`block text-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors ${
              isMobile ? 'w-full' : 'px-8 py-3'
            }`}
          >
            Get to Know Me
          </Link>
        </motion.div>

        {/* Contact Link - Different Style */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className={isMobile ? 'w-full' : ''}
        >
          <Link
            href="/contact"
            className={`block text-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors dark:bg-gray-600 dark:hover:bg-gray-700 ${
              isMobile ? 'w-full' : 'px-8 py-3'
            }`}
          >
            Contact Me
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
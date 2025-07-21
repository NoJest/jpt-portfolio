'use client';
import {motion} from 'framer-motion';

export default function Hero() {
    return (
        <motion.section
            initial = {{opacity: 0 }}
            animate = {{ opacity: 1 }}
            transition = {{ duration: 0.5}}
            className='min-h-screen flex items-center justify-center'
        >
            <motion.h1
                whileHover= {{ scale: 1.05}}
                className='text-6x1 font-bold'
            >
                Hi, I'm <span className="text-primary"> Justin Patrick Thomasson</span>.
            </motion.h1>
        </motion.section>
    );
}
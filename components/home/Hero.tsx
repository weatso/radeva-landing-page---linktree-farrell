'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Logic Parallax: Mengambil posisi scroll user
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transformasi: Background turun lebih lambat (0% -> 50%) dibanding scroll user
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  // Teks memudar saat di-scroll ke bawah
  const opacityText = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* 1. BACKGROUND LAYER (PARALLAX) */}
      <motion.div 
        style={{ y: yBackground }}
        className="absolute inset-0 z-0"
      >
        {/* Overlay Gelap agar teks terbaca */}
        <div className="absolute inset-0 bg-radeva-900/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-radeva-900 via-transparent to-transparent z-10" />
        
        {/* Placeholder Image - Ganti dengan foto wedding terbaik klien nanti */}
        <Image 
          src="/images/hero-bg.jpg" // Pastikan file ini ada nanti!
          alt="Radeva Luxury Wedding"
          fill
          priority
          className="object-cover object-center"
        />
      </motion.div>

      {/* 2. CONTENT LAYER */}
      <motion.div 
        style={{ opacity: opacityText }}
        className="relative z-20 container mx-auto px-6 text-center flex flex-col items-center"
      >
        
        {/* Small Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="h-[1px] w-8 md:w-16 bg-gold-400/60"></span>
          <span className="font-sans text-xs md:text-sm tracking-[0.3em] text-gold-400 uppercase">
            Est. 2024 — Semarang
          </span>
          <span className="h-[1px] w-8 md:w-16 bg-gold-400/60"></span>
        </motion.div>

        {/* Main Title - Serif Font */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-9xl text-gold-100 leading-[0.9] mb-8"
        >
          Crafting Timeless <br />
          <span className="text-gold-500 italic">Memories</span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-sans text-gold-100/90 max-w-lg text-sm md:text-base leading-relaxed tracking-wide mb-10"
        >
          Kami merancang pernikahan impian dengan sentuhan personal, elegan, dan perencanaan presisi untuk momen sekali seumur hidup Anda.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <Link 
            href="https://wa.me/628123456789" // Ganti No WA
            className="group relative inline-flex items-center gap-3 px-8 py-4 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-radeva-900 transition-all duration-300 ease-out"
          >
            <span className="font-sans text-xs tracking-[0.2em] uppercase">Konsultasi Gratis</span>
          </Link>
        </motion.div>

      </motion.div>

      {/* 3. SCROLL INDICATOR (Bottom) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ duration: 2, delay: 1.5, repeat: Infinity }}
        className="absolute bottom-10 z-20"
      >
        <ArrowDown className="text-gold-400/50 w-6 h-6" />
      </motion.div>

    </section>
  );
}
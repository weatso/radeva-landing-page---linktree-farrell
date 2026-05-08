'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Marquee from '@/components/ui/Marquee';
import { Star } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative w-full bg-radeva-900 py-20 overflow-hidden">
      
      {/* 1. LUXURY MARQUEE DIVIDER */}
      <div className="mb-20 border-y border-gold-500/10 bg-radeva-800/50 backdrop-blur-sm">
        <Marquee speed={40} className="py-4">
  <div className="flex items-center gap-16 px-4">
    {/* Item 1 */}
    <span className="font-serif text-5xl md:text-7xl text-gold-500/20 italic tracking-tighter">Elegant</span>
    <span className="text-gold-500/40 text-xs flex items-center justify-center">◆</span> 
    
    {/* Item 2 */}
    <span className="font-serif text-5xl md:text-7xl text-gold-500/20 italic tracking-tighter">Timeless</span>
    <span className="text-gold-500/40 text-xs flex items-center justify-center">◆</span>
    
    {/* Item 3 */}
    <span className="font-serif text-5xl md:text-7xl text-gold-500/20 italic tracking-tighter">Luxurious</span>
    <span className="text-gold-500/40 text-xs flex items-center justify-center">◆</span>
    
    {/* Item 4 */}
    <span className="font-serif text-5xl md:text-7xl text-gold-500/20 italic tracking-tighter">Memorable</span>
    <span className="text-gold-500/40 text-xs flex items-center justify-center">◆</span>
  </div>
</Marquee>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          {/* 2. LEFT CONTENT (TEXT) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h4 className="font-sans text-xs tracking-[0.3em] text-gold-400 uppercase mb-4">
              The Philosophy
            </h4>
            <h2 className="font-serif text-4xl md:text-6xl text-gold-100 mb-8 leading-tight">
              We Don't Just Plan, <br />
              <span className="text-gold-500 italic">We Curate Memory.</span>
            </h2>
            <p className="font-sans text-gold-100/80 leading-relaxed mb-6 text-justify">
              Kami percaya pernikahan bukan sekadar tentang susunan acara, melainkan tentang rasa dan kenangan yang tercipta. Itulah mengapa kami selalu memberikan sentuhan personal dalam setiap perencanaan yang kami buat.
            </p>
            <p className="font-sans text-gold-100/80 leading-relaxed mb-8 text-justify">
              Dari tata cahaya yang hangat hingga urutan acara yang mengalir, semua kami siapkan dengan hati. Fokuslah pada kebahagiaan Anda dan pasangan, sementara kami memastikan segalanya berjalan sebagaimana mestinya.
            </p>

            {/* Signature / Stats */}
            <div className="flex gap-12 border-t border-gold-500/20 pt-8">
              <div>
                <span className="block font-serif text-4xl text-gold-500">50+</span>
                <span className="text-xs uppercase tracking-widest text-gold-400">Luxury Weddings</span>
              </div>
              <div>
                <span className="block font-serif text-4xl text-gold-500">100%</span>
                <span className="text-xs uppercase tracking-widest text-gold-400">Satisfaction</span>
              </div>
            </div>
          </motion.div>

          {/* 3. RIGHT CONTENT (IMAGE) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[600px] w-full"
          >
             {/* Frame Border Effect */}
            <div className="absolute top-4 right-4 w-full h-full border border-gold-500/30 -z-10 rounded-sm" />
            
            <div className="relative h-full w-full overflow-hidden rounded-sm bg-radeva-800">
               {/* GANTI SRC FOTO INI */}
              <Image 
                src="/porto/porto 5.jpg" 
                alt="Radeva Team in Action"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Overlay Gradient Halus */}
              <div className="absolute inset-0 bg-gradient-to-t from-radeva-900/60 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
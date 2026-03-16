'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Aditya & Sarah",
    category: "Intimate Outdoor",
    location: "Amanjiwo, Magelang",
    img: "/images/portfolio-1.jpg"
  },
  {
    id: 2,
    title: "Michael & Jessica",
    category: "Grand Ballroom",
    location: "The Langham, Jakarta",
    img: "/images/portfolio-2.jpg"
  },
  {
    id: 3,
    title: "Rendra & Maya",
    category: "Traditional Javanese",
    location: "Plataran Heritage, Borobudur",
    img: "/images/portfolio-3.jpg"
  },
  {
    id: 4,
    title: "David & Clara",
    category: "Modern Minimalist",
    location: "Padma Hotel, Semarang",
    img: "/images/portfolio-4.jpg"
  },
];

export default function Portfolio() {
  const targetRef = useRef<HTMLDivElement>(null);

  // Logic Scroll:
  // Kita tracking scroll progress dari container (0% sampai 100%)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transformasi:
  // Saat scroll 0% -> Geser X 0%
  // Saat scroll 100% -> Geser X -75% (Tergantung jumlah item agar pas di ujung)
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    // Height 300vh membuat area scroll sangat panjang vertikal, memberikan waktu untuk animasi horizontal
    <section ref={targetRef} className="relative h-[300vh] bg-radeva-900">
      
      {/* Sticky Wrapper: Menahan konten agar tetap di layar saat user scroll area 300vh tadi */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24">
          
          {/* 1. INTRO CARD (Judul Section) */}
          <div className="flex h-[60vh] w-[80vw] md:w-[30vw] flex-col justify-center shrink-0">
            <h4 className="font-sans text-xs tracking-[0.3em] text-gold-400 uppercase mb-4">
              Our Masterpieces
            </h4>
            <h2 className="font-serif text-5xl md:text-7xl text-gold-100 leading-none mb-8">
              Selected <br />
              <span className="text-gold-500 italic">Works</span>
            </h2>
            <p className="font-sans text-gold-100/60 max-w-sm text-sm leading-relaxed mb-8">
              Setiap pernikahan adalah kanvas kosong. Berikut adalah beberapa lukisan kenangan yang telah kami selesaikan dengan presisi.
            </p>
            <div className="flex items-center gap-2 text-gold-100/40 text-xs uppercase tracking-widest">
              <span>Scroll Down</span>
              <div className="h-[1px] w-12 bg-gold-100/20"></div>
            </div>
          </div>

          {/* 2. PORTFOLIO CARDS */}
          {PORTFOLIO_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className="group relative h-[60vh] w-[85vw] md:w-[45vw] bg-radeva-800 shrink-0 overflow-hidden cursor-pointer border border-gold-500/10"
            >
              {/* Image with Zoom Effect */}
              <div className="absolute inset-0 w-full h-full overflow-hidden">
                 {/* Placeholder Image akan diganti aset asli */}
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-radeva-900/20 group-hover:bg-radeva-900/0 transition-colors duration-500" />
              </div>

              {/* Overlay Content (Bottom) */}
              <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-radeva-900 via-radeva-900/60 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="block text-gold-400 text-xs uppercase tracking-widest mb-2">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-3xl text-gold-100">
                      {item.title}
                    </h3>
                    <p className="text-gold-100/60 text-sm mt-1">{item.location}</p>
                  </div>
                  
                  <div className="h-10 w-10 rounded-full border border-gold-500/30 flex items-center justify-center text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <ArrowUpRight size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* 3. OUTRO CARD (Call to Action) */}
          <div className="flex h-[60vh] w-[80vw] md:w-[30vw] flex-col justify-center items-center shrink-0 border-l border-gold-500/20 pl-12">
            <h3 className="font-serif text-4xl text-gold-100 mb-6 text-center">
              Siap menulis cerita Anda?
            </h3>
            <Link 
              href="https://wa.me/628123456789"
              className="px-8 py-4 bg-gold-500 text-radeva-900 font-sans text-xs tracking-widest uppercase hover:bg-gold-400 transition-colors"
            >
              Start Project
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
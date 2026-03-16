'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils'; // Kita butuh utility ini nanti, jika belum ada hapus import ini dan pakai string biasa

// Definisi Menu
const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Logic: Deteksi scroll > 50px
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
      // Gunakan cn() untuk menggabungkan class
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-500",
        // Logic style dipindah ke sini agar bersih
        isScrolled 
          ? "bg-radeva-900/85 backdrop-blur-md py-4 border-b border-gold-500/10" 
          : "bg-transparent py-8 border-transparent"
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="relative z-50">
            <span className={`font-serif text-2xl md:text-3xl font-bold tracking-wider transition-colors duration-300 ${isScrolled ? 'text-gold-400' : 'text-gold-100'}`}>
              RADEVA
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="font-sans text-xs uppercase tracking-[0.2em] text-gold-100/80 hover:text-gold-500 transition-colors duration-300"
              >
                {link.name}
              </Link>
            ))}
            
            {/* CTA Button Kecil di Navbar */}
            <Link 
              href="https://wa.me/628123456789" // Ganti no WA nanti
              className="px-6 py-2 border border-gold-500/50 text-gold-400 font-sans text-xs uppercase tracking-widest hover:bg-gold-500 hover:text-radeva-900 transition-all duration-300"
            >
              Consult
            </Link>
          </nav>

          {/* MOBILE MENU TRIGGER */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative z-50 text-gold-400"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.header>

      {/* MOBILE FULLSCREEN OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }} // Bezier curve mewah
            className="fixed inset-0 z-40 bg-radeva-900 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-serif text-4xl text-gold-100 hover:text-gold-500 transition-colors"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
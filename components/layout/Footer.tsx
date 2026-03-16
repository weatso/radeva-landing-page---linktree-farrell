import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-radeva-900 text-gold-100 border-t border-gold-500/20 pt-20 pb-10">
      
      {/* 1. Pre-Footer: Elegant CTA */}
      <div className="container mx-auto px-6 mb-20 text-center">
        <h3 className="font-serif text-3xl md:text-5xl mb-6">
          Start your <span className="italic text-gold-500">forever</span> with us.
        </h3>
        <p className="font-sans text-gold-100/60 mb-10 max-w-lg mx-auto font-light">
          Jadwalkan konsultasi privat untuk mendiskusikan visi pernikahan Anda. Tanpa komitmen.
        </p>
        <Link 
          href="https://wa.me/628123456789"
          className="inline-block px-10 py-4 border border-gold-500 text-gold-500 font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold-500 hover:text-radeva-900 transition-all duration-300"
        >
          Book Appointment
        </Link>
      </div>

      {/* 2. Main Footer Links */}
      <div className="container mx-auto px-6 border-t border-gold-500/10 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <span className="font-serif text-2xl font-bold tracking-wider text-gold-400 block mb-6">
              RADEVA
            </span>
            <p className="font-sans text-sm text-gold-100/60 leading-relaxed font-light">
              Premium Digital Wedding Invitation & Event Organizer. Based in Semarang, serving love stories worldwide.
            </p>
          </div>

          {/* Navigation Links - Menggunakan font Serif untuk kesan klasik */}
          <div>
            <h4 className="font-sans text-xs text-gold-500 uppercase tracking-widest mb-6">Menu</h4>
            <ul className="space-y-4 font-serif text-lg text-gold-100/80">
              <li><Link href="#home" className="hover:text-gold-500 transition-colors">Home</Link></li>
              <li><Link href="#about" className="hover:text-gold-500 transition-colors">About</Link></li>
              <li><Link href="#services" className="hover:text-gold-500 transition-colors">Services</Link></li>
              <li><Link href="#portfolio" className="hover:text-gold-500 transition-colors">Portfolio</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs text-gold-500 uppercase tracking-widest mb-6">Services</h4>
            <ul className="space-y-4 font-serif text-lg text-gold-100/80">
              <li><a href="#" className="hover:text-gold-500 transition-colors">Wedding Organizer</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Digital Invitation</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Live Streaming</a></li>
              <li><a href="#" className="hover:text-gold-500 transition-colors">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs text-gold-500 uppercase tracking-widest mb-6">Connect</h4>
            <ul className="space-y-4 font-sans text-sm text-gold-100/60 font-light">
              <li>Semarang, Central Java</li>
              <li>hello@radeva.id</li>
              <li>+62 812 3456 7890</li>
              <div className="flex gap-4 pt-4">
                <a href="#" className="text-gold-400 hover:text-white transition">IG</a>
                <a href="#" className="text-gold-400 hover:text-white transition">WA</a>
                <a href="#" className="text-gold-400 hover:text-white transition">TK</a>
              </div>
            </ul>
          </div>

        </div>
        
        {/* 3. Copyright */}
        <div className="mt-16 pt-8 border-t border-gold-500/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-sans text-gold-100/40 uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} Radeva Wedding. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold-500">Privacy</a>
            <a href="#" className="hover:text-gold-500">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
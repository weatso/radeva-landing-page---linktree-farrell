import React from 'react';
import { Star } from 'lucide-react';

const SocialProof = () => {
  return (
    <section className="py-24 bg-radeva-900 relative overflow-hidden">
      {/* Background decoration: Thin elegant borders instead of grid */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gold-500/5"></div>
         <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gold-500/5"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-sans text-xs tracking-[0.2em] text-gold-400 uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl text-gold-100 mb-6">
            Dipercaya oleh <span className="italic text-gold-500">Cinta</span> yang Elegan.
          </h2>
          <p className="font-sans text-gold-100/70 text-lg font-light">
            Kepercayaan adalah fondasi kami. Berikut adalah cerita dari mereka yang telah mewujudkan pernikahan impiannya bersama Radeva.
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Authority Stats */}
          <div className="col-span-1 md:col-span-2 bg-radeva-800 border border-gold-500/20 p-8 flex flex-col justify-center items-start group hover:border-gold-500/40 transition-colors duration-500">
            <span className="font-serif text-7xl text-gold-500 mb-2 group-hover:scale-105 transition-transform duration-500">500+</span>
            <p className="font-serif text-2xl text-gold-100">Wedding & Events</p>
            <p className="font-sans text-sm text-gold-100/60 mt-2 tracking-wide">
              Menangani momen sakral dengan presisi sejak 2024.
            </p>
          </div>

          {/* Card 2: Featured Review */}
          <div className="col-span-1 md:col-span-1 lg:col-span-2 bg-gradient-to-br from-radeva-800 to-radeva-900 border border-gold-500/20 p-8 flex flex-col justify-between relative">
            {/* Quote Icon Background */}
            <span className="absolute top-4 right-6 text-9xl font-serif text-gold-500/5 leading-none">"</span>
            
            <div className="mb-6 relative z-10">
              <div className="flex gap-1 mb-4 text-gold-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="font-serif text-xl md:text-2xl text-gold-100 leading-relaxed italic">
                "Undangan digitalnya sangat berkelas, bukan seperti template murahan. Tamu VIP kami merasa sangat dihargai."
              </p>
            </div>
            
            <div className="flex items-center gap-4 border-t border-gold-500/10 pt-6">
              <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-500/50"></div> {/* Placeholder Avatar */}
              <div>
                <p className="font-sans font-bold text-sm text-gold-400 tracking-wide uppercase">Sarah & Dimas</p>
                <p className="font-serif text-xs text-gold-100/50 italic">Hotel Tentrem, Semarang</p>
              </div>
            </div>
          </div>

          {/* Card 3: Partners / Minimalist Logos */}
          <div className="col-span-1 md:col-span-3 lg:col-span-4 bg-radeva-900 border-t border-b border-gold-500/10 py-12 px-8 mt-6">
            <p className="text-center font-sans text-xs text-gold-500/40 uppercase tracking-[0.3em] mb-8">
              Official Partners & Venues
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
               {/* Gunakan teks font serif sebagai placeholder logo agar tetap estetik */}
               <span className="font-serif text-2xl text-gold-100">Padma Hotel</span>
               <span className="font-serif text-2xl text-gold-100">Plataran</span>
               <span className="font-serif text-2xl text-gold-100">Gedong Songo</span>
               <span className="font-serif text-2xl text-gold-100">The Wujil</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default SocialProof;
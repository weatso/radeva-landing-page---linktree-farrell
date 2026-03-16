'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const SERVICES = [
  {
    id: "01",
    title: "Full Planning",
    description: "Layanan menyeluruh dari nol. Kami menangani konsep, vendor, budgeting, hingga eksekusi hari H. Cocok untuk pasangan sibuk yang menginginkan kesempurnaan tanpa stres.",
    link: "#"
  },
  {
    id: "02",
    title: "On The Day",
    description: "Anda yang merencanakan, kami yang mengeksekusi. Kami masuk 1 bulan sebelum acara untuk memastikan semua vendor bekerja harmonis sesuai rundown yang presisi.",
    link: "#"
  },
  {
    id: "03",
    title: "Intimate Wedding",
    description: "Spesialisasi kami dalam acara berskala kecil namun mendalam. Fokus pada detail personal, atmosfer hangat, dan pengalaman tamu yang tak terlupakan.",
    link: "#"
  }
];

export default function Services() {
  return (
    <section id="services" className="w-full bg-radeva-900 py-24 md:py-32 relative">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-6xl text-gold-100"
          >
            Our Curated <br />
            <span className="text-gold-500 italic">Services</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-sans text-gold-100/60 max-w-sm text-sm text-right md:text-left"
          >
            Setiap pasangan memiliki kebutuhan unik. Kami menyediakan fleksibilitas layanan dengan standar kualitas Radeva.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-gold-500/20">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative border-b md:border-b-0 md:border-r border-gold-500/20 p-8 md:p-12 transition-colors duration-500 hover:bg-radeva-800/50 cursor-pointer last:border-r-0 last:border-b"
            >
              {/* Number */}
              <span className="block font-serif text-5xl md:text-6xl text-gold-500/20 mb-8 group-hover:text-gold-500/40 transition-colors duration-500">
                {service.id}
              </span>

              {/* Content */}
              <h3 className="font-serif text-2xl md:text-3xl text-gold-100 mb-4 group-hover:text-gold-500 transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="font-sans text-gold-100/60 text-sm leading-relaxed mb-8 group-hover:text-gold-100/80 transition-colors duration-300">
                {service.description}
              </p>

              {/* Action Button (Hidden by default, show on hover) */}
              <div className="flex items-center gap-2 text-gold-400 group-hover:translate-x-2 transition-transform duration-300">
                <span className="text-xs uppercase tracking-widest font-sans">Details</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>

              {/* Border Hover Effect (Bottom Line Animation) */}
              <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gold-500 transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
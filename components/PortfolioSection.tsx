'use client'

import React, { useState } from 'react'
import { urlForImage } from '@/sanity/lib/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectCards } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-cards'

interface PortfolioSectionProps {
  links: any[]
  title?: string
  layout?: 'grid' | 'carousel'
  hoverEffect?: string
  buttonShape?: string
  animDelayBase?: number
}

export function PortfolioSection({ 
  links, 
  title = "Our Portofolio", 
  layout = 'grid',
  hoverEffect = '',
  buttonShape = '',
  animDelayBase = 1.2
}: PortfolioSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!links || links.length === 0) return null

  return (
    <div className="w-full mt-6">
      {title && (
        <h2 className="text-center font-bold text-lg mb-5 tracking-tight animate-stagger" style={{animationDelay: `${animDelayBase}s`}}>
          {title}
        </h2>
      )}
      
      {/* --- GRID LAYOUT --- */}
      {layout === 'grid' && (
        <div className="grid grid-cols-2 gap-4">
          {links.map((link: any, idx: number) => (
            <a 
              key={idx} 
              href={link.url || '#'} 
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative aspect-[4/5] overflow-hidden shadow-sm bg-black/10 block border border-white/20 animate-stagger ${hoverEffect} ${buttonShape}`} 
              style={{animationDelay: `${animDelayBase + 0.1 + (idx*0.1)}s`}}
            >
              {link.image && (
                <img 
                  src={urlForImage(link.image)?.url()} 
                  alt={link.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-3">
                <span className="block text-center text-white font-semibold text-sm drop-shadow">{link.title}</span>
              </div>
            </a>
          ))}
        </div>
      )}

      {/* --- CAROUSEL LAYOUT --- */}
      {layout === 'carousel' && (
        <div className="w-full animate-stagger relative" style={{animationDelay: `${animDelayBase + 0.1}s`}}>

          {/* Main Swiper — card stack effect */}
          <Swiper
            modules={[Pagination, Autoplay, EffectCards]}
            effect="cards"
            grabCursor={true}
            loop={true}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            observer={true}
            observeParents={true}
            onInit={(swiper) => {
              if (swiper.autoplay) {
                swiper.autoplay.start();
              }
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="portfolio-swiper"
          >
            {links.map((link: any, idx: number) => (
              <SwiperSlide key={idx} className="portfolio-slide">
                <a
                  href={link.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full h-full relative rounded-2xl overflow-hidden"
                >
                  {/* Image */}
                  {link.image && (
                    <img 
                      src={urlForImage(link.image)?.url()} 
                      alt={link.title} 
                      className="absolute inset-0 w-full h-full object-cover" 
                    />
                  )}

                  {/* Bottom gradient + title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 px-5 pb-5 pt-8">
                    <span className="block text-white font-bold text-base tracking-wide drop-shadow-lg">
                      {link.title}
                    </span>
                    {link.url && (
                      <span className="inline-flex items-center gap-1 mt-1.5 text-white/60 text-xs font-medium">
                        Lihat selengkapnya →
                      </span>
                    )}
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom dot indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {links.map((_, idx) => (
              <span
                key={idx}
                className="transition-all duration-300"
                style={{
                  display: 'inline-block',
                  width: idx === activeIndex ? '20px' : '6px',
                  height: '6px',
                  borderRadius: '9999px',
                  background: 'currentColor',
                  opacity: idx === activeIndex ? 1 : 0.3,
                }}
              />
            ))}
          </div>

          {/* Counter badge */}
          <p className="text-center mt-2 opacity-40 text-xs font-medium tabular-nums">
            {activeIndex + 1} / {links.length}
          </p>

          <style>{`
            .portfolio-swiper {
              width: 80%;
              padding-top: 12px;
              padding-bottom: 4px;
            }
            .portfolio-slide {
              aspect-ratio: 3/4;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 20px 60px -10px rgba(0,0,0,0.5);
            }
          `}</style>
        </div>
      )}
    </div>
  )
}

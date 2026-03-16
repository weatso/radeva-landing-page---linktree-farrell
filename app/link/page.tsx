import React from 'react'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { Mail, Instagram, MapPin, Youtube, Facebook, Twitter, Phone, SendHorizontal } from 'lucide-react'
import { Metadata } from 'next'
import { AudioPlayer, ParticlesEffect, BankAccountBox, LiveCountdown } from '@/components/LinktreeClientFeatures'

// --- SVG Icons ---
// Menerima hex color langsung dari color picker Sanity
const VerifiedBadge = ({ hexColor = '#3b82f6' }: { hexColor?: string }) => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" style={{ fill: hexColor }}>
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.78 8.06l-5.37 5.97a.996.996 0 0 1-1.46.04l-2.73-2.82a.996.996 0 0 1 1.44-1.39l2.02 2.08 4.67-5.18a.996.996 0 1 1 1.43 1.3z"/>
  </svg>
)

const TiktokIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.68a6.34 6.34 0 0 0 6.27 6.36 6.34 6.34 0 0 0 6.25-6.36V7.94a8.32 8.32 0 0 0 3.33.69V5.15a5.2 5.2 0 0 1-1.26-.05z" />
  </svg>
)

const SpotifyIcon = () => (
  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.6 14.4c-.2.3-.6.4-.9.2-2.3-1.4-5.3-1.7-8.8-.9-.3.1-.7-.1-.8-.4-.1-.3.1-.7.4-.8 3.8-.9 7.1-.5 9.7 1.1.2.1.3.5.2.8zm1.3-3c-.2.4-.7.5-1.1.3-2.7-1.6-6.7-2.1-9.9-1.1-.4.1-.9-.1-1-.6-.1-.5.1-.9.6-1.1 3.7-1.1 8.2-.6 11.4 1.3.4.2.5.7.3 1.1zm.1-3.2c-3.1-1.9-8.3-2.1-11.3-1.1-.6.2-1.2-.2-1.4-.7-.2-.6.2-1.2.7-1.4 3.5-1.1 9.4-1 13 1.2.5.3.7.9.4 1.4-.2.4-.9.6-1.4.3z"/>
  </svg>
)

const renderSocialIcon = (platform: string, url: string, idx: number) => {
  let IconCmp = null;
  switch (platform) {
    case 'email': IconCmp = <Mail className="w-5 h-5"/>; break;
    case 'instagram': IconCmp = <Instagram className="w-5 h-5"/>; break;
    case 'tiktok': IconCmp = <TiktokIcon />; break;
    case 'spotify': IconCmp = <SpotifyIcon />; break;
    case 'whatsapp': IconCmp = <Phone className="w-5 h-5"/>; break;
    case 'youtube': IconCmp = <Youtube className="w-5 h-5"/>; break;
    case 'facebook': IconCmp = <Facebook className="w-5 h-5"/>; break;
    case 'twitter': IconCmp = <Twitter className="w-5 h-5"/>; break;
    default: IconCmp = <Mail className="w-5 h-5"/>;
  }
  return (
    <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-black/5 hover:bg-black/10 rounded-full transition hover:-translate-y-1">
      {IconCmp}
    </a>
  )
}

export const revalidate = 10 

export async function generateMetadata(): Promise<Metadata> {
  const query = `*[_type == "linktreeSettings"][0]`
  const data = await client.fetch(query).catch(() => null)
  return {
    title: data?.seoTitle || 'Radeva Links',
    description: data?.seoDescription || 'Radeva Wedding Organizer Linktree',
  }
}

export default async function LinktreePage() {
  const query = `*[_type == "linktreeSettings"][0]{
    ...,
    backgroundVideo {
      asset->{
        url
      }
    },
    backgroundMusic {
      asset->{
        url
      }
    }
  }`
  const data = await client.fetch(query).catch(() => null)
  
  // Content values
  const profileName = data?.profileName || 'Radeva Wedding Organizer'
  const location = data?.location || 'Semarang & Jawa Tengah'
  const hideLocation = data?.hideLocation || false
  const heroText = data?.heroText || 'Hai #RekanRadeva! Let us be the part of your BIG DAY'
  const links = data?.links || []
  const socialLinks = data?.socialLinks || []
  const footerText = data?.footerText || 'Radeva Organizer'
  
  const profileImageUrl = data?.profileImage ? urlForImage(data.profileImage)?.url() : null
  const bgImgUrl = data?.backgroundImage ? urlForImage(data.backgroundImage)?.url() : null
  const bgVideoUrl = data?.backgroundVideo?.asset?.url || null
  const bgMusicUrl = data?.backgroundMusic?.asset?.url || null
  const particleEffectType = data?.particleEffect || 'none'
  const headerBannerUrl = data?.headerBanner ? urlForImage(data.headerBanner)?.url() : null
  
  const verifiedBadge = data?.verifiedBadge || false
  // Color picker object: { hex: '#rrggbb', ... }
  const verifiedBadgeColorHex = data?.verifiedBadgeColor?.hex || '#3b82f6'

  // Appearance values
  const themeColorHex: string | null = data?.themeColor?.hex || null
  const fontColorHex: string | null = data?.fontColor?.hex || null
  const fontFamily = data?.fontFamily || 'sans'
  const buttonStyleOpt = data?.buttonStyle || 'glass'
  const buttonShape = data?.buttonShape || 'rounded-full'
  const profileShape = data?.profileShape || 'rounded-full'
  const socialPosition = data?.socialPosition || 'top'
  const animStyle = data?.buttonHoverAnimation || 'scale'

  // Filtering
  const normalLinksAndWidgets = links.filter((l: any) => (l.type === 'link' || l.type === 'divider' || l.type === 'newsletter' || l.type === 'countdown' || l.type === 'bank') && l.isActive !== false)
  const portfolioLinks = links.filter((l: any) => l.type === 'portfolio' && l.isActive !== false)

  // Auto-contrast: hitung apakah bg terang/gelap dari hex warna
  const getContrastMode = (hex: string): 'light-bg' | 'dark-bg' => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return lum > 0.55 ? 'light-bg' : 'dark-bg'
  }

  // CSS mappings
  let themeBg = 'bg-zinc-100'
  let themeText = 'text-zinc-900'
  let themeInlineStyle: React.CSSProperties = {}
  let gradientOverlay = 'from-white/30 to-zinc-100/50'
  let cardBg = 'bg-white/50 border-white/60'
  let buttonSolidBg = 'bg-zinc-900 text-white hover:bg-zinc-800 border-transparent'

  if (themeColorHex) {
    // Gunakan inline style untuk warna bebas dari color picker
    themeBg = ''
    themeInlineStyle = { backgroundColor: themeColorHex }
    const contrast = getContrastMode(themeColorHex)
    if (contrast === 'dark-bg') {
      themeText = 'text-white'
      gradientOverlay = 'from-black/20 to-black/40'
      cardBg = 'bg-white/10 border-white/20'
      buttonSolidBg = 'bg-white text-gray-900 hover:bg-gray-100 border-transparent'
    } else {
      themeText = 'text-gray-900'
      gradientOverlay = 'from-white/20 to-white/40'
      cardBg = 'bg-white/50 border-gray-200/60'
      buttonSolidBg = 'bg-gray-900 text-white hover:bg-gray-800 border-transparent'
    }
  }

  // Jika user setting warna font secara spesifik, timpa warna otomatisnya
  if (fontColorHex) {
    themeText = '' // Kosongkan class agar tidak tabrakan dengan inline style
    themeInlineStyle = { ...themeInlineStyle, color: fontColorHex }
  }

  let fontClass = 'font-sans'
  if (fontFamily === 'serif') fontClass = 'font-serif'
  if (fontFamily === 'mono') fontClass = 'font-mono'

  let hoverEffect = 'hover:-translate-y-0.5 hover:shadow-md'
  if (animStyle === 'bounce') hoverEffect = 'hover:-translate-y-2 hover:shadow-lg active:translate-y-0'
  if (animStyle === 'pulse') hoverEffect = 'hover:scale-[1.03] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]'

  let buttonStyleClass = ''
  if (buttonStyleOpt === 'glass') {
    buttonStyleClass = `bg-white/20 hover:bg-white/30 backdrop-blur-md border-white/30 text-current`
  } else if (buttonStyleOpt === 'outline') {
    buttonStyleClass = `bg-transparent border-current hover:bg-current/5 text-current`
  } else {
    buttonStyleClass = `${buttonSolidBg}`
  }

  let buttonClassesBase = `group relative flex items-center justify-center w-full transition-all duration-300 shadow-sm p-[18px] border `
  buttonClassesBase += `${buttonShape} ${hoverEffect} ${buttonStyleClass}`

  return (
    <main
      className={`min-h-screen relative flex flex-col items-center overflow-x-hidden ${themeBg} ${themeText} ${fontClass} selection:bg-current selection:text-white`}
      style={themeInlineStyle}
    >
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUpLink {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-stagger {
          animation: fadeInUpLink 0.6s ease-out forwards;
          opacity: 0;
        }
      `}} />

      {bgMusicUrl && <AudioPlayer src={bgMusicUrl} />}
      <ParticlesEffect type={particleEffectType} />

      {/* Background Overlay */}
      {bgVideoUrl ? (
        <video 
          src={bgVideoUrl} 
          autoPlay 
          loop 
          muted 
          playsInline
          className="fixed inset-0 z-0 w-full h-full object-cover blur-[4px] opacity-40 scale-105"
        />
      ) : bgImgUrl && (
        <div 
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat blur-[6px] opacity-40 scale-105"
          style={{ backgroundImage: `url('${bgImgUrl}')` }}
        />
      )}
      <div className={`fixed inset-0 z-0 bg-gradient-to-b ${gradientOverlay}`} />

      {/* Main Content */}
      <div className="z-10 w-full max-w-[480px] min-h-screen bg-transparent flex flex-col items-center pb-12 relative">
        
        {/* Header Banner */}
        {headerBannerUrl && (
          <div className="w-full h-36 md:h-44 relative overflow-hidden shadow-sm mb-[-50px]">
            <img src={headerBannerUrl} alt="Cover" className="w-full h-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}

        <div className={`w-full px-6 flex flex-col items-center gap-6 ${headerBannerUrl ? 'mt-0' : 'pt-12'}`}>
          
          {/* Profile Header */}
          <div className="flex flex-col items-center gap-4 relative animate-stagger" style={{animationDelay: `0.1s`}}>
            <div className={`w-28 h-28 ${profileShape} overflow-hidden shadow-xl bg-black/10 flex items-center justify-center border-4 border-white/50 bg-clip-padding relative z-10`}>
              {profileImageUrl ? (
                 <img src={profileImageUrl} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                 <span className="text-4xl font-serif">R</span>
              )}
            </div>
            <div className="text-center px-4">
              <h1 className="text-[22px] font-bold tracking-tight text-center">
                 {profileName}
                 {verifiedBadge && (
                   <span className="inline-block align-middle ml-1.5" style={{ marginTop: '-3px' }}>
                     <VerifiedBadge hexColor={verifiedBadgeColorHex} />
                   </span>
                 )}
              </h1>
              {!hideLocation && (
                <div className="flex items-center justify-center gap-1.5 opacity-80 mt-1 text-[13.5px] font-medium">
                  <MapPin className="w-[14px] h-[14px]" />
                  <span>{location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Social Icons Mini (TOP) */}
          {socialPosition === 'top' && socialLinks.length > 0 && (
            <div className="flex items-center justify-center gap-4 mt-[-4px] animate-stagger" style={{animationDelay: `0.2s`}}>
               {socialLinks.map((sl: any, idx: number) => renderSocialIcon(sl.platform, sl.url, idx))}
            </div>
          )}

          {/* Hero Card */}
          {heroText && (
            <div className={`w-full backdrop-blur-md border px-6 py-5 rounded-2xl shadow-sm text-center animate-stagger ${cardBg}`} style={{animationDelay: `0.3s`}}>
              <p className="text-[14.5px] font-medium leading-relaxed opacity-90">
                {heroText}
              </p>
            </div>
          )}

          {/* Button Links & Dividers & Widgets */}
          <div className="w-full flex flex-col gap-4 mt-2">
            {normalLinksAndWidgets.map((link: any, idx: number) => {
              const animDelay = 0.35 + (idx * 0.1);

              if (link.type === 'divider') {
                return (
                  <div key={idx} className="w-full text-center mt-5 mb-1 animate-stagger" style={{animationDelay: `${animDelay}s`}}>
                    <h3 className="text-[13px] font-extrabold tracking-[0.2em] uppercase opacity-70">
                      {link.title}
                    </h3>
                  </div>
                )
              }

              if (link.type === 'countdown') {
                return (
                  <div key={idx} className="w-full animate-stagger" style={{animationDelay: `${animDelay}s`}}>
                    <LiveCountdown dateStr={link.countdownDate} title={link.countdownTitle} bgClass={cardBg} buttonShape={buttonShape} />
                  </div>
                )
              }

              if (link.type === 'bank') {
                return (
                  <div key={idx} className="w-full animate-stagger" style={{animationDelay: `${animDelay}s`}}>
                    <BankAccountBox 
                      bankName={link.bankName} 
                      accountName={link.bankAccountName} 
                      accountNumber={link.bankAccountNumber} 
                      bgClass={cardBg} 
                      buttonShape={buttonShape} 
                    />
                  </div>
                )
              }

              if (link.type === 'newsletter') {
                return (
                  <div key={idx} className={`w-full p-6 text-center shadow-sm relative overflow-hidden backdrop-blur-md animate-stagger ${cardBg} ${buttonShape}`} style={{animationDelay: `${animDelay}s`}}>
                    <h3 className="text-[15.5px] font-bold mb-2">{link.title || 'Subscribe Newsletter'}</h3>
                    <p className="text-[13px] opacity-80 mb-4">Dapatkan info promo spesial kami.</p>
                    <form className="flex gap-2">
                      <input type="email" placeholder="Email Anda..." className="flex-1 px-4 py-2.5 rounded-xl bg-black/10 text-current placeholder:text-current/50 outline-none border border-transparent focus:border-current/30 text-sm transition-colors" />
                      <button type="button" className={`px-4 py-2.5 rounded-xl font-bold text-sm flex items-center justify-center ${buttonSolidBg}`}>
                        <SendHorizontal className="w-4 h-4" />
                      </button>
                    </form>
                  </div>
                )
              }

              let currentBtnClass = buttonClassesBase;
              let highlightEl = null;

              if (link.isHighlighted) {
                 currentBtnClass += " ring-2 ring-current ring-offset-2 ring-offset-transparent animate-pulse"
                 highlightEl = <div className={`absolute -inset-0.5 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 opacity-30 blur z-[-1] ${buttonShape}`} />
              }

              let badgeColorClass = 'bg-red-500'
              if (link.badgeColor === 'hijau') badgeColorClass = 'bg-green-500'
              if (link.badgeColor === 'biru') badgeColorClass = 'bg-blue-500'
              if (link.badgeColor === 'kuning') badgeColorClass = 'bg-yellow-500'
              
              return (
                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className={`relative ${currentBtnClass} animate-stagger`} style={{animationDelay: `${animDelay}s`}}>
                  {highlightEl}
                  
                  {link.badgeText && (
                    <div className={`absolute -top-3 -right-2 px-2.5 py-[3px] rounded-md text-[10px] font-bold text-white shadow-sm z-10 animate-bounce ${badgeColorClass}`}>
                      {link.badgeText}
                    </div>
                  )}

                  {link.icon && (
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full overflow-hidden bg-black/5 p-2 flex items-center justify-center">
                      <img src={urlForImage(link.icon)?.url()} alt="icon" className="w-full h-full object-contain" />
                    </div>
                  )}
                  <span className="font-semibold text-[15px] tracking-wide relative px-10 text-center">{link.title}</span>
                </a>
              )
            })}
          </div>

          {/* Portfolio Grid Section */}
          {portfolioLinks.length > 0 && (
            <div className="w-full mt-6">
              <h2 className="text-center font-bold text-lg mb-5 tracking-tight animate-stagger" style={{animationDelay: `1.2s`}}>Our Portofolio</h2>
              <div className="grid grid-cols-2 gap-4">
                 {portfolioLinks.map((link: any, idx: number) => (
                    <a key={idx} href={link.url} className={`group relative aspect-[4/5] overflow-hidden shadow-sm bg-black/10 block border border-white/20 animate-stagger ${hoverEffect} ${buttonShape}`} style={{animationDelay: `${1.3 + (idx*0.1)}s`}}>
                      {link.icon && (
                         <img src={urlForImage(link.icon)?.url()} alt={link.title} className="absolute inset-0 w-full h-full object-cover" />
                      )}
                      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                        <span className="block text-center text-white/95 font-medium text-sm pt-8">{link.title}</span>
                      </div>
                    </a>
                 ))}
              </div>
            </div>
          )}

          {/* Social Icons Mini (BOTTOM) */}
          {socialPosition === 'bottom' && socialLinks.length > 0 && (
            <div className="flex items-center justify-center gap-4 mt-6 mb-2 animate-stagger" style={{animationDelay: `1.5s`}}>
               {socialLinks.map((sl: any, idx: number) => renderSocialIcon(sl.platform, sl.url, idx))}
            </div>
          )}

          {/* Footer Sponsor/Branding */}
          {footerText && (
            <footer className="mt-6 mb-4 text-center opacity-60 flex items-center justify-center gap-2 text-xs font-bold tracking-widest uppercase animate-stagger" style={{animationDelay: `1.6s`}}>
               <span>{footerText}</span>
            </footer>
          )}

        </div>
      </div>
    </main>
  )
}

'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Music, Pause, Copy, Check, CalendarHeart } from 'lucide-react'

// --- 1. Audio Player Widget (Floating) ---
export function AudioPlayer({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    let autoplayAttempted = false

    const attemptAutoplay = () => {
      if (audioRef.current && !autoplayAttempted) {
        autoplayAttempted = true
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {
          // Silently handle autoplay rejection to prevent console noise/overlays
        })
      }
    }

    attemptAutoplay()

    const handleInitialInteraction = () => {
      // Jika masih pause saat user berinteraksi, coba mainkan
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true)
        }).catch(() => {
          // Silently handle interaction play failure if any
        })
      }
    }
    
    document.addEventListener('click', handleInitialInteraction, { once: true })
    document.addEventListener('touchstart', handleInitialInteraction, { once: true })
    document.addEventListener('scroll', handleInitialInteraction, { once: true })
    
    return () => {
      document.removeEventListener('click', handleInitialInteraction)
      document.removeEventListener('touchstart', handleInitialInteraction)
      document.removeEventListener('scroll', handleInitialInteraction)
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop />
      <button 
        onClick={togglePlay}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 flex items-center justify-center 
        ${isPlaying ? 'bg-white/20 text-current animate-pulse' : 'bg-black/50 text-white hover:bg-black/70'}`}
      >
        {isPlaying ? (
           <Pause className="w-5 h-5" />
        ) : (
           <Music className="w-5 h-5 animate-bounce" />
        )}
      </button>
    </>
  )
}

// --- 2. Magical Particles ---
export function ParticlesEffect({ type }: { type: string }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted || type === 'none') return null
  
  const particlesCount = 20
  
  const particles = Array.from({ length: particlesCount }).map((_, i) => {
    const left = Math.random() * 100
    const delay = Math.random() * 5
    const duration = 5 + Math.random() * 10
    
    if (type === 'snow') {
      return (
        <div key={i} className="absolute rounded-full bg-white opacity-60 pointer-events-none" 
          style={{
            left: `${left}%`,
            top: `-10px`,
            width: `${Math.random() * 6 + 4}px`,
            height: `${Math.random() * 6 + 4}px`,
            animation: `snowFall ${duration}s linear infinite`,
            animationDelay: `${delay}s`
          }}
        />
      )
    }
    if (type === 'sakura') {
      return (
        <div key={i} className="absolute bg-pink-300 opacity-60 pointer-events-none" 
          style={{
            left: `${left}%`,
            top: `-10px`,
            width: `${Math.random() * 10 + 6}px`,
            height: `${Math.random() * 15 + 10}px`,
            borderRadius: '10px 0 10px 0',
            animation: `snowFall ${duration}s linear infinite, sakuraSpin ${duration/2}s linear infinite`,
            animationDelay: `${delay}s`
          }}
        />
      )
    }
    if (type === 'glow') {
      return (
        <div key={i} className="absolute rounded-full bg-yellow-400 opacity-40 blur-[2px] pointer-events-none flex items-center justify-center" 
          style={{
            left: `${left}%`,
            bottom: `-20px`,
            width: `${Math.random() * 8 + 4}px`,
            height: `${Math.random() * 8 + 4}px`,
            animation: `floatUp ${duration}s linear infinite`,
            animationDelay: `${delay}s`
          }}
        />
      )
    }
    return null
  })

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <style>{`
        @keyframes snowFall {
          0% { transform: translateY(-10px) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(110vh) translateX(20px); opacity: 0; }
        }
        @keyframes sakuraSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes floatUp {
          0% { transform: translateY(20px) scale(0.8); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-110vh) scale(1.2); opacity: 0; }
        }
      `}</style>
      {particles}
    </div>
  )
}

// --- 3. Digital Gift / Bank Account Box ---
export function BankAccountBox({ bankName, accountName, accountNumber, bgClass, buttonShape }: any) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`w-full p-6 shadow-sm border text-left relative overflow-hidden backdrop-blur-md transition-all group ${bgClass} ${buttonShape}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-[13px] font-extrabold tracking-wider uppercase opacity-80 mb-1">{bankName}</h3>
          <p className="font-semibold text-lg">{accountNumber}</p>
          <p className="text-[13px] opacity-70 mt-0.5">a.n {accountName}</p>
        </div>
        <button 
          onClick={copyToClipboard}
          className="p-2.5 rounded-full bg-black/5 hover:bg-black/10 active:scale-95 transition flex items-center justify-center text-current"
          title="Copy Number"
        >
          {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
        </button>
      </div>
    </div>
  )
}

// --- 4. Live Countdown Widget ---
export function LiveCountdown({ dateStr, title, bgClass, buttonShape }: any) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const targetDate = new Date(dateStr).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance < 0) {
        clearInterval(interval)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [dateStr])

  if (!mounted) return null

  return (
    <div className={`w-full py-6 px-4 shadow-sm border text-center relative overflow-hidden backdrop-blur-md ${bgClass} ${buttonShape}`}>
      <div className="flex items-center justify-center gap-2 mb-4 opacity-80">
        <CalendarHeart className="w-5 h-5" />
        <h3 className="text-[14px] font-bold tracking-wide">{title || 'Menuju Hari Bahagia'}</h3>
      </div>
      <div className="flex items-center justify-center gap-4">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-black">{timeLeft.days}</span>
          <span className="text-[10px] tracking-widest uppercase opacity-70">Hari</span>
        </div>
        <span className="text-2xl font-black opacity-50">:</span>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-black">{timeLeft.hours.toString().padStart(2, '0')}</span>
          <span className="text-[10px] tracking-widest uppercase opacity-70">Jam</span>
        </div>
        <span className="text-2xl font-black opacity-50">:</span>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-black">{timeLeft.minutes.toString().padStart(2, '0')}</span>
          <span className="text-[10px] tracking-widest uppercase opacity-70">Menit</span>
        </div>
        <span className="text-2xl font-black opacity-50">:</span>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-black">{timeLeft.seconds.toString().padStart(2, '0')}</span>
          <span className="text-[10px] tracking-widest uppercase opacity-70">Detik</span>
        </div>
      </div>
    </div>
  )
}

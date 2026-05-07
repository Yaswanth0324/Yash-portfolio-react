import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

const letters = 'AI CORE ACTIVATED'.split('')

export default function ActivationSequence({ onComplete }) {
  const containerRef = useRef(null)
  const lettersRef = useRef([])

  useEffect(() => {
    if (!containerRef.current) return

    const tl = gsap.timeline({
      onComplete: () => setTimeout(onComplete, 600),
    })

    // Shockwave flash
    tl.fromTo('.activation-flash',
      { opacity: 0 },
      { opacity: 1, duration: 0.1, yoyo: true, repeat: 5 }
    )

    // Letters animate in
    lettersRef.current.forEach((el, i) => {
      if (!el) return
      tl.fromTo(el,
        { opacity: 0, y: 40, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.08 },
        i * 0.04
      )
    })

    // Pulse glow
    tl.to('.activation-text', {
      textShadow: '0 0 40px #00f5ff, 0 0 80px #00f5ff, 0 0 120px #00f5ff',
      duration: 0.5,
      yoyo: true,
      repeat: 2,
    }, '-=0.3')

    // Fade out and scale
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 1.05,
      duration: 0.8,
      delay: 0.5,
    })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div ref={containerRef} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-dark-900">
      {/* Flash overlay */}
      <div className="activation-flash absolute inset-0 bg-neon-cyan/20 pointer-events-none" />

      {/* Radial burst */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, times: [0, 0.2, 1] }}
      >
        <div className="w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,245,255,0.3) 0%, rgba(191,95,255,0.1) 40%, transparent 70%)',
            boxShadow: '0 0 120px rgba(0,245,255,0.4)',
          }}
        />
      </motion.div>

      {/* Main text */}
      <div className="activation-text flex gap-0.5 flex-wrap justify-center px-4">
        {letters.map((char, i) => (
          <span
            key={i}
            ref={el => lettersRef.current[i] = el}
            className="font-orbitron font-black text-3xl md:text-5xl lg:text-7xl tracking-widest"
            style={{
              color: 'var(--neon-cyan)',
              display: char === ' ' ? 'inline-block' : 'inline-block',
              width: char === ' ' ? '1rem' : 'auto',
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </div>

      {/* Status line */}
      <motion.p
        className="font-mono text-sm text-neon-green mt-6 tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        ▶ SYSTEM ONLINE · ALL MODULES ACTIVE
      </motion.p>

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-px"
        initial={{ top: 0 }}
        animate={{ top: '100%' }}
        transition={{ duration: 1.2, ease: 'linear' }}
        style={{ background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)', boxShadow: '0 0 8px var(--neon-cyan)' }}
      />
    </div>
  )
}

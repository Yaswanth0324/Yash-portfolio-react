import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Eye, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import { getVisitorCount, getResumeDownloadCount, incrementResumeDownload, incrementVisitor } from '../../api/portfolio'

const TITLES = [
  'Java Full Stack Developer',
  'Software Developer',
  'Software Engineer',
  'Frontend Developer',
  'Web Developer',
  'Backend Developer',
  'AI Developer',
]

function useTypewriter(items, speed = 60, pause = 1800) {
  const [state, setState] = useState({ display: '', itemIndex: 0, charIndex: 0, deleting: false })

  useEffect(() => {
    const { display, itemIndex, charIndex, deleting } = state
    const current = items[itemIndex]
    let timeout

    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => setState(s => ({
        ...s, charIndex: s.charIndex + 1, display: current.slice(0, s.charIndex + 1)
      })), speed)
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setState(s => ({ ...s, deleting: true })), pause)
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => setState(s => ({
        ...s, charIndex: s.charIndex - 1, display: current.slice(0, s.charIndex - 1)
      })), speed / 2)
    } else if (deleting && charIndex === 0) {
      setState(s => ({ display: '', itemIndex: (s.itemIndex + 1) % items.length, charIndex: 0, deleting: false }))
    }

    return () => clearTimeout(timeout)
  }, [state, items, speed, pause])

  return state.display
}

const socials = [
  { icon: GithubIcon, href: 'https://github.com/Yaswanth0324', label: 'GitHub', color: 'currentColor' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/yaswanth-sde/', label: 'LinkedIn', color: '#0077B5' },
  { icon: Mail, href: 'mailto:yash95632@gmail.com', label: 'Email', color: '#00f5ff' },
]

export default function Hero() {
  const [stats, setStats] = useState({ visitors: 0, downloads: 0 })
  const typeText = useTypewriter(TITLES)

  useEffect(() => {
    let cancelled = false

    const loadStats = async () => {
      const visitResult = await incrementVisitor()
      const [visitors, downloads] = await Promise.all([
        visitResult?.count ?? getVisitorCount(),
        getResumeDownloadCount(),
      ])

      if (!cancelled) {
        setStats({
          visitors: Number.isFinite(visitors) ? visitors : 0,
          downloads: Number.isFinite(downloads) ? downloads : 0,
        })
      }
    }

    loadStats().catch(() => {
      if (!cancelled) {
        setStats({ visitors: 0, downloads: 0 })
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  const handleResumeDownload = async () => {
    const result = await incrementResumeDownload().catch(() => null)
    if (result?.count != null) {
      setStats(prev => ({ ...prev, downloads: result.count }))
    }
    const a = document.createElement('a')
    a.href = '/Yash-Resume.pdf'
    a.download = 'Yash-Resume.pdf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 cyber-bg" />
      <div className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,245,255,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Floating orbs */}
      {[
        { size: 300, x: '10%', y: '20%', color: '#00f5ff', delay: 0 },
        { size: 200, x: '80%', y: '60%', color: '#bf5fff', delay: 1 },
        { size: 150, x: '60%', y: '10%', color: '#ff2d78', delay: 2 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          animate={{ y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6 + i, repeat: Infinity, delay: orb.delay }}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color}22 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
        />
      ))}

      <div className="section-container relative z-10 py-32 text-center">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 border border-neon-green/20"
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--neon-green)', boxShadow: '0 0 6px var(--neon-green)' }} />
          <span className="font-mono text-xs text-neon-green tracking-widest">AVAILABLE FOR OPPORTUNITIES</span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-orbitron font-black text-5xl md:text-7xl lg:text-8xl mb-4 leading-none"
        >
          <span className="block text-white/20 text-sm font-mono tracking-[0.5em] mb-4">DEVELOPER PROFILE</span>
          <span className="gradient-text">Yaswanth</span>
            <span className="text-white/80"> T</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="font-inter text-lg md:text-2xl mb-8 h-8"
        >
          <span style={{ color: 'var(--neon-cyan)' }}>{typeText}</span>
          <span className="inline-block w-0.5 h-5 ml-0.5 align-middle animate-blink" style={{ background: 'var(--neon-cyan)' }} />
        </motion.div>

        {/* Bio line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-white/40 font-inter text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Crafting futuristic, scalable full-stack applications with React, Java Spring Boot, and cloud-native architectures.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="neon-btn flex items-center gap-2 px-8 py-3.5 rounded-xl font-orbitron text-sm font-semibold tracking-wider"
            style={{
              background: 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(191,95,255,0.15))',
              border: '1px solid rgba(0,245,255,0.4)',
              color: 'var(--neon-cyan)',
              boxShadow: '0 0 20px rgba(0,245,255,0.15)',
            }}
          >
            <Eye size={16} />
            VIEW MY WORK
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleResumeDownload}
            className="neon-btn flex items-center gap-2 px-8 py-3.5 rounded-xl font-orbitron text-sm font-semibold tracking-wider"
            style={{
              background: 'linear-gradient(135deg, rgba(57,255,20,0.15), rgba(0,128,255,0.15))',
              border: '1px solid rgba(57,255,20,0.4)',
              color: 'var(--neon-green)',
              boxShadow: '0 0 20px rgba(57,255,20,0.1)',
            }}
          >
            <Download size={16} />
            DOWNLOAD RESUME
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="flex items-center justify-center gap-8 mb-12"
        >
          {[
            { label: 'Visitors', value: stats.visitors, color: 'var(--neon-cyan)', icon: '👁' },
            { label: 'Downloads', value: stats.downloads, color: 'var(--neon-green)', icon: '⬇' },
            { label: 'Projects', value: 3, color: 'var(--neon-purple)', icon: '🚀' },
          ].map(({ label, value, color, icon }) => (
            <div key={label} className="text-center">
              <div className="font-orbitron font-bold text-2xl md:text-3xl" style={{ color }}>
                {value}+
              </div>
              <div className="font-mono text-[10px] text-white/40 tracking-widest mt-0.5">{icon} {label.toUpperCase()}</div>
            </div>
          ))}
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex items-center justify-center gap-4"
        >
          {socials.map(({ icon: Icon, href, label, color }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.2, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl glass"
              style={{ border: `1px solid ${color}22` }}
            >
              <Icon size={18} color={color} />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="font-mono text-[9px] text-white/30 tracking-widest">SCROLL TO EXPLORE</span>
        <div className="w-px h-8" style={{ background: 'linear-gradient(180deg, var(--neon-cyan), transparent)' }} />
      </motion.div>
    </section>
  )
}

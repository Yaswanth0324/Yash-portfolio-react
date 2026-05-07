import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ParticleField from './ParticleField'
import HolographicRings from './HolographicRings'
import EnergyNodes from './EnergyNodes'
import ActivationSequence from './ActivationSequence'

const BOOT_MESSAGES = [
  { text: '> INITIALIZING QUANTUM CORE...', delay: 200 },
  { text: '> LOADING NEURAL MATRICES...', delay: 700 },
  { text: '> SCANNING DEVELOPER PROFILE...', delay: 1200 },
  { text: '> COMPILING SKILL MODULES...', delay: 1700 },
  { text: '> AI CORE STATUS: OFFLINE', delay: 2200, color: '#ff2d78' },
  { text: '> MANUAL ACTIVATION REQUIRED', delay: 2700, color: '#ffd700' },
  { text: '> CLICK ALL SKILL NODES TO PROCEED', delay: 3200, color: '#00f5ff' },
]

function BootText({ onComplete }) {
  const [visibleLines, setVisibleLines] = useState([])

  useEffect(() => {
    const timers = []
    BOOT_MESSAGES.forEach(({ text, delay, color }) => {
      timers.push(setTimeout(() => {
        setVisibleLines(prev => [...prev, { text, color }])
      }, delay))
    })
    const done = setTimeout(onComplete, 3800)
    return () => { timers.forEach(clearTimeout); clearTimeout(done) }
  }, [onComplete])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute left-0 right-0 h-8"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(0,245,255,0.03), transparent)' }}
          animate={{ top: ['-5%', '105%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <motion.div className="mb-8 text-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
        <div className="font-orbitron font-black text-5xl md:text-7xl tracking-widest gradient-text glow-cyan mb-2">Portfolio</div>
        <div className="font-mono text-xs text-white/40 tracking-[0.5em]">DEVELOPER INTERFACE v2.0</div>
      </motion.div>

      <motion.div
        className="glass rounded-xl p-6 w-full max-w-md mx-4"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        style={{ border: '1px solid rgba(0,245,255,0.2)' }}
      >
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'var(--neon-green)' }} />
          <span className="font-mono text-[10px] text-white/30 ml-2">SYSTEM BOOT</span>
        </div>
        <div className="space-y-1.5 min-h-[140px]">
          <AnimatePresence>
            {visibleLines.map((line, i) => (
              <motion.div
                key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                className="font-mono text-xs md:text-sm tracking-wide"
                style={{ color: line.color || '#4ade80' }}
              >
                {line.text}
                {i === visibleLines.length - 1 && (
                  <span className="inline-block w-2 h-3 ml-1 align-middle bg-current animate-blink" />
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

export default function PortfolioIntro({ onComplete }) {
  const [stage, setStage] = useState('boot')
  const [nodesActivated, setNodesActivated] = useState(false)

  return (
    <div className="fixed inset-0 z-[200] overflow-hidden" style={{ background: 'var(--dark-900)' }}>
      <div className="absolute inset-0 cyber-bg opacity-40" />

      {/* Corner decorations */}
      {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-8 h-8`}>
          <div className="absolute top-0 left-0 w-4 h-px" style={{ background: 'var(--neon-cyan)' }} />
          <div className="absolute top-0 left-0 w-px h-4" style={{ background: 'var(--neon-cyan)' }} />
        </div>
      ))}

      <ParticleField count={60} color="#00f5ff" />

      {/* Canvas 2D holographic rings — crash-safe */}
      <HolographicRings activated={nodesActivated} progress={stage === 'interactive' ? 50 : nodesActivated ? 100 : 0} />

      <AnimatePresence mode="wait">
        {stage === 'boot' && (
          <motion.div key="boot" className="absolute inset-0" exit={{ opacity: 0, y: -20 }}>
            <BootText onComplete={() => setStage('interactive')} />
          </motion.div>
        )}

        {stage === 'interactive' && (
          <motion.div key="interactive" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute top-6 left-0 right-0 text-center z-20 pointer-events-none">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="font-mono text-xs text-white/50 tracking-widest">
                ACTIVATION SEQUENCE INITIATED
              </motion.div>
              <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="font-orbitron font-bold text-lg text-white/80 mt-1">
                TAP SKILL NODES TO ACTIVATE CORE
              </motion.h2>
            </div>
            <EnergyNodes onAllActivated={() => { setNodesActivated(true); setTimeout(() => setStage('activating'), 500) }} />
          </motion.div>
        )}

        {stage === 'activating' && (
          <ActivationSequence key="activating" onComplete={onComplete} />
        )}
      </AnimatePresence>

      {/* Skip button */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        onClick={onComplete}
        className="fixed top-5 right-5 z-[300] font-mono text-xs text-white/40 hover:text-neon-cyan transition-colors tracking-widest border border-white/10 hover:border-neon-cyan/40 px-3 py-1.5 rounded glass"
        id="skip-intro-btn"
      >
        SKIP INTRO ▶
      </motion.button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[9px] text-white/20 tracking-[0.3em] z-20">
        PORTFOLIO · DEVELOPER INTERFACE · 2026
      </div>
    </div>
  )
}

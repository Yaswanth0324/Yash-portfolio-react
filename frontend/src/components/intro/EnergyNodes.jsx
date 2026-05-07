import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NODES = [
  { id: 'react', label: 'React.js', color: '#61DAFB', icon: '⚛', angle: 0 },
  { id: 'js', label: 'JavaScript', color: '#F7DF1E', icon: '⚡', angle: 51.4 },
  { id: 'java', label: 'Java', color: '#FF6B35', icon: '☕', angle: 102.8 },
  { id: 'spring', label: 'Spring Boot', color: '#6DB33F', icon: '🌱', angle: 154.2 },
  { id: 'mysql', label: 'MySQL', color: '#00758F', icon: '🗄', angle: 205.7 },
  { id: 'docker', label: 'Docker', color: '#2496ED', icon: '🐳', angle: 257.1 },
  { id: 'aws', label: 'AWS', color: '#FF9900', icon: '☁', angle: 308.5 },
]

const RADIUS = 180

function Node({ node, isActivated, onClick, centerX, centerY }) {
  const rad = (node.angle * Math.PI) / 180
  const x = centerX + RADIUS * Math.cos(rad)
  const y = centerY + RADIUS * Math.sin(rad)

  return (
    <motion.div
      className="absolute flex flex-col items-center gap-1 cursor-pointer select-none"
      style={{
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: node.angle / 360, type: 'spring', stiffness: 200 }}
      onClick={() => !isActivated && onClick(node.id)}
      whileHover={!isActivated ? { scale: 1.15 } : {}}
      whileTap={!isActivated ? { scale: 0.9 } : {}}
    >
      {/* Node orb */}
      <motion.div
        className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl relative"
        animate={isActivated ? {
          boxShadow: [`0 0 20px ${node.color}, 0 0 40px ${node.color}`, `0 0 40px ${node.color}, 0 0 80px ${node.color}`, `0 0 20px ${node.color}, 0 0 40px ${node.color}`],
        } : {
          boxShadow: [`0 0 8px ${node.color}44`, `0 0 16px ${node.color}66`, `0 0 8px ${node.color}44`],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          background: isActivated
            ? `radial-gradient(circle, ${node.color}33, ${node.color}11)`
            : `radial-gradient(circle, ${node.color}11, transparent)`,
          border: `2px solid ${node.color}${isActivated ? 'ff' : '66'}`,
        }}
      >
        <span className="text-xl">{node.icon}</span>

        {/* Activated ring */}
        <AnimatePresence>
          {isActivated && (
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{ border: `2px solid ${node.color}`, zIndex: -1 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Label */}
      <span
        className="text-[9px] md:text-[10px] font-mono font-medium tracking-wider whitespace-nowrap"
        style={{ color: isActivated ? node.color : `${node.color}99` }}
      >
        {node.label}
      </span>
    </motion.div>
  )
}

export default function EnergyNodes({ onAllActivated }) {
  const [activated, setActivated] = useState(new Set())

  const handleClick = useCallback((id) => {
    setActivated(prev => {
      const next = new Set(prev)
      next.add(id)
      if (next.size === NODES.length) {
        setTimeout(() => onAllActivated(), 800)
      }
      return next
    })
  }, [onAllActivated])

  const progress = (activated.size / NODES.length) * 100
  const cx = 'calc(50%)'
  const cy = 'calc(50%)'

  return (
    <div className="relative w-full h-full">
      {/* SVG connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
        {NODES.map((node, i) => {
          if (!activated.has(node.id)) return null
          const rad = (node.angle * Math.PI) / 180
          const x = 50 + (RADIUS / window.innerWidth * 100) * Math.cos(rad)
          const y = 50 + (RADIUS / window.innerHeight * 100) * Math.sin(rad)
          return (
            <motion.line
              key={node.id}
              x1="50%" y1="50%"
              x2={`${x}%`} y2={`${y}%`}
              stroke={node.color}
              strokeWidth="1"
              strokeOpacity="0.6"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{ filter: `drop-shadow(0 0 4px ${node.color})` }}
            />
          )
        })}
      </svg>

      {/* Nodes */}
      {NODES.map(node => (
        <Node
          key={node.id}
          node={node}
          isActivated={activated.has(node.id)}
          onClick={handleClick}
          centerX={typeof window !== 'undefined' ? window.innerWidth / 2 : 400}
          centerY={typeof window !== 'undefined' ? window.innerHeight / 2 : 300}
        />
      ))}

      {/* Progress bar */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 z-20">
        <div className="flex justify-between text-xs font-mono text-white/50 mb-2">
          <span>ACTIVATION PROGRESS</span>
          <span style={{ color: 'var(--neon-cyan)' }}>{activated.size}/{NODES.length}</span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 100 }}
            style={{ background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-purple))', boxShadow: '0 0 8px var(--neon-cyan)' }}
          />
        </div>
        <p className="text-center text-[10px] font-mono text-white/30 mt-2 tracking-widest">
          {activated.size === 0 ? 'TAP SKILL NODES TO ACTIVATE' :
           activated.size < NODES.length ? `${NODES.length - activated.size} MODULES REMAINING` :
           'ALL MODULES ONLINE'}
        </p>
      </div>
    </div>
  )
}

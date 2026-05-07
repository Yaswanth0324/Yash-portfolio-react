import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[9990] bg-white/5">
      <motion.div
        className="h-full"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--neon-cyan), var(--neon-purple), var(--neon-pink))',
          boxShadow: '0 0 8px var(--neon-cyan)',
        }}
        transition={{ ease: 'linear', duration: 0 }}
      />
    </div>
  )
}

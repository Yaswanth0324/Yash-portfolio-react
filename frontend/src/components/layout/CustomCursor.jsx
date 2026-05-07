import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const raf = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const animate = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.12
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px)`
      }
      raf.current = requestAnimationFrame(animate)
    }

    const onDown = () => {
      if (ringRef.current) ringRef.current.style.transform += ' scale(0.8)'
      if (dotRef.current) dotRef.current.style.transform += ' scale(2)'
    }
    const onUp = () => {
      if (dotRef.current) dotRef.current.style.transform = dotRef.current.style.transform.replace(' scale(2)', '')
    }

    const onEnterLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '50px'
        ringRef.current.style.height = '50px'
        ringRef.current.style.borderColor = 'var(--neon-purple)'
        ringRef.current.style.background = 'rgba(191,95,255,0.1)'
      }
    }
    const onLeaveLink = () => {
      if (ringRef.current) {
        ringRef.current.style.width = '40px'
        ringRef.current.style.height = '40px'
        ringRef.current.style.borderColor = 'var(--neon-cyan)'
        ringRef.current.style.background = 'transparent'
      }
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    raf.current = requestAnimationFrame(animate)

    // Enhance cursor on interactive elements
    const addHover = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    }
    addHover()
    const observer = new MutationObserver(addHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf.current)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="custom-cursor hidden md:block">
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          background: 'var(--neon-cyan)',
          boxShadow: '0 0 6px var(--neon-cyan), 0 0 12px var(--neon-cyan)',
          transition: 'none',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[9998]"
        style={{
          border: '1.5px solid var(--neon-cyan)',
          boxShadow: '0 0 8px var(--neon-cyan)',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, background 0.2s',
        }}
      />
    </div>
  )
}

import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

// Pure CSS/canvas holographic rings — NO WebGL, crash-safe
export default function HolographicRings({ activated = false, progress = 0 }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = (canvas.width = canvas.offsetWidth)
    let H = (canvas.height = canvas.offsetHeight)
    let t = 0

    const rings = [
      { rx: W * 0.35, ry: W * 0.12, tilt: 0.3, speed: 0.4, color: activated ? '#00f5ff' : '#003344', w: 1.5 },
      { rx: W * 0.26, ry: W * 0.09, tilt: -0.6, speed: -0.6, color: activated ? '#bf5fff' : '#220044', w: 2 },
      { rx: W * 0.18, ry: W * 0.06, tilt: 0.8, speed: 1.0, color: activated ? '#39ff14' : '#002200', w: 2.5 },
      { rx: W * 0.44, ry: W * 0.14, tilt: -0.3, speed: 0.2, color: `hsl(${progress * 1.2},100%,60%)`, w: 1 },
    ]

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const cx = W / 2
      const cy = H / 2

      rings.forEach(r => {
        const angle = t * r.speed
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(r.tilt)

        // Draw ellipse as approximated orbit ring
        ctx.beginPath()
        ctx.ellipse(0, 0, r.rx, r.ry, 0, 0, Math.PI * 2)
        const glow = activated ? 3 : 1
        ctx.strokeStyle = r.color
        ctx.lineWidth = r.w
        ctx.shadowColor = r.color
        ctx.shadowBlur = 8 * glow
        ctx.globalAlpha = activated ? 0.7 : 0.35
        ctx.stroke()

        // Travelling dot on ring
        const dotX = r.rx * Math.cos(angle)
        const dotY = r.ry * Math.sin(angle)
        ctx.beginPath()
        ctx.arc(dotX, dotY, 3, 0, Math.PI * 2)
        ctx.fillStyle = r.color
        ctx.globalAlpha = 1
        ctx.shadowBlur = 12
        ctx.fill()

        ctx.restore()
      })

      // Central core glow
      const coreR = activated ? 30 + Math.sin(t * 4) * 8 : 18 + Math.sin(t * 2) * 3
      const grad = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, coreR)
      grad.addColorStop(0, activated ? 'rgba(0,245,255,0.8)' : 'rgba(0,100,150,0.5)')
      grad.addColorStop(0.4, activated ? 'rgba(0,245,255,0.3)' : 'rgba(0,50,80,0.2)')
      grad.addColorStop(1, 'transparent')
      ctx.beginPath()
      ctx.arc(W / 2, H / 2, coreR, 0, Math.PI * 2)
      ctx.fillStyle = grad
      ctx.shadowColor = activated ? '#00f5ff' : '#004466'
      ctx.shadowBlur = activated ? 20 : 8
      ctx.globalAlpha = 1
      ctx.fill()

      t += 0.016
      rafRef.current = requestAnimationFrame(draw)
    }

    const onResize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onResize)
    draw()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [activated, progress])

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

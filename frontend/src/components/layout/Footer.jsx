import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

const socials = [
  { icon: GithubIcon, href: 'https://github.com/Yaswanth0324', label: 'GitHub' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/yaswanth-sde/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:yash95632@gmail.com', label: 'Email' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-dark-900 py-12 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 cyber-bg opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, var(--neon-cyan), var(--neon-purple), transparent)' }} />

      <div className="section-container relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <div className="font-orbitron font-bold text-xl gradient-text mb-1">YASWANTH</div>
            <p className="font-mono text-xs text-white/40">Full-Stack Developer Portfolio</p>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-lg glass border border-white/10 text-white/50 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all duration-300"
                style={{ '--neon-cyan': '#00f5ff' }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-xs text-white/30 font-mono">
            <p>© 2026 Dev Portfolio</p>
            <p className="mt-1">Built with <span className="text-neon-pink">♥</span> & React</p>
          </div>
        </div>

        {/* Bottom glow line */}
        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
            System Status: <span style={{ color: 'var(--neon-green)' }}>Online</span> DEVELOPER: <span style={{ color: 'var(--neon-cyan)' }}>Activated</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

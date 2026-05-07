import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Send, Mail, User, MessageSquare } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'
import toast, { Toaster } from 'react-hot-toast'
import { submitContact } from '../../api/portfolio'

const socials = [
  { icon: GithubIcon, label: 'GitHub', href: 'https://github.com/', color: '#fff' },
  { icon: LinkedinIcon, label: 'LinkedIn', href: 'https://linkedin.com/', color: '#0077B5' },
  { icon: Mail, label: 'Email', href: 'mailto:developer@email.com', color: '#00f5ff' },
]

function FloatingInput({ id, label, icon: Icon, type = 'text', rows, value, onChange, required }) {
  const [focused, setFocused] = useState(false)
  const hasValue = value && value.length > 0

  const inputClass = `
    w-full bg-transparent font-inter text-sm text-white/80 outline-none
    pt-6 pb-2 px-4 resize-none
  `

  return (
    <div className="relative group">
      <div className={`relative glass rounded-xl overflow-hidden transition-all duration-300 ${
        focused ? 'border-neon-cyan/50 shadow-neon-cyan/20 shadow-lg' : 'border-white/10'
      }`}
        style={{ border: `1px solid ${focused ? 'rgba(0,245,255,0.4)' : 'rgba(255,255,255,0.08)'}` }}>
        
        {/* Label */}
        <label
          htmlFor={id}
          className="absolute left-4 transition-all duration-200 pointer-events-none font-inter text-white/40"
          style={{
            top: focused || hasValue ? '8px' : rows ? '16px' : '50%',
            transform: focused || hasValue ? 'none' : rows ? 'none' : 'translateY(-50%)',
            fontSize: focused || hasValue ? '10px' : '13px',
            color: focused ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.4)',
            letterSpacing: focused || hasValue ? '0.1em' : '0',
          }}
        >
          {label}
        </label>

        {/* Icon */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <Icon size={14} color={focused ? 'var(--neon-cyan)' : 'rgba(255,255,255,0.2)'} />
        </div>

        {rows ? (
          <textarea
            id={id}
            rows={rows}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required={required}
            className={inputClass}
            style={{ paddingTop: '24px' }}
          />
        ) : (
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            required={required}
            className={inputClass + ' h-14'}
          />
        )}

        {/* Bottom glow line on focus */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-px"
          animate={{ scaleX: focused ? 1 : 0 }}
          style={{ background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)', transformOrigin: 'center' }}
        />
      </div>
    </div>
  )
}

export default function Contact() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields.')
      return
    }
    setLoading(true)
    try {
      await submitContact(form)
      toast.success('Message transmitted! I\'ll respond soon.', {
        style: {
          background: '#040d14',
          border: '1px solid rgba(57,255,20,0.4)',
          color: '#39ff14',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '13px',
        },
        iconTheme: { primary: '#39ff14', secondary: '#040d14' },
      })
      setForm({ name: '', email: '', message: '' })
    } catch {
      toast.error('Transmission failed. Try again.', {
        style: {
          background: '#040d14',
          border: '1px solid rgba(255,45,120,0.4)',
          color: '#ff2d78',
          fontFamily: 'JetBrains Mono, monospace',
        },
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" ref={ref} className="relative py-24 overflow-hidden">
      <Toaster position="top-right" />
      <div className="absolute inset-0 cyber-bg opacity-20" />
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,245,255,0.05) 0%, transparent 70%)' }} />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-neon-cyan/60 tracking-[0.4em] uppercase">Connect</span>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mt-2">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <div className="w-24 h-px mx-auto mt-4"
            style={{ background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)' }} />
          <p className="text-white/40 font-inter text-sm mt-4 max-w-md mx-auto">
            Ready to build something futuristic together? Send a transmission.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Info side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="flex flex-col justify-center gap-6"
          >
            <div>
              <h3 className="font-orbitron font-bold text-white text-xl mb-2">Let's Collaborate</h3>
              <p className="text-white/40 font-inter text-sm leading-relaxed">
                I'm open to internships, full-time roles, freelance projects, and exciting collaborations. 
                Let's build something amazing.
              </p>
            </div>

            {/* Contact info */}
            <div className="space-y-3">
              {[
                { icon: Mail, label: 'developer@email.com', color: 'var(--neon-cyan)' },
              ].map(({ icon: Icon, label, color }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg glass flex items-center justify-center"
                    style={{ border: `1px solid ${color}33` }}>
                    <Icon size={14} color={color} />
                  </div>
                  <span className="font-mono text-sm text-white/50">{label}</span>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div>
              <p className="font-mono text-xs text-white/30 tracking-widest mb-3">SOCIAL LINKS</p>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, href, label, color }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="p-3 rounded-xl glass"
                    style={{ border: `1px solid ${color}33` }}
                    aria-label={label}
                  >
                    <Icon size={16} color={color} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <FloatingInput id="contact-name" label="YOUR NAME" icon={User}
                value={form.name} onChange={handleChange('name')} required />
              <FloatingInput id="contact-email" label="EMAIL ADDRESS" icon={Mail} type="email"
                value={form.email} onChange={handleChange('email')} required />
              <FloatingInput id="contact-message" label="MESSAGE" icon={MessageSquare} rows={5}
                value={form.message} onChange={handleChange('message')} required />

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02, y: -2 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className="w-full neon-btn flex items-center justify-center gap-2 py-4 rounded-xl font-orbitron font-semibold text-sm tracking-widest transition-all duration-300"
                style={{
                  background: loading
                    ? 'rgba(0,245,255,0.05)'
                    : 'linear-gradient(135deg, rgba(0,245,255,0.15), rgba(191,95,255,0.15))',
                  border: '1px solid rgba(0,245,255,0.4)',
                  color: 'var(--neon-cyan)',
                  boxShadow: loading ? 'none' : '0 0 20px rgba(0,245,255,0.15)',
                }}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-neon-cyan/20 border-t-neon-cyan rounded-full animate-spin" />
                    TRANSMITTING...
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    SEND TRANSMISSION
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

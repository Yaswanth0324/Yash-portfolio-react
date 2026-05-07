import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const certifications = [
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2024',
    icon: '☁',
    color: '#FF9900',
    badge: 'CLF-C02',
  },
  {
    title: 'Java SE 11 Developer',
    issuer: 'Oracle',
    year: '2023',
    icon: '☕',
    color: '#FF6B35',
    badge: 'OCA',
  },
  {
    title: 'Spring Professional',
    issuer: 'VMware / Spring',
    year: '2024',
    icon: '🌱',
    color: '#6DB33F',
    badge: 'SPRING',
  },
  {
    title: 'React Developer Certified',
    issuer: 'Meta / Coursera',
    year: '2023',
    icon: '⚛',
    color: '#61DAFB',
    badge: 'REACT',
  },
  {
    title: 'Docker Fundamentals',
    issuer: 'Docker Inc.',
    year: '2024',
    icon: '🐳',
    color: '#2496ED',
    badge: 'DOCKER',
  },
  {
    title: 'Full Stack Web Dev',
    issuer: 'Coursera / Johns Hopkins',
    year: '2023',
    icon: '🚀',
    color: '#bf5fff',
    badge: 'FS-DEV',
  },
]

function CertCard({ cert, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass rounded-xl p-6 group relative overflow-hidden"
      style={{ border: `1px solid ${cert.color}22` }}
    >
      {/* Shimmer sweep */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(135deg, transparent 0%, ${cert.color}08 50%, transparent 100%)` }} />

      {/* Badge */}
      <div className="absolute top-3 right-3 font-mono text-[9px] px-2 py-0.5 rounded"
        style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}33`, color: cert.color }}>
        {cert.badge}
      </div>

      {/* Icon */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
        style={{
          background: `radial-gradient(circle, ${cert.color}22, ${cert.color}08)`,
          border: `1px solid ${cert.color}33`,
          boxShadow: `0 0 16px ${cert.color}22`,
        }}>
        {cert.icon}
      </div>

      <h3 className="font-orbitron font-bold text-white text-sm mb-1 pr-10">{cert.title}</h3>
      <p className="font-inter text-xs text-white/40 mb-1">{cert.issuer}</p>
      <p className="font-mono text-xs" style={{ color: cert.color }}>{cert.year}</p>

      {/* Bottom glow line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
        style={{ background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)` }}
      />
    </motion.div>
  )
}

export default function Certifications() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="certifications" ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-bg opacity-20" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,153,0,0.06) 0%, transparent 70%)' }} />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-neon-gold/60 tracking-[0.4em] uppercase">Achievements</span>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mt-2">
            <span className="gradient-text-gold">Certifications</span>
          </h2>
          <div className="w-24 h-px mx-auto mt-4"
            style={{ background: 'linear-gradient(90deg, transparent, var(--neon-gold), transparent)' }} />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

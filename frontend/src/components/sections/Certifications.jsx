import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink } from 'lucide-react'

const certifications = [
  {
    title: 'Software Engineer Intern Certification',
    issuer: 'HackerRank',
    date: 'Feb 2026',
    credentialId: 'B42809F5F0F0',
    color: '#39ff14',
    icon: '🏅',
    link: 'https://www.hackerrank.com/certificates/b42809f5f0f0',
  },
  {
    title: 'IBM Z Datathon 2025',
    issuer: 'IBM',
    date: '2025',
    credentialId: null,
    color: '#00f5ff',
    icon: '🧠',
    link: 'https://drive.google.com/file/d/1Jhb9DBEF2dAofiLOWqgS0sQbZmEKGFbk/view?usp=sharing',
  },
  {
    title: '5-Day AI Agents Intensive Course with Google',
    issuer: 'Kaggle & Google',
    date: '2026',
    credentialId: null,
    color: '#bf5fff',
    icon: '🤖',
    link: 'https://drive.google.com/file/d/1HN6AeDXByWQmXtLd-qbeutu81OZVn08z/view?usp=sharing',
  },
  {
    title: 'SQL and Relational Databases 101',
    issuer: 'IBM & Cognitive Class',
    date: 'Mar 2025',
    credentialId: null,
    color: '#FF9900',
    icon: '🗄️',
    link: 'https://drive.google.com/file/d/14MkvKefexa4a9_dWSnXP1aGnemG8_r4X/view?usp=sharing',
  },
  {
    title: 'Programming with JavaScript',
    issuer: 'Meta & Coursera',
    date: 'May 2025',
    credentialId: null,
    color: '#ffd700',
    icon: '⚡',
    link: 'https://drive.google.com/file/d/1tyfKX68ZpT1Mx2VOeZVLXLaFPZni3teW/view?usp=sharing',
  },
]

function CertCard({ cert, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative glass rounded-2xl p-5 overflow-hidden flex flex-col gap-3"
      style={{ border: `1px solid ${cert.color}22` }}
    >
      {/* Animated top border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          background: `linear-gradient(90deg, transparent, ${cert.color}, transparent)`,
          backgroundSize: '200% 100%',
        }}
      />

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${cert.color}12 0%, transparent 70%)` }}
      />

      <div className="relative z-10 flex items-start justify-between gap-3">
        {/* Icon + text */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `${cert.color}18`, border: `1.5px solid ${cert.color}44` }}
          >
            {cert.icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-orbitron font-bold text-white text-sm leading-snug">{cert.title}</h3>
            <p className="font-inter text-white/50 text-xs mt-1">{cert.issuer}</p>
          </div>
        </div>

        {/* View link */}
        <motion.a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          title="View Certificate"
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/15 transition-colors flex-shrink-0"
          style={{ border: `1px solid ${cert.color}33` }}
        >
          <ExternalLink size={13} color={cert.color} />
        </motion.a>
      </div>

      {/* Bottom row: date + credential */}
      <div className="relative z-10 flex items-center justify-between gap-2 flex-wrap">
        <span
          className="font-mono text-[10px] px-2 py-0.5 rounded-full tracking-widest"
          style={{ background: `${cert.color}15`, border: `1px solid ${cert.color}33`, color: cert.color }}
        >
          {cert.date}
        </span>
        {cert.credentialId && (
          <span className="font-mono text-[10px] text-white/30 tracking-wide">
            ID: {cert.credentialId}
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function Certifications() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="certifications" ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-bg opacity-20" />
      <div
        className="absolute left-0 top-1/3 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(57,255,20,0.04) 0%, transparent 70%)' }}
      />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-neon-green/60 tracking-[0.4em] uppercase">Achievements</span>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mt-2">
            Certifi<span className="gradient-text">cations</span>
          </h2>
          <div
            className="w-24 h-px mx-auto mt-4"
            style={{ background: 'linear-gradient(90deg, transparent, var(--neon-green), transparent)' }}
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {certifications.map((cert, i) => (
            <CertCard key={i} cert={cert} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

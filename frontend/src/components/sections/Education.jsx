import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const educations = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Mohan Babu University, Tirupati',
    duration: '2024 – 2026',
    type: "Master's Degree",
    color: '#bf5fff',
    icon: '🎓',
    score: 'CGPA: 9.2 (3 Sems)',
  },
  {
    degree: 'B.Sc (M.P.CS)',
    institution: 'S V Arts College, Tirupati',
    duration: '2021 – 2024',
    type: 'Bachelor Degree',
    color: '#39ff14',
    icon: '📚',
    score: 'Percentage: 78%',
  },
  {
    degree: 'Intermediate',
    institution: 'Sri Venkateswara Junior College, Madakasira',
    duration: '2019 – 2021',
    type: 'Intermediate',
    color: '#00f5ff',
    icon: '🏫',
    score: 'Marks: 947',
  },
  {
    degree: 'S.S.C (10th Class)',
    institution: 'Z.P.H.S. School, M Rayapuram',
    duration: '2018 – 2019',
    type: 'Secondary School',
    color: '#ffd700',
    icon: '🏆',
    score: 'CGPA: 9.5',
  },
]

function EducationCard({ edu, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -4 }}
      className="group relative glass rounded-2xl p-6 overflow-hidden"
      style={{ border: `1px solid ${edu.color}22` }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${edu.color}10 0%, transparent 70%)` }}
      />

      {/* Animated top border */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{
          background: `linear-gradient(90deg, transparent, ${edu.color}, transparent)`,
          backgroundSize: '200% 100%',
        }}
      />

      <div className="relative z-10 flex items-start gap-4">
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
          style={{
            background: `${edu.color}18`,
            border: `2px solid ${edu.color}55`,
            boxShadow: `0 0 14px ${edu.color}33`,
          }}
        >
          {edu.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
            <div>
              <h3 className="font-orbitron font-bold text-white text-base leading-tight">{edu.degree}</h3>
              <p className="font-inter text-white/50 text-sm mt-0.5">{edu.institution}</p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-1 flex-shrink-0">
              <span
                className="font-mono text-[10px] px-2 py-0.5 rounded-full tracking-widest whitespace-nowrap"
                style={{ background: `${edu.color}15`, border: `1px solid ${edu.color}33`, color: edu.color }}
              >
                {edu.type.toUpperCase()}
              </span>
              <span className="font-mono text-xs text-white/30">{edu.duration}</span>
            </div>
          </div>

          {/* Score badge */}
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-xs mt-1"
            style={{ background: `${edu.color}15`, border: `1px solid ${edu.color}33`, color: edu.color }}
          >
            ⭐ {edu.score}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Education() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="education" ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-bg opacity-20" />
      <div
        className="absolute right-0 top-1/3 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(191,95,255,0.06) 0%, transparent 70%)' }}
      />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-neon-purple/60 tracking-[0.4em] uppercase">Academic</span>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mt-2">
            My <span className="gradient-text">Education</span>
          </h2>
          <div
            className="w-24 h-px mx-auto mt-4"
            style={{ background: 'linear-gradient(90deg, transparent, var(--neon-purple), transparent)' }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {educations.map((edu, i) => (
            <EducationCard key={i} edu={edu} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

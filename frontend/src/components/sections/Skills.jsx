import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const skillGroups = [
  {
    category: 'Frontend',
    color: '#61DAFB',
    skills: [
      { name: 'React.js', level: 90, icon: '⚛' },
      { name: 'JavaScript', level: 88, icon: '⚡' },
      { name: 'Tailwind CSS', level: 85, icon: '🎨' },
    ],
  },
  {
    category: 'Backend',
    color: '#6DB33F',
    skills: [
      { name: 'Java', level: 85, icon: '☕' },
      { name: 'Spring Boot', level: 82, icon: '🌱' },
      { name: 'Hibernate', level: 78, icon: '🗃' },
      { name: 'REST APIs', level: 90, icon: '🔗' },
    ],
  },
  {
    category: 'Database',
    color: '#00758F',
    skills: [
      { name: 'MySQL', level: 83, icon: '🗄' },
    ],
  },
  {
    category: 'DevOps & Cloud',
    color: '#FF9900',
    skills: [
      { name: 'Docker', level: 72, icon: '🐳' },
      { name: 'AWS', level: 68, icon: '☁' },
      { name: 'Git', level: 88, icon: '🌿' },
    ],
  },
]

function SkillCard({ skill, color, delay, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6, scale: 1.03 }}
      className="glass rounded-xl p-4 group relative overflow-hidden"
      style={{ border: `1px solid ${color}22` }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
        style={{ background: `radial-gradient(circle at 50% 50%, ${color}11 0%, transparent 70%)` }} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{skill.icon}</span>
            <span className="font-inter font-medium text-white/80 text-sm">{skill.name}</span>
          </div>
          <span className="font-mono text-xs" style={{ color }}>{skill.level}%</span>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1.2, delay: delay + 0.3, ease: 'easeOut' }}
            style={{ background: `linear-gradient(90deg, ${color}88, ${color})`, boxShadow: `0 0 8px ${color}66` }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="skills" ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-bg opacity-20" />
      <div className="absolute left-0 top-1/4 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)' }} />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-neon-cyan/60 tracking-[0.4em] uppercase">Arsenal</span>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mt-2">
            Tech <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-px mx-auto mt-4"
            style={{ background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)' }} />
        </motion.div>

        <div className="space-y-10">
          {skillGroups.map((group, gi) => (
            <div key={group.category}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: gi * 0.15 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-2 h-2 rounded-full" style={{ background: group.color, boxShadow: `0 0 8px ${group.color}` }} />
                <span className="font-mono text-xs tracking-widest" style={{ color: group.color }}>
                  {group.category.toUpperCase()}
                </span>
                <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${group.color}44, transparent)` }} />
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {group.skills.map((skill, si) => (
                  <SkillCard
                    key={skill.name}
                    skill={skill}
                    color={group.color}
                    delay={gi * 0.1 + si * 0.08}
                    inView={inView}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

// Using devicons via CDN for real tech icons
const SKILLS = [
  // Programming Languages
  { name: 'Java',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',             category: 'Programming Languages' },
  { name: 'JavaScript',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', category: 'Programming Languages' },
  { name: 'Python',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',         category: 'Programming Languages' },

  // Frontend
  { name: 'HTML5',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',           category: 'Frontend' },
  { name: 'CSS3',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',             category: 'Frontend' },
  { name: 'React',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',           category: 'Frontend' },
  { name: 'Tailwind CSS',icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', category: 'Frontend' },
  { name: 'Bootstrap',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',   category: 'Frontend' },

  // Backend
  { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg',         category: 'Backend' },
  { name: 'REST APIs',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',       category: 'Backend' },
  { name: 'Hibernate',   icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/hibernate/hibernate-original.svg',   category: 'Backend' },

  // Database
  { name: 'MySQL',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',           category: 'Database' },
  { name: 'PostgreSQL',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', category: 'Database' },
  { name: 'MongoDB',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',       category: 'Database' },

  // DevOps & Tools
  { name: 'Docker',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',         category: 'DevOps & Tools' },
  { name: 'Git',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',               category: 'DevOps & Tools' },
  { name: 'GitHub',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',         category: 'DevOps & Tools' },
  { name: 'AWS',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', category: 'DevOps & Tools' },
  { name: 'Eclipse',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/eclipse/eclipse-original.svg',       category: 'DevOps & Tools' },
  { name: 'VS Code',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',         category: 'DevOps & Tools' },
]

const CATEGORIES = ['Programming Languages', 'Frontend', 'Backend', 'Database', 'DevOps & Tools']

const CATEGORY_COLORS = {
  'Programming Languages': 'var(--neon-pink)',
  'Frontend':              'var(--neon-cyan)',
  'Backend':               'var(--neon-green)',
  'Database':              '#00758F',
  'DevOps & Tools':        'var(--neon-purple)',
}

function SkillCard({ skill, color, delay, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -8, scale: 1.06 }}
      className="glass rounded-xl p-5 flex flex-col items-center gap-3 group relative overflow-hidden cursor-default"
      style={{ border: `1px solid ${color}22` }}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
        style={{ background: `radial-gradient(circle at 50% 50%, ${color}18 0%, transparent 70%)` }} />

      <div className="relative z-10 flex flex-col items-center gap-2">
        <div className="w-12 h-12 flex items-center justify-center">
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-10 h-10 object-contain drop-shadow-lg"
            style={{ filter: 'drop-shadow(0 0 6px rgba(0,245,255,0.25))' }}
          />
        </div>
        <span className="font-inter font-semibold text-white/80 text-xs text-center leading-tight">
          {skill.name}
        </span>
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
        {/* Header */}
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

        {/* Skills grouped by category */}
        <div className="space-y-10">
          {CATEGORIES.map((cat, gi) => {
            const skills = SKILLS.filter(s => s.category === cat)
            const color = CATEGORY_COLORS[cat]
            return (
              <div key={cat}>
                {/* Category label */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: gi * 0.1 }}
                  className="flex items-center gap-3 mb-5"
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
                  <span className="font-mono text-xs tracking-widest" style={{ color }}>
                    {cat.toUpperCase()}
                  </span>
                  <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${color}44, transparent)` }} />
                </motion.div>

                {/* Skill cards grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                  {skills.map((skill, si) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      color={color}
                      delay={gi * 0.08 + si * 0.06}
                      inView={inView}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

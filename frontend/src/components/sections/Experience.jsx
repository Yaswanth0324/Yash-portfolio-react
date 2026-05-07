import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const experiences = [
  {
    role: 'Software Developer Intern',
    company: 'Tech Company Name',
    duration: 'Jan 2024 – Jun 2024',
    type: 'Internship',
    color: '#00f5ff',
    icon: '💼',
    highlights: [
      'Developed RESTful APIs with Spring Boot for the core platform',
      'Built interactive React dashboards with real-time data visualization',
      'Integrated MySQL with Hibernate ORM for efficient data management',
      'Collaborated in Agile sprints, code reviews, and CI/CD pipelines',
      'Improved API response time by 35% through query optimization',
    ],
    tech: ['Java', 'Spring Boot', 'React.js', 'MySQL', 'Git'],
  },
  {
    role: 'MCA — Full-Stack Development',
    company: 'University / Institution Name',
    duration: '2022 – 2024',
    type: 'Education',
    color: '#bf5fff',
    icon: '🎓',
    highlights: [
      'Mastered full-stack development with Java, Spring Boot & React',
      'Built multiple real-world projects including Blood Bank Management System',
      'Specialized in software engineering, databases, and cloud computing',
      'Achieved strong academic performance with project distinction',
    ],
    tech: ['Java', 'React.js', 'Spring Boot', 'MySQL', 'Python'],
  },
  {
    role: 'BCA — Computer Applications',
    company: 'University / Institution Name',
    duration: '2019 – 2022',
    type: 'Education',
    color: '#39ff14',
    icon: '📚',
    highlights: [
      'Foundation in computer science, data structures & algorithms',
      'Developed programming skills in Java, C++, and Python',
      'Completed projects in web development and database management',
    ],
    tech: ['Java', 'C++', 'Python', 'HTML', 'CSS'],
  },
]

function TimelineItem({ exp, index, inView }) {
  const isLeft = index % 2 === 0

  return (
    <div className={`relative flex items-start gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Connector dot */}
      <div className="hidden md:flex flex-col items-center" style={{ minWidth: '48px' }}>
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.2, type: 'spring' }}
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg relative z-10"
          style={{
            background: `radial-gradient(circle, ${exp.color}33, ${exp.color}11)`,
            border: `2px solid ${exp.color}`,
            boxShadow: `0 0 16px ${exp.color}44`,
          }}
        >
          {exp.icon}
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: index * 0.2 }}
        className="flex-1 glass rounded-xl p-6 mb-8 group relative overflow-hidden"
        style={{ border: `1px solid ${exp.color}22` }}
      >
        {/* Hover glow */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
          style={{ background: `radial-gradient(circle at 50% 0%, ${exp.color}08 0%, transparent 70%)` }} />

        {/* Type badge */}
        <span className="inline-block font-mono text-[10px] px-2 py-0.5 rounded-full mb-3 tracking-widest"
          style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}33`, color: exp.color }}>
          {exp.type.toUpperCase()}
        </span>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
          <div>
            <h3 className="font-orbitron font-bold text-white text-lg">{exp.role}</h3>
            <p className="font-inter text-white/50 text-sm mt-0.5">{exp.company}</p>
          </div>
          <span className="font-mono text-xs text-white/30 whitespace-nowrap mt-1">{exp.duration}</span>
        </div>

        <ul className="space-y-2 mb-4">
          {exp.highlights.map((h, i) => (
            <li key={i} className="flex items-start gap-2 text-white/50 font-inter text-sm">
              <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.color }} />
              {h}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {exp.tech.map(t => (
            <span key={t} className="font-mono text-[10px] px-2 py-1 rounded-md"
              style={{ background: `${exp.color}10`, border: `1px solid ${exp.color}25`, color: `${exp.color}cc` }}>
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default function Experience() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="experience" ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-bg opacity-20" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-neon-cyan/60 tracking-[0.4em] uppercase">Journey</span>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mt-2">
            Experience & <span className="gradient-text">Education</span>
          </h2>
          <div className="w-24 h-px mx-auto mt-4"
            style={{ background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)' }} />
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Center line */}
          <div className="hidden md:block absolute left-6 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(180deg, var(--neon-cyan), var(--neon-purple), var(--neon-green))' }} />

          {experiences.map((exp, i) => (
            <TimelineItem key={i} exp={exp} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const experiences = [
  {
    role: 'Software Developer Intern',
    company: 'TAP ACADEMY',
    duration: 'DEC 2025 – Ongoing',
    type: 'Onsite Internship',
    color: '#00f5ff',
    icon: '💼',
    highlights: [
      'Developed scalable full-stack web applications using Java, Spring Boot, React, and MySQL',
      'Designed and implemented RESTful APIs with secure authentication and database integration',
      'Built responsive and user-friendly frontend interfaces using React, JavaScript, and Tailwind CSS',
      'Worked with Hibernate ORM and MySQL for efficient data handling and backend optimization',
      'Collaborated in Agile development, debugging, testing, and code review processes',
    ],
    tech: ['Java', 'Spring Boot', 'Hibernate ORM', 'React.js', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'Problem-Solving & Data Structures'],
  },
  {
    role: 'Web Developer Intern',
    company: 'ApexPlanet Software Pvt. Ltd.',
    duration: 'Jun 2025 – Jul 2025',
    type: 'Remote Internship',
    color: '#ff6b6b',
    icon: '🌐',
    highlights: [
      'Developed responsive and interactive web applications using HTML, CSS, and JavaScript',
      'Built modern user interfaces with a focus on usability, responsiveness, and clean design',
      'Implemented cross-browser compatibility and optimized web pages for better performance',
      'Worked on real-world frontend projects to strengthen problem-solving and development skills',
      'Collaborated on debugging, testing, and improving overall user experience',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Web Design', 'DOM Manipulation', 'Git', 'Frontend Development', 'Bootstrap'],
  },
]

function ExperienceCard({ exp, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ y: -4 }}
      className="group relative glass rounded-2xl p-6 overflow-hidden"
      style={{ border: `1px solid ${exp.color}22` }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 0%, ${exp.color}10 0%, transparent 70%)` }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: `${exp.color}18`, border: `2px solid ${exp.color}55`, boxShadow: `0 0 12px ${exp.color}33` }}
          >
            {exp.icon}
          </div>
          <div>
            <h3 className="font-orbitron font-bold text-white text-base leading-tight">{exp.role}</h3>
            <p className="font-inter text-white/50 text-sm mt-0.5">{exp.company}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 flex-shrink-0">
          <span
            className="font-mono text-[10px] px-2 py-0.5 rounded-full tracking-widest"
            style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}33`, color: exp.color }}
          >
            {exp.type.toUpperCase()}
          </span>
          <span className="font-mono text-xs text-white/30">{exp.duration}</span>
        </div>
      </div>

      {/* Highlights */}
      <ul className="space-y-2 mb-4">
        {exp.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2 text-white/50 font-inter text-sm">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: exp.color }} />
            {h}
          </li>
        ))}
      </ul>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2">
        {exp.tech.map(t => (
          <span
            key={t}
            className="font-mono text-[10px] px-2 py-1 rounded-md"
            style={{ background: `${exp.color}10`, border: `1px solid ${exp.color}25`, color: `${exp.color}cc` }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
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
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div
            className="w-24 h-px mx-auto mt-4"
            style={{ background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)' }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

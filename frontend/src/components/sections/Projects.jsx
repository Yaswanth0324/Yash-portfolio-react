import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Eye, Code2 } from 'lucide-react'

const projects = [
  {
    id: 'bloodbank',
    title: 'Smart Blood Bank Management System — LifeFlow',
    description: 'A full-stack smart blood bank management platform that connects hospitals, blood banks, and donors through real-time emergency coordination, cross blood compatibility matching, ML-based demand prediction, and secure role-based management.',
    tech: ['React.js', 'Spring Boot', 'MySQL/TiDB', 'Python FastAPI', 'JWT', 'Docker', 'SMTP'],
    features: [
      '🩸 Emergency blood request system with cross blood compatibility matching',
      '🔔 Real-time email notifications for donors and blood banks during emergencies',
      '🤖 ML-based blood demand prediction and demand level classification',
      '🏥 Secure role-based dashboards for Admin, Hospital, Blood Bank, and Donor',
    ],
    gradient: 'from-red-500/20 to-pink-500/10',
    borderColor: '#ff2d78',
    icon: '🩸',
    github: 'https://github.com/Yaswanth0324/Blood-Bank-Management-System',
    demo: 'https://drive.google.com/file/d/1aUVhYL4MSRuEgS7ZnYs5ujApKe75fhde/view?usp=drive_link',
  },
  {
    id: 'nlp-lab',
    title: 'NLP Virtual Lab',
    description: 'A web-based learning platform where users can explore and practice Natural Language Processing concepts through interactive experiments and AI-powered tools.',
    tech: ['Python', 'Flask', 'NLTK', 'PostgreSQL', 'JavaScript'],
    features: [
      '🧪 14 Interactive Labs: Hands-on modules from basic text cleaning to advanced AI translation',
      '🤖 AI Learning Assistant: Built-in smart chatbot that explains complex NLP topics',
      '📈 Visual Data Results: Charts and tree diagrams that visualize text processing',
      '📝 Knowledge Quizzes: Practice tests pulling fresh questions from a live database',
    ],
    gradient: 'from-green-500/20 to-teal-500/10',
    borderColor: '#39ff14',
    icon: '🧪',
    github: 'https://github.com/Yaswanth0324/NLP-Virtual-Lab',
    demo: 'https://nlp-virtual-lab.onrender.com/',
  },
  {
    id: 'taskmaster',
    title: 'TaskMaster',
    description: 'A full-stack task management application with AI voice-based reminders, real-time task tracking, secure profile management, and progress monitoring using React, Node.js, MySQL, and MongoDB.',
    tech: ['React.js', 'JavaScript', 'Bootstrap', 'Node.js', 'Express.js', 'MySQL', 'MongoDB'],
    features: [
      '✅ Create, manage, and delete tasks with due dates and smart reminders',
      '🗣️ AI voice-based reminder notifications for scheduled tasks',
      '👤 User profile management with image upload and MongoDB storage',
      '📊 Real-time task progress tracking dashboard with completion analytics',
    ],
    gradient: 'from-cyan-500/20 to-blue-500/10',
    borderColor: '#00f5ff',
    icon: '✅',
    github: 'https://github.com/Yaswanth0324/Task-Master1',
    demo: 'https://task-master1-sooty.vercel.app/',
  },
]

function ProjectCard({ project, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 10 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className="group relative glass rounded-2xl overflow-hidden"
      style={{ border: `1px solid ${project.borderColor}22` }}
    >
      {/* Hover overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 0%, ${project.borderColor}15 0%, transparent 60%)` }} />

      {/* Animated border top */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 3, repeat: Infinity }}
        style={{ background: `linear-gradient(90deg, transparent, ${project.borderColor}, transparent)`, backgroundSize: '200% 100%' }}
      />

      {/* Card header */}
      <div className={`relative p-6 bg-gradient-to-br ${project.gradient}`}>
        <div className="flex items-start justify-between">
          <div className="text-4xl mb-3">{project.icon}</div>
          <div className="flex gap-2">
            {/* Demo / Live button — Eye icon */}
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              title="Live Demo"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              style={{ border: `1px solid ${project.borderColor}55` }}
            >
              <Eye size={16} color={project.borderColor} />
            </motion.a>
            {/* GitHub button — Code icon */}
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              title="GitHub"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              style={{ border: `1px solid ${project.borderColor}55` }}
            >
              <Code2 size={16} color={project.borderColor} />
            </motion.a>
          </div>
        </div>
        <h3 className="font-orbitron font-bold text-white text-lg leading-tight mb-2">
          {project.title}
        </h3>
      </div>

      {/* Card body */}
      <div className="p-6">
        <p className="text-white/50 font-inter text-sm leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Features */}
        <div className="space-y-1.5 mb-5">
          {project.features.map((f, i) => (
            <div key={i} className="font-inter text-xs text-white/40 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: project.borderColor }} />
              {f}
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => (
            <span key={t} className="font-mono text-[10px] px-2 py-1 rounded-md"
              style={{ background: `${project.borderColor}15`, border: `1px solid ${project.borderColor}33`, color: project.borderColor }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="projects" ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-bg opacity-20" />
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgba(191,95,255,0.05) 0%, transparent 70%)' }} />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-neon-purple/60 tracking-[0.4em] uppercase">Portfolio</span>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mt-2">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-24 h-px mx-auto mt-4"
            style={{ background: 'linear-gradient(90deg, transparent, var(--neon-purple), transparent)' }} />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

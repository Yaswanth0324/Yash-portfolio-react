import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const stats = [
  { label: 'Projects', value: 3, suffix: '+' },
  { label: 'Technologies', value: 15, suffix: '+' },
  { label: 'Months Exp.', value: 6, suffix: '+' },
  { label: 'Commits', value: 500, suffix: '+' },
]

const highlights = [
  { icon: '🎓', text: 'MCA Graduate — Master of Computer Applications' },
  { icon: '💼', text: 'Software Developer Intern Experience' },
  { icon: '⚡', text: 'Full-Stack React + Java Spring Boot Developer' },
  { icon: '☁', text: 'Cloud-Native & DevOps Enthusiast (AWS, Docker)' },
  { icon: '🚀', text: 'Passionate about scalable, production-grade apps' },
]

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })

  return (
    <section id="about" ref={ref} className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 cyber-bg opacity-30" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(191,95,255,0.08) 0%, transparent 70%)' }} />

      <div className="section-container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-xs text-neon-cyan/60 tracking-[0.4em] uppercase">Profile</span>
          <h2 className="font-orbitron font-bold text-4xl md:text-5xl text-white mt-2">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-24 h-px mx-auto mt-4"
            style={{ background: 'linear-gradient(90deg, transparent, var(--neon-cyan), transparent)' }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Avatar / Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative">
              {/* Rotating rings */}
              {[140, 110, 80].map((size, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 m-auto rounded-full border"
                  style={{
                    width: size + '%',
                    height: size + '%',
                    top: `${(100 - size) / 2}%`,
                    left: `${(100 - size) / 2}%`,
                    borderColor: ['var(--neon-cyan)', 'var(--neon-purple)', 'var(--neon-pink)'][i],
                    opacity: 0.3,
                  }}
                  animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                  transition={{ duration: 8 + i * 4, repeat: Infinity, ease: 'linear' }}
                />
              ))}

              {/* Avatar circle */}
              <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden"
                style={{ border: '2px solid rgba(0,245,255,0.4)', boxShadow: '0 0 30px rgba(0,245,255,0.2)' }}>
                <img
                  src="/Yaswanth.png"
                  alt="Yaswanth T"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 glass px-3 py-2 rounded-lg"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                style={{ border: '1px solid rgba(57,255,20,0.3)' }}
              >
                <div className="font-mono text-[10px] text-neon-green">MCA</div>
                <div className="font-mono text-[9px] text-white/30">Graduate</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p className="text-white/70 font-inter leading-relaxed mb-4 text-base">
              I'm a passionate <span className="text-neon-cyan">Full-Stack Developer</span> with a Master's in Computer Applications, focused on building modern, scalable, and user-friendly web applications. I enjoy turning ideas into real-world digital experiences by combining clean frontend design with strong backend architecture.
            </p>
            <p className="text-white/50 font-inter leading-relaxed mb-4 text-sm">
              My expertise includes creating responsive and interactive interfaces using <span className="text-neon-cyan/80">React.js</span> and developing reliable backend systems with <span className="text-neon-purple/80">Spring Boot</span>, REST APIs, and MySQL. I'm especially interested in building applications that are not only functional, but also smooth, efficient, and visually engaging.
            </p>
            <p className="text-white/50 font-inter leading-relaxed mb-4 text-sm">
              I love exploring new technologies, improving user experiences, and solving complex problems through code. Whether it's designing intuitive UI, optimizing backend performance, or creating immersive web experiences, I enjoy every part of the development process.
            </p>
            <p className="text-white/50 font-inter leading-relaxed mb-8 text-sm">
              Currently, I'm focused on growing as a software developer by building impactful projects, learning modern technologies, and creating applications that deliver both performance and great user experience.
            </p>

            {/* Highlights */}
            <div className="space-y-3 mb-8">
              {highlights.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex items-center gap-3 glass px-4 py-2.5 rounded-lg"
                  style={{ border: '1px solid rgba(0,245,255,0.08)' }}
                >
                  <span className="text-lg flex-shrink-0">{item.icon}</span>
                  <span className="font-inter text-sm text-white/60">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {stats.map(({ label, value, suffix }) => (
            <div key={label} className="glass text-center py-6 rounded-xl"
              style={{ border: '1px solid rgba(0,245,255,0.1)' }}>
              <div className="font-orbitron font-bold text-3xl gradient-text">
                {value}{suffix}
              </div>
              <div className="font-mono text-xs text-white/40 tracking-widest mt-1">{label.toUpperCase()}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

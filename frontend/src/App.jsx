import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import PortfolioIntro from './components/intro/PortfolioIntro'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CustomCursor from './components/layout/CustomCursor'
import ScrollProgress from './components/layout/ScrollProgress'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Skills from './components/sections/Skills'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Education from './components/sections/Education'
import Certifications from './components/sections/Certifications'
import Contact from './components/sections/Contact'
import { incrementVisitor } from './api/portfolio'
import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './components/ui/BrandIcons'

function FloatingSocials() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.5 }}
      className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-4"
    >
      <div className="w-px h-16" style={{ background: 'linear-gradient(180deg, transparent, var(--neon-cyan))' }} />
      {[
        { icon: GithubIcon, href: 'https://github.com/Yaswanth0324', label: 'GitHub' },
        { icon: LinkedinIcon, href: 'https://www.linkedin.com/in/yaswanth-sde/', label: 'LinkedIn' },
        { icon: Mail, href: 'mailto:yash95632@gmail.com', label: 'Email' },
      ].map(({ icon: Icon, href, label }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          whileHover={{ scale: 1.2, x: 4 }}
          className="p-2 text-white/30 hover:text-neon-cyan transition-colors"
          style={{ '--neon-cyan': '#00f5ff' }}
        >
          <Icon size={16} />
        </motion.a>
      ))}
      <div className="w-px h-16" style={{ background: 'linear-gradient(180deg, var(--neon-cyan), transparent)' }} />
    </motion.div>
  )
}

function Portfolio() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative min-h-screen"
      style={{ background: 'var(--dark-900)' }}
    >
      <ScrollProgress />
      <Navbar />
      <FloatingSocials />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </motion.div>
  )
}

export default function App() {
  const [showPortfolio, setShowPortfolio] = useState(false)

  useEffect(() => {
    // Increment visitor count on load
    incrementVisitor().catch(() => {})

    // Force dark on html so intro is always cinematic dark
    document.documentElement.classList.add('dark')
    document.documentElement.classList.remove('light')
  }, [])

  const handleIntroComplete = () => {
    sessionStorage.setItem('introSeen', 'true')
    setShowPortfolio(true)
    // ThemeProvider will apply the saved theme when it mounts with Portfolio
  }

  return (
    <>
      <CustomCursor />
      {!showPortfolio ? (
        <PortfolioIntro key="intro" onComplete={handleIntroComplete} />
      ) : (
        <ThemeProvider>
          <Portfolio key="portfolio" />
        </ThemeProvider>
      )}
    </>
  )
}

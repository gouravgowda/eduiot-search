import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import WhyEduIoT from './components/WhyEduIoT'
import SearchResults from './pages/SearchResults'
import {
  Zap,
  Search as SearchIcon,
  Layers,
  Users,
  MousePointer2,
  Cpu,
  Wifi,
  Code2,
  Bot,
  GraduationCap,
  ChevronRight,
  Mail,
  Linkedin,
  Github,
  Twitter
} from 'lucide-react'

// Sub-components for Home Page
const Features = () => {
  const features = [
    { title: "Smart Ed-Search", desc: "AI-enhanced search results tailored for academic curriculums.", icon: SearchIcon, color: "blue" },
    { title: "IoT Discovery", desc: "Discover real-world projects based on available hardware.", icon: Cpu, color: "cyan" },
    { title: "Structured Learning", desc: "Results grouped by concept, hardware, and application.", icon: Layers, color: "indigo" },
    { title: "Student Centric", desc: "Simplified documentation for beginners and hobbyists.", icon: Users, color: "violet" }
  ]

  return (
    <section className="py-32 bg-white relative">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="heading-xl text-3xl md:text-5xl mb-6">Revolutionizing <span className="text-gradient">Technical Search</span></h2>
          <p className="text-slate-500 text-lg font-medium">Built with student success in mind.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5 }}
              className="group p-10 rounded-[2.5rem] border border-slate-50 hover:border-primary-100 hover:shadow-2xl hover:shadow-primary-100/20 transition-all bg-white"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-slate-50 group-hover:bg-primary-50 transition-colors">
                <f.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display">{f.title}</h3>
              <p className="text-slate-500 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const HowItWorks = () => {
  const steps = [
    { id: "01", title: "Enter Query", desc: "Search for any Engineering or IoT topic.", icon: MousePointer2 },
    { id: "02", title: "Smart Analysis", desc: "We filter and organize technical data.", icon: Zap },
    { id: "03", title: "Learn & Build", desc: "Get simplified results and project ideas.", icon: GraduationCap }
  ]

  return (
    <section className="py-32 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-600/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[150px]" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="heading-xl text-3xl md:text-5xl text-white mb-6">Designed for <span className="text-primary-400">Efficiency</span></h2>
          <p className="text-slate-400 text-lg">A seamless flow from curiosity to creation.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-16 lg:gap-12 relative">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative group"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-3xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center mb-10 shadow-2xl group-hover:border-primary-500/50 group-hover:bg-slate-800/80 transition-all rotate-3 group-hover:rotate-0">
                  <s.icon className="w-10 h-10 text-primary-400" />
                </div>
                <div className="text-sm font-bold text-primary-500 uppercase tracking-[0.3em] mb-4">Step {s.id}</div>
                <h3 className="text-2xl font-bold mb-4 font-display">{s.title}</h3>
                <p className="text-slate-400 leading-relaxed text-lg max-w-xs">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const TopicsGrid = ({ onCategoryClick }) => {
  const topics = [
    { title: "Engineering Subjects", icon: GraduationCap, count: "50+ Topics", search: "Engineering" },
    { title: "IoT Sensors", icon: Wifi, count: "30+ Sensors", search: "Sensors" },
    { title: "Microcontrollers", icon: Cpu, count: "15+ Devices", search: "Arduino" },
    { title: "Network Protocols", icon: Code2, count: "20+ Protocols", search: "Networking" },
    { title: "AI + IoT", icon: Bot, count: "12+ Projects", search: "AI" },
    { title: "Final Year Ideas", icon: Zap, count: "100+ Ideas", search: "Final Year" }
  ]

  return (
    <section id="topics" className="py-32 bg-white">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="heading-xl text-3xl md:text-5xl mb-6">Explore <span className="text-gradient">Categories</span></h2>
            <p className="text-slate-500 text-lg font-medium">Dive into specific domains to find curated learning resources and project kits.</p>
          </motion.div>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={() => onCategoryClick('')}
            className="btn-primary"
          >
            View All Resources
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onCategoryClick(t.search)}
              className="group glass-panel p-6 rounded-[2.5rem] hover:bg-white hover:shadow-2xl hover:shadow-primary-100/30 transition-all cursor-pointer border border-slate-100"
            >
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-slate-50 group-hover:bg-primary-50 transition-colors shadow-sm">
                  <t.icon className="w-10 h-10 text-slate-700 group-hover:text-primary-600 transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-display">{t.title}</h3>
                  <p className="text-sm font-bold text-primary-500 uppercase tracking-widest mt-1">{t.count}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Footer = ({ onNavigate }) => (
  <footer id="about" className="bg-white pt-24 pb-12 border-t border-slate-100">
    <div className="section-container">
      <div className="grid lg:grid-cols-4 gap-12 mb-16">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => onNavigate({ view: 'home' })}>
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">EduIoT</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            A smart search platform dedicated to empowering engineering students with simplified IoT knowledge and project ideas.
          </p>
          <div className="flex gap-4">
            <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-primary-600 transition-colors"><Twitter className="w-5 h-5" /></button>
            <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-primary-600 transition-colors"><Linkedin className="w-5 h-5" /></button>
            <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:text-primary-600 transition-colors"><Github className="w-5 h-5" /></button>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><button onClick={() => onNavigate({ view: 'home' })} className="hover:text-primary-600">Home</button></li>
            <li><button onClick={() => onNavigate({ hash: '#topics' })} className="hover:text-primary-600">Topics</button></li>
            <li><button onClick={() => onNavigate({ search: 'IoT' })} className="hover:text-primary-600">IoT Projects</button></li>
            <li><button onClick={() => onNavigate({ hash: '#home' })} className="hover:text-primary-600">Resources</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Support</h4>
          <ul className="space-y-4 text-sm text-slate-500">
            <li><a href="#" className="hover:text-primary-600">Feedback</a></li>
            <li><a href="#" className="hover:text-primary-600">Contact Us</a></li>
            <li><a href="#" className="hover:text-primary-600">Terms of Use</a></li>
            <li><a href="#" className="hover:text-primary-600">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6">Stay Updated</h4>
          <p className="text-sm text-slate-500 mb-4">Get the latest IoT project ideas directly in your inbox.</p>
          <div className="flex p-1.5 bg-slate-50 rounded-xl border border-slate-100">
            <input type="email" placeholder="Enter email" className="bg-transparent border-none outline-none px-3 w-full text-sm" />
            <button className="bg-slate-900 text-white p-2 rounded-lg hover:bg-slate-800 transition-colors">
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
        <p>© 2025 EduIoT. Designed for educational excellence.</p>
        <div className="flex gap-8">
          <span>Made for Students</span>
          <span>Open Source</span>
        </div>
      </div>
    </div>
  </footer>
)

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [view, setView] = useState('home') // 'home' or 'results'

  const handleSearch = (query) => {
    setSearchQuery(query)
    setView('results')
    window.scrollTo(0, 0)
  }

  const handleNavigate = (link) => {
    if (link.view === 'home') {
      setView('home')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (link.search) {
      handleSearch(link.search)
    } else if (link.hash) {
      if (view !== 'home') {
        setView('home')
        // Give time for view to switch before hashing
        setTimeout(() => {
          const element = document.querySelector(link.hash)
          if (element) element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      } else {
        const element = document.querySelector(link.hash)
        if (element) element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const handleBackToHome = () => {
    setView('home')
    setSearchQuery('')
  }

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-primary-100">
      <Navbar onNavigate={handleNavigate} currentView={view} />

      <main className="relative">
        <AnimatePresence mode="wait">
          {view === 'home' ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Hero onSearch={handleSearch} />
              <WhyEduIoT />
              <Features />
              <HowItWorks />
              <TopicsGrid onCategoryClick={handleSearch} />

              {/* CTA Section */}
              <section className="py-24">
                <div className="section-container">
                  <div className="bg-primary-600 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary-200">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                    <div className="relative z-10">
                      <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Learn Better. Build Smarter.</h2>
                      <p className="text-primary-100 text-lg mb-10 max-w-xl mx-auto">
                        Start your IoT journey today with structured paths and beginner-friendly resources.
                      </p>
                      <button
                        onClick={() => handleSearch('')}
                        className="bg-white text-primary-600 px-10 py-4 rounded-full font-bold text-lg hover:shadow-xl transition-all active:scale-95"
                      >
                        Start Exploring
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.3, ease: "circOut" }}
            >
              <SearchResults query={searchQuery} onBack={handleBackToHome} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  )
}

export default App

import React, { useState } from 'react'
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
    <section className="py-24 bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Core Features</h2>
          <div className="w-20 h-1.5 bg-primary-600 mx-auto rounded-full" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group p-8 rounded-3xl border border-slate-100 hover:border-primary-100 hover:shadow-2xl hover:shadow-primary-100/20 transition-all bg-white">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-slate-50 group-hover:bg-primary-50 transition-colors`}>
                <f.icon className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
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
    <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/10 rounded-full blur-[120px]" />
      <div className="section-container relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-slate-400">A seamless flow from curiosity to creation.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-8">
          {steps.map((s, i) => (
            <div key={i} className="relative">
              {i < 2 && <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-slate-800 z-0" />}
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center mb-6 shadow-xl">
                  <s.icon className="w-8 h-8 text-primary-400" />
                </div>
                <div className="text-xs font-bold text-primary-500 uppercase tracking-widest mb-2">Step {s.id}</div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-slate-400 text-sm max-w-xs">{s.desc}</p>
              </div>
            </div>
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
    <section id="topics" className="py-24 bg-white">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Explore by Category</h2>
            <p className="text-slate-500">Dive into specific domains to find curated learning resources and project kits.</p>
          </div>
          <button
            onClick={() => onCategoryClick('')}
            className="text-primary-600 font-bold flex items-center gap-2 hover:gap-3 transition-all"
          >
            See all topics <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((t, i) => (
            <div
              key={i}
              onClick={() => onCategoryClick(t.search)}
              className="group glass-card p-4 rounded-[2.5rem] border-slate-100 hover:bg-slate-50 transition-all cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-[1.75rem] flex items-center justify-center bg-slate-50 group-hover:bg-white transition-colors shadow-sm`}>
                  <t.icon className="w-7 h-7 text-slate-700 group-hover:text-primary-600 transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{t.title}</h3>
                  <p className="text-xs text-slate-500">{t.count}</p>
                </div>
              </div>
            </div>
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
    <div className="min-h-screen">
      <Navbar onNavigate={handleNavigate} currentView={view} />

      {view === 'home' ? (
        <main>
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
        </main>
      ) : (
        <SearchResults query={searchQuery} onBack={handleBackToHome} />
      )}

      <Footer onNavigate={handleNavigate} />
    </div>
  )
}

export default App

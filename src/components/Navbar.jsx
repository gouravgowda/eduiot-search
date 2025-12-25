import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Rocket, GraduationCap, Cpu, Layers, Info, Search } from 'lucide-react'

const Navbar = ({ onNavigate, currentView }) => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Home', view: 'home', icon: Rocket },
        { name: 'Topics', hash: '#topics', icon: GraduationCap },
        { name: 'IoT Projects', search: 'IoT', icon: Cpu },
        { name: 'Resources', hash: '#home', icon: Layers },
        { name: 'About', hash: '#about', icon: Info },
    ]

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'py-3 bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.03)]'
                : 'py-6 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => onNavigate({ view: 'home' })}
                    >
                        <div className="w-11 h-11 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-200 group-hover:shadow-primary-300 group-hover:bg-primary-700 transition-all">
                            <GraduationCap className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-slate-900 font-display">
                            Edu<span className="text-primary-600 transition-colors">IoT</span>
                        </span>
                    </motion.div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <motion.button
                                key={link.name}
                                whileHover={{ y: -1 }}
                                onClick={() => onNavigate(link)}
                                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${currentView === link.view
                                    ? 'text-primary-600 bg-primary-50'
                                    : 'text-slate-600 hover:text-primary-600 hover:bg-slate-50'
                                    }`}
                            >
                                {link.name}
                            </motion.button>
                        ))}
                        <div className="ml-4 pl-4 border-l border-slate-200">
                            <button
                                onClick={() => onNavigate({ search: 'IoT' })}
                                className="btn-primary scale-90"
                            >
                                <Search className="w-4 h-4" />
                                Explore
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2.5 bg-slate-100/50 rounded-xl text-slate-600 hover:text-primary-600 transition-all active:scale-90"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden glass-panel border-t overflow-hidden"
                    >
                        <div className="px-6 pt-4 pb-8 space-y-2">
                            {navLinks.map((link) => (
                                <button
                                    key={link.name}
                                    onClick={() => {
                                        onNavigate(link);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full flex items-center gap-4 px-4 py-4 text-slate-700 hover:bg-primary-50 hover:text-primary-600 rounded-2xl transition-all"
                                >
                                    <div className="p-2 bg-white rounded-xl shadow-sm">
                                        <link.icon className="w-5 h-5" />
                                    </div>
                                    <span className="font-semibold">{link.name}</span>
                                </button>
                            ))}
                            <div className="pt-6">
                                <button
                                    onClick={() => {
                                        onNavigate({ search: 'IoT' });
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full btn-primary justify-center py-4 text-lg"
                                >
                                    <Search className="w-5 h-5" />
                                    Launch Explorer
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navbar

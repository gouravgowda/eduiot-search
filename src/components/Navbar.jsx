import React, { useState, useEffect } from 'react'
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
        { name: 'Resources', hash: '#home', icon: Layers }, // Or specific section
        { name: 'About', hash: '#about', icon: Info },
    ]

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => onNavigate({ view: 'home' })}
                    >
                        <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-200 group-hover:scale-110 transition-transform">
                            < GraduationCap className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-slate-900">
                            Edu<span className="text-primary-600 group-hover:text-primary-700 transition-colors">IoT</span>
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => onNavigate(link)}
                                className="text-slate-600 hover:text-primary-600 font-medium transition-colors"
                            >
                                {link.name}
                            </button>
                        ))}
                        <button
                            onClick={() => onNavigate({ search: 'IoT' })}
                            className="btn-primary"
                        >
                            <Search className="w-4 h-4" />
                            Explore Topics
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-slate-600 hover:text-primary-600 transition-colors"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="px-4 pt-2 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => {
                                    onNavigate(link);
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-3 py-3 text-slate-600 hover:bg-slate-50 hover:text-primary-600 rounded-lg transition-colors"
                            >
                                <link.icon className="w-5 h-5" />
                                {link.name}
                            </button>
                        ))}
                        <div className="pt-4 px-3">
                            <button
                                onClick={() => {
                                    onNavigate({ search: 'IoT' });
                                    setIsMobileMenuOpen(false);
                                }}
                                className="w-full btn-primary justify-center"
                            >
                                <Search className="w-4 h-4" />
                                Explore Topics
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar

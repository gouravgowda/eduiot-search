import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Rocket, Cpu, BookOpen, User, Sparkles } from 'lucide-react'

const Hero = ({ onSearch }) => {
    const [query, setQuery] = useState('')

    const suggestions = [
        "IoT Projects",
        "Engineering Subjects",
        "Final Year Ideas",
        "Beginner Topics"
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        if (query.trim()) {
            onSearch(query)
        }
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }

    return (
        <section id="home" className="relative pt-40 pb-32 overflow-hidden">
            {/* Animated Background Blobs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        x: [0, 50, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary-200/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, -90, 0],
                        x: [0, -40, 0],
                        y: [0, 60, 0]
                    }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[20%] -right-[10%] w-[45%] h-[45%] bg-cyan-200/20 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        x: [0, 30, 0],
                        y: [0, -50, 0]
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-indigo-200/20 rounded-full blur-[120px]"
                />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="section-container relative z-10 text-center"
            >
                {/* Badge */}
                <motion.div
                    variants={itemVariants}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/50 backdrop-blur-md border border-white/50 mb-10 shadow-sm"
                >
                    <div className="bg-primary-100 p-1 rounded-lg">
                        <Sparkles className="w-4 h-4 text-primary-600" />
                    </div>
                    <span className="text-sm font-bold text-primary-800 tracking-wide uppercase">AI-Enhanced Search for IoT</span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                    variants={itemVariants}
                    className="heading-xl mb-8 max-w-5xl mx-auto"
                >
                    Your <span className="text-gradient">Smart Search Engine</span> for Education and IoT
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-xl text-slate-600 mb-14 max-w-3xl mx-auto leading-relaxed"
                >
                    Search concepts, projects, sensors, and learning paths in one place.
                    Crafted for engineering students to master technical domains with ease.
                </motion.p>

                {/* Search Bar */}
                <motion.div
                    variants={itemVariants}
                    className="max-w-4xl mx-auto mb-10"
                >
                    <form onSubmit={handleSubmit} className="relative group">
                        {/* Glow Effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-cyan-500 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition duration-500" />

                        <div className="relative flex items-center bg-white/80 backdrop-blur-xl border border-white p-2.5 rounded-[2rem] shadow-2xl transition-all duration-300 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary-500/10 active:scale-[0.995]">
                            <Search className="w-6 h-6 text-slate-400 ml-5 mr-4" />
                            <input
                                type="text"
                                placeholder="Search Arduino, Sensors, DBMS, AI, Networking..."
                                className="w-full py-4 text-xl bg-transparent border-none outline-none text-slate-800 font-medium placeholder:text-slate-400"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="btn-primary py-4 px-10 mr-1.5 shadow-lg shadow-primary-200"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </motion.div>

                {/* Suggestions */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-wrap items-center justify-center gap-3"
                >
                    <span className="text-sm font-bold text-slate-400 mr-2 uppercase tracking-wider">Popular Now:</span>
                    {suggestions.map((item) => (
                        <motion.button
                            key={item}
                            whileHover={{ y: -2, scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setQuery(item)
                                onSearch(item)
                            }}
                            className="px-5 py-2 rounded-2xl bg-white border border-slate-100 text-sm font-bold text-slate-600 hover:border-primary-200 hover:text-primary-600 hover:shadow-md transition-all"
                        >
                            {item}
                        </motion.button>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Hero

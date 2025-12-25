import React, { useState } from 'react'
import { Search, Rocket, Cpu, BookOpen, User } from 'lucide-react'

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

    return (
        <section id="home" className="relative pt-32 pb-20 overflow-hidden">
            {/* Background Ornaments */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] pointer-events-none opacity-40">
                <div className="absolute top-20 left-10 w-64 h-64 bg-primary-200/50 rounded-full blur-[100px]" />
                <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-200/50 rounded-full blur-[100px]" />
            </div>

            <div className="section-container relative z-10 text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 border border-primary-100 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
                    <BookOpen className="w-4 h-4 text-primary-600" />
                    <span className="text-sm font-semibold text-primary-700">Educational Hub for IoT & Engineering</span>
                </div>

                {/* Heading */}
                <h1 className="heading-xl mb-6 max-w-4xl mx-auto leading-[1.15]">
                    Your <span className="text-gradient">Smart Search Engine</span> for Education and IoT
                </h1>

                <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
                    Search concepts, projects, sensors, and learning paths in one place.
                    Built for students to learn better and build smarter.
                </p>

                {/* Search Bar */}
                <div className="max-w-3xl mx-auto mb-8">
                    <form onSubmit={handleSubmit} className="relative group">
                        <div className="absolute inset-0 bg-primary-600/10 rounded-2xl blur-xl group-focus-within:bg-primary-600/20 transition-all duration-300" />
                        <div className="relative flex items-center bg-white border border-slate-200 p-2 rounded-2xl shadow-xl transition-all duration-300 focus-within:ring-4 focus-within:ring-primary-50 focus-within:border-primary-300">
                            <Search className="w-6 h-6 text-slate-400 ml-4 mr-3" />
                            <input
                                type="text"
                                placeholder="Search topics like Arduino, Sensors, DBMS, AI, Networking..."
                                className="w-full py-4 text-lg bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="btn-primary py-3.5 mr-1"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                {/* Suggestions */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <span className="text-sm font-medium text-slate-500 mr-2">Suggested:</span>
                    {suggestions.map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                setQuery(item)
                                onSearch(item)
                            }}
                            className="px-4 py-1.5 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:border-primary-400 hover:text-primary-600 hover:bg-primary-50 transition-all shadow-sm"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Hero

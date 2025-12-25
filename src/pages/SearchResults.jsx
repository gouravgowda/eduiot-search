import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, Search, ChevronRight, Tag, ExternalLink, ArrowLeft, Loader2, Book, Tooltip } from 'lucide-react'
import { mockData } from '../data/mockData'

const SearchResults = ({ query, onBack }) => {
    const [wikiResult, setWikiResult] = useState(null)
    const [isLoadingWiki, setIsLoadingWiki] = useState(false)
    const [wikiError, setWikiError] = useState(null)
    const [filters, setFilters] = useState({
        category: 'All',
        level: 'All',
        type: 'All'
    })

    const filteredResults = mockData.filter(item => {
        const queryLower = query.toLowerCase()
        const searchTerms = queryLower.split(' ').filter(term => term.length > 0)
        const itemContent = `${item.title} ${item.category} ${item.type} ${item.level} ${item.description} ${item.tags.join(' ')}`.toLowerCase()

        const matchesQuery = itemContent.includes(queryLower) ||
            searchTerms.some(term => itemContent.includes(term))

        const matchesCategory = filters.category === 'All' || item.category === filters.category
        const matchesLevel = filters.level === 'All' || item.level === filters.level
        const matchesType = filters.type === 'All' || item.type === filters.type

        return matchesQuery && matchesCategory && matchesLevel && matchesType
    })

    useEffect(() => {
        const fetchWikiDetail = async () => {
            if (filteredResults.length === 0 && query.trim()) {
                setIsLoadingWiki(true)
                setWikiResult(null)

                const searchQueries = [
                    query,
                    query.split(' ')[0],
                    query.replace(/\s+/g, '_')
                ]

                let successfulData = null
                for (const q of searchQueries) {
                    try {
                        const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`)
                        if (response.ok) {
                            const data = await response.json()
                            if (data.type === 'standard') {
                                successfulData = data
                                break
                            }
                        }
                    } catch (err) {
                        continue
                    }
                }

                if (successfulData) {
                    setWikiResult(successfulData)
                } else {
                    setWikiResult(null)
                    setWikiError("No content found.")
                }
                setIsLoadingWiki(false)
            } else {
                setWikiResult(null)
            }
        }
        fetchWikiDetail()
    }, [query, filteredResults.length])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    }

    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-24">
            <div className="section-container">
                {/* Header Area */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
                >
                    <div className="flex-1">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-slate-500 hover:text-primary-600 font-bold transition-all mb-6 group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1.5 transition-transform" />
                            Return to Search
                        </button>
                        <h2 className="heading-xl text-3xl md:text-5xl !leading-[1.2]">
                            Results for "<span className="text-gradient">{query}</span>"
                        </h2>
                        <p className="text-slate-500 mt-4 text-lg font-medium">Found {filteredResults.length} organized resources for you.</p>
                    </div>

                    <div className="hidden lg:flex items-center gap-4 p-2 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <div className="px-4 py-2 bg-slate-50 rounded-xl text-sm font-bold text-slate-600 flex items-center gap-2">
                            <Search className="w-4 h-4" />
                            <span>Explorer Mode</span>
                        </div>
                    </div>
                </motion.div>

                <div className="flex flex-col lg:grid lg:grid-cols-4 gap-12">
                    {/* Filters Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-1"
                    >
                        <div className="glass-card p-8 rounded-[2.5rem] sticky top-32">
                            <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
                                <div className="p-2 bg-primary-100 rounded-xl">
                                    <Filter className="w-5 h-5 text-primary-600" />
                                </div>
                                <h3 className="font-bold text-slate-900 text-lg">Filter Assets</h3>
                            </div>

                            {/* Filter Groups */}
                            {[
                                { label: 'Category', key: 'category', options: ['All', 'Education', 'IoT'] },
                                { label: 'Level', key: 'level', options: ['All', 'Beginner', 'Intermediate', 'Advanced'] },
                                { label: 'Content Type', key: 'type', options: ['All', 'Concept', 'Project', 'Hardware'] }
                            ].map((group) => (
                                <div key={group.key} className="space-y-4 mb-8">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{group.label}</h4>
                                    <div className="space-y-1.5">
                                        {group.options.map(opt => (
                                            <button
                                                key={opt}
                                                onClick={() => setFilters({ ...filters, [group.key]: opt })}
                                                className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${filters[group.key] === opt
                                                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-200'
                                                        : 'text-slate-600 hover:bg-slate-50 hover:text-primary-600'
                                                    }`}
                                            >
                                                {opt}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <button
                                onClick={() => setFilters({ category: 'All', level: 'All', type: 'All' })}
                                className="w-full py-3 text-slate-400 font-bold text-sm hover:text-primary-600 transition-colors"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    </motion.div>

                    {/* Results Area */}
                    <div className="lg:col-span-3">
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="space-y-8"
                        >
                            {filteredResults.length > 0 ? (
                                filteredResults.map((result) => (
                                    <motion.div
                                        key={result.id}
                                        variants={itemVariants}
                                        whileHover={{ y: -4 }}
                                        className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 md:p-10 hover:shadow-2xl hover:shadow-primary-100/30 transition-all border-l-0 hover:border-l-[6px] hover:border-l-primary-500"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-4">
                                                    <span className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-[10px] font-bold uppercase tracking-widest leading-none">
                                                        {result.category}
                                                    </span>
                                                    <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest leading-none">
                                                        {result.level}
                                                    </span>
                                                </div>
                                                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors mb-3">
                                                    {result.title}
                                                </h3>
                                                <p className="text-slate-500 text-lg leading-relaxed line-clamp-2 md:line-clamp-none">
                                                    {result.description}
                                                </p>
                                            </div>
                                            <div className="flex flex-col items-end">
                                                <div className="bg-slate-50 p-3 rounded-2xl group-hover:bg-primary-50 transition-colors">
                                                    <Tag className="w-5 h-5 text-slate-400 group-hover:text-primary-600" />
                                                </div>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-2">{result.type}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2 mb-8">
                                            {result.tags.map(tag => (
                                                <span key={tag} className="px-4 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 text-xs font-bold hover:bg-white hover:border-primary-200 transition-colors transition-all">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                                            <div className="flex items-center gap-4">
                                                {result.hardware.length > 0 && (
                                                    <div className="hidden md:flex items-center gap-3">
                                                        <span className="text-xs font-bold text-slate-400 uppercase">Kit:</span>
                                                        <div className="flex gap-1.5">
                                                            {result.hardware.map(h => (
                                                                <span key={h} className="text-xs font-semibold text-slate-600 px-2 py-0.5 bg-slate-50 rounded-md">{h}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-primary-600 hover:shadow-lg transition-all active:scale-95 group/btn">
                                                Launch Module
                                                <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="space-y-8">
                                    <AnimatePresence>
                                        {isLoadingWiki && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="glass-card p-16 text-center"
                                            >
                                                <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-6" />
                                                <p className="text-xl font-bold text-slate-900">Searching Global Repository...</p>
                                                <p className="text-slate-500 mt-2">Connecting to Wikipedia Knowledge Base</p>
                                            </motion.div>
                                        )}

                                        {!isLoadingWiki && wikiResult && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="bg-white border-2 border-primary-100 rounded-[3rem] p-10 md:p-14 hover:shadow-3xl transition-all relative overflow-hidden group"
                                            >
                                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full blur-[80px] -mr-32 -mt-32 opacity-60" />

                                                <div className="relative z-10">
                                                    <div className="flex items-center gap-3 mb-8">
                                                        <div className="bg-primary-600 p-3 rounded-2xl shadow-lg shadow-primary-200">
                                                            <Book className="w-6 h-6 text-white" />
                                                        </div>
                                                        <span className="text-sm font-bold text-primary-700 uppercase tracking-[0.2em]">Global Knowledge Base</span>
                                                    </div>
                                                    <h3 className="heading-xl text-3xl md:text-5xl mb-8">{wikiResult.title}</h3>
                                                    <p className="text-slate-600 text-xl leading-relaxed mb-10 max-w-4xl">
                                                        {wikiResult.extract}
                                                    </p>
                                                    <div className="pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                                                        <p className="text-slate-400 font-medium italic">Educational context provided by Wikipedia API fallback.</p>
                                                        <a
                                                            href={wikiResult.content_urls.desktop.page}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="btn-primary"
                                                        >
                                                            Discover More on Wiki
                                                            <ExternalLink className="w-5 h-5" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-center py-20 bg-slate-100/50 rounded-[3rem] border-2 border-dashed border-slate-200"
                                    >
                                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                                            <Search className="w-10 h-10 text-slate-300" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-4">
                                            {wikiResult ? "Still curious?" : "No Local Matches Found"}
                                        </h3>
                                        <p className="text-slate-500 max-w-md mx-auto text-lg leading-relaxed">
                                            {wikiResult
                                                ? "Our local database is focused on IoT kits, but you can refine your search for more specific project ideas."
                                                : "We couldn't find any topics matching your current academic filters. Try widening your search keywords."}
                                        </p>
                                        <button
                                            onClick={() => setFilters({ category: 'All', level: 'All', type: 'All' })}
                                            className="mt-10 px-8 py-3 bg-white text-primary-600 font-bold rounded-2xl border border-primary-100 hover:bg-primary-50 transition-all shadow-sm"
                                        >
                                            Reset Experience
                                        </button>
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResults

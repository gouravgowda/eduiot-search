import React, { useState, useEffect } from 'react'
import { Filter, Search, ChevronRight, Tag, ExternalLink, ArrowLeft, Loader2, Book } from 'lucide-react'
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
        const itemContent = `${item.title} ${item.category} ${item.type} ${item.tags.join(' ')}`.toLowerCase()

        // Match if query is contained in content OR any word matches
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

                // Try several query variations for Wikipedia
                const searchQueries = [
                    query,
                    query.split(' ')[0], // First word
                    query.replace(/\s+/g, '_') // Underscored
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

    return (
        <div className="bg-slate-50 min-h-screen pt-28 pb-20">
            <div className="section-container">
                {/* Header Area */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors mb-4 group"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Back to Search
                        </button>
                        <h2 className="text-3xl font-bold text-slate-900">
                            Results for "<span className="text-primary-600">{query}</span>"
                        </h2>
                        <p className="text-slate-500 mt-2">Found {filteredResults.length} organized results for your search.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-slate-200 text-sm font-medium text-slate-600">
                            <Search className="w-4 h-4" />
                            <span>Refine Search</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-4 gap-8">
                    {/* Filters Panel */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="glass-card p-6 rounded-3xl border-slate-100 shadow-sm sticky top-28">
                            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                                <Filter className="w-5 h-5 text-primary-600" />
                                <h3 className="font-bold text-slate-900">Filters</h3>
                            </div>

                            {/* Category Filter */}
                            <div className="space-y-4 mb-8">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category</h4>
                                <div className="space-y-2">
                                    {['All', 'Education', 'IoT'].map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setFilters({ ...filters, category: cat })}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${filters.category === cat
                                                ? 'bg-primary-600 text-white font-semibold shadow-md border-primary-600'
                                                : 'text-slate-600 hover:bg-slate-50 hover:text-primary-600'
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Level Filter */}
                            <div className="space-y-4 mb-8">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Level</h4>
                                <div className="space-y-2">
                                    {['All', 'Beginner', 'Intermediate', 'Advanced'].map(lvl => (
                                        <button
                                            key={lvl}
                                            onClick={() => setFilters({ ...filters, level: lvl })}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${filters.level === lvl
                                                ? 'bg-primary-600 text-white font-semibold'
                                                : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            {lvl}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Type Filter */}
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Content Type</h4>
                                <div className="space-y-2">
                                    {['All', 'Concept', 'Project', 'Hardware'].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setFilters({ ...filters, type: t })}
                                            className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${filters.type === t
                                                ? 'bg-primary-600 text-white font-semibold'
                                                : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Results Area */}
                    <div className="lg:col-span-3 space-y-6">
                        {filteredResults.length > 0 ? (
                            filteredResults.map((result) => (
                                <div
                                    key={result.id}
                                    className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 hover:shadow-xl hover:border-primary-100 transition-all group"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="px-2.5 py-0.5 rounded-full bg-primary-50 text-primary-700 text-[10px] font-bold uppercase tracking-wider">
                                                    {result.category}
                                                </span>
                                                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                                                    {result.level}
                                                </span>
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                                                {result.title}
                                            </h3>
                                        </div>
                                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                                            <Tag className="w-3 h-3" />
                                            {result.type}
                                        </span>
                                    </div>

                                    <p className="text-slate-600 mb-6 leading-relaxed">
                                        {result.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {result.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-xs font-medium">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                        <div className="flex items-center gap-4">
                                            {result.hardware.length > 0 && (
                                                <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-500">
                                                    <span className="font-bold">Hardware:</span>
                                                    <span>{result.hardware.join(', ')}</span>
                                                </div>
                                            )}
                                        </div>
                                        <button className="flex items-center gap-2 text-primary-600 font-bold text-sm hover:gap-3 transition-all">
                                            View Details
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="space-y-6">
                                {isLoadingWiki ? (
                                    <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center animate-pulse">
                                        <Loader2 className="w-8 h-8 text-primary-600 animate-spin mx-auto mb-4" />
                                        <p className="text-slate-500">Searching global knowledge base...</p>
                                    </div>
                                ) : wikiResult ? (
                                    <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl transition-all border-l-4 border-l-primary-600">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className="bg-primary-50 p-2 rounded-lg">
                                                <Book className="w-5 h-5 text-primary-600" />
                                            </div>
                                            <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">Global Resource (Wikipedia)</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-slate-900 mb-4">{wikiResult.title}</h3>
                                        <p className="text-slate-600 leading-relaxed mb-6">
                                            {wikiResult.extract}
                                        </p>
                                        <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                                            <p className="text-xs text-slate-400 italic">No local matching topics found. Provided by Wikipedia API.</p>
                                            <a
                                                href={wikiResult.content_urls.desktop.page}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="btn-primary py-2 text-sm"
                                            >
                                                Read Full Article
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        </div>
                                    </div>
                                ) : null}

                                <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Search className="w-8 h-8 text-slate-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                                        {wikiResult ? "Looking for more?" : "No results found"}
                                    </h3>
                                    <p className="text-slate-500 max-w-sm mx-auto">
                                        {wikiResult
                                            ? "Check the global summary above or try refining your search terms."
                                            : "We couldn't find any topics matching your current filters. Try adjusting your keywords or filter settings."}
                                    </p>
                                    <button
                                        onClick={() => setFilters({ category: 'All', level: 'All', type: 'All' })}
                                        className="mt-6 text-primary-600 font-bold hover:underline"
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResults

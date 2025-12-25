import React from 'react'
import { AlertCircle, FileSearch, HardDrive, Lightbulb } from 'lucide-react'

const WhyEduIoT = () => {
    const problems = [
        {
            title: "Information Overload",
            description: "Too much content on the internet makes it hard to find exactly what a beginner needs.",
            icon: AlertCircle,
            color: "blue"
        },
        {
            title: "Complexity Barrier",
            description: "Existing hardware documentation is often too technical or structured for academic beginners.",
            icon: HardDrive,
            color: "cyan"
        },
        {
            title: "Fragmented Platforms",
            description: "No single platform combines academic theory with practical IoT implementation.",
            icon: FileSearch,
            color: "indigo"
        },
        {
            title: "Innovation Block",
            description: "Students struggle to find relevant and feasible project ideas for their final year.",
            icon: Lightbulb,
            color: "violet"
        }
    ]

    return (
        <section className="bg-slate-50/50 py-24">
            <div className="section-container">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why EduIoT?</h2>
                    <div className="w-20 h-1.5 bg-primary-600 mx-auto rounded-full mb-6" />
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        We bridge the gap between technical complexity and educational clarity, making IoT accessible for every student.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {problems.map((problem, index) => (
                        <div
                            key={index}
                            className="glass-card p-8 rounded-3xl hover:translate-y-[-8px] transition-all duration-300 border-none ring-1 ring-slate-200/60"
                        >
                            <div className={`w-14 h-14 rounded-2xl bg-${problem.color}-100 flex items-center justify-center mb-6`}>
                                <problem.icon className={`w-7 h-7 text-${problem.color}-600`} />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{problem.title}</h3>
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {problem.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyEduIoT

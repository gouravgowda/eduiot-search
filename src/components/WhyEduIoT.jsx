import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Cpu, Zap, GraduationCap } from 'lucide-react'

const WhyEduIoT = () => {
    const reasons = [
        {
            title: "Academic Focus",
            desc: "Specially curated results for Engineering & Diploma students across technical streams.",
            icon: Brain,
            color: "from-blue-500 to-indigo-500"
        },
        {
            title: "Hardware Agnostic",
            desc: "From Arduino to ESP32 and Raspberry Pi, find projects for all platforms.",
            icon: Cpu,
            color: "from-cyan-500 to-blue-500"
        },
        {
            title: "Real-time Context",
            desc: "Get instant Wikipedia summaries for broader technical background on any topic.",
            icon: Zap,
            color: "from-amber-500 to-orange-500"
        },
        {
            title: "Final Year Ready",
            desc: "Explore hundreds of project ideas and ready-to-use learning kits.",
            icon: GraduationCap,
            color: "from-violet-500 to-purple-500"
        }
    ]

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    }

    return (
        <section className="py-32 relative overflow-hidden bg-slate-50">
            <div className="section-container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-20"
                >
                    <h2 className="heading-xl text-3xl md:text-5xl mb-6">Why Choose <span className="text-gradient">EduIoT</span>?</h2>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">
                        We bridge the gap between complex technical documentation and student learning.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {reasons.map((reason, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className="glass-card p-10 rounded-[3rem] hover:shadow-2xl hover:shadow-primary-100/30 transition-all border-none"
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${reason.color} flex items-center justify-center mb-8 shadow-lg shadow-blue-200`}>
                                <reason.icon className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display">{reason.title}</h3>
                            <p className="text-slate-500 leading-relaxed text-lg">{reason.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default WhyEduIoT

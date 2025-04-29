import React from 'react';
import Image from 'next/image';
import { Search, BarChart3, ClipboardList, CheckCircle2, LineChart, Users, FileText, ArrowRight } from 'lucide-react';

const HowItWorksPage = () => {
    const steps = [
        {
            number: "01",
            title: "Search for a Doctor",
            description: "Enter the doctor's name or specialty to find the healthcare provider you're looking for.",
            icon: Search
        },
        {
            number: "02",
            title: "Generate Report",
            description: "Our system analyzes comprehensive data from multiple sources to create a detailed report.",
            icon: BarChart3
        },
        {
            number: "03",
            title: "Review Insights",
            description: "Get detailed insights about the doctor's experience, patient reviews, and ratings.",
            icon: ClipboardList
        },
        {
            number: "04",
            title: "Make Informed Decision",
            description: "Use the comprehensive report to make an informed decision about your healthcare provider.",
            icon: CheckCircle2
        }
    ];

    const features = [
        {
            title: "Comprehensive Analysis",
            description: "We analyze multiple data points including patient reviews, qualifications, and experience.",
            icon: LineChart
        },
        {
            title: "Real Patient Reviews",
            description: "Access authentic patient experiences and feedback about healthcare providers.",
            icon: Users
        },
        {
            title: "Detailed Reports",
            description: "Get in-depth reports that help you understand a doctor's practice and patient satisfaction.",
            icon: FileText
        }
    ];

    return (
        <main className="min-h-screen bg-[#EDF3FF]">
            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/how-it-works-hero.jpg"
                        alt="How it works"
                        fill
                        className="object-cover opacity-20"
                    />
                </div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
                        How It Works
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
                        Simple steps to find and evaluate your healthcare provider
                    </p>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="text-slate-900">
                                        <step.icon size={32} strokeWidth={1.5} />
                                    </div>
                                    <div className="text-3xl font-bold text-slate-900">{step.number}</div>
                                </div>
                                <h3 className="text-2xl font-semibold text-slate-900 mb-4">{step.title}</h3>
                                <p className="text-slate-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">What Makes Us Different</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-[#EDF3FF] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                                <div className="text-slate-900 mb-4">
                                    <feature.icon size={48} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                                <p className="text-slate-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Visualization */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="h-1 w-full bg-slate-200"></div>
                        </div>
                        <div className="relative flex justify-between">
                            {steps.map((step, index) => (
                                <div key={index} className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                                    <span className="text-xl font-bold text-slate-900">{step.number}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-4xl mx-auto text-center px-4 md:px-8">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Find Your Doctor?</h2>
                    <p className="text-xl text-slate-300 mb-8">
                        Start your search today and get comprehensive insights about healthcare providers.
                    </p>
                    <button className="bg-white text-slate-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2 mx-auto">
                        Search Now
                        <ArrowRight size={24} />
                    </button>
                </div>
            </section>
        </main>
    );
};

export default HowItWorksPage; 
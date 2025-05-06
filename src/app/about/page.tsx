import React from 'react';
import Image from 'next/image';
import { Search, Heart, BarChart3, Download } from 'lucide-react';

const AboutPage = () => {
    const features = [
        {
            title: "Transparent Healthcare",
            description: "We believe in making healthcare information accessible and transparent for everyone.",
            icon: Search
        },
        {
            title: "Patient-Centric",
            description: "Our platform is built with patients' needs and experiences at the core.",
            icon: Heart
        },
        {
            title: "Data-Driven",
            description: "We use advanced analytics to provide comprehensive doctor insights.",
            icon: BarChart3
        }
    ];

    const stats = [
        { number: "10K+", label: "Doctors Rated" },
        { number: "50K+", label: "Patient Reviews" },
        { number: "95%", label: "User Satisfaction" }
    ];

    return (
        <main className="min-h-screen bg-[#EDF3FF]">
            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/about-hero.jpg"
                        alt="Healthcare professionals"
                        fill
                        className="object-cover opacity-20"
                    />
                </div>
                <div className="relative z-10 text-center px-4">
                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
                        About Trust Your Doctor
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto">
                        Empowering patients with transparent, data-driven insights about healthcare providers
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-bold text-slate-900 mb-6">Our Mission</h2>
                            <p className="text-lg text-slate-600 mb-6">
                                At Trust Your Doctor, we're revolutionizing how patients find and evaluate healthcare providers.
                                Our platform combines comprehensive data analysis with real patient experiences to create detailed
                                reports that help you make informed decisions about your healthcare.
                            </p>
                            <p className="text-lg text-slate-600">
                                We believe that everyone deserves access to transparent, reliable information about their
                                healthcare providers, and we're committed to making that information accessible and easy to understand.
                            </p>
                        </div>
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="/mission-image.jpg"
                                alt="Our mission"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <h2 className="text-4xl font-bold text-slate-900 text-center mb-16">Why Choose Us</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="bg-[#EDF3FF] p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                                <div className="text-4xl mb-4 text-slate-900">
                                    <feature.icon size={48} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-2xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                                <p className="text-slate-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 md:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-5xl font-bold text-slate-900 mb-2">{stat.number}</div>
                                <div className="text-xl text-slate-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-4xl mx-auto text-center px-4 md:px-8">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Find Your Perfect Doctor?</h2>
                    <p className="text-xl text-slate-300 mb-8">
                        Start your journey to better healthcare today with our comprehensive doctor reports.
                    </p>
                    <button className="bg-white text-slate-900 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-100 transition-colors flex items-center gap-2 mx-auto">
                        <Download size={24} />
                        Get Started
                    </button>
                </div>
            </section>
        </main>
    );
};

export default AboutPage; 
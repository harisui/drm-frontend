import React from 'react';
import Link from 'next/link';
import { Search, Heart } from 'lucide-react';
import Image from 'next/image';
import "./header.css"
const Header = () => {
    return (
        <header className="fixed top-0 mb-3 left-0 right-0 z-50 bg-transparent">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="logo text-primary-dark">
                            Logo
                        </Link>
                    </div>

                    {/* Navigation and Icons */}
                    <div className="flex items-center space-x-6">
                        {/* Navigation Links */}
                        <nav className="hidden md:flex space-x-6">
                            <Link href="/about" className="text-primary-dark">
                                About
                            </Link>
                            <Link href="/how-it-works" className="text-primary-dark">
                                How it works
                            </Link>
                        </nav>

                        {/* Icons */}
                        <div className="flex items-center space-x-2">
                            <button className="p-2 text-primary-dark">
                                <Search size={20} />
                            </button>
                            <button className="p-2 text-primary-dark">
                                <Heart size={20} />
                            </button>

                            {/* Language Selector */}
                            <div className="relative">
                                <button className="flex items-center space-x-1 p-2 text-gray-600 hover:text-blue-600 transition-colors">
                                    <Image
                                        src="/flags/us.svg"
                                        alt="English"
                                        width={25}
                                        height={25}
                                        className="rounded-full"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header; 
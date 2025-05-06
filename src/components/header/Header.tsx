"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import Image from 'next/image';
import "./header.css"
import WishlistCounter from '../wishlist/WishlistCounter';
import { useWishlist } from '@/context/WishlistContext';

const Header = () => {
    const { wishlistCount, wishlistItems, removeFromWishlist } = useWishlist();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="mx-auto px-8">
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
                            <Link href="/about" className="text-primary">
                                About
                            </Link>
                            <Link href="/how-it-works" className="text-primary-dark">
                                How it works
                            </Link>
                        </nav>

                        {/* Icons */}
                        <div className="flex items-center  space-x-2">
                            <button className="p-2 text-primary">
                                <Search size={20} />
                            </button>

                            <WishlistCounter
                                count={wishlistCount}
                                wishlistItems={wishlistItems}
                                onRemove={removeFromWishlist}
                            />

                            {/* Language Selector */}
                            <div className="relative">
                                <button className="flex mt-1 items-center space-x-1 p-2 text-gray-600 hover:text-blue-600 transition-colors">
                                    <Image
                                        src="/flags/us.svg"
                                        alt="English"
                                        width={32}
                                        height={32}
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
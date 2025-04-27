"use client";

import React from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import Image from 'next/image';
import "./header.css"
import WishlistCounter from '../wishlist/WishlistCounter';
import { useWishlist } from '@/context/WishlistContext';

const Header = () => {
    const { wishlistCount, wishlistItems, removeFromWishlist } = useWishlist();

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

                            <WishlistCounter
                                count={wishlistCount}
                                wishlistItems={wishlistItems}
                                onRemove={removeFromWishlist}
                            />

                            {/* Language Selector */}
                            <div className="relative">
                                <button className="flex items-center space-x-1 p-2 text-gray-600 hover:text-blue-600 transition-colors">
                                    <Image
                                        src="/flags/us.svg"
                                        alt="English"
                                        width={32}
                                        height={32}
                                        className="rounded-lg border border-gray-200"
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
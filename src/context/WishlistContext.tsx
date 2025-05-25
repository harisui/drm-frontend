"use client"
import { Doctor } from '@/types';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface WishlistItem extends Doctor {
    source: string;
} 

interface WishlistContextType {
    wishlistCount: number;
    wishlistItems: WishlistItem[];
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (id: number) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};

interface WishlistProviderProps {
    children: ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

    // Load from localStorage on initial render
    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            try {
                const parsedItems = JSON.parse(savedWishlist);
                if (Array.isArray(parsedItems)) {
                    setWishlistItems(parsedItems);
                }
            } catch (error) {
                console.error('Failed to parse wishlist from localStorage', error);
            }
        }
    }, []);

    // Save to localStorage whenever wishlist changes
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }, [wishlistItems]);

    const addToWishlist = (item: WishlistItem) => {
        setWishlistItems(prev => {
            if (!prev.some(i => i.id === item.id)) {
                const newItems = [...prev, item];
                return newItems;
            }
            return prev;
        });
    };

    const removeFromWishlist = (id: number) => {
        setWishlistItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        <WishlistContext.Provider value={{
            wishlistCount: wishlistItems.length,
            wishlistItems,
            addToWishlist,
            removeFromWishlist
        }}>
            {children}
        </WishlistContext.Provider>
    );
}; 
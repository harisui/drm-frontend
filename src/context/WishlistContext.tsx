"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WishlistItem {
    id: number;
    name: string;
    specialty: string;
    specialty_url?: string;
    imagePath?: string;
    source: string;
    slug?: string;
    city?: string;
    state?: string;
    rating?: number;
    profileLink?: string;
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

    const addToWishlist = (item: WishlistItem) => {
        setWishlistItems(prev => {
            if (!prev.some(i => i.id === item.id)) {
                return [...prev, item];
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
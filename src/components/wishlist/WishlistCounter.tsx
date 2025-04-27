"use client";

import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';

interface WishlistCounterProps {
    count: number;
    wishlistItems: any[];
    onRemove: (id: number) => void;
}


const WishlistCounter: React.FC<WishlistCounterProps> = ({ count, wishlistItems, onRemove }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-primary-dark hover:text-red-500 transition-colors"
            >
                <Heart size={20} className={count > 0 ? "text-red-500 fill-red-500" : ""} />
                {count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {count}
                    </span>
                )}
            </button>

            {/* Wishlist Dropdown */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Wishlist ({count})</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {wishlistItems.length > 0 ? (
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {wishlistItems.map((item) => (
                                    <div key={item.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={item.imagePath || "/placeholder.svg"}
                                                alt={item.name}
                                                className="w-10 h-10 rounded-lg object-cover"
                                            />
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-500">{item.specialty}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => onRemove(item.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-4 text-gray-500">
                                No items in wishlist
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WishlistCounter; 
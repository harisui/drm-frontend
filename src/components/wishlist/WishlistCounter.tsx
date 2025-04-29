"use client";

import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import './style.css'
interface WishlistCounterProps {
    count: number;
    wishlistItems: any[];
    onRemove: (id: number) => void;
    onGenerateReport: (id: number) => void;
    onGenerateAllReports: () => void;
}

const WishlistCounter: React.FC<WishlistCounterProps> = ({
    count,
    wishlistItems,
    onRemove,
    onGenerateReport,
    onGenerateAllReports
}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative left-2">
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
                <div
                    className="absolute scroll-thin max-h-[300px] overflow-y-auto right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="p-4">
                        {/* <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">Wishlist ({count})</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>
                        </div> */}

                        {wishlistItems.length > 0 ? (
                            <div className="space-y-3 max-h-96 overflow-y-auto">
                                {wishlistItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-start justify-between p-2 hover:bg-gray-50 rounded-lg"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={item.imagePath || "/placeholder.svg"}
                                                alt={item.name}
                                                className="w-10 h-10 rounded-lg object-cover"
                                            />
                                            <div>
                                                <p className="font-medium">{item.name}</p>
                                                <p className="text-sm text-gray-500">{item.specialty}</p>
                                                {/* Flag Display */}
                                                {item.flag && (
                                                    <img
                                                        src={item.flag}
                                                        alt="flag"
                                                        className="w-5 h-3 mt-1"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end space-y-2">
                                            <button
                                                onClick={() => onRemove(item.id)}
                                                className="text-primary"
                                            >
                                                <X size={20} />
                                            </button>
                                            <button
                                                onClick={() => onGenerateReport(item.id)}
                                                className="text-primary bg-[#ADD8FF] px-5 py-1 rounded-md text-sm flex items-center space-x-1"
                                            >
                                                <span>Generate</span>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-4 text-gray-500">
                                No items in wishlist
                            </div>
                        )}

                        {/* Generate All Reports Button */}
                        {wishlistItems.length > 0 && (
                            <div className="pt-4 flex justify-center">
                                <button
                                    onClick={onGenerateAllReports}
                                    className="bg-[#0F152B] text-white px-4 py-2 rounded text-sm"
                                >
                                    Generate All Reports
                                </button>
                            </div>

                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WishlistCounter;

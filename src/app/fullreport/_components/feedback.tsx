'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';

interface Feedback {
    id: number;
    userName: string;
    feedback: string;
    rating: number;
}

const Feedback = () => {
    const [feedbacks] = useState<Feedback[]>([
        {
            id: 1,
            userName: 'John Doe',
            feedback: 'Great experience with the doctor. Very professional and caring.',
            rating: 5,
        },
        {
            id: 2,
            userName: 'Jane Smith',
            feedback: 'The doctor was very thorough in explaining everything.',
            rating: 5,
        },
        {
            id: 3,
            userName: 'Mike Johnson',
            feedback: 'Excellent service and very knowledgeable.',
            rating: 1,
        },
    ]);

    // Get avatar color based on position
    const getAvatarColor = (index: number) => {
        if (index < 2) return 'bg-[#ADD8FF] border-[#ADD8FF] text-white';
        return 'bg-[#FF7664] border-[#FF7664] text-white';
    };

    // Get card background based on rating
    const getCardBgColor = (rating: number) => {
        if (rating >= 4.5) return 'border border-[#ADD8FF]';
        if (rating >= 3.5) return 'border border-[#B8E1FF]';
        if (rating >= 2.5) return 'bg-[#FFF7E6] border border-[#FFE4B8]';
        return 'bg-[#FFF2F2] border border-[#FFCCCC]';
    };

    const renderStars = (rating: number) => {
        return Array(5)
            .fill(0)
            .map((_, index) => (
                <Star
                    key={index}
                    className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
            ));
    };

    return (
        <div className="w-full p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                {feedbacks.map((feedback, index) => (
                    <div
                        key={feedback.id}
                        className={`rounded-lg p-2 transition-all ${getCardBgColor(feedback.rating)}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`flex items-center justify-center w-20 h-20 border ${getAvatarColor(index)} font-medium`}>
                                <span className="flex text-2xl items-center justify-center w-full h-full">
                                    {feedback.userName.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">{feedback.userName}</h3>
                                    <div className="flex">{renderStars(feedback.rating)}</div>
                                </div>
                                <p className="text-gray-600 ">{feedback.feedback}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feedback;
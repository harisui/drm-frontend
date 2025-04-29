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
            rating: 4,
        },
        {
            id: 3,
            userName: 'Mike Johnson',
            feedback: 'Excellent service and very knowledgeable.',
            rating: 5,
        },
        {
            id: 4,
            userName: 'Sarah Williams',
            feedback: 'Very satisfied with the consultation.',
            rating: 4,
        },
    ]);

    const renderStars = (rating: number) => {
        return Array(5)
            .fill(0)
            .map((_, index) => (
                <Star
                    key={index}
                    className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                        }`}
                />
            ));
    };

    return (
        <div className="w-full p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                {feedbacks.map((feedback) => (
                    <div
                        key={feedback.id}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">{feedback.userName}</h3>
                            <div className="flex">{renderStars(feedback.rating)}</div>
                        </div>
                        <p className="text-gray-600">{feedback.feedback}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feedback;

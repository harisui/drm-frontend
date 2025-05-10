'use client';

import { Star } from 'lucide-react';

interface Comment {
    comment: string;
    date?: string;
    author?: string;
    type: 'positive' | 'negative';
}

interface FeedbackProps {
    positiveComments?: {
        first?: { comment: string; date?: string; author?: string };
        second?: { comment: string; date?: string; author?: string };
    };
    negativeComment?: { comment: string; date?: string; author?: string };
    rating: number;
}

const Feedback = ({ positiveComments, negativeComment, rating }: FeedbackProps) => {
    // Process comments into array
    const processComments = () => {
        const comments: Comment[] = [];
        
        if (positiveComments?.first) {
            comments.push({ ...positiveComments.first, type: 'positive' });
        }
        if (positiveComments?.second) {
            comments.push({ ...positiveComments.second, type: 'positive' });
        }
        if (negativeComment) {
            comments.push({ ...negativeComment, type: 'negative' });
        }
        
        return comments;
    };

    const comments = processComments();

    // Get avatar color based on comment type
    const getAvatarColor = (type: 'positive' | 'negative') => {
        return type === 'positive' 
            ? 'bg-[#ADD8FF] border-[#ADD8FF] text-white' 
            : 'bg-[#FF7664] border-[#FF7664] text-white';
    };

    // Get card background based on comment type
    const getCardBgColor = (type: 'positive' | 'negative') => {
        return type === 'positive' 
            ? 'border border-[#ADD8FF]' 
            : 'bg-[#FFF2F2] border border-[#FFCCCC]';
    };

    const renderStars = (type: 'positive' | 'negative') => {
        const rating = type === 'positive' ? 5 : 1;
        return Array(5)
            .fill(0)
            .map((_, index) => (
                <Star
                    key={index}
                    className={`w-4 h-4 ${index < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
            ));
    };

    if (comments.length === 0) {
        return (
            <div className="w-full p-4 text-center text-gray-500">
                No feedback available
            </div>
        );
    }

    return (
        <div className="w-full p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                {comments.map((comment, index) => (
                    <div
                        key={index}
                        className={`rounded-lg p-2 transition-all ${getCardBgColor(comment.type)}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`flex items-center justify-center w-20 h-20 border ${getAvatarColor(comment.type)} font-medium`}>
                                <span className="flex text-2xl items-center justify-center w-full h-full">
                                    {comment.author?.charAt(0).toUpperCase() || 'A'}
                                </span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">
                                        {comment.author || 'Anonymous'}
                                    </h3>
                                    <div className="flex">
                                        {renderStars(comment.type)}
                                    </div>
                                </div>
                                <p className="text-gray-600">{comment.comment}</p>
                                {comment.date && (
                                    <p className="text-sm text-gray-400 mt-2">
                                        {comment.date}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feedback;
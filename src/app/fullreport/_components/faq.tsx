import React from "react";
import { Search, Send, Circle } from "lucide-react";

const FAQs = () => {
    const sampleFAQs = [
        {
            question: "How many years of experience does the doctor have?",
        },
        {
            question: "Anything to note about the doctor?",
        },
        {
            question: "What is the doctor's specialisation?",
        }
    ];

    return (
        <main className="max-w-4xl mx-auto p-6">
            <h1 className="text-primary text-4xl text-center font-semibold mb-8">Ask Anything about the Doctor</h1>
            <div className="flex items-center gap-1">
                <Circle className="w-4 h-4  fill-black" />
                <p className="text-primary font-semibold">Surgeon Verticle</p>
            </div>
            <p className="text-sm text-primary ml-4">If you still have any questions about the doctor, just type them here, and I will look for an answer for you!</p>
            {/* FAQs List */}
            <div className="mt-32">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sampleFAQs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white mb-2 rounded-full bg-[#F7F9FB] flex items-center justify-center"
                        >
                            <p className="text-primary text-sm text-center px-2">
                                {faq.question}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative flex items-center gap-3 mt-3">
                <input
                    type="text"
                    placeholder="Search FAQs..."
                    className="w-full p-4 pl-12 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <div className="flex items-center justify-center">
                    <div className="w-10h-10 bg-black rounded-full flex items-center justify-center">
                        <div className="bg-primary rounded-full p-3 flex items-center justify-center">
                            <Send className="text-white cursor-pointer" size={20} />
                        </div>
                    </div>
                </div>
            </div>

        </main>
    );
};

export default FAQs;
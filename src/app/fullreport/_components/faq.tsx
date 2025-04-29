import React from "react";
import { Search, Send } from "lucide-react";

const FAQs = () => {
    const sampleFAQs = [
        {
            question: "What are the doctor's office hours?",
            answer: "The doctor is available Monday to Friday from 9:00 AM to 5:00 PM."
        },
        {
            question: "Does the doctor accept insurance?",
            answer: "Yes, we accept most major insurance providers. Please contact our office for specific details."
        },
        {
            question: "How can I schedule an appointment?",
            answer: "You can schedule an appointment by calling our office or using our online booking system."
        }
    ];

    return (
        <main className="max-w-4xl mx-auto p-6">
            <h1 className="text-primary text-4xl text-center font-semibold mb-8">Ask Anything about the Doctor</h1>

            {/* Search Bar */}
            <div className="relative mb-8">
                <input
                    type="text"
                    placeholder="Search FAQs..."
                    className="w-full p-4 pl-12 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <Send className="absolute right-4 top-1/2 transform -translate-y-1/2 text-primary cursor-pointer" size={20} />
            </div>

            {/* FAQs List */}
            <div className="space-y-6">
                {sampleFAQs.map((faq, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
                        <p className="text-gray-600">{faq.answer}</p>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default FAQs;
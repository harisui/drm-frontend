"use client"
import React, { useState, useRef, useEffect } from "react";
import { Search, Send, Circle } from "lucide-react";

interface FAQsProps {
  params: {
    _spt: string;
    _nme: string;
    _ct: string;
    _st: string;
    _rt: number;
  };
  report: {
    insights?: string[];
    summary?: string;
    totalReviews?: number;
    yearlyData?: any[];
  };
}

const FAQs = ({ params, report }: FAQsProps) => {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'bot', content: string }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const sampleFAQs = [
    "Where is the doctor based?",
    "What are patients saying?",
    "What is the doctor's specialisation?",
  ];

  const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
    const container = messagesContainerRef.current;
    if (container) {
      const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100;
      if (isNearBottom || behavior === 'auto') {
        requestAnimationFrame(() => {
          messagesEndRef.current?.scrollIntoView({
            behavior,
            block: 'nearest',
            inline: 'start'
          });
        });
      }
    }
  };

  useEffect(() => {
    scrollToBottom('auto');
  }, []);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    scrollToBottom(lastMessage?.role === 'bot' ? 'smooth' : 'auto');
  }, [messages]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputMessage.trim() || isBotTyping) return;

    const userMessage = inputMessage;
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInputMessage('');
    setIsBotTyping(true);

    let response = '';
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('name')) {
      response = `The doctor's name is ${params._nme}.`;
    } else if (lowerMessage.includes('special') || lowerMessage.includes('type')) {
      response = `Specialization: ${params._spt.replace(/-/g, ' ')}`;
    } else if (lowerMessage.includes('location') || lowerMessage.includes('based')) {
      response = `Practice location: ${params._ct}, ${params._st}`;
    } else if (lowerMessage.includes('rating') || lowerMessage.includes('review')) {
      response = `Patient Reviews:\n\n• Average rating: ${params._rt}/5\n• Total reviews: ${report?.totalReviews || '0'}\n\nRecent feedback includes comments about ${report?.insights?.slice(0, 2).join(' and ') || 'their practice'}`;
    } else if (lowerMessage.includes('insight')) {
      response = `Key insights from patient reviews:\n\n${report?.insights?.map(i => `• ${i}`).join('\n') || 'Not available'}`;
    } else if (lowerMessage.includes('summary')) {
      response = `Professional summary: ${report?.summary || 'Not available'}`;
    } else {
      response = "I can tell you about:\n• The doctor's name and specialty\n• Practice location\n• Patient reviews and ratings\n• Key insights from feedback\n• Professional summary";
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'bot', content: response }]);
      setIsBotTyping(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
    const input = document.querySelector('input[type="text"]') as HTMLInputElement;
    input?.focus();
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-primary text-4xl text-center font-semibold mb-8">
        Ask About Dr. {params._nme}
      </h1>
      
      <div className="flex items-center gap-1 mb-4">
        <Circle className="w-4 h-4 fill-black" />
        <p className="text-primary font-semibold">Doctor Information</p>
      </div>

      <div 
        ref={messagesContainerRef}
        className="h-96 overflow-y-auto mb-6 border rounded-xl p-4 bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
      >
        {messages.map((msg, i) => (
          <div key={i} className={`mb-4 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block max-w-[90%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-br-none' 
                : 'bg-gray-50 text-gray-800 border border-gray-200 rounded-bl-none shadow-sm'
            }`}>
              <div className="whitespace-pre-line">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isBotTyping && (
          <div className="text-left mb-4">
            <div className="inline-block max-w-[90%] p-4 rounded-2xl bg-gray-50 text-gray-800 border border-gray-200 rounded-bl-none shadow-sm">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
        {sampleFAQs.map((question, index) => (
          <button
            key={index}
            onClick={() => handleQuickQuestion(question)}
            className="bg-[#F7F9FB] hover:bg-gray-100 rounded-full p-3 transition-colors"
          >
            <p className="text-primary text-sm">{question}</p>
          </button>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="relative">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Ask about the doctor..."
          className="w-full p-4 pl-12 pr-16 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={isBotTyping}
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary rounded-full p-3 hover:bg-blue-700 transition-colors disabled:opacity-50"
          disabled={!inputMessage.trim() || isBotTyping}
        >
          <Send className="text-white" size={20} />
        </button>
      </form>
    </main>
  );
};

export default FAQs;
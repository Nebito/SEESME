
import React, { useState, useRef, useEffect } from 'react';
import { getGeologyAssistant } from '../services/geminiService';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hello! I am your SEESME Geological Assistant. How can I help you today regarding Eritrean earth sciences or mining?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const botResponse = await getGeologyAssistant(userMsg);
    setMessages(prev => [...prev, { role: 'bot', text: botResponse || 'I encountered an issue.' }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60]">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#004A26] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#00381d] transition-transform active:scale-90"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-[#004A26] p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">G</div>
              <div>
                <h3 className="font-bold text-sm">GeoAssistant AI</h3>
                <p className="text-[10px] text-white/70">Powered by SEESME & Gemini</p>
              </div>
            </div>
          </div>

          <div 
            ref={scrollRef}
            className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-[#004A26] text-white rounded-br-none' 
                    : 'bg-white text-slate-700 shadow-sm border border-slate-200 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-400 p-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-200 text-xs italic">
                  Analyzing geological data...
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-200 flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask about Eritrean geology..."
              className="flex-grow px-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-[#004A26]"
            />
            <button 
              onClick={handleSend}
              className="p-2 bg-[#004A26] text-white rounded-full hover:bg-[#00381d]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;

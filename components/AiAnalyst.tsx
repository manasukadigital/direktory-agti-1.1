import React, { useState, useRef, useEffect } from 'react';
import { analyzeDatabase } from '../services/geminiService';
import { Bot, Send, Loader2, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Language } from '../types';
import { translations } from '../translations';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

interface AiAnalystProps {
  language: Language;
}

const AiAnalyst: React.FC<AiAnalystProps> = ({ language }) => {
  const t = translations[language].ai;
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset intro message when language changes
  useEffect(() => {
    setMessages([{
      id: 'intro',
      role: 'ai',
      content: t.intro
    }]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    const userQuery = query;
    setQuery('');
    setIsLoading(true);

    // Add User Message
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userQuery }]);

    // Call Gemini
    const result = await analyzeDatabase(userQuery, language);

    // Add AI Response
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', content: result }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-slate-50">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex gap-4 max-w-3xl mx-auto ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'ai' && (
              <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
            )}
            
            <div className={`rounded-2xl p-5 shadow-sm max-w-[80%] ${
              msg.role === 'user' 
                ? 'bg-brand-700 text-white rounded-tr-none' 
                : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
            }`}>
              {msg.role === 'ai' ? (
                <div className="prose prose-sm prose-blue max-w-none">
                   <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <p>{msg.content}</p>
              )}
            </div>

            {msg.role === 'user' && (
              <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-slate-500" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-4 max-w-3xl mx-auto">
             <div className="w-10 h-10 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-6 h-6 text-white" />
              </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-brand-600" />
              <span className="text-sm text-slate-500">{t.analyzing}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto relative">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.placeholder}
              className="w-full pl-6 pr-14 py-4 bg-slate-100 border-transparent focus:bg-white focus:border-brand-300 focus:ring-4 focus:ring-brand-100 rounded-xl shadow-inner transition-all text-slate-800 placeholder-slate-400"
            />
            <button 
              type="submit"
              disabled={!query.trim() || isLoading}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:hover:bg-brand-600 transition-colors shadow-md"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </form>
          <p className="text-center text-xs text-slate-400 mt-2">
            {t.poweredBy}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AiAnalyst;
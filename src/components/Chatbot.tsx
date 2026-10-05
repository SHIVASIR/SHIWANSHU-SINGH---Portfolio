import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  RotateCcw, 
  Zap, 
  BrainCircuit, 
  Briefcase, 
  Code2, 
  UserCheck, 
  ChevronDown,
  Loader2,
  MessageSquare,
  MinusCircle
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

// Available Chatbot Roles / Personas
const BOT_ROLES = [
  {
    id: 'career',
    name: 'Recruiter & Career Guide',
    icon: Briefcase,
    badge: 'Popular',
    description: 'Portfolio Q&A, experience, and candidate matching',
    systemInstruction: 'You are Shiwanshu Kumar Singh\'s AI Career Assistant and Recruiter Guide. Your task is to help recruiters, hiring managers, and visitors learn about Shiwanshu\'s experience in Cloud Computing, Machine Learning, Data Science, B.Tech education, and software projects. Highlight his achievements such as Smart India Hackathon (SIH 2025) Team Lead, 240+ LeetCode solved, and Data Science internship. Be professional, enthusiastic, concise, and structured.',
  },
  {
    id: 'tech',
    name: 'Cloud & ML Architect',
    icon: BrainCircuit,
    badge: 'Technical',
    description: 'Deep dives into ML models, fraud detection, and Cloud architecture',
    systemInstruction: 'You are a Senior Cloud & Machine Learning Architect AI. Answer technical questions regarding Shiwanshu\'s projects like Credit Card Fraud Detection (LightGBM, Random Forest, SMOTE), Cloud-Native Inference Engine, Docker containers, and Cloud infrastructure with technical depth and clarity.',
  },
  {
    id: 'coding',
    name: 'DSA & Coding Mentor',
    icon: Code2,
    badge: 'Coding',
    description: 'Algorithms, LeetCode problem breakdowns, and code analysis',
    systemInstruction: 'You are an expert Data Structures & Algorithms Mentor. Help visitors analyze coding concepts, C++ / Python algorithms, problem-solving strategies, and technical interview questions.',
  },
];

// Available Model Modes
const MODEL_MODES = [
  {
    id: 'gemini-3.5-flash',
    name: 'General',
    speed: 'Balanced',
    icon: Sparkles,
    color: 'text-blue-400',
  },
  {
    id: 'gemini-3.1-flash-lite',
    name: 'Fast',
    speed: 'Ultra Fast',
    icon: Zap,
    color: 'text-amber-400',
  },
  {
    id: 'gemini-3.1-pro-preview',
    name: 'Complex Reasoning',
    speed: 'Deep Analysis',
    icon: BrainCircuit,
    color: 'text-purple-400',
  },
];

const SUGGESTED_PROMPTS = [
  "What are Shiwanshu's top Machine Learning projects?",
  "Tell me about his role as SIH 2025 Team Lead.",
  "What cloud and programming technologies does Shiwanshu know?",
  "Summarize Shiwanshu's education and coding stats.",
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'model',
      text: "👋 Hi! I'm **Shiwanshu's AI Career Assistant**. Ask me anything about Shiwanshu's skills, projects in Machine Learning & Cloud, SIH 2025 leadership, or education!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState(BOT_ROLES[0]);
  const [selectedModel, setSelectedModel] = useState(MODEL_MODES[0]);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    setErrorText(null);

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, text: m.text })),
          systemInstruction: selectedRole.systemInstruction,
          model: selectedModel.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response from Gemini.');
      }

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.text || 'I apologize, but I could not process that request.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorText(err.message || 'Something went wrong. Please check your network connection.');
      const errorMessage: Message = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: `⚠️ **Error**: ${err.message || 'Could not fetch response. Please try again.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: `Conversation cleared. Operating as **${selectedRole.name}** using **${selectedModel.name}**. How can I help you?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setErrorText(null);
  };

  const RoleIcon = selectedRole.icon;
  const ModelIcon = selectedModel.icon;

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            id="open-chat-btn"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center space-x-2.5 px-4 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-full shadow-2xl shadow-blue-500/30 border border-blue-400/30 transition-all duration-300"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <Bot className="h-5 w-5 text-white" />
            <span className="font-semibold text-sm tracking-wide hidden sm:inline">Ask AI Assistant</span>
            <span className="bg-white/20 text-[10px] font-mono px-2 py-0.5 rounded-full uppercase tracking-wider">Gemini</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main Chat Drawer / Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-[calc(100vw-2.5rem)] sm:w-[420px] h-[580px] max-h-[82vh] bg-slate-900/95 dark:bg-[#0c0d12]/95 backdrop-blur-xl border border-zinc-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-zinc-100"
          >
            {/* Header */}
            <div className="p-3.5 sm:p-4 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between relative z-20">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h3 className="text-sm font-bold text-zinc-100 leading-none">Shiwanshu AI Assistant</h3>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono uppercase bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-md">
                      Live
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 flex items-center">
                    Powered by Gemini AI • Multi-turn
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  id="clear-chat-btn"
                  onClick={handleClearHistory}
                  title="Clear conversation"
                  className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button
                  id="close-chat-btn"
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>

            {/* Controls Bar (Role Selector & Model Mode) */}
            <div className="px-3.5 py-2 bg-zinc-950/60 border-b border-zinc-800/80 flex items-center justify-between text-xs relative z-20">
              {/* Role Selector */}
              <div className="relative">
                <button
                  id="select-role-btn"
                  onClick={() => {
                    setShowRoleDropdown(!showRoleDropdown);
                    setShowModelDropdown(false);
                  }}
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-zinc-800/70 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/50 transition-colors"
                >
                  <RoleIcon className="h-3.5 w-3.5 text-blue-400" />
                  <span className="truncate max-w-[120px] font-medium text-[11px]">{selectedRole.name}</span>
                  <ChevronDown className="h-3 w-3 text-zinc-400" />
                </button>

                {/* Role Dropdown */}
                <AnimatePresence>
                  {showRoleDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute left-0 mt-1 w-64 p-1.5 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl space-y-1 z-30"
                    >
                      <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                        Select Chatbot Persona
                      </div>
                      {BOT_ROLES.map(role => {
                        const Icon = role.icon;
                        const isSelected = role.id === selectedRole.id;
                        return (
                          <button
                            key={role.id}
                            onClick={() => {
                              setSelectedRole(role);
                              setShowRoleDropdown(false);
                            }}
                            className={`w-full text-left p-2 rounded-lg flex items-start space-x-2.5 transition-colors ${
                              isSelected ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' : 'hover:bg-zinc-800/80 text-zinc-300'
                            }`}
                          >
                            <Icon className="h-4 w-4 text-blue-400 mt-0.5 shrink-0" />
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-xs">{role.name}</span>
                                <span className="text-[9px] px-1.5 py-0.2 bg-zinc-800 text-zinc-400 rounded-full">{role.badge}</span>
                              </div>
                              <p className="text-[10px] text-zinc-400 leading-tight mt-0.5">{role.description}</p>
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Model Mode Selector */}
              <div className="relative">
                <button
                  id="select-model-btn"
                  onClick={() => {
                    setShowModelDropdown(!showModelDropdown);
                    setShowRoleDropdown(false);
                  }}
                  className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-zinc-800/70 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/50 transition-colors"
                >
                  <ModelIcon className={`h-3.5 w-3.5 ${selectedModel.color}`} />
                  <span className="font-mono text-[11px] font-medium">{selectedModel.name}</span>
                  <ChevronDown className="h-3 w-3 text-zinc-400" />
                </button>

                {/* Model Dropdown */}
                <AnimatePresence>
                  {showModelDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute right-0 mt-1 w-56 p-1.5 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl space-y-1 z-30"
                    >
                      <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
                        Select Model Speed
                      </div>
                      {MODEL_MODES.map(m => {
                        const Icon = m.icon;
                        const isSelected = m.id === selectedModel.id;
                        return (
                          <button
                            key={m.id}
                            onClick={() => {
                              setSelectedModel(m);
                              setShowModelDropdown(false);
                            }}
                            className={`w-full text-left p-2 rounded-lg flex items-center justify-between transition-colors ${
                              isSelected ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' : 'hover:bg-zinc-800/80 text-zinc-300'
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <Icon className={`h-3.5 w-3.5 ${m.color}`} />
                              <span className="font-mono text-xs">{m.name}</span>
                            </div>
                            <span className="text-[10px] text-zinc-500 font-sans">{m.speed}</span>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 selection:bg-blue-500/30 scrollbar-thin scrollbar-thumb-zinc-800">
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-start space-x-2.5 max-w-[85%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      {/* Avatar */}
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold ${
                        isUser 
                          ? 'bg-blue-600 text-white shadow-md' 
                          : 'bg-zinc-800 text-blue-400 border border-zinc-700'
                      }`}>
                        {isUser ? <UserCheck className="h-3.5 w-3.5" /> : <Bot className="h-4 w-4" />}
                      </div>

                      {/* Bubble */}
                      <div>
                        <div className={`p-3 rounded-2xl text-xs sm:text-xs leading-relaxed whitespace-pre-wrap shadow-sm ${
                          isUser
                            ? 'bg-blue-600 text-white rounded-tr-none'
                            : 'bg-zinc-800/90 text-zinc-200 border border-zinc-700/60 rounded-tl-none'
                        }`}>
                          {msg.text}
                        </div>
                        <span className={`text-[9px] text-zinc-500 mt-1 block px-1 ${isUser ? 'text-right' : 'text-left'}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start items-center space-x-2.5"
                >
                  <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-blue-400">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="p-3 bg-zinc-800/90 border border-zinc-700/60 rounded-2xl rounded-tl-none flex items-center space-x-2 text-xs text-zinc-400">
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" />
                    <span>Gemini is thinking ({selectedModel.name})...</span>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggested Prompts (when message count is low) */}
            {messages.length <= 2 && !isLoading && (
              <div className="px-3 py-2 bg-zinc-950/40 border-t border-zinc-800/50 flex items-center space-x-1.5 overflow-x-auto scrollbar-none">
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(prompt)}
                    className="shrink-0 px-2.5 py-1 text-[10px] bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/50 rounded-full transition-colors truncate max-w-[200px]"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            )}

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-zinc-900 border-t border-zinc-800 flex items-center space-x-2 relative z-20"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask ${selectedRole.name}...`}
                disabled={isLoading}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-blue-500/80 transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white rounded-xl transition-colors shadow-md shrink-0 flex items-center justify-center"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

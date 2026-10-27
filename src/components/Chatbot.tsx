"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  X, 
  Send, 
  Bot, 
  Sparkles, 
  AlertCircle
} from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  source?: string;
}

let messageCounter = 1;
const generateMsgId = (prefix: string) => `${prefix}-${++messageCounter}`;

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-1",
      sender: "bot",
      text: "Namaste! I am the GovInnovate Civic Assistant. How can I help you navigate public innovation challenges, DPIIT startup relaxations, or the 90-day sandbox pilot?",
      timestamp: "Just now",
      source: "GovInnovate Platform",
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMsgId = generateMsgId("usr");
    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: "user",
      text: textToSend,
      timestamp: currentTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!messageText) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          conversationHistory: messages.slice(-4).map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          })),
        }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: generateMsgId("bot"),
        sender: "bot",
        text: data.reply || "I am currently unable to fetch a response. Please try again later.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        source: data.source,
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: generateMsgId("bot"),
          sender: "bot",
          text: "Communication error. Falling back: For GFR startup guidelines, refer to Rule 149 and 170(i) for turnover and experience exemptions.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          source: "Offline Recovery",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickChips = [
    "What are GFR 149/170 startup exemptions?",
    "How does the 90-day sandbox pilot work?",
    "Explain the 5-pillar scoring formula",
    "How to switch between Real and Demo mode?",
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#0F3854] text-white rounded-full shadow-xl hover:bg-[#1D4E72] hover:scale-105 transition-all duration-200 border border-[#1D4E72]"
          aria-label="Open GovInnovate Civic Assistant"
        >
          <div className="relative">
            <Bot className="h-5 w-5 text-emerald-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span className="text-xs font-semibold tracking-wide">Civic Assistant</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[92vw] sm:w-[410px] h-[550px] max-h-[85vh] bg-white rounded-xl shadow-2xl border border-[#E2DED6] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-[#0F3854] text-white p-4 flex items-center justify-between border-b border-[#1D4E72]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-emerald-400">
                <Bot className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-white tracking-wide">Civic Assistant</h4>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-900/60 text-emerald-300 border border-emerald-700">
                    AI Knowledge
                  </span>
                </div>
                <p className="text-[10px] text-slate-300">GFR 2017 & Sandbox Workflow Guide</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Assistant"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Disclaimer */}
          <div className="bg-[#FEF7EA] px-3 py-1.5 border-b border-[#F6E1B9] text-[10px] text-[#8A5B0B] flex items-center gap-1.5">
            <AlertCircle className="h-3 w-3 shrink-0" />
            <span>Assists navigation & statutory rules. Not a legal procurement decision.</span>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAF8F5] text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-lg p-3 text-xs leading-relaxed whitespace-pre-wrap ${
                    m.sender === "user"
                      ? "bg-[#0F3854] text-white rounded-br-none shadow-xs"
                      : "bg-white text-[#141F2B] border border-[#E2DED6] rounded-bl-none shadow-2xs"
                  }`}
                >
                  {m.text}
                </div>
                <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-[#7E8B97] font-mono">
                  <span>{m.timestamp}</span>
                  {m.source && (
                    <>
                      <span>•</span>
                      <span className="text-emerald-700 font-medium">{m.source}</span>
                    </>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-[#5B6A78] bg-white p-2.5 rounded-lg border border-[#E2DED6] w-fit">
                <Sparkles className="h-3.5 w-3.5 text-emerald-600 animate-spin" />
                <span>Searching verified procurement guidelines...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Prompt Chips */}
          <div className="px-3 py-2 bg-white border-t border-[#EDE9E1] overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#F2EFEB] hover:bg-[#E7E3DC] text-[10px] font-medium text-[#0F3854] border border-[#E2DED6] transition-colors shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-[#E2DED6]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about GFR rules, 90-day pilots, or scoring..."
                className="flex-1 px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E2DED6] rounded-md focus:outline-none focus:border-[#0F3854] focus:bg-white transition-colors"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2 rounded bg-[#0F3854] text-white hover:bg-[#1D4E72] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

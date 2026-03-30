"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect } from "react";

const suggestions = [
  "Tell me about Stylist AI project",
  "What's his tech stack?",
  "HID Global experience?",
  "Download resume",
];

const quickChips = ["Skills overview", "GitHub stats", "Contact info", "Recent work"];

export default function ChatPage() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
    }),
    messages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hey! I'm Dhaanish's AI assistant. I've been trained on his full professional history, technical expertise, and project portfolio. How can I help you explore his work today?",
        parts: [{ type: "text" as const, text: "Hey! I'm Dhaanish's AI assistant. I've been trained on his full professional history, technical expertise, and project portfolio. How can I help you explore his work today?" }],
      },
    ],
  });

  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    sendMessage({ text });
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="flex h-screen overflow-hidden pt-[73px]">
      {/* Left Sidebar */}
      <aside className="hidden lg:flex flex-col h-full w-64 bg-surface-container-lowest border-r border-outline-variant/20 p-4 shrink-0">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded bg-primary-container/20 flex items-center justify-center border border-primary/30">
            <span className="material-symbols-outlined text-primary">memory</span>
          </div>
          <div>
            <div className="text-sm font-bold text-primary font-[family-name:var(--font-headline)]">Dhaanish Ahamed</div>
            <div className="text-[10px] uppercase tracking-tighter text-on-surface-variant">AI Systems Architect</div>
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <div className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4 px-2">Core Modules</div>
          {[
            { icon: "analytics", label: "System Info", active: true },
            { icon: "memory", label: "AI Status", active: false },
            { icon: "lan", label: "Network", active: false },
            { icon: "terminal", label: "Logs", active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`flex items-center gap-3 p-3 rounded w-full text-left transition-all duration-300 ${
                item.active
                  ? "text-primary-container bg-primary-container/10 border-l-4 border-primary-container"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-white/5"
              }`}
            >
              <span className="material-symbols-outlined text-sm">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-outline-variant/10 space-y-1">
          <button className="flex items-center gap-3 p-2 text-on-surface-variant hover:text-on-surface text-xs w-full">
            <span className="material-symbols-outlined text-sm">settings</span>
            <span>Settings</span>
          </button>
          <button className="flex items-center gap-3 p-2 text-on-surface-variant hover:text-on-surface text-xs w-full">
            <span className="material-symbols-outlined text-sm">help</span>
            <span>Support</span>
          </button>
        </div>
      </aside>

      {/* Main Chat */}
      <section className="flex-1 flex flex-col bg-surface relative">
        {/* Chat Header */}
        <header className="flex items-center justify-between px-8 py-4 border-b border-outline-variant/10 glass-panel z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-primary-container/40 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(0,212,255,0.2)] bg-surface-container-high">
                <span className="material-symbols-outlined text-primary text-2xl">smart_toy</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-tertiary rounded-full border-2 border-surface animate-pulse" />
            </div>
            <div>
              <h1 className="font-[family-name:var(--font-headline)] text-lg font-bold tracking-tight text-primary">DHAANISH.AI</h1>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">Ask me anything...</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => window.location.reload()}
              className="p-2 text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-10 max-w-[1000px] mx-auto w-full">
          {messages.map((msg, i) => {
            const textContent = msg.parts
              ?.filter((p: { type: string }) => p.type === "text")
              .map((p: { type: string; text?: string }) => p.text)
              .join("") || "";
            return (
              <div key={msg.id}>
                {msg.role === "assistant" ? (
                  <div className="flex flex-col gap-4 max-w-[85%]">
                    <div className="ai-accent-bar pl-6">
                      <p className="text-on-surface leading-relaxed whitespace-pre-wrap">{textContent}</p>
                    </div>
                    {i === 0 && (
                      <div className="flex flex-wrap gap-2 mt-2 pl-6">
                        {suggestions.map((s) => (
                          <button
                            key={s}
                            onClick={() => handleSend(s)}
                            className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-outline-variant/30 text-primary hover:bg-primary/10 transition-all"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <div className="bg-secondary-container text-white px-6 py-4 rounded-xl rounded-tr-none shadow-lg shadow-secondary-container/20 max-w-[70%]">
                      <p className="font-medium">{textContent}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-center gap-2 pl-6 pt-4">
              <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
              <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <footer className="p-6 md:p-8 bg-surface-container-lowest border-t border-outline-variant/10">
          <div className="max-w-[1000px] mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickChips.map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSend(chip)}
                  className="text-[10px] font-bold uppercase tracking-tight px-3 py-1 bg-surface-container-high rounded border border-outline-variant/10 text-on-surface-variant hover:text-primary hover:border-primary/30 transition-all"
                >
                  {chip}
                </button>
              ))}
            </div>
            <form
              onSubmit={handleSubmit}
              className="relative group"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your command or question..."
                className="w-full bg-surface-container py-4 pl-6 pr-24 rounded-lg border-b-2 border-outline-variant/20 focus:border-primary focus:ring-0 transition-all text-sm placeholder-on-surface-variant/40 outline-none"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                <button type="button" className="text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-xl">mic</span>
                </button>
                <button
                  type="submit"
                  className="bg-primary-container text-on-primary font-bold p-2 rounded hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all"
                >
                  <span className="material-symbols-outlined text-xl">send</span>
                </button>
              </div>
            </form>
          </div>
        </footer>
      </section>

      {/* Right Sidebar */}
      <aside className="hidden xl:flex flex-col w-72 bg-surface-container-lowest border-l border-outline-variant/20 p-6">
        <div className="mb-10">
          <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-6">Quick Links</h3>
          <div className="space-y-4">
            {[
              { icon: "link", label: "LinkedIn Profile", href: "https://www.linkedin.com/in/dhaanish-ahamed-1b950624a/" },
              { icon: "code", label: "GitHub Repository", href: "https://github.com/dhaan-ish" },
              { icon: "mail", label: "Email Dhaanish", href: "mailto:dhaanishahamed7@gmail.com" },
            ].map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded border border-outline-variant/20 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">{link.icon}</span>
                </div>
                <span className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors">{link.label}</span>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-6">Topics</h3>
          <div className="flex flex-wrap gap-2">
            {["Projects", "AI/ML", "HID Global", "Experience", "Skills", "Education", "Tech Stack"].map((topic) => (
              <button
                key={topic}
                onClick={() => handleSend(`Tell me about ${topic}`)}
                className="px-3 py-1.5 bg-surface-container text-on-surface-variant text-[10px] font-bold rounded-sm border border-outline-variant/20 hover:text-primary hover:border-primary/20 transition-all"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-auto bg-primary/5 p-4 rounded-lg border border-primary/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-sm">info</span>
            <span className="text-[10px] font-bold text-primary uppercase">Model Confidence</span>
          </div>
          <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[98%]" />
          </div>
          <div className="mt-2 text-[9px] text-on-surface-variant italic">Connect backend for live responses.</div>
        </div>
      </aside>
    </div>
  );
}

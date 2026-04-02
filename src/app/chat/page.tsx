"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  // Audio recording state
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioLevels, setAudioLevels] = useState<number[]>(new Array(20).fill(0));
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSoundTimeRef = useRef<number>(Date.now());
  const streamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const csrfTokenRef = useRef<string>("");

  // Fetch CSRF token on mount
  useEffect(() => {
    fetch("/api/csrf")
      .then((res) => res.json())
      .then((data) => {
        csrfTokenRef.current = data.csrfToken;
      })
      .catch(console.error);
  }, []);

  const securityHeaders: Record<string, string> = {
    "x-internal-key": process.env.NEXT_PUBLIC_INTERNAL_KEY || "",
  };

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({
      api: "/api/chat",
      headers: () => ({
        ...securityHeaders,
        "x-csrf-token": csrfTokenRef.current,
      }),
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

  const handleSend = useCallback((text: string) => {
    if (!text.trim()) return;
    sendMessage({ text });
    setInput("");
  }, [sendMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const stopRecording = useCallback(async () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      
      setAudioLevels(new Array(20).fill(0));
    }
  }, [isRecording]);

  const processAudio = useCallback(async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      const response = await fetch("/api/speech", {
        method: "POST",
        headers: {
          "x-internal-key": process.env.NEXT_PUBLIC_INTERNAL_KEY || "",
          "x-csrf-token": csrfTokenRef.current,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to transcribe audio");
      }

      const data = await response.json();
      if (data.text && data.text.trim()) {
        handleSend(data.text);
      }
    } catch (error) {
      console.error("Error processing audio:", error);
    } finally {
      setIsProcessing(false);
    }
  }, [handleSend]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Set up audio analysis for waveform
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      // Set up MediaRecorder
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : "audio/mp4",
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        if (audioBlob.size > 0) {
          processAudio(audioBlob);
        }
        if (audioContextRef.current) {
          audioContextRef.current.close();
          audioContextRef.current = null;
        }
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      lastSoundTimeRef.current = Date.now();

      // Animate waveform and detect silence
      const updateWaveform = () => {
        if (!analyserRef.current) return;

        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        // Calculate average volume
        const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;
        
        // Check for silence (threshold ~10)
        if (average > 10) {
          lastSoundTimeRef.current = Date.now();
        } else {
          // Check if silent for 3 seconds
          if (Date.now() - lastSoundTimeRef.current > 3000) {
            stopRecording();
            return;
          }
        }

        // Update visualization with 20 bars
        const levels = [];
        const step = Math.floor(dataArray.length / 20);
        for (let i = 0; i < 20; i++) {
          const value = dataArray[i * step] || 0;
          levels.push(value / 255);
        }
        setAudioLevels(levels);

        animationFrameRef.current = requestAnimationFrame(updateWaveform);
      };

      updateWaveform();
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleMicClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <>
      <div className="grid-overlay" />
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
            { icon: "analytics", label: "System Info", href: "/chat" },
            { icon: "memory", label: "AI Status", href: "/chat/ai-status" },
            { icon: "lan", label: "Network", href: "/chat/network" },
            { icon: "terminal", label: "Logs", href: "/chat/logs" },
          ].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 p-3 rounded w-full text-left transition-all duration-300 ${
                  isActive
                    ? "text-primary-container bg-primary-container/10 border-l-4 border-primary-container"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-white/5"
                }`}
              >
                <span className="material-symbols-outlined text-sm">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
        <div className="mt-auto pt-4 border-t border-outline-variant/10 space-y-1">
          <Link href="/chat/settings" className="flex items-center gap-3 p-2 text-on-surface-variant hover:text-on-surface text-xs w-full">
            <span className="material-symbols-outlined text-sm">settings</span>
            <span>Settings</span>
          </Link>
          <Link href="/chat/support" className="flex items-center gap-3 p-2 text-on-surface-variant hover:text-on-surface text-xs w-full">
            <span className="material-symbols-outlined text-sm">help</span>
            <span>Support</span>
          </Link>
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

            {/* Recording Waveform Overlay */}
            {(isRecording || isProcessing) && (
              <div className="mb-4 p-4 bg-surface-container rounded-lg border border-primary/30 shadow-[0_0_20px_rgba(0,212,255,0.1)]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isProcessing ? "bg-yellow-500" : "bg-red-500"} animate-pulse`} />
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                      {isProcessing ? "Processing..." : "Recording..."}
                    </span>
                  </div>
                  {isRecording && (
                    <span className="text-[10px] text-on-surface-variant">
                      Silence for 3s to auto-stop
                    </span>
                  )}
                </div>
                
                {/* Waveform Visualization */}
                <div className="flex items-center justify-center gap-1 h-16">
                  {audioLevels.map((level, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-gradient-to-t from-primary to-tertiary rounded-full transition-all duration-75"
                      style={{
                        height: `${Math.max(4, level * 64)}px`,
                        opacity: isProcessing ? 0.3 : 0.6 + level * 0.4,
                      }}
                    />
                  ))}
                </div>

                {isRecording && (
                  <button
                    onClick={stopRecording}
                    className="mt-3 w-full py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-red-500/30 transition-all"
                  >
                    Stop Recording
                  </button>
                )}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="relative group"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isRecording ? "Recording..." : "Type your command or question..."}
                disabled={isRecording || isProcessing}
                className="w-full bg-surface-container py-4 pl-6 pr-24 rounded-lg border-b-2 border-outline-variant/20 focus:border-primary focus:ring-0 transition-all text-sm placeholder-on-surface-variant/40 outline-none disabled:opacity-50"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3">
                <button 
                  type="button" 
                  onClick={handleMicClick}
                  disabled={isProcessing}
                  className={`transition-all ${
                    isRecording 
                      ? "text-red-500 animate-pulse" 
                      : isProcessing
                        ? "text-yellow-500"
                        : "text-on-surface-variant hover:text-primary"
                  }`}
                >
                  <span className="material-symbols-outlined text-xl">
                    {isRecording ? "stop_circle" : isProcessing ? "hourglass_empty" : "mic"}
                  </span>
                </button>
                <button
                  type="submit"
                  disabled={isRecording || isProcessing}
                  className="bg-primary-container text-on-primary font-bold p-2 rounded hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all disabled:opacity-50"
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
    </>
  );
}

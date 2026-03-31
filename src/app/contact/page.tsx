"use client";
import StatsBar from "@/components/StatsBar";
import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <>
      <div className="grid-overlay" />
      <main className="relative pt-24 pb-32 px-6 max-w-7xl mx-auto overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Communication Channels */}
          <aside className="lg:col-span-4 space-y-6 order-2 lg:order-1">
            <div className="bg-surface-container-low p-8 border-l-2 border-primary shadow-[0_0_20px_rgba(0,212,255,0.15)] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 text-[10px] font-[family-name:var(--font-headline)] text-primary opacity-30">
                SYS_LINK_04
              </div>
              <h2 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-primary mb-8 tracking-tighter uppercase">
                COMMUNICATION_CHANNELS
              </h2>

              <div className="space-y-6">
                {/* GitHub */}
                <a
                  href="https://github.com/dhaan-ish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-4 p-4 bg-surface-container-high hover:bg-surface-container-highest transition-colors cursor-pointer border border-outline-variant/10"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-surface-container-lowest rounded shadow-[0_0_15px_rgba(106,247,186,0.1)] group-hover:shadow-[0_0_20px_rgba(106,247,186,0.3)] transition-all">
                    <span
                      className="material-symbols-outlined text-tertiary"
                      style={{
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      code
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] text-tertiary font-[family-name:var(--font-headline)] uppercase tracking-widest mb-0.5">
                      GitHub
                    </p>
                    <p className="text-on-surface font-[family-name:var(--font-headline)] font-medium">
                      @dhaan-ish
                    </p>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/dhaanish-ahamed-1b950624a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-4 p-4 bg-surface-container-high hover:bg-surface-container-highest transition-colors cursor-pointer border border-outline-variant/10"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-surface-container-lowest rounded shadow-[0_0_15px_rgba(0,212,255,0.1)] group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      hub
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] text-primary font-[family-name:var(--font-headline)] uppercase tracking-widest mb-0.5">
                      LinkedIn
                    </p>
                    <p className="text-on-surface font-[family-name:var(--font-headline)] font-medium">
                      in/dhaanish-ahamed
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:dhaanishahamed7@gmail.com"
                  className="group flex items-center space-x-4 p-4 bg-surface-container-high hover:bg-surface-container-highest transition-colors cursor-pointer border border-outline-variant/10"
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-surface-container-lowest rounded shadow-[0_0_15px_rgba(210,187,255,0.1)] group-hover:shadow-[0_0_20px_rgba(210,187,255,0.3)] transition-all">
                    <span
                      className="material-symbols-outlined text-secondary"
                      style={{
                        fontVariationSettings: "'FILL' 1",
                      }}
                    >
                      alternate_email
                    </span>
                  </div>
                  <div>
                    <p className="text-[10px] text-secondary font-[family-name:var(--font-headline)] uppercase tracking-widest mb-0.5">
                      Direct_Comms
                    </p>
                    <p className="text-on-surface font-[family-name:var(--font-headline)] font-medium text-sm">
                      dhaanishahamed7@gmail.com
                    </p>
                  </div>
                </a>
              </div>

              <div className="mt-12 pt-8 border-t border-outline-variant/20">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-tertiary rounded-full animate-pulse shadow-[0_0_8px_#6af7ba]" />
                  <span className="text-[10px] font-[family-name:var(--font-headline)] text-tertiary tracking-widest uppercase">
                    System Status: Active
                  </span>
                </div>
                <p className="text-on-surface-variant text-xs mt-2 font-[family-name:var(--font-headline)] leading-relaxed">
                  Available for collaboration, freelance projects, and full-time
                  opportunities. Response time: within 24 hours.
                </p>
              </div>
            </div>
          </aside>

          {/* Right: Contact Form */}
          <section className="lg:col-span-8 order-1 lg:order-2">
            <div className="relative mb-8">
              <h1 className="font-[family-name:var(--font-headline)] text-5xl md:text-7xl font-bold text-primary tracking-tighter uppercase leading-none">
                NEURAL
                <br />
                <span className="text-on-surface">TERMINAL</span>
              </h1>
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-primary/30" />
            </div>

            <div className="bg-surface-container-low border border-outline-variant/10 p-1">
              <div className="bg-surface p-8 md:p-12 relative">
                {/* Terminal dots */}
                <div className="flex justify-between items-center mb-10 border-b border-outline-variant/20 pb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-error rounded-full opacity-50" />
                    <div className="w-3 h-3 bg-tertiary-container rounded-full opacity-50" />
                    <div className="w-3 h-3 bg-primary rounded-full opacity-50" />
                  </div>
                  <div className="text-[10px] font-[family-name:var(--font-headline)] text-outline tracking-widest uppercase">
                    Protocol: SSL_PORT_443
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2 group">
                      <label className="block text-[10px] font-[family-name:var(--font-headline)] text-primary tracking-widest uppercase group-focus-within:text-tertiary transition-colors">
                        SENDER_ID (Full_Name)
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="IDENTITY_REQUIRED"
                        className="w-full bg-surface-container-low border-b border-outline-variant focus:border-primary outline-none py-3 px-4 text-on-surface font-[family-name:var(--font-headline)] placeholder:text-outline-variant transition-all focus:bg-surface-container-high"
                      />
                    </div>
                    <div className="space-y-2 group">
                      <label className="block text-[10px] font-[family-name:var(--font-headline)] text-primary tracking-widest uppercase group-focus-within:text-tertiary transition-colors">
                        ENCRYPTED_ENDPOINT (Email)
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="USER@ENDPOINT.SYS"
                        className="w-full bg-surface-container-low border-b border-outline-variant focus:border-primary outline-none py-3 px-4 text-on-surface font-[family-name:var(--font-headline)] placeholder:text-outline-variant transition-all focus:bg-surface-container-high"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <label className="block text-[10px] font-[family-name:var(--font-headline)] text-primary tracking-widest uppercase group-focus-within:text-tertiary transition-colors">
                      MESSAGE_PAYLOAD (Content)
                    </label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={6}
                      placeholder="Awaiting raw data transmission..."
                      className="w-full bg-surface-container-low border-b border-outline-variant focus:border-primary outline-none py-3 px-4 text-on-surface font-[family-name:var(--font-headline)] placeholder:text-outline-variant transition-all focus:bg-surface-container-high resize-none"
                    />
                  </div>

                  <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-[10px] font-[family-name:var(--font-headline)] text-outline-variant max-w-xs uppercase leading-tight">
                      By clicking initialize, your message will be securely
                      transmitted.
                    </div>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="group relative px-10 py-4 font-[family-name:var(--font-headline)] font-bold text-on-surface uppercase tracking-widest shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_40px_rgba(0,212,255,0.5)] transition-all duration-300 overflow-hidden bg-gradient-to-br from-primary-container to-secondary-container disabled:opacity-50"
                    >
                      <span className="relative z-10 flex items-center">
                        {status === "sending"
                          ? "TRANSMITTING..."
                          : status === "success"
                            ? "TRANSMISSION_COMPLETE ✓"
                            : status === "error"
                              ? "TRANSMISSION_FAILED ✗"
                              : "INITIALIZE_TRANSMISSION"}
                        <span className="material-symbols-outlined ml-2 text-xl group-hover:translate-x-1 transition-transform">
                          bolt
                        </span>
                      </span>
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>

        {/* Bento Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-surface-container-low p-6 border border-outline-variant/10">
            <p className="text-[10px] font-[family-name:var(--font-headline)] text-primary mb-2 tracking-widest uppercase">
              RESPONSE_TIME
            </p>
            <p className="text-3xl font-[family-name:var(--font-headline)] font-bold text-on-surface">
              &lt;24
              <span className="text-sm text-outline font-light ml-1">HRS</span>
            </p>
          </div>
          <div className="bg-surface-container-low p-6 border border-outline-variant/10">
            <p className="text-[10px] font-[family-name:var(--font-headline)] text-tertiary mb-2 tracking-widest uppercase">
              AVAILABILITY
            </p>
            <p className="text-3xl font-[family-name:var(--font-headline)] font-bold text-on-surface">
              99.9
              <span className="text-sm text-outline font-light ml-1">%</span>
            </p>
          </div>
          <div className="bg-surface-container-low p-6 border border-outline-variant/10">
            <p className="text-[10px] font-[family-name:var(--font-headline)] text-secondary mb-2 tracking-widest uppercase">
              TIMEZONE
            </p>
            <p className="text-3xl font-[family-name:var(--font-headline)] font-bold text-on-surface">
              IST
              <span className="text-sm text-outline font-light ml-1">
                +5:30
              </span>
            </p>
          </div>
          <div className="bg-surface-container-low p-6 border border-outline-variant/10">
            <p className="text-[10px] font-[family-name:var(--font-headline)] text-primary mb-2 tracking-widest uppercase">
              LOCATION
            </p>
            <p className="text-3xl font-[family-name:var(--font-headline)] font-bold text-on-surface">
              CHN
              <span className="text-sm text-outline font-light ml-1">
                INDIA
              </span>
            </p>
          </div>
        </div>
      </main>

      {/* Background blurs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-5 overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
      </div>

      <StatsBar />
    </>
  );
}

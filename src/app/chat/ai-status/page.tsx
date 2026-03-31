import Link from "next/link";

export default function AIStatusPage() {
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
              const isActive = item.href === "/chat/ai-status";
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

        {/* Main Content */}
        <section className="flex-1 flex flex-col items-center justify-center bg-surface p-8">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-primary-container/10 flex items-center justify-center mx-auto mb-6 border border-primary-container/30">
              <span className="material-symbols-outlined text-primary-container text-4xl">memory</span>
            </div>
            <h1 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-primary mb-4">AI_STATUS</h1>
            <p className="text-on-surface-variant mb-8">
              Neural network status monitoring and performance metrics. Module currently initializing...
            </p>
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono text-on-surface-variant uppercase">System Status</span>
                <span className="flex items-center gap-2 text-tertiary text-xs">
                  <span className="w-2 h-2 bg-tertiary rounded-full animate-pulse" />
                  Online
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Model</span>
                  <span className="text-sm font-bold text-on-surface">kimi-k2-instruct</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Provider</span>
                  <span className="text-sm font-bold text-on-surface">Groq</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Latency</span>
                  <span className="text-sm font-bold text-primary-container">~200ms</span>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">Uptime</span>
                  <span className="text-sm font-bold text-tertiary">99.9%</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

import Link from "next/link";

export default function SupportPage() {
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
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 p-3 rounded w-full text-left transition-all duration-300 text-on-surface-variant hover:text-on-surface hover:bg-white/5"
              >
                <span className="material-symbols-outlined text-sm">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="mt-auto pt-4 border-t border-outline-variant/10 space-y-1">
            <Link href="/chat/settings" className="flex items-center gap-3 p-2 text-on-surface-variant hover:text-on-surface text-xs w-full">
              <span className="material-symbols-outlined text-sm">settings</span>
              <span>Settings</span>
            </Link>
            <Link href="/chat/support" className="flex items-center gap-3 p-2 text-primary-container text-xs w-full bg-primary-container/10 rounded">
              <span className="material-symbols-outlined text-sm">help</span>
              <span>Support</span>
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 flex flex-col items-center justify-center bg-surface p-8">
          <div className="text-center max-w-md w-full">
            <div className="w-20 h-20 rounded-full bg-primary-container/10 flex items-center justify-center mx-auto mb-6 border border-primary-container/30">
              <span className="material-symbols-outlined text-primary-container text-4xl">help</span>
            </div>
            <h1 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-primary mb-4">SUPPORT</h1>
            <p className="text-on-surface-variant mb-8">
              Need assistance? Reach out through any of the channels below.
            </p>
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 space-y-4">
              <a
                href="mailto:dhaanishahamed29@gmail.com"
                className="flex items-center gap-4 p-4 bg-surface rounded border border-outline-variant/10 hover:border-primary-container/30 transition-colors"
              >
                <span className="material-symbols-outlined text-primary-container">mail</span>
                <div className="text-left">
                  <div className="text-sm font-medium text-on-surface">Email</div>
                  <div className="text-xs text-on-surface-variant">dhaanishahamed29@gmail.com</div>
                </div>
              </a>
              <a
                href="https://github.com/Dhaanish-Ahamed-J"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-surface rounded border border-outline-variant/10 hover:border-primary-container/30 transition-colors"
              >
                <svg className="w-6 h-6 text-primary-container" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <div className="text-left">
                  <div className="text-sm font-medium text-on-surface">GitHub</div>
                  <div className="text-xs text-on-surface-variant">@Dhaanish-Ahamed-J</div>
                </div>
              </a>
              <a
                href="https://linkedin.com/in/dhaanish-j"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-surface rounded border border-outline-variant/10 hover:border-primary-container/30 transition-colors"
              >
                <svg className="w-6 h-6 text-primary-container" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <div className="text-left">
                  <div className="text-sm font-medium text-on-surface">LinkedIn</div>
                  <div className="text-xs text-on-surface-variant">Dhaanish Ahamed J</div>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

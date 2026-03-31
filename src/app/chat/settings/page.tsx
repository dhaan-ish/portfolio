import Link from "next/link";

export default function SettingsPage() {
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
            <Link href="/chat/settings" className="flex items-center gap-3 p-2 text-primary-container text-xs w-full bg-primary-container/10 rounded">
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
          <div className="text-center max-w-md w-full">
            <div className="w-20 h-20 rounded-full bg-primary-container/10 flex items-center justify-center mx-auto mb-6 border border-primary-container/30">
              <span className="material-symbols-outlined text-primary-container text-4xl">settings</span>
            </div>
            <h1 className="font-[family-name:var(--font-headline)] text-3xl font-bold text-primary mb-4">SETTINGS</h1>
            <p className="text-on-surface-variant mb-8">
              Configure AI behavior, personalization options, and system preferences.
            </p>
            <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 text-left space-y-4">
              {[
                { label: "Dark Mode", value: "Enabled", icon: "dark_mode" },
                { label: "AI Personality", value: "Professional", icon: "psychology" },
                { label: "Response Length", value: "Balanced", icon: "expand" },
                { label: "Language", value: "English", icon: "language" },
                { label: "Sound Effects", value: "Disabled", icon: "volume_off" },
              ].map((setting) => (
                <div key={setting.label} className="flex items-center justify-between p-3 bg-surface rounded border border-outline-variant/10">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-on-surface-variant text-sm">{setting.icon}</span>
                    <span className="text-sm text-on-surface">{setting.label}</span>
                  </div>
                  <span className="text-xs text-primary-container font-medium">{setting.value}</span>
                </div>
              ))}
              <p className="text-[10px] text-on-surface-variant text-center pt-4">Settings are for display only. Full configuration coming soon.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

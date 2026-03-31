import StatsBar from "@/components/StatsBar";

export default function ExperiencePage() {
  return (
    <>
      <div className="grid-overlay" />
      <main className="pt-24 pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        {/* ===== EXPERIENCE SECTION ===== */}
        <header className="mb-16">
          <h1 className="font-[family-name:var(--font-headline)] text-5xl md:text-7xl font-black tracking-tighter text-primary mb-4">
            EXPERIENCE
          </h1>
          <div className="w-32 h-1.5 bg-primary-container shadow-[0_0_15px_rgba(0,212,255,0.8)]" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-32">
          <div className="lg:col-span-8">
            <div className="relative pl-8 border-l-2 border-primary/30 space-y-12">
              {/* HID Global */}
              <div className="relative">
                <div className="absolute -left-[2.55rem] top-0 w-4 h-4 rounded-full bg-primary border-4 border-surface shadow-[0_0_10px_#00D4FF]" />
                <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
                    <div>
                      <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-on-surface">Software Development Intern - HID</h3>
                      <p className="text-tertiary text-sm uppercase tracking-wider">Chennai, Tamil Nadu | Jun 2025 – Present · 10 mos</p>
                    </div>
                    <span className="px-4 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold">ACTIVE</span>
                  </div>
                  <p className="text-on-surface-variant mb-6 leading-relaxed">
                    Focused on building secure, scalable multi-agent AI and ML platforms, delivering AI applications for enterprise identity, access control, and intelligent automation solutions.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {["Amazon EC2", "Agents", "Access Control", "AI/ML", "Cloud", "API Integration"].map((tag) => (
                      <span key={tag} className="flex items-center gap-1 text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Cognizant */}
              <div className="relative">
                <div className="absolute -left-[2.55rem] top-0 w-4 h-4 rounded-full bg-surface-container-highest border-4 border-surface" />
                <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
                  <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-on-surface mb-1">Cognizant</h3>
                  <p className="text-tertiary text-sm uppercase tracking-wider mb-6">Sholinganallur, Tamil Nadu | Internship · 9 mos</p>

                  {/* Sub-role 1 */}
                  <div className="mb-6 pl-4 border-l-2 border-secondary/30">
                    <h4 className="font-[family-name:var(--font-headline)] text-lg font-bold text-on-surface">Gen AI Developer Apprenticeship</h4>
                    <p className="text-on-surface-variant text-sm mb-2">May 2024 – Jul 2024 · 3 mos · On-site</p>
                    <p className="text-on-surface-variant mb-4 leading-relaxed">
                      Continued developing a Generative AI solution to address two major challenges in the key industry. Leveraging Large Language Models (LLMs) and advanced image generation techniques.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Large Language Models (LLM)", "Unity", "+11 skills"].map((tag) => (
                        <span key={tag} className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Sub-role 2 */}
                  <div className="pl-4 border-l-2 border-secondary/30">
                    <h4 className="font-[family-name:var(--font-headline)] text-lg font-bold text-on-surface">Gen AI Developer Apprenticeship</h4>
                    <p className="text-on-surface-variant text-sm mb-2">Nov 2023 – Apr 2024 · 6 mos · Hybrid</p>
                    <p className="text-on-surface-variant mb-4 leading-relaxed">
                      Led a team at Cognizant&apos;s Innovation Studio creating Gen AI based full stack projects in life sciences domain with opportunity to showcase to numerous stakeholders.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Google Cloud Platform (GCP)", "Full-Stack Development", "+7 skills"].map((tag) => (
                        <span key={tag} className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Gen Z Marketers */}
              <div className="relative">
                <div className="absolute -left-[2.55rem] top-0 w-4 h-4 rounded-full bg-surface-container-highest border-4 border-surface" />
                <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
                  <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-on-surface mb-1">Gen Z Marketers</h3>
                  <p className="text-tertiary text-sm uppercase tracking-wider mb-6">Internship · 7 mos</p>

                  {/* Sub-role 1 */}
                  <div className="mb-6 pl-4 border-l-2 border-secondary/30">
                    <h4 className="font-[family-name:var(--font-headline)] text-lg font-bold text-on-surface">Web Developer</h4>
                    <p className="text-on-surface-variant text-sm mb-2">Jul 2023 – Nov 2023 · 5 mos · On-site</p>
                    <div className="flex flex-wrap gap-2">
                      {["React.js", "Python", "+5 skills"].map((tag) => (
                        <span key={tag} className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Sub-role 2 */}
                  <div className="pl-4 border-l-2 border-secondary/30">
                    <h4 className="font-[family-name:var(--font-headline)] text-lg font-bold text-on-surface">Frontend Developer</h4>
                    <p className="text-on-surface-variant text-sm mb-2">May 2023 – Jun 2023 · 2 mos · Chennai · Remote</p>
                    <div className="flex flex-wrap gap-2">
                      {["CSS", "JavaScript", "+1 skill"].map((tag) => (
                        <span key={tag} className="text-xs font-bold text-secondary bg-secondary/10 px-3 py-1 rounded">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              <div className="bg-surface-container-low p-6 rounded-xl border border-white/5">
                <h4 className="font-[family-name:var(--font-headline)] font-bold text-on-surface mb-4">Current Focus</h4>
                <div className="flex items-start gap-4 p-3 bg-surface-container-highest rounded border-l-4 border-primary">
                  <span className="material-symbols-outlined text-primary">robot_2</span>
                  <div>
                    <p className="text-sm font-bold">Advanced AI Agents</p>
                    <p className="text-xs text-on-surface-variant">Integrating LLMs with industrial access control workflows.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== ACHIEVEMENTS SECTION ===== */}
        <header className="mb-16">
          <h2 className="font-[family-name:var(--font-headline)] text-5xl md:text-7xl font-black tracking-tighter text-primary mb-4">
            ACHIEVEMENTS
          </h2>
          <div className="w-32 h-1.5 bg-secondary-container shadow-[0_0_15px_rgba(96,1,209,0.8)]" />
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 max-w-5xl">
          {/* Intel OneAPI */}
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 hover:border-primary/30 transition-all duration-300 group">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all">
              <span className="material-symbols-outlined text-primary text-3xl">emoji_events</span>
            </div>
            <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold text-on-surface mb-2">Intel OneAPI AI/ML Hackathon</h3>
            <p className="text-tertiary font-bold text-sm mb-3">Mar 2024</p>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-lg">
              <span className="material-symbols-outlined text-primary text-lg">military_tech</span>
              <span className="font-[family-name:var(--font-headline)] font-bold text-primary">Winner</span>
            </span>
          </div>

          {/* Amazon ML Challenge */}
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 hover:border-secondary/30 transition-all duration-300 group">
            <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(96,1,209,0.3)] transition-all">
              <span className="material-symbols-outlined text-secondary text-3xl">emoji_events</span>
            </div>
            <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold text-on-surface mb-2">Amazon ML Challenge 2024</h3>
            <p className="text-tertiary font-bold text-sm mb-3">Oct 2024</p>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-lg">
              <span className="material-symbols-outlined text-secondary text-lg">leaderboard</span>
              <span className="font-[family-name:var(--font-headline)] font-bold text-secondary">AIR 74</span>
            </span>
          </div>

          {/* TCS Codevita */}
          <div className="bg-surface-container-low p-8 rounded-xl border border-white/5 hover:border-tertiary/30 transition-all duration-300 group">
            <div className="w-14 h-14 bg-tertiary/10 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(106,247,186,0.3)] transition-all">
              <span className="material-symbols-outlined text-tertiary text-3xl">emoji_events</span>
            </div>
            <h3 className="font-[family-name:var(--font-headline)] text-xl font-bold text-on-surface mb-2">TCS Codevita</h3><br />
            <p className="text-tertiary font-bold text-sm mb-3">Jan 2025</p>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-tertiary/10 border border-tertiary/20 rounded-lg">
              <span className="material-symbols-outlined text-tertiary text-lg">public</span>
              <span className="font-[family-name:var(--font-headline)] font-bold text-tertiary">World Rank 1296</span>
            </span>
          </div>
        </div>

        {/* ===== EDUCATION SECTION ===== */}
        <header className="mb-16">
          <h2 className="font-[family-name:var(--font-headline)] text-5xl md:text-7xl font-black tracking-tighter text-primary mb-4">
            EDUCATION
          </h2>
          <div className="w-32 h-1.5 bg-tertiary shadow-[0_0_15px_rgba(106,247,186,0.8)]" />
        </header>

        <div className="relative pl-8 border-l-2 border-tertiary/30 max-w-4xl space-y-12">
          {/* BTech */}
          <div className="relative">
            <div className="absolute -left-[2.55rem] top-0 w-4 h-4 rounded-full bg-tertiary border-4 border-surface shadow-[0_0_10px_#6af7ba]" />
            <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center shrink-0 border border-white/10">
                  <span className="material-symbols-outlined text-tertiary text-4xl">school</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-on-surface">Chennai Institute of Technology</h3>
                  <p className="text-on-surface-variant text-sm mb-2">Bachelor of Technology – BTech, Artificial Intelligence and Data Science</p>
                  <p className="text-tertiary text-sm uppercase tracking-wider mb-4">2022 – 2026</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-tertiary/10 border border-tertiary/20 rounded-lg">
                      <span className="material-symbols-outlined text-tertiary text-lg">grade</span>
                      <span className="font-[family-name:var(--font-headline)] font-bold text-tertiary text-lg">CGPA: 9.45</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-lg">
                      <span className="material-symbols-outlined text-secondary text-lg">military_tech</span>
                      <span className="font-[family-name:var(--font-headline)] font-bold text-secondary text-lg">GATE 2026 AIR 3367</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HSC */}
          <div className="relative">
            <div className="absolute -left-[2.55rem] top-0 w-4 h-4 rounded-full bg-surface-container-highest border-4 border-surface" />
            <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center shrink-0 border border-white/10">
                  <span className="material-symbols-outlined text-secondary text-4xl">menu_book</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-on-surface">Higher Secondary Certificate (HSC)</h3>
                  <p className="text-on-surface-variant text-sm mb-2">Tamil Nadu State Board — PCMB Stream</p>
                  <p className="text-tertiary text-sm uppercase tracking-wider mb-4">2021 – 2022</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-lg">
                    <span className="material-symbols-outlined text-secondary text-lg">workspace_premium</span>
                    <span className="font-[family-name:var(--font-headline)] font-bold text-secondary text-lg">93.3%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SSLC */}
          <div className="relative">
            <div className="absolute -left-[2.55rem] top-0 w-4 h-4 rounded-full bg-surface-container-highest border-4 border-surface" />
            <div className="bg-surface-container-low p-8 rounded-xl border border-white/5">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center shrink-0 border border-white/10">
                  <span className="material-symbols-outlined text-primary-container text-4xl">history_edu</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-[family-name:var(--font-headline)] text-2xl font-bold text-on-surface">Secondary School Leaving Certificate (SSLC)</h3>
                  <p className="text-on-surface-variant text-sm mb-2">Tamil Nadu State Board</p>
                  <p className="text-tertiary text-sm uppercase tracking-wider mb-4">2019 – 2020</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-container/10 border border-primary-container/20 rounded-lg">
                    <span className="material-symbols-outlined text-primary-container text-lg">verified</span>
                    <span className="font-[family-name:var(--font-headline)] font-bold text-primary-container text-lg">96.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-5 overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-on-secondary rounded-full blur-[120px]" />
      </div>

      <StatsBar />
    </>
  );
}

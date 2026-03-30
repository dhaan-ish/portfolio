import StatsBar from "@/components/StatsBar";

const skillCategories = [
  {
    icon: "psychology",
    title: "AI / Machine Learning",
    skills: ["TensorFlow", "PyTorch", "Computer Vision", "NLP", "LLMs", "Jupyter"],
  },
  {
    icon: "code",
    title: "Languages",
    skills: ["Python", "JavaScript", "TypeScript", "Java", "C++", "TeX", "Go", "Rust"],
  },
  {
    icon: "web_asset",
    title: "Frontend",
    skills: ["React", "React Native", "Expo", "Tailwind CSS", "Next.js"],
  },
  {
    icon: "dns",
    title: "Backend",
    skills: ["Node.js", "FastAPI", "Flask", "REST APIs", "Gin"],
  },
  {
    icon: "terminal",
    title: "DevOps",
    skills: ["Docker", "CI/CD", "Git"],
  },
  {
    icon: "build",
    title: "Power Tools",
    skills: ["VS Code", "MCP Servers", "Omni Parser"],
  },
];

export default function SkillsPage() {
  return (
    <>
      <main className="pt-24 pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <header className="mb-16">
          <h1 className="font-[family-name:var(--font-headline)] text-5xl md:text-7xl font-black tracking-tighter text-primary mb-4">
            TECH ARSENAL
          </h1>
          <div className="w-32 h-1.5 bg-primary-container shadow-[0_0_15px_rgba(0,212,255,0.8)]" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Radar */}
          <div className="lg:col-span-5 bg-surface-container-low p-8 rounded-xl border border-white/5 relative overflow-hidden flex flex-col items-center justify-center">
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(circle, #00d4ff 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            />
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              <div className="absolute inset-0 border border-primary/20 radar-grid scale-100" />
              <div className="absolute inset-0 border border-primary/20 radar-grid scale-75" />
              <div className="absolute inset-0 border border-primary/20 radar-grid scale-50" />
              <svg className="absolute inset-0 w-full h-full drop-shadow-[0_0_10px_rgba(106,247,186,0.5)]" viewBox="0 0 100 100">
                <polygon points="50,15 85,35 90,70 50,85 15,70 10,35" fill="rgba(0,212,255,0.2)" stroke="#00D4FF" strokeWidth="1" />
              </svg>
              <span className="absolute top-[-2rem] left-1/2 -translate-x-1/2 font-[family-name:var(--font-headline)] text-xs font-bold text-tertiary">AI/ML</span>
              <span className="absolute top-1/4 right-[-3rem] font-[family-name:var(--font-headline)] text-xs font-bold text-tertiary">WEB DEV</span>
              <span className="absolute bottom-1/4 right-[-3.5rem] font-[family-name:var(--font-headline)] text-xs font-bold text-tertiary">BACKEND</span>
              <span className="absolute bottom-[-2rem] left-1/2 -translate-x-1/2 font-[family-name:var(--font-headline)] text-xs font-bold text-tertiary">DEVOPS</span>
              <span className="absolute bottom-1/4 left-[-3.5rem] font-[family-name:var(--font-headline)] text-xs font-bold text-tertiary">MOBILE</span>
              <span className="absolute top-1/4 left-[-3rem] font-[family-name:var(--font-headline)] text-xs font-bold text-tertiary">TOOLS</span>
            </div>
            <p className="mt-12 text-center text-on-surface-variant text-sm max-w-xs">
              Autonomous skill distribution across the modern full-stack and AI ecosystem.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
            {skillCategories.map((cat) => (
              <div key={cat.title} className="bg-surface-container-high p-5 rounded-lg border border-white/5 hover:border-primary/50 transition-all group">
                <div className="flex items-center gap-3 mb-4">
                  <span className="material-symbols-outlined text-primary">{cat.icon}</span>
                  <h3 className="font-[family-name:var(--font-headline)] font-bold text-lg">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-surface-container-lowest text-xs text-on-surface-variant border border-white/5 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
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

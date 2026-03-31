"use client";
import StatsBar from "@/components/StatsBar";
import { useState } from "react";

const projects = [
  {
    name: "Stylist AI",
    desc: "Intel OneAPI Hackathon Winner - AI-driven fashion app with virtual try-on and personalized recommendations.",
    category: "AI/ML",
    tags: [
      { label: "React.js", color: "text-primary" },
      { label: "DialogFlow", color: "text-secondary" },
      { label: "Stable Diffusion", color: "text-tertiary" },
      { label: "Facebook Detection", color: "text-primary" },
      { label: "Python", color: "text-secondary" },
      { label: "Machine Learning", color: "text-tertiary" },
    ],
    image: "/projects/stylist-ai.png",
    url: "https://github.com/dhaan-ish/wizzers",
  },
  {
    name: "Multi-Agent Support",
    desc: "Fully automated e-commerce customer support using multi-agent AI system.",
    category: "AI/ML",
    tags: [
      { label: "A2A Protocol", color: "text-primary" },
      { label: "Azure OpenAI", color: "text-secondary" },
      { label: "Python", color: "text-primary" },
      { label: "MCP", color: "text-tertiary" },
      { label: "Gmail API", color: "text-primary" },
      { label: "Multi-Agent Systems", color: "text-secondary" },
    ],
    image: "/projects/multi-agent.png",
    url: "https://github.com/dhaan-ish/multi-agent-support",
  },
  {
    name: "Multi-Agent Data Analysis",
    desc: "Multi-agent data analysis system using A2A protocol, Azure OpenAI, and MCP for CSV and SQL insights.",
    category: "Tools",
    tags: [
      { label: "A2A Protocol", color: "text-primary" },
      { label: "Azure OpenAI", color: "text-secondary" },
      { label: "Python", color: "text-primary" },
      { label: "Multi-Agent", color: "text-tertiary" },
      { label: "Pandas", color: "text-secondary" },
      { label: "Plotly", color: "text-primary" },
      { label: "NumPy", color: "text-tertiary" },
      { label: "LLM", color: "text-secondary" },
    ],
    image: "/projects/multi-agent-data.png",
    url: "https://github.com/dhaan-ish/multi-agent-data-analysis",
  },
  {
    name: "Liveness Detection on Edge",
    desc: "Real-time browser-based liveness detection with optimized ML models.",
    category: "AI/ML",
    tags: [
      { label: "TensorFlow.js", color: "text-primary" },
      { label: "ONNX", color: "text-secondary" },
      { label: "React.js", color: "text-tertiary" },
      { label: "Tailwind CSS", color: "text-primary" },
      { label: "WebAssembly", color: "text-secondary" },
      { label: "CNN", color: "text-tertiary" },
    ],
    image: "/projects/liveness.png",
    url: "https://github.com/dhaan-ish/liveness-detection",
  },
  {
    name: "WizAI",
    desc: "Mobile app for traveling doctors to manage patient data efficiently.",
    category: "Web Dev",
    tags: [
      { label: "React Native", color: "text-primary" },
      { label: "Flask", color: "text-secondary" },
      { label: "Qwen-VL", color: "text-tertiary" },
      { label: "NativeWind", color: "text-primary" },
      { label: "Python", color: "text-secondary" },
      { label: "AI", color: "text-tertiary" },
    ],
    image: "/projects/wizai.png",
    url: "https://github.com/dhaan-ish/wizai",
  },
  {
    name: "StockWiz",
    desc: "Intelligent stock market analysis tool providing real-time predictive modeling for retail investors.",
    category: "Tools",
    tags: [
      { label: "Python", color: "text-primary" },
      { label: "ML", color: "text-tertiary" },
    ],
    image: "/projects/stockwiz.png",
    url: "https://github.com/dhaan-ish/StockWiz",
  },
];

const filters = ["All", "AI/ML", "Web Dev", "Tools"];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <>
      <div className="grid-overlay" />
      <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1440px] mx-auto">
        <header className="mb-16">
          <h1 className="font-[family-name:var(--font-headline)] text-5xl md:text-6xl font-black text-primary inline-block glow-underline">
            Featured Projects
          </h1>
          <p className="mt-6 text-on-surface-variant text-lg max-w-2xl">
            Exploring the intersection of Artificial Intelligence, Data Science,
            and Modern Web Engineering. A curated selection of technical
            solutions and experimental tools.
          </p>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-semibold border transition-all ${
                activeFilter === filter
                  ? "bg-primary-container/15 border-primary-container/40 text-primary-container"
                  : "border-white/10 text-on-surface-variant hover:bg-white/5"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.name}
              className="glass-card flex flex-col h-full rounded-xl overflow-hidden"
            >
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-primary-container font-[family-name:var(--font-headline)] font-bold text-2xl mb-3">
                  {project.name}
                </h3>
                <p className="text-on-surface-variant mb-6 flex-grow">
                  {project.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag.label}
                      className={`px-2 py-1 bg-surface-container-highest rounded text-[10px] font-bold ${tag.color} uppercase tracking-wider`}
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 border border-primary-container/40 text-primary-container text-center font-[family-name:var(--font-headline)] font-bold rounded-lg hover:bg-primary-container/10 transition-all"
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>

        <footer className="mt-20 text-center">
          <a
            className="inline-flex items-center gap-3 text-primary-container font-bold hover:underline transition-all group"
            href="https://github.com/dhaan-ish?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-lg">View All 32 Repositories</span>
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_right_alt
            </span>
          </a>
        </footer>
      </main>

      {/* Decorative blurs */}
      <div className="fixed top-0 right-0 -z-10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="fixed bottom-0 left-0 -z-10 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px]" />

      <StatsBar />
    </>
  );
}

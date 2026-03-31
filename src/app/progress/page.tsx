"use client";
import StatsBar from "@/components/StatsBar";
import { useEffect, useState } from "react";

import data2023 from "@/data/2023.json";
import data2024 from "@/data/2024.json";
import data2025 from "@/data/2025.json";
import data2026 from "@/data/2026.json";

const fallbackContributions: Record<number, { total: Record<string, number>; contributions: { date: string; count: number; level: number }[] }> = {
  2023: data2023,
  2024: data2024,
  2025: data2025,
  2026: data2026,
};

interface LeetCodeData {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
}

interface CodeforcesData {
  rating: number;
  maxRating: number;
  rank: string;
}

interface GitHubData {
  public_repos: number;
  followers: number;
  following: number;
}

interface GitHubRepo {
  name: string;
  stargazers_count: number;
  language: string | null;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

// Fallback data — used when APIs fail
const FALLBACK = {
  leetcode: { totalSolved: 545, easySolved: 330, mediumSolved: 206, hardSolved: 9 } as LeetCodeData,
  codeforces: { rating: 1116, maxRating: 1116, rank: "newbie" } as CodeforcesData,
  github: { public_repos: 35, followers: 19, following: 19 } as GitHubData,
  totalStars: 48,
  topLangs: [
    { name: "Python", count: 18 },
    { name: "JavaScript", count: 5 },
    { name: "HTML", count: 4 },
    { name: "TypeScript", count: 3 },
    { name: "Jupyter Notebook", count: 3 },
    { name: "Java", count: 2 },
  ],
  featuredRepos: [
    { name: "Wizzers", stars: 35, language: "Jupyter Notebook", url: "https://github.com/dhaan-ish/Wizzers" },
    { name: "multi-agent-support", stars: 1, language: "Python", url: "https://github.com/dhaan-ish/multi-agent-support" },
    { name: "multi-agent-data-analysis", stars: 1, language: "Python", url: "https://github.com/dhaan-ish/multi-agent-data-analysis" },
  ],
};

export default function ProgressPage() {
  const [leetcode, setLeetcode] = useState<LeetCodeData>(FALLBACK.leetcode);
  const [codeforces, setCodeforces] = useState<CodeforcesData>(FALLBACK.codeforces);
  const [github, setGithub] = useState<GitHubData>(FALLBACK.github);
  const [totalStars, setTotalStars] = useState(FALLBACK.totalStars);
  const [topLangs, setTopLangs] = useState<{ name: string; count: number }[]>(FALLBACK.topLangs);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [contribTotal, setContribTotal] = useState(0);
  const [featuredRepos, setFeaturedRepos] = useState<{ name: string; stars: number; language: string; url: string }[]>(FALLBACK.featuredRepos);

  useEffect(() => {
    // LeetCode
    fetch("https://leetcode-stats-api.herokuapp.com/dhaanishahamed7")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((d) => { if (d.totalSolved) setLeetcode(d); })
      .catch(() => {});

    // Codeforces
    fetch("https://codeforces.com/api/user.info?handles=dhaanish_0707")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((d) => {
        if (d.status === "OK" && d.result?.[0]) {
          setCodeforces(d.result[0]);
        }
      })
      .catch(() => {});

    // GitHub
    fetch("https://api.github.com/users/dhaan-ish")
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((d) => { if (d.public_repos) setGithub(d); })
      .catch(() => {});

    fetch(
      "https://api.github.com/users/dhaan-ish/repos?per_page=100&sort=stars&direction=desc"
    )
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((repos: GitHubRepo[]) => {
        if (!Array.isArray(repos)) return;
        setTotalStars(
          repos.reduce(
            (sum: number, r: GitHubRepo) => sum + r.stargazers_count,
            0
          )
        );
        const langMap: Record<string, number> = {};
        repos.forEach((r: GitHubRepo) => {
          if (r.language) langMap[r.language] = (langMap[r.language] || 0) + 1;
        });
        const sorted = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({ name, count }));
        setTopLangs(sorted);
      })
      .catch(() => {});

    // Featured repos
    const repoNames = ["Wizzers", "multi-agent-support", "multi-agent-data-analysis"];
    Promise.all(
      repoNames.map((name) =>
        fetch(`https://api.github.com/repos/dhaan-ish/${name}`)
          .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
          .then((d) => ({
            name: d.name,
            stars: d.stargazers_count,
            language: d.language || "—",
            url: d.html_url,
          }))
      )
    )
      .then((repos) => setFeaturedRepos(repos))
      .catch(() => {});
  }, []);

  // Fetch GitHub contributions when year changes
  useEffect(() => {
    fetch(
      `https://github-contributions-api.jogruber.de/v4/dhaan-ish?y=${selectedYear}`
    )
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((d) => {
        setContributions(d.contributions || []);
        setContribTotal(d.total?.[selectedYear] ?? 0);
      })
      .catch(() => {
        const fb = fallbackContributions[selectedYear];
        if (fb) {
          setContributions(fb.contributions);
          setContribTotal(fb.total?.[String(selectedYear)] ?? 0);
        }
      });
  }, [selectedYear]);

  // LeetCode donut chart calculations
  const lcTotal = leetcode.totalSolved;
  const lcEasy = leetcode.easySolved;
  const lcMed = leetcode.mediumSolved;
  const lcHard = leetcode.hardSolved;
  const circumference = 2 * Math.PI * 40;
  const easyPct = lcEasy / lcTotal;
  const medPct = lcMed / lcTotal;
  const hardPct = lcHard / lcTotal;

  return (
    <>
      <div className="grid-overlay" />
      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse shadow-[0_0_8px_#6af7ba]" />
            <span className="text-tertiary font-mono text-xs tracking-widest uppercase">
              Status: Live Feed
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-[family-name:var(--font-headline)] font-bold tracking-tighter text-primary drop-shadow-[0_0_12px_rgba(168,232,255,0.3)]">
            SYSTEM_METRICS:{" "}
            <span className="text-on-surface">CODING_PERFORMANCE</span>
          </h1>
        </div>

        {/* GitHub Activity Section */}
        <section className="mb-8 p-6 glass-panel rounded-xl border border-white/5 shadow-[0_0_15px_rgba(0,212,255,0.15)]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary-container">
                code
              </span>
              <h2 className="font-[family-name:var(--font-headline)] font-bold text-xl tracking-tight">
                GitHub Overview
              </h2>
            </div>
            <a
              href="https://github.com/dhaan-ish"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant font-mono text-xs hover:text-primary-container transition-colors"
            >
              @dhaan-ish →
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-surface-container-low p-4 rounded-lg border border-white/5">
              <span className="text-[9px] font-mono text-on-surface-variant uppercase block mb-1">
                Repositories
              </span>
              <span className="text-2xl font-[family-name:var(--font-headline)] font-bold text-on-surface">
                {github.public_repos}
              </span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-lg border border-white/5">
              <span className="text-[9px] font-mono text-on-surface-variant uppercase block mb-1">
                Total Stars
              </span>
              <span className="text-2xl font-[family-name:var(--font-headline)] font-bold text-primary-container">
                {totalStars}
              </span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-lg border border-white/5">
              <span className="text-[9px] font-mono text-on-surface-variant uppercase block mb-1">
                Followers
              </span>
              <span className="text-2xl font-[family-name:var(--font-headline)] font-bold text-on-surface">
                {github.followers}
              </span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-lg border border-white/5">
              <span className="text-[9px] font-mono text-on-surface-variant uppercase block mb-1">
                Following
              </span>
              <span className="text-2xl font-[family-name:var(--font-headline)] font-bold text-on-surface">
                {github.following}
              </span>
            </div>
          </div>

          {/* Contribution Heatmap */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
              <div className="text-on-surface-variant font-mono text-xs">
                {contribTotal} contributions in {selectedYear}
              </div>
              <div className="flex gap-2">
                {Array.from({ length: currentYear - 2022 }, (_, i) => 2023 + i).map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                      selectedYear === year
                        ? "bg-primary-container/20 text-primary-container border border-primary-container/30"
                        : "bg-surface-container-low text-on-surface-variant border border-white/5 hover:border-white/20"
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto pb-2">
              <div className="grid grid-flow-col grid-rows-7 gap-[3px] min-w-[720px]">
                {(() => {
                  // Group contributions by week columns (7 rows per column)
                  const days = contributions;
                  if (days.length === 0) return null;
                  // Pad start to align with day of week
                  const firstDay = new Date(days[0]?.date);
                  const startPad = firstDay.getDay();
                  const cells = [];
                  // Add empty padding cells
                  for (let i = 0; i < startPad; i++) {
                    cells.push(
                      <div key={`pad-${i}`} className="w-[11px] h-[11px]" />
                    );
                  }
                  const levelColors = [
                    "bg-surface-container-highest",
                    "bg-primary-container/30",
                    "bg-primary-container/50",
                    "bg-primary-container/75",
                    "bg-primary-container shadow-[0_0_4px_rgba(0,212,255,0.3)]",
                  ];
                  days.forEach((day) => {
                    cells.push(
                      <div
                        key={day.date}
                        className={`w-[11px] h-[11px] rounded-sm ${levelColors[day.level]} transition-colors`}
                        title={`${day.date}: ${day.count} contributions`}
                      />
                    );
                  });
                  return cells;
                })()}
              </div>
            </div>
            <div className="flex justify-end items-center gap-1 mt-2">
              <span className="text-[9px] font-mono text-on-surface-variant mr-1">
                Less
              </span>
              {[
                "bg-surface-container-highest",
                "bg-primary-container/30",
                "bg-primary-container/50",
                "bg-primary-container/75",
                "bg-primary-container",
              ].map((c, i) => (
                <div
                  key={i}
                  className={`w-[11px] h-[11px] rounded-sm ${c}`}
                />
              ))}
              <span className="text-[9px] font-mono text-on-surface-variant ml-1">
                More
              </span>
            </div>
          </div>

          {/* Top Languages */}
          <div className="flex flex-wrap gap-2 mb-6">
            {topLangs.map((lang) => (
              <span
                key={lang.name}
                className="px-3 py-1 bg-primary-container/10 border border-primary-container/20 rounded text-xs font-mono text-primary-container"
              >
                {lang.name}{" "}
                <span className="text-on-surface-variant">({lang.count})</span>
              </span>
            ))}
          </div>

          {/* Top Repos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {featuredRepos.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-surface-container-low p-3 rounded-lg border border-white/5 flex justify-between items-center hover:border-primary-container/30 transition-all"
              >
                <div>
                  <span className="font-[family-name:var(--font-headline)] font-bold text-sm text-on-surface">
                    {repo.name}
                  </span>
                  <span className="text-[10px] font-mono text-on-surface-variant block">
                    {repo.language}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-primary-container">
                  <span className="material-symbols-outlined text-sm">
                    star
                  </span>
                  <span className="font-mono text-xs">
                    {repo.stars}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LeetCode */}
          <article className="glass-panel p-6 rounded-xl border border-white/5 group hover:border-primary-container/30 transition-all duration-500">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-xs font-mono text-tertiary mb-1 block">
                  MODULE_01
                </span>
                <h3 className="font-[family-name:var(--font-headline)] font-bold text-2xl text-on-surface">
                  LeetCode
                </h3>
              </div>
              <span className="material-symbols-outlined text-primary-container text-3xl">
                terminal
              </span>
            </div>

            <div className="flex items-center gap-6 mb-6">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-surface-container-highest"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-tertiary"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - easyPct)}
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-primary-container"
                    strokeDasharray={circumference}
                    strokeDashoffset={
                      circumference * (1 - medPct) + circumference * easyPct
                    }
                    style={{
                      transform: `rotate(${easyPct * 360}deg)`,
                      transformOrigin: "center",
                    }}
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-error"
                    strokeDasharray={circumference}
                    strokeDashoffset={
                      circumference * (1 - hardPct) +
                      circumference * (easyPct + medPct)
                    }
                    style={{
                      transform: `rotate(${(easyPct + medPct) * 360}deg)`,
                      transformOrigin: "center",
                    }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-[family-name:var(--font-headline)] font-bold text-xl leading-none">
                    {lcTotal}
                  </span>
                  <span className="text-[8px] font-mono uppercase text-on-surface-variant">
                    Solved
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-tertiary" />
                  <span className="text-xs font-mono text-on-surface-variant">
                    EASY: {lcEasy}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary-container" />
                  <span className="text-xs font-mono text-on-surface-variant">
                    MED: {lcMed}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-error" />
                  <span className="text-xs font-mono text-on-surface-variant">
                    HARD: {lcHard}
                  </span>
                </div>
              </div>
            </div>

            {/* Knight Badge + Rating */}
            <div className="bg-surface-container-low p-4 rounded-lg border border-white/5 mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-mono text-on-surface-variant uppercase">
                  Contest Rating
                </span>
                <span className="text-primary-container font-[family-name:var(--font-headline)] font-bold text-lg">
                  2,056
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary text-sm">
                    shield
                  </span>
                  <span className="text-xs font-mono text-tertiary font-bold">
                    Knight
                  </span>
                </div>
                <span className="text-xs font-mono text-secondary font-bold">
                  Top 1.87%
                </span>
              </div>
            </div>
          </article>

          {/* CodeChef */}
          <article className="glass-panel p-6 rounded-xl border border-white/5 group hover:border-primary-container/30 transition-all duration-500">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-xs font-mono text-tertiary mb-1 block">
                  MODULE_02
                </span>
                <h3 className="font-[family-name:var(--font-headline)] font-bold text-2xl text-on-surface">
                  CodeChef
                </h3>
              </div>
              <span className="material-symbols-outlined text-primary-container text-3xl">
                workspace_premium
              </span>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-[family-name:var(--font-headline)] font-bold text-primary tracking-tighter">
                  3★
                </span>
                <span className="text-on-surface-variant font-mono text-sm tracking-widest uppercase">
                  Div 2
                </span>
              </div>
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden mb-4">
                <div className="w-[55%] h-full bg-gradient-to-r from-primary-container to-secondary rounded-full shadow-[0_0_8px_rgba(0,212,255,0.4)]" />
              </div>
            </div>

            <div className="bg-surface-container-low p-4 rounded-lg border border-white/5 mb-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-on-surface-variant uppercase">
                  Rating
                </span>
                <span className="text-primary-container font-[family-name:var(--font-headline)] font-bold text-lg">
                  1,660
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-surface-container-low p-3 rounded-lg border border-white/5">
                <span className="text-[9px] font-mono text-on-surface-variant block uppercase mb-1">
                  Global Rank
                </span>
                <span className="text-on-surface font-[family-name:var(--font-headline)] font-bold text-sm">
                  #10,996
                </span>
              </div>
              <div className="bg-surface-container-low p-3 rounded-lg border border-white/5">
                <span className="text-[9px] font-mono text-on-surface-variant block uppercase mb-1">
                  Country Rank
                </span>
                <span className="text-on-surface font-[family-name:var(--font-headline)] font-bold text-sm">
                  #9,805
                </span>
              </div>
            </div>
          </article>

          {/* Codeforces */}
          <article className="glass-panel p-6 rounded-xl border border-white/5 group hover:border-primary-container/30 transition-all duration-500">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-xs font-mono text-tertiary mb-1 block">
                  MODULE_03
                </span>
                <h3 className="font-[family-name:var(--font-headline)] font-bold text-2xl text-on-surface">
                  Codeforces
                </h3>
              </div>
              <span className="material-symbols-outlined text-primary-container text-3xl">
                analytics
              </span>
            </div>

            <div className="mb-8 space-y-4">
              <div>
                <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest block mb-1">
                  Current Rating
                </span>
                <div className="text-3xl font-[family-name:var(--font-headline)] font-bold text-on-surface-variant capitalize">
                  {codeforces.rank}
                </div>
                <div className="text-lg font-mono text-primary-container">
                  {codeforces.rating}
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <span className="text-[9px] font-mono text-on-surface-variant uppercase block">
                    Max Rating
                  </span>
                  <span className="text-on-surface font-[family-name:var(--font-headline)] font-bold">
                    {codeforces.maxRating}
                  </span>
                </div>
                <div className="h-8 w-px bg-white/10" />
                <div>
                  <span className="text-[9px] font-mono text-on-surface-variant uppercase block">
                    Max Rank
                  </span>
                  <span className="text-on-surface font-[family-name:var(--font-headline)] font-bold capitalize">
                    {codeforces.rank}
                  </span>
                </div>
              </div>
            </div>

            {/* Mini Rating Graph */}
            <div className="relative h-20 w-full overflow-hidden rounded-lg bg-surface-container-low p-2 border border-white/5">
              <div className="absolute bottom-0 left-0 w-full h-full flex items-end gap-[3px] opacity-50 px-2">
                {[40, 55, 45, 70, 65, 85, 75, 60, 72, 80, 68, 90, 78, 82, 70, 88, 75, 82].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-primary-container/60 rounded-t-sm"
                      style={{ height: `${h}%` }}
                    />
                  )
                )}
              </div>
              <span className="relative z-10 text-[9px] font-mono text-primary-container/80">
                RATING_ARC_FLOW
              </span>
            </div>
          </article>
        </div>

        {/* Platform Links */}
        <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              name: "LeetCode",
              url: "https://leetcode.com/u/dhaanishahamed7/",
              icon: "terminal",
            },
            {
              name: "CodeChef",
              url: "https://www.codechef.com/users/dhaanishahamed",
              icon: "workspace_premium",
            },
            {
              name: "Codeforces",
              url: "https://codeforces.com/profile/dhaanish_0707",
              icon: "analytics",
            },
            {
              name: "GitHub",
              url: "https://github.com/dhaan-ish",
              icon: "code",
            },
          ].map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 glass-panel rounded-xl border border-white/5 hover:border-primary-container/30 transition-all duration-300 group"
            >
              <span className="material-symbols-outlined text-primary-container group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.6)] transition-all">
                {platform.icon}
              </span>
              <span className="font-[family-name:var(--font-headline)] font-bold text-on-surface group-hover:text-primary-container transition-colors">
                {platform.name}
              </span>
              <span className="material-symbols-outlined text-on-surface-variant ml-auto text-sm">
                open_in_new
              </span>
            </a>
          ))}
        </section>
      </main>

      {/* Background effects */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-5 overflow-hidden -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
      </div>

      <StatsBar />
    </>
  );
}

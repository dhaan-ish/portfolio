"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const mobileNavLinks = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Projects", href: "/projects", icon: "code" },
  { label: "Progress", href: "/progress", icon: "trending_up" },
  { label: "Skills", href: "/skills", icon: "psychology" },
  { label: "Experience", href: "/experience", icon: "work" },
  { label: "Contact", href: "/contact", icon: "mail" },
];

export default function StatsBar() {
  const pathname = usePathname();

  const stats = [
    { icon: "folder", label: "32+ Repositories", highlight: false },
    { icon: "star", label: "35 Stars", highlight: false },
    { icon: "insights", label: "105 Contributions", highlight: true },
    { icon: "group", label: "19 Followers", highlight: false },
  ];

  return (
    <footer className="fixed bottom-0 w-full z-50 bg-surface/80 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.5)] border-t border-white/5">
      {/* Desktop: Stats */}
      <div className="hidden md:flex justify-around items-center h-16 px-4 max-w-[1440px] mx-auto">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center gap-1 group cursor-pointer ${
              stat.highlight
                ? "text-primary-container drop-shadow-[0_0_5px_rgba(0,212,255,0.5)] animate-pulse"
                : "text-on-surface-variant hover:text-tertiary transition-all"
            }`}
          >
            <span className="material-symbols-outlined text-xl">
              {stat.icon}
            </span>
            <span className="text-[10px] uppercase tracking-widest font-semibold">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Mobile: Navigation */}
      <div className="flex md:hidden justify-around items-center h-16 px-2">
        {mobileNavLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex flex-col items-center gap-1 px-2 py-1 transition-all ${
                isActive
                  ? "text-primary-container drop-shadow-[0_0_6px_rgba(0,212,255,0.6)]"
                  : "text-on-surface-variant hover:text-primary-container"
              }`}
            >
              <span className="material-symbols-outlined text-xl">
                {link.icon}
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold">
                {link.label}
              </span>
            </Link>
          );
        })}
      </div>
    </footer>
  );
}

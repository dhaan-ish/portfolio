"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Experience", href: "/experience" },
  { label: "Chat with AI", href: "/chat" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface-container-low/60 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="flex justify-between items-center px-8 py-4 max-w-[1440px] mx-auto">
        <Link
          href="/"
          className="text-2xl font-black text-primary-container drop-shadow-[0_0_8px_rgba(0,212,255,0.8)] font-[family-name:var(--font-headline)] tracking-tight"
        >
          DA
        </Link>

        <div className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isChatLink = link.href === "/chat";

            if (isChatLink) return null;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-[family-name:var(--font-headline)] font-bold tracking-tight transition-colors ${
                  isActive
                    ? "text-primary-container border-b-2 border-primary-container pb-1"
                    : "text-on-surface-variant hover:text-primary-container"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:flex items-center">
          <Link
            href="/chat"
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 backdrop-blur-lg transition-all duration-300 rounded-lg"
          >
            <span className="material-symbols-outlined text-primary-container text-lg">
              smart_toy
            </span>
            <span className="font-[family-name:var(--font-headline)] font-bold text-primary-container">
              Chat with AI
            </span>
          </Link>
        </div>

        {/* Mobile: Chat with AI button */}
        <Link
          href="/chat"
          className="md:hidden flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg"
        >
          <span className="material-symbols-outlined text-primary-container">
            smart_toy
          </span>
        </Link>
      </div>
    </nav>
  );
}

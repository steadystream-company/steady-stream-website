"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/supply-chain", label: "供应链业务" },
  { href: "/co-brands", label: "合作品牌" },
  { href: "/products", label: "Koskenkorva" },
  { href: "/about", label: "关于我们" },
  { href: "/news", label: "新闻动态" },
  { href: "/contact", label: "联系我们" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm"
          : "bg-white/30 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1100px] items-center justify-between px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center"
        >
          <img src="/logo.png?v=2" alt="Steady Stream" className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-widest uppercase transition-colors duration-200 ${
                isActive(link.href)
                  ? "text-primary-dark"
                  : "text-gray-500 hover:text-primary-dark"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Hamburger (mobile) */}
        <button
          className="relative z-50 md:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "关闭菜单" : "打开菜单"}
        >
          {mobileOpen ? (
            <X className="h-6 w-6 text-primary-dark" />
          ) : (
            <Menu className="h-6 w-6 text-primary-dark" />
          )}
        </button>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`bg-bg-light/95 fixed inset-0 top-16 z-40 flex flex-col items-center justify-center gap-8 backdrop-blur-lg transition-opacity duration-300 md:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-lg tracking-[0.2em] uppercase transition-colors duration-200 ${
              isActive(link.href)
                ? "text-primary-dark"
                : "text-gray-500 hover:text-primary-dark"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}

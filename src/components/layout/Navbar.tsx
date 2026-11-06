"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { GOOGLE_ENQUIRY_FORM_URL } from "@/lib/whatsapp";

interface NavItem {
  label: string;
  href: string;
  match: (pathname: string) => boolean;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname() || "";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Exactly 6 navigation items in the exact required order:
  // 1. Home, 2. About, 3. Services, 4. Products, 5. Careers, 6. Support
  const navItems: NavItem[] = [
    {
      label: "Home",
      href: "/",
      match: (p) => p === "/",
    },
    {
      label: "About",
      href: "/about",
      match: (p) => p === "/about",
    },
    {
      label: "Services",
      href: "/services",
      match: (p) => p.startsWith("/services"),
    },
    {
      label: "Products",
      href: "/projects",
      match: (p) => p.startsWith("/projects") || p === "/products",
    },
    {
      label: "Careers",
      href: "/contact#careers",
      match: (p) => p === "/careers",
    },
    {
      label: "Support",
      href: "/contact",
      match: (p) => p === "/contact" || p === "/support",
    },
  ];

  // On full-screen Admin Dashboard, the portal provides its own dedicated sidebar and header
  if (pathname.startsWith("/admin/dashboard")) {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B150F]/95 backdrop-blur-md shadow-md py-3 border-b border-[#244730]"
          : "bg-[#0D1912]/95 backdrop-blur-md py-4 border-b border-[#1F3D29]"
      }`}
    >
      {/* Subtle radial emerald highlight at top center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(40,90,59,0.32),rgba(11,21,15,0))] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* LEFT: Official Anti-Matrix Brand Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 group transition-opacity hover:opacity-95"
            title="Anti-Matrix – Break The Matrix"
          >
            <div className="px-3 sm:px-3.5 py-1.5 rounded-xl bg-white border border-white/20 shadow-xs flex items-center justify-center">
              <Image
                src="/images/anti-matrix-logo.png"
                alt="Anti-Matrix Official Logo"
                width={190}
                height={40}
                className="h-7 sm:h-8 md:h-8.5 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* CENTER: Navigation Menu (Single horizontal row of 6 items on desktop) */}
          <nav
            className="hidden lg:flex items-center gap-1 xl:gap-2"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = item.match(pathname);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 xl:px-4 py-2 rounded-xl text-[13.5px] xl:text-[14.5px] font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white font-semibold bg-white/[0.1] border border-white/10 shadow-2xs"
                      : "text-[#D2DFD6] hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Action Buttons [ Log In ] [ Get Started ] */}
          <div className="hidden lg:flex items-center gap-2.5 xl:gap-3 shrink-0">
            {/* Log In: clean subtle light / outlined button */}
            <Link
              href="/admin/login"
              className="h-10 px-4 rounded-xl border border-[#2D5A3C] hover:border-[#4E9B66] bg-white/[0.04] hover:bg-white/[0.08] text-[#E0EBE2] hover:text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center transition-all shadow-2xs"
              title="Log In to Anti-Matrix Portal"
            >
              Log In
            </Link>

            {/* Get Started: prominent green button using brand colors */}
            <a
              href={GOOGLE_ENQUIRY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 px-5 rounded-xl bg-[#285A3B] hover:bg-[#326E49] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center transition-all shadow-xs hover:shadow-md border border-[#3E7D54]"
              title="Get Started with Anti-Matrix"
            >
              Get Started
            </a>
          </div>

          {/* MOBILE: Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-10 w-10 rounded-xl border border-[#2D5A3C] bg-white/[0.04] hover:bg-white/[0.08] text-white flex items-center justify-center transition-colors lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#E0EBE2]" />
            ) : (
              <Menu className="w-5 h-5 text-[#E0EBE2]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D1912] border-b border-[#1F3D29] px-4 pt-4 pb-6 space-y-4 animate-in fade-in duration-200 max-h-[85vh] overflow-y-auto shadow-2xl">
          {/* Navigation items in exact order */}
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = item.match(pathname);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "text-white font-semibold bg-white/10 border border-white/10"
                      : "text-[#D2DFD6] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Action buttons inside mobile drawer */}
          <div className="border-t border-[#1F3D29] pt-4">
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="h-11 rounded-xl border border-[#2D5A3C] hover:border-[#4E9B66] bg-white/[0.04] text-white text-sm font-semibold inline-flex items-center justify-center transition-colors"
              >
                Log In
              </Link>
              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="h-11 rounded-xl bg-[#285A3B] hover:bg-[#326E49] text-white text-sm font-semibold inline-flex items-center justify-center transition-colors shadow-xs border border-[#3E7D54]"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

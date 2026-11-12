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
  // 1. Home, 2. About, 3. Services, 4. Domains, 5. Careers, 6. Support
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
      label: "Domains",
      href: "/projects",
      match: (p) => p.startsWith("/projects") || p === "/products" || p === "/domains",
    },
    {
      label: "Careers",
      href: "/careers",
      match: (p) => p.startsWith("/careers"),
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
          ? "bg-white/95 backdrop-blur-md shadow-md py-3.5 border-b border-[#DCE2EA]"
          : "bg-white/95 backdrop-blur-md py-4.5 sm:py-5 border-b border-[#DCE2EA]"
      }`}
    >
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
        <div className="flex items-center justify-between gap-4 lg:gap-8">
          {/* LEFT: Official UPWORKS Brand Logo */}
          <Link
            href="/"
            className="flex items-center shrink-0 group transition-opacity hover:opacity-95 py-0.5"
            title="UPWORKS – Project Development Services"
          >
            <Image
              src="/images/upworks-logo.png"
              alt="UPWORKS – Project Development Services Official Logo"
              width={260}
              height={55}
              className="h-10 sm:h-11 md:h-12 lg:h-13 w-auto object-contain"
              priority
            />
          </Link>

          {/* CENTER: Navigation Menu (Single horizontal row of 6 items on desktop) */}
          <nav
            className="hidden lg:flex items-center gap-1.5 xl:gap-3 2xl:gap-4"
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive = item.match(pathname);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3.5 xl:px-4 2xl:px-5 py-2.5 rounded-xl text-[14px] xl:text-[14.5px] 2xl:text-[15.5px] font-medium transition-all duration-200 ${
                    isActive
                      ? "text-[#F58216] font-semibold bg-[#FFF5EB] border border-[#F58216]/25 shadow-2xs"
                      : "text-[#101D38] hover:text-[#F58216] hover:bg-[#F4F6FA]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Action Buttons [ Log In ] [ Get Started ] */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4 shrink-0">
            {/* Log In: clean subtle light / outlined button */}
            <Link
              href="/admin/login"
              className="h-11 px-5 rounded-xl border border-[#101D38] hover:bg-[#101D38] text-[#101D38] hover:text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center transition-all shadow-2xs"
              title="Log In to UPWORKS Portal"
            >
              Log In
            </Link>

            {/* Get Started: prominent orange button using brand colors */}
            <a
              href={GOOGLE_ENQUIRY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-6 rounded-xl bg-[#F58216] hover:bg-[#E0720F] text-white text-xs sm:text-sm font-semibold inline-flex items-center justify-center transition-all shadow-xs hover:shadow-md border border-[#F58216]"
              title="Get Started with UPWORKS"
            >
              Get Started
            </a>
          </div>

          {/* MOBILE: Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="h-10 w-10 rounded-xl border border-[#DCE2EA] bg-[#F4F6FA] hover:bg-[#EAEFF7] text-[#101D38] flex items-center justify-center transition-colors lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5 text-[#101D38]" />
            ) : (
              <Menu className="w-5 h-5 text-[#101D38]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#DCE2EA] px-4 pt-4 pb-6 space-y-4 animate-in fade-in duration-200 max-h-[85vh] overflow-y-auto shadow-xl">
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
                      ? "text-[#F58216] font-semibold bg-[#FFF5EB] border border-[#F58216]/25"
                      : "text-[#101D38] hover:text-[#F58216] hover:bg-[#F4F6FA]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Action buttons inside mobile drawer */}
          <div className="border-t border-[#DCE2EA] pt-4">
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="h-11 rounded-xl border border-[#101D38] text-[#101D38] hover:bg-[#101D38] hover:text-white text-sm font-semibold inline-flex items-center justify-center transition-colors"
              >
                Log In
              </Link>
              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="h-11 rounded-xl bg-[#F58216] hover:bg-[#E0720F] text-white text-sm font-semibold inline-flex items-center justify-center transition-colors shadow-xs border border-[#F58216]"
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

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  ChevronDown,
  Menu,
  X,
  MessageCircle,
  BrainCircuit,
  Cpu,
  Eye,
  FileCode2,
  Coffee,
  Globe,
  Smartphone,
  Cloud,
  ShieldAlert,
  BarChart3,
  ArrowRight,
  PhoneCall
} from "lucide-react";
import { openConsultationModal } from "@/components/common/ConsultationModal";
import { PROJECT_CATEGORIES } from "@/data/projects";
import TopContactBar from "./TopContactBar";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  const categoryIcons: Record<string, React.ReactNode> = {
    "AI & Data Science": <BrainCircuit className="w-4 h-4 text-[#F5A623]" />,
    "Machine Learning": <Cpu className="w-4 h-4 text-[#F5A623]" />,
    "Deep Learning": <Eye className="w-4 h-4 text-[#F5A623]" />,
    "Python Projects": <FileCode2 className="w-4 h-4 text-[#F5A623]" />,
    "Java Projects": <Coffee className="w-4 h-4 text-[#F5A623]" />,
    "Web Development": <Globe className="w-4 h-4 text-[#F5A623]" />,
    "Mobile App Development": <Smartphone className="w-4 h-4 text-[#F5A623]" />,
    "Cloud Computing": <Cloud className="w-4 h-4 text-[#F5A623]" />,
    "Cyber Security": <ShieldAlert className="w-4 h-4 text-[#F5A623]" />,
    "Data Analytics": <BarChart3 className="w-4 h-4 text-[#F5A623]" />,
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Contact Bar */}
      <TopContactBar />

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(11,31,77,0.06)] py-3"
            : "bg-white/90 backdrop-blur-md border-b border-slate-100 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0B1F4D] via-[#142A63] to-[#F5A623] p-[1.5px] shadow-sm shadow-[#0B1F4D]/15 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-[#0B1F4D] rounded-[10px] flex items-center justify-center">
                  <span className="text-lg font-black tracking-tighter text-[#F5A623] font-mono">
                    AM
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight text-[#0B1F4D] group-hover:text-[#F5A623] transition-colors flex items-center gap-1.5 font-sans">
                  AntiMatrix
                  <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
                </span>
                <span className="text-[10px] tracking-wider uppercase text-[#64748B] font-semibold font-mono">
                  Academic Project Center
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  pathname === "/"
                    ? "text-[#0B1F4D] font-bold bg-slate-100 border border-slate-200"
                    : "text-[#0F172A] hover:text-[#0B1F4D] hover:bg-slate-50"
                }`}
              >
                Home
              </Link>

              {/* Projects Dropdown Menu (10 Categories) */}
              <div
                className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    pathname.startsWith("/projects")
                      ? "text-[#0B1F4D] font-bold bg-slate-100 border border-slate-200"
                      : "text-[#0F172A] hover:text-[#0B1F4D] hover:bg-slate-50"
                  }`}
                >
                  <span>Projects</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180 text-[#F5A623]" : "text-slate-400"
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-96 rounded-2xl bg-white border border-slate-200/90 shadow-2xl shadow-slate-900/10 backdrop-blur-2xl p-3 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150 max-h-[80vh] overflow-y-auto z-50">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1 flex items-center justify-between">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider font-mono">
                        10 Academic Domains
                      </span>
                      <Link
                        href="/projects"
                        className="text-[11px] text-[#F5A623] hover:text-[#D97706] flex items-center gap-1 font-bold"
                      >
                        View All <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                      {PROJECT_CATEGORIES.map((category) => (
                        <Link
                          key={category}
                          href={`/projects?category=${encodeURIComponent(category)}`}
                          className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors text-xs font-semibold text-slate-700 hover:text-[#0B1F4D] group"
                        >
                          <div className="p-1.5 rounded-lg bg-amber-50/80 border border-amber-200/60 group-hover:border-[#F5A623] transition-colors shrink-0">
                            {categoryIcons[category]}
                          </div>
                          <span className="truncate">{category}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {navLinks.slice(1).map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                      active
                        ? "text-[#0B1F4D] font-bold bg-slate-100 border border-slate-200"
                        : "text-[#0F172A] hover:text-[#0B1F4D] hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://wa.me/919876543210?text=Hi%20AntiMatrix%2C%20I%20need%20academic%20project%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-700 text-xs font-bold transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={() => openConsultationModal()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl btn-primary-gold text-white text-xs font-bold transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Get Project</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => openConsultationModal()}
                className="px-3 py-1.5 rounded-lg btn-primary-gold text-white text-xs font-bold shadow-sm"
              >
                Get Project
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#0B1F4D]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/98 backdrop-blur-2xl border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-in fade-in duration-200 max-h-[85vh] overflow-y-auto shadow-xl">
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                className="px-3 py-2 rounded-lg text-sm font-semibold text-[#0F172A] hover:bg-slate-50"
              >
                Home
              </Link>
              <Link
                href="/projects"
                className="px-3 py-2 rounded-lg text-sm font-bold text-[#0B1F4D] bg-slate-100 flex items-center justify-between border border-slate-200"
              >
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 text-[#F5A623]" />
              </Link>

              <div className="pl-3 py-2 space-y-1 border-l-2 border-[#F5A623] ml-2">
                <span className="text-[11px] font-bold text-[#0B1F4D] uppercase tracking-wider block mb-1 font-mono">
                  10 Academic Categories
                </span>
                {PROJECT_CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    href={`/projects?category=${encodeURIComponent(cat)}`}
                    className="block text-xs text-slate-700 hover:text-[#0B1F4D] py-1 font-medium"
                  >
                    {cat}
                  </Link>
                ))}
              </div>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 rounded-lg text-sm font-semibold text-[#0F172A] hover:bg-slate-50"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="https://wa.me/919876543210?text=Hi%20AntiMatrix%2C%20I%20need%20academic%20project%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                WhatsApp Us (+91 98765 43210)
              </a>
              <a
                href="tel:+919876543210"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200 text-[#0F172A] text-xs font-semibold flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#F5A623]" />
                Call Desk (+91 98765 43210)
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openConsultationModal();
                }}
                className="w-full py-2.5 px-4 rounded-xl btn-primary-gold text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-white" />
                Get Project Consultation
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

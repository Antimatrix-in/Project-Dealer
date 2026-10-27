"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
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
  PhoneCall,
  Layers,
  ClipboardList
} from "lucide-react";
import { PROJECT_CATEGORIES, DROPDOWN_FEATURED_PROJECTS } from "@/data/projects";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER, getWhatsAppUrl, GOOGLE_ENQUIRY_FORM_URL } from "@/lib/whatsapp";
import TopContactBar from "./TopContactBar";
import ProjectsMegaMenu from "./ProjectsMegaMenu";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
    setDropdownOpen(false);
  }

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 180);
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    "AI & Data Science": <BrainCircuit className="w-4 h-4 text-[#FF6B00]" />,
    "Machine Learning": <Cpu className="w-4 h-4 text-[#FF8A00]" />,
    "Deep Learning": <Eye className="w-4 h-4 text-[#FF3D3D]" />,
    "Python Projects": <FileCode2 className="w-4 h-4 text-[#FF6B00]" />,
    "Java Projects": <Coffee className="w-4 h-4 text-[#D90429]" />,
    "Web Development": <Globe className="w-4 h-4 text-[#FF8A00]" />,
    "Mobile App Development": <Smartphone className="w-4 h-4 text-[#FF3D3D]" />,
    "Cloud Computing": <Cloud className="w-4 h-4 text-[#00A86B]" />,
    "Cyber Security": <ShieldAlert className="w-4 h-4 text-[#D90429]" />,
    "Data Analytics": <BarChart3 className="w-4 h-4 text-[#FF6B00]" />,
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
  ];

  const defaultWhatsAppLink = getWhatsAppUrl();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300">
      {/* Top Contact Bar with Warm Orange-Red Gradient */}
      <TopContactBar />

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-[#FF6B00]/15 shadow-[0_4px_20px_-4px_rgba(255,107,0,0.06)] py-3"
            : "bg-[#FFF9F5]/90 backdrop-blur-md border-b border-[#FF6B00]/10 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo with Official AntiMatrix Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-10 h-10 rounded-xl bg-white border border-slate-200/90 shadow-xs p-1 flex items-center justify-center group-hover:border-[#FF6B00]/60 group-hover:shadow-sm transition-all">
                <Image
                  src="/images/antimatrix-icon.png"
                  alt="AntiMatrix Logo"
                  width={36}
                  height={36}
                  className="w-8 h-8 object-contain group-hover:scale-105 transition-transform"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-[#101828] group-hover:text-[#FF6B00] transition-colors font-sans">
                    AntiMatrix
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                </div>
                <span className="text-[10px] tracking-wider uppercase text-[#526581] font-semibold font-mono">
                  Project Center
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-colors ${
                  pathname === "/"
                    ? "text-[#FF6B00] font-bold bg-[#FFF1E8] border border-[#FF6B00]/25 shadow-xs"
                    : "text-[#101828] hover:text-[#FF6B00] hover:bg-[#FFF1E8]/50"
                }`}
              >
                Home
              </Link>

              {/* Projects Mega Menu Dropdown */}
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    pathname.startsWith("/projects") || dropdownOpen
                      ? "text-[#FF6B00] font-bold bg-[#FFF1E8] border border-[#FF6B00]/25 shadow-xs"
                      : "text-[#101828] hover:text-[#FF6B00] hover:bg-[#FFF1E8]/50"
                  }`}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <span>Projects</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180 text-[#FF6B00]" : "text-slate-400"
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <ProjectsMegaMenu onClose={() => setDropdownOpen(false)} />
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
                        ? "text-[#FF6B00] font-bold bg-[#FFF1E8] border border-[#FF6B00]/25 shadow-xs"
                        : "text-[#101828] hover:text-[#FF6B00] hover:bg-[#FFF1E8]/50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right Buttons: [ WhatsApp ] [ Project Enquiry ] */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={defaultWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100/90 border border-[#00A86B]/40 text-[#00A86B] text-xs font-bold transition-all shadow-xs hover:shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#00A86B]" />
                <span>WhatsApp</span>
              </a>

              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] hover:opacity-95 text-white text-xs font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 group cursor-pointer border border-[#FF3D3D]/30"
              >
                <ClipboardList className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
                <span>Project Enquiry</span>
              </a>
            </div>

            {/* Mobile Action Buttons: [ WhatsApp ] [ Project Enquiry ] */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={defaultWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-[#00A86B] border border-[#00A86B]/30 text-xs font-bold flex items-center justify-center gap-1.5"
                aria-label="WhatsApp Us"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#00A86B]" />
                <span>WhatsApp</span>
              </a>
              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
              >
                <ClipboardList className="w-3.5 h-3.5 text-white" />
                <span>Enquiry</span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:text-[#FF6B00] hover:bg-[#FFF1E8]/50 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#FF6B00]" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FFF9F5]/98 backdrop-blur-2xl border-b border-[#FF6B00]/15 px-4 pt-3 pb-6 space-y-4 animate-in fade-in duration-200 max-h-[85vh] overflow-y-auto shadow-xl">
            {/* Mobile Top Brand Header */}
            <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/images/antimatrix-icon.png"
                  alt="AntiMatrix"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain"
                />
                <div>
                  <span className="text-sm font-extrabold text-[#101828]">AntiMatrix</span>
                  <span className="block text-[9px] font-mono text-[#526581] uppercase">
                    Project Center
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-[#FF6B00] bg-[#FFF1E8] border border-[#FF6B00]/25 px-2 py-0.5 rounded-full">
                2025-26 Curated
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === "/"
                    ? "text-[#FF6B00] bg-[#FFF1E8] font-bold"
                    : "text-[#101828] hover:bg-[#FFF1E8]/50"
                }`}
              >
                Home
              </Link>

              {/* Mobile Projects Accordion / Section */}
              <div className="rounded-xl border border-slate-200/90 overflow-hidden bg-white">
                <div className="p-3 bg-[#FFF9F5] flex items-center justify-between border-b border-slate-100">
                  <button
                    onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                    className="flex items-center gap-2 text-sm font-bold text-[#101828]"
                  >
                    <Layers className="w-4 h-4 text-[#FF6B00]" />
                    <span>10 Project Domains</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileProjectsOpen ? "rotate-180 text-[#FF6B00]" : "text-slate-400"
                      }`}
                    />
                  </button>
                  <Link
                    href="/projects"
                    className="text-xs font-bold text-[#FF6B00] hover:text-[#D90429] flex items-center gap-1"
                  >
                    View All →
                  </Link>
                </div>

                {mobileProjectsOpen && (
                  <div className="p-3 space-y-3">
                    {/* 10 Domains Grid */}
                    <div className="grid grid-cols-2 gap-1.5">
                      {PROJECT_CATEGORIES.map((cat) => (
                        <Link
                          key={cat}
                          href={`/projects?category=${encodeURIComponent(cat)}`}
                          className="flex items-center gap-2 p-2 rounded-lg bg-white border border-slate-200/70 hover:border-[#FF6B00]/40 text-xs text-slate-700 font-semibold"
                        >
                          <div className="p-1 rounded bg-[#FFF1E8] shrink-0">
                            {categoryIcons[cat]}
                          </div>
                          <span className="truncate">{cat}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Featured Projects Mini Thumbnails on Mobile */}
                    <div className="pt-2 border-t border-slate-200/60">
                      <span className="text-[11px] font-bold text-[#101828] uppercase tracking-wider block mb-2 font-mono">
                        Featured Projects
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {DROPDOWN_FEATURED_PROJECTS.map((proj) => (
                          <Link
                            key={proj.id}
                            href={proj.href}
                            className="bg-white rounded-lg border border-slate-200 overflow-hidden group block"
                          >
                            <div className="relative aspect-video w-full bg-slate-100">
                              <Image
                                src={proj.thumbnail}
                                alt={proj.title}
                                fill
                                sizes="150px"
                                className="object-cover"
                              />
                            </div>
                            <div className="p-1.5">
                              <span className="block text-[10px] font-bold text-slate-900 truncate">
                                {proj.title}
                              </span>
                              <span className="text-[9px] text-[#FF6B00] font-semibold">
                                View Project →
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* View All Projects Button */}
                    <Link
                      href="/projects"
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>View All Projects</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </Link>
                  </div>
                )}
              </div>

              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                    pathname === link.href
                      ? "text-[#FF6B00] bg-[#FFF1E8] font-bold"
                      : "text-[#101828] hover:bg-[#FFF1E8]/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs group"
              >
                <ClipboardList className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Project Enquiry</span>
              </a>

              <a
                href={defaultWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-50 border border-[#00A86B]/40 text-[#00A86B] text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#00A86B]" />
                WhatsApp Us ({WHATSAPP_DISPLAY})
              </a>
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="w-full py-2 px-4 rounded-xl bg-white border border-slate-200 text-[#101828] text-xs font-semibold flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#FF6B00]" />
                Call Desk ({WHATSAPP_DISPLAY})
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

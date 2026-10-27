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
    "AI & Data Science": <BrainCircuit className="w-4 h-4 text-[#FF7900]" />,
    "Machine Learning": <Cpu className="w-4 h-4 text-[#FF9500]" />,
    "Deep Learning": <Eye className="w-4 h-4 text-[#FF7900]" />,
    "Python Projects": <FileCode2 className="w-4 h-4 text-[#FF9500]" />,
    "Java Projects": <Coffee className="w-4 h-4 text-[#FF7900]" />,
    "Web Development": <Globe className="w-4 h-4 text-[#FF9500]" />,
    "Mobile App Development": <Smartphone className="w-4 h-4 text-[#FF7900]" />,
    "Cloud Computing": <Cloud className="w-4 h-4 text-[#FF9500]" />,
    "Cyber Security": <ShieldAlert className="w-4 h-4 text-[#FF7900]" />,
    "Data Analytics": <BarChart3 className="w-4 h-4 text-[#FF9500]" />,
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
      {/* Top Contact Bar with Charcoal Surface */}
      <TopContactBar />

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#080808]/95 backdrop-blur-xl border-b border-[#2A2A2A] shadow-[0_4px_25px_-4px_rgba(0,0,0,0.8)] py-3"
            : "bg-[#080808]/90 backdrop-blur-md border-b border-[#2A2A2A] py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo with Official AntiMatrix Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-10 h-10 rounded-xl bg-[#161616] border border-[#2A2A2A] p-1 flex items-center justify-center group-hover:border-[#FF7900] transition-all">
                <Image
                  src="/images/antimatrix-icon.png"
                  alt="AntiMatrix Logo"
                  width={36}
                  height={36}
                  className="w-8 h-8 object-contain brightness-0 invert group-hover:scale-105 transition-transform"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-[#FFFFFF] group-hover:text-[#FF7900] transition-colors font-sans">
                    AntiMatrix
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#FF7900]" />
                </div>
                <span className="text-[10px] tracking-wider uppercase text-[#B8B8B8] font-semibold font-mono">
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
                    ? "text-[#FF7900] font-bold bg-[#1D1D1D] border border-[#FF7900]/40 shadow-xs"
                    : "text-[#FFFFFF] hover:text-[#FF7900] hover:bg-[#1D1D1D]/60"
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
                      ? "text-[#FF7900] font-bold bg-[#1D1D1D] border border-[#FF7900]/40 shadow-xs"
                      : "text-[#FFFFFF] hover:text-[#FF7900] hover:bg-[#1D1D1D]/60"
                  }`}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <span>Projects</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180 text-[#FF7900]" : "text-[#B8B8B8]"
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
                        ? "text-[#FF7900] font-bold bg-[#1D1D1D] border border-[#FF7900]/40 shadow-xs"
                        : "text-[#FFFFFF] hover:text-[#FF7900] hover:bg-[#1D1D1D]/60"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#161616] hover:bg-[#1D1D1D] border border-[#2A2A2A] hover:border-[#FF7900] text-[#FFFFFF] hover:text-[#FF7900] text-xs font-bold transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#FF7900]" />
                <span>WhatsApp</span>
              </a>

              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#FF4500] hover:opacity-95 text-white text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,121,0,0.35)] hover:shadow-[0_6px_22px_rgba(255,121,0,0.5)] hover:-translate-y-0.5 group cursor-pointer border border-[#FF7900]/30"
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
                className="px-2.5 py-1.5 rounded-lg bg-[#161616] text-[#FF7900] border border-[#2A2A2A] text-xs font-bold flex items-center justify-center gap-1.5"
                aria-label="WhatsApp Us"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#FF7900]" />
                <span>WhatsApp</span>
              </a>
              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-[#FF7900] to-[#FF4500] text-white text-xs font-bold shadow-sm flex items-center gap-1.5"
              >
                <ClipboardList className="w-3.5 h-3.5 text-white" />
                <span>Enquiry</span>
              </a>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#B8B8B8] hover:text-[#FF7900] hover:bg-[#1D1D1D] transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#FF7900]" /> : <Menu className="w-6 h-6 text-white" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#080808]/98 backdrop-blur-2xl border-b border-[#2A2A2A] px-4 pt-3 pb-6 space-y-4 animate-in fade-in duration-200 max-h-[85vh] overflow-y-auto shadow-2xl">
            {/* Mobile Top Brand Header */}
            <div className="p-3 bg-[#161616] rounded-xl border border-[#2A2A2A] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/images/antimatrix-icon.png"
                  alt="AntiMatrix"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain brightness-0 invert"
                />
                <div>
                  <span className="text-sm font-extrabold text-[#FFFFFF]">AntiMatrix</span>
                  <span className="block text-[9px] font-mono text-[#B8B8B8] uppercase">
                    Project Center
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-[#FF7900] bg-[#1D1D1D] border border-[#FF7900]/40 px-2 py-0.5 rounded-full">
                2025-26 Curated
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === "/"
                    ? "text-[#FF7900] bg-[#1D1D1D] font-bold border border-[#FF7900]/30"
                    : "text-[#FFFFFF] hover:bg-[#1D1D1D]"
                }`}
              >
                Home
              </Link>

              {/* Mobile Projects Accordion / Section */}
              <div className="rounded-xl border border-[#2A2A2A] overflow-hidden bg-[#161616]">
                <div className="p-3 bg-[#101010] flex items-center justify-between border-b border-[#2A2A2A]">
                  <button
                    onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                    className="flex items-center gap-2 text-sm font-bold text-[#FFFFFF]"
                  >
                    <Layers className="w-4 h-4 text-[#FF7900]" />
                    <span>10 Project Domains</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileProjectsOpen ? "rotate-180 text-[#FF7900]" : "text-[#B8B8B8]"
                      }`}
                    />
                  </button>
                  <Link
                    href="/projects"
                    className="text-xs font-bold text-[#FF7900] hover:text-[#FF9500] flex items-center gap-1"
                  >
                    View All →
                  </Link>
                </div>

                {mobileProjectsOpen && (
                  <div className="p-3 space-y-3 bg-[#161616]">
                    {/* 10 Domains Grid */}
                    <div className="grid grid-cols-2 gap-1.5">
                      {PROJECT_CATEGORIES.map((cat) => (
                        <Link
                          key={cat}
                          href={`/projects?category=${encodeURIComponent(cat)}`}
                          className="flex items-center gap-2 p-2 rounded-lg bg-[#101010] border border-[#2A2A2A] hover:border-[#FF7900] text-xs text-[#B8B8B8] hover:text-white font-semibold"
                        >
                          <div className="p-1 rounded bg-[#1D1D1D] shrink-0">
                            {categoryIcons[cat]}
                          </div>
                          <span className="truncate">{cat}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Featured Projects Mini Thumbnails on Mobile */}
                    <div className="pt-2 border-t border-[#2A2A2A]">
                      <span className="text-[11px] font-bold text-[#FFFFFF] uppercase tracking-wider block mb-2 font-mono">
                        Featured Projects
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {DROPDOWN_FEATURED_PROJECTS.map((proj) => (
                          <Link
                            key={proj.id}
                            href={proj.href}
                            className="bg-[#101010] rounded-lg border border-[#2A2A2A] overflow-hidden group block hover:border-[#FF7900]"
                          >
                            <div className="relative aspect-video w-full bg-[#1D1D1D]">
                              <Image
                                src={proj.thumbnail}
                                alt={proj.title}
                                fill
                                sizes="150px"
                                className="object-cover"
                              />
                            </div>
                            <div className="p-1.5">
                              <span className="block text-[10px] font-bold text-[#FFFFFF] truncate">
                                {proj.title}
                              </span>
                              <span className="text-[9px] text-[#FF7900] font-semibold">
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
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#FF4500] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
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
                      ? "text-[#FF7900] bg-[#1D1D1D] font-bold border border-[#FF7900]/30"
                      : "text-[#FFFFFF] hover:bg-[#1D1D1D]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-[#2A2A2A] flex flex-col gap-2">
              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#FF4500] hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs group"
              >
                <ClipboardList className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Project Enquiry</span>
              </a>

              <a
                href={defaultWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#161616] border border-[#2A2A2A] hover:border-[#FF7900] text-[#FFFFFF] hover:text-[#FF7900] text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#FF7900]" />
                WhatsApp Us ({WHATSAPP_DISPLAY})
              </a>
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="w-full py-2 px-4 rounded-xl bg-[#161616] border border-[#2A2A2A] text-[#FFFFFF] hover:text-[#FF7900] text-xs font-semibold flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#FF7900]" />
                Call Desk ({WHATSAPP_DISPLAY})
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

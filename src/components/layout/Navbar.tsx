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
  ClipboardList,
  ShieldCheck
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
    "AI & Data Science": <BrainCircuit className="w-4 h-4 text-[#315C3D]" />,
    "Machine Learning": <Cpu className="w-4 h-4 text-[#497A52]" />,
    "Deep Learning": <Eye className="w-4 h-4 text-[#315C3D]" />,
    "Python Projects": <FileCode2 className="w-4 h-4 text-[#497A52]" />,
    "Java Projects": <Coffee className="w-4 h-4 text-[#315C3D]" />,
    "Web Development": <Globe className="w-4 h-4 text-[#497A52]" />,
    "Mobile App Development": <Smartphone className="w-4 h-4 text-[#315C3D]" />,
    "Cloud Computing": <Cloud className="w-4 h-4 text-[#497A52]" />,
    "Cyber Security": <ShieldAlert className="w-4 h-4 text-[#315C3D]" />,
    "Data Analytics": <BarChart3 className="w-4 h-4 text-[#497A52]" />,
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
      {/* Top Contact Bar */}
      <TopContactBar />

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-300 border-b border-[#DDDCCF] ${
          scrolled
            ? "bg-[#F5F1E7]/95 backdrop-blur-md shadow-xs py-3"
            : "bg-[#F5F1E7]/90 backdrop-blur-xs py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo with Official AntiMatrix Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#DDDCCF] p-1 flex items-center justify-center group-hover:border-[#315C3D] transition-all shadow-xs">
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
                  <span className="text-xl font-extrabold tracking-tight text-[#202820] group-hover:text-[#315C3D] transition-colors font-sans">
                    AntiMatrix
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#315C3D]" />
                </div>
                <span className="text-[10px] tracking-wider uppercase text-[#667064] font-semibold font-mono">
                  Project Center
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5">
              <Link
                href="/"
                className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                  pathname === "/"
                    ? "text-[#315C3D] bg-[#DCE8D9] border border-[#DCE8D9]"
                    : "text-[#202820] hover:text-[#315C3D] hover:bg-[#EEE9DC]"
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
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    pathname.startsWith("/projects") || dropdownOpen
                      ? "text-[#315C3D] bg-[#DCE8D9] border border-[#DCE8D9]"
                      : "text-[#202820] hover:text-[#315C3D] hover:bg-[#EEE9DC]"
                  }`}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                >
                  <span>Projects</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180 text-[#315C3D]" : "text-[#667064]"
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
                    className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all ${
                      active
                        ? "text-[#315C3D] bg-[#DCE8D9] border border-[#DCE8D9]"
                        : "text-[#202820] hover:text-[#315C3D] hover:bg-[#EEE9DC]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right Buttons: [ WhatsApp ] [ Project Enquiry ] [ Admin Login ] */}
            <div className="hidden lg:flex items-center gap-2.5">
              <a
                href={defaultWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#EEE9DC] border border-[#DDDCCF] hover:border-[#315C3D] text-[#315C3D] text-xs font-bold transition-all shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#315C3D]" />
                <span>WhatsApp</span>
              </a>

              <Link
                href="/project-enquiry"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 group cursor-pointer border border-[#315C3D]"
              >
                <ClipboardList className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
                <span>Project Enquiry</span>
              </Link>

              <Link
                href="/admin/login"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFFFFF] hover:bg-[#EEE9DC] text-[#202820] hover:text-[#315C3D] border border-[#DDDCCF] hover:border-[#315C3D] text-xs font-bold transition-all shadow-xs group cursor-pointer"
                title="Administrator Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#315C3D] group-hover:scale-110 transition-transform" />
                <span>Admin Login</span>
              </Link>
            </div>

            {/* Mobile Action Buttons: [ WhatsApp ] [ Project Enquiry ] [ Admin Login ] [ Hamburger ] */}
            <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
              <a
                href={defaultWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg bg-[#FFFFFF] text-[#315C3D] border border-[#DDDCCF] text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                aria-label="WhatsApp Us"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#315C3D]" />
                <span>WhatsApp</span>
              </a>
              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1.5 rounded-lg bg-[#315C3D] text-white text-xs font-bold shadow-xs flex items-center gap-1.5"
              >
                <ClipboardList className="w-3.5 h-3.5 text-white" />
                <span>Enquiry</span>
              </a>
              <Link
                href="/admin/login"
                className="p-1.5 rounded-lg bg-[#FFFFFF] text-[#202820] hover:text-[#315C3D] border border-[#DDDCCF] hover:border-[#315C3D] text-xs font-bold flex items-center justify-center shadow-xs"
                title="Admin Login"
                aria-label="Admin Login"
              >
                <ShieldCheck className="w-4 h-4 text-[#315C3D]" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-[#202820] hover:text-[#315C3D] hover:bg-[#EEE9DC] transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-[#315C3D]" /> : <Menu className="w-6 h-6 text-[#202820]" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F5F1E7] border-b border-[#DDDCCF] px-4 pt-3 pb-6 space-y-4 animate-in fade-in duration-200 max-h-[85vh] overflow-y-auto shadow-xl">
            {/* Mobile Top Brand Header */}
            <div className="p-3 bg-[#FFFFFF] rounded-xl border border-[#DDDCCF] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Image
                  src="/images/antimatrix-icon.png"
                  alt="AntiMatrix"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain"
                />
                <div>
                  <span className="text-sm font-extrabold text-[#202820]">AntiMatrix</span>
                  <span className="block text-[9px] font-mono text-[#667064] uppercase">
                    Project Center
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-semibold text-[#315C3D] bg-[#DCE8D9] border border-[#DDDCCF] px-2 py-0.5 rounded-full">
                2025-26 Curated
              </span>
            </div>

            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  pathname === "/"
                    ? "text-[#315C3D] bg-[#DCE8D9] font-bold border border-[#DCE8D9]"
                    : "text-[#202820] hover:bg-[#EEE9DC]"
                }`}
              >
                Home
              </Link>

              {/* Mobile Projects Accordion / Section */}
              <div className="rounded-xl border border-[#DDDCCF] overflow-hidden bg-[#FFFFFF]">
                <div className="p-3 bg-[#EEE9DC] flex items-center justify-between border-b border-[#DDDCCF]">
                  <button
                    onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                    className="flex items-center gap-2 text-sm font-bold text-[#202820]"
                  >
                    <Layers className="w-4 h-4 text-[#315C3D]" />
                    <span>10 Project Domains</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        mobileProjectsOpen ? "rotate-180 text-[#315C3D]" : "text-[#667064]"
                      }`}
                    />
                  </button>
                  <Link
                    href="/projects"
                    className="text-xs font-bold text-[#315C3D] hover:text-[#497A52] flex items-center gap-1"
                  >
                    View All →
                  </Link>
                </div>

                {mobileProjectsOpen && (
                  <div className="p-3 space-y-3 bg-[#FFFFFF]">
                    {/* 10 Domains Grid */}
                    <div className="grid grid-cols-2 gap-1.5">
                      {PROJECT_CATEGORIES.map((cat) => (
                        <Link
                          key={cat}
                          href={`/projects?category=${encodeURIComponent(cat)}`}
                          className="flex items-center gap-2 p-2 rounded-lg bg-[#F5F1E7] border border-[#DDDCCF] hover:border-[#315C3D] text-xs text-[#667064] hover:text-[#202820] font-semibold"
                        >
                          <div className="p-1 rounded bg-[#DCE8D9] shrink-0">
                            {categoryIcons[cat]}
                          </div>
                          <span className="truncate">{cat}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Featured Projects Mini Thumbnails on Mobile */}
                    <div className="pt-2 border-t border-[#DDDCCF]">
                      <span className="text-[11px] font-bold text-[#202820] uppercase tracking-wider block mb-2 font-mono">
                        Featured Projects
                      </span>
                      <div className="grid grid-cols-2 gap-2">
                        {DROPDOWN_FEATURED_PROJECTS.map((proj) => (
                          <Link
                            key={proj.id}
                            href={proj.href}
                            className="bg-[#F5F1E7] rounded-lg border border-[#DDDCCF] overflow-hidden group block hover:border-[#315C3D]"
                          >
                            <div className="relative aspect-video w-full bg-[#EEE9DC]">
                              <Image
                                src={proj.thumbnail}
                                alt={proj.title}
                                fill
                                sizes="150px"
                                className="object-cover"
                              />
                            </div>
                            <div className="p-1.5">
                              <span className="block text-[10px] font-bold text-[#202820] truncate">
                                {proj.title}
                              </span>
                              <span className="text-[9px] text-[#315C3D] font-semibold">
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
                      className="w-full py-2 rounded-xl bg-[#315C3D] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
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
                      ? "text-[#315C3D] bg-[#DCE8D9] font-bold border border-[#DCE8D9]"
                      : "text-[#202820] hover:bg-[#EEE9DC]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-[#DDDCCF] flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/project-enquiry"
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2.5 px-3 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs group"
                >
                  <ClipboardList className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                  <span>Project Enquiry</span>
                </Link>

                <Link
                  href="/admin/login"
                  className="py-2.5 px-3 rounded-xl bg-[#FFFFFF] hover:bg-[#EEE9DC] border border-[#DDDCCF] hover:border-[#315C3D] text-[#202820] hover:text-[#315C3D] text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                >
                  <ShieldCheck className="w-4 h-4 text-[#315C3D]" />
                  <span>Admin Login</span>
                </Link>
              </div>

              <a
                href={defaultWhatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D] text-[#315C3D] text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#315C3D]" />
                WhatsApp Us ({WHATSAPP_DISPLAY})
              </a>
              <a
                href={`tel:+${WHATSAPP_NUMBER}`}
                className="w-full py-2 px-4 rounded-xl bg-[#FFFFFF] border border-[#DDDCCF] text-[#202820] hover:text-[#315C3D] text-xs font-semibold flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-[#315C3D]" />
                Call Desk ({WHATSAPP_DISPLAY})
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

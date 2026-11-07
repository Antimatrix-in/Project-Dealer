"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  ClipboardList,
  ExternalLink
} from "lucide-react";
import {
  getWhatsAppUrl,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  CONTACT_EMAIL,
  CONTACT_EMAIL_MAILTO,
  GOOGLE_ENQUIRY_FORM_URL,
  LINKEDIN_PROFILE_URL,
  INSTAGRAM_PROFILE_URL
} from "@/lib/whatsapp";

const FOOTER_DOMAINS = [
  { name: "Python Projects", code: "AMPY" },
  { name: "Java Projects", code: "AMJV" },
  { name: "Cyber Security", code: "AMCY" },
  { name: "Django – Python", code: "AMDJ" },
  { name: "Data Science – Python", code: "AMDS" },
  { name: "Image Processing – MATLAB", code: "AMIM" },
  { name: "Deep Learning", code: "AMDL" },
  { name: "Artificial Intelligence", code: "AMAI" },
  { name: "Web Application – PHP", code: "AMPH" },
  { name: "Android – Java", code: "AMAD" },
  { name: "Big Data – Python/Java", code: "AMBD" },
  { name: "Image Processing – Python", code: "AMIP" },
  { name: "Cloud Computing – Python/Java", code: "AMCC" },
  { name: "Data Mining – Python/Java", code: "AMDM" },
  { name: "Blockchain – Python/Java/DotNet", code: "AMBC" },
  { name: "Machine Learning – Python", code: "AMML" },
];

export default function Footer() {
  const pathname = usePathname();
  const whatsAppUrl = getWhatsAppUrl();

  // Hide public website footer on the full-screen Admin Dashboard console
  if (pathname?.startsWith("/admin/dashboard")) {
    return null;
  }

  const quickLinks = [
    { label: "Home", href: "/", isExternal: false },
    { label: "Projects", href: "/projects", isExternal: false },
    { label: "Services", href: "/services", isExternal: false },
    { label: "About Us", href: "/about", isExternal: false },
    { label: "Reviews", href: "/reviews", isExternal: false },
    { label: "Contact", href: "/contact", isExternal: false },
    { label: "Project Enquiry", href: GOOGLE_ENQUIRY_FORM_URL, isExternal: true },
  ];

  return (
    <footer className="relative bg-[#243B2C] border-t border-[#315C3D]/50 pt-16 pb-12 overflow-hidden text-[#F5F1E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Trust Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-12 mb-12 border-b border-[#365741] text-xs">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#1D3124] border border-[#365741] shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#DCE8D9] shrink-0" />
            <div>
              <p className="font-bold text-[#F5F1E7]">University Standard Compliant</p>
              <p className="text-[11px] text-[#DCE8D9]/80">Strict syllabus &amp; review standards</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#1D3124] border border-[#365741] shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-[#DCE8D9] shrink-0" />
            <div>
              <p className="font-bold text-[#F5F1E7]">100% Working Execution</p>
              <p className="text-[11px] text-[#DCE8D9]/80">Tested and verified locally</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#1D3124] border border-[#365741] shadow-xs">
            <Sparkles className="w-5 h-5 text-[#DCE8D9] shrink-0" />
            <div>
              <p className="font-bold text-[#F5F1E7]">Low Plagiarism Guarantee</p>
              <p className="text-[11px] text-[#DCE8D9]/80">Industry standard verification</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#1D3124] border border-[#365741] shadow-xs">
            <Clock className="w-5 h-5 text-[#DCE8D9] shrink-0" />
            <div>
              <p className="font-bold text-[#F5F1E7]">Dedicated Technical Mentorship</p>
              <p className="text-[11px] text-[#DCE8D9]/80">Remote screen-share support</p>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#365741]">
          {/* Brand Column (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center group" title="Anti-Matrix Project Center">
              <div className="px-3.5 py-2 rounded-xl bg-white border border-[#DDDCCF]/80 shadow-xs flex items-center justify-center group-hover:border-[#DCE8D9] transition-colors">
                <Image
                  src="/images/anti-matrix-logo.png"
                  alt="Anti-Matrix Official Logo"
                  width={190}
                  height={40}
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-sm text-[#F5F1E7]/80 leading-relaxed max-w-sm">
              <strong className="text-[#F5F1E7]">Transform Your Ideas Into Real-World Projects.</strong>{" "}
              AntiMatrix is a premier project development and research guidance center empowering engineering and computer science students with industry-grade source code, comprehensive project documentation, and 1-on-1 viva defense mentoring.
            </p>

            {/* Primary Action Buttons: Project Enquiry + WhatsApp */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 border border-[#315C3D]"
              >
                <ClipboardList className="w-4 h-4 text-white" />
                <span>Project Enquiry</span>
                <ExternalLink className="w-3 h-3 text-white/80 ml-0.5" />
              </a>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1D3124] hover:bg-[#284232] border border-[#365741] text-[#DCE8D9] hover:text-white text-xs font-bold transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#DCE8D9]" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <p className="text-[11px] font-semibold text-[#DCE8D9] font-mono tracking-wider uppercase mb-2.5">
                FOLLOW
              </p>
              <div className="flex flex-wrap items-center gap-2.5 text-[#DCE8D9]">
                <a
                  href={INSTAGRAM_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#1D3124] hover:bg-[#315C3D] border border-[#365741] text-[#DCE8D9] hover:text-white flex items-center justify-center transition-all shadow-xs hover:-translate-y-0.5"
                  aria-label="Follow AntiMatrix on Instagram"
                  title="Follow AntiMatrix on Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href={LINKEDIN_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#1D3124] hover:bg-[#315C3D] border border-[#365741] text-[#DCE8D9] hover:text-white flex items-center justify-center transition-all shadow-xs hover:-translate-y-0.5"
                  aria-label="Follow AntiMatrix on LinkedIn"
                  title="Follow AntiMatrix on LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#1D3124] hover:bg-[#315C3D] border border-[#365741] text-[#DCE8D9] hover:text-white flex items-center justify-center transition-all shadow-xs hover:-translate-y-0.5"
                  aria-label="GitHub"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </a>

                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#1D3124] hover:bg-[#315C3D] border border-[#365741] text-[#DCE8D9] hover:text-white flex items-center justify-center transition-all shadow-xs hover:-translate-y-0.5"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-[#DCE8D9]" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="text-[#F5F1E7] text-sm font-bold tracking-wider uppercase mb-4 font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {link.isExternal ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#DCE8D9] hover:text-white transition-colors flex items-center gap-1.5 font-bold group"
                    >
                      <ArrowRight className="w-3 h-3 text-[#DCE8D9] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      <span>{link.label}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-[#DCE8D9]/70 group-hover:text-white" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-[#DCE8D9]/90 hover:text-white transition-colors flex items-center gap-1.5 font-medium group"
                    >
                      <ArrowRight className="w-3 h-3 text-[#DCE8D9] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      <span>{link.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column (16 Project Domains - lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="text-[#F5F1E7] text-sm font-bold tracking-wider uppercase mb-4 font-mono">
              16 Project Domains
            </h4>
            <ul className="space-y-1.5 text-xs">
              {FOOTER_DOMAINS.map((domain) => (
                <li key={domain.code}>
                  <Link
                    href={`/projects/${domain.code}`}
                    className="text-[#DCE8D9]/80 hover:text-white transition-colors flex items-center gap-1.5 font-medium group"
                  >
                    <ArrowRight className="w-3 h-3 text-[#DCE8D9] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span>{domain.name}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/projects"
                  className="text-[#DCE8D9] hover:text-white hover:underline font-bold block"
                >
                  View All Projects &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information Column (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="text-[#F5F1E7] text-sm font-bold tracking-wider uppercase mb-4 font-mono">
              Contact Information
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2.5 text-[#F5F1E7]/90">
                <MapPin className="w-4 h-4 text-[#DCE8D9] shrink-0" />
                <span>Chennai, Tamil Nadu</span>
              </li>
              <li className="flex items-center gap-2.5 text-[#F5F1E7]/90">
                <Phone className="w-4 h-4 text-[#DCE8D9] shrink-0" />
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-white transition-colors font-mono font-semibold text-[#F5F1E7]">
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[#F5F1E7]/90">
                <Mail className="w-4 h-4 text-[#DCE8D9] shrink-0" />
                <a href={CONTACT_EMAIL_MAILTO} className="hover:text-white transition-colors font-medium text-[#F5F1E7]">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[#F5F1E7]/90">
                <MessageCircle className="w-4 h-4 text-[#DCE8D9] shrink-0" />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-semibold text-[#DCE8D9]"
                >
                  WhatsApp: {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="text-[11px] text-[#DCE8D9]/70 pt-1 border-t border-[#365741]">
                Mon - Sat: 9:00 AM - 9:00 PM IST<br />
                Sunday: Emergency Review Support
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DCE8D9]/80">
          <p>© {new Date().getFullYear()} AntiMatrix Technologies. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {quickLinks.map((link) =>
              link.isExternal ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-semibold text-[#F5F1E7]"
                >
                  {link.label} ↗
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-white transition-colors text-[#DCE8D9]/80"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

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

export default function Footer() {
  const pathname = usePathname();
  const whatsAppUrl = getWhatsAppUrl();

  // Hide public website footer on the full-screen Admin Dashboard console
  if (pathname?.startsWith("/admin/dashboard")) {
    return null;
  }

  const quickLinks = [
    { label: "Home", href: "/", isExternal: false },
    { label: "Domains", href: "/projects", isExternal: false },
    { label: "Services", href: "/services", isExternal: false },
    { label: "About Us", href: "/about", isExternal: false },
    { label: "Reviews", href: "/reviews", isExternal: false },
    { label: "Contact", href: "/contact", isExternal: false },
    { label: "Project Enquiry", href: GOOGLE_ENQUIRY_FORM_URL, isExternal: true },
  ];

  return (
    <footer className="relative bg-[#101D38] border-t border-[#1A2C50] pt-16 pb-12 overflow-hidden text-[#DCE2EA]">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        {/* Top Trust Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-12 mb-12 border-b border-[#263750] text-xs">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#182848] border border-[#263750] shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#F58216] shrink-0" />
            <div>
              <p className="font-bold text-white">University Standard Compliant</p>
              <p className="text-[11px] text-[#DCE2EA]/80">Strict syllabus &amp; review standards</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#182848] border border-[#263750] shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-[#F58216] shrink-0" />
            <div>
              <p className="font-bold text-white">100% Working Execution</p>
              <p className="text-[11px] text-[#DCE2EA]/80">Tested and verified locally</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#182848] border border-[#263750] shadow-xs">
            <Sparkles className="w-5 h-5 text-[#F58216] shrink-0" />
            <div>
              <p className="font-bold text-white">Low Plagiarism Guarantee</p>
              <p className="text-[11px] text-[#DCE2EA]/80">Industry standard verification</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#182848] border border-[#263750] shadow-xs">
            <Clock className="w-5 h-5 text-[#F58216] shrink-0" />
            <div>
              <p className="font-bold text-white">Dedicated Technical Mentorship</p>
              <p className="text-[11px] text-[#DCE2EA]/80">Remote screen-share support</p>
            </div>
          </div>
        </div>

        {/* Main Footer Grid - 3 Balanced Columns (5 + 3 + 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 xl:gap-14 pb-12 border-b border-[#263750]">
          {/* Brand Column (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center group" title="UPWORKS – Project Development Services">
              <div className="px-3.5 py-2 rounded-xl bg-white border border-[#DCE2EA] shadow-xs flex items-center justify-center group-hover:border-[#F58216] transition-colors">
                <Image
                  src="/images/upworks-logo.png"
                  alt="UPWORKS – Project Development Services Official Logo"
                  width={210}
                  height={45}
                  className="h-8 sm:h-9 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-sm text-[#DCE2EA]/85 leading-relaxed max-w-md">
              <strong className="text-white">Transform Your Ideas Into Real-World Projects.</strong>{" "}
              UPWORKS is India&apos;s premier academic project development and research guidance center empowering engineering and computer science students with industry-grade source code, comprehensive project documentation, and 1-on-1 viva defense mentoring.
            </p>

            {/* Primary Action Buttons: Project Enquiry + WhatsApp */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F58216] hover:bg-[#E0720F] text-white text-xs font-bold transition-all shadow-xs hover:shadow-md hover:-translate-y-0.5 border border-[#F58216]"
              >
                <ClipboardList className="w-4 h-4 text-white" />
                <span>Project Enquiry</span>
                <ExternalLink className="w-3 h-3 text-white/80 ml-0.5" />
              </a>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#182848] hover:bg-[#20345C] border border-[#263750] text-[#DCE2EA] hover:text-white text-xs font-bold transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#F58216]" />
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <p className="text-[11px] font-semibold text-[#DCE2EA] font-mono tracking-wider uppercase mb-2.5">
                FOLLOW
              </p>
              <div className="flex flex-wrap items-center gap-2.5 text-[#DCE2EA]">
                <a
                  href={INSTAGRAM_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#182848] hover:bg-[#F58216] border border-[#263750] text-[#DCE2EA] hover:text-white flex items-center justify-center transition-all shadow-xs hover:-translate-y-0.5"
                  aria-label="Follow UPWORKS on Instagram"
                  title="Follow UPWORKS on Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>

                <a
                  href={LINKEDIN_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#182848] hover:bg-[#F58216] border border-[#263750] text-[#DCE2EA] hover:text-white flex items-center justify-center transition-all shadow-xs hover:-translate-y-0.5"
                  aria-label="Follow UPWORKS on LinkedIn"
                  title="Follow UPWORKS on LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>

                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl bg-[#182848] hover:bg-[#F58216] border border-[#263750] text-[#DCE2EA] hover:text-white flex items-center justify-center transition-all shadow-xs hover:-translate-y-0.5"
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
                  className="w-9 h-9 rounded-xl bg-[#182848] hover:bg-[#F58216] border border-[#263750] text-[#DCE2EA] hover:text-white flex items-center justify-center transition-all shadow-xs hover:-translate-y-0.5"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-[#DCE2EA]" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Column (lg:col-span-3 lg:pl-8) */}
          <div className="lg:col-span-3 lg:pl-8">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4 font-mono">
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
                      className="text-[#DCE2EA] hover:text-[#F58216] transition-colors flex items-center gap-1.5 font-bold group"
                    >
                      <ArrowRight className="w-3 h-3 text-[#F58216] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      <span>{link.label}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-[#DCE2EA]/70 group-hover:text-[#F58216]" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-[#DCE2EA]/90 hover:text-[#F58216] transition-colors flex items-center gap-1.5 font-medium group"
                    >
                      <ArrowRight className="w-3 h-3 text-[#F58216] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      <span>{link.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information Column (lg:col-span-4 lg:pl-8) */}
          <div className="lg:col-span-4 lg:pl-8">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4 font-mono">
              Contact Information
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li className="flex items-center gap-2.5 text-[#DCE2EA]">
                <MapPin className="w-4 h-4 text-[#F58216] shrink-0" />
                <span>Chennai, Tamil Nadu</span>
              </li>
              <li className="flex items-center gap-2.5 text-[#DCE2EA]">
                <Phone className="w-4 h-4 text-[#F58216] shrink-0" />
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-[#F58216] transition-colors font-mono font-semibold text-white">
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[#DCE2EA]">
                <Mail className="w-4 h-4 text-[#F58216] shrink-0" />
                <a href={CONTACT_EMAIL_MAILTO} className="hover:text-[#F58216] transition-colors font-medium text-white">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-[#DCE2EA]">
                <MessageCircle className="w-4 h-4 text-[#F58216] shrink-0" />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F58216] transition-colors font-semibold text-[#DCE2EA]"
                >
                  WhatsApp: {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="text-[11px] text-[#DCE2EA]/70 pt-2 border-t border-[#263750] leading-relaxed">
                Mon - Sat: 9:00 AM - 9:00 PM IST<br />
                Sunday: Emergency Review Support
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#DCE2EA]/80">
          <p>© {new Date().getFullYear()} UPWORKS – Project Development Services. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {quickLinks.map((link) =>
              link.isExternal ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F58216] transition-colors font-semibold text-white"
                >
                  {link.label} ↗
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-[#F58216] transition-colors text-[#DCE2EA]/80"
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

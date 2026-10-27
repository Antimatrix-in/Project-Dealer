import React from "react";
import Link from "next/link";
import Image from "next/image";
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
import { PROJECT_CATEGORIES } from "@/data/projects";
import {
  getWhatsAppUrl,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  CONTACT_EMAIL,
  CONTACT_EMAIL_MAILTO,
  GOOGLE_ENQUIRY_FORM_URL
} from "@/lib/whatsapp";

export default function Footer() {
  const whatsAppUrl = getWhatsAppUrl();

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
    <footer className="relative bg-[#080808] border-t border-[#2A2A2A] pt-16 pb-12 overflow-hidden text-[#B8B8B8]">
      {/* Background Soft Orange Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF7900]/05 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF4500]/04 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Trust Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-12 mb-12 border-b border-[#2A2A2A] text-xs">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#161616] border border-[#2A2A2A] shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#FF7900] shrink-0" />
            <div>
              <p className="font-bold text-[#FFFFFF]">University Standard Compliant</p>
              <p className="text-[11px] text-[#B8B8B8]">Strict syllabus &amp; review standards</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#161616] border border-[#2A2A2A] shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-[#FF7900] shrink-0" />
            <div>
              <p className="font-bold text-[#FFFFFF]">100% Working Execution</p>
              <p className="text-[11px] text-[#B8B8B8]">Tested and verified locally</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#161616] border border-[#2A2A2A] shadow-xs">
            <Sparkles className="w-5 h-5 text-[#FF7900] shrink-0" />
            <div>
              <p className="font-bold text-[#FFFFFF]">Low Plagiarism Guarantee</p>
              <p className="text-[11px] text-[#B8B8B8]">Industry standard verification</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#161616] border border-[#2A2A2A] shadow-xs">
            <Clock className="w-5 h-5 text-[#FF7900] shrink-0" />
            <div>
              <p className="font-bold text-[#FFFFFF]">Dedicated Technical Mentorship</p>
              <p className="text-[11px] text-[#B8B8B8]">Remote screen-share support</p>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2A2A2A]">
          {/* Brand Column (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#161616] border border-[#2A2A2A] shadow-xs p-1 flex items-center justify-center">
                <Image
                  src="/images/antimatrix-icon.png"
                  alt="AntiMatrix"
                  width={36}
                  height={36}
                  className="w-8 h-8 object-contain brightness-0 invert"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold text-[#FFFFFF] tracking-tight">AntiMatrix</span>
                <span className="block text-[10px] tracking-wider uppercase text-[#FF7900] font-mono font-bold">
                  Project Center
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#B8B8B8] leading-relaxed max-w-sm">
              <strong className="text-[#FFFFFF]">Transform Your Ideas Into Real-World Projects.</strong>{" "}
              AntiMatrix is a premier project development and research guidance center empowering engineering and computer science students with industry-grade source code, comprehensive project documentation, and 1-on-1 viva defense mentoring.
            </p>

            {/* Primary Action Buttons: Project Enquiry + WhatsApp */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF7900] to-[#FF4500] hover:opacity-95 text-white text-xs font-bold transition-all shadow-[0_4px_16px_rgba(255,121,0,0.35)] hover:shadow-[0_6px_22px_rgba(255,121,0,0.5)] hover:-translate-y-0.5 border border-[#FF7900]/30"
              >
                <ClipboardList className="w-4 h-4 text-white" />
                <span>Project Enquiry</span>
                <ExternalLink className="w-3 h-3 text-white/80 ml-0.5" />
              </a>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#161616] hover:bg-[#1D1D1D] border border-[#2A2A2A] hover:border-[#FF7900] text-[#FFFFFF] hover:text-[#FF7900] text-xs font-bold transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#FF7900]" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="text-[#FFFFFF] text-sm font-bold tracking-wider uppercase mb-4 font-mono">
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
                      className="text-[#FFFFFF] hover:text-[#FF7900] transition-colors flex items-center gap-1.5 font-bold group"
                    >
                      <ArrowRight className="w-3 h-3 text-[#FF7900] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      <span>{link.label}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-[#B8B8B8] group-hover:text-[#FF7900]" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="hover:text-[#FF7900] text-[#B8B8B8] transition-colors flex items-center gap-1.5 font-medium group"
                    >
                      <ArrowRight className="w-3 h-3 text-[#FF7900] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      <span>{link.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column (10 Project Domains - lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="text-[#FFFFFF] text-sm font-bold tracking-wider uppercase mb-4 font-mono">
              10 Project Domains
            </h4>
            <ul className="space-y-2 text-xs">
              {PROJECT_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/projects?category=${encodeURIComponent(cat)}`}
                    className="hover:text-[#FF7900] text-[#B8B8B8] transition-colors flex items-center gap-1.5 font-medium"
                  >
                    <ArrowRight className="w-3 h-3 text-[#FF7900] shrink-0" />
                    <span>{cat}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/projects"
                  className="text-[#FF7900] hover:text-[#FF9500] hover:underline font-bold block"
                >
                  View All Projects &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information Column (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="text-[#FFFFFF] text-sm font-bold tracking-wider uppercase mb-4 font-mono">
              Contact Information
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF7900] shrink-0" />
                <span>Chennai, Tamil Nadu</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#FF7900] shrink-0" />
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-[#FF7900] transition-colors font-mono font-semibold text-[#FFFFFF]">
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF7900] shrink-0" />
                <a href={CONTACT_EMAIL_MAILTO} className="hover:text-[#FF7900] transition-colors font-medium text-[#FFFFFF]">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#FF7900] shrink-0" />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF9500] transition-colors font-medium text-[#FF7900]"
                >
                  WhatsApp: {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="text-[11px] text-[#B8B8B8] pt-1 border-t border-[#2A2A2A]">
                Mon - Sat: 9:00 AM - 9:00 PM IST<br />
                Sunday: Emergency Review Support
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8B8B8]">
          <p>© {new Date().getFullYear()} AntiMatrix Technologies. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {quickLinks.map((link) =>
              link.isExternal ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF7900] transition-colors font-semibold text-[#FFFFFF]"
                >
                  {link.label} ↗
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-[#FF7900] transition-colors text-[#B8B8B8]"
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

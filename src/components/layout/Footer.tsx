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
    <footer className="relative bg-[#FFF9F5] border-t border-[#FF6B00]/15 pt-16 pb-12 overflow-hidden text-[#526581]">
      {/* Background Soft Warm Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF6B00]/06 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#FF3D3D]/05 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Trust Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-12 mb-12 border-b border-[#FF6B00]/15 text-xs">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#FF6B00]/15 shadow-xs">
            <ShieldCheck className="w-5 h-5 text-[#FF6B00] shrink-0" />
            <div>
              <p className="font-bold text-[#101828]">University Standard Compliant</p>
              <p className="text-[11px] text-[#526581]">Strict syllabus &amp; review standards</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#FF6B00]/15 shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-[#00A86B] shrink-0" />
            <div>
              <p className="font-bold text-[#101828]">100% Working Execution</p>
              <p className="text-[11px] text-[#526581]">Tested and verified locally</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#FF6B00]/15 shadow-xs">
            <Sparkles className="w-5 h-5 text-[#FF3D3D] shrink-0" />
            <div>
              <p className="font-bold text-[#101828]">Low Plagiarism Guarantee</p>
              <p className="text-[11px] text-[#526581]">Industry standard verification</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#FF6B00]/15 shadow-xs">
            <Clock className="w-5 h-5 text-[#FF8A00] shrink-0" />
            <div>
              <p className="font-bold text-[#101828]">Dedicated Technical Mentorship</p>
              <p className="text-[11px] text-[#526581]">Remote screen-share support</p>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#FF6B00]/15">
          {/* Brand Column (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white border border-[#FF6B00]/25 shadow-xs p-1 flex items-center justify-center">
                <Image
                  src="/images/antimatrix-icon.png"
                  alt="AntiMatrix"
                  width={36}
                  height={36}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold text-[#101828] tracking-tight">AntiMatrix</span>
                <span className="block text-[10px] tracking-wider uppercase text-[#FF6B00] font-mono font-bold">
                  Project Center
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#526581] leading-relaxed max-w-sm">
              <strong className="text-[#101828]">Transform Your Ideas Into Real-World Projects.</strong>{" "}
              AntiMatrix is a premier project development and research guidance center empowering engineering and computer science students with industry-grade source code, comprehensive project documentation, and 1-on-1 viva defense mentoring.
            </p>

            {/* Primary Action Buttons: Project Enquiry + WhatsApp */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={GOOGLE_ENQUIRY_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF3D3D] to-[#D90429] hover:opacity-95 text-white text-xs font-bold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <ClipboardList className="w-4 h-4 text-white" />
                <span>Project Enquiry</span>
                <ExternalLink className="w-3 h-3 text-white/80 ml-0.5" />
              </a>

              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-[#00A86B]/40 text-[#00A86B] text-xs font-bold transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4 text-[#00A86B]" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column (lg:col-span-2) */}
          <div className="lg:col-span-2">
            <h4 className="text-[#101828] text-sm font-bold tracking-wider uppercase mb-4 font-mono">
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
                      className="text-[#101828] hover:text-[#FF6B00] transition-colors flex items-center gap-1.5 font-bold group"
                    >
                      <ArrowRight className="w-3 h-3 text-[#FF6B00] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      <span>{link.label}</span>
                      <ExternalLink className="w-2.5 h-2.5 text-slate-400 group-hover:text-[#FF6B00]" />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5 font-medium group"
                    >
                      <ArrowRight className="w-3 h-3 text-[#FF6B00] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                      <span>{link.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column (10 Project Domains - lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="text-[#101828] text-sm font-bold tracking-wider uppercase mb-4 font-mono">
              10 Project Domains
            </h4>
            <ul className="space-y-2 text-xs">
              {PROJECT_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/projects?category=${encodeURIComponent(cat)}`}
                    className="hover:text-[#FF6B00] transition-colors flex items-center gap-1.5 font-medium"
                  >
                    <ArrowRight className="w-3 h-3 text-[#FF6B00] shrink-0" />
                    <span>{cat}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/projects"
                  className="text-[#FF6B00] hover:text-[#D90429] hover:underline font-bold block"
                >
                  View All Projects &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information Column (lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="text-[#101828] text-sm font-bold tracking-wider uppercase mb-4 font-mono">
              Contact Information
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#FF6B00] shrink-0" />
                <span>Chennai, Tamil Nadu</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00A86B] shrink-0" />
                <a href={`tel:+${WHATSAPP_NUMBER}`} className="hover:text-[#FF6B00] transition-colors font-mono font-semibold">
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#FF3D3D] shrink-0" />
                <a href={CONTACT_EMAIL_MAILTO} className="hover:text-[#FF6B00] transition-colors font-medium">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#00A86B] shrink-0" />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00925C] transition-colors font-medium text-[#00A86B]"
                >
                  WhatsApp: {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="text-[11px] text-[#526581] pt-1 border-t border-[#FF6B00]/15">
                Mon - Sat: 9:00 AM - 9:00 PM IST<br />
                Sunday: Emergency Review Support
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#526581]">
          <p>© {new Date().getFullYear()} AntiMatrix Technologies. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            {quickLinks.map((link) =>
              link.isExternal ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FF6B00] transition-colors font-semibold text-[#101828]"
                >
                  {link.label} ↗
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="hover:text-[#FF6B00] transition-colors"
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

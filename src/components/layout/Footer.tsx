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
    { label: "Project Enquiry", href: "/project-enquiry", isExternal: false },
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
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-xs p-1 flex items-center justify-center">
                <Image
                  src="/images/antimatrix-icon.png"
                  alt="AntiMatrix"
                  width={36}
                  height={36}
                  className="w-8 h-8 object-contain"
                />
              </div>
              <div>
                <span className="text-xl font-extrabold text-[#F5F1E7] tracking-tight">AntiMatrix</span>
                <span className="block text-[10px] tracking-wider uppercase text-[#DCE8D9] font-mono font-bold">
                  Project Center
                </span>
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

          {/* Categories Column (10 Project Domains - lg:col-span-3) */}
          <div className="lg:col-span-3">
            <h4 className="text-[#F5F1E7] text-sm font-bold tracking-wider uppercase mb-4 font-mono">
              10 Project Domains
            </h4>
            <ul className="space-y-2 text-xs">
              {PROJECT_CATEGORIES.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/projects?category=${encodeURIComponent(cat)}`}
                    className="text-[#DCE8D9]/80 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
                  >
                    <ArrowRight className="w-3 h-3 text-[#DCE8D9] shrink-0" />
                    <span>{cat}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
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

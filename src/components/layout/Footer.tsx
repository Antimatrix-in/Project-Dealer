"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  MapPin,
  ArrowRight
} from "lucide-react";
import {
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY
} from "@/lib/whatsapp";

export default function Footer() {
  const pathname = usePathname();

  // Hide public website footer on the full-screen Admin Dashboard console
  if (pathname?.startsWith("/admin/dashboard")) {
    return null;
  }

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Domains", href: "/projects" },
    { label: "Services", href: "/services" },
    { label: "About Us", href: "/about" },
    { label: "Reviews", href: "/reviews" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="relative bg-[#101D38] border-t border-[#1A2C50] pt-12 pb-8 overflow-hidden text-[#DCE2EA]">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 relative z-10">
        {/* Main Footer Grid - 3 Clean Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 xl:gap-12 pb-10 border-b border-[#263750]">
          {/* Brand Column (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-3.5">
            <Link href="/" className="inline-flex items-center group" title="UPWORKS – Project Development Services">
              <div className="px-3 py-1.5 rounded-xl bg-white border border-[#DCE2EA] shadow-xs flex items-center justify-center group-hover:border-[#F58216] transition-colors">
                <Image
                  src="/images/upworks-logo.png"
                  alt="UPWORKS – Project Development Services Official Logo"
                  width={180}
                  height={40}
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-[#DCE2EA]/80 leading-relaxed max-w-sm">
              Premier academic project development, complete documentation, and 1-on-1 viva defense mentorship for engineering and computer science students.
            </p>
          </div>

          {/* Quick Links Column (lg:col-span-3 lg:pl-8) */}
          <div className="lg:col-span-3 lg:pl-8">
            <h4 className="text-white text-xs font-bold tracking-wider uppercase mb-3 font-mono">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#DCE2EA]/85 hover:text-[#F58216] transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 text-[#F58216] shrink-0 group-hover:translate-x-0.5 transition-transform" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information Column (lg:col-span-4 lg:pl-8) */}
          <div className="lg:col-span-4 lg:pl-8">
            <h4 className="text-white text-xs font-bold tracking-wider uppercase mb-3 font-mono">
              Contact
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2.5 text-[#DCE2EA]">
                <MapPin className="w-4 h-4 text-[#F58216] shrink-0" />
                <span>Chennai, Tamil Nadu</span>
              </li>
              <li className="flex items-center gap-2.5 text-[#DCE2EA]">
                <Phone className="w-4 h-4 text-[#F58216] shrink-0" />
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F58216] transition-colors font-mono font-semibold text-white"
                >
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 text-center text-[11px] text-[#DCE2EA]/70">
          <p>© {new Date().getFullYear()} UPWORKS – Project Development Services. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

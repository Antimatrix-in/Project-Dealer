import React from "react";
import Link from "next/link";
import {
  Sparkles,
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight
} from "lucide-react";
import { PROJECT_CATEGORIES } from "@/data/projects";
import { SERVICES_DATA } from "@/data/services";

export default function Footer() {
  return (
    <footer className="relative bg-slate-50 border-t border-slate-200 pt-16 pb-12 overflow-hidden text-slate-600">
      {/* Background Soft Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Trust Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pb-12 mb-12 border-b border-slate-200 text-xs">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="font-bold text-[#0A1128]">University Standard Compliant</p>
              <p className="text-[11px] text-slate-500">Strict syllabus & review standards</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <p className="font-bold text-[#0A1128]">100% Working Execution</p>
              <p className="text-[11px] text-slate-500">Tested and verified locally</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
            <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="font-bold text-[#0A1128]">Low Plagiarism Guarantee</p>
              <p className="text-[11px] text-slate-500">Academic standard verification</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm">
            <Clock className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="font-bold text-[#0A1128]">Dedicated Technical Mentorship</p>
              <p className="text-[11px] text-slate-500">Remote screen-share support</p>
            </div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-200">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-600 p-[1.5px] shadow-sm shadow-amber-500/20">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <span className="text-xl font-black text-amber-600 font-mono">
                    AM
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xl font-extrabold text-[#0A1128] tracking-tight">AntiMatrix</span>
                <span className="block text-[10px] tracking-wider uppercase text-amber-700 font-mono font-bold">
                  Academic Project Center
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-600 leading-relaxed max-w-sm">
              <strong className="text-[#0A1128]">Transform Your Ideas Into Academic Projects.</strong>{" "}
              AntiMatrix is an academic project development and research guidance center empowering engineering and computer science students with industry-grade source code, comprehensive project documentation, and 1-on-1 viva defense mentoring.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-bold transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Helpline</span>
              </a>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-[#0A1128] text-xs font-semibold transition-colors"
              >
                Contact Center
              </Link>
            </div>
          </div>

          {/* Categories Column (10 Categories) */}
          <div>
            <h4 className="text-[#0A1128] text-sm font-bold tracking-wider uppercase mb-4 font-mono">
              Project Domains
            </h4>
            <ul className="space-y-2 text-xs">
              {PROJECT_CATEGORIES.slice(0, 7).map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/projects?category=${encodeURIComponent(cat)}`}
                    className="hover:text-amber-700 transition-colors flex items-center gap-1.5 font-medium"
                  >
                    <ArrowRight className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{cat}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/projects"
                  className="text-amber-700 hover:text-amber-800 hover:underline font-bold block pt-1"
                >
                  + All 10 Domains &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-[#0A1128] text-sm font-bold tracking-wider uppercase mb-4 font-mono">
              Our Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              {SERVICES_DATA.map((srv) => (
                <li key={srv.id}>
                  <Link
                    href={`/services#${srv.id}`}
                    className="hover:text-amber-700 transition-colors flex items-center gap-1.5 font-medium"
                  >
                    <ArrowRight className="w-3 h-3 text-amber-500 shrink-0" />
                    <span>{srv.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-[#0A1128] text-sm font-bold tracking-wider uppercase mb-4 font-mono">
              Project Center
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>AntiMatrix Tech Innovation Tower, Cyber IT Hub, Tech Park, Chennai - 600096</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-amber-700 transition-colors font-mono font-semibold">
                  +91 98765 43210 / +91 98765 43211
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                <a href="mailto:projects@antimatrix.tech" className="hover:text-amber-700 transition-colors">
                  projects@antimatrix.tech
                </a>
              </li>
              <li className="text-[11px] text-slate-500 pt-1">
                Mon - Sat: 9:00 AM - 9:00 PM IST<br />
                Sunday: Emergency Review Support
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} AntiMatrix Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[#0A1128] transition-colors">
              About AntiMatrix
            </Link>
            <Link href="/reviews" className="hover:text-[#0A1128] transition-colors">
              Student Reviews
            </Link>
            <Link href="/contact" className="hover:text-[#0A1128] transition-colors">
              Support Desk
            </Link>
            <Link href="/projects" className="hover:text-[#0A1128] transition-colors">
              Project Catalog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

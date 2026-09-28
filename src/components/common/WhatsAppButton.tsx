"use client";

import React, { useState } from "react";
import { MessageCircle, X, Sparkles, Send, PhoneCall } from "lucide-react";

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");

  const phoneNumber = "919876543210";

  const handleOpenWhatsApp = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encoded}`, "_blank");
    setIsOpen(false);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMsg.trim()) {
      handleOpenWhatsApp("Hello AntiMatrix, I would like to inquire about academic projects.");
    } else {
      handleOpenWhatsApp(customMsg);
    }
  };

  const quickPrompts = [
    "Hi AntiMatrix! Need a Final Year AI / ML / Deep Learning Project with standard base paper.",
    "Hi, I need assistance with Python / Java academic project code & PPT.",
    "Hi, I want documentation support (research paper + SRS + synopsis) for my project.",
    "Hi, can we discuss Cyber Security / Cloud Computing project topics?"
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Quick Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                  <MessageCircle className="w-5 h-5 fill-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-300 border-2 border-white" />
              </div>
              <div>
                <h4 className="font-bold text-sm">AntiMatrix Tech Desk</h4>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                  Academic Mentors Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-white">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
              👋 <strong className="text-[#0A1128]">Hello Student!</strong> Need quick assistance with your academic project, base paper, or college review defense?
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-amber-700 uppercase tracking-wider font-mono">
              <span>Quick Inquiries:</span>
              <a href="tel:+919876543210" className="text-slate-500 hover:text-amber-700 flex items-center gap-1 font-semibold">
                <PhoneCall className="w-3 h-3 text-amber-600" />
                <span>Call Hotline</span>
              </a>
            </div>

            <div className="space-y-1.5">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOpenWhatsApp(prompt)}
                  className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50/70 border border-slate-200 hover:border-amber-300 text-xs text-slate-700 hover:text-amber-800 transition-all cursor-pointer flex items-center justify-between group"
                >
                  <span className="line-clamp-1">{prompt}</span>
                  <Sparkles className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 shrink-0 ml-1.5" />
                </button>
              ))}
            </div>

            <form onSubmit={handleCustomSend} className="pt-2 flex gap-2">
              <input
                type="text"
                placeholder="Type your project requirement..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-[#0A1128] placeholder-slate-400 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold transition-colors cursor-pointer"
                aria-label="Send via WhatsApp"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group p-4 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-600 text-white shadow-xl shadow-emerald-500/25 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center focus:outline-none border-2 border-white"
        aria-label="Open WhatsApp Support"
      >
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-white font-extrabold text-[10px] flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
          1
        </span>
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold font-sans group-hover:pl-2">
          WhatsApp Us
        </span>
      </button>
    </div>
  );
}

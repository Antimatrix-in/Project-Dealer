"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ConsultationRequest } from "@/lib/inquiries";
import {
  LogOut,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  MessageCircle,
  Mail,
  Phone,
  GraduationCap,
  Calendar,
  Layers,
  FileText,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  X,
  ShieldCheck,
  Check
} from "lucide-react";

interface AdminDashboardClientProps {
  adminEmail: string;
  initialInquiries: ConsultationRequest[];
}

export default function AdminDashboardClient({
  adminEmail,
  initialInquiries
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [inquiries, setInquiries] = useState<ConsultationRequest[]>(initialInquiries);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [selectedInquiry, setSelectedInquiry] = useState<ConsultationRequest | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Statistics
  const stats = useMemo(() => {
    const total = inquiries.length;
    const pending = inquiries.filter((i) => i.status === "Pending").length;
    const inProgress = inquiries.filter((i) => i.status === "In Progress").length;
    const completed = inquiries.filter((i) => i.status === "Completed").length;
    return { total, pending, inProgress, completed };
  }, [inquiries]);

  // Unique categories for filter dropdown
  const categories = useMemo(() => {
    const set = new Set<string>();
    inquiries.forEach((i) => {
      if (i.category) set.add(i.category);
    });
    return ["All", ...Array.from(set)];
  }, [inquiries]);

  // Filtered inquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        (item.college && item.college.toLowerCase().includes(q)) ||
        (item.projectTitle && item.projectTitle.toLowerCase().includes(q)) ||
        (item.degree && item.degree.toLowerCase().includes(q));

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [inquiries, statusFilter, categoryFilter, searchQuery]);

  // Show Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Status update handler
  const handleStatusChange = async (id: string, newStatus: "Pending" | "In Progress" | "Completed") => {
    setUpdatingId(id);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
        }
        showToast(`Request status updated to ${newStatus}`);
      } else {
        showToast("Failed to update status. Please try again.");
      }
    } catch (err) {
      showToast("Network error updating status.");
    } finally {
      setUpdatingId(null);
    }
  };

  // Refresh data
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await fetch("/api/admin/inquiries");
      if (res.ok) {
        const data = await res.json();
        if (data.inquiries) {
          setInquiries(data.inquiries);
          showToast("Consultation list refreshed");
        }
      }
    } catch (e) {
      showToast("Failed to refresh records.");
    } finally {
      setRefreshing(false);
    }
  };

  // Secure Logout
  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.replace("/admin/login");
    } catch (e) {
      router.replace("/admin/login");
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#FFF9F5] text-[#101828]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-[#101828] text-white text-xs font-semibold shadow-2xl flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-[#00A86B]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header & Admin Profile */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#FF6B00]/20 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="shrink-0">
              <Image
                src="/images/antimatrix-logo-clean.png"
                alt="AntiMatrix Logo"
                width={140}
                height={32}
                className="h-7 w-auto object-contain"
                priority
              />
            </Link>
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#101828]">
                  Admin Dashboard
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFF1E8] border border-[#FF6B00]/25 text-[#FF6B00] font-mono text-[10px] font-bold">
                  Live Management
                </span>
              </div>
              <p className="text-xs text-[#526581] mt-0.5">
                Review and manage project consultation inquiries submitted by engineering students.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-[#526581] block uppercase font-mono font-medium">Logged in as</span>
              <span className="text-xs font-bold text-[#101828]">{adminEmail}</span>
            </div>
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              id="admin-logout-btn"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 border border-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>{loggingOut ? "Signing out..." : "Logout"}</span>
            </button>
          </div>
        </div>

        {/* Overview KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Total Inquiries */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#526581] uppercase font-mono">Total Requests</p>
              <p className="text-3xl font-extrabold text-[#101828] mt-1">{stats.total}</p>
              <span className="text-[11px] text-[#526581] mt-1 block">From all project channels</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#FFF1E8] border border-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00]">
              <Users className="w-6 h-6" />
            </div>
          </div>

          {/* Pending Inquiries */}
          <div className="p-6 rounded-2xl bg-white border border-[#FF6B00]/30 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#FF6B00] uppercase font-mono">Pending Review</p>
              <p className="text-3xl font-extrabold text-[#FF6B00] mt-1">{stats.pending}</p>
              <span className="text-[11px] text-[#526581] mt-1 block">Awaiting advisor callback</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#FFF1E8] border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* In Progress */}
          <div className="p-6 rounded-2xl bg-white border border-blue-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-blue-600 uppercase font-mono">In Progress</p>
              <p className="text-3xl font-extrabold text-blue-600 mt-1">{stats.inProgress}</p>
              <span className="text-[11px] text-[#526581] mt-1 block">Guidance & Demo scheduled</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <RefreshCw className="w-6 h-6" />
            </div>
          </div>

          {/* Completed */}
          <div className="p-6 rounded-2xl bg-white border border-emerald-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#00A86B] uppercase font-mono">Completed</p>
              <p className="text-3xl font-extrabold text-[#00A86B] mt-1">{stats.completed}</p>
              <span className="text-[11px] text-[#526581] mt-1 block">Project delivered & verified</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#00A86B]">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Controls Bar: Search & Filters */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by student name, email, phone, college, or project title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#FFF9F5] border border-slate-200 text-xs text-[#101828] placeholder-slate-400 focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00] transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-[#FFF9F5] border border-slate-200 text-xs font-medium text-[#101828] focus:outline-none focus:border-[#FF6B00]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    Domain: {c}
                  </option>
                ))}
              </select>

              <button
                onClick={handleRefresh}
                disabled={refreshing}
                title="Refresh inquiries"
                className="p-2.5 rounded-xl bg-[#FFF9F5] hover:bg-[#FFF1E8] border border-slate-200 text-[#101828] hover:text-[#FF6B00] transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin text-[#FF6B00]" : ""}`} />
              </button>
            </div>
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              <span className="text-[#526581] font-mono mr-1">Status:</span>
              {["All", "Pending", "In Progress", "Completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    statusFilter === status
                      ? "bg-[#101828] text-white shadow-xs"
                      : "bg-[#FFF9F5] text-[#526581] hover:text-[#101828] border border-slate-200"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <span className="text-xs text-[#526581]">
              Showing <strong className="text-[#101828]">{filteredInquiries.length}</strong> of{" "}
              {inquiries.length} records
            </span>
          </div>
        </div>

        {/* Consultation Requests Table / Cards */}
        {filteredInquiries.length > 0 ? (
          <div className="space-y-4">
            {filteredInquiries.map((inq) => {
              const cleanPhone = inq.phone.replace(/[^0-9]/g, "");
              const waLink = `https://wa.me/${cleanPhone.startsWith("91") ? cleanPhone : "91" + cleanPhone}?text=${encodeURIComponent(`Hello ${inq.name}, regarding your AntiMatrix project consultation for "${inq.projectTitle}":`)}`;

              return (
                <div
                  key={inq.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 hover:border-[#FF6B00]/40 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >
                  {/* Left Section: Student & Academic Info */}
                  <div className="space-y-2.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-[#101828]">{inq.name}</h3>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono ${
                          inq.status === "Pending"
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : inq.status === "In Progress"
                            ? "bg-blue-100 text-blue-800 border border-blue-300"
                            : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        }`}
                      >
                        ● {inq.status}
                      </span>
                      {inq.urgency && (
                        <span className="px-2 py-0.5 rounded bg-[#FFF1E8] border border-[#FF6B00]/25 text-[#FF6B00] text-[10px] font-mono font-semibold">
                          Deadline: {inq.urgency}
                        </span>
                      )}
                    </div>

                    {/* Project Title & Category */}
                    <div>
                      <p className="text-xs font-bold text-[#FF6B00] flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>{inq.projectTitle || "Custom Project Topic"}</span>
                        {inq.category && (
                          <span className="text-[#526581] font-normal">• {inq.category}</span>
                        )}
                      </p>
                    </div>

                    {/* College & Degree */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#526581]">
                      {inq.college && (
                        <span className="flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate max-w-xs">{inq.college}</span>
                        </span>
                      )}
                      {inq.degree && (
                        <span className="truncate max-w-xs">• {inq.degree}</span>
                      )}
                      <span className="text-[11px] text-slate-400">
                        {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric"
                        })}
                      </span>
                    </div>

                    {/* Requirement Preview */}
                    {inq.requirement && (
                      <p className="text-xs text-slate-600 bg-[#FFF9F5] p-2.5 rounded-xl border border-slate-100 line-clamp-2">
                        <strong className="text-[#101828]">Requirement:</strong> {inq.requirement}
                      </p>
                    )}
                  </div>

                  {/* Right Section: Direct Contact Links & Status Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-3 w-full lg:w-auto shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                    {/* 1-Click Communication Channels */}
                    <div className="flex items-center gap-2">
                      <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-[#00A86B] hover:bg-[#00925C] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp</span>
                      </a>

                      <a
                        href={`mailto:${inq.email}`}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#101828] text-xs transition-colors"
                        title={inq.email}
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>

                      <a
                        href={`tel:${inq.phone}`}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#101828] text-xs transition-colors"
                        title={inq.phone}
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => setSelectedInquiry(inq)}
                        className="px-3 py-1.5 rounded-xl bg-[#FFF9F5] hover:bg-[#FFF1E8] border border-slate-200 text-xs font-bold text-[#101828] hover:text-[#FF6B00] transition-colors cursor-pointer"
                      >
                        View Full Details
                      </button>
                    </div>

                    {/* Status Management Selector */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-[#526581] font-mono text-[11px]">Set Status:</span>
                      {(["Pending", "In Progress", "Completed"] as const).map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(inq.id, status)}
                          disabled={updatingId === inq.id || inq.status === status}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                            inq.status === status
                              ? "bg-[#101828] text-white"
                              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                          } disabled:opacity-50`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-[#101828]">No consultation requests found</h3>
            <p className="text-xs text-[#526581]">
              Try adjusting your search query or status filter.
            </p>
          </div>
        )}
      </div>

      {/* Full Request Details Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 bg-[#FFF9F5] border-b border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF6B00]">
                  Consultation Request Details
                </span>
                <h3 className="text-lg font-bold text-[#101828] mt-0.5">{selectedInquiry.name}</h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-xl hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono text-[#526581] uppercase block">WhatsApp Number</span>
                  <p className="font-bold text-sm text-[#101828]">{selectedInquiry.phone}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono text-[#526581] uppercase block">Email Address</span>
                  <p className="font-bold text-sm text-[#101828] truncate">{selectedInquiry.email || "Not Provided"}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono text-[#526581] uppercase block">College / Institution</span>
                  <p className="font-semibold text-xs text-[#101828]">{selectedInquiry.college || "Not Specified"}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <span className="text-[10px] font-mono text-[#526581] uppercase block">Degree / Department</span>
                  <p className="font-semibold text-xs text-[#101828]">{selectedInquiry.degree || "Not Specified"}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#FFF1E8]/50 border border-[#FF6B00]/20 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#FF6B00]">Target Domain</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#FF6B00] border border-[#FF6B00]/20">
                    Review Deadline: {selectedInquiry.urgency || "Flexible"}
                  </span>
                </div>
                <p className="font-bold text-sm text-[#101828]">{selectedInquiry.projectTitle}</p>
                <p className="text-xs text-[#526581]">{selectedInquiry.category}</p>
              </div>

              {selectedInquiry.requirement && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#526581] block">Student Project Requirements</span>
                  <p className="text-xs text-[#101828] leading-relaxed whitespace-pre-wrap">{selectedInquiry.requirement}</p>
                </div>
              )}

              {/* Status Selector in Modal */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-700">Change Status:</span>
                  {(["Pending", "In Progress", "Completed"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(selectedInquiry.id, status)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        selectedInquiry.status === status
                          ? "bg-[#101828] text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <a
                  href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#00A86B] hover:bg-[#00925C] text-white font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

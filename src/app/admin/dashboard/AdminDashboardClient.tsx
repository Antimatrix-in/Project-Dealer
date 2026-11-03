"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ConsultationRequest } from "@/lib/inquiries";
import { PROJECTS_DATA, PROJECT_CATEGORIES } from "@/data/projects";
import {
  LayoutDashboard,
  Users,
  Layers,
  Mail,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  ClipboardList,
  LogOut,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  MessageCircle,
  Phone,
  GraduationCap,
  Calendar,
  FileText,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  X,
  Menu,
  Check,
  Globe,
  ArrowUpRight,
  User,
  Key,
  Database,
  Lock,
  Tag,
  Building2
} from "lucide-react";

interface AdminDashboardClientProps {
  adminEmail: string;
  initialInquiries: ConsultationRequest[];
}

type TabType = "overview" | "consultations" | "projects" | "enquiries" | "account";

export default function AdminDashboardClient({
  adminEmail,
  initialInquiries
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [inquiries, setInquiries] = useState<ConsultationRequest[]>(initialInquiries);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sourceFilter, setSourceFilter] = useState<string>("All");
  const [domainFilter, setDomainFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [projectSearchQuery, setProjectSearchQuery] = useState("");
  const [projectCategoryFilter, setProjectCategoryFilter] = useState<string>("All");
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
    const verified = inquiries.filter(
      (i) => i.verificationStatus === "Verified" || i.status === "Verified"
    ).length;
    const suspicious = inquiries.filter(
      (i) => i.verificationStatus === "Suspicious" || i.status === "Suspicious"
    ).length;
    const spam = inquiries.filter(
      (i) => i.verificationStatus === "Spam" || i.status === "Spam"
    ).length;
    const projectEnquiries = inquiries.filter(
      (i) => i.source === "Project Enquiry" || (i.id && i.id.startsWith("PE-"))
    ).length;
    const consultationRequests = inquiries.filter(
      (i) => i.source === "Consultation Request" || (!i.source && !i.id?.startsWith("PE-"))
    ).length;
    const generalEnquiries = inquiries.filter(
      (i) => i.source === "General Website Contact"
    ).length;
    return {
      total,
      pending,
      inProgress,
      completed,
      verified,
      suspicious,
      spam,
      projectEnquiries,
      consultationRequests,
      generalEnquiries
    };
  }, [inquiries]);

  // Unique categories for filter dropdown
  const categories = useMemo(() => {
    const set = new Set<string>();
    inquiries.forEach((i) => {
      if (i.category) set.add(i.category);
    });
    return ["All", ...Array.from(set)];
  }, [inquiries]);

  // Unique domains for domain filter dropdown
  const domains = useMemo(() => {
    const set = new Set<string>();
    inquiries.forEach((i) => {
      if (i.projectDomain) set.add(i.projectDomain);
      if (i.category) set.add(i.category);
    });
    return ["All", ...Array.from(set)];
  }, [inquiries]);

  // Filtered inquiries for Consultation Management & Website Enquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      const vStatus = item.verificationStatus || (item.status === "Spam" ? "Spam" : item.status === "Suspicious" ? "Suspicious" : "Verified");
      const itemSource = item.source || (item.id && item.id.startsWith("PE-") ? "Project Enquiry" : "Consultation Request");
      const itemDomain = item.projectDomain || item.category || "General";

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter ||
        (statusFilter === "Verified" && vStatus === "Verified") ||
        (statusFilter === "Suspicious" && vStatus === "Suspicious") ||
        (statusFilter === "Spam" && vStatus === "Spam");

      const matchesSource = sourceFilter === "All" || itemSource === sourceFilter;
      const matchesDomain = domainFilter === "All" || itemDomain === domainFilter;
      const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.id.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        (item.mobileNumber && item.mobileNumber.toLowerCase().includes(q)) ||
        (item.whatsappNumber && item.whatsappNumber.toLowerCase().includes(q)) ||
        (item.college && item.college.toLowerCase().includes(q)) ||
        (item.department && item.department.toLowerCase().includes(q)) ||
        (item.projectDomain && item.projectDomain.toLowerCase().includes(q)) ||
        (item.projectTitle && item.projectTitle.toLowerCase().includes(q)) ||
        (item.degree && item.degree.toLowerCase().includes(q)) ||
        (item.requirement && item.requirement.toLowerCase().includes(q)) ||
        (itemSource && itemSource.toLowerCase().includes(q)) ||
        (vStatus && vStatus.toLowerCase().includes(q));

      return matchesStatus && matchesSource && matchesDomain && matchesCategory && matchesSearch;
    });
  }, [inquiries, statusFilter, sourceFilter, domainFilter, categoryFilter, searchQuery]);

  // Filtered projects for Project Management
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((p) => {
      const matchesCategory =
        projectCategoryFilter === "All" || p.category === projectCategoryFilter;
      const q = projectSearchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [projectCategoryFilter, projectSearchQuery]);

  // Show Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Status update handler
  const handleStatusChange = async (
    id: string,
    newStatus: "New" | "Pending" | "Verified" | "In Progress" | "Completed" | "Suspicious" | "Spam",
    newVerification?: "Verified" | "Suspicious" | "Spam"
  ) => {
    setUpdatingId(id);
    const targetVerification =
      newVerification ||
      (newStatus === "Spam" ? "Spam" : newStatus === "Suspicious" ? "Suspicious" : newStatus === "Verified" ? "Verified" : undefined);

    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status: newStatus,
          verificationStatus: targetVerification
        }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) =>
            i.id === id
              ? {
                  ...i,
                  status: newStatus,
                  ...(targetVerification ? { verificationStatus: targetVerification } : {})
                }
              : i
          )
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry((prev) =>
            prev
              ? {
                  ...prev,
                  status: newStatus,
                  ...(targetVerification ? { verificationStatus: targetVerification } : {})
                }
              : null
          );
        }
        showToast(`Request updated to ${newStatus}`);
      } else {
        showToast("Failed to update status. Please try again.");
      }
    } catch (err) {
      showToast("Network error updating status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const renderSourceBadge = (source?: string, id?: string) => {
    const s = source || (id && id.startsWith("PE-") ? "Project Enquiry" : "Consultation Request");
    if (s === "Project Enquiry") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-[#DCE8D9] text-[#315C3D] border border-[#DDDCCF]">
          <ClipboardList className="w-3 h-3 text-[#315C3D]" />
          <span>Project Enquiry</span>
        </span>
      );
    }
    if (s === "General Website Contact") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-[#EEE9DC] text-[#202820] border border-[#DDDCCF]">
          <Mail className="w-3 h-3 text-[#315C3D]" />
          <span>Website Contact</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-[#F5F1E7] text-[#667064] border border-[#DDDCCF]">
        <Users className="w-3 h-3 text-[#315C3D]" />
        <span>Consultation</span>
      </span>
    );
  };

  const renderVerificationBadge = (inq: ConsultationRequest) => {
    const vStatus = inq.verificationStatus || (inq.isSpam ? "Spam" : "Verified");
    if (vStatus === "Spam") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-[#202820] text-[#FFFFFF] border border-[#DDDCCF]">
          <ShieldAlert className="w-3.5 h-3.5 text-[#DDDCCF]" />
          <span>Spam / Bot</span>
        </span>
      );
    }
    if (vStatus === "Suspicious") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-[#EEE9DC] text-[#202820] border border-[#DDDCCF]">
          <AlertTriangle className="w-3.5 h-3.5 text-[#315C3D]" />
          <span>Suspicious ({inq.spamScore || 50}% Flag)</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-[#DCE8D9] text-[#315C3D] border border-[#DCE8D9]">
        <ShieldCheck className="w-3.5 h-3.5 text-[#315C3D]" />
        <span>Verified Genuine Student</span>
      </span>
    );
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

  const navItems = [
    {
      id: "overview" as TabType,
      label: "Overview",
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: "consultations" as TabType,
      label: "Consultation Management",
      icon: Users,
      badge: stats.pending > 0 ? `${stats.pending} pending` : null,
      badgeClass: "bg-[#DCE8D9] text-[#315C3D]",
    },
    {
      id: "projects" as TabType,
      label: "Project Management",
      icon: Layers,
      badge: `${PROJECTS_DATA.length} active`,
      badgeClass: "bg-[#EEE9DC] text-[#667064]",
    },
    {
      id: "enquiries" as TabType,
      label: "Website Enquiries",
      icon: Mail,
      badge: `${stats.total}`,
      badgeClass: "bg-[#EEE9DC] text-[#667064]",
    },
    {
      id: "account" as TabType,
      label: "Account Management",
      icon: ShieldCheck,
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F1E7] text-[#202820] flex flex-col lg:flex-row">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-[#315C3D] text-white text-xs font-semibold shadow-2xl flex items-center gap-2 border border-[#DCE8D9] animate-in fade-in slide-in-from-bottom-2">
          <Check className="w-4 h-4 text-[#DCE8D9]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Desktop & Mobile Drawer) */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#FFFFFF] border-r border-[#DDDCCF] flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-72 lg:min-h-screen shrink-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-[#DDDCCF] flex items-center justify-between">
            <Link href="/" className="inline-block" onClick={() => setMobileSidebarOpen(false)}>
              <div className="relative h-8 w-auto flex items-center">
                <Image
                  src="/images/antimatrix-logo-clean.png"
                  alt="AntiMatrix"
                  width={140}
                  height={32}
                  className="h-7 w-auto object-contain"
                  priority
                />
              </div>
            </Link>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="p-1 rounded-lg hover:bg-[#EEE9DC] text-[#667064] lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Admin Tag */}
          <div className="px-6 py-3.5 bg-[#EEE9DC]/60 border-b border-[#DDDCCF] flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase text-[#315C3D] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#315C3D]" />
              Admin Portal
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#DCE8D9] text-[#315C3D] font-semibold border border-[#DDDCCF]">
              v2.4
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#315C3D] text-white shadow-sm"
                      : "text-[#667064] hover:bg-[#EEE9DC] hover:text-[#202820]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#315C3D]"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                        isActive ? "bg-white/20 text-white" : item.badgeClass
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-[#DDDCCF] bg-[#FFFFFF] space-y-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] text-xs font-semibold text-[#202820] transition-colors"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#315C3D]" />
                <span>View Public Website</span>
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#667064]" />
            </Link>

            <div className="p-3 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] flex items-center justify-between">
              <div className="min-w-0 pr-2">
                <span className="text-[10px] text-[#667064] block font-mono">Logged in</span>
                <p className="text-xs font-bold text-[#202820] truncate">{adminEmail}</p>
              </div>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                title="Logout"
                className="p-2 rounded-lg bg-[#FFFFFF] hover:bg-[#DCE8D9] text-[#667064] hover:text-[#315C3D] border border-[#DDDCCF] transition-colors cursor-pointer shrink-0"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#DDDCCF] px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="p-2 rounded-xl bg-[#EEE9DC] text-[#202820] hover:bg-[#DCE8D9] lg:hidden cursor-pointer"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-black text-[#202820] capitalize">
                {activeTab === "overview" && "Dashboard Overview"}
                {activeTab === "consultations" && "Consultation Requests"}
                {activeTab === "projects" && "Project Management Repository"}
                {activeTab === "enquiries" && "Website Inquiries & Contact Forms"}
                {activeTab === "account" && "Administrator Account & Security"}
              </h1>
              <p className="text-xs text-[#667064] hidden sm:block">
                AntiMatrix Admin Management Suite • Safe, Server-Verified State
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              title="Refresh records"
              className="p-2.5 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] text-[#315C3D] border border-[#DDDCCF] transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </button>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] text-xs font-bold text-[#315C3D] border border-[#DDDCCF] transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={handleLogout}
              disabled={loggingOut}
              id="admin-top-logout-btn"
              className="px-3.5 py-2 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{loggingOut ? "Signing out..." : "Logout"}</span>
            </button>
          </div>
        </header>

        {/* Content Container */}
        <main className="p-4 sm:p-6 lg:p-8 space-y-8 flex-1">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Welcome Banner */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCE8D9] border border-[#DDDCCF] text-xs font-bold text-[#315C3D]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Welcome back, Administrator</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#202820]">
                    AntiMatrix Operations Center
                  </h2>
                  <p className="text-xs sm:text-sm text-[#667064] max-w-2xl">
                    Review and coordinate final year engineering project consultations, verify IEEE project documentation pipelines, and monitor student requests across all branches.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
                  <button
                    onClick={() => setActiveTab("consultations")}
                    className="px-5 py-3 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>Manage Consultations</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("projects")}
                    className="px-5 py-3 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] text-[#315C3D] border border-[#DDDCCF] text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <Layers className="w-4 h-4" />
                    <span>View 10 Projects</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Total Requests */}
                <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm hover:border-[#315C3D]/40 transition-all flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-[#667064] uppercase font-mono">Total Requests</p>
                    <p className="text-2xl sm:text-3xl font-black text-[#202820] mt-1">{stats.total}</p>
                    <span className="text-[10px] text-[#667064] mt-1 block">All website form entries</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#EEE9DC] border border-[#DDDCCF] flex items-center justify-center text-[#315C3D]">
                    <Users className="w-5 h-5" />
                  </div>
                </div>

                {/* Verified Genuine */}
                <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm hover:border-[#315C3D]/40 transition-all flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-[#315C3D] uppercase font-mono">Verified Genuine</p>
                    <p className="text-2xl sm:text-3xl font-black text-[#315C3D] mt-1">{stats.verified}</p>
                    <span className="text-[10px] text-[#667064] mt-1 block">Passed bot checks</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#DCE8D9] border border-[#DCE8D9] flex items-center justify-center text-[#315C3D]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                </div>

                {/* Pending Requests */}
                <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm hover:border-[#315C3D]/40 transition-all flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-[#315C3D] uppercase font-mono">Pending Review</p>
                    <p className="text-2xl sm:text-3xl font-black text-[#315C3D] mt-1">{stats.pending}</p>
                    <span className="text-[10px] text-[#667064] mt-1 block">Awaiting technical callback</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#DCE8D9] border border-[#DCE8D9] flex items-center justify-center text-[#315C3D]">
                    <Clock className="w-5 h-5" />
                  </div>
                </div>

                {/* In Progress */}
                <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm hover:border-[#315C3D]/40 transition-all flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-[#497A52] uppercase font-mono">In Progress</p>
                    <p className="text-2xl sm:text-3xl font-black text-[#497A52] mt-1">{stats.inProgress}</p>
                    <span className="text-[10px] text-[#667064] mt-1 block">Guidance underway</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#EEE9DC] border border-[#DDDCCF] flex items-center justify-center text-[#497A52]">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                </div>

                {/* Flagged Spam / Bots */}
                <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm hover:border-[#315C3D]/40 transition-all flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-[#202820] uppercase font-mono">Bot / Spam Flagged</p>
                    <p className="text-2xl sm:text-3xl font-black text-[#202820] mt-1">{stats.suspicious + stats.spam}</p>
                    <span className="text-[10px] text-[#667064] mt-1 block">Isolated by honeypot/rate</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#EEE9DC] border border-[#DDDCCF] flex items-center justify-center text-[#202820]">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Two Column Layout: Recent Requests & Project Catalog Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Consultation Inquiries (2 Cols) */}
                <div className="lg:col-span-2 p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#DDDCCF]">
                    <div>
                      <h3 className="text-base font-bold text-[#202820]">Recent Consultation Inquiries</h3>
                      <p className="text-xs text-[#667064]">Latest submissions requiring coordinator action</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("consultations")}
                      className="text-xs font-bold text-[#315C3D] hover:underline flex items-center gap-1"
                    >
                      <span>View All ({inquiries.length})</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {inquiries.slice(0, 4).map((inq) => (
                      <div
                        key={inq.id}
                        className="p-4 rounded-2xl bg-[#F5F1E7] border border-[#DDDCCF] hover:border-[#315C3D]/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                      >
                        <div className="space-y-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono font-bold text-[11px] px-2 py-0.5 rounded-lg bg-[#202820] text-white">
                              {inq.id}
                            </span>
                            <span className="text-xs font-bold text-[#202820] truncate">{inq.name}</span>
                            {renderSourceBadge(inq.source, inq.id)}
                            <span
                              className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                                inq.status === "New"
                                  ? "bg-[#315C3D] text-white"
                                  : inq.status === "Pending"
                                  ? "bg-[#DCE8D9] text-[#315C3D]"
                                  : inq.status === "In Progress"
                                  ? "bg-[#EEE9DC] text-[#497A52]"
                                  : "bg-white text-[#202820] border border-[#DDDCCF]"
                              }`}
                            >
                              {inq.status}
                            </span>
                          </div>
                          <p className="text-xs text-[#315C3D] font-semibold truncate">
                            {inq.projectDomain || inq.projectTitle}
                          </p>
                          <p className="text-[11px] text-[#667064] truncate">
                            {inq.college || "Academic Student"} • WhatsApp: {inq.whatsappNumber || inq.phone}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] hover:bg-[#EEE9DC] border border-[#DDDCCF] text-xs font-bold text-[#202820] transition-colors"
                          >
                            Details
                          </button>
                          <a
                            href={`https://wa.me/${(inq.whatsappNumber || inq.phone).replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold flex items-center gap-1 transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System & Catalog Snapshot (1 Col) */}
                <div className="space-y-6">
                  {/* System Architecture Card */}
                  <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm space-y-4">
                    <h3 className="text-base font-bold text-[#202820] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#315C3D]" />
                      <span>Security Architecture</span>
                    </h3>
                    <div className="space-y-2.5 text-xs">
                      <div className="p-3 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] flex items-center justify-between">
                        <span className="text-[#667064]">Auth Scheme:</span>
                        <span className="font-bold font-mono text-[#315C3D]">bcrypt (12 rounds)</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] flex items-center justify-between">
                        <span className="text-[#667064]">Session Mode:</span>
                        <span className="font-bold font-mono text-[#315C3D]">HMAC Signed Cookie</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] flex items-center justify-between">
                        <span className="text-[#667064]">Rate Limiting:</span>
                        <span className="font-bold font-mono text-[#315C3D]">Enabled (5/min)</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] flex items-center justify-between">
                        <span className="text-[#667064]">Data Storage:</span>
                        <span className="font-bold font-mono text-[#315C3D]">Preserved JSON Store</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Repository Summary */}
                  <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-[#202820]">Catalog Status</h3>
                      <span className="text-[11px] font-mono font-bold text-[#315C3D]">
                        {PROJECTS_DATA.length} Domains
                      </span>
                    </div>
                    <p className="text-xs text-[#667064]">
                      All 10 project categories are active with complete IEEE base papers and full source code pipelines.
                    </p>
                    <button
                      onClick={() => setActiveTab("projects")}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] text-[#315C3D] font-bold text-xs border border-[#DDDCCF] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Explore Repository</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CONSULTATION MANAGEMENT */}
          {activeTab === "consultations" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Controls Bar: Search & Filters */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
                  {/* Search Input */}
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#667064] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search student name, email, phone, college, or project title..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex items-center gap-2">
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs font-medium text-[#202820] focus:outline-none focus:border-[#315C3D]"
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
                      className="p-2.5 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] border border-[#DDDCCF] text-[#315C3D] transition-colors cursor-pointer"
                    >
                      <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Status Filter Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#DDDCCF] text-xs">
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    <span className="text-[#667064] font-mono mr-1">Status:</span>
                    {["All", "Verified", "Pending", "In Progress", "Completed", "Suspicious", "Spam"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                          statusFilter === status
                            ? "bg-[#315C3D] text-white shadow-xs"
                            : "bg-[#EEE9DC] text-[#667064] hover:text-[#202820] border border-[#DDDCCF]"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                  <span className="text-xs text-[#667064]">
                    Showing <strong className="text-[#202820]">{filteredInquiries.length}</strong> of{" "}
                    {inquiries.length} records
                  </span>
                </div>
              </div>

              {/* Consultation Requests Table / Cards */}
              {filteredInquiries.length > 0 ? (
                <div className="space-y-4">
                  {filteredInquiries.map((inq) => {
                    const actualWa = (inq.whatsappNumber || inq.phone).replace(/[^0-9]/g, "");
                    const waLink = `https://wa.me/${actualWa.startsWith("91") ? actualWa : "91" + actualWa}?text=${encodeURIComponent(`Hello ${inq.name}, regarding your AntiMatrix project consultation for "${inq.projectTitle}":`)}`;

                    return (
                      <div
                        key={inq.id}
                        className={`p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border shadow-sm transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 ${
                          inq.verificationStatus === "Spam" || inq.status === "Spam"
                            ? "border-[#202820]/30 bg-[#F5F1E7]/50"
                            : inq.verificationStatus === "Suspicious" || inq.status === "Suspicious"
                            ? "border-[#315C3D]/50 bg-[#FFFDF9]"
                            : "border-[#DDDCCF] hover:border-[#315C3D]/40"
                        }`}
                      >
                        {/* Left Section: Student & Academic Info */}
                        <div className="space-y-2.5 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-lg bg-[#202820] text-white">
                              {inq.id}
                            </span>
                            <h3 className="text-base font-bold text-[#202820]">{inq.name}</h3>
                            {renderSourceBadge(inq.source, inq.id)}
                            {renderVerificationBadge(inq)}
                            <span
                              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono ${
                                inq.status === "Pending"
                                  ? "bg-[#DCE8D9] text-[#315C3D] border border-[#DCE8D9]"
                                  : inq.status === "In Progress"
                                  ? "bg-[#EEE9DC] text-[#497A52] border border-[#DDDCCF]"
                                  : inq.status === "Spam"
                                  ? "bg-[#202820] text-white border border-[#DDDCCF]"
                                  : inq.status === "Suspicious"
                                  ? "bg-[#EEE9DC] text-[#202820] border border-[#DDDCCF]"
                                  : "bg-[#FFFFFF] text-[#202820] border border-[#DDDCCF]"
                              }`}
                            >
                              ● {inq.status}
                            </span>
                            {inq.urgency && (
                              <span className="px-2 py-0.5 rounded bg-[#EEE9DC] border border-[#DDDCCF] text-[#315C3D] text-[10px] font-mono font-semibold">
                                Deadline: {inq.urgency}
                              </span>
                            )}
                          </div>

                          {/* Project Title & Category */}
                          <div>
                            <p className="text-xs font-bold text-[#315C3D] flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5" />
                              <span>{inq.projectTitle || "Custom Project Topic"}</span>
                              {inq.category && (
                                <span className="text-[#667064] font-normal">• {inq.category}</span>
                              )}
                            </p>
                          </div>

                          {/* College & Degree */}
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#667064]">
                            {inq.college && (
                              <span className="flex items-center gap-1">
                                <GraduationCap className="w-3.5 h-3.5 text-[#315C3D]" />
                                <span className="truncate max-w-xs">{inq.college}</span>
                              </span>
                            )}
                            {inq.degree && (
                              <span className="truncate max-w-xs">• {inq.degree}</span>
                            )}
                            <span className="text-[11px] text-[#667064]">
                              {new Date(inq.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>

                          {/* Requirement Preview */}
                          {inq.requirement && (
                            <p className="text-xs text-[#667064] bg-[#F5F1E7] p-2.5 rounded-xl border border-[#DDDCCF] line-clamp-2">
                              <strong className="text-[#202820]">Requirement:</strong> {inq.requirement}
                            </p>
                          )}

                          {/* Bot Signals Banner if Flagged */}
                          {inq.botSignals && inq.botSignals.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <span className="text-[10px] font-mono text-[#667064]">Signals:</span>
                              {inq.botSignals.map((sig, idx) => (
                                <span
                                  key={idx}
                                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EEE9DC] text-[#202820] border border-[#DDDCCF] flex items-center gap-1"
                                >
                                  <AlertTriangle className="w-2.5 h-2.5 text-[#315C3D]" />
                                  <span>{sig}</span>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Right Section: Direct Contact Links & Status Actions */}
                        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-3 w-full lg:w-auto shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#DDDCCF]">
                          {/* 1-Click Communication Channels */}
                          <div className="flex items-center gap-2">
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-1.5 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>

                            <a
                              href={`mailto:${inq.email}`}
                              className="p-2 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] border border-[#DDDCCF] text-[#315C3D] text-xs transition-colors"
                              title={inq.email}
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>

                            <a
                              href={`tel:${inq.phone}`}
                              className="p-2 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] border border-[#DDDCCF] text-[#315C3D] text-xs transition-colors"
                              title={inq.phone}
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>

                            <button
                              onClick={() => setSelectedInquiry(inq)}
                              className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] hover:bg-[#EEE9DC] border border-[#DDDCCF] text-xs font-bold text-[#202820] transition-colors cursor-pointer"
                            >
                              Full Details
                            </button>
                          </div>

                          {/* Status Management Selector */}
                          <div className="flex items-center gap-1.5 text-xs">
                            <span className="text-[#667064] font-mono text-[11px]">Set Status:</span>
                            {(["Pending", "In Progress", "Completed"] as const).map((status) => (
                              <button
                                key={status}
                                onClick={() => handleStatusChange(inq.id, status)}
                                disabled={updatingId === inq.id || inq.status === status}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                                  inq.status === status
                                    ? "bg-[#315C3D] text-white"
                                    : "bg-[#EEE9DC] text-[#667064] hover:text-[#202820] border border-[#DDDCCF]"
                                } disabled:opacity-50`}
                              >
                                {status}
                              </button>
                            ))}
                          </div>

                          {/* Quick Moderation / Anti-Spam Controls */}
                          <div className="flex items-center gap-1.5 text-xs">
                            <span className="text-[#667064] font-mono text-[11px]">Anti-Bot:</span>
                            {inq.verificationStatus !== "Verified" && (
                              <button
                                onClick={() => handleStatusChange(inq.id, "Verified", "Verified")}
                                disabled={updatingId === inq.id}
                                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#DCE8D9] text-[#315C3D] hover:bg-[#cde0c9] border border-[#DCE8D9] transition-all cursor-pointer flex items-center gap-1"
                              >
                                <ShieldCheck className="w-3 h-3" />
                                <span>Mark Verified</span>
                              </button>
                            )}
                            {inq.verificationStatus !== "Spam" && (
                              <button
                                onClick={() => handleStatusChange(inq.id, "Spam", "Spam")}
                                disabled={updatingId === inq.id}
                                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#EEE9DC] text-[#202820] hover:bg-[#e4ddcc] border border-[#DDDCCF] transition-all cursor-pointer flex items-center gap-1"
                              >
                                <ShieldAlert className="w-3 h-3 text-[#202820]" />
                                <span>Mark as Spam</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 bg-[#FFFFFF] rounded-3xl border border-[#DDDCCF] space-y-3">
                  <AlertCircle className="w-10 h-10 text-[#667064] mx-auto" />
                  <h3 className="text-base font-bold text-[#202820]">No consultation requests found</h3>
                  <p className="text-xs text-[#667064]">
                    Try adjusting your search query or status filter.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROJECT MANAGEMENT */}
          {activeTab === "projects" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Header Card */}
              <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCE8D9] border border-[#DDDCCF] text-xs font-bold text-[#315C3D] mb-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Preserved IEEE Catalog • 10 Active Domains</span>
                  </div>
                  <h2 className="text-xl font-black text-[#202820]">
                    Project Management &amp; Repository
                  </h2>
                  <p className="text-xs text-[#667064] mt-1">
                    View project titles, descriptions, technology stacks, and direct links to live details pages.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/projects"
                    target="_blank"
                    className="px-4 py-2.5 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <span>Public Catalog</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Search & Domain Filter Bar */}
              <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#667064] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by project title, tech stack, or description..."
                    value={projectSearchQuery}
                    onChange={(e) => setProjectSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D]"
                  />
                </div>
                <select
                  value={projectCategoryFilter}
                  onChange={(e) => setProjectCategoryFilter(e.target.value)}
                  className="px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs font-medium text-[#202820] focus:outline-none focus:border-[#315C3D]"
                >
                  <option value="All">All Categories ({PROJECTS_DATA.length})</option>
                  {PROJECT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/40 shadow-sm transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#DCE8D9] text-[#315C3D] border border-[#DDDCCF]">
                          {proj.category}
                        </span>
                        <span className="text-[10px] font-mono text-[#667064]">
                          Slug: /{proj.slug}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#202820]">
                        {proj.title}
                      </h3>
                      <p className="text-xs text-[#315C3D] font-semibold line-clamp-1">
                        {proj.tagline}
                      </p>
                      <p className="text-xs text-[#667064] line-clamp-3 leading-relaxed">
                        {proj.description}
                      </p>

                      {/* Tech Stack Pills */}
                      <div className="pt-2">
                        <span className="text-[10px] font-mono uppercase text-[#667064] block mb-1.5 font-bold">
                          Technology Stack
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-md bg-[#F5F1E7] border border-[#DDDCCF] text-[11px] text-[#202820] font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#DDDCCF] flex items-center justify-between">
                      <span className="text-[11px] text-[#667064] font-mono">
                        {proj.modules?.length || 5} Modules Included
                      </span>
                      <Link
                        href={`/projects/${proj.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold transition-colors shadow-xs"
                      >
                        <span>View Details Page</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: WEBSITE ENQUIRIES */}
          {activeTab === "enquiries" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Header Card */}
              <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCE8D9] border border-[#DDDCCF] text-xs font-bold text-[#315C3D] mb-2 font-mono">
                    <Mail className="w-3.5 h-3.5" />
                    <span>Website Enquiries &amp; Academic Project Desk</span>
                  </div>
                  <h2 className="text-xl font-black text-[#202820]">
                    Student Enquiries Repository
                  </h2>
                  <p className="text-xs text-[#667064] mt-1">
                    Manage Project Enquiries, General Contact Submissions, and Consultation Requests with verified WhatsApp routing.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1.5 rounded-xl bg-[#DCE8D9] text-[#315C3D] text-xs font-mono font-bold border border-[#DDDCCF]">
                    {stats.projectEnquiries} Project Enquiries
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-[#EEE9DC] text-[#202820] text-xs font-mono font-bold border border-[#DDDCCF]">
                    {stats.consultationRequests} Consultations
                  </span>
                  <span className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] text-[#667064] text-xs font-mono font-bold border border-[#DDDCCF]">
                    {stats.generalEnquiries} Contact Forms
                  </span>
                </div>
              </div>

              {/* Multi-Filter & Search Toolbar */}
              <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm space-y-4">
                {/* Search & Domain Filter Row */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#667064] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by ID (e.g. PE-2026-), student name, college, department, domain, or phone..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={domainFilter}
                      onChange={(e) => setDomainFilter(e.target.value)}
                      className="px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs font-medium text-[#202820] focus:outline-none focus:border-[#315C3D] cursor-pointer"
                    >
                      <option value="All">All Project Domains</option>
                      {domains.filter((d) => d !== "All").map((d) => (
                        <option key={d} value={d}>
                          Domain: {d}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={handleRefresh}
                      disabled={refreshing}
                      className="p-2.5 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] border border-[#DDDCCF] text-[#315C3D] transition-colors cursor-pointer shrink-0"
                      title="Refresh enquiries"
                    >
                      <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
                    </button>
                  </div>
                </div>

                {/* Source Category Filter Tabs */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#DDDCCF] text-xs">
                  <span className="text-[#667064] font-mono text-[11px] mr-1">Category:</span>
                  {[
                    { id: "All", label: "All Categories", count: stats.total },
                    { id: "Project Enquiry", label: "Project Enquiries", count: stats.projectEnquiries },
                    { id: "Consultation Request", label: "Consultation Requests", count: stats.consultationRequests },
                    { id: "General Website Contact", label: "General Contact", count: stats.generalEnquiries }
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSourceFilter(cat.id)}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        sourceFilter === cat.id
                          ? "bg-[#315C3D] text-white shadow-xs"
                          : "bg-[#EEE9DC] text-[#667064] hover:text-[#202820] border border-[#DDDCCF]"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${sourceFilter === cat.id ? "bg-white/20 text-white" : "bg-[#DDDCCF] text-[#202820]"}`}>
                        {cat.count}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Status Filter Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#DDDCCF] text-xs">
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    <span className="text-[#667064] font-mono text-[11px] mr-1">Status:</span>
                    {["All", "New", "Pending", "In Progress", "Completed", "Verified", "Suspicious", "Spam"].map((status) => (
                      <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                          statusFilter === status
                            ? "bg-[#315C3D] text-white shadow-xs"
                            : "bg-[#EEE9DC] text-[#667064] hover:text-[#202820] border border-[#DDDCCF]"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                  <span className="text-xs text-[#667064]">
                    Showing <strong className="text-[#202820]">{filteredInquiries.length}</strong> of{" "}
                    {inquiries.length} records
                  </span>
                </div>
              </div>

              {/* Inquiry List */}
              {filteredInquiries.length > 0 ? (
                <div className="space-y-4">
                  {filteredInquiries.map((inq) => {
                    const actualWhatsApp = inq.whatsappNumber || inq.phone;
                    const cleanWa = actualWhatsApp.replace(/[^0-9]/g, "");
                    const waLink = `https://wa.me/${cleanWa.startsWith("91") ? cleanWa : "91" + cleanWa}?text=${encodeURIComponent(`Hello ${inq.name}, regarding your AntiMatrix Project Enquiry [${inq.id}] for "${inq.projectDomain || inq.category || inq.projectTitle}":`)}`;
                    const emailSubject = encodeURIComponent(`AntiMatrix Project Enquiry [${inq.id}]`);
                    const mailtoLink = `mailto:${inq.email}?subject=${emailSubject}`;

                    return (
                      <div
                        key={inq.id}
                        className={`p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-all ${
                          inq.status === "New"
                            ? "border-[#315C3D]/60 ring-1 ring-[#315C3D]/20 bg-[#FDFAF4]"
                            : inq.verificationStatus === "Spam" || inq.status === "Spam"
                            ? "border-[#202820]/30 bg-[#F5F1E7]/50"
                            : inq.verificationStatus === "Suspicious" || inq.status === "Suspicious"
                            ? "border-[#315C3D]/50 bg-[#FFFDF9]"
                            : "border-[#DDDCCF] hover:border-[#315C3D]/40"
                        }`}
                      >
                        {/* Left / Main Details */}
                        <div className="space-y-3 flex-1 min-w-0">
                          {/* Top Badges Row */}
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Unique Enquiry ID Badge */}
                            <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-lg bg-[#202820] text-white">
                              {inq.id}
                            </span>

                            {/* Source Category Badge */}
                            {renderSourceBadge(inq.source, inq.id)}

                            {/* Verification Badge */}
                            {renderVerificationBadge(inq)}

                            {/* Status Pill */}
                            <span
                              className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                                inq.status === "New"
                                  ? "bg-[#315C3D] text-white"
                                  : inq.status === "Pending"
                                  ? "bg-[#DCE8D9] text-[#315C3D] border border-[#DCE8D9]"
                                  : inq.status === "In Progress"
                                  ? "bg-[#EEE9DC] text-[#497A52] border border-[#DDDCCF]"
                                  : inq.status === "Completed"
                                  ? "bg-[#FFFFFF] text-[#202820] border border-[#DDDCCF]"
                                  : inq.status === "Spam"
                                  ? "bg-[#202820] text-white border border-[#DDDCCF]"
                                  : "bg-[#EEE9DC] text-[#202820] border border-[#DDDCCF]"
                              }`}
                            >
                              ● {inq.status}
                            </span>

                            <span className="text-[11px] text-[#667064] font-mono ml-auto">
                              {new Date(inq.createdAt).toLocaleString("en-IN", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </span>
                          </div>

                          {/* Student Name & Academic Dept */}
                          <div>
                            <h3 className="text-base font-bold text-[#202820]">{inq.name}</h3>
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#667064] mt-0.5">
                              {inq.college && (
                                <span className="flex items-center gap-1 font-medium">
                                  <Building2 className="w-3.5 h-3.5 text-[#315C3D]" />
                                  <span>{inq.college}</span>
                                </span>
                              )}
                              {(inq.department || inq.degree) && (
                                <span className="flex items-center gap-1 text-[#315C3D] font-semibold">
                                  <GraduationCap className="w-3.5 h-3.5" />
                                  <span>{inq.department || inq.degree}</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Project Domain & Target Title */}
                          <div className="p-3 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[#315C3D] flex items-center gap-1.5 font-mono">
                                <Layers className="w-3.5 h-3.5" />
                                <span>Project Domain: {inq.projectDomain || inq.category || "General Engineering"}</span>
                                {inq.customDomain && (
                                  <span className="text-[#202820] font-normal">({inq.customDomain})</span>
                                )}
                              </span>
                              {inq.urgency && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#DCE8D9] text-[#315C3D] font-semibold">
                                  Timeline: {inq.urgency}
                                </span>
                              )}
                            </div>
                            {inq.projectTitle && inq.projectTitle !== (inq.projectDomain || inq.category) && (
                              <p className="font-semibold text-[#202820] truncate">
                                Topic: {inq.projectTitle}
                              </p>
                            )}
                            {(inq.requirement || inq.message) && (
                              <p className="text-[#667064] line-clamp-2 leading-relaxed pt-1 border-t border-[#DDDCCF]/60">
                                <strong>Requirement:</strong> {inq.requirement || inq.message}
                              </p>
                            )}
                          </div>

                          {/* Contact Details Row */}
                          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-[#202820]">
                            {/* WhatsApp Number (Actual) */}
                            <span className="flex items-center gap-1.5 font-mono font-bold text-[#315C3D]">
                              <MessageCircle className="w-3.5 h-3.5 text-[#315C3D]" />
                              <span>WhatsApp: {inq.whatsappNumber || inq.phone}</span>
                            </span>

                            {/* Mobile Number */}
                            {inq.mobileNumber && inq.mobileNumber !== inq.whatsappNumber && (
                              <span className="flex items-center gap-1.5 font-mono text-[#667064]">
                                <Phone className="w-3.5 h-3.5 text-[#667064]" />
                                <span>Mobile: {inq.mobileNumber}</span>
                              </span>
                            )}

                            {/* Email Address */}
                            <span className="flex items-center gap-1.5 text-[#667064]">
                              <Mail className="w-3.5 h-3.5 text-[#315C3D]" />
                              <span>{inq.email || "No email"}</span>
                            </span>

                            {inq.clientIp && (
                              <span className="font-mono text-[10px] text-[#667064] bg-[#EEE9DC] px-2 py-0.5 rounded">
                                IP: {inq.clientIp}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Right Section: Direct Actions */}
                        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-2.5 shrink-0 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-[#DDDCCF]">
                          {/* 1-Click WhatsApp & Email */}
                          <div className="flex items-center gap-2">
                            <a
                              href={waLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-1.5 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                              title={`Chat with ${inq.name} on WhatsApp`}
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>Reply on WhatsApp</span>
                            </a>

                            <a
                              href={mailtoLink}
                              className="p-2 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] border border-[#DDDCCF] text-[#315C3D] text-xs transition-colors"
                              title={`Send Email to ${inq.email}`}
                            >
                              <Mail className="w-3.5 h-3.5" />
                            </a>

                            <button
                              onClick={() => setSelectedInquiry(inq)}
                              className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] hover:bg-[#EEE9DC] border border-[#DDDCCF] text-xs font-bold text-[#202820] transition-colors cursor-pointer"
                            >
                              View Details
                            </button>
                          </div>

                          {/* Status Management Selector */}
                          <div className="flex items-center gap-1 text-xs">
                            <span className="text-[#667064] font-mono text-[11px] mr-0.5">Status:</span>
                            {(["New", "Pending", "In Progress", "Completed"] as const).map((status) => (
                              <button
                                key={status}
                                onClick={() => handleStatusChange(inq.id, status)}
                                disabled={updatingId === inq.id || inq.status === status}
                                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                                  inq.status === status
                                    ? "bg-[#315C3D] text-white"
                                    : "bg-[#EEE9DC] text-[#667064] hover:text-[#202820] border border-[#DDDCCF]"
                                } disabled:opacity-50`}
                              >
                                {status}
                              </button>
                            ))}
                          </div>

                          {/* Quick Moderation: Mark Completed & Mark Spam */}
                          <div className="flex items-center gap-1.5 text-xs">
                            {inq.status !== "Completed" && (
                              <button
                                onClick={() => handleStatusChange(inq.id, "Completed", "Verified")}
                                disabled={updatingId === inq.id}
                                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#DCE8D9] text-[#315C3D] hover:bg-[#cde0c9] border border-[#DCE8D9] transition-all cursor-pointer flex items-center gap-1"
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                <span>Mark Completed</span>
                              </button>
                            )}

                            {inq.status !== "Spam" && (
                              <button
                                onClick={() => handleStatusChange(inq.id, "Spam", "Spam")}
                                disabled={updatingId === inq.id}
                                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-[#EEE9DC] text-[#202820] hover:bg-[#e4ddcc] border border-[#DDDCCF] transition-all cursor-pointer flex items-center gap-1"
                              >
                                <ShieldAlert className="w-3 h-3 text-[#202820]" />
                                <span>Mark as Spam</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 bg-[#FFFFFF] rounded-3xl border border-[#DDDCCF] space-y-3">
                  <AlertCircle className="w-10 h-10 text-[#667064] mx-auto" />
                  <h3 className="text-base font-bold text-[#202820]">No enquiries matching your filter</h3>
                  <p className="text-xs text-[#667064]">
                    Select another category, domain, or status filter, or reset your search query.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: ACCOUNT MANAGEMENT */}
          {activeTab === "account" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCE8D9] border border-[#DDDCCF] text-xs font-bold text-[#315C3D]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Authenticated Administrator Profile</span>
                </div>
                <h2 className="text-2xl font-black text-[#202820]">
                  Account &amp; Security Settings
                </h2>
                <p className="text-xs text-[#667064]">
                  View active security parameters, session management, and server credentials verification.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Admin Details Card */}
                <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm space-y-4">
                  <h3 className="text-base font-bold text-[#202820] flex items-center gap-2">
                    <User className="w-4 h-4 text-[#315C3D]" />
                    <span>Administrator Credentials</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1">
                      <span className="text-[10px] font-mono text-[#667064] uppercase block">
                        Admin Email
                      </span>
                      <p className="font-bold text-sm text-[#202820]">{adminEmail}</p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1">
                      <span className="text-[10px] font-mono text-[#667064] uppercase block">
                        Access Level
                      </span>
                      <p className="font-bold text-sm text-[#315C3D]">
                        Super Administrator (Full Read &amp; Write Access)
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1">
                      <span className="text-[10px] font-mono text-[#667064] uppercase block">
                        Session Identifier
                      </span>
                      <p className="font-mono text-xs text-[#202820]">
                        antimatrix_admin_token (HTTP-Only, SameSite=Lax)
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="w-full py-3 px-4 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>{loggingOut ? "Invalidating Session..." : "Secure Sign Out"}</span>
                    </button>
                  </div>
                </div>

                {/* Security Verification Checklist */}
                <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm space-y-4">
                  <h3 className="text-base font-bold text-[#202820] flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#315C3D]" />
                    <span>Security Verification Checklist</span>
                  </h3>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#DCE8D9]/60 border border-[#DDDCCF] flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#315C3D] shrink-0" />
                      <div>
                        <strong className="text-[#202820] block">Server-Side Authentication</strong>
                        <span className="text-[#667064] text-[11px]">
                          Sessions verified directly on server runtime; no client-only bypasses.
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#DCE8D9]/60 border border-[#DDDCCF] flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#315C3D] shrink-0" />
                      <div>
                        <strong className="text-[#202820] block">Bcrypt Password Hashing</strong>
                        <span className="text-[#667064] text-[11px]">
                          Passwords securely salted and hashed. Raw passwords never stored in code or logs.
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#DCE8D9]/60 border border-[#DDDCCF] flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#315C3D] shrink-0" />
                      <div>
                        <strong className="text-[#202820] block">Protected Admin APIs</strong>
                        <span className="text-[#667064] text-[11px]">
                          PATCH and GET endpoints for inquiries require verified HMAC signature.
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#DCE8D9]/60 border border-[#DDDCCF] flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-[#315C3D] shrink-0" />
                      <div>
                        <strong className="text-[#202820] block">Data Preservation</strong>
                        <span className="text-[#667064] text-[11px]">
                          Production consultation inquiries and project datasets remain fully intact.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Full Request Details Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-[#FFFFFF] rounded-3xl border border-[#DDDCCF] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 text-[#202820]">
            {/* Modal Header */}
            <div className="p-6 bg-[#EEE9DC] border-b border-[#DDDCCF] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-lg bg-[#202820] text-white">
                    {selectedInquiry.id}
                  </span>
                  {renderSourceBadge(selectedInquiry.source, selectedInquiry.id)}
                </div>
                <h3 className="text-lg font-black text-[#202820] mt-0.5">{selectedInquiry.name}</h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-xl hover:bg-[#DCE8D9] text-[#667064] hover:text-[#315C3D] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              {/* Bot & Verification Status Banner */}
              {(() => {
                const vStatus =
                  selectedInquiry.verificationStatus ||
                  (selectedInquiry.status === "Spam"
                    ? "Spam"
                    : selectedInquiry.status === "Suspicious"
                    ? "Suspicious"
                    : "Verified");
                if (vStatus === "Spam") {
                  return (
                    <div className="p-4 rounded-2xl bg-[#202820] text-white border border-[#DDDCCF] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold flex items-center gap-1.5 text-[#DDDCCF]">
                          <ShieldAlert className="w-4 h-4 text-white" />
                          <span>Automated Bot / Spam Flagged</span>
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/20 text-white font-semibold">
                          Spam Score: {selectedInquiry.spamScore || 85}/100
                        </span>
                      </div>
                      <p className="text-[11px] text-[#DDDCCF] leading-relaxed">
                        This submission was flagged by honeypot or bot heuristics. It is isolated from active workflow queues.
                      </p>
                      {selectedInquiry.botSignals && selectedInquiry.botSignals.length > 0 && (
                        <div className="space-y-1 pt-1 border-t border-white/20">
                          <span className="text-[10px] font-mono uppercase text-[#DDDCCF] block">Detected Signals:</span>
                          <ul className="list-disc list-inside space-y-0.5 text-[11px] text-[#EEE9DC]">
                            {selectedInquiry.botSignals.map((sig, idx) => (
                              <li key={idx}>{sig}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                }
                if (vStatus === "Suspicious") {
                  return (
                    <div className="p-4 rounded-2xl bg-[#EEE9DC] border border-[#DDDCCF] space-y-2 text-[#202820]">
                      <div className="flex items-center justify-between">
                        <span className="font-bold flex items-center gap-1.5 text-[#315C3D]">
                          <AlertTriangle className="w-4 h-4 text-[#315C3D]" />
                          <span>Flagged as Suspicious Submission</span>
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#DCE8D9] text-[#315C3D] font-semibold">
                          Spam Score: {selectedInquiry.spamScore || 50}/100
                        </span>
                      </div>
                      <p className="text-[11px] text-[#667064] leading-relaxed">
                        Noticeable automated or rapid submission pattern detected. Administrator review recommended before calling.
                      </p>
                      {selectedInquiry.botSignals && selectedInquiry.botSignals.length > 0 && (
                        <div className="space-y-1 pt-1 border-t border-[#DDDCCF]">
                          <span className="text-[10px] font-mono uppercase text-[#667064] block">Detected Signals:</span>
                          <ul className="list-disc list-inside space-y-0.5 text-[11px] text-[#202820]">
                            {selectedInquiry.botSignals.map((sig, idx) => (
                              <li key={idx}>{sig}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                }
                return (
                  <div className="p-3.5 rounded-2xl bg-[#DCE8D9]/70 border border-[#315C3D]/30 flex items-center justify-between text-[#202820]">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#315C3D] shrink-0" />
                      <div>
                        <span className="font-bold block text-xs text-[#202820]">Verified Genuine Student</span>
                        <span className="text-[11px] text-[#667064]">Passed bot trap, human submission timing, and phone checks.</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white text-[#315C3D] font-bold border border-[#DDDCCF]">
                      Score 0/100
                    </span>
                  </div>
                );
              })()}

              {/* Student Personal & Contact Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* WhatsApp Number (Actual) */}
                <div className="p-3.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1">
                  <span className="text-[10px] font-mono text-[#315C3D] uppercase font-bold flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Number (Direct)</span>
                  </span>
                  <p className="font-bold text-sm text-[#202820]">
                    {selectedInquiry.whatsappNumber || selectedInquiry.phone}
                  </p>
                </div>

                {/* Mobile Number */}
                <div className="p-3.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1">
                  <span className="text-[10px] font-mono text-[#667064] uppercase block">
                    Mobile Contact Number
                  </span>
                  <p className="font-bold text-sm text-[#202820]">
                    {selectedInquiry.mobileNumber || selectedInquiry.phone}
                  </p>
                </div>

                {/* Email Address */}
                <div className="p-3.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1">
                  <span className="text-[10px] font-mono text-[#667064] uppercase block">Email Address</span>
                  <p className="font-bold text-xs text-[#202820] truncate">
                    {selectedInquiry.email || "Not Provided"}
                  </p>
                </div>

                {/* College / Institution */}
                <div className="p-3.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1">
                  <span className="text-[10px] font-mono text-[#667064] uppercase block">College / Institution</span>
                  <p className="font-semibold text-xs text-[#202820]">
                    {selectedInquiry.college || "Not Specified"}
                  </p>
                </div>

                {/* Academic Department */}
                <div className="p-3.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1 sm:col-span-2">
                  <span className="text-[10px] font-mono text-[#667064] uppercase block">Department / Branch</span>
                  <p className="font-semibold text-xs text-[#202820]">
                    {selectedInquiry.department || selectedInquiry.degree || "Not Specified"}
                  </p>
                </div>
              </div>

              {selectedInquiry.clientIp && (
                <div className="p-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] flex items-center justify-between text-xs">
                  <span className="text-[#667064] font-mono text-[11px]">Origin Client IP:</span>
                  <span className="font-mono font-bold text-[#202820]">{selectedInquiry.clientIp}</span>
                </div>
              )}

              {/* Project Domain & Target Title */}
              <div className="p-4 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#315C3D]">
                    Target Domain: {selectedInquiry.projectDomain || selectedInquiry.category}
                    {selectedInquiry.customDomain && ` (${selectedInquiry.customDomain})`}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#DCE8D9] text-[#315C3D] border border-[#DDDCCF]">
                    Review Timeline: {selectedInquiry.urgency || "Flexible"}
                  </span>
                </div>
                {selectedInquiry.projectTitle && (
                  <p className="font-bold text-sm text-[#202820]">{selectedInquiry.projectTitle}</p>
                )}
              </div>

              {(selectedInquiry.requirement || selectedInquiry.message) && (
                <div className="p-4 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#667064] block">
                    Student Project Requirements / Notes
                  </span>
                  <p className="text-xs text-[#202820] leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.requirement || selectedInquiry.message}
                  </p>
                </div>
              )}

              {/* Status Selector & Anti-Bot Moderation in Modal */}
              <div className="pt-3 border-t border-[#DDDCCF] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-[#202820]">Status:</span>
                    {(["New", "Pending", "In Progress", "Completed"] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(selectedInquiry.id, status)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          selectedInquiry.status === status
                            ? "bg-[#315C3D] text-white"
                            : "bg-[#EEE9DC] text-[#667064] hover:text-[#202820] border border-[#DDDCCF]"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {selectedInquiry.status !== "Completed" && (
                      <button
                        onClick={() => handleStatusChange(selectedInquiry.id, "Completed", "Verified")}
                        className="px-3 py-1 rounded-lg text-xs font-bold bg-[#DCE8D9] text-[#315C3D] hover:bg-[#cde0c9] border border-[#DCE8D9] transition-all cursor-pointer flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Mark Completed</span>
                      </button>
                    )}

                    {selectedInquiry.verificationStatus !== "Spam" && (
                      <button
                        onClick={() => handleStatusChange(selectedInquiry.id, "Spam", "Spam")}
                        className="px-3 py-1 rounded-lg text-xs font-bold bg-[#EEE9DC] text-[#202820] hover:bg-[#e4ddcc] border border-[#DDDCCF] transition-all cursor-pointer flex items-center gap-1"
                      >
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>Mark as Spam</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {/* WhatsApp Action using actual WhatsApp number */}
                  {(() => {
                    const actualWa = (selectedInquiry.whatsappNumber || selectedInquiry.phone).replace(/[^0-9]/g, "");
                    const waNum = actualWa.startsWith("91") ? actualWa : "91" + actualWa;
                    return (
                      <a
                        href={`https://wa.me/${waNum}?text=${encodeURIComponent(`Hello ${selectedInquiry.name}, AntiMatrix coordinator regarding your Project Enquiry [${selectedInquiry.id}] for "${selectedInquiry.projectDomain || selectedInquiry.category}":`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-4 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4 text-white" />
                        <span>Reply on WhatsApp ({selectedInquiry.whatsappNumber || selectedInquiry.phone})</span>
                      </a>
                    );
                  })()}

                  {/* Send Email Action */}
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(`AntiMatrix Project Enquiry [${selectedInquiry.id}]`)}`}
                    className="py-2.5 px-4 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] text-[#315C3D] border border-[#DDDCCF] font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#315C3D]" />
                    <span>Send Email ({selectedInquiry.email || "No Email"})</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

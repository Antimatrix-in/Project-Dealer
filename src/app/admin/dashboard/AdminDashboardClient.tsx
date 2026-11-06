"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ConsultationRequest } from "@/lib/inquiries";
import { PROJECTS_DATA, PROJECT_CATEGORIES } from "@/data/projects";
import {
  TECHNICAL_DOMAINS,
  TechnicalDomain,
  TechnicalDomainWithCount,
  Project
} from "@/types";
import {
  LayoutDashboard,
  Users,
  Layers,
  Mail,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  ClipboardList,
  Sparkles,
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
  Building2,
  Plus,
  Edit,
  Eye,
  SlidersHorizontal,
  FolderOpen,
  Hash
} from "lucide-react";

interface AdminDashboardClientProps {
  adminEmail: string;
  initialInquiries: ConsultationRequest[];
  initialDomains?: TechnicalDomainWithCount[];
  initialProjects?: Project[];
}

type TabType = "overview" | "consultations" | "projects" | "enquiries" | "account";

export default function AdminDashboardClient({
  adminEmail,
  initialInquiries,
  initialDomains,
  initialProjects
}: AdminDashboardClientProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [inquiries, setInquiries] = useState<ConsultationRequest[]>(initialInquiries);
  const [projectsList, setProjectsList] = useState<Project[]>(
    initialProjects && initialProjects.length > 0 ? initialProjects : (PROJECTS_DATA as unknown as Project[])
  );

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [sourceFilter, setSourceFilter] = useState<string>("All");
  const [enquiryTypeFilter, setEnquiryTypeFilter] = useState<string>("All");
  const [enquiryDomainFilter, setEnquiryDomainFilter] = useState<string>("All");

  const [projectSearchQuery, setProjectSearchQuery] = useState("");
  const [projectDomainFilter, setProjectDomainFilter] = useState<string>("All");

  // Selection & Modal States
  const [selectedInquiry, setSelectedInquiry] = useState<ConsultationRequest | null>(null);
  const [selectedProjectForView, setSelectedProjectForView] = useState<Project | null>(null);
  const [selectedProjectForEdit, setSelectedProjectForEdit] = useState<Project | null>(null);
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);

  // Add Project Form State
  const [newProjectDomainCode, setNewProjectDomainCode] = useState<string>("AMPY");
  const [newProjectTitle, setNewProjectTitle] = useState("");
  const [newProjectTagline, setNewProjectTagline] = useState("");
  const [newProjectDescription, setNewProjectDescription] = useState("");
  const [newProjectAbstract, setNewProjectAbstract] = useState("");
  const [newProjectTechStack, setNewProjectTechStack] = useState("");
  const [newProjectLevel, setNewProjectLevel] = useState<"UG Final Year" | "PG / M.Tech" | "Diploma / Mini Project">("UG Final Year");
  const [newProjectYear, setNewProjectYear] = useState("2025-26 Edition");
  const [submittingNewProject, setSubmittingNewProject] = useState(false);

  // Edit Project Form State
  const [editProjectTitle, setEditProjectTitle] = useState("");
  const [editProjectTagline, setEditProjectTagline] = useState("");
  const [editProjectDescription, setEditProjectDescription] = useState("");
  const [editProjectAbstract, setEditProjectAbstract] = useState("");
  const [editProjectTechStack, setEditProjectTechStack] = useState("");
  const [editProjectLevel, setEditProjectLevel] = useState<"UG Final Year" | "PG / M.Tech" | "Diploma / Mini Project">("UG Final Year");
  const [editProjectYear, setEditProjectYear] = useState("2025-26 Edition");
  const [submittingEditProject, setSubmittingEditProject] = useState(false);

  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Dynamic Domain Counts for the 16 Official Domains
  const dynamicDomains: TechnicalDomainWithCount[] = useMemo(() => {
    return TECHNICAL_DOMAINS.map((domain) => {
      const count = projectsList.filter(
        (p) =>
          (p.domainCode && p.domainCode.toUpperCase() === domain.code.toUpperCase()) ||
          (p.category && p.category.toLowerCase().trim() === domain.name.toLowerCase().trim())
      ).length;
      return {
        ...domain,
        projectCount: count
      };
    });
  }, [projectsList]);

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
    const customRequirements = inquiries.filter(
      (i) => i.source === "Custom Requirement" || (i.id && i.id.startsWith("REQ-"))
    ).length;
    const projectEnquiries = inquiries.filter(
      (i) => i.source === "Project Enquiry" || (i.id && i.id.startsWith("PE-"))
    ).length;
    const consultationRequests = inquiries.filter(
      (i) => i.source === "Consultation Request" || (!i.source && !i.id?.startsWith("PE-") && !i.id?.startsWith("REQ-"))
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
      customRequirements,
      projectEnquiries,
      consultationRequests,
      generalEnquiries
    };
  }, [inquiries]);

  // Helper to compute next sequential code for a domain
  const getNextProjectCode = (domainCode: string): string => {
    const upper = domainCode.trim().toUpperCase();
    let maxSeq = 0;
    const regex = new RegExp(`^${upper}(\\d+)$`, "i");
    for (const p of projectsList) {
      const code = p.projectCode || p.id;
      const match = code.match(regex);
      if (match) {
        const num = parseInt(match[1], 10);
        if (!isNaN(num) && num > maxSeq) {
          maxSeq = num;
        }
      }
    }
    const nextSeq = maxSeq + 1;
    return `${upper}${String(nextSeq).padStart(3, "0")}`;
  };

  // Filtered inquiries for Consultation Management & Website Enquiries
  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      const vStatus =
        item.verificationStatus ||
        (item.status === "Spam"
          ? "Spam"
          : item.status === "Suspicious"
          ? "Suspicious"
          : "Verified");
      const itemSource =
        item.source ||
        (item.id && item.id.startsWith("PE-") ? "Project Enquiry" : "Consultation Request");
      const itemDomain = item.domainName || item.projectDomain || item.category || "General";
      const itemDomainCode = item.domainCode || "";

      const matchesStatus =
        statusFilter === "All" ||
        item.status === statusFilter ||
        (statusFilter === "Verified" && vStatus === "Verified") ||
        (statusFilter === "Suspicious" && vStatus === "Suspicious") ||
        (statusFilter === "Spam" && vStatus === "Spam");

      const matchesSource = sourceFilter === "All" || itemSource === sourceFilter;

      const matchesEnquiryType =
        enquiryTypeFilter === "All" ||
        (enquiryTypeFilter === "Project Specific" &&
          (item.enquiryType === "Project Specific" || Boolean(item.projectCode))) ||
        (enquiryTypeFilter === "General Domain" &&
          (item.enquiryType === "General Domain" ||
            (!item.projectCode && item.enquiryType !== "Project Specific")));

      const matchesDomain =
        enquiryDomainFilter === "All" ||
        (itemDomainCode && itemDomainCode.toUpperCase() === enquiryDomainFilter.toUpperCase()) ||
        (item.domainCode && item.domainCode.toUpperCase() === enquiryDomainFilter.toUpperCase()) ||
        (itemDomain && itemDomain.toLowerCase().trim() === enquiryDomainFilter.toLowerCase().trim());

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
        (item.projectCode && item.projectCode.toLowerCase().includes(q)) ||
        (item.domainCode && item.domainCode.toLowerCase().includes(q)) ||
        (item.domainName && item.domainName.toLowerCase().includes(q)) ||
        (item.degree && item.degree.toLowerCase().includes(q)) ||
        (item.requirement && item.requirement.toLowerCase().includes(q)) ||
        (itemSource && itemSource.toLowerCase().includes(q)) ||
        (vStatus && vStatus.toLowerCase().includes(q));

      return (
        matchesStatus &&
        matchesSource &&
        matchesEnquiryType &&
        matchesDomain &&
        matchesSearch
      );
    });
  }, [
    inquiries,
    statusFilter,
    sourceFilter,
    enquiryTypeFilter,
    enquiryDomainFilter,
    searchQuery
  ]);

  // Filtered projects for Project Management
  const filteredProjects = useMemo(() => {
    return projectsList.filter((p) => {
      const matchesDomain =
        projectDomainFilter === "All" ||
        (p.domainCode && p.domainCode.toUpperCase() === projectDomainFilter.toUpperCase()) ||
        (p.category && p.category.toLowerCase().trim() === projectDomainFilter.toLowerCase().trim());

      const q = projectSearchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        (p.projectCode && p.projectCode.toLowerCase().includes(q)) ||
        (p.domainCode && p.domainCode.toLowerCase().includes(q)) ||
        p.title.toLowerCase().includes(q) ||
        (p.tagline && p.tagline.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q)) ||
        (p.techStack && p.techStack.some((t) => t.toLowerCase().includes(q)));

      return matchesDomain && matchesSearch;
    });
  }, [projectsList, projectDomainFilter, projectSearchQuery]);

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
      (newStatus === "Spam"
        ? "Spam"
        : newStatus === "Suspicious"
        ? "Suspicious"
        : newStatus === "Verified"
        ? "Verified"
        : undefined);

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

  // Refresh data
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const inqPromise = fetch("/api/admin/inquiries").then((r) => r.json());
      const projPromise = fetch("/api/projects?limit=500").then((r) => r.json());

      const [inqData, projData] = await Promise.all([inqPromise, projPromise]);

      if (inqData && inqData.inquiries) {
        setInquiries(inqData.inquiries);
      }
      if (projData && projData.projects) {
        setProjectsList(projData.projects);
      }
      showToast("Repository & inquiries refreshed");
    } catch (e) {
      showToast("Failed to refresh records.");
    } finally {
      setRefreshing(false);
    }
  };

  // Handle Add New Project
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectTitle.trim() || !newProjectDescription.trim()) {
      showToast("Please enter a title and description.");
      return;
    }
    setSubmittingNewProject(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          domainCode: newProjectDomainCode,
          title: newProjectTitle.trim(),
          tagline: newProjectTagline.trim(),
          description: newProjectDescription.trim(),
          abstract: newProjectAbstract.trim() || newProjectDescription.trim(),
          techStack: newProjectTechStack.split(",").map((s) => s.trim()).filter(Boolean),
          level: newProjectLevel,
          year: newProjectYear,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.project) {
        setProjectsList((prev) => [data.project, ...prev]);
        showToast(`Project created with Code: ${data.project.projectCode}`);
        setIsAddProjectModalOpen(false);
        setNewProjectTitle("");
        setNewProjectTagline("");
        setNewProjectDescription("");
        setNewProjectAbstract("");
        setNewProjectTechStack("");
      } else {
        showToast(data.error || "Failed to create project");
      }
    } catch (err) {
      showToast("Network error creating project.");
    } finally {
      setSubmittingNewProject(false);
    }
  };

  // Handle Open Edit Modal
  const openEditModal = (proj: Project) => {
    setSelectedProjectForEdit(proj);
    setEditProjectTitle(proj.title || "");
    setEditProjectTagline(proj.tagline || "");
    setEditProjectDescription(proj.description || "");
    setEditProjectAbstract(proj.abstract || "");
    setEditProjectTechStack((proj.techStack || []).join(", "));
    setEditProjectLevel(proj.level || "UG Final Year");
    setEditProjectYear(proj.year || "2025-26 Edition");
  };

  // Handle Save Edit Project
  const handleUpdateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectForEdit) return;
    const code = selectedProjectForEdit.projectCode || selectedProjectForEdit.id;
    setSubmittingEditProject(true);
    try {
      const res = await fetch(`/api/projects/${code}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editProjectTitle.trim(),
          tagline: editProjectTagline.trim(),
          description: editProjectDescription.trim(),
          abstract: editProjectAbstract.trim(),
          techStack: editProjectTechStack.split(",").map((s) => s.trim()).filter(Boolean),
          level: editProjectLevel,
          year: editProjectYear,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.project) {
        setProjectsList((prev) =>
          prev.map((p) => ((p.projectCode || p.id) === code ? data.project : p))
        );
        showToast(`Project ${code} updated successfully!`);
        setSelectedProjectForEdit(null);
      } else {
        showToast(data.error || "Failed to update project");
      }
    } catch (err) {
      showToast("Error updating project.");
    } finally {
      setSubmittingEditProject(false);
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

  const renderSourceBadge = (source?: string, id?: string) => {
    const s = source || (id && id.startsWith("PE-") ? "Project Enquiry" : id && id.startsWith("REQ-") ? "Custom Requirement" : "Consultation Request");
    if (s === "Custom Requirement") {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-[#DCE8D9] text-[#254930] border border-[#315C3D]">
          <Sparkles className="w-3 h-3 text-[#315C3D]" />
          <span>Custom Requirement</span>
        </span>
      );
    }
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

  const renderEnquiryTypeBadge = (inq: ConsultationRequest) => {
    const isProjectSpecific = inq.enquiryType === "Project Specific" || Boolean(inq.projectCode);
    if (isProjectSpecific) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-[#DCE8D9] text-[#315C3D] border border-[#DDDCCF]">
          <Layers className="w-3 h-3 text-[#315C3D]" />
          <span>Project Specific</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold font-mono bg-[#EEE9DC] text-[#202820] border border-[#DDDCCF]">
        <Tag className="w-3 h-3 text-[#315C3D]" />
        <span>General Domain</span>
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
      badge: `${projectsList.length} active`,
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
                  src="/images/anti-matrix-logo.png"
                  alt="Anti-Matrix Official Logo"
                  width={150}
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
              v2.5 • 16 Domains
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
                {activeTab === "projects" && "Technical Domains & Projects"}
                {activeTab === "enquiries" && "Website Inquiries & Contact Forms"}
                {activeTab === "account" && "Administrator Account & Security"}
              </h1>
              <p className="text-xs text-[#667064] hidden sm:block">
                AntiMatrix Admin Suite • Official 16 Domains Single Source of Truth
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
              href="/projects"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] text-xs font-bold text-[#315C3D] border border-[#DDDCCF] transition-colors"
            >
              <span>Projects Catalog</span>
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
                    Review and coordinate final year engineering project consultations, verify IEEE project documentation pipelines, and monitor student requests across all 16 technical domains.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto">
                  <button
                    onClick={() => setActiveTab("consultations")}
                    className="px-5 py-3 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold transition-colors shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Users className="w-4 h-4" />
                    <span>Manage Consultations</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("projects")}
                    className="px-5 py-3 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] text-[#315C3D] border border-[#DDDCCF] text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Layers className="w-4 h-4" />
                    <span>View {projectsList.length} Projects</span>
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
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

              {/* Two Column Layout: Recent Requests & Technical Domains Snapshot */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#DDDCCF]">
                    <div>
                      <h3 className="text-base font-bold text-[#202820]">Recent Consultation Inquiries</h3>
                      <p className="text-xs text-[#667064]">Latest submissions requiring coordinator action</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("consultations")}
                      className="text-xs font-bold text-[#315C3D] hover:underline flex items-center gap-1 cursor-pointer"
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
                            {renderEnquiryTypeBadge(inq)}
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
                            {inq.domainCode ? `[${inq.domainCode}] ` : ""}
                            {inq.projectDomain || inq.domainName || inq.projectTitle}
                          </p>
                          <p className="text-[11px] text-[#667064] truncate">
                            {inq.college || "Academic Student"} • WhatsApp: {inq.whatsappNumber || inq.phone}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => setSelectedInquiry(inq)}
                            className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] hover:bg-[#EEE9DC] border border-[#DDDCCF] text-xs font-bold text-[#202820] transition-colors cursor-pointer"
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
                        <span className="text-[#667064]">Sequential Codes:</span>
                        <span className="font-bold font-mono text-[#315C3D]">Domain-Independent</span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] flex items-center justify-between">
                        <span className="text-[#667064]">Storage Model:</span>
                        <span className="font-bold font-mono text-[#315C3D]">Preserved Store File</span>
                      </div>
                    </div>
                  </div>

                  {/* 16 Domains Summary */}
                  <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-[#202820]">16 Technical Domains</h3>
                      <span className="text-[11px] font-mono font-bold text-[#315C3D]">
                        {projectsList.length} Projects Total
                      </span>
                    </div>
                    <p className="text-xs text-[#667064]">
                      All 16 official technical domains are actively maintained with independent sequential codes (e.g. AMPY, AMJV, AMML).
                    </p>
                    <button
                      onClick={() => setActiveTab("projects")}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] text-[#315C3D] font-bold text-xs border border-[#DDDCCF] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Manage Domains &amp; Projects</span>
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
              <div className="p-5 sm:p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm space-y-4">
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
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

                  <div className="flex items-center gap-2">
                    <select
                      value={enquiryDomainFilter}
                      onChange={(e) => setEnquiryDomainFilter(e.target.value)}
                      className="px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs font-medium text-[#202820] focus:outline-none focus:border-[#315C3D]"
                    >
                      <option value="All">All 16 Technical Domains</option>
                      {dynamicDomains.map((d) => (
                        <option key={d.code} value={d.code}>
                          {d.sno}. {d.name} ({d.code})
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

              {filteredInquiries.length > 0 ? (
                <div className="space-y-4">
                  {filteredInquiries.map((inq) => {
                    const actualWa = (inq.whatsappNumber || inq.phone).replace(/[^0-9]/g, "");
                    const waLink = `https://wa.me/${actualWa.startsWith("91") ? actualWa : "91" + actualWa}?text=${encodeURIComponent(`Hello ${inq.name}, regarding your AntiMatrix project consultation for "${inq.projectTitle || inq.domainName || inq.projectDomain}":`)}`;

                    return (
                      <div
                        key={inq.id}
                        className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/40 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 transition-all"
                      >
                        <div className="space-y-3 flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-lg bg-[#202820] text-white">
                              {inq.id}
                            </span>
                            {renderSourceBadge(inq.source, inq.id)}
                            {renderEnquiryTypeBadge(inq)}
                            {renderVerificationBadge(inq)}
                            <span
                              className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${
                                inq.status === "New"
                                  ? "bg-[#315C3D] text-white"
                                  : inq.status === "Pending"
                                  ? "bg-[#DCE8D9] text-[#315C3D]"
                                  : inq.status === "In Progress"
                                  ? "bg-[#EEE9DC] text-[#497A52]"
                                  : "bg-[#FFFFFF] text-[#202820] border border-[#DDDCCF]"
                              }`}
                            >
                              ● {inq.status}
                            </span>
                          </div>

                          <div>
                            <h3 className="text-base font-bold text-[#202820]">{inq.name}</h3>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#667064] mt-0.5">
                              {inq.college && (
                                <span className="flex items-center gap-1">
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

                          <div className="p-3 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1 text-xs">
                            <span className="font-bold text-[#315C3D] flex items-center gap-1.5 font-mono">
                              <Layers className="w-3.5 h-3.5" />
                              <span>Domain: {inq.domainCode ? `${inq.domainCode} • ` : ""}{inq.domainName || inq.projectDomain || inq.category}</span>
                            </span>
                            {inq.projectCode && (
                              <p className="font-mono font-bold text-[#202820]">
                                Target Project Code: {inq.projectCode}
                              </p>
                            )}
                            {inq.projectTitle && inq.projectTitle !== (inq.projectDomain || inq.domainName) && (
                              <p className="font-semibold text-[#202820] truncate">
                                Topic: {inq.projectTitle}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch lg:items-end gap-3 shrink-0 w-full lg:w-auto pt-4 lg:pt-0 border-t lg:border-t-0 border-[#DDDCCF]">
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
                            <button
                              onClick={() => setSelectedInquiry(inq)}
                              className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] hover:bg-[#EEE9DC] border border-[#DDDCCF] text-xs font-bold text-[#202820] transition-colors cursor-pointer"
                            >
                              Full Details
                            </button>
                          </div>

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
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 bg-[#FFFFFF] rounded-3xl border border-[#DDDCCF] space-y-3">
                  <AlertCircle className="w-10 h-10 text-[#667064] mx-auto" />
                  <h3 className="text-base font-bold text-[#202820]">No consultation requests found</h3>
                  <p className="text-xs text-[#667064]">Try adjusting your search query or status filter.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: PROJECT MANAGEMENT & 16 TECHNICAL DOMAINS */}
          {activeTab === "projects" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Header Card */}
              <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DCE8D9] border border-[#DDDCCF] text-xs font-bold text-[#315C3D] mb-2 font-mono">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Official 16 Technical Domains • {projectsList.length} Active Projects</span>
                  </div>
                  <h2 className="text-xl font-black text-[#202820]">
                    Technical Domains &amp; Project Repository
                  </h2>
                  <p className="text-xs text-[#667064] mt-1">
                    Manage the 16 official technical domains and project repository. Sequential project codes (DOMAINCODE + 3-digit number) are maintained independently per domain.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setNewProjectDomainCode("AMPY");
                      setIsAddProjectModalOpen(true);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add New Project</span>
                  </button>
                  <Link
                    href="/projects"
                    target="_blank"
                    className="px-4 py-2.5 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] text-[#315C3D] border border-[#DDDCCF] text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <span>Public Catalog</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* SECTION 1: OFFICIAL 16 TECHNICAL DOMAINS TABLE / GRID */}
              <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#DDDCCF]">
                  <div>
                    <h3 className="text-base font-bold text-[#202820] flex items-center gap-2">
                      <FolderOpen className="w-4 h-4 text-[#315C3D]" />
                      <span>Official 16 Technical Domains</span>
                    </h3>
                    <p className="text-xs text-[#667064]">
                      Single source of truth. Every domain code prefix defines the sequential project code series.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#315C3D] bg-[#DCE8D9] px-2.5 py-1 rounded-full border border-[#DDDCCF]">
                    16 Domains Active
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#DDDCCF] text-[#667064] font-mono uppercase text-[11px]">
                        <th className="py-2.5 px-3">S.No.</th>
                        <th className="py-2.5 px-3">Technical Domain</th>
                        <th className="py-2.5 px-3">Domain Code</th>
                        <th className="py-2.5 px-3">Available Projects</th>
                        <th className="py-2.5 px-3">Domain Status</th>
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DDDCCF]/60">
                      {dynamicDomains.map((domain) => (
                        <tr
                          key={domain.code}
                          className={`hover:bg-[#F5F1E7]/80 transition-colors ${
                            projectDomainFilter === domain.code ? "bg-[#DCE8D9]/30" : ""
                          }`}
                        >
                          <td className="py-3 px-3 font-mono font-bold text-[#667064]">{domain.sno}</td>
                          <td className="py-3 px-3">
                            <span className="font-bold text-[#202820] block">{domain.name}</span>
                            <span className="text-[11px] text-[#667064] line-clamp-1">{domain.description}</span>
                          </td>
                          <td className="py-3 px-3 font-mono font-black">
                            <span className="px-2.5 py-1 rounded-lg bg-[#202820] text-white">
                              {domain.code}
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            {domain.projectCount > 0 ? (
                              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#DCE8D9] text-[#315C3D] border border-[#DCE8D9]">
                                {domain.projectCount} Projects
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-[#EEE9DC] text-[#667064] border border-[#DDDCCF]">
                                0 Projects
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3">
                            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-bold font-mono bg-[#DCE8D9] text-[#315C3D]">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#315C3D]" />
                              <span>Active</span>
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  setProjectDomainFilter(domain.code);
                                  showToast(`Filtered to ${domain.name} (${domain.code})`);
                                }}
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                                  projectDomainFilter === domain.code
                                    ? "bg-[#315C3D] text-white"
                                    : "bg-[#EEE9DC] text-[#315C3D] hover:bg-[#DCE8D9] border border-[#DDDCCF]"
                                }`}
                              >
                                Filter Projects
                              </button>
                              <Link
                                href={`/projects/${domain.code}`}
                                target="_blank"
                                className="p-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#EEE9DC] text-[#667064] hover:text-[#315C3D] border border-[#DDDCCF]"
                                title={`Open /projects/${domain.code} public catalog`}
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={() => {
                                  setNewProjectDomainCode(domain.code);
                                  setIsAddProjectModalOpen(true);
                                }}
                                className="p-1.5 rounded-lg bg-[#FFFFFF] hover:bg-[#DCE8D9] text-[#315C3D] border border-[#DDDCCF] cursor-pointer"
                                title={`Add project under ${domain.code}`}
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SECTION 2: PROJECTS REPOSITORY & SEQUENTIAL CODE MANAGEMENT */}
              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 text-[#667064] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search by project code (e.g. AMPY001), title, tech stack, or description..."
                      value={projectSearchQuery}
                      onChange={(e) => setProjectSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={projectDomainFilter}
                      onChange={(e) => setProjectDomainFilter(e.target.value)}
                      className="px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs font-medium text-[#202820] focus:outline-none focus:border-[#315C3D] cursor-pointer"
                    >
                      <option value="All">All Domains ({projectsList.length} Projects)</option>
                      {dynamicDomains.map((d) => (
                        <option key={d.code} value={d.code}>
                          {d.sno}. {d.name} ({d.code}) - {d.projectCount} Projects
                        </option>
                      ))}
                    </select>

                    {projectDomainFilter !== "All" && (
                      <button
                        onClick={() => setProjectDomainFilter("All")}
                        className="px-3 py-2.5 rounded-xl bg-[#EEE9DC] text-xs font-bold text-[#667064] hover:text-[#202820] border border-[#DDDCCF] cursor-pointer"
                      >
                        Reset Filter
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#667064] px-1">
                  <span>
                    Showing <strong className="text-[#202820]">{filteredProjects.length}</strong> of{" "}
                    {projectsList.length} projects
                    {projectDomainFilter !== "All" && ` in domain ${projectDomainFilter}`}
                  </span>
                  <span className="font-mono text-[11px]">
                    Next Code for {projectDomainFilter === "All" ? "AMPY" : projectDomainFilter}:{" "}
                    <strong>{getNextProjectCode(projectDomainFilter === "All" ? "AMPY" : projectDomainFilter)}</strong>
                  </span>
                </div>

                {filteredProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredProjects.map((proj) => {
                      const projCode = proj.projectCode || proj.id;
                      const domCode = proj.domainCode || "AMPY";

                      return (
                        <div
                          key={proj.id}
                          className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] hover:border-[#315C3D]/40 shadow-sm transition-all flex flex-col justify-between space-y-4"
                        >
                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-black text-xs px-2.5 py-1 rounded-lg bg-[#202820] text-white">
                                  {projCode}
                                </span>
                                <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#DCE8D9] text-[#315C3D] border border-[#DDDCCF]">
                                  {domCode} • {proj.domainName || proj.category}
                                </span>
                              </div>
                              <span className="text-[10px] font-mono text-[#667064] bg-[#F5F1E7] px-2 py-0.5 rounded">
                                {proj.level || "UG Final Year"}
                              </span>
                            </div>

                            <h3 className="text-base font-bold text-[#202820] leading-snug">
                              {proj.title}
                            </h3>
                            <p className="text-xs text-[#315C3D] font-semibold line-clamp-1">
                              {proj.tagline}
                            </p>
                            <p className="text-xs text-[#667064] line-clamp-3 leading-relaxed">
                              {proj.description}
                            </p>

                            <div className="pt-2">
                              <span className="text-[10px] font-mono uppercase text-[#667064] block mb-1.5 font-bold">
                                Technology Stack
                              </span>
                              <div className="flex flex-wrap gap-1.5">
                                {proj.techStack?.map((tech) => (
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

                          <div className="pt-4 border-t border-[#DDDCCF] flex flex-wrap items-center justify-between gap-2">
                            <span className="text-[11px] text-[#667064] font-mono">
                              {proj.modules?.length || 4} Modules Included
                            </span>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedProjectForView(proj)}
                                className="px-3 py-1.5 rounded-xl bg-[#FFFFFF] hover:bg-[#EEE9DC] border border-[#DDDCCF] text-xs font-bold text-[#202820] transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Details</span>
                              </button>

                              <button
                                onClick={() => openEditModal(proj)}
                                className="px-3 py-1.5 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] border border-[#DDDCCF] text-xs font-bold text-[#315C3D] transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <Edit className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>

                              <Link
                                href={`/projects/${domCode}/${projCode}`}
                                target="_blank"
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold transition-colors shadow-xs"
                              >
                                <span>Public</span>
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-[#FFFFFF] rounded-3xl border border-[#DDDCCF] space-y-3">
                    <AlertCircle className="w-10 h-10 text-[#667064] mx-auto" />
                    <h3 className="text-base font-bold text-[#202820]">
                      No projects found under {projectDomainFilter}
                    </h3>
                    <p className="text-xs text-[#667064]">
                      Projects for this domain will be available soon, or click below to add the first project now.
                    </p>
                    <button
                      onClick={() => {
                        if (projectDomainFilter !== "All") {
                          setNewProjectDomainCode(projectDomainFilter);
                        }
                        setIsAddProjectModalOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#315C3D] text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>+ Add First Project to this Domain</span>
                    </button>
                  </div>
                )}
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
                    Manage Project Enquiries, General Contact Submissions, and Consultation Requests with verified WhatsApp routing across all 16 technical domains.
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
                      placeholder="Search by ID (e.g. PE-2026-), student name, college, department, domain, project code, or phone..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={enquiryDomainFilter}
                      onChange={(e) => setEnquiryDomainFilter(e.target.value)}
                      className="px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs font-medium text-[#202820] focus:outline-none focus:border-[#315C3D] cursor-pointer"
                    >
                      <option value="All">All 16 Technical Domains</option>
                      {dynamicDomains.map((d) => (
                        <option key={d.code} value={d.code}>
                          {d.sno}. {d.name} ({d.code})
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

                {/* Enquiry Type Filter Row */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#DDDCCF] text-xs">
                  <span className="text-[#667064] font-mono text-[11px] mr-1">Enquiry Type:</span>
                  {[
                    { id: "All", label: "All Enquiry Types" },
                    { id: "Project Specific", label: "Project Specific" },
                    { id: "General Domain", label: "General Domain Enquiry" }
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setEnquiryTypeFilter(type.id)}
                      className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                        enquiryTypeFilter === type.id
                          ? "bg-[#315C3D] text-white shadow-xs"
                          : "bg-[#EEE9DC] text-[#667064] hover:text-[#202820] border border-[#DDDCCF]"
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}

                  <span className="text-[#667064] font-mono text-[11px] ml-auto">
                    Domain Filter: <strong className="text-[#202820]">{enquiryDomainFilter}</strong>
                  </span>
                </div>

                {/* Source Category Filter Tabs */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#DDDCCF] text-xs">
                  <span className="text-[#667064] font-mono text-[11px] mr-1">Category:</span>
                  {[
                    { id: "All", label: "All Categories", count: stats.total },
                    { id: "Custom Requirement", label: "Custom Requirements", count: stats.customRequirements },
                    { id: "Consultation Request", label: "Consultation Requests", count: stats.consultationRequests },
                    { id: "Project Enquiry", label: "Project Enquiries", count: stats.projectEnquiries },
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
                    const targetTopic = inq.projectTitle || inq.projectDomain || inq.domainName || inq.category;
                    const waLink = `https://wa.me/${cleanWa.startsWith("91") ? cleanWa : "91" + cleanWa}?text=${encodeURIComponent(`Hello ${inq.name}, regarding your AntiMatrix Project Enquiry [${inq.id}] for "${targetTopic}":`)}`;
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
                            <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-lg bg-[#202820] text-white">
                              {inq.id}
                            </span>
                            {renderSourceBadge(inq.source, inq.id)}
                            {renderEnquiryTypeBadge(inq)}
                            {renderVerificationBadge(inq)}

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

                          {/* Technical Domain & Target Project Details */}
                          <div className="p-3 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1.5 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[#315C3D] flex items-center gap-1.5 font-mono">
                                <Layers className="w-3.5 h-3.5" />
                                <span>
                                  Domain: {inq.domainCode ? `${inq.domainCode} • ` : ""}
                                  {inq.domainName || inq.projectDomain || inq.category || "General Engineering"}
                                </span>
                              </span>
                              {inq.urgency && (
                                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#DCE8D9] text-[#315C3D] font-semibold">
                                  Timeline: {inq.urgency}
                                </span>
                              )}
                            </div>

                            {/* Project Specific Details if available */}
                            {inq.projectCode && (
                              <div className="flex items-center gap-2 pt-1">
                                <span className="font-mono font-bold text-[11px] px-2 py-0.5 rounded bg-[#202820] text-white">
                                  {inq.projectCode}
                                </span>
                                <span className="font-semibold text-[#202820] truncate">
                                  {inq.projectTitle}
                                </span>
                              </div>
                            )}

                            {!inq.projectCode && inq.projectTitle && inq.projectTitle !== (inq.projectDomain || inq.domainName) && (
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
                            <span className="flex items-center gap-1.5 font-mono font-bold text-[#315C3D]">
                              <MessageCircle className="w-3.5 h-3.5 text-[#315C3D]" />
                              <span>WhatsApp: {inq.whatsappNumber || inq.phone}</span>
                            </span>

                            {inq.mobileNumber && inq.mobileNumber !== inq.whatsappNumber && (
                              <span className="flex items-center gap-1.5 font-mono text-[#667064]">
                                <Phone className="w-3.5 h-3.5 text-[#667064]" />
                                <span>Mobile: {inq.mobileNumber}</span>
                              </span>
                            )}

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
                        <strong className="text-[#202820] block">Domain Code Enforcement</strong>
                        <span className="text-[#667064] text-[11px]">
                          Strictly 16 official technical domains with automated sequential project code creation.
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

      {/* MODAL 1: ADD NEW PROJECT MODAL */}
      {isAddProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-[#FFFFFF] rounded-3xl border border-[#DDDCCF] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 text-[#202820]">
            <div className="p-6 bg-[#EEE9DC] border-b border-[#DDDCCF] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase text-[#315C3D] block">
                  Project Creation Desk
                </span>
                <h3 className="text-lg font-black text-[#202820] mt-0.5">
                  Add New Project Under Domain
                </h3>
              </div>
              <button
                onClick={() => setIsAddProjectModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-[#DCE8D9] text-[#667064] hover:text-[#315C3D] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              {/* Technical Domain Selector */}
              <div>
                <label className="block text-xs font-bold text-[#202820] mb-1">
                  1. Official Technical Domain (Select from 16 Domains) *
                </label>
                <select
                  value={newProjectDomainCode}
                  onChange={(e) => setNewProjectDomainCode(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs font-bold text-[#202820] focus:outline-none focus:border-[#315C3D]"
                >
                  {dynamicDomains.map((d) => (
                    <option key={d.code} value={d.code}>
                      {d.sno}. {d.name} ({d.code}) - {d.projectCount} Existing Projects
                    </option>
                  ))}
                </select>
              </div>

              {/* Next Generated Code Preview */}
              <div className="p-3.5 rounded-xl bg-[#DCE8D9]/70 border border-[#315C3D]/30 flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-[#315C3D] block">
                    Next Sequential Project Code:
                  </span>
                  <span className="text-[11px] text-[#667064]">
                    Auto-generated: DOMAINCODE + 3-digit number
                  </span>
                </div>
                <span className="font-mono font-black text-sm px-3 py-1 rounded-lg bg-[#202820] text-white">
                  {getNextProjectCode(newProjectDomainCode)}
                </span>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-[#202820] mb-1">
                  2. Project Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI-Powered Drone Surveillance & Real-Time Threat Tracking"
                  value={newProjectTitle}
                  onChange={(e) => setNewProjectTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] focus:outline-none focus:border-[#315C3D]"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-xs font-bold text-[#202820] mb-1">
                  3. Tagline / Subtitle
                </label>
                <input
                  type="text"
                  placeholder="e.g. Computer Vision Edge Detection & Automated Geofence Alerts"
                  value={newProjectTagline}
                  onChange={(e) => setNewProjectTagline(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] focus:outline-none focus:border-[#315C3D]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#202820] mb-1">
                  4. Short Description *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Brief summary of the engineering project solution..."
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] focus:outline-none focus:border-[#315C3D]"
                />
              </div>

              {/* Abstract */}
              <div>
                <label className="block text-xs font-bold text-[#202820] mb-1">
                  5. Full Abstract / Problem &amp; Solution
                </label>
                <textarea
                  rows={4}
                  placeholder="Comprehensive technical abstract and academic problem statement..."
                  value={newProjectAbstract}
                  onChange={(e) => setNewProjectAbstract(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] focus:outline-none focus:border-[#315C3D]"
                />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-xs font-bold text-[#202820] mb-1">
                  6. Technology Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Python, OpenCV, YOLOv8, PyTorch, Streamlit"
                  value={newProjectTechStack}
                  onChange={(e) => setNewProjectTechStack(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] focus:outline-none focus:border-[#315C3D]"
                />
              </div>

              {/* Level & Year */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#202820] mb-1">
                    7. Academic Level
                  </label>
                  <select
                    value={newProjectLevel}
                    onChange={(e) => setNewProjectLevel(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] focus:outline-none focus:border-[#315C3D]"
                  >
                    <option value="UG Final Year">UG Final Year</option>
                    <option value="PG / M.Tech">PG / M.Tech</option>
                    <option value="Diploma / Mini Project">Diploma / Mini Project</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#202820] mb-1">
                    8. Edition Year
                  </label>
                  <input
                    type="text"
                    value={newProjectYear}
                    onChange={(e) => setNewProjectYear(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] focus:outline-none focus:border-[#315C3D]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#DDDCCF] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddProjectModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#EEE9DC] text-xs font-bold text-[#667064] hover:text-[#202820] border border-[#DDDCCF] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingNewProject}
                  className="px-5 py-2.5 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {submittingNewProject ? "Saving..." : "Create & Save Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: EDIT PROJECT MODAL */}
      {selectedProjectForEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-[#FFFFFF] rounded-3xl border border-[#DDDCCF] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 text-[#202820]">
            <div className="p-6 bg-[#EEE9DC] border-b border-[#DDDCCF] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-mono font-bold uppercase text-[#315C3D] block">
                  Project Code: {selectedProjectForEdit.projectCode || selectedProjectForEdit.id}
                </span>
                <h3 className="text-lg font-black text-[#202820] mt-0.5">
                  Edit Project Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedProjectForEdit(null)}
                className="p-1.5 rounded-xl hover:bg-[#DCE8D9] text-[#667064] hover:text-[#315C3D] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProject} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              {/* Domain & Code Info (Read-Only) */}
              <div className="p-3.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs text-[#202820] block">
                    Domain: {selectedProjectForEdit.domainCode} • {selectedProjectForEdit.domainName || selectedProjectForEdit.category}
                  </span>
                  <span className="text-[11px] text-[#667064]">
                    Project Code is immutable to preserve citation links.
                  </span>
                </div>
                <span className="font-mono font-black text-sm px-3 py-1 rounded-lg bg-[#202820] text-white">
                  {selectedProjectForEdit.projectCode || selectedProjectForEdit.id}
                </span>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold text-[#202820] mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  required
                  value={editProjectTitle}
                  onChange={(e) => setEditProjectTitle(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] focus:outline-none focus:border-[#315C3D]"
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-xs font-bold text-[#202820] mb-1">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={editProjectTagline}
                  onChange={(e) => setEditProjectTagline(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] focus:outline-none focus:border-[#315C3D]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-[#202820] mb-1">
                  Short Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={editProjectDescription}
                  onChange={(e) => setEditProjectDescription(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] focus:outline-none focus:border-[#315C3D]"
                />
              </div>

              {/* Abstract */}
              <div>
                <label className="block text-xs font-bold text-[#202820] mb-1">
                  Full Technical Abstract
                </label>
                <textarea
                  rows={4}
                  value={editProjectAbstract}
                  onChange={(e) => setEditProjectAbstract(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] focus:outline-none focus:border-[#315C3D]"
                />
              </div>

              {/* Tech Stack */}
              <div>
                <label className="block text-xs font-bold text-[#202820] mb-1">
                  Technology Stack (Comma-separated)
                </label>
                <input
                  type="text"
                  value={editProjectTechStack}
                  onChange={(e) => setEditProjectTechStack(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] focus:outline-none focus:border-[#315C3D]"
                />
              </div>

              {/* Level & Year */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#202820] mb-1">
                    Academic Level
                  </label>
                  <select
                    value={editProjectLevel}
                    onChange={(e) => setEditProjectLevel(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] focus:outline-none focus:border-[#315C3D]"
                  >
                    <option value="UG Final Year">UG Final Year</option>
                    <option value="PG / M.Tech">PG / M.Tech</option>
                    <option value="Diploma / Mini Project">Diploma / Mini Project</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#202820] mb-1">
                    Edition Year
                  </label>
                  <input
                    type="text"
                    value={editProjectYear}
                    onChange={(e) => setEditProjectYear(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] focus:outline-none focus:border-[#315C3D]"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#DDDCCF] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedProjectForEdit(null)}
                  className="px-4 py-2.5 rounded-xl bg-[#EEE9DC] text-xs font-bold text-[#667064] hover:text-[#202820] border border-[#DDDCCF] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingEditProject}
                  className="px-5 py-2.5 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {submittingEditProject ? "Saving..." : "Update Project"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: VIEW FULL PROJECT DETAILS MODAL */}
      {selectedProjectForView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-[#FFFFFF] rounded-3xl border border-[#DDDCCF] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 text-[#202820]">
            <div className="p-6 bg-[#EEE9DC] border-b border-[#DDDCCF] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-lg bg-[#202820] text-white">
                    {selectedProjectForView.projectCode || selectedProjectForView.id}
                  </span>
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#DCE8D9] text-[#315C3D]">
                    {selectedProjectForView.domainCode} • {selectedProjectForView.domainName || selectedProjectForView.category}
                  </span>
                </div>
                <h3 className="text-base font-black text-[#202820] mt-0.5">
                  {selectedProjectForView.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProjectForView(null)}
                className="p-1.5 rounded-xl hover:bg-[#DCE8D9] text-[#667064] hover:text-[#315C3D] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              {/* Tagline */}
              <div className="p-3.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF]">
                <span className="text-[10px] font-mono uppercase text-[#315C3D] font-bold block mb-0.5">
                  Tagline
                </span>
                <p className="font-semibold text-xs text-[#202820]">{selectedProjectForView.tagline}</p>
              </div>

              {/* Abstract */}
              <div className="p-4 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1">
                <span className="text-[10px] font-mono uppercase text-[#667064] block font-bold">
                  Technical Abstract
                </span>
                <p className="text-xs text-[#202820] leading-relaxed whitespace-pre-wrap">
                  {selectedProjectForView.abstract || selectedProjectForView.description}
                </p>
              </div>

              {/* Tech Stack */}
              <div>
                <span className="text-[10px] font-mono uppercase text-[#667064] block mb-1.5 font-bold">
                  Technology Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProjectForView.techStack?.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-[#EEE9DC] border border-[#DDDCCF] text-xs text-[#202820] font-semibold"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modules Breakdown */}
              {selectedProjectForView.modules && selectedProjectForView.modules.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase text-[#667064] block font-bold">
                    Architecture Modules ({selectedProjectForView.modules.length})
                  </span>
                  <div className="space-y-1.5">
                    {selectedProjectForView.modules.map((m, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF]"
                      >
                        <p className="font-bold text-xs text-[#315C3D]">{m.name}</p>
                        <p className="text-[11px] text-[#667064] mt-0.5">{m.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documentation Deliverables */}
              {selectedProjectForView.documentationIncluded && (
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#667064] block mb-1.5 font-bold">
                    Included Deliverables
                  </span>
                  <ul className="space-y-1 text-xs text-[#202820]">
                    {selectedProjectForView.documentationIncluded.map((doc, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-[#315C3D] shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Footer Links */}
              <div className="pt-4 border-t border-[#DDDCCF] flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#667064]">
                  {selectedProjectForView.level || "UG Final Year"} • {selectedProjectForView.year || "2025-26 Edition"}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setSelectedProjectForView(null);
                      openEditModal(selectedProjectForView);
                    }}
                    className="px-4 py-2 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] text-xs font-bold text-[#315C3D] transition-colors cursor-pointer"
                  >
                    Edit Project
                  </button>
                  <Link
                    href={`/projects/${selectedProjectForView.domainCode || "AMPY"}/${selectedProjectForView.projectCode || selectedProjectForView.id}`}
                    target="_blank"
                    className="px-4 py-2 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <span>View Public Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: FULL INQUIRY DETAILS MODAL */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="w-full max-w-2xl bg-[#FFFFFF] rounded-3xl border border-[#DDDCCF] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 text-[#202820]">
            <div className="p-6 bg-[#EEE9DC] border-b border-[#DDDCCF] flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded-lg bg-[#202820] text-white">
                    {selectedInquiry.id}
                  </span>
                  {renderSourceBadge(selectedInquiry.source, selectedInquiry.id)}
                  {renderEnquiryTypeBadge(selectedInquiry)}
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
                <div className="p-3.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1">
                  <span className="text-[10px] font-mono text-[#315C3D] uppercase font-bold flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Number (Direct)</span>
                  </span>
                  <p className="font-bold text-sm text-[#202820]">
                    {selectedInquiry.whatsappNumber || selectedInquiry.phone}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1">
                  <span className="text-[10px] font-mono text-[#667064] uppercase block">
                    Mobile Contact Number
                  </span>
                  <p className="font-bold text-sm text-[#202820]">
                    {selectedInquiry.mobileNumber || selectedInquiry.phone}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1">
                  <span className="text-[10px] font-mono text-[#667064] uppercase block">Email Address</span>
                  <p className="font-bold text-xs text-[#202820] truncate">
                    {selectedInquiry.email || "Not Provided"}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1">
                  <span className="text-[10px] font-mono text-[#667064] uppercase block">College / Institution</span>
                  <p className="font-semibold text-xs text-[#202820]">
                    {selectedInquiry.college || "Not Specified"}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-1 sm:col-span-2">
                  <span className="text-[10px] font-mono text-[#667064] uppercase block">Department / Branch</span>
                  <p className="font-semibold text-xs text-[#202820]">
                    {selectedInquiry.department || selectedInquiry.degree || "Not Specified"}
                  </p>
                </div>
              </div>

              {/* Technical Domain & Target Project Details */}
              <div className="p-4 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#315C3D]">
                    Target Domain: {selectedInquiry.domainCode ? `${selectedInquiry.domainCode} • ` : ""}
                    {selectedInquiry.domainName || selectedInquiry.projectDomain || selectedInquiry.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#DCE8D9] text-[#315C3D] border border-[#DDDCCF]">
                    Type: {selectedInquiry.enquiryType || "Project Specific"}
                  </span>
                </div>

                {selectedInquiry.projectCode && (
                  <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#DDDCCF] flex items-center gap-2">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[#202820] text-white">
                      {selectedInquiry.projectCode}
                    </span>
                    <span className="font-bold text-xs text-[#202820]">
                      {selectedInquiry.projectTitle}
                    </span>
                  </div>
                )}

                {!selectedInquiry.projectCode && selectedInquiry.projectTitle && (
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
                  {(() => {
                    const actualWa = (selectedInquiry.whatsappNumber || selectedInquiry.phone).replace(/[^0-9]/g, "");
                    const waNum = actualWa.startsWith("91") ? actualWa : "91" + actualWa;
                    const topic = selectedInquiry.projectTitle || selectedInquiry.domainName || selectedInquiry.projectDomain;
                    return (
                      <a
                        href={`https://wa.me/${waNum}?text=${encodeURIComponent(`Hello ${selectedInquiry.name}, AntiMatrix coordinator regarding your Project Enquiry [${selectedInquiry.id}] for "${topic}":`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-4 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                      >
                        <MessageCircle className="w-4 h-4 text-white" />
                        <span>Reply on WhatsApp ({selectedInquiry.whatsappNumber || selectedInquiry.phone})</span>
                      </a>
                    );
                  })()}

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

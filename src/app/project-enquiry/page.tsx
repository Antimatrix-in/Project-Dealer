"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import {
  ClipboardList,
  User,
  Phone,
  MessageCircle,
  Mail,
  GraduationCap,
  Building2,
  Layers,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Clock,
  Copy,
  Check,
  ChevronRight,
  Lock,
  RotateCcw,
  Tag,
  ArrowRight
} from "lucide-react";
import { TECHNICAL_DOMAINS, TechnicalDomain, Project } from "@/types";
import { PROJECTS_DATA } from "@/data/projects";
import { WHATSAPP_DISPLAY, WHATSAPP_NUMBER } from "@/lib/whatsapp";

function ProjectEnquiryForm() {
  const searchParams = useSearchParams();
  const paramDomain = searchParams.get("domain") || searchParams.get("domainCode") || "";
  const paramProject = searchParams.get("project") || searchParams.get("projectCode") || "";
  const paramTitle = searchParams.get("title") || "";

  // Available projects database (can be filtered by domain)
  const [allProjects, setAllProjects] = useState<Project[]>(PROJECTS_DATA as unknown as Project[]);

  // Fetch updated projects from API on mount
  useEffect(() => {
    fetch("/api/projects?limit=200")
      .then((res) => res.json())
      .then((data) => {
        if (data.projects && Array.isArray(data.projects)) {
          setAllProjects(data.projects);
        }
      })
      .catch((err) => console.warn("Failed to fetch live projects, using fallback store:", err));
  }, []);

  // Match domain from query param if available
  const matchedDomain = useMemo(() => {
    if (!paramDomain) return null;
    const upper = paramDomain.trim().toUpperCase();
    return (
      TECHNICAL_DOMAINS.find(
        (d) => d.code === upper || d.name.toUpperCase() === upper || d.slug.toUpperCase() === upper
      ) || null
    );
  }, [paramDomain]);

  // Match preselected project if available
  const preselectedProject = useMemo(() => {
    if (!paramProject) return null;
    const upper = paramProject.trim().toUpperCase();
    return (
      allProjects.find(
        (p) =>
          (p.projectCode && p.projectCode.toUpperCase() === upper) ||
          (p.id && p.id.toUpperCase() === upper) ||
          (p.slug && p.slug.toLowerCase() === paramProject.toLowerCase())
      ) || null
    );
  }, [paramProject, allProjects]);

  // Domain & Project selection state
  const [selectedDomainCode, setSelectedDomainCode] = useState<string>(
    preselectedProject?.domainCode || matchedDomain?.code || ""
  );
  const [selectedProjectCode, setSelectedProjectCode] = useState<string>(
    preselectedProject?.projectCode || preselectedProject?.id || ""
  );
  const [isPrefilledProject, setIsPrefilledProject] = useState<boolean>(Boolean(preselectedProject));

  // Resolved domain details
  const activeDomain = useMemo(() => {
    if (!selectedDomainCode) return null;
    return TECHNICAL_DOMAINS.find((d) => d.code === selectedDomainCode.toUpperCase()) || null;
  }, [selectedDomainCode]);

  // Projects strictly belonging to the currently selected domain
  const domainProjects = useMemo(() => {
    if (!selectedDomainCode) return [];
    return allProjects.filter(
      (p) =>
        (p.domainCode && p.domainCode.toUpperCase() === selectedDomainCode.toUpperCase()) ||
        (activeDomain && p.category && p.category.toLowerCase() === activeDomain.name.toLowerCase())
    );
  }, [selectedDomainCode, allProjects, activeDomain]);

  // Active project selection
  const activeProject = useMemo(() => {
    if (!selectedProjectCode) return null;
    return (
      allProjects.find(
        (p) =>
          (p.projectCode && p.projectCode.toUpperCase() === selectedProjectCode.toUpperCase()) ||
          (p.id && p.id.toUpperCase() === selectedProjectCode.toUpperCase())
      ) || null
    );
  }, [selectedProjectCode, allProjects]);

  // Form State: Personal & Academic Details
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [sameAsMobile, setSameAsMobile] = useState(false);
  const [emailAddress, setEmailAddress] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [department, setDepartment] = useState("");
  const [projectTitle, setProjectTitle] = useState(paramTitle || "");
  const [requirements, setRequirements] = useState("");
  const [urgency, setUrgency] = useState("1-2 Weeks");

  // Keep title updated when project changes
  useEffect(() => {
    if (activeProject) {
      setProjectTitle(activeProject.title);
    }
  }, [activeProject]);

  // Update domain if matchedDomain resolves later
  useEffect(() => {
    if (matchedDomain && !selectedDomainCode) {
      setSelectedDomainCode(matchedDomain.code);
    }
  }, [matchedDomain, selectedDomainCode]);

  // Update project if preselectedProject resolves
  useEffect(() => {
    if (preselectedProject) {
      setSelectedDomainCode(preselectedProject.domainCode || "");
      setSelectedProjectCode(preselectedProject.projectCode || preselectedProject.id);
      setProjectTitle(preselectedProject.title);
      setIsPrefilledProject(true);
    }
  }, [preselectedProject]);

  // Honeypot & Bot Protection
  const [honeypot, setHoneypot] = useState("");
  const [honeypotCompany, setHoneypotCompany] = useState("");
  const [renderedAt, setRenderedAt] = useState<number>(0);

  // Submission State
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    enquiryId: string;
    name: string;
    domainName: string;
    domainCode: string;
    projectCode?: string;
    projectTitle?: string;
    enquiryType: "Project Specific" | "General Domain";
    whatsappNumber: string;
    createdAt: string;
  } | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  useEffect(() => {
    setRenderedAt(Date.now());
  }, []);

  const handleSameAsMobileToggle = (checked: boolean) => {
    setSameAsMobile(checked);
    if (checked) {
      setWhatsappNumber(mobileNumber);
    }
  };

  const handleMobileChange = (val: string) => {
    setMobileNumber(val);
    if (sameAsMobile) {
      setWhatsappNumber(val);
    }
  };

  const handleCopyId = () => {
    if (successData?.enquiryId) {
      navigator.clipboard.writeText(successData.enquiryId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const enquiryType: "Project Specific" | "General Domain" = selectedProjectCode
    ? "Project Specific"
    : "General Domain";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const nameTrimmed = fullName.trim();
    if (!nameTrimmed || nameTrimmed.length < 2) {
      setErrorMessage("Please enter your full name (at least 2 characters).");
      return;
    }

    const cleanMobile = mobileNumber.replace(/\D/g, "");
    if (!cleanMobile || cleanMobile.length < 8 || cleanMobile.length > 16) {
      setErrorMessage("Please enter a valid Mobile Number (8 to 16 digits).");
      return;
    }

    const cleanWa = (sameAsMobile ? mobileNumber : whatsappNumber).replace(/\D/g, "");
    if (!cleanWa || cleanWa.length < 8 || cleanWa.length > 16) {
      setErrorMessage("Please enter a valid WhatsApp Number (8 to 16 digits).");
      return;
    }

    const emailTrimmed = emailAddress.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed || !emailRegex.test(emailTrimmed)) {
      setErrorMessage("Please enter a valid email address (e.g. student@college.edu).");
      return;
    }

    const collegeTrimmed = collegeName.trim();
    if (!collegeTrimmed || collegeTrimmed.length < 2) {
      setErrorMessage("Please enter your college / university name.");
      return;
    }

    const deptTrimmed = department.trim();
    if (!deptTrimmed || deptTrimmed.length < 2) {
      setErrorMessage("Please enter your academic department / branch.");
      return;
    }

    if (!selectedDomainCode || !activeDomain) {
      setErrorMessage("Please select one of the 16 technical domains.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "Project Enquiry",
          enquiryType,
          name: nameTrimmed,
          mobileNumber: cleanMobile,
          whatsappNumber: cleanWa,
          email: emailTrimmed,
          college: collegeTrimmed,
          department: deptTrimmed,
          domainName: activeDomain.name,
          domainCode: activeDomain.code,
          projectDomain: activeDomain.name,
          projectCode: selectedProjectCode || undefined,
          projectTitle: projectTitle.trim() || (selectedProjectCode ? `${selectedProjectCode} Project` : `${activeDomain.name} Domain Consultation`),
          requirement: requirements.trim() || undefined,
          urgency,
          website: honeypot,
          company_hp: honeypotCompany,
          _f_rendered_at: renderedAt,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error || "Failed to submit project enquiry. Please check your details and try again.");
        setSubmitting(false);
        return;
      }

      setSuccessData({
        enquiryId: result.data.id,
        name: nameTrimmed,
        domainName: activeDomain.name,
        domainCode: activeDomain.code,
        projectCode: selectedProjectCode || undefined,
        projectTitle: projectTitle.trim() || undefined,
        enquiryType,
        whatsappNumber: cleanWa,
        createdAt: result.data.createdAt,
      });

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#315C3D", "#497A52", "#DCE8D9", "#202820"],
        });
      } catch (err) {}
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMessage("Network error submitting enquiry. Please check your connection or reach us on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E7] text-[#202820] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#667064]">
          <Link href="/" className="hover:text-[#315C3D] transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/projects" className="hover:text-[#315C3D] transition-colors">Projects</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#315C3D] font-bold">Project Enquiry</span>
        </div>

        {/* Header Hero Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCE8D9] border border-[#DDDCCF] text-xs font-bold text-[#315C3D] font-mono">
              <ClipboardList className="w-3.5 h-3.5 text-[#315C3D]" />
              <span>AntiMatrix Academic Consultation • Direct Internal Desk</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-[#202820] tracking-tight">
              Project <span className="text-[#315C3D]">Enquiry</span>
            </h1>

            <p className="text-xs sm:text-sm text-[#667064] leading-relaxed">
              Submit your engineering project requirements directly into the AntiMatrix technical workspace. 
              Our senior academic coordinator will review your syllabus and contact you directly on WhatsApp within 2 hours.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-semibold text-[#202820]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#315C3D]" />
                16 Approved Technical Domains
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#315C3D]" />
                Zero Google Forms • 100% Internal
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#315C3D]" />
                IEEE Base Papers &amp; Full Code
              </span>
            </div>
          </div>
        </div>

        {/* Success Confirmation State */}
        {successData ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-[#FFFFFF] border border-[#315C3D]/30 shadow-lg space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-3xl bg-[#DCE8D9] border border-[#315C3D]/40 text-[#315C3D] flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#315C3D]">
                Enquiry Successfully Registered
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-[#202820]">
                Thank You, {successData.name}!
              </h2>
              <p className="text-xs sm:text-sm text-[#667064] max-w-xl mx-auto">
                Your project consultation has been received and logged directly into the AntiMatrix database. 
                Our academic coordinator will reach out to your WhatsApp shortly.
              </p>
            </div>

            {/* Generated Unique Enquiry ID Badge */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#F5F1E7] border border-[#DDDCCF] max-w-lg mx-auto space-y-3">
              <span className="text-[11px] font-mono text-[#667064] uppercase block font-bold">
                Your Unique Project Enquiry Reference ID:
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="text-xl sm:text-2xl font-mono font-black text-[#315C3D] tracking-wide">
                  {successData.enquiryId}
                </span>
                <button
                  onClick={handleCopyId}
                  className="p-2 rounded-xl bg-[#FFFFFF] hover:bg-[#EEE9DC] border border-[#DDDCCF] text-[#315C3D] text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 shadow-xs"
                  title="Copy Reference ID"
                >
                  {copiedId ? <Check className="w-4 h-4 text-[#315C3D]" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId ? "Copied" : "Copy"}</span>
                </button>
              </div>

              {/* Enquiry Summary Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-[#DCE8D9] text-[#315C3D] font-mono font-bold">
                  {successData.enquiryType}
                </span>
                <span className="px-2.5 py-1 rounded-md bg-[#FFFFFF] border border-[#DDDCCF] font-mono font-bold text-[#202820]">
                  {successData.domainName} ({successData.domainCode})
                </span>
                {successData.projectCode && (
                  <span className="px-2.5 py-1 rounded-md bg-[#315C3D] text-white font-mono font-bold">
                    Code: {successData.projectCode}
                  </span>
                )}
              </div>
            </div>

            {/* Next Steps CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/91${successData.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                  `Hello AntiMatrix, I have submitted Project Enquiry [${successData.enquiryId}] for ${
                    successData.projectCode ? `Project [${successData.projectCode}] in ` : ""
                  }${successData.domainName} (${successData.domainCode}). Please share details.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Open WhatsApp Chat Directly</span>
              </a>

              <Link
                href="/projects"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#EEE9DC] hover:bg-[#DCE8D9] text-[#315C3D] border border-[#DDDCCF] text-xs font-bold transition-colors flex items-center justify-center gap-2"
              >
                <Layers className="w-4 h-4" />
                <span>Explore Technical Domains</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Main Project Enquiry Form */
          <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#DDDCCF] shadow-sm space-y-8">
            {/* Error Message Alert */}
            {errorMessage && (
              <div className="p-4 rounded-2xl bg-[#EEE9DC] border border-[#315C3D]/40 text-[#202820] text-xs flex items-start gap-3 animate-in fade-in">
                <AlertCircle className="w-5 h-5 text-[#315C3D] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold block">Submission Error</span>
                  <p>{errorMessage}</p>
                </div>
              </div>
            )}

            {/* SECTION 1: TECHNICAL DOMAIN & PROJECT SELECTION */}
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-[#DDDCCF]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-[#DCE8D9] text-[#315C3D] flex items-center justify-center text-xs font-bold font-mono">
                    1
                  </div>
                  <h2 className="text-base font-bold text-[#202820] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#315C3D]" />
                    <span>Technical Domain &amp; Project Selection</span>
                  </h2>
                </div>

                {/* Enquiry Type Badge */}
                <span
                  className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                    selectedProjectCode
                      ? "bg-[#DCE8D9] text-[#315C3D] border-[#315C3D]/30"
                      : "bg-[#EEE9DC] text-[#202820] border-[#DDDCCF]"
                  }`}
                >
                  Type: {enquiryType}
                </span>
              </div>

              {/* When a specific project is prefilled from Screen 3 */}
              {isPrefilledProject && activeProject ? (
                <div className="p-5 rounded-2xl bg-[#DCE8D9]/40 border border-[#315C3D]/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#315C3D]">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Project-Specific Enquiry (Locked)</span>
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setIsPrefilledProject(false);
                        setSelectedProjectCode("");
                      }}
                      className="text-[11px] font-semibold text-[#667064] hover:text-[#315C3D] flex items-center gap-1 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Change Domain / Project</span>
                    </button>
                  </div>

                  {/* Read-Only Prefilled Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#DDDCCF]">
                      <span className="text-[10px] font-mono uppercase text-[#667064] block">Technical Domain</span>
                      <strong className="text-[#202820] font-bold block truncate">{activeDomain?.name || activeProject.category}</strong>
                      <span className="text-[10px] font-mono text-[#315C3D] font-bold">Code: {activeDomain?.code || activeProject.domainCode}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#DDDCCF]">
                      <span className="text-[10px] font-mono uppercase text-[#667064] block">Project Code</span>
                      <strong className="text-[#315C3D] font-mono font-black text-sm block">{selectedProjectCode}</strong>
                      <span className="text-[10px] text-[#667064]">Verified IEEE Project</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#FFFFFF] border border-[#DDDCCF]">
                      <span className="text-[10px] font-mono uppercase text-[#667064] block">Project Title</span>
                      <strong className="text-[#202820] font-bold block line-clamp-1">{activeProject.title}</strong>
                      <span className="text-[10px] text-[#667064] font-mono">{activeProject.level || "UG Final Year"}</span>
                    </div>
                  </div>
                </div>
              ) : (
                /* Interactive Domain & Optional Project Selection */
                <div className="space-y-4 text-xs">
                  {/* Technical Domain Dropdown (Official 16 Domains) */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#202820] flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <span>Select Technical Domain</span>
                        <span className="text-[#315C3D]">*</span>
                      </span>
                      <span className="text-[11px] font-mono text-[#667064]">16 Official Domains</span>
                    </label>
                    <select
                      required
                      value={selectedDomainCode}
                      onChange={(e) => {
                        const newCode = e.target.value;
                        setSelectedDomainCode(newCode);
                        setSelectedProjectCode("");
                        setProjectTitle("");
                      }}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] font-medium focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors cursor-pointer"
                    >
                      <option value="">-- Choose from 16 Official Technical Domains --</option>
                      {TECHNICAL_DOMAINS.map((dom) => (
                        <option key={dom.code} value={dom.code}>
                          {dom.sno}. {dom.name} ({dom.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Optional Project Selection under the selected domain */}
                  {selectedDomainCode && (
                    <div className="space-y-1.5 p-4 rounded-2xl bg-[#F5F1E7] border border-[#DDDCCF] animate-in fade-in">
                      <label className="font-bold text-[#202820] flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Tag className="w-3.5 h-3.5 text-[#315C3D]" />
                          <span>Select Specific Project Under {activeDomain?.name} (Optional)</span>
                        </span>
                        <span className="text-[11px] font-mono text-[#667064]">
                          {domainProjects.length} {domainProjects.length === 1 ? "Project" : "Projects"} in Domain
                        </span>
                      </label>

                      <select
                        value={selectedProjectCode}
                        onChange={(e) => {
                          const pCode = e.target.value;
                          setSelectedProjectCode(pCode);
                          const proj = allProjects.find(
                            (p) => (p.projectCode && p.projectCode.toUpperCase() === pCode.toUpperCase()) || p.id === pCode
                          );
                          if (proj) {
                            setProjectTitle(proj.title);
                          } else {
                            setProjectTitle("");
                          }
                        }}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFFFFF] border border-[#DDDCCF] text-xs text-[#202820] font-medium focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors cursor-pointer"
                      >
                        <option value="">
                          — General Domain Enquiry (No specific project selected) —
                        </option>
                        {domainProjects.map((proj) => (
                          <option key={proj.id} value={proj.projectCode || proj.id}>
                            [{proj.projectCode || proj.id}] {proj.title}
                          </option>
                        ))}
                      </select>

                      <p className="text-[11px] text-[#667064] pt-1">
                        {selectedProjectCode ? (
                          <span className="text-[#315C3D] font-semibold">
                            ✓ Specific Project Selected: [{selectedProjectCode}] {activeProject?.title}
                          </span>
                        ) : (
                          <span>
                            Tip: Leave unselected if you want general topic guidance and custom title recommendations in {activeDomain?.name}.
                          </span>
                        )}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* SECTION 2: PERSONAL INFORMATION */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#DDDCCF]">
                <div className="w-7 h-7 rounded-lg bg-[#DCE8D9] text-[#315C3D] flex items-center justify-center text-xs font-bold font-mono">
                  2
                </div>
                <h2 className="text-base font-bold text-[#202820] flex items-center gap-2">
                  <User className="w-4 h-4 text-[#315C3D]" />
                  <span>Personal Information</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Full Name */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-bold text-[#202820] flex items-center gap-1">
                    <span>Full Name</span>
                    <span className="text-[#315C3D]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#667064] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aravind Swaminathan"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors"
                    />
                  </div>
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#202820] flex items-center gap-1">
                    <span>Mobile Number</span>
                    <span className="text-[#315C3D]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#667064] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9840123456"
                      value={mobileNumber}
                      onChange={(e) => handleMobileChange(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors"
                    />
                  </div>
                </div>

                {/* WhatsApp Number with Checkbox */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-[#202820] flex items-center gap-1">
                      <span>WhatsApp Number</span>
                      <span className="text-[#315C3D]">*</span>
                    </label>
                    <label className="flex items-center gap-1.5 text-[11px] text-[#315C3D] font-semibold cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={sameAsMobile}
                        onChange={(e) => handleSameAsMobileToggle(e.target.checked)}
                        className="rounded border-[#DDDCCF] text-[#315C3D] focus:ring-[#315C3D]"
                      />
                      <span>Same as Mobile Number</span>
                    </label>
                  </div>
                  <div className="relative">
                    <MessageCircle className="w-4 h-4 text-[#667064] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9840123456"
                      value={sameAsMobile ? mobileNumber : whatsappNumber}
                      disabled={sameAsMobile}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors ${
                        sameAsMobile ? "bg-[#EEE9DC] border-[#DDDCCF] opacity-75 cursor-not-allowed" : "bg-[#F5F1E7] border-[#DDDCCF]"
                      }`}
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="font-bold text-[#202820] flex items-center gap-1">
                    <span>Email Address</span>
                    <span className="text-[#315C3D]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#667064] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. student@college.edu or name@gmail.com"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: ACADEMIC INFORMATION */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#DDDCCF]">
                <div className="w-7 h-7 rounded-lg bg-[#DCE8D9] text-[#315C3D] flex items-center justify-center text-xs font-bold font-mono">
                  3
                </div>
                <h2 className="text-base font-bold text-[#202820] flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#315C3D]" />
                  <span>Academic Information</span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* College Name */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#202820] flex items-center gap-1">
                    <span>College Name</span>
                    <span className="text-[#315C3D]">*</span>
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-[#667064] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. PSG Tech / SSN / CIT / VIT"
                      value={collegeName}
                      onChange={(e) => setCollegeName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors"
                    />
                  </div>
                </div>

                {/* Department */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#202820] flex items-center gap-1">
                    <span>Department / Branch</span>
                    <span className="text-[#315C3D]">*</span>
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 text-[#667064] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. CSE, IT, AI & Data Science, ECE"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 4: REQUIREMENTS & TIMELINE */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-[#DDDCCF]">
                <div className="w-7 h-7 rounded-lg bg-[#DCE8D9] text-[#315C3D] flex items-center justify-center text-xs font-bold font-mono">
                  4
                </div>
                <h2 className="text-base font-bold text-[#202820] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#315C3D]" />
                  <span>Requirements &amp; Review Schedule</span>
                </h2>
              </div>

              <div className="space-y-4 text-xs">
                {/* Specific Requirements / Message */}
                <div className="space-y-1.5">
                  <label className="font-bold text-[#202820] flex items-center justify-between">
                    <span>Specific Project Requirements &amp; Deliverables</span>
                    <span className="text-[11px] font-mono text-[#667064]">Base paper, PPT, Viva, Demo</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us any specific requirements (e.g. IEEE base paper needed, PyTorch codebase, PPT presentation, 70-page report, upcoming review deadline)..."
                    value={requirements}
                    onChange={(e) => setRequirements(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#F5F1E7] border border-[#DDDCCF] text-xs text-[#202820] placeholder-[#667064] focus:outline-none focus:border-[#315C3D] focus:ring-1 focus:ring-[#315C3D] transition-colors resize-none"
                  />
                </div>

                {/* Urgency / Timeline Radio Selector */}
                <div className="space-y-2">
                  <label className="font-bold text-[#202820] flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#315C3D]" />
                    <span>Project Urgency / Submission Timeline</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { label: "Immediate (1-3 days)", value: "Immediate (1-3 days)" },
                      { label: "1-2 Weeks", value: "1-2 Weeks" },
                      { label: "1 Month", value: "1 Month" },
                      { label: "Flexible", value: "Flexible" },
                    ].map((opt) => (
                      <label
                        key={opt.value}
                        className={`p-2.5 rounded-xl border text-center cursor-pointer transition-all ${
                          urgency === opt.value
                            ? "bg-[#DCE8D9] border-[#315C3D] text-[#315C3D] font-bold shadow-xs"
                            : "bg-[#F5F1E7] border-[#DDDCCF] text-[#202820] hover:bg-[#EEE9DC]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="urgency"
                          value={opt.value}
                          checked={urgency === opt.value}
                          onChange={(e) => setUrgency(e.target.value)}
                          className="sr-only"
                        />
                        <span className="text-xs">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Hidden Honeypots for Bot Trapping */}
            <div aria-hidden="true" className="hidden" tabIndex={-1}>
              <input
                type="text"
                name="website"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                autoComplete="off"
                tabIndex={-1}
              />
              <input
                type="text"
                name="company_hp"
                value={honeypotCompany}
                onChange={(e) => setHoneypotCompany(e.target.value)}
                autoComplete="off"
                tabIndex={-1}
              />
            </div>

            {/* Submit Action Button */}
            <div className="pt-4 border-t border-[#DDDCCF]">
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#315C3D] hover:bg-[#254930] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Registering Enquiry in AntiMatrix Database...</span>
                  </>
                ) : (
                  <>
                    <ClipboardList className="w-4 h-4" />
                    <span>
                      Submit {selectedProjectCode ? `Project Enquiry [${selectedProjectCode}]` : activeDomain ? `${activeDomain.name} Enquiry` : "Enquiry"}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-[#667064] mt-2.5">
                🔒 Submissions are logged securely into our internal database. No Google Forms or external form providers used.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ProjectEnquiryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F1E7] pt-32 text-center text-xs font-mono">Loading AntiMatrix Technical Desk...</div>}>
      <ProjectEnquiryForm />
    </Suspense>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/common/SectionHeader";
import {
  Briefcase,
  Sparkles,
  CheckCircle2,
  Send,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Laptop,
  GraduationCap,
  Award,
  ChevronRight,
  ExternalLink,
  Users,
  Code2,
  FileText,
  Cpu
} from "lucide-react";
import {
  getWhatsAppUrl,
  WHATSAPP_NUMBER,
  WHATSAPP_DISPLAY,
  CONTACT_EMAIL,
  CONTACT_EMAIL_MAILTO
} from "@/lib/whatsapp";
import CtaBanner from "@/components/home/CtaBanner";

interface JobRole {
  id: string;
  title: string;
  department: string;
  type: string;
  location: string;
  icon: React.ComponentType<{ className?: string }>;
  overview: string;
  skills: string[];
  responsibilities: string[];
}

export default function CareersPage() {
  const [selectedRole, setSelectedRole] = useState<string>("ai-ml-mentor");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Senior AI/ML & Deep Learning Mentor",
    experience: "1-3 Years",
    portfolioUrl: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const jobRoles: JobRole[] = [
    {
      id: "ai-ml-mentor",
      title: "Senior AI/ML & Deep Learning Mentor",
      department: "Artificial Intelligence & Research",
      type: "Full-Time / Part-Time",
      location: "Remote / Chennai",
      icon: Cpu,
      overview:
        "Guide final-year engineering students and research scholars through state-of-the-art AI architectures, dataset curation, model training, and viva defense.",
      skills: ["PyTorch", "TensorFlow", "YOLOv10", "Transformers", "Computer Vision", "NLP", "Python"],
      responsibilities: [
        "Guide students in debugging machine learning models, loss convergence, and GPU pipelines.",
        "Assist in implementing custom neural architectures (GNNs, LLM fine-tuning, object detection).",
        "Conduct 1-on-1 mock viva sessions and explain mathematical intuitions clearly.",
        "Review project documentation and IEEE conference paper submissions for technical accuracy."
      ]
    },
    {
      id: "fullstack-architect",
      title: "Full-Stack Web & Cloud Systems Engineer",
      department: "Software Engineering",
      type: "Full-Time / Part-Time",
      location: "Remote / Chennai",
      icon: Code2,
      overview:
        "Architect robust full-stack applications and guide engineering teams on modern cloud architectures, API security, and database optimization.",
      skills: ["Next.js", "React", "Node.js", "Django", "Spring Boot", "PostgreSQL", "Docker"],
      responsibilities: [
        "Develop and mentor on scalable web systems featuring clean MVC / microservices patterns.",
        "Help students configure PostgreSQL schemas, JWT authentication, and REST/GraphQL APIs.",
        "Provide code reviews, troubleshooting support, and deployment guidance on cloud platforms.",
        "Prepare students to explain system architecture and design patterns during external reviews."
      ]
    },
    {
      id: "research-specialist",
      title: "Academic Research & IEEE Documentation Specialist",
      department: "Research & Publications",
      type: "Flexible / Part-Time",
      location: "Remote",
      icon: FileText,
      overview:
        "Craft standard IEEE / Springer manuscripts, university thesis reports, and plagiarism-free academic documentation for final year deliverables.",
      skills: ["IEEE Format", "LaTeX", "Technical Writing", "Plagiarism Auditing", "Turnitin", "Literature Review"],
      responsibilities: [
        "Structure high-scoring project reports adhering strictly to Anna University, SRM, and VIT guidelines.",
        "Format conference papers, write detailed literature surveys, and draft research methodology sections.",
        "Audit deliverables for zero plagiarism and ensure proper scientific citations.",
        "Design professional presentation decks (PPT) for Phase 1 and Phase 2 project reviews."
      ]
    },
    {
      id: "iot-embedded-engineer",
      title: "Embedded Systems, IoT & MATLAB Associate",
      department: "Hardware & Edge Computing",
      type: "Full-Time / Part-Time",
      location: "Chennai / Hybrid",
      icon: Laptop,
      overview:
        "Design and test IoT hardware prototypes, sensor interfacing, microcontroller firmware, and MATLAB/Simulink simulations for core engineering disciplines.",
      skills: ["Arduino", "ESP32", "Raspberry Pi", "MATLAB / Simulink", "MQTT", "Sensor Protocols", "Embedded C"],
      responsibilities: [
        "Assemble and test physical hardware kits, sensor connections, and IoT telemetry dashboards.",
        "Implement microcontroller firmware and debug hardware-to-cloud communication.",
        "Develop MATLAB/Simulink simulation models for power systems, image processing, and signal analysis.",
        "Conduct live hardware demonstrations and guide students through circuit troubleshooting."
      ]
    }
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*New UPWORKS Career / Mentorship Application*%0A%0A` +
      `*Full Name:* ${encodeURIComponent(formData.name)}%0A` +
      `*Email:* ${encodeURIComponent(formData.email)}%0A` +
      `*Phone/WhatsApp:* ${encodeURIComponent(formData.phone)}%0A` +
      `*Role Applied:* ${encodeURIComponent(formData.role)}%0A` +
      `*Experience:* ${encodeURIComponent(formData.experience)}%0A` +
      `*Portfolio/LinkedIn:* ${encodeURIComponent(formData.portfolioUrl || "N/A")}%0A` +
      `*Note:* ${encodeURIComponent(formData.message || "Ready to mentor students!")}`;

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, "_blank");
    setSubmitted(true);
  };

  const activeRoleData = jobRoles.find((r) => r.id === selectedRole) || jobRoles[0];

  return (
    <div className="pt-32 sm:pt-36 pb-20 bg-[#F4F6FA] min-h-screen text-[#263750]">
      {/* Background Header */}
      <div className="relative py-16 bg-white border-b border-[#DCE2EA] mb-12 overflow-hidden">
        <div className="w-full max-w-[1780px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 relative z-10 text-center">
          <SectionHeader
            badge="Join Our Mentorship Team"
            title="Empower the Next Generation of"
            titleGradient="Engineers & Researchers"
            subtitle="Join India's premier academic project development and research guidance center. Mentor aspiring students, author high-impact IEEE papers, and build industry-standard software architectures."
          />
        </div>
      </div>

      <div className="w-full max-w-[1780px] 2xl:max-w-[1880px] mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 space-y-16">
        {/* Culture & Perks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#DCE2EA] shadow-xs hover:border-[#F58216]/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#FFF5EB] border border-[#FED7AA] flex items-center justify-center text-[#F58216] mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#101D38] mb-2">High-Impact Mentoring</h3>
            <p className="text-xs sm:text-sm text-[#5A6B82] leading-relaxed">
              Help final-year engineering students understand real architectures, write clean code, and ace viva examinations.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#DCE2EA] shadow-xs hover:border-[#F58216]/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#FFF5EB] border border-[#FED7AA] flex items-center justify-center text-[#F58216] mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#101D38] mb-2">Flexible Schedule</h3>
            <p className="text-xs sm:text-sm text-[#5A6B82] leading-relaxed">
              Take mentorship sessions, reviews, and coding sprints remotely during evenings or weekends to match your timetable.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#DCE2EA] shadow-xs hover:border-[#F58216]/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#FFF5EB] border border-[#FED7AA] flex items-center justify-center text-[#F58216] mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#101D38] mb-2">Competitive Compensation</h3>
            <p className="text-xs sm:text-sm text-[#5A6B82] leading-relaxed">
              Earn attractive project-based stipends, hourly mentorship payouts, and performance incentives on successful reviews.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#DCE2EA] shadow-xs hover:border-[#F58216]/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-[#FFF5EB] border border-[#FED7AA] flex items-center justify-center text-[#F58216] mb-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#101D38] mb-2">Modern Technology</h3>
            <p className="text-xs sm:text-sm text-[#5A6B82] leading-relaxed">
              Stay ahead by mentoring on Generative AI, PyTorch, Edge IoT, Microservices, Blockchain, and IEEE publication standards.
            </p>
          </div>
        </div>

        {/* Open Positions Section */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#DCE2EA]">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF5EB] border border-[#FED7AA] text-[#F58216] font-mono mb-2">
                <Briefcase className="w-3.5 h-3.5 text-[#F58216]" />
                <span>Current Openings</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101D38]">
                Explore Available Mentorship &amp; Engineering Roles
              </h2>
            </div>
            <p className="text-sm text-[#5A6B82] max-w-md">
              Select a position to view required technical skills, key responsibilities, and fast-track application details.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Roles Selection Tabs */}
            <div className="lg:col-span-5 space-y-3">
              {jobRoles.map((role) => {
                const isSelected = selectedRole === role.id;
                const RoleIcon = role.icon;
                return (
                  <button
                    key={role.id}
                    onClick={() => {
                      setSelectedRole(role.id);
                      setFormData((prev) => ({ ...prev, role: role.title }));
                    }}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                      isSelected
                        ? "bg-white border-[#F58216] shadow-md ring-2 ring-[#F58216]/20"
                        : "bg-white border-[#DCE2EA] hover:border-[#FED7AA] hover:bg-[#FAFBFD]"
                    }`}
                  >
                    <div
                      className={`p-3 rounded-xl shrink-0 ${
                        isSelected
                          ? "bg-[#F58216] text-white"
                          : "bg-[#F4F6FA] text-[#101D38] border border-[#DCE2EA]"
                      }`}
                    >
                      <RoleIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-base font-bold text-[#101D38] truncate">{role.title}</h4>
                        <ChevronRight
                          className={`w-4 h-4 shrink-0 transition-transform ${
                            isSelected ? "text-[#F58216] translate-x-1" : "text-[#5A6B82]"
                          }`}
                        />
                      </div>
                      <p className="text-xs text-[#5A6B82] mt-0.5">{role.department}</p>
                      <div className="flex items-center gap-3 mt-3 text-[11px] font-semibold text-[#101D38]">
                        <span className="px-2 py-0.5 rounded-md bg-[#F4F6FA] border border-[#DCE2EA]">
                          {role.type}
                        </span>
                        <span className="flex items-center gap-1 text-[#5A6B82]">
                          <MapPin className="w-3 h-3 text-[#F58216]" /> {role.location}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Role Details Panel */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-[#DCE2EA] p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DCE2EA]">
                <div>
                  <span className="text-xs font-semibold text-[#F58216] uppercase tracking-wider font-mono">
                    {activeRoleData.department}
                  </span>
                  <h3 className="text-2xl font-extrabold text-[#101D38] mt-1">{activeRoleData.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-[#5A6B82]">
                    <span className="font-semibold text-[#101D38] bg-[#FFF5EB] px-2.5 py-1 rounded-full border border-[#FED7AA]">
                      {activeRoleData.type}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#F58216]" /> {activeRoleData.location}
                    </span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    `Hello UPWORKS Team, I would like to apply for the position of "${activeRoleData.title}". Here are my details:`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#F58216] hover:bg-[#E0720F] text-white font-semibold text-sm transition-colors shadow-xs shrink-0"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Fast-Track Apply</span>
                </a>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#101D38] uppercase tracking-wider mb-2">Role Overview</h4>
                <p className="text-sm text-[#263750] leading-relaxed font-normal">
                  {activeRoleData.overview}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#101D38] uppercase tracking-wider mb-3">Key Technical Competencies</h4>
                <div className="flex flex-wrap gap-2">
                  {activeRoleData.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-[#F4F6FA] border border-[#DCE2EA] text-xs font-semibold text-[#101D38]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#101D38] uppercase tracking-wider mb-3">Responsibilities</h4>
                <ul className="space-y-2.5">
                  {activeRoleData.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#263750]">
                      <CheckCircle2 className="w-4 h-4 text-[#F58216] shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form Section */}
        <div id="apply" className="bg-white rounded-3xl border border-[#DCE2EA] p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl mx-auto">
            <div className="text-center space-y-3 mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#FFF5EB] border border-[#FED7AA] text-[#F58216] font-mono">
                <Send className="w-3.5 h-3.5 text-[#F58216]" />
                <span>Direct Application Desk</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#101D38]">
                Submit Your Mentorship Application
              </h2>
              <p className="text-sm text-[#5A6B82]">
                Fill out the form below to connect directly with our technical director via WhatsApp or email.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-[#FFF5EB] border border-[#FED7AA] text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#F58216] text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-[#101D38]">Application Initiated!</h3>
                <p className="text-sm text-[#263750] max-w-md mx-auto leading-relaxed">
                  Thank you for applying to UPWORKS. Our recruitment desk has received your information and will review your profile within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-xl bg-white border border-[#DCE2EA] text-xs font-bold text-[#101D38] hover:bg-[#FAFBFD] transition-colors"
                >
                  Submit Another Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#101D38] uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Dr. Rajesh Kumar / Priya Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-[#DCE2EA] bg-[#F4F6FA] text-sm text-[#101D38] focus:bg-white focus:outline-none focus:border-[#F58216] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#101D38] uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. mentor@domain.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#DCE2EA] bg-[#F4F6FA] text-sm text-[#101D38] focus:bg-white focus:outline-none focus:border-[#F58216] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#101D38] uppercase tracking-wider mb-2">
                      WhatsApp / Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-[#DCE2EA] bg-[#F4F6FA] text-sm text-[#101D38] focus:bg-white focus:outline-none focus:border-[#F58216] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#101D38] uppercase tracking-wider mb-2">
                      Target Role *
                    </label>
                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#DCE2EA] bg-[#F4F6FA] text-sm text-[#101D38] focus:bg-white focus:outline-none focus:border-[#F58216] transition-colors"
                    >
                      {jobRoles.map((role) => (
                        <option key={role.id} value={role.title}>
                          {role.title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#101D38] uppercase tracking-wider mb-2">
                      Experience Level *
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#DCE2EA] bg-[#F4F6FA] text-sm text-[#101D38] focus:bg-white focus:outline-none focus:border-[#F58216] transition-colors"
                    >
                      <option value="College Final Year / Fresher">College Final Year / Fresher with High Skills</option>
                      <option value="1-3 Years">1 - 3 Years Industry / Research Experience</option>
                      <option value="3-5 Years">3 - 5 Years Senior Experience</option>
                      <option value="5+ Years">5+ Years Principal / PhD Research Guide</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#101D38] uppercase tracking-wider mb-2">
                      GitHub / LinkedIn / Portfolio URL
                    </label>
                    <input
                      type="url"
                      name="portfolioUrl"
                      value={formData.portfolioUrl}
                      onChange={handleInputChange}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full px-4 py-3 rounded-xl border border-[#DCE2EA] bg-[#F4F6FA] text-sm text-[#101D38] focus:bg-white focus:outline-none focus:border-[#F58216] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#101D38] uppercase tracking-wider mb-2">
                    Brief Summary / Tech Stack You Excel In
                  </label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about the domains, frameworks, or academic topics you are confident mentoring students in..."
                    className="w-full px-4 py-3 rounded-xl border border-[#DCE2EA] bg-[#F4F6FA] text-sm text-[#101D38] focus:bg-white focus:outline-none focus:border-[#F58216] transition-colors resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#F58216] hover:bg-[#E0720F] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Application via WhatsApp</span>
                  </button>

                  <a
                    href={`${CONTACT_EMAIL_MAILTO}?subject=${encodeURIComponent(
                      `Application for ${formData.role} - UPWORKS Careers`
                    )}`}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-[#101D38] text-[#101D38] hover:bg-[#101D38] hover:text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Or Email Your Resume Directly</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Global CTA Banner */}
        <CtaBanner />
      </div>
    </div>
  );
}

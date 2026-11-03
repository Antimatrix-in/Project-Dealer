import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import ConsultationModal from "@/components/common/ConsultationModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AntiMatrix - Transform Your Ideas Into Real-World Projects",
  description:
    "AntiMatrix helps engineering and computer science students complete real-world projects with expert guidance, documentation support, PPT preparation, project customization, and technical assistance.",
  keywords: [
    "Final Year Projects",
    "Engineering Projects",
    "IEEE Projects 2025 2026",
    "AI Machine Learning Projects",
    "Python Projects",
    "Java Projects",
    "Web Development Projects",
    "Mobile App Development Projects",
    "Cloud Computing Projects",
    "Cyber Security Projects",
    "Data Analytics Projects",
    "Project Customization",
    "Documentation Support",
    "PPT Preparation",
    "Viva Guidance",
    "Technical Support"
  ],
  authors: [{ name: "AntiMatrix Technologies" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F5F1E7] text-[#202820] selection:bg-[#315C3D] selection:text-[#FFFFFF] font-sans">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
        <ConsultationModal />
      </body>
    </html>
  );
}

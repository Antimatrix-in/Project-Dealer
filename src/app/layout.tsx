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
  metadataBase: new URL("https://upworkprojectcenter.com"),
  title: {
    default: "Upwork Project Center - Transform Your Ideas Into Real-World Projects",
    template: "%s | Upwork Project Center",
  },
  description:
    "Upwork Project Center helps engineering and computer science students complete real-world projects with expert guidance, documentation support, PPT preparation, project customization, and technical assistance.",
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
  authors: [{ name: "Upwork Project Center" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Upwork Project Center",
    title: "Upwork Project Center - Transform Your Ideas Into Real-World Projects",
    description:
      "Upwork Project Center helps engineering and computer science students complete real-world projects with expert guidance, documentation support, PPT preparation, project customization, and technical assistance.",
    images: [
      {
        url: "/images/upwork-project-center-logo.png",
        width: 1200,
        height: 630,
        alt: "Upwork Project Center",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Upwork Project Center - Transform Your Ideas Into Real-World Projects",
    description:
      "Upwork Project Center helps engineering and computer science students complete real-world projects with expert guidance, documentation support, PPT preparation, and viva defense.",
    images: ["/images/upwork-project-center-logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "48x48" },
      { url: "/images/upwork-project-center-icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/images/upwork-project-center-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
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
      <body className="min-h-full flex flex-col bg-[#F5F1E7] text-[#1F2A22] selection:bg-[#285A3B] selection:text-[#FFFFFF] font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Upwork Project Center",
              url: "https://upworkprojectcenter.com",
              logo: "https://upworkprojectcenter.com/images/upwork-project-center-logo.png",
              description:
                "India's premier engineering research and final year project guidance center offering IEEE standard implementations and viva defense mentoring.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Chennai",
                addressRegion: "Tamil Nadu",
                addressCountry: "IN"
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-9159514326",
                contactType: "customer service"
              }
            })
          }}
        />
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

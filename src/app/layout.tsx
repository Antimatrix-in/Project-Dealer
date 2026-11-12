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
    default: "UPWORKS – Project Development Services",
    template: "%s | UPWORKS",
  },
  description:
    "UPWORKS provides industry-grade academic project development, complete documentation, base paper reviews, and viva defense guidance for engineering students.",
  keywords: [
    "UPWORKS",
    "Project Development Services",
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
  authors: [{ name: "UPWORKS" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "UPWORKS",
    title: "UPWORKS – Project Development Services",
    description:
      "UPWORKS provides industry-grade academic project development, complete documentation, base paper reviews, and viva defense guidance for engineering students.",
    images: [
      {
        url: "/images/upworks-logo.png",
        width: 1024,
        height: 341,
        alt: "UPWORKS – Project Development Services Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "UPWORKS – Project Development Services",
    description:
      "UPWORKS provides industry-grade academic project development, complete documentation, base paper reviews, and viva defense guidance for engineering students.",
    images: ["/images/upworks-logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "48x48" },
      { url: "/images/upworks-icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/images/upworks-icon.png", sizes: "180x180", type: "image/png" },
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
      <body className="min-h-full flex flex-col bg-[#F4F6FA] text-[#263750] selection:bg-[#F58216] selection:text-[#FFFFFF] font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "UPWORKS",
              alternateName: "UPWORKS – Project Development Services",
              url: "https://upworkprojectcenter.com",
              logo: "https://upworkprojectcenter.com/images/upworks-logo.png",
              description:
                "Premier engineering research and academic project development center offering IEEE standard implementations and viva defense mentoring.",
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

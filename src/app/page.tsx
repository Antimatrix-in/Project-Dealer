import React from "react";
import Hero from "@/components/home/Hero";
import StatisticsSection from "@/components/home/StatisticsSection";
import CategoryGrid from "@/components/home/CategoryGrid";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ProcessSection from "@/components/home/ProcessSection";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ServicesSection from "@/components/home/ServicesSection";
import StudentReviewsSection from "@/components/home/TestimonialSlider";
import FaqSection from "@/components/home/FaqSection";
import CtaBanner from "@/components/home/CtaBanner";

export const metadata = {
  title: "AntiMatrix - Transform Your Ideas Into Real-World Projects",
  description:
    "AntiMatrix provides premier project guidance in AI, Machine Learning, Deep Learning, Python, Java, Web Development, Mobile Applications, Cloud Computing, Cyber Security, and Data Analytics.",
};

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section (Left: Headline, Subtitle, Checkmarks, CTAs; Right: Laptop Mockup with Live AI Project Dashboard) */}
      <Hero />

      {/* 2. Statistics Section (500+ Projects, 1200+ Students, 25+ Domains, 99.8% Satisfaction) */}
      <StatisticsSection />

      {/* 3. Popular Project Categories (10 Glassmorphism Cards) */}
      <CategoryGrid />

      {/* 4. Why Choose AntiMatrix (6 Premium Cards) */}
      <WhyChooseUs />

      {/* 5. Our Process (5 Modern Steps) */}
      <ProcessSection />

      {/* 6. Featured Projects (Showcase Cards with Visual Headers, Tech Stack, Details) */}
      <FeaturedProjects />

      {/* 7. Services (6 Core Deliverables) */}
      <ServicesSection />

      {/* 8. Student Reviews (Modern Testimonial Carousel) */}
      <StudentReviewsSection />

      {/* 9. FAQ Section */}
      <FaqSection />

      {/* 10. Contact CTA ("Need Help With Your Project?", WhatsApp Now, Contact Us) */}
      <CtaBanner />
    </div>
  );
}

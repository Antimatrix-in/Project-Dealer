import React from "react";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleGradient?: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  titleGradient,
  subtitle,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`max-w-3xl ${
        align === "center" ? "mx-auto text-center" : "text-left"
      } ${className}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#FFF5EB] border border-[#F58216]/25 text-[#F58216] mb-4 shadow-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F58216] animate-pulse" />
          {badge}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#101D38] leading-tight">
        {title}{" "}
        {titleGradient && (
          <span className="text-[#F58216] block sm:inline">
            {titleGradient}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-[#263750] leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}

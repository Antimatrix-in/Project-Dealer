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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-[#FFF1E8] border border-[#FF6B00]/25 text-[#FF6B00] mb-4 shadow-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
          {badge}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#101828] leading-tight">
        {title}{" "}
        {titleGradient && (
          <span className="text-gradient-orange-red block sm:inline">
            {titleGradient}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-[#526581] leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}

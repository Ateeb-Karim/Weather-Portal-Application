import React from "react";

export default function StateCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 text-white/80 bg-white/5 border border-white/10 rounded-2xl px-3 py-3 min-w-18 transition-transform hover:scale-105 hover:bg-white/10">
      {icon}
      <span className="text-sm font-semibold">{value}</span>
      <span className="text-[11px] text-white/50 text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

import SectionTitle from "@/components/ui/section-title";
import React from "react";

export default function Title({ children }: { children: React.ReactNode }) {
  return <SectionTitle className="text-2xl">{children}</SectionTitle>;
}

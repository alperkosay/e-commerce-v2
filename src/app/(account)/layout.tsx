import React from "react";
import Aside from "./_components/aside/aside";

export default function AccountPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex container py-6 gap-4">
      <Aside />
      <main className="flex-1 min-h-screen">{children}</main>
    </div>
  );
}

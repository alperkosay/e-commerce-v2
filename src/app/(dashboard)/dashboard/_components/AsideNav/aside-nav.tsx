"use client";
import { useSession } from "next-auth/react";
import React from "react";

export default function AsideNav() {
  const { data, status } = useSession();

  return (
    <aside>
      <div className="h-screen border w-60"></div>
    </aside>
  );
}

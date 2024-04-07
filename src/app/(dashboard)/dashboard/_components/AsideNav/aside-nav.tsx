"use client";
import { getServerAuthSession } from "@/server/auth";
import React from "react";

export default async function AsideNav() {
  const session = await getServerAuthSession();
  return (
    <aside>
      <div className="h-screen w-60 border">{session?.user.name}</div>
    </aside>
  );
}

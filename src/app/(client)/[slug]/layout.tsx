import React from "react";
import dynamic from "next/dynamic";
import { SidebarSkeleton } from "@/components/Aside/Sidebar";

const Sidebar = dynamic(() => import("@/components/Aside/Sidebar"), {
    ssr: false,
    loading: SidebarSkeleton,
});

export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex container">
                <Sidebar />

                <div className="flex-1">{children}</div>
            </div>
        </>
    );
}

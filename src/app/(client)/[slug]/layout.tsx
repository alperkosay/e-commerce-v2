import Sidebar from "@/components/Aside/Sidebar";
import React from "react";

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

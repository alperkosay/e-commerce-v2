"use client";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";

type ComponentProps = {
    children?: React.ReactNode;
    className?: string;
};
const SectionTitle = ({ children, className, ...props }: ComponentProps) => {
    const sectionTitleRef = useRef<HTMLDivElement>(null);

    return (
        <div className="flex justify-start mb-4">
            <div
                ref={sectionTitleRef}
                className={cn("text-3xl font-bold w-max", className)}
                {...props}
            >
                {children}
            </div>
        </div>
    );
};

export default SectionTitle;

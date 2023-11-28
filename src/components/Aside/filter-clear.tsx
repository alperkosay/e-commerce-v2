"use client";
import React from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function FilterClear() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <Button
            className="w-full"
            onClick={() => {
                router.replace(pathname);
            }}
        >
            Filtreleri Temizle
        </Button>
    );
}

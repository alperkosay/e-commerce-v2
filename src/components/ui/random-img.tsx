import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default function RandomImage({
    className,
    height = 320,
    randomMax = 200,
    width = 300,
}: {
    width?: number;
    height?: number;
    className?: string;
    randomMax?: number;
}) {
    return (
        <Image
            src={`https://picsum.photos/id/${Math.floor(
                Math.random() * randomMax
            )}/${width}/${height}`}
            width={width}
            height={height}
            alt="Placeholder Image"
            className={cn("w-full", className)}
        />
    );
}

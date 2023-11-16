"use client";
import React, { useEffect, useState } from "react";

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState(0);
    const breakpoints = {
        xxl: 1536,
        xl: 1280,
        lg: 1024,
        md: 768,
        sm: 640,
    };
    const handleResize = (e: UIEvent) => {
        setScreenSize(window.innerWidth);
    };
    useEffect(() => {
        setScreenSize(window.innerWidth);

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    });

    return { screenSize, breakpoints };
};

export default useScreenSize;

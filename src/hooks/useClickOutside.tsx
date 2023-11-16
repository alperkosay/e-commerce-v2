"use client";
import React, { useEffect } from "react";

const useClickOutside = (handler: (e: MouseEvent) => void) => {
    useEffect(() => {
        document.addEventListener("click", handler, true);
        return () => document.removeEventListener("click", handler, true);
    }, []);
};

export default useClickOutside;

import React, { useEffect } from "react";

const useKeyClose = (handler: (e: KeyboardEvent) => void) => {
    useEffect(() => {
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, []);
};

export default useKeyClose;

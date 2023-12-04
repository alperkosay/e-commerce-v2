"use client";

import React from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { BasketProvider } from "@/context/BasketContext";

type Props = {
    children: React.ReactNode;
};

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

const BasketClientProvider = ({ children }: Props) => {
    return <BasketProvider>{children}</BasketProvider>;
};

export { ThemeProvider, BasketClientProvider };

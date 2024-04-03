"use client";

import React from "react";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";

type Props = {
  children: React.ReactNode;
};

const SessionClientProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export { ThemeProvider, SessionClientProvider };

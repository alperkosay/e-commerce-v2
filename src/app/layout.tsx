import { poppins } from "@/lib/fonts";
import "./globals.css";
import type { Metadata } from "next";

import Layout from "@/components/Layout/Layout";
import { ThemeProvider } from "@/components/Providers/Providers";
import { api } from "@/trpc/server";
import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: "Alper Koşay",
  description: "Kişisel portfolyo websitem.",
  keywords: ["Alper Koşay", "Web Developer", "React Developer"],
  authors: {
    name: "Alper Koşay",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await api.category.getAllCategories();

  return (
    <html lang="en">
      <body className={poppins.className}>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange
          >
            <Layout navData={data}>{children}</Layout>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}

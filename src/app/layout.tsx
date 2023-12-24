import { poppins } from "@/lib/fonts";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alper Koşay",
  description: "Kişisel portfolyo websitem.",
  keywords: ["Alper Koşay", "Web Developer", "React Developer"],
  authors: {
    name: "Alper Koşay",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
  );
}

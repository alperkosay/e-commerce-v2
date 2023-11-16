import Layout from "@/components/Layout/Layout";
import { ThemeProvider } from "@/components/Providers/Providers";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange
        >
            <Layout>{children}</Layout>
        </ThemeProvider>
    );
}

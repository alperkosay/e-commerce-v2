import Layout from "@/components/Layout/Layout";
import { ThemeProvider } from "@/components/Providers/Providers";
import api from "@/services/api";

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data } = await api.category.findMany();
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange
        >
            <Layout navData={data}>{children}</Layout>
        </ThemeProvider>
    );
}

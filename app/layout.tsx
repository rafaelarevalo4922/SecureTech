import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

import { LanguageProvider } from "@/lib/i18n/LanguageContext";

export const metadata: Metadata = {
    title: "Systrategy | Software a medida para empresas",
    description: "Desarrollamos software que evoluciona con tu negocio. Sistemas robustos, seguros y escalables.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    inter.variable,
                    outfit.variable
                )}
            >
                <LanguageProvider>
                    {children}
                </LanguageProvider>
            </body>
        </html>
    );
}

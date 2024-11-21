import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ScrollToTopButton from "./componetns/ScrollToTopButton";
import SupportButton from "./componetns/SupportButton";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "next-themes";
const myFont = localFont({
    src: [
        // { , path: "./fonts/IRANSansXV.woff2" },
        {
            weight: "100",
            style: "normal",
            path: "./fonts/woff2/IRANSansX-Thin.woff2",
        },
        {
            weight: "200",
            style: "normal",
            path: "./fonts/woff2/IRANSansX-UltraLight.woff2",
        },
        {
            weight: "300",
            style: "normal",
            path: "./fonts/woff2/IRANSansX-Light.woff2",
        },
        {
            weight: "500",
            style: "normal",
            path: "./fonts/woff2/IRANSansX-Medium.woff2",
        },
        {
            weight: "600",
            style: "normal",
            path: "./fonts/woff2/IRANSansX-DemiBold.woff2",
        },
        {
            weight: "800",
            style: "normal",
            path: "./fonts/woff2/IRANSansX-ExtraBold.woff2",
        },
        {
            weight: "900",
            style: "normal",
            path: "./fonts/woff2/IRANSansX-Black.woff2",
        },
        {
            weight: "950",
            style: "normal",
            path: "./fonts/woff2/IRANSansX-ExtraBlack.woff2",
        },
        {
            weight: "1000",
            style: "normal",
            path: "./fonts/woff2/IRANSansX-Heavy.woff2",
        },
        {
            weight: "bold",
            style: "normal",
            path: "./fonts/woff2/IRANSansX-Bold.woff2",
        },
        {
            weight: "normal",
            style: "normal",
            path: "./fonts/woff2/IRANSansX-Regular.woff2",
        },
    ],
    display: "block",
    variable: "--font-Iransans--per",
});

export const metadata: Metadata = {
    title: "بیا فایل",
    description: "بیافایل؛ دقیق، قابل اتکا و مقرون به صرفه",
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="fa-ir"
            suppressHydrationWarning
            dir="rtl"
        >
            <body className={` ${myFont.className}   `}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {/* محتوای صفحه */}
                    {children}
                    <ScrollToTopButton />
                    <SupportButton />
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}

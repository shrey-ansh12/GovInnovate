import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { GoogleTranslateProvider } from "@/components/GoogleTranslateProvider";

export const metadata: Metadata = {
  title: "GovInnovate | National Public Innovation Sandbox",
  description: "Empowering Public Sector Missions Through Verified Startup Innovation under GFR 2017 Rule 173 Statutory Safe Harbor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased selection:bg-[#0F3854] selection:text-white bg-[#FAF8F5] text-[#141F2B]" suppressHydrationWarning>
        <AppProvider>
          <GoogleTranslateProvider />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

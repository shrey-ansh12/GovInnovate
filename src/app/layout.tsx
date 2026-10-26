import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { GoogleTranslateProvider } from "@/components/GoogleTranslateProvider";

export const metadata: Metadata = {
  title: "GovInnovate | Startup-Friendly Public Procurement Mechanism",
  description: "Enabling government departments to identify, pilot, procure, and scale innovative solutions from eligible startups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <AppProvider>
          <GoogleTranslateProvider />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}

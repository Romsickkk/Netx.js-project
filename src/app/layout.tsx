import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import Header from "@/app/_navigation/Header";
import ThemeProvider from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
<<<<<<< HEAD
import Header from "@/ui/Header";
=======

import Sidebar from "./_navigation/sidebar/sidebar";
import SessionProvider from "./api/auth/lib/session-provider";
>>>>>>> dev

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Next app",
  description: "My roadmap to the Next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ThemeProvider>
            <Header />

            <div className="flex h-screen overflow-hidden border-collapse">
              <Sidebar />
              <main className="min-h-screen flex-1 overflow-y-auto overflow-x-hidden py-24 px-8 bg-secondary/20 flex flex-col">
                {children}
              </main>
            </div>
            <Toaster expand />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

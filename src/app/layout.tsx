'use client'

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { usePathname } from "next/navigation";
import { RealtimeProvider } from "@/contexts/realtime-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isAdminPage = pathname?.startsWith('/admin') || pathname?.startsWith('/login/admin');
  const isLoginPage = pathname === '/login';

  // Show navbar only on homepage
  const showNavbar = isHomePage;
  // Show footer on all pages except admin and login
  const showFooter = !isAdminPage && !isLoginPage;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Ade Widodo - Full Stack Developer & UI/UX Designer</title>
        <meta name="description" content="Professional portfolio of Ade Widodo, a Full Stack Developer & UI/UX Designer specializing in modern web technologies." />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <RealtimeProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {showNavbar && <Header />}
            <main className="flex-1">
              {children}
            </main>
            {showFooter && <Footer />}
            <Toaster />
          </ThemeProvider>
        </RealtimeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anand Todo App",
  description: "A simple todo app by Anand",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* ✅ Google Search Console Verification */}
          <meta name="google-site-verification" content="eXBInr__0mek2nkXlxx9AsE7KsX_2xw6p1qHMvXBEOc" />
          <title>Anand Todo App</title>
          <link rel="icon" href="C:\Users\tscs\OneDrive\Desktop\anand-todo\todo-applogo.png" />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

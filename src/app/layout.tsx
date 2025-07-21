import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";


// Modern font loading (recommended by Next.js 14)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});


const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// Metadata export (static or dynamic)
export const metadata: Metadata = {
  title: {
    default: "Justin Patrick Thomasson | Portfolio",
    template: "%s | Justin Patrick Thomasson",
  },
  description: "Personal portfolio of Justin Patrick Thomasson, showcasing projects and skills.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${inter.variable} ${geistMono.variable}`}
      suppressHydrationWarning // Only needed if using next-themes
    >
      <body className={`font-sans antialiased bg-white dark:bg-black text-gray-900 dark:text-gray-50`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
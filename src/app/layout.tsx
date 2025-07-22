import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Header } from "./components/Header";
import { Providers } from "./components/providers";

// Primary font - Space Grotesk (modern tech aesthetic)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans", // Changed from --font-inter
  display: "swap",
  weight: ["400", "500", "600", "700"], // All recommended weights
  adjustFontFallback: true, // Better CLS scores
});

// Monospace font - JetBrains Mono (developer-optimized)
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "700"], // Regular and Bold only
  adjustFontFallback: false, // Monospace fallback is predictable
});

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
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} `}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <Header />
          <main className="flex-1 @container">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
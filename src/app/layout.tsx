import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import  Header from "./components/Header";
import Providers from "@/app/components/ThemeProvider";
import {generatePreloadMetadata} from  "./components/PreloadLinks";
import TrackPageView from "./components/TrackPageView";


const projectImageUrls = [
  '/projects/Fist.png',
  '/projects/Moodeng.png',
  '/projects/Portfolio.png',
  '/projects/RYL.png',
  '/projects/Smatter.png',
  
];
// Primary font - Space Grotesk (modern tech aesthetic)
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans", 
  display: "swap",
  weight: ["400", "500", "600", "700"], 
  adjustFontFallback: true, 
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "700"], 
  adjustFontFallback: false, 
});

export const metadata: Metadata = {
  title: {
    default: "Justins | Portfolio",
    template: "%s | Justin Patrick Thomasson",
  },
  description: "Personal portfolio of Justin Patrick Thomasson, showcasing projects and skills.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  ...generatePreloadMetadata(projectImageUrls),
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
            <TrackPageView />
          </main>
        </Providers>
      </body>
    </html>
  );
}
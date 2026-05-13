import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar              from "../components/Navbar";
import Scene3DBackground   from "../components/Scene3DBackground";
import CustomCursor        from "../components/CustomCursor";
import SmoothScrollWrapper from "../components/SmoothScrollWrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mukul Kumar | Backend Developer & CS Student",
  description:
    "Portfolio of Mukul Kumar — Backend Developer, CS Student at SRM Institute. Skilled in Java, C++, MySQL, and System Design.",
  keywords: ["Mukul Kumar", "backend developer", "SRM", "portfolio", "Java", "MySQL"],
  openGraph: {
    title: "Mukul Kumar | Backend Developer",
    description: "CS Student & Backend Developer at SRM Institute",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      {/* html has the dark fallback; body is transparent so canvas shows */}
      <body className={`${inter.variable} font-sans antialiased bg-transparent text-white selection:bg-blue-600/30`}>
        {/* 3D Three.js animated background — behind everything */}
        <Scene3DBackground />

        {/* Custom dual-layer cursor */}
        <CustomCursor />

        {/* Smooth inertia scroll wrapper (Lenis) */}
        <SmoothScrollWrapper>
          <Navbar />
          {children}
        </SmoothScrollWrapper>
      </body>
    </html>
  );
}

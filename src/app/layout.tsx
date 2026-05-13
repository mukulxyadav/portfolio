import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const metadata: Metadata = {
  title: "Mukul Kumar | Portfolio",
  description: "A world-class modern developer portfolio showcasing backend engineering and high-end design.",
};

import GradientMesh from "@/components/GradientMesh";
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-neutral-950 font-sans antialiased selection:bg-white/10 selection:text-white cursor-none",
          inter.variable,
          outfit.variable
        )}
      >
        <CustomCursor />
        <GradientMesh />
        {children}
      </body>
    </html>
  );
}

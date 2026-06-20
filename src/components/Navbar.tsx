"use client";

import { useEffect, useState } from "react";
import { NavBar } from "./ui/tubelight-navbar";
import { User, Code2, FolderGit2, Trophy, Mail } from "lucide-react";

const navItems = [
  { name: "About", url: "#about", icon: User },
  { name: "Skills", url: "#skills", icon: Code2 },
  { name: "Projects", url: "#projects", icon: FolderGit2 },
  { name: "Achievements", url: "#achievements", icon: Trophy },
  { name: "Contact", url: "#contact", icon: Mail },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("About");

  useEffect(() => {
    const sections = ["about", "skills", "projects", "achievements", "contact"];
    
    const handleScroll = () => {
      let currentSection = navItems[0].name;

      const reversedSections = [...sections].reverse();
      for (const sectionId of reversedSections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            const matchedItem = navItems.find((item) => item.url === `#${sectionId}`);
            if (matchedItem) {
              currentSection = matchedItem.name;
              break;
            }
          }
        }
      }

      // If at the very top, keep first item active
      if (window.scrollY < 100) {
        currentSection = navItems[0].name;
      }

      // If at the very bottom, keep last item active
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        currentSection = navItems[navItems.length - 1].name;
      }

      setActiveTab((prev) => (prev !== currentSection ? currentSection : prev));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <NavBar items={navItems} activeTab={activeTab} onTabChange={setActiveTab} />;
}

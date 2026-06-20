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
      let currentSection = "About";
      const scrollPosition = window.scrollY + 200; // Offset for better detection

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            const matchedItem = navItems.find((item) => item.url === `#${sectionId}`);
            if (matchedItem) {
              currentSection = matchedItem.name;
            }
          }
        }
      }
      setActiveTab(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <NavBar items={navItems} activeTab={activeTab} onTabChange={setActiveTab} />;
}

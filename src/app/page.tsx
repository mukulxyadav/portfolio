"use client";

import Hero         from "../components/Hero";
import About        from "../components/About";
import Skills       from "../components/Skills";
import Projects     from "../components/Projects";
import Achievements from "../components/Achievements";
import Contact      from "../components/Contact";
import Footer       from "../components/Footer";
import Reveal       from "../components/Reveal";
import { ScrollReelTestimonials } from "@/components/ui/scroll-reel-testimonials";
import { TextReveal } from "@/components/ui/cascade-text";

const HIGHLIGHTS = [
  {
    quote: "Currently pursuing B.Tech in CSE at SRM Institute of Science and Technology with a strong academic record (9.16 CGPA).",
    author: "Academics & Education",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80&auto=format&fit=crop",
    alt: "University campus representing academics",
  },
  {
    quote:
      "Passionate about building robust systems. Developed token management and library systems using Core Java and MySQL.",
    author: "Backend Development",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80&auto=format&fit=crop",
    alt: "Code on a screen representing development",
  },
  {
    quote: "Dedicated to mastering data structures and algorithms, with consistent practice and over 76+ problems solved on LeetCode.",
    author: "Problem Solving",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80&auto=format&fit=crop",
    alt: "Chess board representing problem solving strategy",
  },
];

export default function Home() {
  return (
    <main className="relative bg-transparent min-h-screen overflow-x-hidden">

      {/* Hero: no reveal — immediate */}
      <Hero />

      <div className="max-w-6xl mx-auto px-6"><hr /></div>
      <Reveal from="bottom"><About /></Reveal>

      <div className="max-w-6xl mx-auto px-6"><hr /></div>
      <Reveal from="bottom" delay={0.05}><Skills /></Reveal>

      <div className="max-w-6xl mx-auto px-6"><hr /></div>
      <Reveal from="bottom" delay={0.05}><Projects /></Reveal>

      <div className="max-w-6xl mx-auto px-6"><hr /></div>
      <Reveal from="bottom" delay={0.05}><Achievements /></Reveal>

      {/* ── HIGHLIGHTS (ScrollReelTestimonials) ── */}
      <div className="max-w-6xl mx-auto px-6"><hr /></div>
      <Reveal from="bottom" delay={0.05}>
        <section id="highlights" className="py-28 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12">
              <span className="section-eyebrow">My Journey</span>
              <h2 className="display-2 text-white mt-2">
                Who I{" "}
                <TextReveal
                  text="Am"
                  as="span"
                  fontSize="inherit"
                  color="#f1f1f1"
                  hoverColor="#3b82f6"
                  className="!tracking-[-0.02em]"
                />
              </h2>
            </div>
            <ScrollReelTestimonials testimonials={HIGHLIGHTS} />
          </div>
        </section>
      </Reveal>

      <div className="max-w-6xl mx-auto px-6"><hr /></div>
      <Reveal from="bottom" delay={0.05}><Contact /></Reveal>

      <Footer />
    </main>
  );
}

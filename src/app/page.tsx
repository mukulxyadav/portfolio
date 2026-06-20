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

const TESTIMONIALS = [
  {
    quote: "Mukul's backend skills are impressive — clean architecture, solid fundamentals, and a real eye for optimization.",
    author: "Project Collaborator",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop",
    alt: "Portrait of a project collaborator",
  },
  {
    quote:
      "Working with Mukul on our hackathon project was amazing. He delivered a robust backend in record time.",
    author: "Hackathon Teammate",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80&auto=format&fit=crop",
    alt: "Portrait of a hackathon teammate",
  },
  {
    quote: "His problem-solving approach on LeetCode challenges is methodical and efficient. A great peer to learn from.",
    author: "Coding Peer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop",
    alt: "Portrait of a coding peer",
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

      {/* ── TESTIMONIALS (ScrollReelTestimonials) ── */}
      <div className="max-w-6xl mx-auto px-6"><hr /></div>
      <Reveal from="bottom" delay={0.05}>
        <section id="testimonials" className="py-28 scroll-mt-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12">
              <span className="section-eyebrow">Testimonials</span>
              <h2 className="display-2 text-white mt-2">
                What People{" "}
                <TextReveal
                  text="Say"
                  as="span"
                  fontSize="inherit"
                  color="#f1f1f1"
                  hoverColor="#3b82f6"
                  className="!tracking-[-0.02em]"
                />
              </h2>
            </div>
            <ScrollReelTestimonials testimonials={TESTIMONIALS} />
          </div>
        </section>
      </Reveal>

      <div className="max-w-6xl mx-auto px-6"><hr /></div>
      <Reveal from="bottom" delay={0.05}><Contact /></Reveal>

      <Footer />
    </main>
  );
}

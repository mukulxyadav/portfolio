"use client";

import Hero         from "../components/Hero";
import About        from "../components/About";
import Skills       from "../components/Skills";
import Projects     from "../components/Projects";
import Achievements from "../components/Achievements";
import Contact      from "../components/Contact";
import Footer       from "../components/Footer";
import Reveal       from "../components/Reveal";

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

      <div className="max-w-6xl mx-auto px-6"><hr /></div>
      <Reveal from="bottom" delay={0.05}><Contact /></Reveal>

      <Footer />
    </main>
  );
}

import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import BentoGrid from "@/components/BentoGrid";
import SmoothScroll from "@/components/SmoothScroll";
import NoiseOverlay from "@/components/NoiseOverlay";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-neutral-950 selection:bg-blue-500/30 selection:text-blue-200">
        <NoiseOverlay />
        <Navbar />
        <Hero />
        <BentoGrid />
        
        {/* Contact CTA Section */}
        <section id="contact" className="py-32 px-6 flex flex-col items-center justify-center text-center">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter mb-8 text-white">
            Let&apos;s build something <br/> <span className="text-gradient-blue">extraordinary.</span>
          </h2>
          <p className="text-neutral-500 max-w-xl mb-12 text-lg">
            Currently open to internships and full-time backend roles. Let&apos;s connect and discuss how I can help your team.
          </p>
          <a 
            href="mailto:mukulxyadav@gmail.com" 
            className="px-12 py-5 rounded-full bg-blue-600 text-white font-bold text-lg hover:bg-blue-500 transition-all hover:scale-105 active:scale-95"
          >
            Get in Touch
          </a>
          
          <footer className="mt-32 pt-12 border-t border-white/5 w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6 text-neutral-600 text-xs font-medium uppercase tracking-widest">
             <div>© 2026 Mukul Kumar. All rights reserved.</div>
             <div className="flex gap-8">
               <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
               <a href="#" className="hover:text-white transition-colors">GitHub</a>
               <a href="#" className="hover:text-white transition-colors">Twitter</a>
             </div>
          </footer>
        </section>
      </main>
    </SmoothScroll>
  );
}

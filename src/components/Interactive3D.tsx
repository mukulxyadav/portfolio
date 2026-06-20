'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
 
export default function Interactive3D() {
  return (
    <section id="interactive-3d" className="py-28 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <span className="section-eyebrow">Interactive 3D</span>
          <h2 className="display-2 text-white mt-2">
            Immersive Experience
          </h2>
        </div>
        
        <Card className="w-full h-[500px] bg-black/[0.96] border-white/10 relative overflow-hidden">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            fill="white"
          />
          
          <div className="flex flex-col md:flex-row h-full">
            {/* Left content */}
            <div className="flex-1 p-8 md:p-12 relative z-10 flex flex-col justify-center">
              <h3 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
                Beyond <br/> Traditional UI
              </h3>
              <p className="mt-4 text-neutral-300 max-w-lg text-lg">
                Explore an interactive 3D dimension. Adding dynamic elements can completely transform how users perceive and interact with web applications.
              </p>
            </div>

            {/* Right content */}
            <div className="flex-1 relative min-h-[300px] md:min-h-full">
              <SplineScene 
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}

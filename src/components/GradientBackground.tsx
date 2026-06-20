"use client"

import { GrainGradient } from "@paper-design/shaders-react"

export default function GradientBackground() {
  return (
    <>
      <div className="fixed inset-0 -z-20 bg-black pointer-events-none">
        <GrainGradient
          style={{ height: "100%", width: "100%" }}
          colorBack="hsl(0, 0%, 0%)"
          softness={0.76}
          intensity={0.45}
          noise={0}
          shape="corners"
          offsetX={0}
          offsetY={0}
          scale={1}
          rotation={0}
          speed={1}
          colors={["hsl(14, 100%, 57%)", "hsl(45, 100%, 51%)", "hsl(340, 82%, 52%)"]}
        />
      </div>
      {/* Subtle dark overlay to ensure text contrast across the site */}
      <div className="fixed inset-0 -z-10 bg-black/30 backdrop-blur-[1px] pointer-events-none" />
    </>
  )
}

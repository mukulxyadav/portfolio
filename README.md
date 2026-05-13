# 🚀 Mukul Kumar | Premium Interactive 3D Portfolio

A top 1% developer portfolio featuring a hyper-realistic interactive 3D avatar with independent mouse-tracking eyes, AI chatbot, and premium glassmorphic UI.

## ✨ High-Value 3D Avatar Features
- **Mouse Tracking Eyes**: Eyes follow the cursor position smoothly and naturally.
- **Head Movement**: Subtle head rotation based on cursor position for a lifelike feel.
- **Idle Animations**: Natural random blinking and subtle breathing motion (chest/shoulders up and down).
- **Optimized Performance**: Lightweight 2.5D WebGL architecture for instant loading and 60fps performance.

## 📂 Folder Structure

```
├── public/                 # Static assets (images, 3D models)
├── src/                    # Source code
│   ├── components/         # React Components
│   │   ├── Avatar3D.jsx    # Custom Stylized 3D Avatar with React Three Fiber
│   │   ├── Hero.jsx        # Full-screen immersive landing page
│   │   ├── About.jsx       # Scroll-animated storytelling
│   │   ├── Projects.jsx    # 3D tilting interactive project cards
│   │   ├── Skills.jsx      # Floating organic skill tags
│   │   ├── Chatbot.jsx     # AI assistant overlay
│   │   ├── MagneticButton.jsx # Custom cursor physics buttons
│   │   └── ...
│   ├── data/
│   │   └── resume.js       # Centralized data source (easily editable)
│   ├── App.jsx             # Main application layout and global state
│   ├── index.css           # Global styles, Tailwind, and Glassmorphism utilities
│   └── main.jsx            # React entry point
├── package.json            # Dependencies
└── README.md               # You are here
```

---

## 🛠️ Step-by-Step Setup Guide

To run this masterpiece locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```

2. **Install dependencies:**
   Make sure you have Node.js installed, then run:
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **View locally:**
   Open your browser to `http://localhost:5173` (or the port shown in your terminal).

---

## 🌐 Deployment Instructions

This project is fully optimized for **Vercel** or **Netlify**.

### Deploying to Vercel (Recommended):
1. Create a free account at [vercel.com](https://vercel.com).
2. Install the Vercel CLI: `npm i -g vercel`.
3. In your project directory, simply run:
   ```bash
   vercel
   ```
4. Follow the prompts (use default settings: Vite build commands will be automatically detected).

### Deploying to Netlify:
1. Push your code to GitHub.
2. Go to [Netlify](https://netlify.com) and click **"Add new site"** -> **"Import an existing project"**.
3. Select your GitHub repository.
4. **Build command:** `npm run build`
5. **Publish directory:** `dist`
6. Click **Deploy Site**.

---

## 🧑‍🎤 How to Replace the 3D Avatar (Custom Photo)

Currently, the portfolio uses a highly-optimized, programmatic Stylized Low-Poly head (`Avatar3D.jsx`). To replace this with a 3D scan of your actual face:

1. Go to a free avatar generator like **[Ready Player Me](https://readyplayer.me/)**.
2. Upload your photo and generate your avatar.
3. Export the avatar as a `.glb` file.
4. Place the `.glb` file in the `public/` folder (e.g., `public/mukul-avatar.glb`).
5. In `src/components/Avatar3D.jsx`, replace the `<StylizedSharpAvatar />` logic with:
   ```jsx
   import { useGLTF } from '@react-three/drei';
   
   function MyCustomAvatar() {
     const { scene } = useGLTF('/mukul-avatar.glb');
     return <primitive object={scene} scale={1.5} position={[0, -1, 0]} />;
   }
   ```

---

## ⚡ Performance Optimization Tips

1. **3D Rendering (`Avatar3D.jsx`)**: The canvas is currently limited to `fov: 45` and uses optimized primitives. If you import a heavy `.glb`, use the [gltf-pipeline](https://github.com/CesiumGS/gltf-pipeline) tool or Draco compression to compress it before adding it to `public/`.
2. **Scroll Animations**: Framer Motion uses hardware acceleration (`transform` / `opacity`). Avoid animating `width`, `height`, or `top`/`left` properties to prevent costly browser reflows.
3. **Interactive Mode Toggle**: The `interactiveMode` state in `App.jsx` dynamically disables `useFrame` tracking loops in the 3D components if a user is on a low-end device or prefers less motion.
